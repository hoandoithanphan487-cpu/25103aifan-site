import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const publicRoot = new URL("../public/", import.meta.url);

const EXPRESSION_FILES = [
  "default-smile.png",
  "look-left.png",
  "look-right.png",
  "look-up.png",
  "look-down.png",
  "extra-expression-1.png",
];

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the bilingual journal", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();

  assert.match(html, /<html[^>]*lang="zh-CN"/i);
  assert.match(html, /<title>Yifan — a personal journal<\/title>/i);

  // Identity: the name and the birth year must both survive on the first screen.
  assert.match(html, /my name is/);
  assert.match(html, /Yifan/);
  assert.match(html, /Born in 2000/);
  assert.match(html, /2000 年出生/);

  assert.match(html, /Hello, nice to meet you/i);
  assert.match(html, /遇见今天的我/);
  assert.match(html, /meet the me of today/);

  // Every navigation target resolves to a section that actually exists.
  for (const id of ["home", "about", "journey", "contact"]) {
    assert.match(html, new RegExp(`href="#${id}"`));
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /首页/);
  assert.match(html, /关于/);
  assert.match(html, /经历/);
  assert.match(html, /问候/);
  assert.match(html, /the me of today/);
  assert.match(html, /how I got here/);
  assert.match(html, /come say hello/);

  // No leftover corporate / robot content from the original template.
  assert.doesNotMatch(html, /Agentify|Solutions/i);
  assert.doesNotMatch(html, /<video\b/i);
  assert.doesNotMatch(html, /robot/i);
});

test("keeps Chinese and English together in the editorial copy", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /我会留意光/);
  assert.match(html, /I notice light, and weather/);
  assert.match(html, /我宁愿开始得笨拙/);
  assert.match(html, /I would rather begin badly/);
});

test("references every portrait through a project asset path", async () => {
  const response = await render();
  const html = await response.text();

  for (const file of EXPRESSION_FILES) {
    assert.match(html, new RegExp(`/images/expressions/${file}`));
    await access(new URL(`images/expressions/${file}`, publicRoot));
  }

  // Absolute paths from the author's machine must never ship.
  assert.doesNotMatch(html, /\/Users\/|file:\/\//);
});

test("every portrait is a true cutout with an alpha channel", async () => {
  for (const file of EXPRESSION_FILES) {
    const png = await readFile(new URL(`images/expressions/${file}`, publicRoot));

    // IHDR is always the first chunk: width, height, depth, then colour type.
    assert.equal(png.toString("ascii", 12, 16), "IHDR", `${file} is not a PNG`);
    assert.equal(png.readUInt32BE(16), 575, `${file} width`);
    assert.equal(png.readUInt32BE(20), 680, `${file} height`);
    assert.equal(png[24], 8, `${file} bit depth`);
    assert.equal(png[25], 6, `${file} must be RGBA (colour type 6)`);
  }
});
