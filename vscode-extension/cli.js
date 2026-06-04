#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args[0] === 'add' && args[1]) {
    const componentId = args[1];
    console.log(`[SnippetUI CLI] Fetching component: ${componentId}...`);
    // Placeholder implementation for CLI
    const targetDir = path.join(process.cwd(), componentId);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), `<!-- SnippetUI: ${componentId} -->\\n<div class="${componentId}">CLI Inserted</div>`, 'utf8');
    console.log(`Success! Added ${componentId} to ${targetDir}`);
} else {
    console.log("SnippetUI CLI\\nUsage: snippetui add <component-id>");
}
