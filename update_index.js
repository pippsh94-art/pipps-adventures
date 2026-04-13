#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read cleaned recipe metadata from Alicia site
const metaPath = '/Users/pipps/Fun-with-claude/projects/Alicia-recipe/recipes_meta.json';
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const recipesDir = './recipes';
const recipeFiles = fs.readdirSync(recipesDir)
    .filter(file => file.endsWith('.html') && file !== 'index.html');

const fileMap = {};
recipeFiles.forEach(file => {
    const num = parseInt(file.split('-')[0]);
    if (!isNaN(num)) fileMap[num] = file;
});

// --- Category classification ---
function classify(title, ingredients) {
    const t = title.toLowerCase();
    const ing = ingredients.toLowerCase();
    const all = `${t} ${ing}`;
    const cats = [];

    // Proteins
    if (/\bchicken\b/.test(all) && !/\bchicken broth\b/.test(ing)) cats.push('chicken');
    else if (/\bchicken\b/.test(t)) cats.push('chicken');
    if (/\bbeef\b|\bsteak\b|\bfilet mignon\b|\bflank\b|\bbrisket\b|\bshort rib/.test(all)) cats.push('beef');
    if (/\bpork\b|\bbacon\b|\bham\b|\bsausage\b|\bbratwurst/.test(all) && !/\bchicken bacon\b/.test(t)) cats.push('pork');
    if (/\blamb\b/.test(all)) cats.push('lamb');
    if (/\bshrimp\b|\bsalmon\b|\bscallop\b|\bcrab\b|\blobster\b|\bseafood\b|\bfish\b|\btuna\b|\bcod\b|\btilapia\b|\bmahi\b|\boyster\b/.test(all)) cats.push('seafood');

    // Meal types
    if (/\bsoup\b|\bchowder\b|\bstew\b|\bbisque\b|\bbroth\b|\bribollito\b|\btagine\b/.test(t)) cats.push('soup');
    if (/\bpasta\b|\bspaghetti\b|\bpenne\b|\brigatoni\b|\bfettuccin\b|\blinguine\b|\bmacaroni\b|\bnoodle\b|\bravioli\b|\bgnocchi\b|\blasagna\b|\btetrazzini\b|\bstroganoff\b|\bamatriciana\b/.test(all)) cats.push('pasta');
    if (/\bketo\b|\blow carb\b/.test(t)) cats.push('keto');
    if (/\bcasserole\b|\bskillet\b/.test(t)) cats.push('casserole');
    if (/\bsalad\b|\bslaw\b/.test(t)) cats.push('salad');
    if (/\bbread\b|\bbiscuit\b|\broll\b|\bfocaccia\b|\bbiscotti\b/.test(t) && !isDesert(t)) cats.push('bread');

    // Dessert subcategories - be precise
    if (isCookie(t)) cats.push('cookie', 'dessert');
    if (isCake(t)) cats.push('cake', 'dessert');
    if (isPie(t) && isDesertPie(t, ing)) cats.push('pie', 'dessert');
    if (isDesert(t) && !cats.includes('dessert')) cats.push('dessert');

    return [...new Set(cats)];
}

function isCookie(t) {
    if (/\bcheesecake\b/.test(t)) return false; // cheesecakes are cakes
    return /\bcookie\b|\bcookies\b|\bshortbread\b|\bbiscotti\b|\bthin mint\b|\bunbaked\b|\bmacaroon/.test(t);
}

function isCake(t) {
    return /\bcake\b|\bcupcake\b|\bcheesecake\b|\bupside.down\b/.test(t) && !/\bpancake\b|\bcrab cake\b|\bcorn cake\b|\brice cake\b|\bchicken.*cheesecake\b/.test(t);
}

function isPie(t) {
    return /\bpie\b|\btart\b|\bcobbler\b|\bcrisp\b|\bcrumble\b/.test(t);
}

function isDesertPie(t, ing) {
    // Exclude savory pies
    if (/\bpot pie\b|\btaco pie\b|\bmeat pie\b|\bturkey pie\b|\bfiesta\b|\btamale pie\b|\bchicken pie\b|\bquiche\b|\bshepherd\b|\bcornbread\b|\bcarnivore\b|\bzucchini pie\b|\btrash pie\b/.test(t)) return false;
    return true;
}

function isDesert(t) {
    if (/\bbrownie\b|\bfudge\b|\bcandy\b|\btoffee\b|\bcaramel bar\b|\bpeanut butter bar\b|\bpeanut butter treat\b|\bno bake peanut butter\b/.test(t)) return true;
    if (/\bice cream\b|\bmousse\b|\bpudding\b|\bcustard\b|\btruffle\b|\bcream puff\b|\bcookie dough\b/.test(t)) return true;
    if (/\bfrosted lemonade\b|\bprotein.*bark\b/.test(t)) return true;
    if (/\bchocolate\b/.test(t) && !/\bchili\b|\bstew\b|\bmole\b/.test(t)) return true;
    if (/\brhubarb\b/.test(t)) return true;
    return false;
}

// Build recipe data
const recipes = meta
    .filter(r => fileMap[r.page_num])
    .sort((a, b) => a.page_num - b.page_num)
    .map(r => {
        const num = r.page_num;
        const title = r.title || 'Untitled Recipe';
        const ingredients = (r.ingredients || []).join(', ');
        const hasImage = fs.existsSync(`./images/page_${String(num).padStart(4, '0')}.jpg`);
        const cats = classify(title, ingredients);
        return {
            file: fileMap[num],
            title,
            number: String(num).padStart(4, '0'),
            searchText: `${title.toLowerCase()} ${ingredients.toLowerCase()}`,
            categories: cats,
            hasImage
        };
    });

// Report category counts
const catCounts = {};
recipes.forEach(r => r.categories.forEach(c => { catCounts[c] = (catCounts[c] || 0) + 1; }));
console.log('Category counts:');
Object.entries(catCounts).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
});

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
        .filter-section { margin: 1.5rem 0; text-align: center; }
        .filter-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: #718096; font-weight: 600; margin-bottom: 8px; }
        .filter-tags { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 12px; }
        .filter-tag {
            padding: 7px 16px; border-radius: 24px; font-size: 0.85rem;
            cursor: pointer; transition: all 0.2s; border: 1.5px solid #e2e8f0;
            background: white; color: #4a5568; font-family: inherit;
        }
        .filter-tag:hover { background: #edf2f7; border-color: #cbd5e0; }
        .filter-tag.active { background: #3182ce; color: white; border-color: #3182ce; }
        .filter-tag .count { font-size: 0.75rem; opacity: 0.7; margin-left: 4px; }
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
        .card-tags { display: flex; flex-wrap: wrap; gap: 4px; }
        .card-tag { font-size: 0.7rem; padding: 2px 8px; border-radius: 10px; background: #edf2f7; color: #718096; }
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
        <div class="filter-section">
            <div class="filter-label">Protein</div>
            <div class="filter-tags">
                <button class="filter-tag active" data-filter="all">All<span class="count">${recipes.length}</span></button>
                <button class="filter-tag" data-filter="chicken">Chicken<span class="count">${catCounts['chicken'] || 0}</span></button>
                <button class="filter-tag" data-filter="beef">Beef<span class="count">${catCounts['beef'] || 0}</span></button>
                <button class="filter-tag" data-filter="pork">Pork<span class="count">${catCounts['pork'] || 0}</span></button>
                <button class="filter-tag" data-filter="lamb">Lamb<span class="count">${catCounts['lamb'] || 0}</span></button>
                <button class="filter-tag" data-filter="seafood">Seafood<span class="count">${catCounts['seafood'] || 0}</span></button>
            </div>
            <div class="filter-label">Type</div>
            <div class="filter-tags">
                <button class="filter-tag" data-filter="soup">Soup<span class="count">${catCounts['soup'] || 0}</span></button>
                <button class="filter-tag" data-filter="pasta">Pasta<span class="count">${catCounts['pasta'] || 0}</span></button>
                <button class="filter-tag" data-filter="casserole">Casserole<span class="count">${catCounts['casserole'] || 0}</span></button>
                <button class="filter-tag" data-filter="salad">Salad<span class="count">${catCounts['salad'] || 0}</span></button>
                <button class="filter-tag" data-filter="keto">Keto<span class="count">${catCounts['keto'] || 0}</span></button>
                <button class="filter-tag" data-filter="bread">Bread<span class="count">${catCounts['bread'] || 0}</span></button>
            </div>
            <div class="filter-label">Sweets</div>
            <div class="filter-tags">
                <button class="filter-tag" data-filter="dessert">All Desserts<span class="count">${catCounts['dessert'] || 0}</span></button>
                <button class="filter-tag" data-filter="cookie">Cookies<span class="count">${catCounts['cookie'] || 0}</span></button>
                <button class="filter-tag" data-filter="cake">Cakes<span class="count">${catCounts['cake'] || 0}</span></button>
                <button class="filter-tag" data-filter="pie">Pies<span class="count">${catCounts['pie'] || 0}</span></button>
            </div>
        </div>
        <div class="result-count" id="resultCount">Showing all ${recipes.length} recipes</div>
        <div class="recipe-grid" id="recipeGrid">
${recipes.map(r => {
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const imgHtml = r.hasImage
        ? `<img src="../images/page_${r.number}.jpg" alt="${esc(r.title)}" loading="lazy">`
        : `<div class="no-img">🍽</div>`;
    const tagsHtml = r.categories.length > 0
        ? `<div class="card-tags">${r.categories.map(c => `<span class="card-tag">${c}</span>`).join('')}</div>`
        : '';
    return `            <a href="./${r.file}" class="recipe-card" data-search="${esc(r.searchText)}" data-cats="${r.categories.join(' ')}">
                ${imgHtml}
                <div class="card-body">
                    <h3>${esc(r.title)}</h3>
                    ${tagsHtml}
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
                const cats = card.dataset.cats;
                const matchesSearch = !term || term.split(/\\s+/).every(w => text.includes(w));
                const matchesFilter = activeFilter === 'all' || cats.split(' ').includes(activeFilter);
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
console.log(`\n✅ Updated recipes/index.html with ${recipes.length} recipes`);
