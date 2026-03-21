#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix newline issues in HTML files
function fixNewlines(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace the problematic \n sequences in ingredients and instructions lists
        let fixedContent = content
            .replace(/(<\/li>)\\n\s*(<li>)/g, '$1\n            $2')
            .replace(/(<li>[^<]+<\/li>)\\n/g, '$1\n');
        
        // Write the fixed content back
        if (fixedContent !== content) {
            fs.writeFileSync(filePath, fixedContent);
            console.log(`✅ Fixed: ${path.basename(filePath)}`);
            return true;
        } else {
            console.log(`✓ OK: ${path.basename(filePath)}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
        return false;
    }
}

// Get all HTML files from recent batches (91-110)
const htmlDir = '/tmp/pipps-adventures/recipes/html';
const recentFiles = [];

// Check batches 91-110
for (let i = 91; i <= 110; i++) {
    const paddedNum = i.toString().padStart(4, '0');
    const files = fs.readdirSync(htmlDir).filter(file => 
        file.startsWith(paddedNum + '-') && file.endsWith('.html')
    );
    files.forEach(file => recentFiles.push(path.join(htmlDir, file)));
}

console.log(`Found ${recentFiles.length} HTML files from recipes 91-110 to check...`);

let fixedCount = 0;
recentFiles.forEach(file => {
    if (fixNewlines(file)) {
        fixedCount++;
    }
});

console.log(`\n🎉 Fixed ${fixedCount} files with \\n issues!`);
console.log('All recent recipe HTML files are now clean! ✨');