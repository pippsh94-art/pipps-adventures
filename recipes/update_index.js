#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read existing recipes.html to see the pattern
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (833-842)
const newRecipes = [
    {
        number: 833,
        title: "Keto Bacon-Wrapped Asparagus",
        description: "Tender asparagus spears wrapped in crispy bacon - a perfect low-carb side dish that's elegant enough for dinner parties yet simple enough for weeknight meals.",
        filename: "0833-ketobaconwrappedasparagus.html"
    },
    {
        number: 834,
        title: "Keto Spinach and Artichoke Stuffed Chicken",
        description: "Juicy chicken breasts stuffed with a creamy spinach and artichoke mixture, baked to perfection for a restaurant-quality keto dinner.",
        filename: "0834-ketospinachandartichokestuffedchicken.html"
    },
    {
        number: 835,
        title: "Keto Zucchini Fritters",
        description: "Crispy, golden fritters made with fresh zucchini and almond flour. Perfect as a side dish or appetizer with a dollop of sour cream.",
        filename: "0835-ketozucchinifritters.html"
    },
    {
        number: 836,
        title: "Keto Cauliflower Mac and Cheese",
        description: "All the comfort of traditional mac and cheese but made with cauliflower florets and a rich, creamy cheese sauce. Kid-approved!",
        filename: "0836-ketocauliflowermacandcheese.html"
    },
    {
        number: 837,
        title: "Keto Beef and Broccoli Stir Fry",
        description: "A quick and easy Asian-inspired stir fry with tender beef, crisp broccoli, and a savory low-carb sauce.",
        filename: "0837-ketobeefandbroccolistirfry.html"
    },
    {
        number: 838,
        title: "Keto Lemon Garlic Salmon",
        description: "Pan-seared salmon fillets with a bright lemon-garlic butter sauce. Ready in under 20 minutes and packed with flavor.",
        filename: "0838-ketolemongarlicsalmon.html"
    },
    {
        number: 839,
        title: "Keto Stuffed Bell Peppers",
        description: "Colorful bell peppers stuffed with a hearty mixture of ground beef, cauliflower rice, and melted cheese. A complete meal in one dish.",
        filename: "0839-ketostuffedbellpeppers.html"
    },
    {
        number: 840,
        title: "Keto Chocolate Avocado Mousse",
        description: "Rich and creamy chocolate mousse made with avocados for a healthy twist. No one will guess the secret ingredient!",
        filename: "0840-ketochocolateavocadomousse.html"
    },
    {
        number: 841,
        title: "Keto Garlic Butter Shrimp",
        description: "Succulent shrimp sautéed in garlic butter with herbs. Ready in just minutes and perfect over zucchini noodles or with a side salad.",
        filename: "0841-ketogarlicbuttershrimp.html"
    },
    {
        number: 842,
        title: "Keto Eggplant Parmesan",
        description: "Crispy breaded eggplant slices layered with marinara sauce and melted cheese. A satisfying vegetarian keto dinner.",
        filename: "0842-ketoeggplantparmesan.html"
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

// Find the insertion point (before the closing tag of recipes-grid)
const insertionPoint = currentContent.lastIndexOf('    </div>\n    \n    <div class="footer">');

// Insert new recipes before the footer
const updatedContent = currentContent.slice(0, insertionPoint) + 
                      newRecipeCards + '\n' +
                      currentContent.slice(insertionPoint);

// Update the recipe count in the header
const updatedContentWithCount = updatedContent.replace(
    /(\d+) delicious/,
    '842 delicious'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('✅ Updated recipes.html with 10 new recipes (833-842)');
console.log('✅ Total recipes now: 842');