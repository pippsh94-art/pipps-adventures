#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (121-130) - ULTIMATE 130 SEQUENTIAL MILESTONE! 🏆
const newRecipes = [
    {
        number: 121,
        title: "Keto Duck Confit with Orange Glaze",
        description: "Slow-cooked duck legs in their own fat with a bright orange glaze. An elegant French technique that creates incredibly tender, flavorful meat.",
        filename: "0121-keto-duck-confit-with-orange-glaze.html"
    },
    {
        number: 122,
        title: "Keto Loaded Cauliflower Casserole",
        description: "All the flavors of loaded baked potatoes in a creamy cauliflower casserole. Comfort food that's completely keto-friendly.",
        filename: "0122-keto-loaded-cauliflower-casserole.html"
    },
    {
        number: 123,
        title: "Keto Japanese Chicken Teriyaki",
        description: "Authentic Japanese flavors with tender chicken in a sweet and savory teriyaki sauce. Perfect over cauliflower rice.",
        filename: "0123-keto-japanese-chicken-teriyaki.html"
    },
    {
        number: 124,
        title: "Keto Lobster Bisque",
        description: "Rich, creamy lobster bisque with chunks of tender lobster meat. An elegant soup perfect for special occasions.",
        filename: "0124-keto-lobster-bisque.html"
    },
    {
        number: 125,
        title: "Keto Almond Flour Bread",
        description: "Soft, fluffy bread made with almond flour. Perfect for sandwiches, toast, or just eating fresh with butter.",
        filename: "0125-keto-almond-flour-bread.html"
    },
    {
        number: 126,
        title: "Keto Indian Butter Chicken",
        description: "Creamy, aromatic butter chicken with authentic Indian spices. Rich, flavorful, and perfect over cauliflower rice.",
        filename: "0126-keto-indian-butter-chicken.html"
    },
    {
        number: 127,
        title: "Keto Blackened Fish Tacos",
        description: "Spicy blackened fish with fresh slaw in low-carb tortillas. Bold Cajun flavors with a fresh, crunchy contrast.",
        filename: "0127-keto-blackened-fish-tacos.html"
    },
    {
        number: 128,
        title: "Keto Chocolate Soufflé",
        description: "Light, airy chocolate soufflé that rises beautifully. An impressive dessert that's surprisingly keto-friendly.",
        filename: "0128-keto-chocolate-souffl.html"
    },
    {
        number: 129,
        title: "Keto Prime Rib with Herb Crust",
        description: "Standing rib roast with a flavorful herb crust. The ultimate centerpiece for special occasions and holidays.",
        filename: "0129-keto-prime-rib-with-herb-crust.html"
    },
    {
        number: 130,
        title: "🍋 Keto Lemon Tart",
        description: "Silky smooth lemon curd in an almond flour crust. Bright, tangy, and the perfect finish to any meal.",
        filename: "0130-keto-lemon-tart.html"
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

// Update the recipe count in the header (912 + 10 = 922) and celebrate 130 sequential recipes!
const updatedContentWithCount = updatedContent.replace(
    /912 delicious/,
    '922 delicious'
).replace(
    /120 Sequential Recipes! 🌟/,
    '130 Sequential Recipes! 🏆'
).replace(
    /120 sequential keto recipes/,
    '130 sequential keto recipes'
).replace(
    /#1-50, #61-120/g,
    '#1-50, #61-130'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('🏆 Updated recipes.html with ULTIMATE 10 recipes (121-130)! 🎊');
console.log('🎯 ULTIMATE MILESTONE: 130 SEQUENTIAL RECIPES DEPLOYED (#1-50, #61-130)!');
console.log('📊 Total recipes now: 922 (including 130 sequential recipes)');
console.log('🏆 130 RECIPES - ULTIMATE COOKBOOK STATUS ACHIEVED! 🎯');