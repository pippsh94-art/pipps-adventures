#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (111-120) - REACHING 120 SEQUENTIAL RECIPES! 🌟
const newRecipes = [
    {
        number: 111,
        title: "Keto Smoky Paprika Pork Shoulder",
        description: "Slow-cooked pork shoulder with smoky paprika and herbs. Tender, flavorful, and perfect for meal prep or feeding a crowd.",
        filename: "0111-keto-smoky-paprika-pork-shoulder.html"
    },
    {
        number: 112,
        title: "Keto Caprese Stuffed Chicken",
        description: "Juicy chicken breasts stuffed with fresh mozzarella, tomatoes, and basil. Italian flavors in every bite.",
        filename: "0112-keto-caprese-stuffed-chicken.html"
    },
    {
        number: 113,
        title: "Keto Coconut Curry Vegetables",
        description: "Vibrant vegetables in a rich coconut curry sauce. A satisfying vegetarian dish packed with flavor and nutrients.",
        filename: "0113-keto-coconut-curry-vegetables.html"
    },
    {
        number: 114,
        title: "Keto Bacon-Wrapped Scallops",
        description: "Succulent scallops wrapped in crispy bacon and pan-seared to perfection. An elegant appetizer or main course.",
        filename: "0114-keto-baconwrapped-scallops.html"
    },
    {
        number: 115,
        title: "Keto Chocolate Peanut Butter Cups",
        description: "Homemade chocolate peanut butter cups with no sugar added. Rich, creamy, and perfectly portioned for keto dessert cravings.",
        filename: "0115-keto-chocolate-peanut-butter-cups.html"
    },
    {
        number: 116,
        title: "Keto Beef Bourguignon",
        description: "Classic French beef stew with red wine, mushrooms, and herbs. Rich, elegant, and perfect for special occasions.",
        filename: "0116-keto-beef-bourguignon.html"
    },
    {
        number: 117,
        title: "Keto Mexican Street Corn Salad",
        description: "All the flavors of Mexican street corn in a keto-friendly salad using cauliflower. Tangy, spicy, and absolutely delicious.",
        filename: "0117-keto-mexican-street-corn-salad.html"
    },
    {
        number: 118,
        title: "Keto Lemon Herb Roasted Chicken",
        description: "Whole roasted chicken with bright lemon and fresh herbs. Crispy skin, juicy meat, and perfect for Sunday dinner.",
        filename: "0118-keto-lemon-herb-roasted-chicken.html"
    },
    {
        number: 119,
        title: "Keto Eggplant Lasagna",
        description: "Layers of roasted eggplant with rich meat sauce and creamy cheeses. All the comfort of traditional lasagna without the carbs.",
        filename: "0119-keto-eggplant-lasagna.html"
    },
    {
        number: 120,
        title: "🍮 Keto Crème Brûlée",
        description: "Classic French dessert with a silky vanilla custard and crispy caramelized top. Elegant finale to any special meal.",
        filename: "0120-keto-crme-brle.html"
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

// Update the recipe count in the header (902 + 10 = 912) and celebrate 120 sequential recipes!
const updatedContentWithCount = updatedContent.replace(
    /902 delicious/,
    '912 delicious'
).replace(
    /110 Sequential Recipes! 🚀/,
    '120 Sequential Recipes! 🌟'
).replace(
    /110 sequential keto recipes/,
    '120 sequential keto recipes'
).replace(
    /#1-50, #61-110/g,
    '#1-50, #61-120'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('🌟 Updated recipes.html with SPECTACULAR 10 recipes (111-120)! 🎊');
console.log('🎯 NEW MILESTONE: 120 SEQUENTIAL RECIPES DEPLOYED (#1-50, #61-120)!');
console.log('📊 Total recipes now: 912 (including 120 sequential recipes)');
console.log('🎊 120 RECIPES - This is an incredible achievement worthy of celebration! 🌟');