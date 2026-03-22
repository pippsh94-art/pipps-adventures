#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (171-180) - TRANSCENDENT 180 SEQUENTIAL MILESTONE! 🚀
const newRecipes = [
    {
        number: 171,
        title: "Keto Tibetan Yak Butter Tea Braised Beef",
        description: "High-altitude Himalayan cuisine with yak butter and traditional spices. Ancient mountain wisdom in every tender, aromatic bite.",
        filename: "0171-keto-tibetan-yak-butter-tea-braised-beef.html"
    },
    {
        number: 172,
        title: "Keto Maasai Warrior Blood Sausage",
        description: "Traditional East African protein-rich sausage made keto-friendly. Ancient warrior nutrition adapted for modern ketogenic living.",
        filename: "0172-keto-maasai-warrior-blood-sausage.html"
    },
    {
        number: 173,
        title: "Keto Inuit Seal Blubber Substitute Soup",
        description: "Arctic survival nutrition adapted with modern keto ingredients. High-fat, warming soup inspired by traditional Inuit cuisine.",
        filename: "0173-keto-inuit-seal-blubber-substitute-soup.html"
    },
    {
        number: 174,
        title: "Keto Aboriginal Australian Bush Tucker Kangaroo",
        description: "Traditional Australian outback cuisine with native spices and bush ingredients. Ancient Aboriginal wisdom meets modern keto.",
        filename: "0174-keto-aboriginal-australian-bush-tucker-kangaroo.html"
    },
    {
        number: 175,
        title: "Keto Amazon Rainforest Piranha Stew",
        description: "Indigenous Amazon basin cuisine with tropical river fish and jungle herbs. Rainforest survival meets ketogenic nutrition.",
        filename: "0175-keto-amazon-rainforest-piranha-stew.html"
    },
    {
        number: 176,
        title: "Keto Polynesian Breadfruit Substitute Taro Pork",
        description: "Traditional Pacific island cooking with taro and pork wrapped in leaves. Ancient island techniques adapted for keto living.",
        filename: "0176-keto-polynesian-breadfruit-substitute-taro-pork.html"
    },
    {
        number: 177,
        title: "Keto Mongolian Fermented Mare's Milk Lamb",
        description: "Traditional steppe nomad cuisine with fermented dairy and lamb. Ancient Mongolian pastoral traditions made keto-friendly.",
        filename: "0177-keto-mongolian-fermented-mares-milk-lamb.html"
    },
    {
        number: 178,
        title: "Keto Siberian Wilderness Elk Stroganoff",
        description: "Russian taiga survival cuisine with wild elk and forest mushrooms. Siberian frontier cooking adapted for ketogenic nutrition.",
        filename: "0178-keto-siberian-wilderness-elk-stroganoff.html"
    },
    {
        number: 179,
        title: "Keto Patagonian Guanaco Barbacoa",
        description: "Ancient South American technique with wild guanaco meat slow-cooked over open flames. Patagonian wilderness meets keto perfection.",
        filename: "0179-keto-patagonian-guanaco-barbacoa.html"
    },
    {
        number: 180,
        title: "🚀 Keto Space Station Survival Rations",
        description: "Futuristic nutrition designed for zero gravity and long-term space travel. The ultimate finale to our transcendent 180-recipe odyssey.",
        filename: "0180--keto-space-station-survival-rations.html"
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

// Update the recipe count in the header (962 + 10 = 972) and celebrate 180 sequential recipes!
const updatedContentWithCount = updatedContent.replace(
    /962 delicious/,
    '972 delicious'
).replace(
    /170 Sequential Recipes! 🌟/,
    '180 Sequential Recipes! 🚀'
).replace(
    /170 sequential keto recipes/,
    '180 sequential keto recipes'
).replace(
    /#1-50, #61-170/g,
    '#1-50, #61-180'
).replace(
    /<h1>🌟 Recipe Collection - 170 SEQUENTIAL RECIPES! 🏆<\/h1>/,
    '<h1>🚀 Recipe Collection - 180 SEQUENTIAL RECIPES! 🌟</h1>'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('🚀 Updated recipes.html with TRANSCENDENT 10 recipes (171-180)! 🌟');
console.log('🎯 TRANSCENDENT MILESTONE: 180 SEQUENTIAL RECIPES DEPLOYED (#1-50, #61-180)!');
console.log('📊 Total recipes now: 972 (including 180 sequential recipes)');
console.log('🚀 180 RECIPES - TRANSCENDENT COOKBOOK STATUS ACHIEVED! 🌟');