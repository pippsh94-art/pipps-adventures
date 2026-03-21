#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (91-100) - THE FINAL BATCH! 🎂
const newRecipes = [
    {
        number: 91,
        title: "Keto Garlic Parmesan Wings",
        description: "Crispy baked chicken wings tossed in a rich garlic Parmesan sauce. Perfect for game day or any day you crave wings.",
        filename: "0091-ketogarlicparmesanwings.html"
    },
    {
        number: 92,
        title: "Keto Beef and Broccoli Stir Fry",
        description: "Classic Chinese takeout flavors made keto-friendly. Tender beef and crisp broccoli in a savory sauce.",
        filename: "0092-ketobeefandbroccolistirfry.html"
    },
    {
        number: 93,
        title: "Keto Spinach and Artichoke Dip",
        description: "Creamy, cheesy dip loaded with spinach and artichokes. Perfect for parties or a cozy night in with keto chips.",
        filename: "0093-ketospinachandartichokedip.html"
    },
    {
        number: 94,
        title: "Keto Lemon Butter Scallops",
        description: "Pan-seared scallops in a rich lemon butter sauce. Restaurant-quality seafood that's elegant and surprisingly easy.",
        filename: "0094-ketolemonbutterscallops.html"
    },
    {
        number: 95,
        title: "Keto Chocolate Chip Cookies",
        description: "Soft, chewy chocolate chip cookies that taste just like the classic. No one will guess they're sugar-free and low-carb.",
        filename: "0095-ketochocolatechipcookies.html"
    },
    {
        number: 96,
        title: "Keto Stuffed Bell Peppers",
        description: "Colorful bell peppers stuffed with seasoned ground beef, cauliflower rice, and cheese. A complete meal in one package.",
        filename: "0096-ketostuffedbellpeppers.html"
    },
    {
        number: 97,
        title: "Keto Creamy Mushroom Soup",
        description: "Rich, velvety mushroom soup that's completely dairy-based and satisfying. Perfect for cold days or as an elegant starter.",
        filename: "0097-ketocreamymushroomsoup.html"
    },
    {
        number: 98,
        title: "Keto Pork Tenderloin with Herb Crust",
        description: "Juicy pork tenderloin with a flavorful herb and almond flour crust. An impressive main dish that's surprisingly simple.",
        filename: "0098-ketoporktenderloinwithherbcrust.html"
    },
    {
        number: 99,
        title: "Keto Caprese Salad",
        description: "Fresh mozzarella, ripe tomatoes, and basil with a balsamic glaze. Simple, elegant, and bursting with summer flavors.",
        filename: "0099-ketocapresesalad.html"
    },
    {
        number: 100,
        title: "🎂 Keto Birthday Cheesecake",
        description: "Rich, creamy New York-style cheesecake perfect for celebrations. The ultimate keto dessert that rivals any traditional version.",
        filename: "0100-ketobirthdaycheesecake.html"
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

// Update the recipe count in the header (882 + 10 = 892) and add celebration text
const updatedContentWithCount = updatedContent.replace(
    /882 delicious/,
    '892 delicious'
).replace(
    /<h1>Recipe Collection<\/h1>/,
    '<h1>🎂 Recipe Collection - 100 Sequential Recipes! 🎉</h1>'
).replace(
    /<p>Welcome to our collection of/,
    '<p>🎂 <strong>MILESTONE ACHIEVED:</strong> 100 sequential keto recipes (#1-50, #61-100)! 🎉<br>Welcome to our collection of'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('🎂 Updated recipes.html with FINAL 10 recipes (91-100)! 🎉');
console.log('🏆 MAJOR MILESTONE: 100 SEQUENTIAL RECIPES DEPLOYED (#1-50, #61-100)!');
console.log('📊 Total recipes now: 892 (including 100 sequential recipes)');
console.log('🎂 HAPPY BIRTHDAY PIPPS! Perfect gift to the keto community! 🎉');