import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = dirname(fileURLToPath(import.meta.url));

/**
 * Static SPA build for GitHub Pages. The vinext Cloudflare build is unchanged
 * and still lives in vite.config.ts.
 */
export default defineConfig({
  root: resolve(rootDir, "site"),
  publicDir: resolve(rootDir, "public"),
  base: process.env.PAGES_BASE ?? "/25103aifan-site/",
  plugins: [react()],
  css: {
    postcss: resolve(rootDir, "postcss.config.mjs"),
  },
  build: {
    outDir: resolve(rootDir, "dist-pages"),
    emptyOutDir: true,
  },
});
