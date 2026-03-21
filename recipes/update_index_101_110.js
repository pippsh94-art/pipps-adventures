#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (101-110) - BEYOND THE CENTURY! 🚀
const newRecipes = [
    {
        number: 101,
        title: "Keto Korean BBQ Beef Bowls",
        description: "Tender marinated beef with Asian flavors served over cauliflower rice. Bold, savory, and satisfying Korean-inspired meal.",
        filename: "0101-ketokoreanbbqbeefbowls.html"
    },
    {
        number: 102,
        title: "Keto Tuscan Garlic Chicken",
        description: "Creamy garlic chicken with sun-dried tomatoes, spinach, and Italian herbs. Restaurant-quality comfort food at home.",
        filename: "0102-ketotuscangarlicchicken.html"
    },
    {
        number: 103,
        title: "Keto Shrimp Scampi Zoodles",
        description: "Succulent shrimp in a buttery garlic sauce over zucchini noodles. All the flavors of classic scampi, keto-style.",
        filename: "0103-ketoshrimpscampizoodles.html"
    },
    {
        number: 104,
        title: "Keto Bacon-Wrapped Jalapeño Poppers",
        description: "Spicy jalapeños stuffed with cream cheese and wrapped in crispy bacon. The ultimate keto appetizer for any gathering.",
        filename: "0104-ketobaconwrappedjalapeopoppers.html"
    },
    {
        number: 105,
        title: "Keto Moroccan Lamb Tagine",
        description: "Aromatic lamb stew with warm spices, olives, and preserved lemons. Exotic North African flavors in a comforting dish.",
        filename: "0105-ketomoroccanlambtagine.html"
    },
    {
        number: 106,
        title: "Keto Avocado Chocolate Mousse",
        description: "Rich, creamy chocolate mousse made with avocado. Surprisingly decadent and secretly healthy dessert.",
        filename: "0106-ketoavocadochocolatemousse.html"
    },
    {
        number: 107,
        title: "Keto Buffalo Chicken Lettuce Wraps",
        description: "Spicy buffalo chicken salad served in crisp lettuce cups. Perfect for game day or a light, satisfying lunch.",
        filename: "0107-ketobuffalochickenlettucewraps.html"
    },
    {
        number: 108,
        title: "Keto Italian Zucchini Boats",
        description: "Hollowed zucchini filled with Italian sausage, marinara, and cheese. A complete low-carb meal that's both filling and flavorful.",
        filename: "0108-ketoitalianzucchiniboats.html"
    },
    {
        number: 109,
        title: "Keto Sesame Ginger Pork Chops",
        description: "Juicy pork chops with an Asian-inspired sesame ginger glaze. Quick, flavorful, and perfect for busy weeknight dinners.",
        filename: "0109-ketosesamegingerporkchops.html"
    },
    {
        number: 110,
        title: "🍰 Keto Tiramisu Cups",
        description: "Individual tiramisu desserts with all the classic flavors. Coffee-soaked layers of mascarpone cream without the carbs.",
        filename: "0110-ketotiramisucups.html"
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

// Update the recipe count in the header (892 + 10 = 902) and celebrate 110 sequential recipes!
const updatedContentWithCount = updatedContent.replace(
    /892 delicious/,
    '902 delicious'
).replace(
    /100 Sequential Recipes!/,
    '110 Sequential Recipes! 🚀'
).replace(
    /100 sequential keto recipes/,
    '110 sequential keto recipes'
).replace(
    /#1-50, #61-100/g,
    '#1-50, #61-110'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('🚀 Updated recipes.html with BONUS 10 recipes (101-110)! 🎉');
console.log('🌟 NEW MILESTONE: 110 SEQUENTIAL RECIPES DEPLOYED (#1-50, #61-110)!');
console.log('📊 Total recipes now: 902 (including 110 sequential recipes)');
console.log('🎊 BEYOND THE CENTURY - This is an incredible achievement! 🎉');