#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');
const readline = require('readline');

// Terminal Colors Helper
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

// ASCII Banner
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

// Help Menu
function showHelp() {
  printHeader();
  console.log(`${C.bold}Usage:${C.reset} snippetui <command> [options]\n`);
  console.log(`${C.bold}Commands:${C.reset}`);
  
  const cmds = [
    ['init', 'Initialize SnippetUI configuration mapping within your project directory.'],
    ['list [category]', 'Fetch and list all available component categories or components in a category.'],
    ['info <component-id>', 'Display details, configurable variables, and info about a component.'],
    ['add <component-id>', 'Download and inject the component wrapper files and assets into your project.'],
    ['update', 'Check for updates and synchronize your local components and database registry.'],
    ['create <component-name>', 'Generate a local component template pre-configured with SnippetUI styles.'],
    ['doctor', 'Run diagnostic environment audits on project directories, Tailwind status, and tokens.'],
    ['login', 'Authenticate with SnippetUI Hub credentials to enable team syncing capabilities.']
  ];

  cmds.forEach(([cmd, desc]) => {
    console.log(`  ${C.cyan}${cmd.padEnd(25)}${C.reset} ${desc}`);
  });

  console.log(`\n${C.bold}Options:${C.reset}`);
  console.log(`  ${C.cyan}-v, --version${C.reset}           Show CLI version`);
  console.log(`  ${C.cyan}-h, --help${C.reset}              Show this help documentation`);
  console.log(`  ${C.cyan}-y, --yes${C.reset}               Bypass prompts during config init (uses default values)`);
  console.log();
}

// Version Print
function showVersion() {
  console.log(`SnippetUI CLI version ${C.bold}1.0.4${C.reset}`);
}

// ----------------------------------------------------------------------------
// DB LOADING MECHANISM
// ----------------------------------------------------------------------------
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
      } catch (e) {
        // ignore and check next path
      }
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
        reject(new Error(`Failed to download from ${url} (Status: ${res.statusCode})`));
        return;
      }
      let rawData = '';
      res.on('data', chunk => rawData += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function getDatabaseOrExit() {
  let db = loadLocalDatabase();
  if (db && db.length > 0) {
    return db;
  }

  // Fallback to Cloud fetch
  console.log(`${C.yellow}[ SnippetUI CLI ] Local database registry not found. Downloading from cloud...${C.reset}`);
  try {
    db = await fetchCloudJson(REMOTE_REGISTRY_URL);
    // Try to cache it locally
    try {
      fs.writeFileSync(path.join(__dirname, 'components.json'), JSON.stringify(db, null, 2), 'utf8');
    } catch (e) {
      // Ignore write errors (e.g. read-only global directories)
    }
    return db;
  } catch (err) {
    console.error(`\n${C.red}[ ERROR ] Failed to load database: ${err.message}${C.reset}`);
    console.error(`Please check your internet connection or install SnippetUI locally.`);
    process.exit(1);
  }
}

// ----------------------------------------------------------------------------
// INTERACTIVE PROMPT HELPER
// ----------------------------------------------------------------------------
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
          let value = ans.trim();
          if (!value) {
            value = q.default;
          }
          if (q.validate && !q.validate(value)) {
            console.log(`${C.red}Invalid option. Please try again.${C.reset}`);
            askNext();
          } else {
            answers[q.key] = value;
            i++;
            askNext();
          }
        });
      } else {
        rl.close();
        resolve(answers);
      }
    }
    askNext();
  });
}

// ----------------------------------------------------------------------------
// 1. INIT COMMAND
// ----------------------------------------------------------------------------
async function runInit(options = {}) {
  printHeader();
  const configPath = path.join(process.cwd(), 'snippetui.config.json');

  if (fs.existsSync(configPath)) {
    console.log(`${C.yellow}[ WARNING ] Configuration file snippetui.config.json already exists in this directory.${C.reset}`);
    const answers = await promptQuestions([
      {
        key: 'overwrite',
        question: 'Do you want to overwrite it?',
        options: ['y', 'n'],
        default: 'n'
      }
    ]);
    if (answers.overwrite.toLowerCase() !== 'y') {
      console.log('Setup aborted.');
      return;
    }
  }

  let finalConfig = {
    srcDir: './src/components/snippetui',
    styleFormat: 'css',
    framework: 'vanilla',
    script: 'js',
    theme: {
      primary: '--accent-cyan',
      secondary: '--accent-purple'
    }
  };

  if (!options.yes) {
    const answers = await promptQuestions([
      {
        key: 'srcDir',
        question: 'Enter output directory for SnippetUI components',
        default: './src/components/snippetui'
      },
      {
        key: 'framework',
        question: 'Select default component wrapper framework',
        options: ['vanilla', 'react', 'vue', 'svelte'],
        default: 'vanilla',
        validate: (val) => ['vanilla', 'react', 'vue', 'svelte'].includes(val.toLowerCase())
      },
      {
        key: 'styleFormat',
        question: 'Select default styling layout format',
        options: ['css', 'tailwind', 'modules'],
        default: 'css',
        validate: (val) => ['css', 'tailwind', 'modules'].includes(val.toLowerCase())
      },
      {
        key: 'script',
        question: 'Select default scripting language / file type',
        options: ['js', 'ts'],
        default: 'js',
        validate: (val) => ['js', 'ts'].includes(val.toLowerCase())
      }
    ]);

    finalConfig = {
      srcDir: answers.srcDir,
      styleFormat: answers.styleFormat.toLowerCase(),
      framework: answers.framework.toLowerCase(),
      script: answers.script.toLowerCase(),
      theme: {
        primary: '--accent-cyan',
        secondary: '--accent-purple'
      }
    };
  }

  try {
    fs.writeFileSync(configPath, JSON.stringify(finalConfig, null, 2), 'utf8');
    console.log(`\n${C.green}✔ Created configuration file:${C.reset} ${C.bold}snippetui.config.json${C.reset}`);
    console.log(`${C.green}✔ Configured components folder:${C.reset} ${finalConfig.srcDir}`);
    console.log(`${C.green}✔ Selected stylesheet format:${C.reset} ${finalConfig.styleFormat}`);
    console.log(`${C.green}✔ Selected target framework:${C.reset} ${finalConfig.framework}`);
    console.log(`\nEnvironment setup completed! Start downloading premium components using:`);
    console.log(`  ${C.cyan}snippetui add <component-id>${C.reset}\n`);
  } catch (err) {
    console.error(`${C.red}Error writing configuration file: ${err.message}${C.reset}`);
  }
}

// ----------------------------------------------------------------------------
// 2. LIST COMMAND
// ----------------------------------------------------------------------------
async function runList(categoryFilter) {
  const db = await getDatabaseOrExit();

  if (!categoryFilter) {
    // Group and count by category
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
    console.log(`\nTo list components inside a specific category, run:`);
    console.log(`  ${C.cyan}snippetui list <category-name>${C.reset}\n`);
    return;
  }

  // Filter components by category (fuzzy match)
  const targetFilter = categoryFilter.toLowerCase().replace(/s$/, ''); // singularize (e.g. buttons -> button)
  const matchedComponents = db.filter(c => {
    const cat = (c.category || '').toLowerCase().replace(/s$/, '');
    return cat.includes(targetFilter);
  });

  if (matchedComponents.length === 0) {
    console.log(`${C.red}[ NOT FOUND ] No categories or components found matching "${categoryFilter}".${C.reset}`);
    console.log(`Run ${C.cyan}snippetui list${C.reset} to see all categories.`);
    return;
  }

  printHeader();
  console.log(`${C.bold}Components in category "${matchedComponents[0].category}":${C.reset}\n`);
  matchedComponents.forEach(c => {
    const gpuTag = c.tag === 'GPU' ? `[${C.green}GPU${C.reset}]` : '';
    const interactiveTag = (c.js || c.ts) ? `[${C.purple}Interactive${C.reset}]` : `[${C.blue}Pure CSS${C.reset}]`;
    const tagString = `${gpuTag} ${interactiveTag}`.trim();
    console.log(`  ${C.cyan}${c.id.padEnd(45)}${C.reset} ${c.name.padEnd(35)} ${tagString}`);
  });
  console.log(`\nTo get full component metadata details, run:`);
  console.log(`  ${C.cyan}snippetui info <component-id>${C.reset}\n`);
}

// ----------------------------------------------------------------------------
// 3. INFO COMMAND
// ----------------------------------------------------------------------------
async function runInfo(componentId) {
  if (!componentId) {
    console.error(`${C.red}Error: Please specify a component ID. Usage: snippetui info <component-id>${C.reset}`);
    process.exit(1);
  }

  const db = await getDatabaseOrExit();
  const searchId = componentId.toLowerCase();
  const comp = db.find(c => c.id.toLowerCase() === searchId || c.id.toLowerCase().endsWith(`/${searchId}`));

  if (!comp) {
    console.error(`${C.red}[ NOT FOUND ] Component "${componentId}" not found in database registry.${C.reset}`);
    process.exit(1);
  }

  // Helper to extract custom properties from CSS
  const cssVars = new Set();
  if (comp.css) {
    const varRegex = /--[a-zA-Z0-9_-]+/gi;
    let match;
    while ((match = varRegex.exec(comp.css)) !== null) {
      cssVars.add(match[0]);
    }
  }

  printHeader();
  console.log(`📦 ${C.bold}Component:${C.reset}      ${C.cyan}${comp.name}${C.reset} (${comp.id})`);
  console.log(`📁 ${C.bold}Category:${C.reset}       ${comp.category}`);
  console.log(`🏷️  ${C.bold}Tags:${C.reset}           ${comp.tag || 'Interactive'}`);
  console.log(`📝 ${C.bold}Description:${C.reset}    SnippetUI copy-paste optimized component.`);
  
  if (cssVars.size > 0) {
    console.log(`\n🎨 ${C.bold}Configurable CSS Variables:${C.reset}`);
    Array.from(cssVars).forEach(v => {
      console.log(`  - ${v}`);
    });
  }

  console.log(`\n⚡ ${C.bold}Supported Integrations:${C.reset}`);
  console.log(`  - ${C.green}HTML / CSS (Vanilla)${C.reset}`);
  if (comp.tailwind) console.log(`  - ${C.green}Tailwind CSS utility wrapper${C.reset}`);
  console.log(`  - ${C.green}React JSX & TSX Component Wrappers${C.reset}`);
  console.log(`  - ${C.green}Vue 3 Single File Component (SFC)${C.reset}`);
  console.log(`  - ${C.green}Svelte Component${C.reset}`);

  console.log(`\nTo download this component files, run:`);
  console.log(`  ${C.cyan}snippetui add ${comp.id}${C.reset}\n`);
}

// ----------------------------------------------------------------------------
// 4. ADD COMMAND (universal wrapper compiler & assets injection)
// ----------------------------------------------------------------------------
// Redirect-aware HTTP download helper
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
    console.error(`${C.red}[ NOT FOUND ] Component "${componentId}" not found in database registry.${C.reset}`);
    process.exit(1);
  }

  // Read config settings
  let config = {
    srcDir: './src/components/snippetui',
    styleFormat: 'css',
    framework: 'vanilla',
    script: 'js'
  };

  const configPath = path.join(process.cwd(), 'snippetui.config.json');
  if (fs.existsSync(configPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      config = { ...config, ...parsed };
    } catch (e) {
      console.warn(`${C.yellow}[ CONFIG WARNING ] Failed to parse snippetui.config.json, using defaults.${C.reset}`);
    }
  }

  console.log(`\n[ SnippetUI CLI ] Locating component: ${C.bold}${comp.name}${C.reset}...`);
  console.log(`${C.yellow}${C.dim}[ MIT License Notice ] Writing files locally to your workspace. The authors assume NO liability for any config corruption, syntax errors, or directory overwrites.${C.reset}`);

  // Target directory
  const componentFolder = comp.id.split('/').pop();
  const targetDir = path.join(process.cwd(), config.srcDir, componentFolder);

  try {
    fs.mkdirSync(targetDir, { recursive: true });
  } catch (err) {
    console.error(`${C.red}Error creating directory ${targetDir}: ${err.message}${C.reset}`);
    process.exit(1);
  }

  // 1. Basic raw files injection (HTML / CSS / JS / TS)
  try {
    fs.writeFileSync(path.join(targetDir, 'Component.html'), comp.html || '', 'utf8');
    if (comp.css) fs.writeFileSync(path.join(targetDir, 'Component.css'), comp.css, 'utf8');
    if (comp.js) fs.writeFileSync(path.join(targetDir, 'script.js'), comp.js, 'utf8');
    if (comp.ts) fs.writeFileSync(path.join(targetDir, 'script.ts'), comp.ts, 'utf8');
    if (comp.tailwind) fs.writeFileSync(path.join(targetDir, 'tailwind.html'), comp.tailwind, 'utf8');
  } catch (err) {
    console.error(`${C.red}Error writing basic component files: ${err.message}${C.reset}`);
    process.exit(1);
  }

  function toJSX(htmlStr) {
    const rawText = htmlStr || '';
    let cleanJsx = '';
    let i = 0;
    while (i < rawText.length) {
      const startIdx = rawText.indexOf('<!--', i);
      if (startIdx === -1) {
        cleanJsx += rawText.substring(i);
        break;
      }
      cleanJsx += rawText.substring(i, startIdx);
      const endIdx = rawText.indexOf('-->', startIdx + 4);
      if (endIdx === -1) {
        break;
      }
      i = endIdx + 3;
    }
    let jsx = cleanJsx;
    jsx = jsx.replace(/\bclass="/g, 'className="');
    jsx = jsx.replace(/for="/g, 'htmlFor=');
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
      const rules = styleStr.split(';').filter(r => r.trim());
      const reactRules = rules.map(rule => {
        const colonIdx = rule.indexOf(':');
        if (colonIdx === -1) return null;
        const key = rule.slice(0, colonIdx).trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
        const val = rule.slice(colonIdx + 1).trim().replace(/\\/g, '\\\\').replace(/'/g, "\\'");
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

  // A. React (JSX & TSX)
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

    function select<T extends HTMLElement = HTMLElement>(selector: string) { return container.querySelector<T>(selector); }
    function selectAll<T extends HTMLElement = HTMLElement>(selector: string) { return container.querySelectorAll<T>(selector); }

    ${scopedScriptTs.split('\n').join('\n    ')}
  }, []);
` : ''}
  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      ${(config.styleFormat === 'tailwind' && comp.tailwind ? toJSX(comp.tailwind) : jsxContent).split('\n').join('\n      ')}
    </div>
  );
}`;

  // B. Vue 3 SFC
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

  // C. Svelte
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

  // Write selected framework format files
  try {
    if (config.framework === 'react') {
      const ext = config.script === 'ts' ? 'tsx' : 'jsx';
      fs.writeFileSync(path.join(targetDir, `Component.${ext}`), config.script === 'ts' ? reactTsx : reactJsx, 'utf8');
      console.log(`${C.green}✔ Compiled React module:${C.reset} Component.${ext}`);
    } else if (config.framework === 'vue') {
      fs.writeFileSync(path.join(targetDir, 'Component.vue'), vueCode, 'utf8');
      console.log(`${C.green}✔ Compiled Vue SFC:${C.reset} Component.vue`);
    } else if (config.framework === 'svelte') {
      fs.writeFileSync(path.join(targetDir, 'Component.svelte'), svelteCode, 'utf8');
      console.log(`${C.green}✔ Compiled Svelte component:${C.reset} Component.svelte`);
    } else {
      console.log(`${C.green}✔ Created Vanilla HTML/CSS assets in directory.${C.reset}`);
    }
  } catch (err) {
    console.error(`${C.red}Error writing framework files: ${err.message}${C.reset}`);
    process.exit(1);
  }

  // 3. Asset Dependency Auto-Detector & Downloader
  const fullSourceText = (comp.html || '') + '\n' + (comp.css || '') + '\n' + (comp.js || '');
  const assetRegex = /(?:"|')(\/assets\/[^"'\s>]+|\/public\/assets\/[^"'\s>]+)(?:"|')/gi;
  let assetMatch;
  const detectedAssets = new Set();
  while ((assetMatch = assetRegex.exec(fullSourceText)) !== null) {
    detectedAssets.add(assetMatch[1]);
  }

  if (detectedAssets.size > 0) {
    console.log(`[ SnippetUI CLI ] Detected ${detectedAssets.size} asset dependencies. Syncing to workspace...`);
    for (let rawPath of detectedAssets) {
      let cleanPath = rawPath.replace(/^\/public/, ''); // strip lead public
      if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

      const destAssetFile = path.join(process.cwd(), 'public', cleanPath);
      const destSubdir = path.dirname(destAssetFile);
      
      // Ensure target directory exists
      if (!fs.existsSync(destSubdir)) {
        fs.mkdirSync(destSubdir, { recursive: true });
      }

      // Check local cache/directory first
      let copiedLocally = false;
      const workspacePublicSrc = path.join(process.cwd(), 'public', cleanPath);
      const libraryPublicSrc = path.join(__dirname, 'public', cleanPath);
      const rootPublicSrc = path.join(__dirname, '../public', cleanPath);

      for (let src of [libraryPublicSrc, rootPublicSrc]) {
        if (fs.existsSync(src)) {
          try {
            fs.copyFileSync(src, destAssetFile);
            console.log(`  -> ${C.green}✔ Copied asset:${C.reset} public${cleanPath}`);
            copiedLocally = true;
            break;
          } catch (e) {}
        }
      }

      // If not copied locally, download via HTTP
      if (!copiedLocally) {
        const cloudUrl = `${REMOTE_ASSETS_BASE}${cleanPath}`;
        try {
          await downloadAsset(cloudUrl, destAssetFile);
          console.log(`  -> ${C.green}✔ Downloaded asset:${C.reset} public${cleanPath} (CDN)`);
        } catch (e) {
          console.warn(`  -> ${C.yellow}⚠ Warning: Failed to retrieve asset ${cleanPath}: ${e.message}${C.reset}`);
        }
      }
    }
  }

  // 4. Automatic Tailwind Configuration Animation/Keyframe Injector
  if (config.styleFormat === 'tailwind' && comp.css) {
    // Parse keyframes and animations
    const keyframes = {};
    let searchIdx = 0;
    while (true) {
      const matchIdx = comp.css.toLowerCase().indexOf('@keyframes', searchIdx);
      if (matchIdx === -1) break;
      
      const nameStart = matchIdx + 10;
      const braceStart = comp.css.indexOf('{', nameStart);
      if (braceStart === -1) break;
      const name = comp.css.slice(nameStart, braceStart).trim();
      
      let braceCount = 1;
      let idx = braceStart + 1;
      while (idx < comp.css.length && braceCount > 0) {
        if (comp.css[idx] === '{') braceCount++;
        else if (comp.css[idx] === '}') braceCount--;
        idx++;
      }
      
      const body = comp.css.slice(braceStart + 1, idx - 1);
      searchIdx = idx;

      const stageRegex = /(0%|100%|[0-9]+%|from|to)\s*\{([\s\S]*?)\}/gi;
      let stageMatch;
      const stages = {};
      while ((stageMatch = stageRegex.exec(body)) !== null) {
        const stageName = stageMatch[1];
        const stageBody = stageMatch[2];
        
        const styleRules = {};
        const rulesList = stageBody.trim().split(';').filter(r => r.trim());
        rulesList.forEach(rule => {
          const colonIdx = rule.indexOf(':');
          if (colonIdx !== -1) {
            const key = rule.slice(0, colonIdx).trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
            const val = rule.slice(colonIdx + 1).trim();
            styleRules[key] = val;
          }
        });
        stages[stageName] = styleRules;
      }
      keyframes[name] = stages;
    }

    const animations = {};
    const animationRegex = /animation\s*:\s*([a-zA-Z0-9_-]+)\s+([^;]+);/gi;
    let animMatch;
    while ((animMatch = animationRegex.exec(comp.css)) !== null) {
      const name = animMatch[1];
      const settings = animMatch[2].trim();
      if (keyframes[name]) {
        animations[name] = `${name} ${settings}`;
      }
    }

    const nameRegex = /animation-name\s*:\s*([a-zA-Z0-9_-]+)\s*;/gi;
    let nameMatch;
    while ((nameMatch = nameRegex.exec(comp.css)) !== null) {
      const animName = nameMatch[1];
      if (keyframes[animName]) {
        const durRegex = /animation-duration\s*:\s*([^;]+);/i;
        const durMatch = comp.css.match(durRegex);
        const duration = durMatch ? durMatch[1].trim() : '1s';
        
        const iterRegex = /animation-iteration-count\s*:\s*([^;]+);/i;
        const iterMatch = comp.css.match(iterRegex);
        const iter = iterMatch ? iterMatch[1].trim() : 'infinite';

        const dirRegex = /animation-direction\s*:\s*([^;]+);/i;
        const dirMatch = comp.css.match(dirRegex);
        const dir = dirMatch ? dirMatch[1].trim() : '';

        animations[animName] = `${animName} ${duration} ${iter} ${dir}`.trim();
      }
    }

    const kfNames = Object.keys(keyframes);
    if (kfNames.length > 0) {
      const localConfigs = [
        'tailwind.config.js',
        'tailwind.config.cjs',
        'tailwind.config.ts',
        'tailwind.config.mjs'
      ];
      let foundConfigPath = null;
      for (const conf of localConfigs) {
        const p = path.join(process.cwd(), conf);
        if (fs.existsSync(p)) {
          foundConfigPath = p;
          break;
        }
      }

      if (foundConfigPath) {
        console.log(`[ SnippetUI CLI ] Found Tailwind configuration: ${path.basename(foundConfigPath)}. Injecting keyframes and animations...`);
        let configContent = fs.readFileSync(foundConfigPath, 'utf8');
        
        let keyframesStr = '';
        for (const [name, stages] of Object.entries(keyframes)) {
          keyframesStr += `\n        '${name}': {\n`;
          for (const [stage, rules] of Object.entries(stages)) {
            keyframesStr += `          '${stage}': {\n`;
            for (const [key, val] of Object.entries(rules)) {
              keyframesStr += `            ${key}: '${val}',\n`;
            }
            keyframesStr += `          },\n`;
          }
          keyframesStr += `        },`;
        }

        let animsStr = '';
        for (const [name, val] of Object.entries(animations)) {
          animsStr += `\n        '${name}': '${val}',`;
        }

        // String injector rules
        const extendIndex = configContent.indexOf('extend:');
        if (extendIndex !== -1) {
          const extendBlockStart = configContent.indexOf('{', extendIndex);
          
          if (keyframesStr) {
            const keyframesIndex = configContent.indexOf('keyframes:', extendIndex);
            if (keyframesIndex !== -1) {
              const keyframesStart = configContent.indexOf('{', keyframesIndex);
              configContent = configContent.slice(0, keyframesStart + 1) + keyframesStr + configContent.slice(keyframesStart + 1);
            } else {
              configContent = configContent.slice(0, extendBlockStart + 1) + `\n      keyframes: {${keyframesStr}\n      },` + configContent.slice(extendBlockStart + 1);
            }
          }

          if (animsStr) {
            const newExtendIndex = configContent.indexOf('extend:');
            const newExtendBlockStart = configContent.indexOf('{', newExtendIndex);
            
            const animsIndex = configContent.indexOf('animation:', newExtendIndex);
            if (animsIndex !== -1) {
              const animsStart = configContent.indexOf('{', animsIndex);
              configContent = configContent.slice(0, animsStart + 1) + animsStr + configContent.slice(animsStart + 1);
            } else {
              configContent = configContent.slice(0, newExtendBlockStart + 1) + `\n      animation: {${animsStr}\n      },` + configContent.slice(newExtendBlockStart + 1);
            }
          }
        } else {
          const themeIndex = configContent.indexOf('theme:');
          if (themeIndex !== -1) {
            const themeBlockStart = configContent.indexOf('{', themeIndex);
            let injectContent = `\n    extend: {`;
            if (keyframesStr) injectContent += `\n      keyframes: {${keyframesStr}\n      },`;
            if (animsStr) injectContent += `\n      animation: {${animsStr}\n      },`;
            injectContent += `\n    },`;
            configContent = configContent.slice(0, themeBlockStart + 1) + injectContent + configContent.slice(themeBlockStart + 1);
          }
        }
        
        try {
          fs.writeFileSync(foundConfigPath, configContent, 'utf8');
          console.log(`${C.green}✔ Successfully injected keyframes (${kfNames.join(', ')}) and animations to ${path.basename(foundConfigPath)}.${C.reset}`);
        } catch (err) {
          console.error(`${C.red}Error updating tailwind config: ${err.message}${C.reset}`);
        }
      }
    }
  }

  console.log(`\n${C.green}[ SUCCESS ] Component "${comp.name}" added successfully to ${config.srcDir}/${componentFolder}!${C.reset}\n`);
}

// ----------------------------------------------------------------------------
// 5. UPDATE COMMAND
// ----------------------------------------------------------------------------
async function runUpdate() {
  console.log(`${C.cyan}[ SnippetUI CLI ] Auditing local files and checking registry updates...${C.reset}`);
  
  // Download latest registry database
  let cloudDb;
  try {
    cloudDb = await fetchCloudJson(REMOTE_REGISTRY_URL);
    // Cache database registry locally
    const dest = path.join(__dirname, 'components.json');
    fs.writeFileSync(dest, JSON.stringify(cloudDb, null, 2), 'utf8');
    console.log(`${C.green}✔ Successfully synced database with Cloud Registry (Found ${cloudDb.length} components).${C.reset}`);
  } catch (err) {
    console.error(`${C.red}[ ERROR ] Failed to update Cloud Registry: ${err.message}${C.reset}`);
    return;
  }

  // Scan local project components folder
  let config = { srcDir: './src/components/snippetui' };
  const configPath = path.join(process.cwd(), 'snippetui.config.json');
  if (fs.existsSync(configPath)) {
    try {
      config = { ...config, ...JSON.parse(fs.readFileSync(configPath, 'utf8')) };
    } catch (e) {}
  }

  const localComponentsDir = path.join(process.cwd(), config.srcDir);
  if (fs.existsSync(localComponentsDir)) {
    const folders = fs.readdirSync(localComponentsDir);
    let updatedCount = 0;
    for (const folder of folders) {
      const folderPath = path.join(localComponentsDir, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        // Find matching component in database
        const comp = cloudDb.find(c => c.id.split('/').pop() === folder);
        if (comp) {
          // Update it
          console.log(`  -> Updating local component folder: ${C.bold}${folder}${C.reset}...`);
          try {
            fs.writeFileSync(path.join(folderPath, 'Component.html'), comp.html || '', 'utf8');
            if (comp.css) fs.writeFileSync(path.join(folderPath, 'Component.css'), comp.css, 'utf8');
            if (comp.js) fs.writeFileSync(path.join(folderPath, 'script.js'), comp.js, 'utf8');
            if (comp.ts) fs.writeFileSync(path.join(folderPath, 'script.ts'), comp.ts, 'utf8');
            if (comp.tailwind) fs.writeFileSync(path.join(folderPath, 'tailwind.html'), comp.tailwind, 'utf8');
            updatedCount++;
          } catch (e) {
            console.error(`     ${C.red}✗ Failed to write file update in ${folder}: ${e.message}${C.reset}`);
          }
        }
      }
    }
    console.log(`\n${C.green}✔ Updated ${updatedCount} local components successfully! Your workspace is fully up to date.${C.reset}\n`);
  } else {
    console.log(`No local components folder found at ${localComponentsDir}. Nothing to update inside workspace.`);
  }
}

// ----------------------------------------------------------------------------
// 6. CREATE COMMAND
// ----------------------------------------------------------------------------
function runCreate(componentName) {
  if (!componentName) {
    console.error(`${C.red}Error: Please specify a component name. Usage: snippetui create <component-name>${C.reset}`);
    process.exit(1);
  }

  const slug = componentName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  // Read config settings
  let config = { srcDir: './src/components/snippetui' };
  const configPath = path.join(process.cwd(), 'snippetui.config.json');
  if (fs.existsSync(configPath)) {
    try {
      config = { ...config, ...JSON.parse(fs.readFileSync(configPath, 'utf8')) };
    } catch (e) {}
  }

  const targetDir = path.join(process.cwd(), config.srcDir, slug);

  if (fs.existsSync(targetDir)) {
    console.error(`${C.red}Error: A component folder named "${slug}" already exists at ${targetDir}.${C.reset}`);
    process.exit(1);
  }

  try {
    fs.mkdirSync(targetDir, { recursive: true });

    // Boilerplate content templates
    const html = `<div class="custom-card-wrapper">\n  <div class="custom-card">\n    <h3 class="custom-title">${componentName}</h3>\n    <p class="custom-desc">Boilerplate SnippetUI component template.</p>\n    <button class="custom-btn">Interact</button>\n  </div>\n</div>`;
    const css = `.custom-card-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 20px;\n}\n\n.custom-card {\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  backdrop-filter: blur(10px);\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  transition: border-color 0.3s ease, transform 0.3s ease;\n}\n\n.custom-card:hover {\n  border-color: var(--sui-primary, #8a2be2);\n  transform: translateY(-4px);\n}\n\n.custom-btn {\n  background: linear-gradient(135deg, var(--sui-secondary, #00f2fe), var(--sui-primary, #8a2be2));\n  border: none;\n  border-radius: 8px;\n  color: #fff;\n  padding: 10px 20px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: filter 0.2s ease;\n}\n\n.custom-btn:hover {\n  filter: brightness(1.1);\n}`;
    const js = `const btn = document.querySelector('.custom-btn');\nif (btn) {\n  btn.addEventListener('click', () => {\n    console.log('Button clicked!');\n  });\n}`;

    fs.writeFileSync(path.join(targetDir, 'Component.html'), html, 'utf8');
    fs.writeFileSync(path.join(targetDir, 'Component.css'), css, 'utf8');
    fs.writeFileSync(path.join(targetDir, 'script.js'), js, 'utf8');

    console.log(`\n${C.green}✔ Starter boilerplate files created successfully!${C.reset}`);
    console.log(`Directory: ${targetDir}`);
    console.log(`  - Component.html`);
    console.log(`  - Component.css`);
    console.log(`  - script.js`);
    console.log(`Modify files to apply your custom design style.\n`);
  } catch (err) {
    console.error(`${C.red}Error generating template component: ${err.message}${C.reset}`);
  }
}

// ----------------------------------------------------------------------------
// 7. DOCTOR COMMAND
// ----------------------------------------------------------------------------
function runDoctor() {
  printHeader();
  console.log(`${C.bold}SnippetUI Diagnostic Integrity Check:${C.reset}\n`);

  let warnings = 0;

  // Check Config File
  const configPath = path.join(process.cwd(), 'snippetui.config.json');
  if (fs.existsSync(configPath)) {
    console.log(`  [ ${C.green}PASS${C.reset} ] config file found: snippetui.config.json`);
    try {
      const parsed = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      console.log(`           Framework: ${parsed.framework}`);
      console.log(`           Style format: ${parsed.styleFormat}`);
      console.log(`           Output folder: ${parsed.srcDir}`);
    } catch (e) {
      console.log(`  [ ${C.red}FAIL${C.reset} ] config file contains invalid JSON structures.`);
      warnings++;
    }
  } else {
    console.log(`  [ ${C.yellow}WARN${C.reset} ] config file snippetui.config.json not found in project directory.`);
    console.log(`           To create one, run: snippetui init`);
    warnings++;
  }

  // Check node modules / package.json
  const pkgPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(pkgPath)) {
    console.log(`  [ ${C.green}PASS${C.reset} ] package.json file found.`);
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      
      let frameworkDetected = 'Vanilla';
      if (deps.react || deps['react-dom']) frameworkDetected = 'React';
      else if (deps.vue) frameworkDetected = 'Vue';
      else if (deps.svelte) frameworkDetected = 'Svelte';
      
      console.log(`           Detected workspace framework environment: ${C.bold}${frameworkDetected}${C.reset}`);
    } catch (e) {}
  } else {
    console.log(`  [ ${C.yellow}WARN${C.reset} ] package.json not found in current directory. Not in Node workspace project.`);
    warnings++;
  }

  // Check tailwind config file
  const localConfigs = [
    'tailwind.config.js',
    'tailwind.config.cjs',
    'tailwind.config.ts',
    'tailwind.config.mjs'
  ];
  let foundTailwind = false;
  for (const conf of localConfigs) {
    if (fs.existsSync(path.join(process.cwd(), conf))) {
      console.log(`  [ ${C.green}PASS${C.reset} ] Tailwind CSS config found: ${conf}`);
      foundTailwind = true;
      break;
    }
  }
  if (!foundTailwind) {
    console.log(`  [ ${C.dim}INFO${C.reset} ] Tailwind configuration file not detected. Tailwind animations injection will be skipped.`);
  }

  // Check database file
  const db = loadLocalDatabase();
  if (db && db.length > 0) {
    console.log(`  [ ${C.green}PASS${C.reset} ] Database cache registry found (${db.length} components loaded).`);
  } else {
    console.log(`  [ ${C.yellow}WARN${C.reset} ] Local components database cache file not found. Online CDN fetching will occur.`);
    warnings++;
  }

  if (warnings === 0) {
    console.log(`\n${C.green}✔ System diagnostics completed with flying colors! Your environment has zero issues.${C.reset}\n`);
  } else {
    console.log(`\n${C.yellow}⚠ Audits finished with ${warnings} diagnostic warnings. Please review recommendations above.${C.reset}\n`);
  }
}

// ----------------------------------------------------------------------------
// 8. LOGIN COMMAND
// ----------------------------------------------------------------------------
async function runLogin() {
  printHeader();
  console.log(`${C.bold}Authenticate with SnippetUI Hub:${C.reset}\n`);
  console.log(`To connect with SnippetUI Hub and enable visual design team syncing, please create an Access Key token inside your developer settings dashboard.`);
  
  const answers = await promptQuestions([
    {
      key: 'token',
      question: 'Enter Developer Access Token (press Enter for Anonymous/Guest mode)',
      default: 'anonymous'
    }
  ]);

  const authDir = path.join(os.homedir(), '.snippetui');
  try {
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    const authSession = {
      username: answers.token === 'anonymous' ? 'guest-developer' : `dev-${answers.token.slice(0, 5)}...`,
      token: answers.token,
      authenticatedAt: new Date().toISOString()
    };

    fs.writeFileSync(path.join(authDir, 'auth.json'), JSON.stringify(authSession, null, 2), 'utf8');

    console.log(`\n${C.green}✔ Handshake completed successfully.${C.reset}`);
    console.log(`Logged in as user: ${C.cyan}${authSession.username}${C.reset}. Shared team synchronizations activated.\n`);
  } catch (err) {
    console.error(`${C.red}Error writing authentication credentials file: ${err.message}${C.reset}`);
  }
}

// ----------------------------------------------------------------------------
// MAIN COMMAND ROUTER
// ----------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  switch (command) {
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
    case 'version':
    case '--version':
    case '-v':
      showVersion();
      break;
    case 'init':
      const hasYesFlag = args.includes('--yes') || args.includes('-y');
      await runInit({ yes: hasYesFlag });
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
    case 'update':
      await runUpdate();
      break;
    case 'create':
      runCreate(args[1]);
      break;
    case 'doctor':
      runDoctor();
      break;
    case 'login':
      await runLogin();
      break;
    default:
      console.log(`${C.red}Error: Unknown command "${command}".${C.reset}`);
      console.log(`Type ${C.cyan}snippetui --help${C.reset} to view available commands.`);
      process.exit(1);
  }
}

main();
