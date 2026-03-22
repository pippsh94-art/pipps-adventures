#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current recipes.html
const currentIndexPath = '/tmp/pipps-adventures/recipes/recipes.html';
let currentContent = fs.readFileSync(currentIndexPath, 'utf8');

// New recipes to add (201-220) - MYTHICAL 220 SEQUENTIAL MILESTONE! 🎆
const newRecipes = [
    {
        number: 201,
        title: "Keto Post-Genesis Primordial Soup Evolution",
        description: "The first recipe after creation - evolving the primordial soup into complex flavor organisms. Life emerging from the Genesis of taste.",
        filename: "0201-keto-postgenesis-primordial-soup-evolution.html"
    },
    {
        number: 202,
        title: "Keto Photosynthetic Flavor Capture Vegetables",
        description: "Vegetables that photosynthesize pure flavor from light itself. The birth of autotrophic taste creation in our post-Genesis world.",
        filename: "0202-keto-photosynthetic-flavor-capture-vegetables.html"
    },
    {
        number: 203,
        title: "Keto Cambrian Explosion Taste Diversity Seafood",
        description: "Seafood representing the explosive evolution of flavor complexity. Every possible taste form emerging simultaneously.",
        filename: "0203-keto-cambrian-explosion-taste-diversity-seafood.html"
    },
    {
        number: 204,
        title: "Keto Devonian Forest Canopy Ancient Fern Salad",
        description: "Ancient forest flavors from the first terrestrial ecosystems. Tree-fern salad from when plants conquered land.",
        filename: "0204-keto-devonian-forest-canopy-ancient-fern-salad.html"
    },
    {
        number: 205,
        title: "Keto Permian Great Dying Extinction Stew",
        description: "A somber memorial stew representing the greatest mass extinction event. Flavors of the 96% that didn't survive.",
        filename: "0205-keto-permian-great-dying-extinction-stew.html"
    },
    {
        number: 206,
        title: "Keto Mesozoic Dawn Dinosaur Awakening Proteins",
        description: "The rise of dinosaurs from Permian ashes. New dominant flavors emerging in the Mesozoic era of taste evolution.",
        filename: "0206-keto-mesozoic-dawn-dinosaur-awakening-proteins.html"
    },
    {
        number: 207,
        title: "Keto Jurassic Park Apex Predator T-Rex Steaks",
        description: "The ultimate apex predator cuisine. T-Rex-style steaks representing the pinnacle of Mesozoic power and dominance.",
        filename: "0207-keto-jurassic-park-apex-predator-trex-steaks.html"
    },
    {
        number: 208,
        title: "Keto Asteroid Impact Final Moment Preservation",
        description: "The last flavors before the K-Pg extinction. A moment frozen in time when the asteroid changed everything forever.",
        filename: "0208-keto-asteroid-impact-final-moment-preservation.html"
    },
    {
        number: 209,
        title: "Keto Paleocene Recovery Mammalian Radiation",
        description: "Small mammals inheriting the post-dinosaur world. The explosive diversification of our ancestors in empty ecological niches.",
        filename: "0209-keto-paleocene-recovery-mammalian-radiation.html"
    },
    {
        number: 210,
        title: "Keto Eocene Greenhouse World Tropical Feast",
        description: "Earth at its warmest - palm trees in the Arctic and crocodiles at the poles. A greenhouse world feast of tropical abundance.",
        filename: "0210-keto-eocene-greenhouse-world-tropical-feast.html"
    },
    {
        number: 211,
        title: "Keto Oligocene Cooling Global Transition Soup",
        description: "Earth transitioning from greenhouse to icehouse. The great cooling that ended tropical dominance and began the modern world.",
        filename: "0211-keto-oligocene-cooling-global-transition-soup.html"
    },
    {
        number: 212,
        title: "Keto Miocene Grassland Revolution Grazing Herds",
        description: "The rise of grasslands and the megafauna that grazed them. Vast herds and their predators in the expanding savannas.",
        filename: "0212-keto-miocene-grassland-revolution-grazing-herds.html"
    },
    {
        number: 213,
        title: "Keto Pliocene Hominid Awakening Intelligence Stew",
        description: "The emergence of our lineage. Early hominids developing the intelligence that would eventually create cuisine itself.",
        filename: "0213-keto-pliocene-hominid-awakening-intelligence-stew.html"
    },
    {
        number: 214,
        title: "Keto Pleistocene Ice Age Survival Mammoth Roast",
        description: "Ice age megafauna hunted by early humans. The harsh world that forged our species into skilled hunters and cooks.",
        filename: "0214-keto-pleistocene-ice-age-survival-mammoth-roast.html"
    },
    {
        number: 215,
        title: "Keto Holocene Agricultural Revolution Beginning",
        description: "The dawn of agriculture and the end of hunting-gathering. Humanity's transformation from nomad to farmer - the foundation of civilization.",
        filename: "0215-keto-holocene-agricultural-revolution-beginning.html"
    },
    {
        number: 216,
        title: "Keto Bronze Age Metallurgy Forged Feast",
        description: "Cooking tools and techniques revolutionized by bronze metallurgy. The technological leap that transformed ancient cuisine.",
        filename: "0216-keto-bronze-age-metallurgy-forged-feast.html"
    },
    {
        number: 217,
        title: "Keto Iron Age Warrior Culture Battle Banquet",
        description: "Iron weapons and tools revolutionize both warfare and cooking. The feast of warriors in the age of iron dominance.",
        filename: "0217-keto-iron-age-warrior-culture-battle-banquet.html"
    },
    {
        number: 218,
        title: "Keto Classical Antiquity Philosophical Symposium",
        description: "The refined cuisine of classical Greece and Rome. Philosophy, democracy, and sophisticated cooking converge in antiquity.",
        filename: "0218-keto-classical-antiquity-philosophical-symposium.html"
    },
    {
        number: 219,
        title: "Keto Medieval Renaissance Rebirth Transformation",
        description: "The transformation from dark ages to renaissance. Knowledge, trade, and cuisine reborn in the medieval to renaissance transition.",
        filename: "0219-keto-medieval-renaissance-rebirth-transformation.html"
    },
    {
        number: 220,
        title: "🎆 Keto Modern Era Convergence: The Unity of All Culinary History",
        description: "The magnificent convergence of our entire evolutionary and culinary journey. From Genesis to the modern era - the complete story of flavor through time. Our mythical 220th sequential recipe milestone!",
        filename: "0220--keto-modern-era-convergence-the-unity-of-all-culinary-history.html"
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

// Update the recipe count in the header (992 + 20 = 1012) and celebrate 220 sequential recipes!
const updatedContentWithCount = updatedContent.replace(
    /992 delicious/,
    '1012 delicious'
).replace(
    /200 Sequential Recipes! 🌌/,
    '220 Sequential Recipes! 🎆'
).replace(
    /200 sequential keto recipes/,
    '220 sequential keto recipes'
).replace(
    /#1-50, #61-200/g,
    '#1-50, #61-220'
).replace(
    /<h1>🌌 Recipe Collection - 200 SEQUENTIAL RECIPES! 🚀<\/h1>/,
    '<h1>🎆 Recipe Collection - 220 SEQUENTIAL RECIPES! 🌟</h1>'
);

// Write the updated file
fs.writeFileSync(currentIndexPath, updatedContentWithCount);
console.log('🎆 Updated recipes.html with MYTHICAL 20 recipes (201-220)! 🌟');
console.log('🎯 MYTHICAL MILESTONE: 220 SEQUENTIAL RECIPES DEPLOYED (#1-50, #61-220)!');
console.log('📊 Total recipes now: 1012 (including 220 sequential recipes)');
console.log('🎆 220 RECIPES - MYTHICAL COOKBOOK STATUS ACHIEVED! 🌟');