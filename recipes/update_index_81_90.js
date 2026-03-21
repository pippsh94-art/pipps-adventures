#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (81-90)
const newRecipes = [
    {
        number: 81,
        title: "Keto Bacon and Egg Breakfast Muffins",
        description: "Fluffy, portable breakfast muffins loaded with bacon and eggs. Perfect for busy mornings and meal prep.",
        filename: "0081-ketobaconandeggbreakfastmuffins.html"
    },
    {
        number: 82,
        title: "Keto Thai Coconut Chicken Curry",
        description: "Authentic Thai flavors with tender chicken in a rich coconut curry sauce. Aromatic, creamy, and perfectly spiced.",
        filename: "0082-ketothaicoconutchickencurry.html"
    },
    {
        number: 83,
        title: "Keto Chocolate Lava Cake",
        description: "Individual chocolate lava cakes with molten centers. Rich, decadent, and surprisingly easy to make keto-friendly.",
        filename: "0083-ketochocolatelavacake.html"
    },
    {
        number: 84,
        title: "Keto Greek Stuffed Chicken Breast",
        description: "Chicken breasts stuffed with feta, spinach, and sun-dried tomatoes. Mediterranean flavors in every bite.",
        filename: "0084-ketogreekstuffedchickenbreast.html"
    },
    {
        number: 85,
        title: "Keto Cauliflower Tikka Masala",
        description: "Roasted cauliflower in a rich, creamy tomato-based tikka masala sauce. All the Indian flavors without the carbs.",
        filename: "0085-ketocauliflowertikkamasala.html"
    },
    {
        number: 86,
        title: "Keto Lemon Herb Baked Salmon",
        description: "Perfectly flaky salmon with a bright lemon herb crust. Light, healthy, and bursting with fresh flavors.",
        filename: "0086-ketolemonherbbakedsalmon.html"
    },
    {
        number: 87,
        title: "Keto Mexican Cauliflower Rice Bowl",
        description: "Flavorful Mexican-spiced cauliflower rice topped with avocado, cheese, and fresh salsa. A complete meal in a bowl.",
        filename: "0087-ketomexicancauliflowerricebowl.html"
    },
    {
        number: 88,
        title: "Keto Cheesy Bacon Brussels Sprouts",
        description: "Roasted Brussels sprouts with crispy bacon and melted cheese. Even Brussels sprouts haters will love this dish.",
        filename: "0088-ketocheesybaconbrusselssprouts.html"
    },
    {
        number: 89,
        title: "Keto Chicken Alfredo Zoodles",
        description: "Creamy chicken alfredo served over zucchini noodles. All the comfort of pasta alfredo without the carbs.",
        filename: "0089-ketochickenalfredozoodles.html"
    },
    {
        number: 90,
        title: "Keto Vanilla Panna Cotta",
        description: "Silky smooth Italian dessert with rich vanilla flavor. Elegant, make-ahead, and perfectly portioned for special occasions.",
        filename: "0090-ketovanillapannacotta.html"
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

// Update the recipe count in the header (872 + 10 = 882)
const updatedContentWithCount = updatedContent.replace(
    /872 delicious/,
    '882 delicious'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('✅ Updated recipes.html with 10 new recipes (81-90)');
console.log('✅ Total recipes now: 882 (sequential 1-50, 61-90 = 60 total sequential recipes!)');