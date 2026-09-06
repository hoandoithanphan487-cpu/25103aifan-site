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

const RELIC_FILES = [
  "images/projects/relic-3d-poster.jpg",
  "images/projects/gallery/relic-3d-evidence.jpg",
  "images/projects/gallery/relic-3d-structure.jpg",
  "images/projects/gallery/relic-3d-restoration.jpg",
];

const REJOIN_FILES = [
  "images/projects/rejoin-poster-v1.png",
  "images/projects/gallery/rejoin-intake-v1.png",
  "images/projects/gallery/rejoin-compare-v1.png",
  "images/projects/gallery/rejoin-review-v1.png",
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
  assert.match(html, /<title>冯一帆｜AI 产品、游戏与交互体验<\/title>/i);

  assert.match(html, /building with AI/);
  assert.match(html, /with care/);
  assert.match(html, /I’m Yifan/);
  assert.match(html, /我是冯一帆/);

  assert.match(html, /AI product maker/i);
  assert.match(html, /看看我做的项目/);
  assert.match(html, /see what I’m building/);

  // Every navigation target resolves to a section that actually exists.
  for (const id of ["home", "projects", "notes", "lab", "about", "contact"]) {
    assert.match(html, new RegExp(`href="#${id}"`));
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /首页/);
  assert.match(html, /项目/);
  assert.match(html, /AI 随笔/);
  assert.match(html, /实验室/);
  assert.match(html, /关于我/);
  assert.match(html, /联系/);
  assert.match(html, /things I am building/);
  assert.match(html, /AI 星球的随笔/);
  assert.match(html, /unfinished on purpose/);
  assert.match(html, /the me behind the work/);
  assert.match(html, /let’s make something useful/);

  assert.match(html, /REJOIN/);
  assert.match(html, /id="rejoin"/);
  assert.match(
    html,
    /https:\/\/rejoin-ceramic-matching\.hoandoithanphan487\.chatgpt\.site\//,
  );
  assert.match(html, /RELIC 3D/);
  assert.match(html, /id="relic-3d"/);
  assert.match(
    html,
    /https:\/\/relic-3d-tomb\.hoandoithanphan487\.chatgpt\.site\//,
  );
  assert.match(html, /Moonshadow Tarot/);
  assert.match(html, /溪谷新芽/);
  const projectPositions = [
    html.indexOf('id="rejoin"'),
    html.indexOf('id="relic-3d"'),
    html.indexOf('id="moonshadow-tarot"'),
    html.indexOf('id="valley-sprout"'),
  ];
  assert.ok(
    projectPositions.every((position) => position >= 0),
    "every selected project should have a stable anchor",
  );
  assert.deepEqual(
    [...projectPositions].sort((a, b) => a - b),
    projectPositions,
    "selected projects should render as REJOIN, RELIC 3D, Moonshadow, Valley Sprout",
  );
  assert.match(
    html,
    /https:\/\/mp\.weixin\.qq\.com\/s\/TpvfeBbUiQUuIfV7k2sI_A/,
  );
  assert.match(html, /noreferrer noopener/);
  assert.doesNotMatch(html, /已正式上线/);
  assert.doesNotMatch(html, /5[–-]6\s*小时/);
  assert.doesNotMatch(html, /\bdemo\b/i);

  // No leftover corporate / robot content from the original template.
  assert.doesNotMatch(html, /Agentify|Solutions/i);
  assert.doesNotMatch(html, /<video\b/i);
  assert.doesNotMatch(html, /robot/i);
});

test("ships every RELIC 3D project image", async () => {
  for (const file of RELIC_FILES) {
    await access(new URL(file, publicRoot));
  }
});

test("ships every REJOIN project image", async () => {
  for (const file of REJOIN_FILES) {
    await access(new URL(file, publicRoot));
  }
});

test("keeps Chinese and English together in the editorial copy", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /我关心模型能做什么/);
  assert.match(html, /I care about what a model can do/);
  assert.match(html, /我喜欢把模糊想法拆成/);
  assert.match(html, /I like turning vague ideas/);
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
