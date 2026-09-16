import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';

const root = resolve('dist/client');
async function cssFiles(directory) {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) files.push(...await cssFiles(path));
    else if (path.endsWith('.css')) files.push(path);
  }
  return files;
}

const urls = new Set();
for (const file of await cssFiles(root)) {
  const css = await readFile(file, 'utf8');
  for (const [, url] of css.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) {
    if (!/\.woff2?(?:$|\?)/.test(url)) continue;
    assert(!/^https?:/.test(url), `Font must be self-hosted: ${url}`);
    const path = url.startsWith('/') ? join(root, url) : resolve(dirname(file), url);
    await access(path); // CSS imports must resolve to real production assets.
    urls.add(url);
  }
}
for (const font of ['noto-serif-sc-', 'libre-baskerville-latin-400-normal', 'libre-baskerville-latin-400-italic']) {
  assert([...urls].some((url) => url.includes(font)), `Missing bundled font: ${font}`);
}
console.log(`Verified ${urls.size} self-hosted font assets.`);
