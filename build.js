/**
 * Build script — copies the site into dist/ and obfuscates every JS file
 * with aggressive settings so reverse-engineering is impractical.
 *
 * Usage:  node build.js
 */
const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const SRC = __dirname;
const DIST = path.join(__dirname, 'dist');

/* ── Obfuscator config (balanced: strong protection, low perf cost) ── */
const OBF_OPTIONS = {
  // ── Core transforms ──
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.4,   // ↓ from 0.75 — less runtime overhead
  deadCodeInjection: false,              // ↓ OFF — biggest size bloat source

  // ── Identifier mangling ──
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,            // keep globals so cross-file calls work
  renameProperties: false,

  // ── String protection ──
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayCallsTransformThreshold: 0.5,
  stringArrayEncoding: ['base64'],       // ↓ base64 instead of rc4 — faster decode
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,           // ↓ from 2 — less wrapper overhead
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 0.75,
  splitStrings: true,
  splitStringsChunkLength: 15,           // ↑ from 5 — fewer concat ops
  unicodeEscapeSequence: false,          // ↓ OFF — saves size, hex IDs are enough

  // ── Extra layers ──
  numbersToExpressions: true,
  simplify: true,
  transformObjectKeys: true,
  selfDefending: false,            // OFF — breaks on Vercel/CDN edge networks
  debugProtection: false,          // OFF — can freeze tabs in some environments
  debugProtectionInterval: 0,
  disableConsoleOutput: false,     // OFF — allow console for debugging deploy issues

  // ── Misc ──
  target: 'browser',
  seed: 0,
  sourceMap: false,
  log: false,
};

/* ── Build copy rules ────────────────────────────────────────────── */
const ROOT_DIRS_TO_COPY = new Set([
  'assets',
  'data',
]);

const ROOT_FILES_TO_COPY = new Set([
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

function obfuscateFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  if (!code.trim()) return; // skip empty files

  try {
    const result = JavaScriptObfuscator.obfuscate(code, OBF_OPTIONS);
    fs.writeFileSync(filePath, result.getObfuscatedCode(), 'utf8');
  } catch (err) {
    console.error(`  ✗ Failed: ${filePath}\n    ${err.message}`);
  }
}

function obfuscateAll(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      obfuscateAll(full);
    } else if (entry.name.endsWith('.js')) {
      const rel = path.relative(DIST, full);
      process.stdout.write(`  ⟳ ${rel} …`);
      obfuscateFile(full);
      console.log(' ✓');
    }
  }
}

/* ── Main ───────────────────────────────────────────────────────── */
console.log('\n🔨  Building protected site into dist/\n');

// 1. Clean previous build
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
  console.log('  Cleaned old dist/');
}

// 2. Copy only deployable site files
copyRecursive(SRC, DIST, true);
console.log('  Copied deployable site files\n');

// 3. Obfuscate JS
console.log('  Obfuscating JavaScript…\n');
obfuscateAll(DIST);

console.log('\n✅  Build complete → dist/\n');
console.log('Deploy the dist/ folder. Original source is untouched.\n');
