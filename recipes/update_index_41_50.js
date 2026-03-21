#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (41-50)
const newRecipes = [
    {
        number: 41,
        title: "Keto Buffalo Chicken Dip",
        description: "Creamy, spicy buffalo chicken dip that's perfect for game day or parties. Serve with pork rinds, celery sticks, or keto crackers.",
        filename: "0041-ketobuffalochickendip.html"
    },
    {
        number: 42,
        title: "Keto Mushroom Risotto",
        description: "Creamy, rich mushroom risotto made with cauliflower rice instead of traditional arborio rice. All the comfort, none of the carbs.",
        filename: "0042-ketomushroomrisotto.html"
    },
    {
        number: 43,
        title: "Keto Crack Chicken",
        description: "Addictive slow cooker chicken loaded with cream cheese, bacon, and ranch flavors. Perfect over cauliflower mash or in lettuce wraps.",
        filename: "0043-ketocrackchicken.html"
    },
    {
        number: 44,
        title: "Keto Pork Rind Crusted Fish",
        description: "Crispy baked fish fillets with a crunchy pork rind coating. Light, flaky, and full of flavor without the breadcrumbs.",
        filename: "0044-ketoporkrindcrustedfish.html"
    },
    {
        number: 45,
        title: "Keto Tuscan Chicken Skillet",
        description: "One-pan creamy Tuscan chicken with sun-dried tomatoes, spinach, and herbs. Rich, flavorful, and ready in under 30 minutes.",
        filename: "0045-ketotuscanchickenskillet.html"
    },
    {
        number: 46,
        title: "Keto Jalapeño Popper Casserole",
        description: "All the flavors of jalapeño poppers in a hearty casserole form. Creamy, spicy, and loaded with cheese and bacon.",
        filename: "0046-ketojalapeopoppercasserole.html"
    },
    {
        number: 47,
        title: "Keto Chocolate Chip Cookies",
        description: "Soft, chewy keto chocolate chip cookies made with almond flour. Sweet satisfaction without the sugar crash.",
        filename: "0047-ketochocolatechipcookies.html"
    },
    {
        number: 48,
        title: "Keto Beef Stroganoff",
        description: "Classic beef stroganoff made keto-friendly with tender beef strips in a rich, creamy mushroom sauce served over zucchini noodles.",
        filename: "0048-ketobeefstroganoff.html"
    },
    {
        number: 49,
        title: "Keto Avocado Egg Salad",
        description: "Creamy egg salad made with avocado instead of mayo. Perfect for lettuce wraps, keto sandwiches, or eating straight up.",
        filename: "0049-ketoavocadoeggsalad.html"
    },
    {
        number: 50,
        title: "Keto Pesto Zucchini Noodles",
        description: "Fresh zucchini noodles tossed in homemade basil pesto with cherry tomatoes and Parmesan. Light, fresh, and bursting with flavor.",
        filename: "0050-ketopestozucchininoodles.html"
    }
];

// Generate HTML cards for new recipes - insert after recipe #40
let newRecipeCards = '';
newRecipes.forEach(recipe => {
    newRecipeCards += `        <div class="recipe-card">
            <h3><a href="html/${recipe.filename}">${recipe.title}</a></h3>
            <p>${recipe.description}</p>
            <div class="recipe-number">#${recipe.number}</div>
        </div>
`;
});

// Find the insertion point after recipe #40 
// Look for the specific pattern of the #40 recipe card
const recipe40Pattern = /#40<\/div>\s*<\/div>/;
const match = currentContent.match(recipe40Pattern);

if (match) {
    const insertionPoint = match.index + match[0].length;
    
    // Insert new recipes after recipe #40
    const updatedContent = currentContent.slice(0, insertionPoint) + 
                          '\\n' + newRecipeCards +
                          currentContent.slice(insertionPoint);
    
    // Update the recipe count in the header (should now be 852 total: 842 from before + 10 new)
    const updatedContentWithCount = updatedContent.replace(
        /842 delicious/,
        '852 delicious'
    );
    
    // Write the updated file
    fs.writeFileSync(currentIndexPath, updatedContentWithCount);
    console.log('✅ Updated recipes.html with 10 new recipes (41-50)');
    console.log('✅ Total recipes now: 852 (includes previous 842 + new 10)');
} else {
    console.log('❌ Could not find insertion point after recipe #40');
    console.log('Adding recipes at the end instead...');
    
    // Fallback: add at the end before footer
    const insertionPoint = currentContent.lastIndexOf('    </div>\\n    \\n    <div class="footer">');
    const updatedContent = currentContent.slice(0, insertionPoint) + 
                          newRecipeCards + '\\n' +
                          currentContent.slice(insertionPoint);
    
    const updatedContentWithCount = updatedContent.replace(
        /842 delicious/,
        '852 delicious'
    );
    
    fs.writeFileSync(currentIndexPath, updatedContentWithCount);
    console.log('✅ Updated recipes.html with 10 new recipes (41-50) at the end');
    console.log('✅ Total recipes now: 852');
}