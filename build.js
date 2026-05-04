/**
 * Build script — copies the deployable static site into dist/.
 *
 * Usage: node build.js
 */
const fs = require('fs');
const path = require('path');

const SRC = __dirname;
const DIST = path.join(__dirname, 'dist');

/* ── Build copy rules ────────────────────────────────────────────── */
const ROOT_DIRS_TO_COPY = new Set([
  'assets',
  'data',
]);

const ROOT_FILES_TO_COPY = new Set([
  '.htaccess',
  'vercel.json',
  'robots.txt',
  'sitemap.xml',
  'favicon.ico',
  'site.webmanifest',
  'manifest.json',
  'CNAME',
]);

const RECURSIVE_SKIP = new Set([
  'node_modules', 'dist', '.git', '.vscode', '.codex',
  'package.json', 'package-lock.json', 'build.js',
]);

/* ── Helpers ────────────────────────────────────────────────────── */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function shouldCopyRootEntry(entry) {
  if (entry.isDirectory()) {
    return ROOT_DIRS_TO_COPY.has(entry.name);
  }

  if (entry.name.endsWith('.html')) {
    return true;
  }

  return ROOT_FILES_TO_COPY.has(entry.name);
}

function copyRecursive(src, dest, isRoot = false) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  ensureDir(dest);

  for (const entry of entries) {
    if (isRoot) {
      if (!shouldCopyRootEntry(entry)) continue;
    } else if (RECURSIVE_SKIP.has(entry.name)) {
      continue;
    }

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/* ── Main ───────────────────────────────────────────────────────── */
console.log('\n🔨  Building site into dist/\n');

// 1. Clean previous build
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
  console.log('  Cleaned old dist/');
}

// 2. Copy only deployable site files
copyRecursive(SRC, DIST, true);
console.log('  Copied deployable site files\n');

console.log('\n✅  Build complete → dist/\n');
console.log('Deploy the dist/ folder. Original source is untouched.\n');
