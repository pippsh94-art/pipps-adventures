# Pipps Adventures — Embedded Recipe Collection

A digitized cookbook extracted from PDF, served as part of the pipps-adventures site.

## What This Is

215 individual recipe pages extracted from a scanned cookbook PDF, with each cookbook page becoming its own HTML file. Designed for in-browser browsing and search via the recipe index.

**Note on the file count vs. recipe count:** Because the original PDF extraction created one HTML file per cookbook page, multi-page recipes (like the braised lamb shanks that span 9 pages, or broccoli cheese soup variations across 6 pages) appear as multiple files. The actual number of unique recipes is meaningfully lower than the 215 file count — closer to ~50–80 distinct recipes once duplicates and continuation pages are accounted for. A future cleanup pass could consolidate these.

## Features

- **📖 Recipe Collection:** 215 individual recipe pages from the cookbook PDF
- **🖼️ Original Images:** Most recipes include the original cookbook page image
- **🔍 Searchable Interface:** Find recipes by name via the search box on the index
- **📱 Mobile Friendly:** Responsive design works on all devices
- **⏱️ Timing Information:** Prep, cook, and total times when available

## Structure

- `index.html` — Main searchable recipe index (the canonical hub page)
- `0001-*.html` through `0760-*.html` — Individual recipe pages, numbered by source PDF page
- `../images/page_*.jpg` — Original cookbook page images

## Recipe Format

Each recipe page typically includes:
- Original cookbook page image (where available)
- Recipe description
- Prep / cook / total times (when available)
- Ingredients list
- Step-by-step instructions
- Page number reference back to the source

## Adding Images to New Recipes

When adding new recipes, images are automatically included if:
1. The HTML file follows the naming pattern `NNNN-recipe-name.html`
2. A corresponding image exists at `../images/page_NNNN.jpg`
3. The recipe HTML structure follows the established template

The image section is added after the `<h1>` title tag:

```html
<div class="original-image" style="margin-bottom: 1.5rem; text-align: center;">
    <img src="../images/page_NNNN.jpg" alt="Original recipe page NNNN" style="max-width: 100%; height: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <p style="font-size: 0.8em; color: #718096; margin-top: 0.5rem;">Original cookbook page NNNN</p>
</div>
```

## Live Site

Browse the collection at: https://pippsh94-art.github.io/pipps-adventures/recipes/

## Distinction from Alicia's Main Recipe Site

This embedded cookbook is **separate** from Alicia's standalone recipe site (`projects/Alicia-recipe/`, served at http://localhost:9090 via launchd), which contains 835+ recipes from a different source. The two collections do not currently share content.
