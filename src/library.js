/**
 * SnippetUI - Component Library Page
 * Dynamically rendered from modular component files
 */

import { COMPONENTS_DATABASE } from './library/index.js';
import Lenis from 'lenis';
import { t, getCurrentLanguage, setLanguage } from './i18n.js';



// CRC-32 Lookup Table & Helper for uncompressed Store ZIP writing
const crcTable = [];
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let j = 0; j < 8; j++) {
    c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
  }
  crcTable[i] = c;
}

function calculateCrc32(str) {
  let crc = 0 ^ (-1);
  const bytes = new TextEncoder().encode(str);
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function generateZip(files) {
  const encoder = new TextEncoder();
  let offset = 0;
  const localHeaders = [];
  const fileDatas = [];
  const centralHeaders = [];
  
  files.forEach(file => {
    const filenameBytes = encoder.encode(file.name);
    const contentBytes = encoder.encode(file.content);
    const crc = calculateCrc32(file.content);
    const size = contentBytes.length;
    
    const date = new Date();
    const dosTime = ((date.getHours() << 11) | (date.getMinutes() << 5) | (date.getSeconds() >> 1)) & 0xFFFF;
    const dosDate = (((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()) & 0xFFFF;
    
    const localHeader = new Uint8Array(30 + filenameBytes.length);
    const view = new DataView(localHeader.buffer);
    
    view.setUint32(0, 0x04034b50, true);
    view.setUint16(4, 10, true);
    view.setUint16(6, 0, true);
    view.setUint16(8, 0, true);
    view.setUint16(10, dosTime, true);
    view.setUint16(12, dosDate, true);
    view.setUint32(14, crc, true);
    view.setUint32(18, size, true);
    view.setUint32(22, size, true);
    view.setUint16(26, filenameBytes.length, true);
    view.setUint16(28, 0, true);
    
    localHeader.set(filenameBytes, 30);
    localHeaders.push(localHeader);
    fileDatas.push(contentBytes);
    
    const centralHeader = new Uint8Array(46 + filenameBytes.length);
    const cView = new DataView(centralHeader.buffer);
    
    cView.setUint32(0, 0x02014b50, true);
    cView.setUint16(4, 20, true);
    cView.setUint16(6, 10, true);
    cView.setUint16(8, 0, true);
    cView.setUint16(10, 0, true);
    cView.setUint16(12, dosTime, true);
    cView.setUint16(14, dosDate, true);
    cView.setUint32(16, crc, true);
    cView.setUint32(20, size, true);
    cView.setUint32(24, size, true);
    cView.setUint16(28, filenameBytes.length, true);
    cView.setUint16(30, 0, true);
    cView.setUint16(32, 0, true);
    cView.setUint16(34, 0, true);
    cView.setUint16(36, 0, true);
    cView.setUint32(38, 0, true);
    cView.setUint32(42, offset, true);
    
    centralHeader.set(filenameBytes, 46);
    centralHeaders.push(centralHeader);
    
    offset += 30 + filenameBytes.length + size;
  });
  
  const totalLocalHeadersSize = localHeaders.reduce((acc, h) => acc + h.length, 0);
  const totalFileDatasSize = fileDatas.reduce((acc, d) => acc + d.length, 0);
  const totalCentralHeadersSize = centralHeaders.reduce((acc, h) => acc + h.length, 0);
  
  const eocd = new Uint8Array(22);
  const eView = new DataView(eocd.buffer);
  
  eView.setUint32(0, 0x06054b50, true);
  eView.setUint16(4, 0, true);
  eView.setUint16(6, 0, true);
  eView.setUint16(8, files.length, true);
  eView.setUint16(10, files.length, true);
  eView.setUint32(12, totalCentralHeadersSize, true);
  eView.setUint32(16, totalLocalHeadersSize + totalFileDatasSize, true);
  eView.setUint16(20, 0, true);
  
  const blobs = [];
  files.forEach((_, idx) => {
    blobs.push(localHeaders[idx]);
    blobs.push(fileDatas[idx]);
  });
  centralHeaders.forEach(h => blobs.push(h));
  blobs.push(eocd);
  
  return new Blob(blobs, { type: 'application/zip' });
}

export function renderLibrary(onNavigate, initialFilter = 'all') {
  const rawCategories = Array.from(new Set(COMPONENTS_DATABASE.map(c => c.category)));
  let activeFilter = (initialFilter === 'all' || !initialFilter || !rawCategories.includes(initialFilter)) ? rawCategories[0] : initialFilter;
  let searchQuery = '';
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const shortcutLabel = isMac ? '⌘K' : 'Ctrl K';
  let activeDetailComponent = null;
  let clickOutsideCloseCategories = null;
  
  // Track active selections in dropdowns
  let selectedFramework = 'html'; // 'html', 'react', 'vue', 'svelte', 'solid'
  let selectedScript = 'js'; // 'js' or 'ts'
  let selectedStyle = 'css';  // 'css' or 'tailwind'

  // Track active selections in manual wizard
  let selectedManualScript = 'js';
  let selectedManualStyle = 'css';
  let renderedLimit = 24;
  let loadMoreObserver = null;

  // Generate highly descriptive custom integration templates for each component
  function getComponentUsage(comp) {
    if (!comp) return '';
    
    // For text-animation category
    if (comp.category === 'text-animation') {
      if (comp.id === 'typing-terminal-text') {
        return `<!-- Step 1: Add HTML Structure to your project -->
<div class="typing-terminal-wrapper">
  <span class="typing-terminal-text"></span>
  <span class="typing-terminal-cursor">|</span>
</div>

<!-- Step 2: Add dynamic typewriter initialization script -->
<script type="module">
  const text = 'console.log("Welcome to SnippetUI!");';
  const target = document.querySelector('.typing-terminal-text');
  
  if (target) {
    let i = 0;
    const type = () => {
      if (i < text.length) {
        target.textContent += text.charAt(i);
        i++;
        setTimeout(type, 80);
      } else {
        setTimeout(() => {
          target.textContent = '';
          i = 0;
          type();
        }, 3000);
      }
    };
    type();
  }
</script>

<!-- Step 3: Copy and paste the CSS declarations from the 'Code' tab into your style.css -->`;
      }
      
      if (comp.id === 'perspective-3d-text') {
        return `<!-- Step 1: Add HTML Structure -->
<div class="perspective-3d-text-effect" data-text="ISOMETRIC">
  ISOMETRIC
</div>

<!-- Step 2: Implement coordinates tilt listener -->
<script type="module">
  const text3d = document.querySelector('.perspective-3d-text-effect');
  if (text3d) {
    document.addEventListener('mousemove', (e) => {
      const rect = text3d.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const tiltX = -(y / rect.height) * 15;
      const tiltY = (x / rect.width) * 15;
      
      text3d.style.transform = \`rotateX(\${15 + tiltX}deg) rotateY(\${-20 + tiltY}deg)\`;
    });
    
    // Smooth reset on mouse leave
    text3d.addEventListener('mouseleave', () => {
      text3d.style.transform = 'rotateX(15deg) rotateY(-20deg)';
    });
  }
</script>

<!-- Step 3: Copy and paste the CSS definitions from the 'Code' tab into your style.css -->`;
      }
      
      let customNote = '';
      if (comp.id === 'kinetic-float-text') {
        customNote = `\n<!-- Note: For floating characters, make sure each letter is wrapped inside <span> tags as shown above! -->`;
      }
      return `<!-- Step 1: Place HTML structure where desired -->
${comp.html}${customNote}

<!-- Step 2: Paste the custom styles from the 'Code' tab into your global stylesheet (e.g. style.css) -->
<link rel="stylesheet" href="style.css">

<!-- Step 3: (Optional) Speed up or pause cycles using micro-interactions -->
<script type="module">
  // All animations inside this category are optimized to run 100% on hardware-accelerated pure CSS!
</script>`;
    }
    
    // For other categories
    return `<!-- Step 1: HTML Markup -->
${comp.html}

<!-- Step 2: Style Integration -->
<!-- Head over to the 'Code' tab to copy either Vanilla CSS or Tailwind utility integrations! -->
<link rel="stylesheet" href="style.css">`;
  }

  // Compile components to React, Vue, Svelte, and SolidJS
  function compileComponent(comp, framework, scriptType, styleType) {
    if (!comp) return { markup: '', script: '', style: '' };

    const isTS = scriptType === 'ts';
    const isTailwind = styleType === 'tailwind';
    const isModules = styleType === 'modules';
    
    const rawHtml = comp.html || '';
    const rawCss = comp.css || '';
    const rawTailwind = comp.tailwind || '';
    const rawScript = isTS ? (comp.ts || comp.js || '') : (comp.js || '');

    // Helper: Convert CSS class to className for JSX
    function toJSX(htmlStr, useModules = false) {
      let jsx = htmlStr || '';
      jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');
      
      // Close self-closing tags like img, input, br, hr
      jsx = jsx.replace(/<(img|input|br|hr|meta|link)([^>]*)(?<!\/)>/gi, '<$1$2 />');
      
      // Replace inline styles style="display: flex; cursor: pointer;" with style={{ display: 'flex', cursor: 'pointer' }}
      jsx = jsx.replace(/style="([^"]*)"/g, (match, styleStr) => {
        const rules = styleStr.split(';').filter(r => r.trim());
        const reactRules = rules.map(rule => {
          const parts = rule.split(':');
          if (parts.length < 2) return null;
          const key = parts[0].trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
          const val = parts.slice(1).join(':').trim().replace(/\\/g, '\\\\').replace(/'/g, "\\'");
          return `${key}: '${val}'`;
        }).filter(Boolean);
        return `style={{ ${reactRules.join(', ')} }}`;
      });

      if (useModules) {
        // Replace class="..." with className={styles.camelCase}
        jsx = jsx.replace(/class="([^"]+)"/g, (match, classStr) => {
          const classes = classStr.split(/\s+/).filter(Boolean);
          if (classes.length === 0) return 'className=""';
          if (classes.length === 1) {
            const camel = classes[0].replace(/-([a-z])/g, (m, c) => c.toUpperCase());
            return `className={styles.${camel}}`;
          } else {
            const mapping = classes.map(c => {
              const camel = c.replace(/-([a-z])/g, (m, c) => c.toUpperCase());
              return `\${styles.${camel}}`;
            }).join(' ');
            return `className={\`${mapping}\`}`;
          }
        });
      } else {
        // Replace class="..." with className="..."
        jsx = jsx.replace(/\bclass="/g, 'className="');
      }

      return jsx;
    }

    // Helper: Scope query selectors in script to the ref container
    function scopeScript(scriptStr) {
      if (!scriptStr) return '';
      let scoped = scriptStr;
      scoped = scoped.replace(/document\.querySelector/g, 'select');
      scoped = scoped.replace(/document\.querySelectorAll/g, 'selectAll');
      scoped = scoped.replace(/document\.getElementById\((['"`])([^'"`]+)\1\)/g, "select('#$2')");
      return scoped;
    }

    const camelCaseName = comp.name.replace(/[^a-zA-Z0-9]/g, '');
    const scopedScript = scopeScript(rawScript);

    if (framework === 'react') {
      const jsxContent = toJSX(rawHtml, isModules);
      const hasScript = scopedScript && scopedScript.trim();
      const useEffectImport = hasScript ? ', useEffect' : '';
      const styleImport = isTailwind ? '' : (isModules ? `import styles from './${comp.id}.module.css';\n` : `import './${comp.id}.css';\n`);
      
      const reactCode = `import React${useEffectImport}, { useRef } from 'react';
${styleImport}export default function ${camelCaseName}() {
  const containerRef = useRef${isTS ? '<HTMLDivElement>' : ''}(null);
${hasScript ? `
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    ${isTS ? `function select<T extends HTMLElement = HTMLElement>(selector: string) { return container.querySelector<T>(selector); }
    function selectAll<T extends HTMLElement = HTMLElement>(selector: string) { return container.querySelectorAll<T>(selector); }` : `const select = (selector) => container.querySelector(selector);
    const selectAll = (selector) => container.querySelectorAll(selector);`}

    ${scopedScript.split('\n').join('\n    ')}
  }, []);
` : ''}
  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      ${jsxContent.split('\n').join('\n      ')}
    </div>
  );
}`;
      return {
        markup: reactCode,
        script: '',
        style: isTailwind ? '/* Tailwind utility classes are embedded inside JSX className attributes. */' : rawCss
      };
    }

    if (framework === 'solid') {
      const jsxContent = toJSX(rawHtml, isModules);
      const hasScript = scopedScript && scopedScript.trim();
      const onMountImport = hasScript ? "import { onMount } from 'solid-js';\n" : '';
      const styleImport = isTailwind ? '' : (isModules ? `import styles from './${comp.id}.module.css';\n` : `import './${comp.id}.css';\n`);
      
      const solidCode = `${onMountImport}${styleImport}
export default function ${camelCaseName}() {
  let containerRef${isTS ? ': HTMLDivElement | undefined' : ''};
${hasScript ? `
  onMount(() => {
    const container = containerRef;
    if (!container) return;

    const select = (selector${isTS ? ': string' : ''}) => container.querySelector(selector);
    const selectAll = (selector${isTS ? ': string' : ''}) => container.querySelectorAll(selector);

    ${scopedScript.split('\n').join('\n    ')}
  });
` : ''}
  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      ${jsxContent.split('\n').join('\n      ')}
    </div>
  );
}`;
      return {
        markup: solidCode,
        script: '',
        style: isTailwind ? '/* Tailwind classes are embedded inside SolidJS class attributes. */' : rawCss
      };
    }

    if (framework === 'vue') {
      const hasScript = scopedScript && scopedScript.trim();
      const onMountedImport = hasScript ? ', onMounted' : '';
      
      const styleBlock = isTailwind ? '' : (isModules ? `\n\n<style module>\n${rawCss}\n</style>` : `\n\n<style scoped>\n${rawCss}\n</style>`);
      const scriptSetup = hasScript ? `<script setup${isTS ? ' lang="ts"' : ''}>
import { ref${onMountedImport} } from 'vue';

const containerRef = ref${isTS ? '<HTMLDivElement | null>(null)' : '(null)'};

onMounted(() => {
  const container = containerRef.value;
  if (!container) return;

  const select = (selector${isTS ? ': string' : ''}) => container.querySelector(selector);
  const selectAll = (selector${isTS ? ': string' : ''}) => container.querySelectorAll(selector);

  ${scopedScript.split('\n').join('\n  ')}
});
</script>\n\n` : '';

      const vueCode = `${scriptSetup}<template>
  <div ref="containerRef" style="display: contents;">
    ${rawHtml.split('\n').join('\n    ')}
  </div>
</template>${styleBlock}`;

      return {
        markup: vueCode,
        script: '',
        style: ''
      };
    }

    if (framework === 'svelte') {
      const hasScript = scopedScript && scopedScript.trim();
      const styleBlock = isTailwind ? '' : `\n\n<style>\n${rawCss}\n</style>`;
      
      const scriptBlock = hasScript ? `<script${isTS ? ' lang="ts"' : ''}>
  import { onMount } from 'svelte';

  let containerRef${isTS ? ': HTMLDivElement' : ''};

  onMount(() => {
    if (!containerRef) return;

    const select = (selector${isTS ? ': string' : ''}) => containerRef.querySelector(selector);
    const selectAll = (selector${isTS ? ': string' : ''}) => containerRef.querySelectorAll(selector);

    ${scopedScript.split('\n').join('\n    ')}
  });
</script>\n\n` : '';
      
      const svelteCode = `${scriptBlock}<div bind:this={containerRef} style="display: contents;">
  ${rawHtml.split('\n').join('\n  ')}
</div>${styleBlock}`;

      return {
        markup: svelteCode,
        script: '',
        style: ''
      };
    }

    // Fallback: standard html
    return {
      markup: rawHtml,
      script: rawScript,
      style: isTailwind ? rawTailwind : rawCss
    };
  }

  // Extract unique categories from components database dynamically
  const categories = [...rawCategories];

  function getCountForCategory(cat) {
    return COMPONENTS_DATABASE.filter(c => c.category === cat).length;
  }

  function getFilteredComponents() {
    return COMPONENTS_DATABASE.filter(comp => {
      const matchesCategory = comp.category === activeFilter;
      const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            comp.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  // Format category display names nicely (e.g. 'text-animation' -> 'Text Animation')
  function formatCategoryName(cat) {
    const mapping = {
      'text-animation': 'cat_text',
      'buttons': 'cat_buttons',
      'cards': 'cat_cards',
      'inputs': 'cat_inputs',
      'sliders-and-ranges': 'cat_sliders',
      'dropdowns-and-menus': 'cat_menus',
      'page-transitions': 'cat_transitions',
      'tabs-and-navs': 'cat_tabs',
      'progress-and-gauges': 'cat_progress',
      'loaders': 'cat_loaders',
      'background-animations': 'cat_backgrounds',
      'dock-navigations': 'cat_docks',
      'sidebar-navigations': 'cat_sidebars',
      'containers': 'cat_containers',
      'dashboard-widgets': 'cat_widgets',
      'monetization': 'cat_monetization',
      'dashboard-layouts': 'cat_layouts'
    };
    const key = mapping[cat];
    if (key && t(key) !== key) {
      return t(key);
    }
    return cat
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Generate sidebar category HTML
  function renderSidebarCategories() {
    return categories.map(cat => {
      const activeClass = activeFilter === cat ? 'active' : '';
      return `
        <li>
          <button class="category-btn ${activeClass}" data-category="${cat}">
            <span>${formatCategoryName(cat)}</span>
            <span class="category-count">${getCountForCategory(cat)}</span>
          </button>
        </li>
      `;
    }).join('');
  }

  function renderSingleCardHtml(comp) {
    return `
      <div class="component-card" id="card-${comp.id}">
        <div class="component-preview" style="cursor: default;">
          ${comp.html}
          <button class="btn-card-fullscreen" data-id="${comp.id}" title="${t('lib_fullscreen_tooltip')}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </button>
        </div>
        <div class="component-footer">
          <div class="component-meta">
            <span class="component-name">${comp.name}</span>
            <span class="component-tag">${comp.tag}</span>
          </div>
          <div class="component-actions">
            <button class="btn-card-action btn-view-code" data-id="${comp.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              ${t('lib_view_code')}
            </button>
            <button class="btn-card-action btn-copy-prompt" data-id="${comp.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              ${t('lib_copy_prompt')}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderSkeletonCardHtml() {
    return `
      <div class="component-card card-skeleton-loading">
        <div class="component-preview skeleton-glow-effect" style="height: 220px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.01);">
          <div class="skeleton-shimmer-bar circle" style="width: 70px; height: 70px; border-radius: 50%;"></div>
        </div>
        <div class="component-footer" style="padding: 16px; display: flex; flex-direction: column; gap: 10px;">
          <div class="skeleton-shimmer-bar text-bar" style="width: 60%; height: 16px; border-radius: 4px;"></div>
          <div class="skeleton-shimmer-bar text-bar" style="width: 40%; height: 12px; border-radius: 4px;"></div>
          <div class="skeleton-shimmer-bar text-bar" style="width: 90%; height: 28px; border-radius: 6px; margin-top: 6px;"></div>
        </div>
      </div>
    `;
  }

  // Generate grid component cards HTML
  function renderGridCards() {
    const list = getFilteredComponents();
    if (list.length === 0) {
      return `
        <div class="empty-results" style="grid-column: span 2;">
          <div class="empty-icon">🔍</div>
          <h3>${t('lib_empty_title')}</h3>
          <p>${t('lib_empty_desc', { query: searchQuery })}</p>
        </div>
      `;
    }

    const itemsToRender = list.slice(0, renderedLimit);
    const hasMore = list.length > renderedLimit;

    let cardsHtml = itemsToRender.map(renderSingleCardHtml).join('');

    // If there are more components, render a set of shimmering skeleton loader placeholders
    if (hasMore) {
      const remainingCount = Math.min(list.length - renderedLimit, 8); // Render at most 8 skeletons at a time for performance
      for (let i = 0; i < remainingCount; i++) {
        cardsHtml += renderSkeletonCardHtml();
      }
    }

    return cardsHtml;
  }

  // Gather all CSS from all components dynamically
  const dynamicStyles = COMPONENTS_DATABASE.map(comp => comp.css || '').join('\n\n');

  // Compose main library shell HTML
  const htmlContent = `
    <div class="library-view-container" style="
      width: 100vw;
      height: 100vh;
      max-width: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-sizing: border-box;
    ">
      <!-- Top Left Logo Brand Link & Header Controls -->
      <div class="library-brand-header">
        <div class="header-left-group">
          <a href="#landing" id="library-brand-logo" class="nav-brand">
            <img src="/assets/logo.png?v=2" alt="SnippetUI Logo" class="brand-img" />
          </a>
        </div>
        
        <div class="header-right-group">
          <!-- Language Dropdown Selector (Sync with navbar dropdown) -->
          <div class="lang-select-container">
            <select id="library-lang-select" class="global-lang-select" aria-label="Select Language">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
              <option value="zh">简体中文</option>
            </select>
          </div>

          <!-- Back to Home Button -->
          <a href="#landing" class="btn-header-back" id="header-btn-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>${t('lib_back_home')}</span>
          </a>
          
          <!-- GitHub Repo Link -->
          <a href="https://github.com/NavishKumar1/Snippetui" target="_blank" class="github-header-link" aria-label="GitHub Repository">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px;">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>${t('nav_star')}</span>
          </a>
        </div>
      </div>

      <!-- Mobile Floating Categories Toggle Button -->
      <button class="mobile-categories-toggle" id="mobile-categories-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 6px;"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
        <span>${t('lib_categories')}</span>
      </button>

      <div class="library-view" style="margin-top: 0; padding: 0;">
        <!-- Left Sidebar Filters -->
        <aside class="library-sidebar">
          <div class="search-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" class="search-input" id="search-snippets" placeholder="${t('lib_search_placeholder')} (${shortcutLabel})" value="${searchQuery}" />
          </div>
          
          <div class="sidebar-section-wrapper">
            <h3 class="sidebar-section-title">${t('lib_categories')}</h3>
            <ul class="category-list" id="sidebar-categories">
              ${renderSidebarCategories()}
            </ul>
          </div>
        </aside>

        <!-- Right Main Components Grid -->
        <main class="library-main">
          <div class="library-header">
            <div class="library-info">
              <h2>${t('lib_title')}</h2>
              <p>${t('lib_subtitle')}</p>
            </div>
          </div>

          <div class="component-grid" id="components-grid">
            ${renderGridCards()}
          </div>
          <div id="library-sentinel" style="height: 20px; margin-top: 10px; width: 100%;"></div>
        </main>
      </div>
    </div>

    <!-- Overlay 1: Central Full-Screen Frosted Glass Preview Modal -->
    <div class="preview-modal-backdrop" id="preview-modal-backdrop">
      <button class="preview-modal-close-global" id="modal-close-btn" aria-label="Close Preview">✕</button>
      
      <div class="preview-modal-box">
        <!-- Floating Fullscreen Toggle Button (Top-Left inside the box) -->
        <button class="modal-box-fullscreen-toggle" id="modal-btn-fullscreen-toggle" title="Toggle Full Screen">
          <svg class="icon-expand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          <svg class="icon-minimize" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="display: none;"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/></svg>
        </button>

        <!-- Floating Reload Button (Top-Right inside the box) -->
        <button class="modal-box-reload-floating" id="modal-btn-reload-floating" title="Reload Component">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        </button>

        <!-- Demo Content Toggle (For Background Animations) -->
        <div class="modal-demo-toggle-wrapper" id="modal-demo-toggle-container" style="display: none;">
          <span class="demo-toggle-label">Demo Content</span>
          <label class="demo-toggle-switch">
            <input type="checkbox" id="modal-demo-content-checkbox" checked>
            <span class="demo-toggle-slider"></span>
          </label>
        </div>
        
        <!-- Live element container centered -->
        <div class="live-preview-container" id="modal-live-container">
          <!-- Injected element -->
        </div>
      </div>
    </div>


    <!-- Overlay 2: Frosted Slide-out Drawer with Custom Capsule Dropdown Selectors -->
    <div class="code-modal-backdrop" id="code-drawer-backdrop">
      <div class="code-drawer">
        <div class="drawer-header" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.15);">
          <div class="drawer-title" style="display: flex; flex-direction: column; gap: 2px;">
            <h3 id="drawer-comp-name">${t('lib_drawer_title')}</h3>
            <p style="font-size: 13px; color: var(--text-secondary);">${t('lib_drawer_subtitle')}</p>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <button class="btn-drawer-download-zip" id="btn-download-bundle" title="Download Framework Bundle (.zip)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              <span>Bundle ZIP</span>
            </button>
            <button class="drawer-close-btn" id="drawer-close" aria-label="Close panel" style="position: static; font-size: 20px;">✕</button>
          </div>
        </div>

        <!-- Sidebar / Drawer Tabs navigation -->
        <div class="drawer-tabs">
          <button class="drawer-tab-btn active" data-tab="install">${t('lib_tab_install')}</button>
          <button class="drawer-tab-btn" data-tab="usage">${t('lib_tab_usage')}</button>
          <button class="drawer-tab-btn" data-tab="code">${t('lib_tab_code')}</button>
        </div>

        <div class="drawer-panes-wrapper" style="flex-grow: 1; display: flex; flex-direction: column; overflow: hidden; position: relative;">
          
          <!-- Pane 1: Install -->
          <div class="drawer-pane active" data-pane="install" style="display: flex; flex-direction: column; gap: 24px; padding: 24px; overflow-y: auto; height: 100%;">
            <div class="section-container" style="display: flex; flex-direction: column; gap: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; letter-spacing: -0.01em;">${t('lib_install_title')}</h4>
                
                <!-- CLI Version Indicator (Mirroring shadcn selector) -->
                <button class="custom-dropdown-btn compact" style="width: auto; height: 32px; padding: 0 10px; border-radius: 6px; font-size: 11px; pointer-events: none; border: 1px solid var(--border-color); background: rgba(255,255,255,0.02); color: var(--text-secondary); display: flex; align-items: center; gap: 6px;">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  <span>snippetui v1.0</span>
                </button>
              </div>

              <!-- Install Sub-Tabs: CLI vs Manual -->
              <div class="install-mode-toggle">
                <button class="install-mode-btn active" data-mode="cli">${t('lib_install_cli')}</button>
                <button class="install-mode-btn" data-mode="manual">${t('lib_install_manual')}</button>
              </div>

              <!-- Mode Content: CLI Installation Option -->
              <div class="install-mode-pane active" data-install-mode="cli" style="display: flex; flex-direction: column; gap: 12px;">
                <!-- Package Manager Tabs: pnpm, npm, yarn, bun -->
                <div class="pm-tabs">
                  <button class="pm-tab-btn active" data-pm="pnpm">pnpm</button>
                  <button class="pm-tab-btn" data-pm="npm">npm</button>
                  <button class="pm-tab-btn" data-pm="yarn">yarn</button>
                  <button class="pm-tab-btn" data-pm="bun">bun</button>
                </div>

                <!-- Package Manager Code Container Box -->
                <div class="code-card-wrapper" style="display: flex; align-items: center; background: #06060a; border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden; padding: 14px 18px; justify-content: space-between; height: 56px; min-height: 56px;">
                  <code id="cli-command-box" style="font-family: var(--font-mono); font-size: 12.5px; color: #e1e4e8; white-space: nowrap; overflow-x: auto; flex-grow: 1; padding-right: 16px;">pnpm dlx snippetui@latest add neon-glow-text</code>
                  <button class="btn-drawer-copy inline-copy" id="copy-cli-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>${t('pipeline_copy_btn')}</span>
                  </button>
                </div>
              </div>

              <!-- Mode Content: Manual Installation Option -->
              <div class="install-mode-pane" data-install-mode="manual" style="display: none; flex-direction: column; gap: 20px;">
                <!-- Step 1 -->
                <div class="manual-step-card" style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; transition: var(--transition-fast);">
                  <div style="display: flex; gap: 12px; align-items: flex-start;">
                    <div style="font-family: var(--font-heading); font-size: 12px; font-weight: 800; color: var(--accent-cyan); background: rgba(0, 242, 254, 0.08); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; min-width: 24px; border: 1px solid rgba(0, 242, 254, 0.2);">1</div>
                    <div style="flex-grow: 1;">
                      <strong style="color: #ffffff; display: block; font-size: 13.5px; margin-bottom: 2px;">${t('lib_step_html')}</strong>
                      <span style="font-size: 12px; color: var(--text-secondary);">${t('lib_step_html_desc')}</span>
                    </div>
                  </div>
                  <div class="code-card-wrapper" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; max-height: 140px;">
                    <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); min-height: 28px;">
                      <span style="font-size: 11px; color: var(--text-secondary);">HTML</span>
                      <button type="button" class="btn-drawer-copy inline-copy compact-copy" id="manual-copy-html-btn" style="position: static; padding: 2px 6px; font-size: 10px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); color: #ffffff; border-radius: 4px; cursor: pointer;">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>${t('pipeline_copy_btn')}</span>
                      </button>
                    </div>
                    <pre id="manual-html-box" style="margin: 0; padding: 10px; font-family: var(--font-mono); font-size: 11.5px; color: #e1e4e8; overflow: auto; white-space: pre-wrap; word-break: break-all; max-height: 110px;"></pre>
                  </div>
                </div>

                <!-- Step 2 -->
                <div class="manual-step-card" style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; transition: var(--transition-fast);">
                  <div style="display: flex; gap: 12px; align-items: flex-start; justify-content: space-between; flex-wrap: wrap;">
                    <div style="display: flex; gap: 12px; align-items: flex-start;">
                      <div style="font-family: var(--font-heading); font-size: 12px; font-weight: 800; color: var(--accent-cyan); background: rgba(0, 242, 254, 0.08); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; min-width: 24px; border: 1px solid rgba(0, 242, 254, 0.2);">2</div>
                      <div style="flex-grow: 1;">
                        <strong style="color: #ffffff; display: block; font-size: 13.5px; margin-bottom: 2px;">${t('lib_step_styles')}</strong>
                        <span style="font-size: 12px; color: var(--text-secondary);">${t('lib_step_styles_desc')}</span>
                      </div>
                    </div>
                    <!-- Inline CSS/Tailwind toggle -->
                    <div class="manual-style-toggle" style="display: flex; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 6px; padding: 2px; align-self: flex-start;">
                      <button type="button" class="manual-style-btn active" data-manual-style="css" style="background: rgba(255,255,255,0.08); border: none; padding: 2px 8px; font-size: 10px; font-weight: 600; color: #ffffff; cursor: pointer; border-radius: 4px; transition: background 0.15s;">CSS</button>
                      <button type="button" class="manual-style-btn" data-manual-style="tailwind" style="background: none; border: none; padding: 2px 8px; font-size: 10px; font-weight: 600; color: var(--text-secondary); cursor: pointer; border-radius: 4px; transition: background 0.15s;">Tailwind</button>
                    </div>
                  </div>
                  <div class="code-card-wrapper" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; max-height: 140px;">
                    <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); min-height: 28px;">
                      <span id="manual-style-title" style="font-size: 11px; color: var(--text-secondary);">${t('lib_style')}</span>
                      <button type="button" class="btn-drawer-copy inline-copy compact-copy" id="manual-copy-style-btn" style="position: static; padding: 2px 6px; font-size: 10px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); color: #ffffff; border-radius: 4px; cursor: pointer;">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>${t('pipeline_copy_btn')}</span>
                      </button>
                    </div>
                    <pre id="manual-style-box" style="margin: 0; padding: 10px; font-family: var(--font-mono); font-size: 11.5px; color: #e1e4e8; overflow: auto; white-space: pre-wrap; word-break: break-all; max-height: 110px;"></pre>
                  </div>
                </div>

                <!-- Step 3 -->
                <div class="manual-step-card" style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; transition: var(--transition-fast);">
                  <div style="display: flex; gap: 12px; align-items: flex-start; justify-content: space-between; flex-wrap: wrap;">
                    <div style="display: flex; gap: 12px; align-items: flex-start;">
                      <div style="font-family: var(--font-heading); font-size: 12px; font-weight: 800; color: var(--accent-cyan); background: rgba(0, 242, 254, 0.08); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; min-width: 24px; border: 1px solid rgba(0, 242, 254, 0.2);">3</div>
                      <div style="flex-grow: 1;">
                        <strong style="color: #ffffff; display: block; font-size: 13.5px; margin-bottom: 2px;">${t('lib_step_script')}</strong>
                        <span style="font-size: 12px; color: var(--text-secondary);">${t('lib_step_script_desc')}</span>
                      </div>
                    </div>
                    <!-- Inline Script toggle -->
                    <div class="manual-script-toggle" style="display: flex; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 6px; padding: 2px; align-self: flex-start;">
                      <button type="button" class="manual-script-btn active" data-manual-script="js" style="background: rgba(255, 255, 255, 0.08); border: none; padding: 2px 8px; font-size: 10px; font-weight: 600; color: #ffffff; cursor: pointer; border-radius: 4px; transition: background 0.15s;">JS</button>
                      <button type="button" class="manual-script-btn" data-manual-script="ts" style="background: none; border: none; padding: 2px 8px; font-size: 10px; font-weight: 600; color: var(--text-secondary); cursor: pointer; border-radius: 4px; transition: background 0.15s;">TS</button>
                    </div>
                  </div>
                  <div class="code-card-wrapper" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; max-height: 140px;">
                    <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); min-height: 28px;">
                      <span id="manual-script-title" style="font-size: 11px; color: var(--text-secondary);">${t('lib_script')}</span>
                      <button type="button" class="btn-drawer-copy inline-copy compact-copy" id="manual-copy-script-btn" style="position: static; padding: 2px 6px; font-size: 10px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); color: #ffffff; border-radius: 4px; cursor: pointer;">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>${t('pipeline_copy_btn')}</span>
                      </button>
                    </div>
                    <pre id="manual-script-box" style="margin: 0; padding: 10px; font-family: var(--font-mono); font-size: 11.5px; color: #e1e4e8; overflow: auto; white-space: pre-wrap; word-break: break-all; max-height: 110px;"></pre>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Pane 2: Usage -->
          <div class="drawer-pane" data-pane="usage" style="display: none; flex-direction: column; gap: 16px; padding: 24px; overflow-y: auto; height: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; letter-spacing: -0.01em;">${t('lib_integration_title')}</h4>
            </div>
            
            <!-- Usage Code Display Card -->
            <div class="code-card-wrapper" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; flex-grow: 1; min-height: 380px;">
              <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 18px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); height: 42px; min-height: 42px;">
                <span style="font-family: var(--font-body); font-size: 12.5px; font-weight: 700; color: #ffffff;">${t('lib_integration_desc')}</span>
                <button class="btn-drawer-copy inline-copy" id="copy-usage-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>${t('pipeline_copy_btn')}</span>
                </button>
              </div>
              <pre class="code-container active" id="drawer-usage-box" style="flex-grow: 1; overflow-y: auto; padding: 16px; font-family: var(--font-mono); font-size: 12.5px; line-height: 1.6; margin: 0; color: #c9d1d9; white-space: pre-wrap; word-break: break-all; display: block;"></pre>
            </div>
          </div>

          <!-- Pane 3: Code (Existing content) -->
          <div class="drawer-pane" data-pane="code" style="display: none; flex-direction: column; overflow: hidden; height: 100%;">
            <!-- Code Selectors Row: Triple custom dropdown capsule filters -->
            <div class="code-selectors-row" style="padding: 16px 24px; display: flex; gap: 10px; flex-wrap: wrap;">
              <!-- Dropdown 0: Framework Selector -->
              <div class="custom-dropdown-container" id="dropdown-framework-container">
                <button class="custom-dropdown-btn" id="btn-framework-selector">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="dropdown-badge-prefix html" id="framework-badge">HTML</span>
                    <span id="framework-label" style="font-size: 13px;">HTML / JS</span>
                  </div>
                  <span class="dropdown-chevron"></span>
                </button>
                <div class="custom-dropdown-menu" id="menu-framework">
                  <button class="custom-dropdown-option selected" data-value="html">
                    <span class="dropdown-badge-prefix html">HTML</span> HTML / JS
                  </button>
                  <button class="custom-dropdown-option" data-value="react">
                    <span class="dropdown-badge-prefix react">JSX</span> React
                  </button>
                  <button class="custom-dropdown-option" data-value="vue">
                    <span class="dropdown-badge-prefix vue">VUE</span> Vue
                  </button>
                  <button class="custom-dropdown-option" data-value="svelte">
                    <span class="dropdown-badge-prefix svelte">SVT</span> Svelte
                  </button>
                  <button class="custom-dropdown-option" data-value="solid">
                    <span class="dropdown-badge-prefix solid">SLD</span> SolidJS
                  </button>
                </div>
              </div>

              <!-- Dropdown 1: Script Selector -->
              <div class="custom-dropdown-container" id="dropdown-script-container">
                <button class="custom-dropdown-btn" id="btn-script-selector">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="dropdown-badge-prefix" id="script-badge">JS</span>
                    <span id="script-label" style="font-size: 13px;">JavaScript</span>
                  </div>
                  <span class="dropdown-chevron"></span>
                </button>
                <div class="custom-dropdown-menu" id="menu-script">
                  <button class="custom-dropdown-option selected" data-value="js">
                    <span class="dropdown-badge-prefix">JS</span> JavaScript
                  </button>
                  <button class="custom-dropdown-option" data-value="ts">
                    <span class="dropdown-badge-prefix ts">TS</span> TypeScript
                  </button>
                </div>
              </div>
              
              <!-- Dropdown 2: Style Selector -->
              <div class="custom-dropdown-container" id="dropdown-style-container">
                <button class="custom-dropdown-btn" id="btn-style-selector">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="dropdown-badge-prefix css" id="style-badge">css</span>
                    <span id="style-label" style="font-size: 13px;">CSS</span>
                  </div>
                  <span class="dropdown-chevron"></span>
                </button>
                <div class="custom-dropdown-menu" id="menu-style">
                  <button class="custom-dropdown-option selected" data-value="css">
                    <span class="dropdown-badge-prefix css">css</span> CSS
                  </button>
                  <button class="custom-dropdown-option" data-value="tailwind">
                    <span class="dropdown-badge-prefix tailwind">TW</span> Tailwind
                  </button>
                  <button class="custom-dropdown-option" data-value="modules">
                    <span class="dropdown-badge-prefix modules">mod</span> CSS Modules
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Drawer Code Display Panel -->
            <div class="drawer-code-body" style="display: flex; flex-direction: column; gap: 24px; padding: 24px; overflow-y: auto; flex-grow: 1;">
              <!-- HTML Structure Card -->
              <div class="code-card-wrapper" id="drawer-html-card" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; height: 240px; min-height: 240px;">
                <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); height: 42px; min-height: 42px;">
                  <span id="title-html-card" style="font-family: var(--font-body); font-size: 13px; font-weight: 700; color: #ffffff;">${t('lib_tab_code')} (HTML)</span>
                  <button class="btn-drawer-copy inline-copy" id="copy-html-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>${t('pipeline_copy_btn')}</span>
                  </button>
                </div>
                <pre class="code-container active" id="drawer-html-box" style="flex-grow: 1; overflow-y: auto; padding: 16px; font-family: var(--font-mono); font-size: 12.5px; line-height: 1.6; margin: 0; color: #c9d1d9; white-space: pre-wrap; word-break: break-all; display: block;"></pre>
              </div>

              <!-- Script Code Card -->
              <div class="code-card-wrapper" id="drawer-script-card" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; height: 240px; min-height: 240px;">
                <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); height: 42px; min-height: 42px;">
                  <span style="font-family: var(--font-body); font-size: 13px; font-weight: 700; color: #ffffff;">${t('lib_script')}</span>
                  <button class="btn-drawer-copy inline-copy" id="copy-script-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>${t('pipeline_copy_btn')}</span>
                  </button>
                </div>
                <pre class="code-container active" id="drawer-script-box" style="flex-grow: 1; overflow-y: auto; padding: 16px; font-family: var(--font-mono); font-size: 12.5px; line-height: 1.6; margin: 0; color: #c9d1d9; white-space: pre-wrap; word-break: break-all; display: block;"></pre>
              </div>
              
              <!-- Styling Code Card -->
              <div class="code-card-wrapper" id="drawer-style-card" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; height: 240px; min-height: 240px;">
                <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); height: 42px; min-height: 42px;">
                  <span id="title-style-card" style="font-family: var(--font-body); font-size: 13px; font-weight: 700; color: #ffffff;">${t('lib_style')}</span>
                  <button class="btn-drawer-copy inline-copy" id="copy-style-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>${t('pipeline_copy_btn')}</span>
                  </button>
                </div>
                <pre class="code-container active" id="drawer-style-box" style="flex-grow: 1; overflow-y: auto; padding: 16px; font-family: var(--font-mono); font-size: 12.5px; line-height: 1.6; margin: 0; color: #c9d1d9; white-space: pre-wrap; word-break: break-all; display: block;"></pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Floating Global Copy Success Toast -->
    <div class="toast-copied" id="copy-toast">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="color: var(--accent-cyan);"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${t('lib_toast_copied')}</span>
    </div>

    <!-- Dynamically Injected Component CSS Styles -->
    <style id="snippetui-dynamic-components-styles">
      ${dynamicStyles}
    </style>
  `;

  let observer = null;
  const cardCleanups = new Map();
  let activeModalCleanup = null;
  let sidebarLenis = null;
  let mainLenis = null;
  let sidebarResizeObserver = null;
  let mainResizeObserver = null;
  let searchShortcutListener = null;

  // Helper to execute component JS scoped to its container and return cleanup function
  function executeComponentJS(component, elementContainer) {
    if (!component || !component.js) return () => {};
    try {
      const localListeners = [];
      const localIntervals = [];
      const localTimeouts = [];
      const localFrames = [];

      const shadowDoc = {
        querySelector: (sel) => elementContainer.querySelector(sel),
        querySelectorAll: (sel) => elementContainer.querySelectorAll(sel),
        getElementById: (id) => elementContainer.querySelector('#' + id) || document.getElementById(id),
        getElementsByClassName: (cls) => elementContainer.getElementsByClassName(cls),
        getElementsByTagName: (tag) => elementContainer.getElementsByTagName(tag),
        createElement: (tagName) => document.createElement(tagName),
        addEventListener: (type, cb, opts) => {
          const isLocal = ['mousemove', 'mouseleave', 'mouseenter', 'click', 'mousedown', 'mouseup', 'mouseover', 'mouseout'].includes(type);
          if (isLocal) {
            elementContainer.addEventListener(type, cb, opts);
            localListeners.push({ target: elementContainer, type, cb, opts });
          } else {
            window.addEventListener(type, cb, opts);
            localListeners.push({ target: window, type, cb, opts });
          }
        },
        removeEventListener: (type, cb, opts) => {
          const isLocal = ['mousemove', 'mouseleave', 'mouseenter', 'click', 'mousedown', 'mouseup', 'mouseover', 'mouseout'].includes(type);
          if (isLocal) {
            elementContainer.removeEventListener(type, cb, opts);
          } else {
            window.removeEventListener(type, cb, opts);
          }
        }
      };

      const customSetInterval = (cb, delay) => {
        const id = setInterval(cb, delay);
        localIntervals.push(id);
        return id;
      };
      const customSetTimeout = (cb, delay) => {
        const id = setTimeout(cb, delay);
        localTimeouts.push(id);
        return id;
      };
      const customRequestAnimationFrame = (cb) => {
        const id = requestAnimationFrame(cb);
        localFrames.push(id);
        return id;
      };

      const initFn = new Function('document', 'setInterval', 'setTimeout', 'requestAnimationFrame', component.js);
      initFn(shadowDoc, customSetInterval, customSetTimeout, customRequestAnimationFrame);

      return () => {
        localListeners.forEach(({ target, type, cb, opts }) => {
          try {
            target.removeEventListener(type, cb, opts);
          } catch (e) {}
        });
        localIntervals.forEach(id => clearInterval(id));
        localTimeouts.forEach(id => clearTimeout(id));
        localFrames.forEach(id => cancelAnimationFrame(id));
      };
    } catch (err) {
      console.warn('Error executing scoped JS for component ' + component.id + ':', err);
      return () => {};
    }
  }

  // Helper to observe cards using the persistent IntersectionObserver
  function observeCards(container, components) {
    if (!observer) return;
    components.forEach(comp => {
      const card = container.querySelector(`#card-${comp.id}`);
      if (card) {
        card.setAttribute('data-comp-id', comp.id);
        observer.observe(card);
      }
    });
  }

  // Clear all observed cards and active scripts
  function clearCardCleanups() {
    if (observer) {
      observer.disconnect();
    }
    cardCleanups.forEach(cleanup => {
      if (typeof cleanup === 'function') {
        try {
          cleanup();
        } catch (e) {
          console.warn('Error during card cleanup:', e);
        }
      }
    });
    cardCleanups.clear();
  }

  // Dynamic UI updating helper with extremely high-performance DOM updates
  function updateUI(container, isLoadMore = false) {
    const grid = container.querySelector('#components-grid');
    if (!grid) return;

    const list = getFilteredComponents();

    if (!isLoadMore) {
      // Clear and render from scratch
      renderedLimit = 24;
      clearCardCleanups();

      // Set initial grid contents
      grid.innerHTML = renderGridCards();

      // Re-observe the first batch
      const itemsToObserve = list.slice(0, renderedLimit);
      observeCards(container, itemsToObserve);

      // Scroll main panel to top on search / category filter switch
      const main = container.querySelector('.library-main');
      if (main) main.scrollTop = 0;
    } else {
      // Append next batch dynamically to avoid re-rendering existing cards and layout shifts!
      const oldLimit = renderedLimit;
      renderedLimit += 24;

      const newItems = list.slice(oldLimit, renderedLimit);
      if (newItems.length === 0) return;

      // 1. Remove all existing skeleton placeholders
      grid.querySelectorAll('.card-skeleton-loading').forEach(el => el.remove());

      // 2. Build the HTML of the new cards and append them
      const newCardsHtml = newItems.map(renderSingleCardHtml).join('');
      grid.insertAdjacentHTML('beforeend', newCardsHtml);

      // 3. Re-append new skeleton placeholders if there are still more items left
      const hasMore = list.length > renderedLimit;
      if (hasMore) {
        const remainingCount = Math.min(list.length - renderedLimit, 8);
        let skeletonsHtml = '';
        for (let i = 0; i < remainingCount; i++) {
          skeletonsHtml += renderSkeletonCardHtml();
        }
        grid.insertAdjacentHTML('beforeend', skeletonsHtml);
      }

      // 4. Observe only the newly added cards
      observeCards(container, newItems);
    }

    // Recalculate Lenis scroll dimensions after content changes
    if (mainLenis) {
      requestAnimationFrame(() => {
        mainLenis.resize();
      });
    }
  }

  // Toast Trigger Helper
  function triggerToast(text = 'Copied snippet to clipboard!') {
    const toast = document.getElementById('copy-toast');
    if (toast) {
      toast.querySelector('span').textContent = text;
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 2500);
    }
  }

  // Core copy action
  function copyTextToClipboard(text, successMsg) {
    navigator.clipboard.writeText(text)
      .then(() => triggerToast(successMsg))
      .catch(err => console.error('Failed to copy: ', err));
  }

  // Modal 1 controls: Clean Full-Screen Preview Box
  function openPreviewModal(container, startFullscreen = false) {
    if (!activeDetailComponent) return;

    // Set Live Preview HTML
    const liveContainer = container.querySelector('#modal-live-container');
    liveContainer.innerHTML = activeDetailComponent.html;

    // Execute scoped JavaScript for interactive previews and store cleanup
    activeModalCleanup = executeComponentJS(activeDetailComponent, liveContainer);

    const reloadBtn = container.querySelector('#modal-btn-reload-floating');
    const demoToggle = container.querySelector('#modal-demo-toggle-container');
    const demoCheckbox = container.querySelector('#modal-demo-content-checkbox');
    const fsToggleBtn = container.querySelector('#modal-btn-fullscreen-toggle');
    const backdrop = container.querySelector('#preview-modal-backdrop');

    if (activeDetailComponent.category === 'background-animations') {
      if (reloadBtn) reloadBtn.style.display = 'none';
      if (demoToggle) demoToggle.style.display = 'flex';
      if (demoCheckbox) {
        demoCheckbox.checked = true;
        liveContainer.classList.add('show-demo-content');
      }
    } else {
      if (reloadBtn) reloadBtn.style.display = 'flex';
      if (demoToggle) demoToggle.style.display = 'none';
      liveContainer.classList.remove('show-demo-content');
    }

    // Fullscreen styling and toggle button state
    if (startFullscreen) {
      backdrop.classList.add('fullscreen');
      if (fsToggleBtn) {
        fsToggleBtn.querySelector('.icon-expand').style.display = 'none';
        fsToggleBtn.querySelector('.icon-minimize').style.display = 'block';
      }
    } else {
      backdrop.classList.remove('fullscreen');
      if (fsToggleBtn) {
        fsToggleBtn.querySelector('.icon-expand').style.display = 'block';
        fsToggleBtn.querySelector('.icon-minimize').style.display = 'none';
      }
    }

    // Open overlay backdrop
    backdrop.classList.add('active');

    // Trigger canvas resizing after open animation is complete
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 450);
  }

  function closePreviewModal(container) {
    const backdrop = container.querySelector('#preview-modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      backdrop.classList.remove('fullscreen');
    }
    
    // Clean up active modal JS logic immediately
    if (activeModalCleanup) {
      activeModalCleanup();
      activeModalCleanup = null;
    }

    // Clear live preview container
    setTimeout(() => {
      const liveContainer = container.querySelector('#modal-live-container');
      if (liveContainer) {
        liveContainer.innerHTML = '';
        liveContainer.classList.remove('show-demo-content');
      }

      activeDetailComponent = null;
    }, 400);
  }

  // Modal 2 controls: Right-Side Code Drawer Panel
  function openCodeDrawer(container) {
    if (!activeDetailComponent) return;

    // Set drawer title
    container.querySelector('#drawer-comp-name').textContent = activeDetailComponent.name;

    // Reset default active tab back to install
    container.querySelectorAll('.drawer-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === 'install') btn.classList.add('active');
      else btn.classList.remove('active');
    });
    container.querySelectorAll('.drawer-pane').forEach(pane => {
      if (pane.getAttribute('data-pane') === 'install') {
        pane.classList.add('active');
        pane.style.display = 'flex';
      } else {
        pane.classList.remove('active');
        pane.style.display = 'none';
      }
    });

    // Reset install mode back to CLI commands
    container.querySelectorAll('.install-mode-btn').forEach(btn => {
      if (btn.getAttribute('data-mode') === 'cli') btn.classList.add('active');
      else btn.classList.remove('active');
    });
    container.querySelectorAll('.install-mode-pane').forEach(pane => {
      if (pane.getAttribute('data-install-mode') === 'cli') {
        pane.style.display = 'flex';
      } else {
        pane.style.display = 'none';
      }
    });

    // Reset package manager back to pnpm
    container.querySelectorAll('.pm-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-pm') === 'pnpm') btn.classList.add('active');
      else btn.classList.remove('active');
    });
    
    // Set custom CLI installation command
    const cmdBox = container.querySelector('#cli-command-box');
    if (cmdBox) {
      cmdBox.textContent = `pnpm dlx snippetui@latest add ${activeDetailComponent.id}`;
    }

    // Load custom dynamic integration Usage template
    const usageBox = container.querySelector('#drawer-usage-box');
    if (usageBox) {
      usageBox.textContent = getComponentUsage(activeDetailComponent);
    }

    // Update active dropdown UI to match initial state
    selectedFramework = 'html';
    selectedScript = 'js';
    selectedStyle = 'css';

    // Framework selectors update
    const btnFramework = container.querySelector('#btn-framework-selector');
    const badgeFramework = container.querySelector('#framework-badge');
    const labelFramework = container.querySelector('#framework-label');
    if (badgeFramework) {
      badgeFramework.className = 'dropdown-badge-prefix html';
      badgeFramework.textContent = 'HTML';
    }
    if (labelFramework) {
      labelFramework.textContent = 'HTML / JS';
    }
    container.querySelectorAll('#menu-framework .custom-dropdown-option').forEach(opt => {
      if (opt.getAttribute('data-value') === 'html') opt.classList.add('selected');
      else opt.classList.remove('selected');
    });

    // Scripting selectors update
    const btnScript = container.querySelector('#btn-script-selector');
    const badgeScript = container.querySelector('#script-badge');
    const labelScript = container.querySelector('#script-label');
    if (badgeScript) {
      badgeScript.className = 'dropdown-badge-prefix';
      badgeScript.textContent = 'JS';
    }
    if (labelScript) {
      labelScript.textContent = 'JavaScript';
    }
    container.querySelectorAll('#menu-script .custom-dropdown-option').forEach(opt => {
      if (opt.getAttribute('data-value') === 'js') opt.classList.add('selected');
      else opt.classList.remove('selected');
    });

    // Styling selectors update
    const btnStyle = container.querySelector('#btn-style-selector');
    const badgeStyle = container.querySelector('#style-badge');
    const labelStyle = container.querySelector('#style-label');
    if (badgeStyle) {
      badgeStyle.className = 'dropdown-badge-prefix css';
      badgeStyle.textContent = 'css';
    }
    if (labelStyle) {
      labelStyle.textContent = 'CSS';
    }
    container.querySelectorAll('#menu-style .custom-dropdown-option').forEach(opt => {
      if (opt.getAttribute('data-value') === 'css') opt.classList.add('selected');
      else opt.classList.remove('selected');
    });

    // Set manual installation boxes
    const manualHtmlBox = container.querySelector('#manual-html-box');
    if (manualHtmlBox) {
      manualHtmlBox.textContent = activeDetailComponent.html;
    }

    selectedManualScript = 'js';
    selectedManualStyle = 'css';
    
    // Reset manual style toggles UI
    container.querySelectorAll('.manual-style-btn').forEach(btn => {
      if (btn.getAttribute('data-manual-style') === 'css') {
        btn.classList.add('active');
        btn.style.color = '#ffffff';
        btn.style.background = 'rgba(255, 255, 255, 0.08)';
      } else {
        btn.classList.remove('active');
        btn.style.color = 'var(--text-secondary)';
        btn.style.background = 'none';
      }
    });

    // Reset manual script toggles UI
    container.querySelectorAll('.manual-script-btn').forEach(btn => {
      if (btn.getAttribute('data-manual-script') === 'js') {
        btn.classList.add('active');
        btn.style.color = '#ffffff';
        btn.style.background = 'rgba(255, 255, 255, 0.08)';
      } else {
        btn.classList.remove('active');
        btn.style.color = 'var(--text-secondary)';
        btn.style.background = 'none';
      }
    });

    updateManualCodeBoxes(container);

    // Set code blocks escaped contents
    updateCodeBoxes(container);

    // Open drawer backdrop animation
    const backdrop = container.querySelector('#code-drawer-backdrop');
    backdrop.classList.add('active');
  }

  function updateCodeBoxes(container) {
    if (!activeDetailComponent) return;
    
    const htmlCard = container.querySelector('#drawer-html-card');
    const scriptCard = container.querySelector('#drawer-script-card');
    const styleCard = container.querySelector('#drawer-style-card');

    const htmlBox = container.querySelector('#drawer-html-box');
    const scriptBox = container.querySelector('#drawer-script-box');
    const styleBox = container.querySelector('#drawer-style-box');

    const titleHtml = container.querySelector('#title-html-card');
    const titleStyle = container.querySelector('#title-style-card');

    const compiled = compileComponent(activeDetailComponent, selectedFramework, selectedScript, selectedStyle);

    // Setup toggling and label mappings based on selected framework
    if (selectedFramework === 'html') {
      if (htmlCard) htmlCard.style.display = 'flex';
      if (scriptCard) scriptCard.style.display = 'flex';
      if (styleCard) styleCard.style.display = 'flex';

      if (titleHtml) titleHtml.textContent = t('lib_drawer_html_title');
      if (titleStyle) titleStyle.textContent = t('lib_drawer_style_title');

      if (htmlBox) htmlBox.textContent = compiled.markup;
      if (scriptBox) scriptBox.textContent = compiled.script;
      if (styleBox) styleBox.textContent = compiled.style;
    } else if (selectedFramework === 'react' || selectedFramework === 'solid') {
      if (htmlCard) htmlCard.style.display = 'flex';
      if (scriptCard) scriptCard.style.display = 'none';
      if (styleCard) styleCard.style.display = 'flex';

      const fileExt = selectedScript === 'ts' ? 'tsx' : 'jsx';
      const frameworkName = selectedFramework === 'react' ? 'React' : 'SolidJS';
      const componentLabel = t('lib_drawer_component_label');
      if (titleHtml) titleHtml.textContent = `${frameworkName} ${componentLabel} (${fileExt})`;
      if (titleStyle) {
        titleStyle.textContent = selectedStyle === 'modules' ? `${activeDetailComponent.id}.module.css` : t('lib_drawer_style_title');
      }

      if (htmlBox) htmlBox.textContent = compiled.markup;
      if (styleBox) styleBox.textContent = compiled.style;
    } else if (selectedFramework === 'vue' || selectedFramework === 'svelte') {
      if (htmlCard) htmlCard.style.display = 'flex';
      if (scriptCard) scriptCard.style.display = 'none';
      if (styleCard) styleCard.style.display = 'none';

      const fileExt = selectedFramework;
      const frameworkName = selectedFramework === 'vue' ? 'Vue 3' : 'Svelte';
      const componentLabel = t('lib_drawer_component_label');
      if (titleHtml) titleHtml.textContent = `${frameworkName} ${componentLabel} (.${fileExt})`;

      if (htmlBox) htmlBox.textContent = compiled.markup;
    }
  }

  function updateManualCodeBoxes(container) {
    if (!activeDetailComponent) return;
    
    const manualStyleBox = container.querySelector('#manual-style-box');
    const manualScriptBox = container.querySelector('#manual-script-box');
    const styleTitle = container.querySelector('#manual-style-title');
    const scriptTitle = container.querySelector('#manual-script-title');

    if (manualStyleBox) {
      if (selectedManualStyle === 'css') {
        manualStyleBox.textContent = activeDetailComponent.css;
        if (styleTitle) styleTitle.textContent = 'CSS Styles';
      } else {
        manualStyleBox.textContent = activeDetailComponent.tailwind;
        if (styleTitle) styleTitle.textContent = 'Tailwind CSS config / class';
      }
    }

    if (manualScriptBox) {
      if (selectedManualScript === 'js') {
        manualScriptBox.textContent = activeDetailComponent.js;
        if (scriptTitle) scriptTitle.textContent = 'JavaScript';
      } else {
        manualScriptBox.textContent = activeDetailComponent.ts;
        if (scriptTitle) scriptTitle.textContent = 'TypeScript';
      }
    }
  }

  function closeCodeDrawer(container) {
    const backdrop = container.querySelector('#code-drawer-backdrop');
    if (backdrop) backdrop.classList.remove('active');
    activeDetailComponent = null;

    // Close any open dropdown menus
    container.querySelector('#btn-framework-selector')?.classList.remove('active');
    container.querySelector('#menu-framework')?.classList.remove('active');
    container.querySelector('#btn-script-selector')?.classList.remove('active');
    container.querySelector('#menu-script')?.classList.remove('active');
    container.querySelector('#btn-style-selector')?.classList.remove('active');
    container.querySelector('#menu-style')?.classList.remove('active');
  }

  return {
    html: htmlContent,
    init: (container) => {
      // Bind language select dropdown event changes
      const libLangSelect = container.querySelector('#library-lang-select');
      if (libLangSelect) {
        libLangSelect.value = getCurrentLanguage();
        libLangSelect.addEventListener('change', (e) => {
          setLanguage(e.target.value);
        });
      }

      // Initialize Lenis smooth scroll for library panels (desktop only for performance)
      if (window.innerWidth > 768) {
        const sidebar = container.querySelector('.library-sidebar');
        const main = container.querySelector('.library-main');
        if (sidebar) {
          sidebarLenis = new Lenis({
            wrapper: sidebar,
            autoRaf: true,
            lerp: 0.1,
            duration: 1.2
          });
          
          sidebarResizeObserver = new ResizeObserver(() => {
            if (sidebarLenis) sidebarLenis.resize();
          });
          sidebarResizeObserver.observe(sidebar);
        }
        if (main) {
          mainLenis = new Lenis({
            wrapper: main,
            autoRaf: true,
            lerp: 0.1,
            duration: 1.2
          });
          
          mainResizeObserver = new ResizeObserver(() => {
            if (mainLenis) mainLenis.resize();
          });
          mainResizeObserver.observe(main);
          const grid = container.querySelector('#components-grid');
          if (grid) {
            mainResizeObserver.observe(grid);
          }
        }
      }

      // 0. Bind Logo and Header return navigation
      container.querySelector('#library-brand-logo')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('landing');
      });
      container.querySelector('#header-btn-back')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('landing');
      });

      // Set up high-performance click event delegation on components grid
      const grid = container.querySelector('#components-grid');
      if (grid) {
        grid.addEventListener('click', (e) => {
          // A. Copy Prompt Action
          const btnCopyPrompt = e.target.closest('.btn-copy-prompt');
          if (btnCopyPrompt) {
            e.stopPropagation();
            const id = btnCopyPrompt.getAttribute('data-id');
            const comp = COMPONENTS_DATABASE.find(c => c.id === id);
            if (comp) {
              copyTextToClipboard(comp.prompt, `Copied ${comp.name} AI Prompt successfully!`);
            }
            return;
          }

          // B. View Code: slide out right-side drawer panel
          const btnViewCode = e.target.closest('.btn-view-code');
          if (btnViewCode) {
            e.stopPropagation();
            const id = btnViewCode.getAttribute('data-id');
            const comp = COMPONENTS_DATABASE.find(c => c.id === id);
            if (comp) {
              activeDetailComponent = comp;
              openCodeDrawer(container);
            }
            return;
          }

          // C. Open Preview Modal (centered 900x600 window) on expand button click
          const btnFullscreen = e.target.closest('.btn-card-fullscreen');
          if (btnFullscreen) {
            e.stopPropagation();
            const id = btnFullscreen.getAttribute('data-id');
            const comp = COMPONENTS_DATABASE.find(c => c.id === id);
            if (comp) {
              activeDetailComponent = comp;
              openPreviewModal(container, false);
            }
            return;
          }
        });
      }

      // Initialize persistent observer for component execution
      const mainContainer = container.querySelector('.library-main');
      if (mainContainer) {
        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const cardEl = entry.target;
            const compId = cardEl.getAttribute('data-comp-id');
            const comp = COMPONENTS_DATABASE.find(c => c.id === compId);
            if (!comp) return;

            if (entry.isIntersecting) {
              if (cardCleanups.has(compId)) return;
              const preview = cardEl.querySelector('.component-preview');
              if (preview) {
                const cleanup = executeComponentJS(comp, preview);
                cardCleanups.set(compId, cleanup);
              }
            } else {
              const cleanup = cardCleanups.get(compId);
              if (cleanup) {
                cleanup();
                cardCleanups.delete(compId);
              }
            }
          });
        }, {
          root: mainContainer,
          rootMargin: '200px',
          threshold: 0.01
        });
      }

      // Observe initial set of cards
      const list = getFilteredComponents();
      const initialItems = list.slice(0, renderedLimit);
      observeCards(container, initialItems);

      // Setup Infinite Scroll Sentinel Observer
      const sentinel = container.querySelector('#library-sentinel');
      if (sentinel) {
        loadMoreObserver = new IntersectionObserver((entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            const list = getFilteredComponents();
            if (renderedLimit < list.length) {
              updateUI(container, true);
            }
          }
        }, {
          root: mainContainer,
          rootMargin: '200px'
        });
        loadMoreObserver.observe(sentinel);
      }



      // 2. Search Input Listener & Keyboard Shortcut
      const searchInp = container.querySelector('#search-snippets');
      searchInp?.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        updateUI(container);
      });

      // Global search shortcut listener
      searchShortcutListener = (e) => {
        const isK = e.key === 'k' || e.key === 'K';
        const isModifier = e.ctrlKey || e.metaKey;
        if (isK && isModifier) {
          e.preventDefault();
          if (searchInp) {
            searchInp.focus();
            searchInp.select();
          }
        }
      };
      window.addEventListener('keydown', searchShortcutListener);

      // 3. Category Buttons Filter listeners
      const catList = container.querySelector('#sidebar-categories');
      const mobileSidebar = container.querySelector('.library-sidebar');
      catList?.addEventListener('click', (e) => {
        const btn = e.target.closest('.category-btn');
        if (!btn) return;
        
        activeFilter = btn.getAttribute('data-category');
        
        // Update active class in sidebar list
        catList.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Auto-close categories drawer on mobile after selection
        if (window.innerWidth <= 768) {
          mobileSidebar?.classList.remove('active');
        }
        
        updateUI(container);
      });

      // Mobile Categories Drawer Toggle Trigger
      const mobCatBtn = container.querySelector('#mobile-categories-btn');
      mobCatBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileSidebar?.classList.toggle('active');
      });

      // Click outside to close categories drawer
      clickOutsideCloseCategories = (e) => {
        if (mobileSidebar && mobileSidebar.classList.contains('active')) {
          if (!mobileSidebar.contains(e.target) && e.target !== mobCatBtn && !mobCatBtn?.contains(e.target)) {
            mobileSidebar.classList.remove('active');
          }
        }
      };
      document.addEventListener('click', clickOutsideCloseCategories);

      // 4. Close Preview Modal hooks
      container.querySelector('#modal-close-btn')?.addEventListener('click', () => closePreviewModal(container));
      
      const modalBackdrop = container.querySelector('#preview-modal-backdrop');
      modalBackdrop?.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closePreviewModal(container);
      });

      // 5. Floating Reload Button listener inside preview modal box
      container.querySelector('#modal-btn-reload-floating')?.addEventListener('click', () => {
        if (!activeDetailComponent) return;
        if (activeModalCleanup) {
          activeModalCleanup();
          activeModalCleanup = null;
        }
        const liveContainer = container.querySelector('#modal-live-container');
        liveContainer.innerHTML = '';
        setTimeout(() => {
          liveContainer.innerHTML = activeDetailComponent.html;
          activeModalCleanup = executeComponentJS(activeDetailComponent, liveContainer);
          triggerToast('Component reloaded!');
        }, 100);
      });

      // 5.3. Floating Fullscreen Toggle Button listener inside preview modal box
      container.querySelector('#modal-btn-fullscreen-toggle')?.addEventListener('click', () => {
        const backdrop = container.querySelector('#preview-modal-backdrop');
        const fsToggleBtn = container.querySelector('#modal-btn-fullscreen-toggle');
        if (backdrop) {
          const isFullscreen = backdrop.classList.toggle('fullscreen');
          if (fsToggleBtn) {
            const expIcon = fsToggleBtn.querySelector('.icon-expand');
            const minIcon = fsToggleBtn.querySelector('.icon-minimize');
            if (isFullscreen) {
              if (expIcon) expIcon.style.display = 'none';
              if (minIcon) minIcon.style.display = 'block';
            } else {
              if (expIcon) expIcon.style.display = 'block';
              if (minIcon) minIcon.style.display = 'none';
            }
          }
          // Dispatch window resize event immediately and after transition completes
          window.dispatchEvent(new Event('resize'));
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 450);
        }
      });

      // 5.5. Demo Content checkbox change listener
      container.querySelector('#modal-demo-content-checkbox')?.addEventListener('change', (e) => {
        const liveContainer = container.querySelector('#modal-live-container');
        if (liveContainer) {
          if (e.target.checked) {
            liveContainer.classList.add('show-demo-content');
          } else {
            liveContainer.classList.remove('show-demo-content');
          }
        }
      });


      // 6. Custom Dropdown Selectors Click Toggles
      const btnFramework = container.querySelector('#btn-framework-selector');
      const menuFramework = container.querySelector('#menu-framework');
      const btnScript = container.querySelector('#btn-script-selector');
      const menuScript = container.querySelector('#menu-script');
      const btnStyle = container.querySelector('#btn-style-selector');
      const menuStyle = container.querySelector('#menu-style');

      btnFramework?.addEventListener('click', (e) => {
        e.stopPropagation();
        btnFramework.classList.toggle('active');
        menuFramework.classList.toggle('active');
        
        // Close other dropdowns
        btnScript?.classList.remove('active');
        menuScript?.classList.remove('active');
        btnStyle?.classList.remove('active');
        menuStyle?.classList.remove('active');
      });

      btnScript?.addEventListener('click', (e) => {
        e.stopPropagation();
        btnScript.classList.toggle('active');
        menuScript.classList.toggle('active');
        
        // Close other dropdowns
        btnFramework?.classList.remove('active');
        menuFramework?.classList.remove('active');
        btnStyle?.classList.remove('active');
        menuStyle?.classList.remove('active');
      });

      btnStyle?.addEventListener('click', (e) => {
        e.stopPropagation();
        btnStyle.classList.toggle('active');
        menuStyle.classList.toggle('active');
        
        // Close other dropdowns
        btnFramework?.classList.remove('active');
        menuFramework?.classList.remove('active');
        btnScript?.classList.remove('active');
        menuScript?.classList.remove('active');
      });

      // Close dropdowns on outside clicks
      document.addEventListener('click', () => {
        btnFramework?.classList.remove('active');
        menuFramework?.classList.remove('active');
        btnScript?.classList.remove('active');
        menuScript?.classList.remove('active');
        btnStyle?.classList.remove('active');
        menuStyle?.classList.remove('active');
      });

      // 7. Dropdown Option Selections Click Actions
      // 0. Framework options select
      container.querySelectorAll('#menu-framework .custom-dropdown-option').forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = option.getAttribute('data-value');
          selectedFramework = val;

          // Update active option class UI
          container.querySelectorAll('#menu-framework .custom-dropdown-option').forEach(o => o.classList.remove('selected'));
          option.classList.add('selected');

          // Update main button badge & text
          const badge = container.querySelector('#framework-badge');
          const label = container.querySelector('#framework-label');
          if (badge) {
            badge.className = `dropdown-badge-prefix ${val}`;
            badge.textContent = val === 'html' ? 'HTML' : val === 'react' ? 'JSX' : val === 'vue' ? 'VUE' : val === 'svelte' ? 'SVT' : 'SLD';
          }
          if (label) {
            label.textContent = val === 'html' ? 'HTML / JS' : val === 'react' ? 'React' : val === 'vue' ? 'Vue' : val === 'svelte' ? 'Svelte' : 'SolidJS';
          }

          // Close menu & update boxes
          btnFramework.classList.remove('active');
          menuFramework.classList.remove('active');
          updateCodeBoxes(container);
          
          let displayVal = val === 'html' ? 'HTML / Vanilla JS' : val === 'react' ? 'React (JSX)' : val === 'vue' ? 'Vue 3' : val === 'svelte' ? 'Svelte' : 'SolidJS';
          triggerToast(`Switched Framework to ${displayVal}!`);
        });
      });

      // A. Scripting options select
      container.querySelectorAll('#menu-script .custom-dropdown-option').forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = option.getAttribute('data-value');
          selectedScript = val;

          // Update active option class UI
          container.querySelectorAll('#menu-script .custom-dropdown-option').forEach(o => o.classList.remove('selected'));
          option.classList.add('selected');

          // Update main button badge & text
          const badge = container.querySelector('#script-badge');
          const label = container.querySelector('#script-label');
          if (val === 'js') {
            badge.className = 'dropdown-badge-prefix';
            badge.textContent = 'JS';
            label.textContent = 'JavaScript';
          } else {
            badge.className = 'dropdown-badge-prefix ts';
            badge.textContent = 'TS';
            label.textContent = 'TypeScript';
          }

          // Close menu & update boxes
          btnScript.classList.remove('active');
          menuScript.classList.remove('active');
          updateCodeBoxes(container);
          triggerToast(`Switched Script to ${val === 'js' ? 'JavaScript' : 'TypeScript'}!`);
        });
      });

      // B. Styling options select
      container.querySelectorAll('#menu-style .custom-dropdown-option').forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = option.getAttribute('data-value');
          selectedStyle = val;

          // Update active option class UI
          container.querySelectorAll('#menu-style .custom-dropdown-option').forEach(o => o.classList.remove('selected'));
          option.classList.add('selected');

          // Update main button badge & text
          const badge = container.querySelector('#style-badge');
          const label = container.querySelector('#style-label');
          if (val === 'css') {
            badge.className = 'dropdown-badge-prefix css';
            badge.textContent = 'css';
            label.textContent = 'CSS';
          } else if (val === 'tailwind') {
            badge.className = 'dropdown-badge-prefix tailwind';
            badge.textContent = 'TW';
            label.textContent = 'Tailwind';
          } else if (val === 'modules') {
            badge.className = 'dropdown-badge-prefix modules';
            badge.textContent = 'mod';
            label.textContent = 'CSS Modules';
          }

          // Close menu & update boxes
          btnStyle.classList.remove('active');
          menuStyle.classList.remove('active');
          updateCodeBoxes(container);
          
          let displayVal = val === 'css' ? 'CSS Variables' : val === 'tailwind' ? 'Tailwind CSS' : 'CSS Modules';
          triggerToast(`Switched Style to ${displayVal}!`);
        });
      });

      // 8. Copy HTML Button action
      container.querySelector('#copy-html-btn')?.addEventListener('click', () => {
        if (!activeDetailComponent) return;
        copyTextToClipboard(activeDetailComponent.html, `Copied ${activeDetailComponent.name} HTML structure successfully!`);
      });

      // 8b. Copy Script Button action
      container.querySelector('#copy-script-btn')?.addEventListener('click', () => {
        if (!activeDetailComponent) return;
        const text = selectedScript === 'js' ? activeDetailComponent.js : activeDetailComponent.ts;
        const type = selectedScript === 'js' ? 'JavaScript' : 'TypeScript';
        copyTextToClipboard(text, `Copied ${activeDetailComponent.name} ${type} successfully!`);
      });

      // 9. Copy Style Button action
      container.querySelector('#copy-style-btn')?.addEventListener('click', () => {
        if (!activeDetailComponent) return;
        const text = selectedStyle === 'css' ? activeDetailComponent.css : activeDetailComponent.tailwind;
        const type = selectedStyle === 'css' ? 'CSS' : 'Tailwind';
        copyTextToClipboard(text, `Copied ${activeDetailComponent.name} ${type} successfully!`);
      });

      // 10. Copy CLI Install Command Button action
      container.querySelector('#copy-cli-btn')?.addEventListener('click', () => {
        const cmdBox = container.querySelector('#cli-command-box');
        if (cmdBox && activeDetailComponent) {
          copyTextToClipboard(cmdBox.textContent, `Copied CLI installation command successfully!`);
        }
      });

      // 10e. Download Zip Bundle Action
      container.querySelector('#btn-download-bundle')?.addEventListener('click', () => {
        if (!activeDetailComponent) return;
        const comp = activeDetailComponent;
        const camelName = comp.name.replace(/[^a-zA-Z0-9]/g, '');

        const files = [
          { name: `${comp.id}/${comp.id}.html`, content: compileComponent(comp, 'html', 'js', 'css').markup },
          { name: `${comp.id}/${comp.id}.css`, content: compileComponent(comp, 'html', 'js', 'css').style },
          { name: `${comp.id}/${comp.id}.js`, content: compileComponent(comp, 'html', 'js', 'css').script },
          
          { name: `${comp.id}/react/${camelName}.tsx`, content: compileComponent(comp, 'react', 'ts', 'css').markup },
          { name: `${comp.id}/react/${camelName}.jsx`, content: compileComponent(comp, 'react', 'js', 'css').markup },
          { name: `${comp.id}/react/${comp.id}.css`, content: compileComponent(comp, 'react', 'ts', 'css').style },
          
          { name: `${comp.id}/vue/${camelName}.vue`, content: compileComponent(comp, 'vue', 'js', 'css').markup },
          { name: `${comp.id}/svelte/${camelName}.svelte`, content: compileComponent(comp, 'svelte', 'js', 'css').markup },
          { name: `${comp.id}/solid/${camelName}.tsx`, content: compileComponent(comp, 'solid', 'ts', 'css').markup },
          
          {
            name: `${comp.id}/README.md`,
            content: `# SnippetUI Component: ${comp.name}\n\nThank you for downloading this premium component from SnippetUI!\n\n## Structure of the Bundle\n\n- \`/${comp.id}.html\`, \`/${comp.id}.css\`, \`/${comp.id}.js\`: Clean Vanilla HTML5, CSS Variables, and scoped JavaScript.\n- \`/react/${camelName}.tsx\`: TypeScript React component wrapper.\n- \`/react/${camelName}.jsx\`: JavaScript React component wrapper.\n- \`/vue/${camelName}.vue\`: Vue 3 Single File Component (SFC) with Script Setup.\n- \`/svelte/${camelName}.svelte\`: Svelte component wrapping.\n- \`/solid/${camelName}.tsx\`: SolidJS component wrapping.\n\n## Usage Guide\n\n1. Choose your preferred framework folder.\n2. Integrate the code blocks into your project workspace.\n3. Keep styling variables synchronized in your global tokens sheet.\n\n---\nBuilt with love by SnippetUI (https://github.com/NavishKumar1/Snippetui)\n`
          }
        ];

        try {
          const zipBlob = generateZip(files);
          const link = document.createElement('a');
          link.href = URL.createObjectURL(zipBlob);
          link.download = `snippetui-${comp.id}-bundle.zip`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          triggerToast(`Downloaded ${comp.name} ZIP bundle!`);
        } catch (err) {
          console.error('ZIP generation failed: ', err);
          triggerToast('Error: Failed to compile ZIP bundle.');
        }
      });

      // 10b. Copy Manual HTML Button action
      container.querySelector('#manual-copy-html-btn')?.addEventListener('click', () => {
        if (!activeDetailComponent) return;
        copyTextToClipboard(activeDetailComponent.html, `Copied manual HTML structure successfully!`);
      });

      // 10c. Copy Manual Style Button action
      container.querySelector('#manual-copy-style-btn')?.addEventListener('click', () => {
        if (!activeDetailComponent) return;
        const text = selectedManualStyle === 'css' ? activeDetailComponent.css : activeDetailComponent.tailwind;
        const type = selectedManualStyle === 'css' ? 'CSS' : 'Tailwind';
        copyTextToClipboard(text, `Copied manual ${type} styles successfully!`);
      });

      // 10d. Copy Manual Script Button action
      container.querySelector('#manual-copy-script-btn')?.addEventListener('click', () => {
        if (!activeDetailComponent) return;
        const text = selectedManualScript === 'js' ? activeDetailComponent.js : activeDetailComponent.ts;
        const type = selectedManualScript === 'js' ? 'JavaScript' : 'TypeScript';
        copyTextToClipboard(text, `Copied manual ${type} script successfully!`);
      });

      // 10e. Manual style sub-toggles click listeners
      container.querySelectorAll('.manual-style-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = btn.getAttribute('data-manual-style');
          selectedManualStyle = val;
          
          container.querySelectorAll('.manual-style-btn').forEach(b => {
            if (b === btn) {
              b.classList.add('active');
              b.style.color = '#ffffff';
              b.style.background = 'rgba(255, 255, 255, 0.08)';
            } else {
              b.classList.remove('active');
              b.style.color = 'var(--text-secondary)';
              b.style.background = 'none';
            }
          });
          
          updateManualCodeBoxes(container);
          triggerToast(`Switched manual styling to ${val === 'css' ? 'CSS' : 'Tailwind'}!`);
        });
      });

      // 10f. Manual script sub-toggles click listeners
      container.querySelectorAll('.manual-script-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = btn.getAttribute('data-manual-script');
          selectedManualScript = val;
          
          container.querySelectorAll('.manual-script-btn').forEach(b => {
            if (b === btn) {
              b.classList.add('active');
              b.style.color = '#ffffff';
              b.style.background = 'rgba(255, 255, 255, 0.08)';
            } else {
              b.classList.remove('active');
              b.style.color = 'var(--text-secondary)';
              b.style.background = 'none';
            }
          });
          
          updateManualCodeBoxes(container);
          triggerToast(`Switched manual script to ${val === 'js' ? 'JavaScript' : 'TypeScript'}!`);
        });
      });

      // 11. Copy Component Integration Usage action
      container.querySelector('#copy-usage-btn')?.addEventListener('click', () => {
        if (!activeDetailComponent) return;
        const usageBox = container.querySelector('#drawer-usage-box');
        if (usageBox) {
          copyTextToClipboard(usageBox.textContent, `Copied ${activeDetailComponent.name} Integration Template successfully!`);
        }
      });

      // 12. Drawer Tab switching click events
      container.querySelectorAll('.drawer-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          container.querySelectorAll('.drawer-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const tab = btn.getAttribute('data-tab');
          container.querySelectorAll('.drawer-pane').forEach(pane => {
            if (pane.getAttribute('data-pane') === tab) {
              pane.classList.add('active');
              pane.style.display = 'flex';
            } else {
              pane.classList.remove('active');
              pane.style.display = 'none';
            }
          });
        });
      });

      // 13. Install Mode Sub-Tab toggles (CLI vs Manual)
      container.querySelectorAll('.install-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          container.querySelectorAll('.install-mode-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const mode = btn.getAttribute('data-mode');
          container.querySelectorAll('.install-mode-pane').forEach(pane => {
            if (pane.getAttribute('data-install-mode') === mode) {
              pane.style.display = 'flex';
            } else {
              pane.style.display = 'none';
            }
          });
        });
      });

      // 14. Package Manager CLI Command sub-tabs (pnpm, npm, yarn, bun)
      container.querySelectorAll('.pm-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          container.querySelectorAll('.pm-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const pm = btn.getAttribute('data-pm');
          const cmdBox = container.querySelector('#cli-command-box');
          if (cmdBox && activeDetailComponent) {
            let cmd = '';
            if (pm === 'pnpm') cmd = `pnpm dlx snippetui@latest add ${activeDetailComponent.id}`;
            else if (pm === 'npm') cmd = `npx snippetui@latest add ${activeDetailComponent.id}`;
            else if (pm === 'yarn') cmd = `yarn dlx snippetui@latest add ${activeDetailComponent.id}`;
            else if (pm === 'bun') cmd = `bunx snippetui@latest add ${activeDetailComponent.id}`;

            cmdBox.textContent = cmd;
          }
        });
      });

      // 15. Close Drawer hooks
      container.querySelector('#drawer-close')?.addEventListener('click', () => closeCodeDrawer(container));
      
      const drawerBackdrop = container.querySelector('#code-drawer-backdrop');
      drawerBackdrop?.addEventListener('click', (e) => {
        if (e.target === drawerBackdrop) closeCodeDrawer(container);
      });
    },
    destroy: () => {
      if (sidebarLenis) {
        sidebarLenis.destroy();
        sidebarLenis = null;
      }
      if (mainLenis) {
        mainLenis.destroy();
        mainLenis = null;
      }
      if (sidebarResizeObserver) {
        sidebarResizeObserver.disconnect();
        sidebarResizeObserver = null;
      }
      if (mainResizeObserver) {
        mainResizeObserver.disconnect();
        mainResizeObserver = null;
      }
      clearCardCleanups();
      if (observer) {
        observer = null;
      }
      if (loadMoreObserver) {
        loadMoreObserver.disconnect();
        loadMoreObserver = null;
      }
      if (activeModalCleanup) {
        activeModalCleanup();
        activeModalCleanup = null;
      }
      if (searchShortcutListener) {
        window.removeEventListener('keydown', searchShortcutListener);
        searchShortcutListener = null;
      }
      if (clickOutsideCloseCategories) {
        document.removeEventListener('click', clickOutsideCloseCategories);
        clickOutsideCloseCategories = null;
      }
    }
  };
}
