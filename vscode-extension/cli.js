#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');
const readline = require('readline');

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  purple: '\x1b[35m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m'
};

const REMOTE_REGISTRY_URL = 'https://raw.githubusercontent.com/NavishKumar1/Snippetui/main/vscode-extension/components.json';
const REMOTE_ASSETS_BASE = 'https://raw.githubusercontent.com/NavishKumar1/Snippetui/main/public';

function printHeader() {
  console.log(`
${C.cyan}  ██████  ███    ██ ██████  ██████  ███████ ████████ ██    ██ ██ 
  ██       ████   ██    ██   ██   ██ ██         ██    ██    ██ ██ 
  ███████  ██ ██  ██ ██████  ██████  █████      ██    ██    ██ ██ 
       ██  ██  ██ ██ ██      ██      ██         ██    ██    ██ ██ 
  ███████  ██   ████ ██      ██      ███████    ██     ██████  ██ ${C.reset}
  ${C.dim}--- SnippetUI CLI Toolkit — Premium Frontend Component Catalog ---${C.reset}
  ${C.yellow}${C.dim}[ DISCLAIMER ] Provided "AS IS" under MIT License. The authors hold no liability for any config changes or workspace issues.${C.reset}
  `);
}

function showHelp() {
  printHeader();
  console.log(`${C.bold}Usage:${C.reset} snippetui <command> [options]\n`);
  console.log(`${C.bold}Commands:${C.reset}`);
  console.log(`  ${C.cyan}${'init'.padEnd(25)}${C.reset} Initialize SnippetUI configuration mapping.`);
  console.log(`  ${C.cyan}${'list [category]'.padEnd(25)}${C.reset} List available components or categories.`);
  console.log(`  ${C.cyan}${'info <component-id>'.padEnd(25)}${C.reset} View component details and style variables.`);
  console.log(`  ${C.cyan}${'add <component-id>'.padEnd(25)}${C.reset} Download and inject a component into your project.`);
  console.log(`  ${C.cyan}${'login'.padEnd(25)}${C.reset} Authenticate locally with SnippetUI Hub.`);
  console.log(`\n${C.bold}Options:${C.reset}`);
  console.log(`  ${C.cyan}-v, --version${C.reset}           Show CLI version`);
  console.log(`  ${C.cyan}-h, --help${C.reset}              Show this help documentation`);
  console.log(`  ${C.cyan}-y, --yes${C.reset}               Bypass prompts during config init`);
}

function promptQuestions(questions) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const answers = {};
  let i = 0;
  return new Promise((resolve) => {
    function askNext() {
      if (i < questions.length) {
        const q = questions[i];
        rl.question(`${C.bold}${q.question}${C.reset}${q.options ? ` (${q.options.join('/')})` : ''} [${C.dim}${q.default}${C.reset}]: `, (ans) => {
          let value = ans.trim() || q.default;
          answers[q.key] = value;
          i++;
          askNext();
        });
      } else {
        rl.close();
        resolve(answers);
      }
    }
    askNext();
  });
}

function loadLocalDatabase() {
  const DB_PATHS = [
    path.join(__dirname, 'components.json'),
    path.join(__dirname, 'out/components.json'),
    path.join(__dirname, 'src/components.json'),
    path.join(__dirname, '../src/components.json')
  ];
  for (const p of DB_PATHS) {
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {}
    }
  }
  return null;
}

function fetchCloudJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        fetchCloudJson(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download (Status: ${res.statusCode})`));
        return;
      }
      let rawData = '';
      res.on('data', chunk => rawData += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(rawData)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function getDatabaseOrExit() {
  let db = loadLocalDatabase();
  if (db && db.length > 0) return db;
  console.log(`${C.yellow}[ SnippetUI CLI ] Local database not found. Downloading...${C.reset}`);
  try {
    db = await fetchCloudJson(REMOTE_REGISTRY_URL);
    return db;
  } catch (err) {
    console.error(`${C.red}Failed to load registry: ${err.message}${C.reset}`);
    process.exit(1);
  }
}

async function runInit(options = {}) {
  printHeader();
  const configPath = path.join(process.cwd(), 'snippetui.config.json');
  let finalConfig = {
    srcDir: './src/components/snippetui',
    styleFormat: 'css',
    framework: 'vanilla',
    script: 'js'
  };

  if (!options.yes) {
    const answers = await promptQuestions([
      { key: 'srcDir', question: 'Enter output directory for SnippetUI components', default: './src/components/snippetui' },
      { key: 'framework', question: 'Select default component wrapper framework', default: 'vanilla' },
      { key: 'styleFormat', question: 'Select default styling layout format', default: 'css' },
      { key: 'script', question: 'Select default scripting language / file type', default: 'js' }
    ]);
    finalConfig = answers;
  }

  fs.writeFileSync(configPath, JSON.stringify(finalConfig, null, 2), 'utf8');
  console.log(`\n${C.green}✔ Created configuration file:${C.reset} ${C.bold}snippetui.config.json${C.reset}`);
}

async function runList(categoryFilter) {
  const db = await getDatabaseOrExit();
  if (!categoryFilter) {
    const categoriesMap = {};
    db.forEach(c => {
      const cat = c.category || 'other';
      categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
    });
    printHeader();
    console.log(`${C.bold}Available Component Categories:${C.reset}`);
    Object.entries(categoriesMap).forEach(([cat, count]) => {
      console.log(`  - ${C.cyan}${cat.padEnd(25)}${C.reset} (${count} components)`);
    });
    return;
  }

  const targetFilter = categoryFilter.toLowerCase().replace(/s$/, '');
  const matched = db.filter(c => (c.category || '').toLowerCase().replace(/s$/, '').includes(targetFilter));

  if (matched.length === 0) {
    console.log(`${C.red}No categories found matching "${categoryFilter}".${C.reset}`);
    return;
  }

  printHeader();
  console.log(`${C.bold}Components in category "${matched[0].category}":${C.reset}\n`);
  matched.forEach(c => {
    console.log(`  ${C.cyan}${c.id.padEnd(45)}${C.reset} ${c.name}`);
  });
}

async function runInfo(componentId) {
  if (!componentId) {
    console.error(`${C.red}Usage: snippetui info <component-id>${C.reset}`);
    process.exit(1);
  }
  const db = await getDatabaseOrExit();
  const searchId = componentId.toLowerCase();
  const comp = db.find(c => c.id.toLowerCase() === searchId || c.id.toLowerCase().endsWith(`/${searchId}`));

  if (!comp) {
    console.error(`${C.red}Component "${componentId}" not found.${C.reset}`);
    process.exit(1);
  }

  printHeader();
  console.log(`📦 ${C.bold}Component:${C.reset}      ${C.cyan}${comp.name}${C.reset} (${comp.id})`);
  console.log(`📁 ${C.bold}Category:${C.reset}       ${comp.category}`);
  console.log(`🏷️  ${C.bold}Tags:${C.reset}           ${comp.tag || 'Interactive'}`);
}

function downloadAsset(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        downloadAsset(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP Status ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function runAdd(componentId) {
  if (!componentId) {
    console.error(`${C.red}Error: Please specify a component ID. Usage: snippetui add <component-id>${C.reset}`);
    process.exit(1);
  }

  const db = await getDatabaseOrExit();
  const searchId = componentId.toLowerCase();
  const comp = db.find(c => c.id.toLowerCase() === searchId || c.id.toLowerCase().endsWith(`/${searchId}`));

  if (!comp) {
    console.error(`${C.red}Component "${componentId}" not found.${C.reset}`);
    process.exit(1);
  }

  let config = {
    srcDir: './src/components/snippetui',
    styleFormat: 'css',
    framework: 'vanilla',
    script: 'js'
  };

  const configPath = path.join(process.cwd(), 'snippetui.config.json');
  if (fs.existsSync(configPath)) {
    try {
      config = { ...config, ...JSON.parse(fs.readFileSync(configPath, 'utf8')) };
    } catch (e) {}
  }

  console.log(`\n[ SnippetUI CLI ] Locating component: ${C.bold}${comp.name}${C.reset}...`);
  console.log(`${C.yellow}${C.dim}[ MIT License Notice ] Writing files locally to your workspace. The authors assume NO liability for any config corruption, syntax errors, or directory overwrites.${C.reset}`);

  const componentFolder = comp.id.split('/').pop();
  const targetDir = path.join(process.cwd(), config.srcDir, componentFolder);

  try {
    fs.mkdirSync(targetDir, { recursive: true });
  } catch (err) {
    console.error(`${C.red}Error: ${err.message}${C.reset}`);
    process.exit(1);
  }

  try {
    fs.writeFileSync(path.join(targetDir, 'Component.html'), comp.html || '', 'utf8');
    if (comp.css) fs.writeFileSync(path.join(targetDir, 'Component.css'), comp.css, 'utf8');
    if (comp.js) fs.writeFileSync(path.join(targetDir, 'script.js'), comp.js, 'utf8');
    if (comp.ts) fs.writeFileSync(path.join(targetDir, 'script.ts'), comp.ts, 'utf8');
    if (comp.tailwind) fs.writeFileSync(path.join(targetDir, 'tailwind.html'), comp.tailwind, 'utf8');
  } catch (err) {
    console.error(`${C.red}Error writing files: ${err.message}${C.reset}`);
    process.exit(1);
  }

  function toJSX(htmlStr) {
    let jsx = htmlStr || '';
    jsx = jsx.replace(/\bclass="/g, 'className="');
    jsx = jsx.replace(/for="/g, 'htmlFor=');
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
      const rules = styleStr.split(';').filter(r => r.trim());
      const reactRules = rules.map(rule => {
        const colonIdx = rule.indexOf(':');
        if (colonIdx === -1) return null;
        const key = rule.slice(0, colonIdx).trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
        const val = rule.slice(colonIdx + 1).trim().replace(/'/g, "\\'");
        return `${key}: '${val}'`;
      }).filter(Boolean);
      return `style={{ ${reactRules.join(', ')} }}`;
    });
    jsx = jsx.replace(/<(img|input|br|hr|meta|link)([^>]*)(?<!\/)>/gi, '<$1$2 />');
    return jsx;
  }

  function scopeScript(scriptStr) {
    if (!scriptStr) return '';
    let scoped = scriptStr;
    scoped = scoped.replace(/document\.querySelector/g, 'select');
    scoped = scoped.replace(/document\.querySelectorAll/g, 'selectAll');
    scoped = scoped.replace(/document\.getElementById\((['"`])([^'"`]+)\1\)/g, "select('#$2')");
    return scoped;
  }

  const camelCaseName = comp.name.replace(/[^a-zA-Z0-9]/g, '');
  const scopedScriptJs = scopeScript(comp.js);
  const scopedScriptTs = scopeScript(comp.ts || comp.js);
  const hasScript = scopedScriptJs && scopedScriptJs.trim();
  const jsxContent = toJSX(comp.html);

  const reactJsx = `import React${hasScript ? ', { useEffect, useRef }' : ', { useRef }'} from 'react';
${comp.css && config.styleFormat !== 'tailwind' ? "import './Component.css';\n" : ''}
export default function ${camelCaseName}() {
  const containerRef = useRef(null);
${hasScript ? `
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const select = (selector) => container.querySelector(selector);
    const selectAll = (selector) => container.querySelectorAll(selector);
    ${scopedScriptJs.split('\n').join('\n    ')}
  }, []);
` : ''}
  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      ${(config.styleFormat === 'tailwind' && comp.tailwind ? toJSX(comp.tailwind) : jsxContent).split('\n').join('\n      ')}
    </div>
  );
}`;

  const reactTsx = `import React${hasScript ? ', { useEffect, useRef }' : ', { useRef }'} from 'react';
${comp.css && config.styleFormat !== 'tailwind' ? "import './Component.css';\n" : ''}
export default function ${camelCaseName}() {
  const containerRef = useRef<HTMLDivElement>(null);
${hasScript ? `
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const select = <T extends HTMLElement = HTMLElement>(selector: string) => container.querySelector<T>(selector);
    const selectAll = <T extends HTMLElement = HTMLElement>(selector: string) => container.querySelectorAll<T>(selector);
    ${scopedScriptTs.split('\n').join('\n    ')}
  }, []);
` : ''}
  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      ${(config.styleFormat === 'tailwind' && comp.tailwind ? toJSX(comp.tailwind) : jsxContent).split('\n').join('\n      ')}
    </div>
  );
}`;

  const styleBlock = comp.css && config.styleFormat !== 'tailwind' ? `\n\n<style scoped>\n${comp.css}\n</style>` : '';
  const vueCode = `<script setup>
import { ref${hasScript ? ', onMounted' : ''} } from 'vue';
const containerRef = ref(null);
${hasScript ? `
onMounted(() => {
  const container = containerRef.value;
  if (!container) return;
  const select = (selector) => container.querySelector(selector);
  const selectAll = (selector) => container.querySelectorAll(selector);
  ${scopedScriptJs.split('\n').join('\n  ')}
});
` : ''}</script>
<template>
  <div ref="containerRef" style="display: contents;">
    ${(config.styleFormat === 'tailwind' && comp.tailwind ? comp.tailwind : comp.html).split('\n').join('\n    ')}
  </div>
</template>${styleBlock}`;

  const svelteStyle = comp.css && config.styleFormat !== 'tailwind' ? `\n\n<style>\n${comp.css}\n</style>` : '';
  const svelteCode = `${hasScript ? `<script>
  import { onMount } from 'svelte';
  let containerRef;
  onMount(() => {
    if (!containerRef) return;
    const select = (selector) => containerRef.querySelector(selector);
    const selectAll = (selector) => containerRef.querySelectorAll(selector);
    ${scopedScriptJs.split('\n').join('\n    ')}
  });
</script>\n\n` : ''}<div bind:this={containerRef} style="display: contents;">
  ${(config.styleFormat === 'tailwind' && comp.tailwind ? comp.tailwind : comp.html).split('\n').join('\n  ')}
</div>${svelteStyle}`;

  try {
    if (config.framework === 'react') {
      const ext = config.script === 'ts' ? 'tsx' : 'jsx';
      fs.writeFileSync(path.join(targetDir, `Component.${ext}`), config.script === 'ts' ? reactTsx : reactJsx, 'utf8');
      console.log(`${C.green}✔ Compiled React module:${C.reset} Component.${ext}`);
    } else if (config.framework === 'vue') {
      fs.writeFileSync(path.join(targetDir, 'Component.vue'), vueCode, 'utf8');
    } else if (config.framework === 'svelte') {
      fs.writeFileSync(path.join(targetDir, 'Component.svelte'), svelteCode, 'utf8');
    }
  } catch (err) {
    console.error(`${C.red}Error writing wrappers: ${err.message}${C.reset}`);
  }

  // Asset dependencies
  const fullSourceText = (comp.html || '') + '\n' + (comp.css || '') + '\n' + (comp.js || '');
  const assetRegex = /(?:"|')(\/assets\/[^"'\s>]+|\/public\/assets\/[^"'\s>]+)(?:"|')/gi;
  let assetMatch;
  const detectedAssets = new Set();
  while ((assetMatch = assetRegex.exec(fullSourceText)) !== null) {
    detectedAssets.add(assetMatch[1]);
  }

  if (detectedAssets.size > 0) {
    console.log(`[ SnippetUI CLI ] Syncing asset dependencies...`);
    for (let rawPath of detectedAssets) {
      let cleanPath = rawPath.replace(/^\/public/, '');
      if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
      const destAssetFile = path.join(process.cwd(), 'public', cleanPath);
      const destSubdir = path.dirname(destAssetFile);
      if (!fs.existsSync(destSubdir)) fs.mkdirSync(destSubdir, { recursive: true });

      const cloudUrl = `${REMOTE_ASSETS_BASE}${cleanPath}`;
      try {
        await downloadAsset(cloudUrl, destAssetFile);
        console.log(`  -> ${C.green}✔ Synced asset:${C.reset} public${cleanPath}`);
      } catch (e) {
        console.warn(`  -> ${C.yellow}⚠ Warning: Failed to retrieve asset ${cleanPath}: ${e.message}${C.reset}`);
      }
    }
  }
  console.log(`\n${C.green}[ SUCCESS ] Component "${comp.name}" added successfully to ${config.srcDir}/${componentFolder}!${C.reset}\n`);
}

async function runLogin() {
  printHeader();
  const answers = await promptQuestions([
    { key: 'token', question: 'Enter Developer Access Token', default: 'anonymous' }
  ]);
  const authDir = path.join(os.homedir(), '.snippetui');
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });
  fs.writeFileSync(path.join(authDir, 'auth.json'), JSON.stringify({ token: answers.token }, null, 2), 'utf8');
  console.log(`\n${C.green}✔ Handshake completed successfully.${C.reset}`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  switch (command) {
    case 'init':
      await runInit({ yes: args.includes('-y') });
      break;
    case 'list':
      await runList(args[1]);
      break;
    case 'info':
      await runInfo(args[1]);
      break;
    case 'add':
      await runAdd(args[1]);
      break;
    case 'login':
      await runLogin();
      break;
    default:
      showHelp();
  }
}
main();
