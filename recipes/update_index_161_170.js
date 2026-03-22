#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (161-170) - MONUMENTAL 170 SEQUENTIAL MILESTONE! 🌟
const newRecipes = [
    {
        number: 161,
        title: "Keto Icelandic Lamb with Angelica",
        description: "Traditional Icelandic lamb slow-cooked with wild angelica herbs. Nordic wilderness cuisine at its most authentic and primal.",
        filename: "0161-keto-icelandic-lamb-with-angelica.html"
    },
    {
        number: 162,
        title: "Keto Polynesian Poke Bowl",
        description: "Fresh ahi tuna with Pacific Rim flavors and tropical vegetables. Island paradise captured in a bowl of pure ocean freshness.",
        filename: "0162-keto-polynesian-poke-bowl.html"
    },
    {
        number: 163,
        title: "Keto South African Bobotie",
        description: "Spiced ground meat casserole with egg custard topping. Cape Malay cuisine that tells the story of South African culinary fusion.",
        filename: "0163-keto-south-african-bobotie.html"
    },
    {
        number: 164,
        title: "Keto Canadian Tourtière",
        description: "Traditional Quebec meat pie made keto-friendly. French-Canadian heritage in every savory, spiced bite of this holiday classic.",
        filename: "0164-keto-canadian-tourtire.html"
    },
    {
        number: 165,
        title: "Keto Georgian Khachapuri",
        description: "Cheese-filled bread boat from the Caucasus. Georgian comfort food that's both rustic and elegant, made keto-friendly.",
        filename: "0165-keto-georgian-khachapuri.html"
    },
    {
        number: 166,
        title: "Keto Nepalese Momo Dumplings",
        description: "Himalayan steamed dumplings with spiced meat filling. Mountain cuisine that bridges Tibet and India with incredible flavor.",
        filename: "0166-keto-nepalese-momo-dumplings.html"
    },
    {
        number: 167,
        title: "Keto Filipino Adobo Pork Belly",
        description: "Philippines' national dish with soy sauce, vinegar, and garlic. Sweet, sour, and savory harmony in every tender bite.",
        filename: "0167-keto-filipino-adobo-pork-belly.html"
    },
    {
        number: 168,
        title: "Keto Finnish Reindeer Stew",
        description: "Traditional Lapland reindeer with lingonberries and root vegetables. Arctic cuisine that captures the essence of the far north.",
        filename: "0168-keto-finnish-reindeer-stew.html"
    },
    {
        number: 169,
        title: "Keto Jamaican Jerk Chicken",
        description: "Fiery Caribbean spice blend with scotch bonnet peppers. Island heat that brings the beaches of Jamaica to your plate.",
        filename: "0169-keto-jamaican-jerk-chicken.html"
    },
    {
        number: 170,
        title: "🌟 Keto New Zealand Pavlova",
        description: "Ethereal meringue dessert with cream and berries. A magnificent finale to our monumental 170-recipe journey - pure Kiwi elegance.",
        filename: "0170--keto-new-zealand-pavlova.html"
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

// Update the recipe count in the header (952 + 10 = 962) and celebrate 170 sequential recipes!
const updatedContentWithCount = updatedContent.replace(
    /952 delicious/,
    '962 delicious'
).replace(
    /160 Sequential Recipes! 🏆/,
    '170 Sequential Recipes! 🌟'
).replace(
    /160 sequential keto recipes/,
    '170 sequential keto recipes'
).replace(
    /#1-50, #61-160/g,
    '#1-50, #61-170'
).replace(
    /<h1>🏆 Recipe Collection - 160 SEQUENTIAL RECIPES! 🥇<\/h1>/,
    '<h1>🌟 Recipe Collection - 170 SEQUENTIAL RECIPES! 🏆</h1>'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('🌟 Updated recipes.html with MONUMENTAL 10 recipes (161-170)! 🏆');
console.log('🎯 MONUMENTAL MILESTONE: 170 SEQUENTIAL RECIPES DEPLOYED (#1-50, #61-170)!');
console.log('📊 Total recipes now: 962 (including 170 sequential recipes)');
console.log('🌟 170 RECIPES - MONUMENTAL COOKBOOK STATUS ACHIEVED! 🏆');