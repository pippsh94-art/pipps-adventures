#!/usr/bin/env python3
import re
import os

def extract_page_number(filename):
    """Extract page number from filename like 0041-recipe-name.html"""
    match = re.match(r'(\d{4})-', filename)
    if match:
        return int(match.group(1))
    return None

def add_image_to_recipe(filename):
    """Add image section to recipe HTML file if missing"""
    page_num = extract_page_number(filename)
    if not page_num:
        return False
    
    # Read the file
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if image already exists
    if 'images/page_' in content:
        print(f"✓ {filename} already has image")
        return False
    
    # Find the title and add image after it
    image_html = f'''            
            <div class="original-image" style="margin-bottom: 1.5rem; text-align: center;">
                <img src="../images/page_{page_num:04d}.jpg" alt="Original recipe page {page_num}" style="max-width: 100%; height: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p style="font-size: 0.8em; color: #718096; margin-top: 0.5rem;">Original cookbook page {page_num}</p>
            </div>
            '''
    
    # Look for the pattern right after </h1> and before any existing content
    pattern = r'(<h1>.*?</h1>)\s*\n'
    replacement = r'\1\n' + image_html + '\n'
    
    if re.search(pattern, content):
        content = re.sub(pattern, replacement, content)
        
        # Write back the file
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Added image to {filename}")
        return True
    else:
        print(f"❌ Could not find h1 pattern in {filename}")
        return False

# Process all HTML recipe files
for filename in sorted(os.listdir('.')):
    if re.match(r'\d{4}-.*\.html$', filename):
        add_image_to_recipe(filename)
