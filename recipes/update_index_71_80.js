#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (71-80)
const newRecipes = [
    {
        number: 71,
        title: "Keto Bacon-Wrapped Chicken Meatballs",
        description: "Juicy chicken meatballs wrapped in crispy bacon and baked to perfection. A crowd-pleasing appetizer or main dish.",
        filename: "0071-ketobaconwrappedchickenmeatballs.html"
    },
    {
        number: 72,
        title: "Keto Creamy Garlic Mushroom Chicken",
        description: "Tender chicken in a rich, creamy garlic mushroom sauce. Restaurant-quality flavor made at home in one skillet.",
        filename: "0072-ketocreamygarlicmushroomchicken.html"
    },
    {
        number: 73,
        title: "Keto Stuffed Portobello Mushrooms",
        description: "Large portobello caps stuffed with a savory mixture of Italian sausage, spinach, and cheese. Perfect as a main or side dish.",
        filename: "0073-ketostuffedportobellomushrooms.html"
    },
    {
        number: 74,
        title: "Keto Crab-Stuffed Avocados",
        description: "Fresh avocado halves filled with a delicious crab salad mixture. Light, elegant, and perfect for a special lunch or appetizer.",
        filename: "0074-ketocrabstuffedavocados.html"
    },
    {
        number: 75,
        title: "Keto Cheesy Broccoli Casserole",
        description: "Classic broccoli casserole made keto-friendly with a rich cheese sauce and crunchy almond topping. The perfect side dish.",
        filename: "0075-ketocheesybroccolicasserole.html"
    },
    {
        number: 76,
        title: "Keto Mediterranean Chicken Bowls",
        description: "Fresh Mediterranean flavors with grilled chicken, olives, feta, and a tangy lemon dressing. Perfect for meal prep.",
        filename: "0076-ketomediterraneanchickenbowls.html"
    },
    {
        number: 77,
        title: "Keto Bacon Ranch Chicken Salad",
        description: "Hearty chicken salad loaded with bacon, ranch flavors, and crunchy vegetables. Perfect for lettuce wraps or eating alone.",
        filename: "0077-ketobaconranchchickensalad.html"
    },
    {
        number: 78,
        title: "Keto Herb-Crusted Rack of Lamb",
        description: "Elegant rack of lamb with a flavorful herb and almond flour crust. Perfect for special occasions and dinner parties.",
        filename: "0078-ketoherbcrustedrackoflamb.html"
    },
    {
        number: 79,
        title: "Keto Cajun Shrimp and Sausage Skillet",
        description: "Spicy Cajun-seasoned shrimp and sausage with bell peppers and onions. A one-pan meal full of bold flavors.",
        filename: "0079-ketocajunshrimpandsausageskillet.html"
    },
    {
        number: 80,
        title: "Keto Strawberry Cheesecake Bars",
        description: "Creamy, no-bake cheesecake bars with a fresh strawberry topping and almond flour crust. The perfect keto dessert.",
        filename: "0080-ketostrawberrycheesecakebars.html"
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

// Update the recipe count in the header (862 + 10 = 872)
const updatedContentWithCount = updatedContent.replace(
    /862 delicious/,
    '872 delicious'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('✅ Updated recipes.html with 10 new recipes (71-80)');
console.log('✅ Total recipes now: 872 (sequential 1-50, 61-80 + previous batches)');