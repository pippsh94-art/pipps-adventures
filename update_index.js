#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get all recipe HTML files
const recipesDir = './recipes';
const recipeFiles = fs.readdirSync(recipesDir)
    .filter(file => file.endsWith('.html') && file !== 'index.html' && file !== 'recipes.html')
    .sort((a, b) => {
        // Extract recipe numbers for proper sorting
        const numA = parseInt(a.split('-')[0]);
        const numB = parseInt(b.split('-')[0]);
        return numA - numB;
    });

console.log(`Found ${recipeFiles.length} recipe files`);

// Extract recipe data from each file
const recipes = recipeFiles.map(file => {
    const content = fs.readFileSync(path.join(recipesDir, file), 'utf8');
    
    // Extract title
    const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1] : 'Unknown Recipe';
    
    // Extract description (if exists)
    const descMatch = content.match(/<p class="description"[^>]*>(.*?)<\/p>/s);
    const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').slice(0, 120) + '...' : '';
    
    // Extract recipe number
    const numMatch = file.match(/^(\d{4})/);
    const recipeNum = numMatch ? numMatch[1] : '0000';
    
    return {
        file,
        title,
        description,
        number: recipeNum
    };
});

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alicia's Recipe Collection - ${recipes.length} Recipes</title>
    <link rel="stylesheet" href="../style.css">
    <style>
        .search-container {
            margin: 2rem 0;
            text-align: center;
        }
        .search-box {
            width: 100%;
            max-width: 500px;
            padding: 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1.1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .search-box:focus {
            outline: none;
            border-color: #3182ce;
            box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
        }
        .recipe-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }
        .recipe-card {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            text-decoration: none;
            color: inherit;
        }
        .recipe-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            text-decoration: none;
        }
        .recipe-number {
            font-size: 0.85rem;
            color: #718096;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        .recipe-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            color: #2d3748;
            line-height: 1.3;
        }
        .recipe-description {
            color: #4a5568;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        .stats {
            text-align: center;
            margin: 2rem 0;
            padding: 1.5rem;
            background: #f7fafc;
            border-radius: 12px;
            color: #4a5568;
        }
        .filter-tags {
            margin: 1rem 0 2rem;
            text-align: center;
        }
        .filter-tag {
            display: inline-block;
            padding: 0.5rem 1rem;
            margin: 0.25rem;
            background: #e2e8f0;
            border-radius: 20px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: background 0.2s;
        }
        .filter-tag:hover, .filter-tag.active {
            background: #3182ce;
            color: white;
        }
    </style>
</head>
<body>
    <div class="nav">
        <a href="../index.html">🏠 Home</a>
        <a href="#" class="active">📖 All Recipes</a>
    </div>
    <div class="container">
        <h1>🍳 Alicia's Recipe Collection</h1>
        
        <div class="stats">
            <h2>${recipes.length} Recipes Available</h2>
            <p>A complete digital collection from our family cookbook</p>
        </div>
        
        <div class="search-container">
            <input type="text" class="search-box" id="searchBox" placeholder="Search recipes..." />
        </div>
        
        <div class="filter-tags">
            <span class="filter-tag active" data-filter="all">All Recipes</span>
            <span class="filter-tag" data-filter="chicken">Chicken</span>
            <span class="filter-tag" data-filter="beef">Beef</span>
            <span class="filter-tag" data-filter="pork">Pork</span>
            <span class="filter-tag" data-filter="soup">Soup</span>
            <span class="filter-tag" data-filter="pasta">Pasta</span>
            <span class="filter-tag" data-filter="keto">Keto</span>
            <span class="filter-tag" data-filter="dessert">Dessert</span>
        </div>
        
        <div class="recipe-grid" id="recipeGrid">
${recipes.map(recipe => `            <a href="./${recipe.file}" class="recipe-card" data-title="${recipe.title.toLowerCase()}" data-desc="${recipe.description.toLowerCase()}">
                <div class="recipe-number">Recipe #${recipe.number}</div>
                <h3 class="recipe-title">${recipe.title}</h3>
                <p class="recipe-description">${recipe.description}</p>
            </a>`).join('\n')}
        </div>
    </div>

    <script>
        // Search functionality
        const searchBox = document.getElementById('searchBox');
        const recipeGrid = document.getElementById('recipeGrid');
        const filterTags = document.querySelectorAll('.filter-tag');
        
        searchBox.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const recipes = recipeGrid.querySelectorAll('.recipe-card');
            
            recipes.forEach(recipe => {
                const title = recipe.dataset.title;
                const desc = recipe.dataset.desc;
                const visible = title.includes(searchTerm) || desc.includes(searchTerm);
                recipe.style.display = visible ? 'block' : 'none';
            });
        });
        
        // Filter functionality
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Remove active class from all tags
                filterTags.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tag
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                const recipes = recipeGrid.querySelectorAll('.recipe-card');
                
                recipes.forEach(recipe => {
                    if (filter === 'all') {
                        recipe.style.display = 'block';
                    } else {
                        const title = recipe.dataset.title;
                        const desc = recipe.dataset.desc;
                        const visible = title.includes(filter) || desc.includes(filter);
                        recipe.style.display = visible ? 'block' : 'none';
                    }
                });
            });
        });
    </script>
</body>
</html>`;

// Write the updated index
fs.writeFileSync(path.join(recipesDir, 'index.html'), html);
console.log(`✅ Updated recipes/index.html with ${recipes.length} recipes`);