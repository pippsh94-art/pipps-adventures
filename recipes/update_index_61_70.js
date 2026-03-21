#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (61-70)
const newRecipes = [
    {
        number: 61,
        title: "Keto Chicken Cordon Bleu",
        description: "Classic chicken cordon bleu made keto-friendly with pork rind breading, ham, and Swiss cheese. Elegant enough for dinner parties.",
        filename: "0061-ketochickencordonbleu.html"
    },
    {
        number: 62,
        title: "Keto Loaded Cauliflower Bake",
        description: "All the flavors of loaded baked potatoes but made with cauliflower. Topped with bacon, cheese, and green onions.",
        filename: "0062-ketoloadedcauliflowerbake.html"
    },
    {
        number: 63,
        title: "Keto Lemon Butter Chicken Thighs",
        description: "Juicy chicken thighs in a bright lemon butter sauce with herbs. Simple, flavorful, and ready in one pan.",
        filename: "0063-ketolemonbutterchickenthighs.html"
    },
    {
        number: 64,
        title: "Keto Tuna Salad Lettuce Wraps",
        description: "Light and refreshing tuna salad made with avocado mayo, served in crisp lettuce cups. Perfect for lunch or a light dinner.",
        filename: "0064-ketotunasaladlettucewraps.html"
    },
    {
        number: 65,
        title: "Keto Sausage and Pepper Skillet",
        description: "Colorful bell peppers and onions sautéed with Italian sausage. A one-pan meal that's hearty and satisfying.",
        filename: "0065-ketosausageandpepperskillet.html"
    },
    {
        number: 66,
        title: "Keto Coconut Curry Shrimp",
        description: "Creamy coconut curry with plump shrimp and aromatic spices. Exotic flavors that transport you to the tropics.",
        filename: "0066-ketococonutcurryshrimp.html"
    },
    {
        number: 67,
        title: "Keto Beef and Mushroom Casserole",
        description: "Hearty casserole with ground beef, mushrooms, and a creamy cheese sauce. Comfort food that's family-friendly and filling.",
        filename: "0067-ketobeefandmushroomcasserole.html"
    },
    {
        number: 68,
        title: "Keto Baked Cod with Herbs",
        description: "Flaky white cod baked with fresh herbs, lemon, and butter. Light, healthy, and full of Mediterranean flavors.",
        filename: "0068-ketobakedcodwithherbs.html"
    },
    {
        number: 69,
        title: "Keto Spinach Artichoke Chicken",
        description: "Chicken breasts topped with a creamy spinach artichoke mixture and melted cheese. Restaurant-quality at home.",
        filename: "0069-ketospinachartichokechicken.html"
    },
    {
        number: 70,
        title: "Keto Cauliflower Gratin",
        description: "Rich and creamy cauliflower gratin with multiple cheeses and herbs. The perfect side dish for any keto meal.",
        filename: "0070-ketocauliflowergratin.html"
    }
];

// Generate HTML cards for new recipes
let newRecipeCards = '';
newRecipes.forEach(recipe => {
    newRecipeCards += `        <div class="recipe-card">
            <h3><a href="html/${recipe.filename}">${recipe.title}</a></h3>
            <p>${recipe.description}</p>
            <div class="recipe-number">#${recipe.number}</div>
        </div>
`;
});

// Add at the end before footer (after the last recipe from previous batches)
const insertionPoint = currentContent.lastIndexOf('    </div>\\n    \\n    <div class="footer">');
const updatedContent = currentContent.slice(0, insertionPoint) + 
                      newRecipeCards + '\\n' +
                      currentContent.slice(insertionPoint);

// Update the recipe count in the header (852 + 10 = 862)
const updatedContentWithCount = updatedContent.replace(
    /852 delicious/,
    '862 delicious'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('✅ Updated recipes.html with 10 new recipes (61-70)');
console.log('✅ Total recipes now: 862 (41-50 + 61-70 + previous batches)');