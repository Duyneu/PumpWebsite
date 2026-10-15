const fs = require('fs');
const path = require('path');

function scanDir(dir, results = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        scanDir(fullPath, results);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = scanDir(path.resolve(__dirname, '..', 'src'));
console.log(`Auditing ${files.length} source files...`);

let issuesFound = 0;
const versionedImportRegex = /(from\s+['"])([^'"]+?)@[0-9][^'"]*?(['"])/g;
const importVersionedRegex = /(import\s+['"])([^'"]+?)@[0-9][^'"]*?(['"])/g;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (versionedImportRegex.test(content) || importVersionedRegex.test(content)) {
    console.log(`Found versioned import in: ${file}`);
    content = content.replace(versionedImportRegex, '$1$2$3');
    content = content.replace(importVersionedRegex, '$1$2$3');
    changed = true;
    issuesFound++;
  }

  // Also check if importing from '../App' for CartItem or Page
  if (content.includes("from '../App'") || content.includes('from "../App"')) {
    console.log(`Found invalid App import in: ${file}`);
    // Check what is imported
    if (content.includes('CartItem')) {
      content = content.replace(/import\s*\{\s*CartItem\s*\}\s*from\s*['"]\.\.\/App['"];?/, "import { CartItem } from '../contexts/CartContext';");
      changed = true;
      issuesFound++;
    }
    if (content.includes('Page')) {
      content = content.replace(/import\s*\{\s*Page\s*\}\s*from\s*['"]\.\.\/App['"];?/, "export type Page = 'home' | 'products' | 'about' | 'contact' | 'cart';");
      changed = true;
      issuesFound++;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed: ${file}`);
  }
}

console.log(`Audit complete. Issues fixed: ${issuesFound}`);
