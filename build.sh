#!/bin/bash
set -e

echo "Building FutureBlock..."

CSS_FILES=(
  tokens
  base
  animations
  navbar
  footer
  home
  service
  contact
)

JS_FILES=(
  particles
  navbar
  stats-counter
  scroll-animate
  faq
  contact
  main
  protect
)

echo "Minifying CSS..."
for file in "${CSS_FILES[@]}"; do
  npx cleancss -o "css/${file}.min.css" "css/${file}.css"
done

echo "Minifying JS (compress only — keeps global init function names)..."
for file in "${JS_FILES[@]}"; do
  npx terser "js/${file}.js" -o "js/${file}.min.js" --compress
done

echo "Done. Deploy the repository."
echo "Note: Do not obfuscate or html-minify with --remove-optional-tags — both break the site."
