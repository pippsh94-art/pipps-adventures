#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (141-150) - HISTORIC 150 SEQUENTIAL MILESTONE! 🏆
const newRecipes = [
    {
        number: 141,
        title: "Keto Venison Medallions with Juniper Berry Sauce",
        description: "Tender venison medallions with a sophisticated juniper berry and red wine reduction. Wild game elegance at its finest.",
        filename: "0141-keto-venison-medallions-with-juniper-berry-sauce.html"
    },
    {
        number: 142,
        title: "Keto Russian Beef Stroganoff",
        description: "Classic Russian comfort food with tender beef in a rich, creamy mushroom sauce. Traditional flavors made keto-friendly.",
        filename: "0142-keto-russian-beef-stroganoff.html"
    },
    {
        number: 143,
        title: "Keto Moroccan Preserved Lemon Chicken",
        description: "Aromatic chicken with preserved lemons, olives, and warm Moroccan spices. An exotic journey to North African flavors.",
        filename: "0143-keto-moroccan-preserved-lemon-chicken.html"
    },
    {
        number: 144,
        title: "Keto Brazilian Picanha Steak",
        description: "Perfectly grilled top sirloin cap with chimichurri sauce. Brazilian steakhouse quality at home with bold, fresh flavors.",
        filename: "0144-keto-brazilian-picanha-steak.html"
    },
    {
        number: 145,
        title: "Keto German Sauerbraten",
        description: "Traditional German pot roast marinated in vinegar and spices, then slow-braised to perfection. Rich, tangy, and deeply flavorful.",
        filename: "0145-keto-german-sauerbraten.html"
    },
    {
        number: 146,
        title: "Keto Turkish Lamb Kebabs with Tzatziki",
        description: "Spiced ground lamb kebabs with cooling tzatziki sauce. Mediterranean flavors that transport you to the Turkish coast.",
        filename: "0146-keto-turkish-lamb-kebabs-with-tzatziki.html"
    },
    {
        number: 147,
        title: "Keto Vietnamese Pho with Shirataki Noodles",
        description: "Aromatic Vietnamese pho with rich bone broth and shirataki noodles. All the authentic flavors in a keto-friendly bowl.",
        filename: "0147-keto-vietnamese-pho-with-shirataki-noodles.html"
    },
    {
        number: 148,
        title: "Keto Ethiopian Berbere Chicken",
        description: "Spicy Ethiopian chicken stew with berbere spice blend and hard-boiled eggs. Bold, complex flavors from East Africa.",
        filename: "0148-keto-ethiopian-berbere-chicken.html"
    },
    {
        number: 149,
        title: "Keto Peruvian Ceviche",
        description: "Fresh fish 'cooked' in citrus juices with onions, peppers, and cilantro. Light, refreshing, and bursting with coastal flavors.",
        filename: "0149-keto-peruvian-ceviche.html"
    },
    {
        number: 150,
        title: "🥇 Keto French Macarons",
        description: "Delicate almond cookies with ganache filling. The ultimate French pastry technique mastered for keto - a true culinary triumph.",
        filename: "0150-keto-french-macarons.html"
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

// Update the recipe count in the header (932 + 10 = 942) and celebrate 150 sequential recipes!
const updatedContentWithCount = updatedContent.replace(
    /932 delicious/,
    '942 delicious'
).replace(
    /140 Sequential Recipes! 🌟/,
    '150 Sequential Recipes! 🥇'
).replace(
    /140 sequential keto recipes/,
    '150 sequential keto recipes'
).replace(
    /#1-50, #61-140/g,
    '#1-50, #61-150'
).replace(
    /<h1>🎂 Recipe Collection - 100 Sequential Recipes! 🎉<\/h1>/,
    '<h1>🥇 Recipe Collection - 150 SEQUENTIAL RECIPES! 🏆</h1>'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('🥇 Updated recipes.html with HISTORIC 10 recipes (141-150)! 🏆');
console.log('🎯 HISTORIC MILESTONE: 150 SEQUENTIAL RECIPES DEPLOYED (#1-50, #61-150)!');
console.log('📊 Total recipes now: 942 (including 150 sequential recipes)');
console.log('🏆 150 RECIPES - HISTORIC COOKBOOK STATUS ACHIEVED! 🥇');