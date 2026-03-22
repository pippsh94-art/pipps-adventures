#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix newline issues in HTML files
function fixNewlines(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Replace the problematic \n sequences in ingredients and instructions lists
        let fixedContent = content
            .replace(/(<\/li>)\\n\s*(<li>)/g, '$1\n            $2')
            .replace(/(<li>[^<]+<\/li>)\\n/g, '$1\n')
            // Also fix any standalone \n that might appear in text content
            .replace(/\\n/g, '\n');
        
        // Write the fixed content back
        if (fixedContent !== originalContent) {
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

// Get ALL HTML files in the recipes directory
const htmlDir = '/tmp/pipps-adventures/recipes/html';
let allFiles = [];

try {
    const files = fs.readdirSync(htmlDir);
    allFiles = files
        .filter(file => file.endsWith('.html'))
        .map(file => path.join(htmlDir, file))
        .sort(); // Sort for organized output
} catch (error) {
    console.error('Error reading HTML directory:', error.message);
    process.exit(1);
}

console.log(`🔍 Checking ALL ${allFiles.length} HTML recipe files for \\n issues...`);
console.log('==========================================');

let fixedCount = 0;
let checkedCount = 0;

allFiles.forEach(file => {
    checkedCount++;
    if (fixNewlines(file)) {
        fixedCount++;
    }
});

console.log('==========================================');
console.log(`📊 SUMMARY:`);
console.log(`   Checked: ${checkedCount} files`);
console.log(`   Fixed: ${fixedCount} files`);
console.log(`   Clean: ${checkedCount - fixedCount} files`);

if (fixedCount > 0) {
    console.log(`\n🎉 Fixed ${fixedCount} files with \\n issues!`);
} else {
    console.log(`\n✨ All files were already clean!`);
}

console.log('All recipe HTML files are now properly formatted! 🦞');