import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COMPONENTS_DATABASE } from '../src/library/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic transformation functions
function toReact(html) {
  if (!html) return '';
  return html
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    // Attempt to close common void elements
    .replace(/<(input|img|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />');
}

function toVue(html, style, script) {
  if (!html) return '';
  let vue = `<template>\n${html}\n</template>`;
  if (script) {
    vue += `\n\n<script setup>\nimport { onMounted } from 'vue';\nonMounted(() => {\n${script}\n});\n</script>`;
  }
  if (style) {
    vue += `\n\n<style scoped>\n${style}\n</style>`;
  }
  return vue;
}

const exportData = COMPONENTS_DATABASE.map(comp => {
  return {
    id: comp.id,
    name: comp.name,
    category: comp.category,
    tag: comp.tag,
    html: comp.html,
    css: comp.css,
    js: comp.js,
    ts: comp.ts,
    tailwind: comp.tailwind,
    reactHtml: toReact(comp.html),
    reactTailwind: toReact(comp.tailwind),
    vueHtml: toVue(comp.html, comp.css, comp.js),
    vueTailwind: toVue(comp.tailwind, '', comp.js)
  };
});

const outDir = path.join(__dirname, '../vscode-extension/src');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outDir, 'components.json'),
  JSON.stringify(exportData, null, 2)
);

console.log(`Successfully exported ${exportData.length} components to vscode-extension/src/components.json`);
