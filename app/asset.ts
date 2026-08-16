/** Prefix a public file so it works both locally (`/`) and on GitHub Pages. */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}${path.replace(/^\//, "")}`;
}
