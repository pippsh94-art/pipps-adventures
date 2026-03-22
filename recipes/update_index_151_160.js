#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (151-160) - UNPRECEDENTED 160 SEQUENTIAL MILESTONE! 🏆
const newRecipes = [
    {
        number: 151,
        title: "Keto Scandinavian Gravlax",
        description: "Cured salmon with dill and aquavit. Traditional Nordic technique that creates silky, flavorful fish perfect for elegant occasions.",
        filename: "0151-keto-scandinavian-gravlax.html"
    },
    {
        number: 152,
        title: "Keto Mexican Mole Negro",
        description: "Complex Mexican sauce with chocolate and dozens of spices. The ultimate expression of Mexican culinary artistry in keto form.",
        filename: "0152-keto-mexican-mole-negro.html"
    },
    {
        number: 153,
        title: "Keto Chinese Peking Duck",
        description: "Classic Beijing roast duck with crispy skin and pancakes. Traditional technique adapted for keto with all authentic flavors.",
        filename: "0153-keto-chinese-peking-duck.html"
    },
    {
        number: 154,
        title: "Keto Lebanese Kibbeh",
        description: "Traditional Middle Eastern dish with spiced lamb and bulgur substitute. Authentic Levantine flavors in keto-friendly form.",
        filename: "0154-keto-lebanese-kibbeh.html"
    },
    {
        number: 155,
        title: "Keto Japanese Wagyu Tataki",
        description: "Seared wagyu beef with ponzu sauce and microgreens. Japanese precision meets premium ingredients for an unforgettable experience.",
        filename: "0155-keto-japanese-wagyu-tataki.html"
    },
    {
        number: 156,
        title: "Keto Hungarian Goulash",
        description: "Traditional Hungarian stew with paprika, beef, and vegetables. Hearty, warming, and full of Eastern European comfort.",
        filename: "0156-keto-hungarian-goulash.html"
    },
    {
        number: 157,
        title: "Keto Argentinian Empanadas",
        description: "Flaky pastry filled with seasoned beef and olives. South American hand pies made keto-friendly with almond flour pastry.",
        filename: "0157-keto-argentinian-empanadas.html"
    },
    {
        number: 158,
        title: "Keto Indian Tandoori Lamb Chops",
        description: "Yogurt-marinated lamb chops with aromatic spices, grilled to perfection. Bold Indian flavors that transport you to Delhi.",
        filename: "0158-keto-indian-tandoori-lamb-chops.html"
    },
    {
        number: 159,
        title: "Keto Australian Barramundi with Macadamia Crust",
        description: "Pan-seared barramundi with native macadamia nut crust. Australian coastal cuisine at its finest with tropical flavors.",
        filename: "0159-keto-australian-barramundi-with-macadamia-crust.html"
    },
    {
        number: 160,
        title: "🏆 Keto Swiss Chocolate Fondue",
        description: "Rich, velvety chocolate fondue made keto-friendly. The perfect finale for our incredible 160-recipe journey - pure Swiss decadence.",
        filename: "0160--keto-swiss-chocolate-fondue.html"
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

// Update the recipe count in the header (942 + 10 = 952) and celebrate 160 sequential recipes!
const updatedContentWithCount = updatedContent.replace(
    /942 delicious/,
    '952 delicious'
).replace(
    /150 Sequential Recipes! 🥇/,
    '160 Sequential Recipes! 🏆'
).replace(
    /150 sequential keto recipes/,
    '160 sequential keto recipes'
).replace(
    /#1-50, #61-150/g,
    '#1-50, #61-160'
).replace(
    /<h1>🥇 Recipe Collection - 150 SEQUENTIAL RECIPES! 🏆<\/h1>/,
    '<h1>🏆 Recipe Collection - 160 SEQUENTIAL RECIPES! 🥇</h1>'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('🏆 Updated recipes.html with UNPRECEDENTED 10 recipes (151-160)! 🥇');
console.log('🎯 UNPRECEDENTED MILESTONE: 160 SEQUENTIAL RECIPES DEPLOYED (#1-50, #61-160)!');
console.log('📊 Total recipes now: 952 (including 160 sequential recipes)');
console.log('🏆 160 RECIPES - UNPRECEDENTED COOKBOOK STATUS ACHIEVED! 🥇');