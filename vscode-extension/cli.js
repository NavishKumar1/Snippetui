#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args[0] === 'add' && args[1]) {
    const componentId = args[1];
    console.log(`[SnippetUI CLI] Locating component: ${componentId}...`);
    
    // Resolve library directory
    const libraryDir = path.join(__dirname, '../src/library');
    if (!fs.existsSync(libraryDir)) {
        console.error(`[SnippetUI CLI] Error: Library database directory not found at ${libraryDir}`);
        process.exit(1);
    }

    // 1. Scan subdirectories to locate the component JS file
    let componentFilePath = null;
    try {
        const categories = fs.readdirSync(libraryDir);
        for (const cat of categories) {
            const catPath = path.join(libraryDir, cat);
            if (fs.statSync(catPath).isDirectory()) {
                const files = fs.readdirSync(catPath);
                for (const file of files) {
                    if (file === `${componentId}.js`) {
                        componentFilePath = path.join(catPath, file);
                        break;
                    }
                }
            }
            if (componentFilePath) break;
        }
    } catch (err) {
        console.error(`[SnippetUI CLI] Error scanning components directory:`, err);
        process.exit(1);
    }

    if (!componentFilePath) {
        console.error(`[SnippetUI CLI] Error: Component "${componentId}" not found in database registry.`);
        process.exit(1);
    }

    // 2. Parse modular ESM component file
    let content;
    try {
        content = fs.readFileSync(componentFilePath, 'utf8');
    } catch (err) {
        console.error(`[SnippetUI CLI] Error reading component file:`, err);
        process.exit(1);
    }

    function extractField(fieldName) {
        const regex = new RegExp(`${fieldName}\\s*:\\s*(?:\\\`([\\s\\S]*?)\\\`|'([\\s\\S]*?)'|"([\\s\\S]*?)")`, 'i');
        const match = content.match(regex);
        if (match) {
            return match[1] || match[2] || match[3] || '';
        }
        return '';
    }

    const comp = {
        id: extractField('id') || componentId,
        name: extractField('name') || componentId,
        category: extractField('category'),
        tag: extractField('tag'),
        html: extractField('html'),
        css: extractField('css'),
        js: extractField('js'),
        ts: extractField('ts'),
        tailwind: extractField('tailwind'),
        prompt: extractField('prompt')
    };

    // Create target directory in developer's workspace
    const targetDir = path.join(process.cwd(), 'src', 'components', comp.id);
    try {
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
    } catch (err) {
        console.error(`[SnippetUI CLI] Error creating target directory ${targetDir}:`, err);
        process.exit(1);
    }

    // 3. Write basic files (HTML, CSS, JS, TS, Tailwind)
    try {
        fs.writeFileSync(path.join(targetDir, 'Component.html'), comp.html, 'utf8');
        if (comp.css) fs.writeFileSync(path.join(targetDir, 'Component.css'), comp.css, 'utf8');
        if (comp.js) fs.writeFileSync(path.join(targetDir, 'script.js'), comp.js, 'utf8');
        if (comp.ts) fs.writeFileSync(path.join(targetDir, 'script.ts'), comp.ts, 'utf8');
        if (comp.tailwind) fs.writeFileSync(path.join(targetDir, 'tailwind.html'), comp.tailwind, 'utf8');
    } catch (err) {
        console.error(`[SnippetUI CLI] Error writing standard component files:`, err);
        process.exit(1);
    }

    // Helper functions for wrappers compilers
    function toJSX(htmlStr) {
        let jsx = htmlStr;
        jsx = jsx.replace(/\bclass="/g, 'className="');
        jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
            const rules = styleStr.split(';').filter(r => r.trim());
            const reactRules = rules.map(rule => {
                const parts = rule.split(':');
                if (parts.length < 2) return null;
                const key = parts[0].trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
                const val = parts.slice(1).join(':').trim().replace(/'/g, "\\'");
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

    // 4. Generate Framework Wrappers
    const camelCaseName = comp.name.replace(/[^a-zA-Z0-9]/g, '');
    const scopedScriptJs = scopeScript(comp.js);
    const scopedScriptTs = scopeScript(comp.ts || comp.js);
    const hasScript = scopedScriptJs && scopedScriptJs.trim();
    const jsxContent = toJSX(comp.html);

    // A. React (JSX & TSX)
    const reactJsx = `import React${hasScript ? ', { useEffect }' : ''}, { useRef } from 'react';
${comp.css ? "import './Component.css';\n" : ''}
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
      ${jsxContent.split('\n').join('\n      ')}
    </div>
  );
}`;

    const reactTsx = `import React${hasScript ? ', { useEffect }' : ''}, { useRef } from 'react';
${comp.css ? "import './Component.css';\n" : ''}
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
      ${jsxContent.split('\n').join('\n      ')}
    </div>
  );
}`;

    // B. Vue 3 SFC
    const styleBlock = comp.css ? `\n\n<style scoped>\n${comp.css}\n</style>` : '';
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
    ${comp.html.split('\n').join('\n    ')}
  </div>
</template>${styleBlock}`;

    // C. Svelte
    const svelteStyle = comp.css ? `\n\n<style>\n${comp.css}\n</style>` : '';
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
  ${comp.html.split('\n').join('\n  ')}
</div>${svelteStyle}`;

    // Write wrappers files
    try {
        fs.writeFileSync(path.join(targetDir, 'Component.jsx'), reactJsx, 'utf8');
        fs.writeFileSync(path.join(targetDir, 'Component.tsx'), reactTsx, 'utf8');
        fs.writeFileSync(path.join(targetDir, 'Component.vue'), vueCode, 'utf8');
        fs.writeFileSync(path.join(targetDir, 'Component.svelte'), svelteCode, 'utf8');
    } catch (err) {
        console.error(`[SnippetUI CLI] Error writing framework wrapper files:`, err);
        process.exit(1);
    }

    // 5. Asset Dependency Auto-Detector & Downloader
    const fullSourceText = comp.html + '\n' + (comp.css || '') + '\n' + (comp.js || '');
    const assetRegex = /(?:"|')(\/assets\/[^"'\s>]+|\/public\/[^"'\s>]+)(?:"|')/gi;
    let assetMatch;
    const detectedAssets = new Set();
    while ((assetMatch = assetRegex.exec(fullSourceText)) !== null) {
        detectedAssets.add(assetMatch[1]);
    }

    const publicSourceDir = path.join(__dirname, '../public');
    if (detectedAssets.size > 0 && fs.existsSync(publicSourceDir)) {
        console.log(`[SnippetUI CLI] Detected ${detectedAssets.size} asset dependencies. Downloading...`);
        detectedAssets.forEach(rawPath => {
            // Strip leading /public if present
            let cleanPath = rawPath;
            if (rawPath.startsWith('/public/')) {
                cleanPath = rawPath.replace('/public/', '/');
            }
            
            const srcAssetFile = path.join(publicSourceDir, cleanPath);
            const destAssetFile = path.join(process.cwd(), 'public', cleanPath);

            if (fs.existsSync(srcAssetFile)) {
                try {
                    const destSubdir = path.dirname(destAssetFile);
                    if (!fs.existsSync(destSubdir)) {
                        fs.mkdirSync(destSubdir, { recursive: true });
                    }
                    fs.copyFileSync(srcAssetFile, destAssetFile);
                    console.log(`  -> Downloaded asset: ${cleanPath} to public${cleanPath}`);
                } catch (err) {
                    console.warn(`  -> [SnippetUI CLI] Warning: Failed to copy asset ${cleanPath}:`, err.message);
                }
            } else {
                console.warn(`  -> [SnippetUI CLI] Warning: Asset file not found in library repository: ${cleanPath}`);
            }
        });
    }

    // 6. Automatic Tailwind Configuration Animation/Keyframe Injector
    if (comp.css) {
        // Parse keyframes using a safe character loop to resolve nested brackets correctly
        const keyframes = {};
        let searchIdx = 0;
        while (true) {
            const matchIdx = comp.css.toLowerCase().indexOf('@keyframes', searchIdx);
            if (matchIdx === -1) break;
            
            const nameStart = matchIdx + 10;
            const braceStart = comp.css.indexOf('{', nameStart);
            if (braceStart === -1) break;
            const name = comp.css.slice(nameStart, braceStart).trim();
            
            // Find matching closing brace
            let braceCount = 1;
            let idx = braceStart + 1;
            while (idx < comp.css.length && braceCount > 0) {
                if (comp.css[idx] === '{') braceCount++;
                else if (comp.css[idx] === '}') braceCount--;
                idx++;
            }
            
            const body = comp.css.slice(braceStart + 1, idx - 1);
            searchIdx = idx;

            // Parse stages inside the keyframes body
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

        // Parse animation configurations
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
        // Handle animation-name, duration etc.
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
            // Locate local tailwind config file
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
                console.log(`[SnippetUI CLI] Found local tailwind configuration: ${path.basename(foundConfigPath)}. Injecting keyframes and animations...`);
                let configContent = fs.readFileSync(foundConfigPath, 'utf8');
                
                // Formulate keyframes object string
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

                // Formulate animations object string
                let animsStr = '';
                for (const [name, val] of Object.entries(animations)) {
                    animsStr += `\n        '${name}': '${val}',`;
                }

                // Substring injection
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
                    } else {
                        console.warn(`[SnippetUI CLI] Warning: Could not locate 'theme' or 'extend' inside ${path.basename(foundConfigPath)}. Animation keyframes skipped.`);
                    }
                }
                
                try {
                    fs.writeFileSync(foundConfigPath, configContent, 'utf8');
                    console.log(`[SnippetUI CLI] Successfully injected keyframes (${kfNames.join(', ')}) and animations to ${path.basename(foundConfigPath)}.`);
                } catch (err) {
                    console.error(`[SnippetUI CLI] Error updating tailwind config:`, err);
                }
            }
        }
    }

    console.log(`\n[SnippetUI CLI] Success! Added component "${comp.name}" to src/components/${comp.id}`);
} else {
    console.log("SnippetUI CLI");
    console.log("Usage: snippetui add <component-id>");
}
