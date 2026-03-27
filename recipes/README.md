# Alicia's Recipe Collection

This directory contains 49 authentic recipes from Alicia's cookbook, digitized and formatted for web viewing.

## Features

- **📖 Complete Recipe Collection**: All 49 recipes from Alicia's cookbook (pages 4-65)
- **🖼️ Original Images**: Each recipe includes the original cookbook page image
- **🔍 Searchable Interface**: Find recipes by name or ingredient
- **📱 Mobile Friendly**: Responsive design works on all devices
- **⏱️ Timing Information**: Prep, cook, and total times when available

## Structure

- `index.html` - Main searchable recipe index
- `0004-*.html` through `0065-*.html` - Individual recipe pages
- `../images/page_*.jpg` - Original cookbook page images

## Recipe Format

Each recipe includes:
- Original cookbook page image
- Recipe description 
- Prep/cook/total times (when available)
- Ingredients list
- Step-by-step instructions
- Page number reference

## Adding Images to New Recipes

When adding new recipes, images are automatically included if:
1. The HTML file follows the naming pattern `NNNN-recipe-name.html`
2. A corresponding image exists at `../images/page_NNNN.jpg`
3. The recipe HTML structure follows the established template

The image section is automatically added after the `<h1>` title tag:

```html
<div class="original-image" style="margin-bottom: 1.5rem; text-align: center;">
    <img src="../images/page_NNNN.jpg" alt="Original recipe page NNNN" style="max-width: 100%; height: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <p style="font-size: 0.8em; color: #718096; margin-top: 0.5rem;">Original cookbook page NNNN</p>
</div>
```

## Live Site

View the collection at: https://pippsh94-art.github.io/pipps-adventures/recipes/