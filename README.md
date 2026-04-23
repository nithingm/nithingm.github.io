# Nithin George Mathew Portfolio

Static multi-page portfolio for `nithingm.github.io`.

## Overview

This site is a hand-built static portfolio with:

- `Home` page with an animated connected-map hero
- `About` page with interactive story pivots
- `Work` page with expandable case-study overlays
- `Fun` page for music, math play, trivia, and art
- shared navigation, footer, and contact modal across all pages

No framework or build step is required. It is plain HTML, CSS, and JavaScript, designed to deploy directly on GitHub Pages.

## Files

- `index.html` - landing page
- `about.html` - interactive career/story page
- `work.html` - project case studies
- `fun.html` - personality/curiosity page
- `styles.css` - shared styling and design system
- `site.js` - shared UI behavior, modal logic, interactions

## Run Locally

From the `Site` folder, start a simple static server:

```powershell
cd "d:\Projects\Portfolio Site\Site"
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

- The site uses relative links, so it should be served from the repo root, not opened page-by-page from random folders.
- GitHub Pages will serve `index.html` automatically.
- If `python` is not available, you can also use any static file server such as VS Code Live Server.
