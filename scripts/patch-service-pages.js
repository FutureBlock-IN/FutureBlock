#!/usr/bin/env node
/**
 * Patch all service pages for site-wide consistency.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const pages = [
  { file: 'Advisory.html', page: 'advisory', heroKey: 'advisory' },
  { file: 'Automation.html', page: 'automation', heroKey: 'automation' },
  { file: 'Modernization.html', page: 'integrations', heroKey: 'integrations' },
  { file: 'GuruSquad.html', page: 'analytics', heroKey: 'analytics' },
  { file: 'CyberSecurity.html', page: 'cloud', heroKey: 'cloud' },
  { file: 'Innovation.html', page: 'innovation', heroKey: 'innovation' }
];

const { execSync } = require('child_process');

function buildHero(key) {
  return execSync(`node "${path.join(__dirname, 'service-hero-snippet.js')}" ${key}`, { encoding: 'utf8' }).trim();
}

function patchFile({ file, page, heroKey }) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, 'utf8');

  // Body class
  html = html.replace(/<body[^>]*>/, `<body class="site page-service" data-page="${page}">`);

  // Replace head CSS block - remove page-specific css links between custom.css and favicons, inject standard
  html = html.replace(
    /<link rel="stylesheet" href="css\/style\.min\.css" \/>[\s\S]*?(?=<link rel="shortcut icon"|<link rel="apple-touch-icon"|<\/head>)/,
    `<link rel="stylesheet" href="css/style.min.css" />\n  <link rel="stylesheet" href="css/custom.css" />\n  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />\n  <link rel="stylesheet" href="css/site-system.css" />\n  `
  );

  // Add Inter font if missing
  if (!html.includes('fonts.googleapis.com/css2?family=Inter')) {
    html = html.replace(
      '<link rel="stylesheet" href="css/style.min.css" />',
      `<link rel="preconnect" href="https://fonts.googleapis.com" />\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />\n  <link rel="stylesheet" href="css/style.min.css" />`
    );
  }

  // Replace header with mount point
  html = html.replace(
    /<!-- Header -->[\s\S]*?<!-- end navigation -->/,
    '  <div id="site-header"></div>'
  );
  // Also handle broken headers without comment
  html = html.replace(
    /<header class="nav[\s\S]*?<\/header>\s*<!-- end navigation -->/,
    '  <div id="site-header"></div>'
  );

  // Replace hero only (rev slider / section#Home block)
  const hero = buildHero(heroKey);
  html = html.replace(
    /<!-- Revolution Slider -->[\s\S]*?<section id="Home" class="p-0">[\s\S]*?<\/section>/,
    hero
  );
  if (!html.includes('fb-hero--service')) {
    html = html.replace(
      /<section id="Home" class="p-0">[\s\S]*?<\/section>/,
      hero
    );
  }

  // Remove leftover page-specific CSS (keep site-system only)
  const removeCss = [
    'modernization.css', 'animations.css', 'automation.css', 'banner-animations.css',
    'revolution-slider.css', 'advisory-animation.css', 'innovation-cards.css'
  ];
  removeCss.forEach(function (name) {
    html = html.replace(new RegExp('\\s*<link rel="stylesheet" href="css/' + name.replace('.', '\\.') + '"[^>]*>', 'g'), '');
  });
  // Dedupe font-awesome
  html = html.replace(
    /(<link rel="stylesheet" href="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/font-awesome[^>]+>\s*)+/g,
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />\n  '
  );

  // Replace footer
  html = html.replace(
    /<!-- Footer -->[\s\S]*?<!-- end footer -->/,
    '    <div id="site-footer"></div>'
  );
  html = html.replace(
    /<footer class="bg-dark bg-pattern">[\s\S]*?<!-- end footer -->/,
    '    <div id="site-footer"></div>'
  );

  // Add site-components.js before </body>
  if (!html.includes('site-components.js')) {
    html = html.replace(
      /<script src="js\/jquery\.min\.js"><\/script>/,
      '<script src="js/jquery.min.js"></script>\n  <script src="js/site-components.js"></script>'
    );
  }

  // Remove revolution slider scripts
  html = html.replace(/\s*<script[^>]*revolution[^>]*><\/script>/gi, '');
  html = html.replace(/\s*<script src="js\/revolution-slider\.js"><\/script>/, '');
  html = html.replace(/\s*<script src="js\/main\.js"><\/script>/, '');

  // Standardize AOS init
  if (!html.includes('ease-out-cubic')) {
    html = html.replace(
      /AOS\.init\(\{[\s\S]*?\}\);/,
      `AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      });`
    );
  }

  fs.writeFileSync(fp, html, 'utf8');
  console.log('Patched', file);
}

pages.forEach(patchFile);
