/**
 * SnippetUI - VS Code Extension Showcase Page
 * Design-focused promotional and instruction page for the extension
 */
import { t } from './i18n.js';

export function renderExtensionShowcase(onNavigate) {
  const htmlContent = `
    <div class="extension-showcase-container">
      
      <!-- Back Button -->
      <button class="btn-back-home animate-fade-in" id="btn-back-landing" aria-label="Back to Home">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 8px;">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        ${t('lib_back_home')}
      </button>
      
      <!-- Ambient Grid Background -->
      <div class="showcase-grid-bg"></div>

      <!-- Hero Section -->
      <section class="showcase-hero">
        <div class="tech-badge animate-fade-in">${t('ext_badge')}</div>
        <h1 class="showcase-title">${t('ext_showcase_title')}</h1>
        <p class="showcase-subtitle">
          ${t('ext_showcase_subtitle')}
        </p>

        <!-- Coming Soon Status Badge -->
        <div class="marketplace-coming-soon-wrapper">
          <div class="marketplace-coming-soon-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="badge-icon">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>${t('ext_showcase_coming_soon')}</span>
          </div>
        </div>
      </section>

      <!-- Interactive VS Code Mockup Panel -->
      <section class="showcase-mockup-section">
        <div class="vscode-window-mock">
          <!-- Window Header Controls -->
          <div class="vscode-titlebar">
            <div class="window-controls">
              <span class="dot-control dot-close"></span>
              <span class="dot-control dot-minimize"></span>
              <span class="dot-control dot-maximize"></span>
            </div>
            <div class="titlebar-filename">${t('ext_showcase_sandbox_title')}</div>
            <div class="titlebar-placeholder"></div>
          </div>

          <!-- Window Layout Area -->
          <div class="vscode-workspace">
            <!-- Left Sidebar (SnippetUI Explorer Webview Panel) -->
            <aside class="mock-vscode-sidebar">
              <div class="sidebar-header">
                <h3>${t('ext_showcase_explorer_title')}</h3>
                <span class="sidebar-badge">v1.0.0</span>
              </div>
              <ul class="mock-sidebar-categories">
                <li class="cat-header">${t('cat_text')}</li>
                <li class="sidebar-item active">
                  <span class="item-icon">⚡</span>
                  <span>neon-glow-text</span>
                </li>
                <li class="sidebar-item">
                  <span class="item-icon">⚡</span>
                  <span>isometric-3d-tilt</span>
                </li>
                <li class="sidebar-item">
                  <span class="item-icon">⚡</span>
                  <span>typing-terminal</span>
                </li>
                <li class="cat-header">${t('cat_buttons')}</li>
                <li class="sidebar-item">
                  <span class="item-icon">⚙️</span>
                  <span>magnetic-gravity</span>
                </li>
                <li class="sidebar-item">
                  <span class="item-icon">⚙️</span>
                  <span>obsidian-reflection</span>
                </li>
              </ul>
            </aside>

            <!-- Main Workspace Editor / Sandbox -->
            <main class="mock-vscode-editor">
              <div class="editor-tabs">
                <div class="tab-item">index.html</div>
                <div class="tab-item">style.css</div>
                <div class="tab-item active">${t('ext_showcase_sandbox_title')}</div>
              </div>
              <div class="editor-container">
                <div class="sandbox-split-left">
                  <div class="editor-header-label">${t('ext_showcase_html_markup')}</div>
                  <pre class="code-editor-block"><code class="language-html"><span class="tag">&lt;div</span> <span class="attr">class</span>=<span class="val">"neon-glow-card"</span><span class="tag">&gt;</span>
  <span class="tag">&lt;h1</span> <span class="attr">class</span>=<span class="val">"glow-text"</span><span class="tag">&gt;</span>SnippetUI<span class="tag">&lt;/h1&gt;</span>
<span class="tag">&lt;/div&gt;</span></code></pre>
                  
                  <div class="editor-header-label" style="margin-top: 16px;">${t('ext_showcase_css_vars')}</div>
                  <pre class="code-editor-block"><code class="language-css"><span class="selector">:root</span> {
  <span class="property">--glow-color</span>: <span class="val">#00f2fe</span>;
  <span class="property">--card-blur</span>: <span class="val">20px</span>;
}</code></pre>
                  
                  <button class="btn-mock-inject" id="btn-mock-inject-trigger">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 6px;">
                      <polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    ${t('ext_showcase_inject_btn')}
                  </button>
                </div>
                
                <div class="sandbox-split-right">
                  <div class="editor-header-label">${t('play_preview')}</div>
                  <div class="mock-preview-viewport">
                    <div class="mock-preview-glowing-circle">
                      <span class="mock-preview-text">SnippetUI</span>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <!-- How to Use: 4 Step Premium Process -->
      <section class="showcase-steps-section">
        <div class="section-header">
          <h2 class="steps-title">${t('ext_showcase_steps_title')}</h2>
          <p class="steps-subtitle">${t('ext_showcase_steps_subtitle')}</p>
        </div>

        <div class="steps-grid">
          <!-- Step 1 -->
          <div class="step-card">
            <div class="step-num">01</div>
            <h3 class="step-card-title">${t('ext_showcase_step1_title')}</h3>
            <p class="step-card-desc">
              ${t('ext_showcase_step1_desc')}
            </p>
          </div>

          <!-- Step 2 -->
          <div class="step-card">
            <div class="step-num">02</div>
            <h3 class="step-card-title">${t('ext_showcase_step2_title')}</h3>
            <p class="step-card-desc">
              ${t('ext_showcase_step2_desc')}
            </p>
          </div>

          <!-- Step 3 -->
          <div class="step-card">
            <div class="step-num">03</div>
            <h3 class="step-card-title">${t('ext_showcase_step3_title')}</h3>
            <p class="step-card-desc">
              ${t('ext_showcase_step3_desc')}
            </p>
          </div>

          <!-- Step 4 -->
          <div class="step-card">
            <div class="step-num">04</div>
            <h3 class="step-card-title">${t('ext_showcase_step4_title')}</h3>
            <p class="step-card-desc">
              ${t('ext_showcase_step4_desc')}
            </p>
          </div>
        </div>
      </section>

      <!-- Bento Capabilities Box Grid -->
      <section class="showcase-bento-section">
        <div class="section-header">
          <h2 class="steps-title">${t('ext_showcase_bento_title')}</h2>
          <p class="steps-subtitle">${t('ext_showcase_bento_subtitle')}</p>
        </div>

        <div class="bento-grid">
          <!-- Bento Item 1: Copilot Integration -->
          <div class="bento-card bento-wide">
            <div class="bento-card-content">
              <div class="bento-badge">${t('ext_showcase_bento1_badge')}</div>
              <h3>${t('ext_showcase_bento1_title')}</h3>
              <p>
                ${t('ext_showcase_bento1_desc')}
              </p>
            </div>
            <div class="bento-card-visual mock-chat-box">
              <div class="chat-message user">@snippetui generate neon glow load loader</div>
              <div class="chat-message bot">
                <span>I found the <strong>neon-glow-loader</strong> component:</span>
                <pre class="mock-chat-pre"><code>&lt;div class="neon-glow-loader"&gt;&lt;/div&gt;</code></pre>
              </div>
            </div>
          </div>

          <!-- Bento Item 2: Figma Integration -->
          <div class="bento-card">
            <div class="bento-card-content">
              <div class="bento-badge">${t('ext_showcase_bento2_badge')}</div>
              <h3>${t('ext_showcase_bento2_title')}</h3>
              <p>
                ${t('ext_showcase_bento2_desc')}
              </p>
            </div>
            <div class="bento-card-visual mock-figma-badge">
              <div class="figma-sync-indicator">
                <span class="sync-dot pulsing"></span>
                <span>Figma Connected</span>
              </div>
            </div>
          </div>

          <!-- Bento Item 3: Local Caching -->
          <div class="bento-card">
            <div class="bento-card-content">
              <div class="bento-badge">${t('ext_showcase_bento3_badge')}</div>
              <h3>${t('ext_showcase_bento3_title')}</h3>
              <p>
                ${t('ext_showcase_bento3_desc')}
              </p>
            </div>
            <div class="bento-card-visual mock-cache-ring">
              <div class="cache-badge-icon">${t('ext_showcase_offline')}</div>
            </div>
          </div>

          <!-- Bento Item 4: Global Framework Compilation -->
          <div class="bento-card bento-wide">
            <div class="bento-card-content">
              <div class="bento-badge">${t('ext_showcase_bento4_badge')}</div>
              <h3>${t('ext_showcase_bento4_title')}</h3>
              <p>
                ${t('ext_showcase_bento4_desc')}
              </p>
            </div>
            <div class="bento-card-visual mock-frameworks-row">
              <span class="framework-icon react">React</span>
              <span class="framework-icon vue">Vue</span>
              <span class="framework-icon tailwind">Tailwind</span>
              <span class="framework-icon css">Vanilla</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom Call to Action Section -->
      <section class="showcase-footer-cta">
        <h2 class="showcase-cta-title">${t('ext_showcase_footer_title')}</h2>
        <p class="showcase-cta-subtitle">
          ${t('ext_showcase_footer_subtitle')}
        </p>
        <div class="showcase-footer-buttons">
          <button class="btn-showcase-primary large" id="btn-showcase-to-library">
            ${t('ext_showcase_browse_btn')}
          </button>
          <div class="marketplace-coming-soon-badge secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 8px;">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>${t('ext_showcase_coming_soon_marketplace')}</span>
          </div>
        </div>
      </section>

    </div>
  `;

  return {
    html: htmlContent,
    init: (appContainer) => {
      // 1. Setup Back Button Navigation
      const backBtn = appContainer.querySelector('#btn-back-landing');
      backBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('landing');
      });

      // 2. Setup button bindings to library page
      const toLibraryBtn = appContainer.querySelector('#btn-showcase-to-library');
      toLibraryBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
      });

      // 3. Mock visual sandbox interactions (e.g. simulate preview inject flash effect)
      const injectTrigger = appContainer.querySelector('#btn-mock-inject-trigger');
      const previewText = appContainer.querySelector('.mock-preview-text');
      
      injectTrigger?.addEventListener('click', () => {
        if (previewText) {
          previewText.style.transition = 'none';
          previewText.style.color = '#00f2fe';
          previewText.style.textShadow = '0 0 20px #00f2fe';
          
          setTimeout(() => {
            previewText.style.transition = 'color 1s ease, text-shadow 1s ease';
            previewText.style.color = '#ffffff';
            previewText.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
          }, 150);
        }
      });
    }
  };
}
