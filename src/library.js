/**
 * SnippetUI - Component Library Page
 * Dynamically rendered from modular component files
 */

import { COMPONENTS_DATABASE } from './library/index.js';
import Lenis from 'lenis';



export function renderLibrary(onNavigate, initialFilter = 'all') {
  const rawCategories = Array.from(new Set(COMPONENTS_DATABASE.map(c => c.category)));
  let activeFilter = (initialFilter === 'all' || !initialFilter || !rawCategories.includes(initialFilter)) ? rawCategories[0] : initialFilter;
  let searchQuery = '';
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const shortcutLabel = isMac ? '⌘K' : 'Ctrl K';
  let activeDetailComponent = null;
  let clickOutsideCloseCategories = null;
  
  // Track active selections in dropdowns
  let selectedScript = 'js'; // 'js' or 'ts'
  let selectedStyle = 'css';  // 'css' or 'tailwind'

  // Track active selections in manual wizard
  let selectedManualScript = 'js';
  let selectedManualStyle = 'css';

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

  // Generate grid component cards HTML
  function renderGridCards() {
    const list = getFilteredComponents();
    if (list.length === 0) {
      return `
        <div class="empty-results" style="grid-column: span 2;">
          <div class="empty-icon">🔍</div>
          <h3>No Snippets Found</h3>
          <p>We couldn't find any component matching "${searchQuery}". Try searching another keyword!</p>
        </div>
      `;
    }

    return list.map(comp => `
      <div class="component-card" id="card-${comp.id}">
        <div class="component-preview" style="cursor: default;">
          ${comp.html}
          <button class="btn-card-fullscreen" data-id="${comp.id}" title="Open Preview">
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
              View Code
            </button>
            <button class="btn-card-action btn-copy-prompt" data-id="${comp.id}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy Prompt
            </button>
          </div>
        </div>
      </div>
    `).join('');
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
          <!-- Back to Home Button -->
          <a href="#landing" class="btn-header-back" id="header-btn-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Back to Home</span>
          </a>
          
          <!-- GitHub Repo Link -->
          <a href="https://github.com/NavishKumar1/Snippetui" target="_blank" class="github-header-link" aria-label="GitHub Repository">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px;">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span>Star</span>
          </a>
        </div>
      </div>

      <!-- Mobile Floating Categories Toggle Button -->
      <button class="mobile-categories-toggle" id="mobile-categories-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 6px;"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
        <span>Categories</span>
      </button>

      <div class="library-view" style="margin-top: 0; padding: 0;">
        <!-- Left Sidebar Filters -->
        <aside class="library-sidebar">
          <div class="search-wrapper">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" class="search-input" id="search-snippets" placeholder="Search components... (${shortcutLabel})" value="${searchQuery}" />
          </div>
          
          <div class="sidebar-section-wrapper">
            <h3 class="sidebar-section-title">Categories</h3>
            <ul class="category-list" id="sidebar-categories">
              ${renderSidebarCategories()}
            </ul>
          </div>
        </aside>

        <!-- Right Main Components Grid -->
        <main class="library-main">
          <div class="library-header">
            <div class="library-info">
              <h2>Components Library</h2>
              <p>Sleek, copy-paste CSS snippets to bring your interfaces to life.</p>
            </div>
          </div>

          <div class="component-grid" id="components-grid">
            ${renderGridCards()}
          </div>
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
        <div class="drawer-header">
          <div class="drawer-title">
            <h3 id="drawer-comp-name">Component Code</h3>
            <p style="font-size: 13px; color: var(--text-secondary);">Direct copy-paste versions ready for integration.</p>
          </div>
          <button class="drawer-close-btn" id="drawer-close" aria-label="Close panel">✕</button>
        </div>

        <!-- Sidebar / Drawer Tabs navigation -->
        <div class="drawer-tabs">
          <button class="drawer-tab-btn active" data-tab="install">Install</button>
          <button class="drawer-tab-btn" data-tab="usage">Usage</button>
          <button class="drawer-tab-btn" data-tab="code">Code</button>
        </div>

        <div class="drawer-panes-wrapper" style="flex-grow: 1; display: flex; flex-direction: column; overflow: hidden; position: relative;">
          
          <!-- Pane 1: Install -->
          <div class="drawer-pane active" data-pane="install" style="display: flex; flex-direction: column; gap: 24px; padding: 24px; overflow-y: auto; height: 100%;">
            <div class="section-container" style="display: flex; flex-direction: column; gap: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; letter-spacing: -0.01em;">Installation Commands</h4>
                
                <!-- CLI Version Indicator (Mirroring shadcn selector) -->
                <button class="custom-dropdown-btn compact" style="width: auto; height: 32px; padding: 0 10px; border-radius: 6px; font-size: 11px; pointer-events: none; border: 1px solid var(--border-color); background: rgba(255,255,255,0.02); color: var(--text-secondary); display: flex; align-items: center; gap: 6px;">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  <span>snippetui v1.0</span>
                </button>
              </div>

              <!-- Install Sub-Tabs: CLI vs Manual -->
              <div class="install-mode-toggle">
                <button class="install-mode-btn active" data-mode="cli">CLI</button>
                <button class="install-mode-btn" data-mode="manual">Manual</button>
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
                    <span>Copy</span>
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
                      <strong style="color: #ffffff; display: block; font-size: 13.5px; margin-bottom: 2px;">Copy HTML Structure</strong>
                      <span style="font-size: 12px; color: var(--text-secondary);">Add the markup structure below into your template or page:</span>
                    </div>
                  </div>
                  <div class="code-card-wrapper" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; max-height: 140px;">
                    <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 6px 12px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); min-height: 28px;">
                      <span style="font-size: 11px; color: var(--text-secondary);">HTML</span>
                      <button type="button" class="btn-drawer-copy inline-copy compact-copy" id="manual-copy-html-btn" style="position: static; padding: 2px 6px; font-size: 10px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); color: #ffffff; border-radius: 4px; cursor: pointer;">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copy</span>
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
                        <strong style="color: #ffffff; display: block; font-size: 13.5px; margin-bottom: 2px;">Copy Styles</strong>
                        <span style="font-size: 12px; color: var(--text-secondary);">Paste these stylesheet rules into your CSS file or Tailwind configuration:</span>
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
                      <span id="manual-style-title" style="font-size: 11px; color: var(--text-secondary);">CSS Styles</span>
                      <button type="button" class="btn-drawer-copy inline-copy compact-copy" id="manual-copy-style-btn" style="position: static; padding: 2px 6px; font-size: 10px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); color: #ffffff; border-radius: 4px; cursor: pointer;">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copy</span>
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
                        <strong style="color: #ffffff; display: block; font-size: 13.5px; margin-bottom: 2px;">Copy Scripting Logic</strong>
                        <span style="font-size: 12px; color: var(--text-secondary);">Initialize dynamic animations with standard JS or TypeSafe scripting:</span>
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
                      <span id="manual-script-title" style="font-size: 11px; color: var(--text-secondary);">JavaScript</span>
                      <button type="button" class="btn-drawer-copy inline-copy compact-copy" id="manual-copy-script-btn" style="position: static; padding: 2px 6px; font-size: 10px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); color: #ffffff; border-radius: 4px; cursor: pointer;">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copy</span>
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
              <h4 style="font-size: 15px; font-weight: 700; color: #ffffff; letter-spacing: -0.01em;">Integration Instructions</h4>
            </div>
            
            <!-- Usage Code Display Card -->
            <div class="code-card-wrapper" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; flex-grow: 1; min-height: 380px;">
              <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 18px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); height: 42px; min-height: 42px;">
                <span style="font-family: var(--font-body); font-size: 12.5px; font-weight: 700; color: #ffffff;">Integration Template</span>
                <button class="btn-drawer-copy inline-copy" id="copy-usage-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>Copy</span>
                </button>
              </div>
              <pre class="code-container active" id="drawer-usage-box" style="flex-grow: 1; overflow-y: auto; padding: 16px; font-family: var(--font-mono); font-size: 12.5px; line-height: 1.6; margin: 0; color: #c9d1d9; white-space: pre-wrap; word-break: break-all; display: block;"></pre>
            </div>
          </div>

          <!-- Pane 3: Code (Existing content) -->
          <div class="drawer-pane" data-pane="code" style="display: none; flex-direction: column; overflow: hidden; height: 100%;">
            <!-- Code Selectors Row: Double custom dropdown capsule filters -->
            <div class="code-selectors-row" style="padding: 16px 24px;">
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
                </div>
              </div>
            </div>
            
            <!-- Drawer Code Display Panel -->
            <div class="drawer-code-body" style="display: flex; flex-direction: column; gap: 24px; padding: 24px; overflow-y: auto; flex-grow: 1;">
              <!-- HTML Structure Card -->
              <div class="code-card-wrapper" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; height: 240px; min-height: 240px;">
                <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); height: 42px; min-height: 42px;">
                  <span style="font-family: var(--font-body); font-size: 13px; font-weight: 700; color: #ffffff;">HTML Structure Markup</span>
                  <button class="btn-drawer-copy inline-copy" id="copy-html-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>Copy</span>
                  </button>
                </div>
                <pre class="code-container active" id="drawer-html-box" style="flex-grow: 1; overflow-y: auto; padding: 16px; font-family: var(--font-mono); font-size: 12.5px; line-height: 1.6; margin: 0; color: #c9d1d9; white-space: pre-wrap; word-break: break-all; display: block;"></pre>
              </div>

              <!-- Script Code Card -->
              <div class="code-card-wrapper" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; height: 240px; min-height: 240px;">
                <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); height: 42px; min-height: 42px;">
                  <span style="font-family: var(--font-body); font-size: 13px; font-weight: 700; color: #ffffff;">Scripting Implementation</span>
                  <button class="btn-drawer-copy inline-copy" id="copy-script-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>Copy</span>
                  </button>
                </div>
                <pre class="code-container active" id="drawer-script-box" style="flex-grow: 1; overflow-y: auto; padding: 16px; font-family: var(--font-mono); font-size: 12.5px; line-height: 1.6; margin: 0; color: #c9d1d9; white-space: pre-wrap; word-break: break-all; display: block;"></pre>
              </div>
              
              <!-- Styling Code Card -->
              <div class="code-card-wrapper" style="display: flex; flex-direction: column; background: #06060a; border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden; height: 240px; min-height: 240px;">
                <div class="code-card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: rgba(0,0,0,0.3); border-bottom: 1px solid rgba(255,255,255,0.05); height: 42px; min-height: 42px;">
                  <span style="font-family: var(--font-body); font-size: 13px; font-weight: 700; color: #ffffff;">Styling Implementation</span>
                  <button class="btn-drawer-copy inline-copy" id="copy-style-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>Copy</span>
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
      <span>Copied snippet to clipboard!</span>
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

  // Helper to execute JS for all rendered components lazily when visible
  function initializeGridComponentJS(container) {
    if (observer) {
      observer.disconnect();
    }
    cardCleanups.forEach(cleanup => cleanup());
    cardCleanups.clear();

    const list = getFilteredComponents();
    const mainContainer = container.querySelector('.library-main');
    if (!mainContainer) return;

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const cardEl = entry.target;
        const compId = cardEl.getAttribute('data-comp-id');
        const comp = list.find(c => c.id === compId);
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
      rootMargin: '120px',
      threshold: 0.05
    });

    list.forEach(comp => {
      const card = container.querySelector(`#card-${comp.id}`);
      if (card) {
        card.setAttribute('data-comp-id', comp.id);
        observer.observe(card);
      }
    });
  }

  // Dynamic UI updating helper
  function updateUI(container) {
    // 1. Update Grid Cards
    const grid = container.querySelector('#components-grid');
    if (grid) grid.innerHTML = renderGridCards();
    
    // 2. Re-attach action listeners on new cards
    attachCardListeners(container);

    // 3. Initialize dynamic component script behaviors
    initializeGridComponentJS(container);

    // 4. Smoothly reset scroll position of main content library container on content change
    const main = container.querySelector('.library-main');
    if (main) main.scrollTop = 0;
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

  // Event handlers bindings for card actions
  function attachCardListeners(container) {
    // 1. Copy Prompt Action
    container.querySelectorAll('.btn-copy-prompt').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents opening the preview modal
        const id = btn.getAttribute('data-id');
        const comp = COMPONENTS_DATABASE.find(c => c.id === id);
        if (comp) {
          copyTextToClipboard(comp.prompt, `Copied ${comp.name} AI Prompt successfully!`);
        }
      });
    });

    // 2. View Code: slide out right-side drawer panel
    container.querySelectorAll('.btn-view-code').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents opening the preview modal
        const id = btn.getAttribute('data-id');
        const comp = COMPONENTS_DATABASE.find(c => c.id === id);
        if (comp) {
          activeDetailComponent = comp;
          openCodeDrawer(container);
        }
      });
    });

    // 2b. Open Preview Modal (centered 900x600 window) on expand button click
    container.querySelectorAll('.btn-card-fullscreen').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const comp = COMPONENTS_DATABASE.find(c => c.id === id);
        if (comp) {
          activeDetailComponent = comp;
          openPreviewModal(container, false); // Opens the standard centered modal
        }
      });
    });

    // 3. Click Component Card Preview: do not open modal anymore, allowing direct micro-interaction
    container.querySelectorAll('.component-preview').forEach(cardPreview => {
      cardPreview.addEventListener('click', (e) => {
        // Clicks on the preview canvas itself will not trigger the modal popup
      });
    });
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
    selectedScript = 'js';
    selectedStyle = 'css';

    // Scripting selectors update
    const btnScript = container.querySelector('#btn-script-selector');
    const badgeScript = container.querySelector('#script-badge');
    const labelScript = container.querySelector('#script-label');
    badgeScript.className = 'dropdown-badge-prefix';
    badgeScript.textContent = 'JS';
    labelScript.textContent = 'JavaScript';
    container.querySelectorAll('#menu-script .custom-dropdown-option').forEach(opt => {
      if (opt.getAttribute('data-value') === 'js') opt.classList.add('selected');
      else opt.classList.remove('selected');
    });

    // Styling selectors update
    const btnStyle = container.querySelector('#btn-style-selector');
    const badgeStyle = container.querySelector('#style-badge');
    const labelStyle = container.querySelector('#style-label');
    badgeStyle.className = 'dropdown-badge-prefix css';
    badgeStyle.textContent = 'css';
    labelStyle.textContent = 'CSS';
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
    
    const htmlBox = container.querySelector('#drawer-html-box');
    const scriptBox = container.querySelector('#drawer-script-box');
    const styleBox = container.querySelector('#drawer-style-box');

    // Resolve HTML Box content
    if (htmlBox) {
      htmlBox.textContent = activeDetailComponent.html;
    }

    // Resolve Script Box content
    if (selectedScript === 'js') {
      scriptBox.textContent = activeDetailComponent.js;
    } else {
      scriptBox.textContent = activeDetailComponent.ts;
    }

    // Resolve Style Box content
    if (selectedStyle === 'css') {
      styleBox.textContent = activeDetailComponent.css;
    } else {
      styleBox.textContent = activeDetailComponent.tailwind;
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
    container.querySelector('#btn-script-selector')?.classList.remove('active');
    container.querySelector('#menu-script')?.classList.remove('active');
    container.querySelector('#btn-style-selector')?.classList.remove('active');
    container.querySelector('#menu-style')?.classList.remove('active');
  }

  return {
    html: htmlContent,
    init: (container) => {
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
        }
        if (main) {
          mainLenis = new Lenis({
            wrapper: main,
            autoRaf: true,
            lerp: 0.1,
            duration: 1.2
          });
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

      // 1. Initial listener attachments
      attachCardListeners(container);
      initializeGridComponentJS(container);



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
      const btnScript = container.querySelector('#btn-script-selector');
      const menuScript = container.querySelector('#menu-script');
      const btnStyle = container.querySelector('#btn-style-selector');
      const menuStyle = container.querySelector('#menu-style');

      btnScript?.addEventListener('click', (e) => {
        e.stopPropagation();
        btnScript.classList.toggle('active');
        menuScript.classList.toggle('active');
        
        // Close styling dropdown
        btnStyle.classList.remove('active');
        menuStyle.classList.remove('active');
      });

      btnStyle?.addEventListener('click', (e) => {
        e.stopPropagation();
        btnStyle.classList.toggle('active');
        menuStyle.classList.toggle('active');
        
        // Close scripting dropdown
        btnScript.classList.remove('active');
        menuScript.classList.remove('active');
      });

      // Close dropdowns on outside clicks
      document.addEventListener('click', () => {
        btnScript?.classList.remove('active');
        menuScript?.classList.remove('active');
        btnStyle?.classList.remove('active');
        menuStyle?.classList.remove('active');
      });

      // 7. Dropdown Option Selections Click Actions
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
          } else {
            badge.className = 'dropdown-badge-prefix tailwind';
            badge.textContent = 'TW';
            label.textContent = 'Tailwind';
          }

          // Close menu & update boxes
          btnStyle.classList.remove('active');
          menuStyle.classList.remove('active');
          updateCodeBoxes(container);
          triggerToast(`Switched Style to ${val === 'css' ? 'CSS Variables' : 'Tailwind CSS'}!`);
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
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      cardCleanups.forEach(cleanup => cleanup());
      cardCleanups.clear();
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
