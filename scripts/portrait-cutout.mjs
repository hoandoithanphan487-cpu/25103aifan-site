/**
 * Turns the studio portraits into true cutouts.
 *
 * The source photographs sit on a near-white studio backdrop. This keys that
 * backdrop out to alpha 0 and, crucially, mattes the boundary: the antialiased
 * pixels around flying hair keep a fractional alpha and get their colour
 * un-premultiplied, so the edge composites correctly on any page colour
 * instead of dragging a white fringe around with it.
 *
 *   node scripts/portrait-cutout.mjs <source-dir> <output-dir>
 *
 * Only Node built-ins are used, so there is no image dependency to install.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { deflateSync, inflateSync } from "node:zlib";

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** A pixel this close to white, reachable from the border, is backdrop. */
const FLOOD_MIN = 238;
/** Radius used to estimate the local white level of the backdrop. */
const WHITE_RADIUS = 4;
/**
 * Only backdrop pixels this close to the subject are matted. Everything
 * further out is cleared outright, so grain in the paper cannot leave a veil
 * across the whole frame.
 */
const FEATHER_RADIUS = 2;
/** Grain allowance: paper within this many levels of local white is empty. */
const NOISE_FLOOR = 5;
/** Alpha below this is snapped to zero. */
const ALPHA_EPSILON = 6;

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const header = Buffer.alloc(8);
  header.writeUInt32BE(data.length, 0);
  header.write(type, 4, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([header.subarray(4), data])), 0);
  return Buffer.concat([header, data, crc]);
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  return pb <= pc ? b : c;
}

export function decodePng(buffer) {
  if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) throw new Error("not a png");

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      if (data[12] !== 0) throw new Error("interlaced png is not supported");
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }
    offset += 12 + length;
  }

  if (bitDepth !== 8) throw new Error(`unsupported bit depth ${bitDepth}`);
  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
  if (!channels) throw new Error(`unsupported colour type ${colorType}`);

  const stride = width * channels;
  const raw = inflateSync(Buffer.concat(idat));
  const pixels = Buffer.alloc(height * stride);

  let pos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const line = raw.subarray(pos, pos + stride);
    pos += stride;
    const row = pixels.subarray(y * stride, (y + 1) * stride);
    const prior = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? row[i - channels] : 0;
      const b = prior ? prior[i] : 0;
      const c = prior && i >= channels ? prior[i - channels] : 0;
      let value = line[i];
      if (filter === 1) value += a;
      else if (filter === 2) value += b;
      else if (filter === 3) value += (a + b) >> 1;
      else if (filter === 4) value += paeth(a, b, c);
      row[i] = value & 0xff;
    }
  }

  return { width, height, channels, stride, pixels };
}

function filterRow(row, prior, channels, type, out) {
  for (let i = 0; i < row.length; i++) {
    const a = i >= channels ? row[i - channels] : 0;
    const b = prior ? prior[i] : 0;
    const c = prior && i >= channels ? prior[i - channels] : 0;
    let value;
    if (type === 0) value = row[i];
    else if (type === 1) value = row[i] - a;
    else if (type === 2) value = row[i] - b;
    else if (type === 3) value = row[i] - ((a + b) >> 1);
    else value = row[i] - paeth(a, b, c);
    out[i] = value & 0xff;
  }
}

export function encodePng({ width, height, channels, stride, pixels }) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = channels === 4 ? 6 : 2;

  const body = Buffer.alloc(height * (stride + 1));
  const candidate = Buffer.alloc(stride);

  for (let y = 0; y < height; y++) {
    const row = pixels.subarray(y * stride, (y + 1) * stride);
    const prior = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;

    // Standard minimum-sum-of-absolute-differences filter heuristic.
    let bestType = 0;
    let bestScore = Infinity;
    for (const type of [0, 1, 2, 3, 4]) {
      filterRow(row, prior, channels, type, candidate);
      let score = 0;
      for (let i = 0; i < stride; i++) {
        score += candidate[i] < 128 ? candidate[i] : 256 - candidate[i];
      }
      if (score < bestScore) {
        bestScore = score;
        bestType = type;
      }
    }

    filterRow(row, prior, channels, bestType, candidate);
    body[y * (stride + 1)] = bestType;
    candidate.copy(body, y * (stride + 1) + 1);
  }

  return Buffer.concat([
    PNG_SIGNATURE,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(body, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** 4-connected flood fill inward from every border pixel. */
function findBackdrop(width, height, minChannel) {
  const backdrop = new Uint8Array(width * height);
  const queued = new Uint8Array(width * height);
  const stack = [];

  const visit = (x, y) => {
    const key = y * width + x;
    if (queued[key]) return;
    queued[key] = 1;
    if (minChannel[key] >= FLOOD_MIN) stack.push(key);
  };

  for (let x = 0; x < width; x++) {
    visit(x, 0);
    visit(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    visit(0, y);
    visit(width - 1, y);
  }

  while (stack.length > 0) {
    const key = stack.pop();
    backdrop[key] = 1;
    const x = key % width;
    const y = (key - x) / width;
    if (x > 0) visit(x - 1, y);
    if (x < width - 1) visit(x + 1, y);
    if (y > 0) visit(x, y - 1);
    if (y < height - 1) visit(x, y + 1);
  }

  return backdrop;
}

/**
 * Separable max filter over the backdrop only. The result is how bright the
 * paper is right next to a given pixel, which lets the key adapt to the soft
 * vignette in the originals instead of assuming a single global white.
 */
function estimateLocalWhite(width, height, minChannel, backdrop) {
  const horizontal = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let best = 0;
      const from = Math.max(0, x - WHITE_RADIUS);
      const to = Math.min(width - 1, x + WHITE_RADIUS);
      for (let sx = from; sx <= to; sx++) {
        const key = y * width + sx;
        if (backdrop[key] && minChannel[key] > best) best = minChannel[key];
      }
      horizontal[y * width + x] = best;
    }
  }

  const result = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    const from = Math.max(0, y - WHITE_RADIUS);
    const to = Math.min(height - 1, y + WHITE_RADIUS);
    for (let x = 0; x < width; x++) {
      let best = 0;
      for (let sy = from; sy <= to; sy++) {
        const value = horizontal[sy * width + x];
        if (value > best) best = value;
      }
      result[y * width + x] = best || 255;
    }
  }
  return result;
}

/**
 * Multi-source BFS outward from the subject silhouette, so we know which
 * backdrop pixels are close enough to the edge to deserve a partial alpha.
 */
function distanceFromSubject(width, height, backdrop) {
  const distance = new Uint8Array(width * height).fill(255);
  let frontier = [];

  for (let key = 0; key < backdrop.length; key++) {
    if (!backdrop[key]) continue;
    const x = key % width;
    const y = (key - x) / width;
    const touchesSubject =
      (x > 0 && !backdrop[key - 1]) ||
      (x < width - 1 && !backdrop[key + 1]) ||
      (y > 0 && !backdrop[key - width]) ||
      (y < height - 1 && !backdrop[key + width]);
    if (touchesSubject) {
      distance[key] = 1;
      frontier.push(key);
    }
  }

  for (let step = 2; step <= FEATHER_RADIUS && frontier.length > 0; step++) {
    const next = [];
    for (const key of frontier) {
      const x = key % width;
      const y = (key - x) / width;
      const neighbours = [
        x > 0 ? key - 1 : -1,
        x < width - 1 ? key + 1 : -1,
        y > 0 ? key - width : -1,
        y < height - 1 ? key + width : -1,
      ];
      for (const neighbour of neighbours) {
        if (neighbour < 0) continue;
        if (!backdrop[neighbour] || distance[neighbour] !== 255) continue;
        distance[neighbour] = step;
        next.push(neighbour);
      }
    }
    frontier = next;
  }

  return distance;
}

export function cutout(source) {
  const { width, height, channels, pixels } = source;
  if (channels !== 3) throw new Error("expected an RGB source image");

  const count = width * height;
  const minChannel = new Uint8Array(count);
  for (let key = 0; key < count; key++) {
    const i = key * 3;
    minChannel[key] = Math.min(pixels[i], pixels[i + 1], pixels[i + 2]);
  }

  const backdrop = findBackdrop(width, height, minChannel);
  const localWhite = estimateLocalWhite(width, height, minChannel, backdrop);
  const distance = distanceFromSubject(width, height, backdrop);

  const outStride = width * 4;
  const out = Buffer.alloc(height * outStride);
  let keyed = 0;
  let feathered = 0;

  for (let key = 0; key < count; key++) {
    const src = key * 3;
    const dst = key * 4;

    if (!backdrop[key]) {
      out[dst] = pixels[src];
      out[dst + 1] = pixels[src + 1];
      out[dst + 2] = pixels[src + 2];
      out[dst + 3] = 255;
      continue;
    }

    const white = localWhite[key];
    // The ramp is anchored to the flood threshold, so coverage reaches 1
    // exactly where the subject begins and the matte joins it seamlessly.
    const empty = white - NOISE_FLOOR;
    const ramp = Math.max(4, empty - FLOOD_MIN);
    const coverage =
      distance[key] > FEATHER_RADIUS
        ? 0
        : Math.min(1, Math.max(0, (empty - minChannel[key]) / ramp));
    let alpha = Math.round(coverage * 255);
    if (alpha < ALPHA_EPSILON) alpha = 0;

    if (alpha === 0) {
      out[dst] = 255;
      out[dst + 1] = 255;
      out[dst + 2] = 255;
      out[dst + 3] = 0;
      keyed++;
      continue;
    }

    // Un-premultiply against the paper it was shot on, so the recovered colour
    // is the ink alone and can be laid over any background.
    const a = alpha / 255;
    for (let c = 0; c < 3; c++) {
      const composited = pixels[src + c];
      const recovered = (composited - white * (1 - a)) / a;
      out[dst + c] = Math.min(255, Math.max(0, Math.round(recovered)));
    }
    out[dst + 3] = alpha;
    feathered++;
  }

  return {
    image: { width, height, channels: 4, stride: outStride, pixels: out },
    keyed,
    feathered,
  };
}

function describe(image) {
  const { width, height, stride, pixels } = image;
  const alphaAt = (x, y) => pixels[y * stride + x * 4 + 3];

  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  let opaque = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (alphaAt(x, y) < 8) continue;
      opaque++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  const pct = (value, total) => ((value / total) * 100).toFixed(1);
  return {
    corners: [
      alphaAt(2, 2),
      alphaAt(width - 3, 2),
      alphaAt(2, height - 3),
      alphaAt(width - 3, height - 3),
    ],
    face: alphaAt(Math.round(width * 0.5), Math.round(height * 0.42)),
    scarf: alphaAt(Math.round(width * 0.5), Math.round(height * 0.72)),
    hat: alphaAt(Math.round(width * 0.5), Math.round(height * 0.17)),
    box: `x:${pct(minX, width)}%-${pct(maxX + 1, width)}% y:${pct(minY, height)}%-${pct(maxY + 1, height)}%`,
    transparent: pct(width * height - opaque, width * height),
  };
}

function main() {
  const [sourceDir, outputDir] = process.argv.slice(2);
  if (!sourceDir || !outputDir) {
    console.error("usage: node scripts/portrait-cutout.mjs <source-dir> <output-dir>");
    process.exitCode = 1;
    return;
  }

  const files = readdirSync(sourceDir)
    .filter((name) => name.endsWith(".png"))
    .sort();

  for (const name of files) {
    const source = decodePng(readFileSync(join(sourceDir, name)));
    const { image, keyed, feathered } = cutout(source);
    writeFileSync(join(outputDir, name), encodePng(image));

    const report = describe(image);
    console.log(
      [
        name.padEnd(24),
        `keyed ${String(keyed).padStart(6)}`,
        `feathered ${String(feathered).padStart(5)}`,
        `corners ${report.corners.join("/")}`,
        `hat ${report.hat}`,
        `face ${report.face}`,
        `scarf ${report.scarf}`,
        report.box,
        `clear ${report.transparent}%`,
      ].join("  "),
    );
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
