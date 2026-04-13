#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read cleaned recipe metadata from Alicia site
const metaPath = '/Users/pipps/Fun-with-claude/projects/Alicia-recipe/recipes_meta.json';
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

// Get all recipe HTML files to map page numbers to filenames
const recipesDir = './recipes';
const recipeFiles = fs.readdirSync(recipesDir)
    .filter(file => file.endsWith('.html') && file !== 'index.html');

// Build a map of page_num -> filename
const fileMap = {};
recipeFiles.forEach(file => {
    const num = parseInt(file.split('-')[0]);
    if (!isNaN(num)) fileMap[num] = file;
});

// Build recipe data from JSON metadata + file map
const recipes = meta
    .filter(r => fileMap[r.page_num])
    .sort((a, b) => a.page_num - b.page_num)
    .map(r => {
        const num = r.page_num;
        const title = r.title || 'Untitled Recipe';
        const ingredients = (r.ingredients || []).join(', ').toLowerCase();
        const hasImage = fs.existsSync(`./images/page_${String(num).padStart(4, '0')}.jpg`);
        return {
            file: fileMap[num],
            title,
            number: String(num).padStart(4, '0'),
            ingredients,
            hasImage,
            searchText: `${title.toLowerCase()} ${ingredients}`
        };
    });

console.log(`Found ${recipes.length} recipes with metadata`);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alicia's Recipe Collection - ${recipes.length} Recipes</title>
    <link rel="stylesheet" href="../style.css">
    <style>
        .recipe-header { background: #2d3748; color: white; padding: 2rem 1.5rem; text-align: center; }
        .recipe-header h1 { color: white; font-size: 2.2rem; margin-bottom: 0.5rem; }
        .recipe-header p { color: #a0aec0; font-size: 1.1rem; }
        .recipe-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
        .search-container { margin: 2rem 0; text-align: center; }
        .search-box {
            width: 100%; max-width: 560px; padding: 14px 20px;
            border: 2px solid #e2e8f0; border-radius: 12px;
            font-size: 1.1rem; font-family: inherit;
            box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        }
        .search-box:focus { outline: none; border-color: #3182ce; box-shadow: 0 0 0 3px rgba(49,130,206,0.15); }
        .filter-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin: 1rem 0 2rem; }
        .filter-tag {
            padding: 8px 18px; border-radius: 24px; font-size: 0.9rem;
            cursor: pointer; transition: all 0.2s; border: 1.5px solid #e2e8f0;
            background: white; color: #4a5568; font-family: inherit;
        }
        .filter-tag:hover { background: #edf2f7; border-color: #cbd5e0; }
        .filter-tag.active { background: #3182ce; color: white; border-color: #3182ce; }
        .result-count { text-align: center; color: #718096; font-size: 0.9rem; margin-bottom: 1.5rem; }
        .recipe-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 20px; margin: 0 0 4rem;
        }
        .recipe-card {
            background: white; border: 1px solid #e2e8f0; border-radius: 12px;
            overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;
            text-decoration: none; color: inherit; display: flex; flex-direction: column;
        }
        .recipe-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); text-decoration: none; }
        .recipe-card img { width: 100%; height: 170px; object-fit: cover; }
        .recipe-card .no-img {
            width: 100%; height: 170px; background: #edf2f7;
            display: flex; align-items: center; justify-content: center;
            font-size: 3rem; color: #a0aec0;
        }
        .card-body { padding: 14px 16px; flex: 1; }
        .card-body h3 { font-size: 1.05rem; color: #2d3748; margin: 0 0 6px; line-height: 1.3; }
        .card-body .card-meta { font-size: 0.8rem; color: #718096; }
        @media(max-width: 600px) {
            .recipe-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
            .recipe-card img, .recipe-card .no-img { height: 120px; }
        }
    </style>
</head>
<body>
    <div class="nav">
        <a href="../index.html">🏠 Home</a>
        <a href="#" class="active">📖 All Recipes</a>
    </div>
    <div class="recipe-header">
        <h1>Alicia's Recipe Collection</h1>
        <p>${recipes.length} recipes from the family cookbook</p>
    </div>
    <div class="recipe-container">
        <div class="search-container">
            <input type="text" class="search-box" id="searchBox" placeholder="Search recipes by name or ingredient..." />
        </div>
        <div class="filter-tags">
            <button class="filter-tag active" data-filter="all">All Recipes</button>
            <button class="filter-tag" data-filter="chicken">Chicken</button>
            <button class="filter-tag" data-filter="beef">Beef</button>
            <button class="filter-tag" data-filter="pork">Pork</button>
            <button class="filter-tag" data-filter="lamb">Lamb</button>
            <button class="filter-tag" data-filter="seafood">Seafood</button>
            <button class="filter-tag" data-filter="soup">Soup</button>
            <button class="filter-tag" data-filter="pasta">Pasta</button>
            <button class="filter-tag" data-filter="keto">Keto</button>
            <button class="filter-tag" data-filter="dessert">Dessert</button>
            <button class="filter-tag" data-filter="casserole">Casserole</button>
            <button class="filter-tag" data-filter="salad">Salad</button>
            <button class="filter-tag" data-filter="bread">Bread</button>
        </div>
        <div class="result-count" id="resultCount">Showing all ${recipes.length} recipes</div>
        <div class="recipe-grid" id="recipeGrid">
${recipes.map(r => {
    const imgHtml = r.hasImage
        ? `<img src="../images/page_${r.number}.jpg" alt="${r.title}" loading="lazy">`
        : `<div class="no-img">🍽</div>`;
    return `            <a href="./${r.file}" class="recipe-card" data-search="${r.searchText}">
                ${imgHtml}
                <div class="card-body">
                    <h3>${r.title}</h3>
                </div>
            </a>`;
}).join('\n')}
        </div>
    </div>

    <script>
        const searchBox = document.getElementById('searchBox');
        const grid = document.getElementById('recipeGrid');
        const cards = grid.querySelectorAll('.recipe-card');
        const filterTags = document.querySelectorAll('.filter-tag');
        const resultCount = document.getElementById('resultCount');
        let activeFilter = 'all';

        function updateVisibility() {
            const term = searchBox.value.toLowerCase().trim();
            let visible = 0;
            cards.forEach(card => {
                const text = card.dataset.search;
                const matchesSearch = !term || term.split(/\\s+/).every(w => text.includes(w));
                const matchesFilter = activeFilter === 'all' || text.includes(activeFilter);
                const show = matchesSearch && matchesFilter;
                card.style.display = show ? '' : 'none';
                if (show) visible++;
            });
            resultCount.textContent = term || activeFilter !== 'all'
                ? 'Showing ' + visible + ' of ${recipes.length} recipes'
                : 'Showing all ${recipes.length} recipes';
        }

        searchBox.addEventListener('input', updateVisibility);

        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                filterTags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                activeFilter = this.dataset.filter;
                updateVisibility();
            });
        });
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(recipesDir, 'index.html'), html);
console.log(`✅ Updated recipes/index.html with ${recipes.length} recipes`);
