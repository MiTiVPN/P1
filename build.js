#!/usr/bin/env node
/**
 * MiTiVPN static site builder
 * -----------------------------------------------------------------------
 * Combines shared layout partials (_partials/) with per-page content
 * (pages/**\/content.html + meta.js) to produce plain, dependency-free
 * static HTML files in dist/ — safe to deploy as-is to GitHub Pages,
 * an Nginx/VPS document root, or any static host.
 *
 * No template runtime ships to the browser: this script only runs at
 * build time, on your machine or in CI. Output is 100% static HTML.
 *
 * Usage:
 *   node build.js            build once into dist/
 *   node build.js --watch    rebuild on file changes
 * -----------------------------------------------------------------------
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PARTIALS_DIR = path.join(ROOT, '_partials');
const PAGES_DIR = path.join(ROOT, 'pages');
const DIST_DIR = path.join(ROOT, 'dist');
const STATIC_DIR = path.join(ROOT, 'static'); // style.css, script.js, robots.txt, sitemap.xml, 404.html, etc.

function read(p) {
  return fs.readFileSync(p, 'utf8');
}

function loadPartial(name) {
  return read(path.join(PARTIALS_DIR, `${name}.html`));
}

const headCommon = loadPartial('head-common');
const header = loadPartial('header');
const footers = {
  'footer': loadPartial('footer'),
  'footer-article': loadPartial('footer-article'),
};

function findPageDirs(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPageDirs(full));
    } else if (entry.name === 'meta.js') {
      results.push(dir);
    }
  }
  return results;
}

function buildPage(pageDir) {
  const meta = require(path.join(pageDir, 'meta.js'));
  const content = read(path.join(pageDir, 'content.html'));
  const footer = footers[meta.footer || 'footer'];

  if (!footer) {
    throw new Error(`Unknown footer "${meta.footer}" for page ${pageDir}`);
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${headCommon}${meta.head.trim()}
</head>
<body>

${header}

${content.trim()}

${footer}`;

  const outPath = path.join(DIST_DIR, meta.outPath);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log(`  ✓ ${meta.outPath}`);
}

function copyStaticFiles() {
  if (!fs.existsSync(STATIC_DIR)) return;
  fs.cpSync(STATIC_DIR, DIST_DIR, { recursive: true });
}

function build() {
  console.log('Building MiTiVPN site...');
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });

  copyStaticFiles();

  const pageDirs = findPageDirs(PAGES_DIR);
  pageDirs.forEach(buildPage);

  console.log(`\nDone. ${pageDirs.length} pages built into dist/`);
}

build();

if (process.argv.includes('--watch')) {
  console.log('\nWatching for changes...');
  fs.watch(ROOT, { recursive: true }, (event, filename) => {
    if (!filename || filename.startsWith('dist/') || filename.includes('node_modules')) return;
    try {
      build();
    } catch (e) {
      console.error('Build error:', e.message);
    }
  });
}
