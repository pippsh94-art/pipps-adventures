#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (131-140) - LEGENDARY 140 SEQUENTIAL MILESTONE! 🏆
const newRecipes = [
    {
        number: 131,
        title: "Keto Osso Buco",
        description: "Slow-braised veal shanks in wine and aromatics. An Italian classic that's rich, tender, and perfect for special occasions.",
        filename: "0131-keto-osso-buco.html"
    },
    {
        number: 132,
        title: "Keto Spanish Paella with Cauliflower Rice",
        description: "Traditional Spanish paella reimagined with cauliflower rice, saffron, and fresh seafood. All the authentic flavors, keto-friendly.",
        filename: "0132-keto-spanish-paella-with-cauliflower-rice.html"
    },
    {
        number: 133,
        title: "Keto Chocolate Lava Brownies",
        description: "Fudgy brownies with molten chocolate centers. Decadent, rich, and the ultimate keto chocolate dessert.",
        filename: "0133-keto-chocolate-lava-brownies.html"
    },
    {
        number: 134,
        title: "Keto Thai Red Curry with Beef",
        description: "Aromatic Thai red curry with tender beef and vegetables in rich coconut milk. Authentic flavors that transport you to Thailand.",
        filename: "0134-keto-thai-red-curry-with-beef.html"
    },
    {
        number: 135,
        title: "Keto Braised Short Ribs",
        description: "Fall-off-the-bone beef short ribs braised in red wine and herbs. Rich, comforting, and perfect for cold weather.",
        filename: "0135-keto-braised-short-ribs.html"
    },
    {
        number: 136,
        title: "Keto Mushroom Wellington",
        description: "Elegant mushroom and herb filling wrapped in keto pastry. A stunning vegetarian centerpiece for special occasions.",
        filename: "0136-keto-mushroom-wellington.html"
    },
    {
        number: 137,
        title: "Keto Korean BBQ Ribs",
        description: "Tender ribs with sweet and savory Korean flavors. Marinated in gochujang and served with pickled vegetables.",
        filename: "0137-keto-korean-bbq-ribs.html"
    },
    {
        number: 138,
        title: "Keto Seafood Cioppino",
        description: "Italian-American seafood stew with tomatoes, wine, and fresh herbs. A celebration of the ocean's bounty in every bowl.",
        filename: "0138-keto-seafood-cioppino.html"
    },
    {
        number: 139,
        title: "Keto Ricotta Gnocchi with Brown Butter Sage",
        description: "Light, fluffy ricotta gnocchi in a nutty brown butter sage sauce. An elegant Italian dish that's surprisingly keto-friendly.",
        filename: "0139-keto-ricotta-gnocchi-with-brown-butter-sage.html"
    },
    {
        number: 140,
        title: "🎭 Keto Opera Cake",
        description: "Elegant French layer cake with almond sponge, chocolate ganache, and coffee buttercream. The ultimate keto celebration dessert.",
        filename: "0140-keto-opera-cake.html"
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

// Add at the end before footer
const insertionPoint = currentContent.lastIndexOf('    </div>\\n    \\n    <div class="footer">');
const updatedContent = currentContent.slice(0, insertionPoint) + 
                      newRecipeCards + '\\n' +
                      currentContent.slice(insertionPoint);

// Update the recipe count in the header (922 + 10 = 932) and celebrate 140 sequential recipes!
const updatedContentWithCount = updatedContent.replace(
    /922 delicious/,
    '932 delicious'
).replace(
    /130 Sequential Recipes! 🏆/,
    '140 Sequential Recipes! 🌟'
).replace(
    /130 sequential keto recipes/,
    '140 sequential keto recipes'
).replace(
    /#1-50, #61-130/g,
    '#1-50, #61-140'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('🌟 Updated recipes.html with LEGENDARY 10 recipes (131-140)! 🏆');
console.log('🎯 LEGENDARY MILESTONE: 140 SEQUENTIAL RECIPES DEPLOYED (#1-50, #61-140)!');
console.log('📊 Total recipes now: 932 (including 140 sequential recipes)');
console.log('🏆 140 RECIPES - LEGENDARY COOKBOOK STATUS ACHIEVED! 🌟');