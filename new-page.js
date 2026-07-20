#!/usr/bin/env node
/**
 * Scaffold a new page.
 * Usage: node new-page.js protocols/newthing "Page Title | MiTiVPN"
 *   -> creates pages/protocols/newthing/{content.html, meta.js}
 *   -> that page will build to dist/protocols/newthing/index.html
 */
const fs = require('fs');
const path = require('path');

const [, , slug, title] = process.argv;

if (!slug) {
  console.log('Usage: node new-page.js <slug> ["Page Title"]');
  console.log('Example: node new-page.js protocols/newthing "New Thing | MiTiVPN"');
  process.exit(1);
}

const dir = path.join(__dirname, 'pages', slug);
fs.mkdirSync(dir, { recursive: true });

const metaPath = path.join(dir, 'meta.js');
const contentPath = path.join(dir, 'content.html');

if (fs.existsSync(metaPath) || fs.existsSync(contentPath)) {
  console.error(`Page already exists at pages/${slug}/`);
  process.exit(1);
}

const url = `https://mitivpn.com/${slug}/`;

fs.writeFileSync(metaPath, `module.exports = {
  outPath: '${slug}/index.html',
  footer: 'footer-article', // or 'footer' for the full contact footer (use on top-level pages)
  head: \`
<title>${title || slug}</title>
<meta name="description" content="TODO">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${url}">

<meta property="og:type" content="article">
<meta property="og:site_name" content="MiTiVPN">
<meta property="og:title" content="${title || slug}">
<meta property="og:description" content="TODO">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="en_US">\`
};
`);

fs.writeFileSync(contentPath, `<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="/">Home</a>
  <span aria-hidden="true">/</span>
  <span class="breadcrumb__current">${title || slug}</span>
</nav>

<main class="article">
  <span class="article__eyebrow">TODO eyebrow</span>
  <h1 class="article__title">TODO heading</h1>
  <p class="article__dek">TODO description</p>

  <div class="article__body">
    <p>Write your page content here.</p>
  </div>
</main>
`);

console.log(`Created:
  pages/${slug}/meta.js
  pages/${slug}/content.html

Run "node build.js" to include it in dist/${slug}/index.html`);
