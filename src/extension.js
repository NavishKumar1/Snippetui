/**
 * SnippetUI - VS Code Extension Showcase Page
 * Design-focused promotional and instruction page for the extension
 */

export function renderExtensionShowcase(onNavigate) {
  const htmlContent = `
    <div class="extension-showcase-container">
      
      <!-- Back Button -->
      <button class="btn-back-home animate-fade-in" id="btn-back-landing" aria-label="Back to Home">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 8px;">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </button>
      
      <!-- Ambient Grid Background -->
      <div class="showcase-grid-bg"></div>

      <!-- Hero Section -->
      <section class="showcase-hero">
        <div class="tech-badge animate-fade-in">VS Code Extension</div>
        <h1 class="showcase-title">Access Snippets Instantly<br/>Directly Inside Your Editor</h1>
        <p class="showcase-subtitle">
          Bring the entire SnippetUI library of premium glassmorphic components, text animations, 
          and dynamic triggers directly into your development workflow. No copy-pasting required.
        </p>

        <!-- Coming Soon Status Badge -->
        <div class="marketplace-coming-soon-wrapper">
          <div class="marketplace-coming-soon-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="badge-icon">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Direct VS Code Marketplace Release — Coming Soon</span>
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
            <div class="titlebar-filename">SnippetUI - Visual Sandbox</div>
            <div class="titlebar-placeholder"></div>
          </div>

          <!-- Window Layout Area -->
          <div class="vscode-workspace">
            <!-- Left Sidebar (SnippetUI Explorer Webview Panel) -->
            <aside class="mock-vscode-sidebar">
              <div class="sidebar-header">
                <h3>SnippetUI Explorer</h3>
                <span class="sidebar-badge">v1.0.0</span>
              </div>
              <ul class="mock-sidebar-categories">
                <li class="cat-header">Text Animations</li>
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
                <li class="cat-header">Dynamic Buttons</li>
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
                <div class="tab-item active">SnippetUI Sandbox</div>
              </div>
              <div class="editor-container">
                <div class="sandbox-split-left">
                  <div class="editor-header-label">HTML Markup</div>
                  <pre class="code-editor-block"><code class="language-html"><span class="tag">&lt;div</span> <span class="attr">class</span>=<span class="val">"neon-glow-card"</span><span class="tag">&gt;</span>
  <span class="tag">&lt;h1</span> <span class="attr">class</span>=<span class="val">"glow-text"</span><span class="tag">&gt;</span>SnippetUI<span class="tag">&lt;/h1&gt;</span>
<span class="tag">&lt;/div&gt;</span></code></pre>
                  
                  <div class="editor-header-label" style="margin-top: 16px;">CSS Variables (Configurable)</div>
                  <pre class="code-editor-block"><code class="language-css"><span class="selector">:root</span> {
  <span class="property">--glow-color</span>: <span class="val">#00f2fe</span>;
  <span class="property">--card-blur</span>: <span class="val">20px</span>;
}</code></pre>
                  
                  <button class="btn-mock-inject" id="btn-mock-inject-trigger">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 6px;">
                      <polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    Inject Component into Active File
                  </button>
                </div>
                
                <div class="sandbox-split-right">
                  <div class="editor-header-label">Visual Preview</div>
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
          <h2 class="steps-title">Get Started in 4 Simple Steps</h2>
          <p class="steps-subtitle">Start styling and coding with premium animations in under 60 seconds.</p>
        </div>

        <div class="steps-grid">
          <!-- Step 1 -->
          <div class="step-card">
            <div class="step-num">01</div>
            <h3 class="step-card-title">Install the Extension</h3>
            <p class="step-card-desc">
              Download the <strong>VSIX package</strong> above, open VS Code, open Extensions, select 
              <strong>"Install from VSIX..."</strong> and choose the file. Or run the terminal command.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="step-card">
            <div class="step-num">02</div>
            <h3 class="step-card-title">Initialize Your Project</h3>
            <p class="step-card-desc">
              Open the command palette (<code>Ctrl+Shift+P</code>) and run <strong>"SnippetUI: Initialize Project"</strong>. 
              This creates the global design token configurations.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="step-card">
            <div class="step-num">03</div>
            <h3 class="step-card-title">Browse and Search</h3>
            <p class="step-card-desc">
              Run <strong>"SnippetUI: Insert Component"</strong> or open the Visual Explorer tab. 
              Search dynamically for loaders, buttons, text layouts, or page sections.
            </p>
          </div>

          <!-- Step 4 -->
          <div class="step-card">
            <div class="step-num">04</div>
            <h3 class="step-card-title">Inject and Style</h3>
            <p class="step-card-desc">
              Choose your framework output (Tailwind, React TSX, Vue SFC, or Vanilla HTML/CSS). 
              Click insert, and the clean source code will be injected right into your cursor position!
            </p>
          </div>
        </div>
      </section>

      <!-- Bento Capabilities Box Grid -->
      <section class="showcase-bento-section">
        <div class="section-header">
          <h2 class="steps-title">Engineered with "God Mode" Capabilities</h2>
          <p class="steps-subtitle">Designed to automate UI styling workflows directly inside the editor environment.</p>
        </div>

        <div class="bento-grid">
          <!-- Bento Item 1: Copilot Integration -->
          <div class="bento-card bento-wide">
            <div class="bento-card-content">
              <div class="bento-badge">VS Code Copilot Chat</div>
              <h3>AI Chat Assistant (@snippetui)</h3>
              <p>
                Prompt the extension directly inside your VS Code Chat panel. Query things like 
                <code>@snippetui cosmic glow button</code>, and it will search our registries and write 
                the complete code block directly in the chat panel.
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
              <div class="bento-badge">Figma API</div>
              <h3>Figma Token Sync</h3>
              <p>
                Sync variables directly. Pull color tokens, spacing indexes, and border shapes from 
                your design teams' Figma files directly into your local globals sheet.
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
              <div class="bento-badge">Performance</div>
              <h3>Registry Cache & Update</h3>
              <p>
                Full local offline support. The extension caches the registry database for rapid access, 
                and syncs with the remote repository only when updates are found.
              </p>
            </div>
            <div class="bento-card-visual mock-cache-ring">
              <div class="cache-badge-icon">100% Offline</div>
            </div>
          </div>

          <!-- Bento Item 4: Global Framework Compilation -->
          <div class="bento-card bento-wide">
            <div class="bento-card-content">
              <div class="bento-badge">Multi-framework Compiler</div>
              <h3>Clean Compilation Modules</h3>
              <p>
                Our code injection engine automatically wraps HTML, CSS, and JS components based on your 
                needs: standard HTML snippets, Tailwind-configured tags, React functional components 
                (JSX/TSX), or Vue Single File Components (SFC).
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
        <h2 class="showcase-cta-title">Upgrade Your Development Experience</h2>
        <p class="showcase-cta-subtitle">
          Say goodbye to manual component hunting. Browse our premium design components library or look out for our official VS Code Marketplace launch.
        </p>
        <div class="showcase-footer-buttons">
          <button class="btn-showcase-primary large" id="btn-showcase-to-library">
            Browse Components Library
          </button>
          <div class="marketplace-coming-soon-badge secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 8px;">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Coming Soon to VS Code Marketplace</span>
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
