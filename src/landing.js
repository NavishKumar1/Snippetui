/**
 * SnippetUI - Landing Page Component
 */
import { component as auroraHoloText } from './library/text-animation/aurora-holographic-text.js';
import { component as particleBurstBtn } from './library/buttons/particle-burst-btn.js';
import { component as cosmicNebulaText } from './library/text-animation/cosmic-nebula-text.js';
import { component as retroSynthwaveBtn } from './library/buttons/retro-synthwave-btn.js';

export function renderLanding(onNavigate) {
  // Returns HTML structure for the landing page
  const htmlContent = `
    <div class="landing-view">
      <!-- Hero Section -->
      <section class="hero-section">
        <!-- Left Column: Content -->
        <div class="hero-content-left">
          <div class="tech-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            Industry-Leading Snippets
          </div>
          
          <h1 class="hero-title">
            Build 10x Faster with <br/><span>SnippetUI</span> Components
          </h1>
          
          <p class="hero-subtitle">
            Frosted glassmorphism, animated capsule elements, glowing gradient borders, and mesmerizing micro-animations. 100% hand-crafted, lightweight vanilla CSS, and free forever.
          </p>
          
          <div class="hero-actions">
            <a href="#library" class="btn-hero-primary" id="hero-btn-browse">Browse Components</a>
          </div>
        </div>
        
        <!-- Right Column: Interactive Featured Showcase Chassis -->
        <div class="hero-placeholder-right">
          <div class="hero-showcase-container">
            <!-- Topbar Mock Terminal Browser Controls -->
            <div class="showcase-topbar">
              <div class="topbar-dots">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <div class="topbar-title">LIVE INTERACTIVE SHOWCASE</div>
              <div class="topbar-status">
                <span class="status-indicator-dot animate-pulse"></span>
                ACTIVE
              </div>
            </div>
            
            <!-- Showcase Split Body -->
            <div class="showcase-body">
              <!-- Sidebar Tabs Category Filter -->
              <div class="showcase-sidebar">
                <button class="showcase-tab-btn active" data-id="aurora-holographic-text">
                  <span class="tab-icon">✨</span>
                  <span class="tab-label">Aurora Text</span>
                </button>
                <button class="showcase-tab-btn" data-id="particle-burst-btn">
                  <span class="tab-icon">⚡</span>
                  <span class="tab-label">Particle Burst</span>
                </button>
                <button class="showcase-tab-btn" data-id="cosmic-nebula-text">
                  <span class="tab-icon">🌌</span>
                  <span class="tab-label">Cosmic Nebula</span>
                </button>
                <button class="showcase-tab-btn" data-id="retro-synthwave-btn">
                  <span class="tab-icon">🕹️</span>
                  <span class="tab-label">Synthwave Grid</span>
                </button>
              </div>
              
              <!-- Live Preview Stage Frame -->
              <div class="showcase-preview-area">
                <div class="showcase-glow" id="showcase-glow-effect"></div>
                <div class="showcase-stage" id="showcase-live-stage">
                  <!-- Dynamic Render target -->
                </div>
              </div>
            </div>
            
            <!-- Showcase Capsule Footer Actions -->
            <div class="showcase-footer">
              <div class="showcase-footer-info">
                <span class="component-meta-tag" id="showcase-meta-tag">Aesthetic</span>
                <span class="component-meta-name" id="showcase-meta-name">Aurora Holographic</span>
              </div>
              <div class="showcase-footer-actions">
                <button class="btn-showcase-action" id="showcase-btn-copy-code" title="Copy active code">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>Copy Code</span>
                </button>
                <a href="#library" class="btn-showcase-action primary" id="showcase-btn-browse-inline">
                  <span>Explore Library</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Footer Section -->
      <footer class="global-footer">
        <div class="footer-container">
          <div class="footer-left">
            <img src="/assets/logo.png" alt="SnippetUI Logo" class="footer-logo-img" />
            <p>Building the world's most breathtaking frontend component platform.</p>
            <p>© 2026 SnippetUI. All rights reserved.</p>
          </div>
          
          <div class="footer-links">
            <div class="footer-link-group">
              <h4>Platform</h4>
              <a href="#library" id="footer-link-library">Browse Snippets</a>
              <a href="#" style="opacity: 0.5; pointer-events: none;">Templates (Coming Soon)</a>
            </div>
            
            <div class="footer-link-group">
              <h4>Community</h4>
              <a href="https://github.com" target="_blank">GitHub</a>
              <a href="https://discord.com" target="_blank">Discord</a>
              <a href="https://twitter.com" target="_blank">Twitter</a>
            </div>
            
            <div class="footer-link-group">
              <h4>Legals</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;

  return {
    html: htmlContent,
    init: (appContainer) => {
      // 1. Set up main navigation trigger event listeners
      document.getElementById('hero-btn-browse')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
      });
      document.getElementById('footer-link-library')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
      });
      document.getElementById('showcase-btn-browse-inline')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
      });

      // 2. Interactive Featured Showcase logic orchestration
      const showcaseComponents = {
        'aurora-holographic-text': auroraHoloText,
        'particle-burst-btn': particleBurstBtn,
        'cosmic-nebula-text': cosmicNebulaText,
        'retro-synthwave-btn': retroSynthwaveBtn
      };

      let activeComponentId = 'aurora-holographic-text';

      const liveStage = appContainer.querySelector('#showcase-live-stage');
      const glowEffect = appContainer.querySelector('#showcase-glow-effect');
      const metaTag = appContainer.querySelector('#showcase-meta-tag');
      const metaName = appContainer.querySelector('#showcase-meta-name');
      const btnCopyCode = appContainer.querySelector('#showcase-btn-copy-code');
      const tabButtons = appContainer.querySelectorAll('.showcase-tab-btn');

      // Helper to execute component script logic with shadowed document scope
      function executeComponentJS(component, elementContainer) {
        if (!component || !component.js) return;
        try {
          const shadowDoc = {
            querySelector: (sel) => elementContainer.querySelector(sel),
            querySelectorAll: (sel) => elementContainer.querySelectorAll(sel),
            createElement: (tagName) => document.createElement(tagName),
            addEventListener: (type, cb, opts) => {
              if (type === 'mousemove' || type === 'mouseleave') {
                elementContainer.addEventListener(type, cb, opts);
              } else {
                window.addEventListener(type, cb, opts);
              }
            },
            removeEventListener: (type, cb, opts) => {
              if (type === 'mousemove' || type === 'mouseleave') {
                elementContainer.removeEventListener(type, cb, opts);
              } else {
                window.removeEventListener(type, cb, opts);
              }
            }
          };
          
          const initFn = new Function('document', component.js);
          initFn(shadowDoc);
        } catch (err) {
          console.warn('Error executing showcase component JS:', err);
        }
      }

      // Switches showcased component in preview area
      function switchShowcaseComponent(id) {
        const comp = showcaseComponents[id];
        if (!comp) return;

        activeComponentId = id;

        // Render component HTML
        liveStage.innerHTML = comp.html;

        // Execute dynamic JS logic scoped to container
        executeComponentJS(comp, liveStage);

        // Adjust ambient visual glow color styling
        glowEffect.className = `showcase-glow ${id}`;

        // Sync metadata display labels
        metaTag.textContent = comp.tag || 'Interactive';
        metaName.textContent = comp.name;

        // Sync active state class inside sidebar buttons
        tabButtons.forEach(btn => {
          if (btn.getAttribute('data-id') === id) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }

      // Initialize default showcase display on first load
      switchShowcaseComponent('aurora-holographic-text');

      // Register tab selection mouse listeners
      tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (id) switchShowcaseComponent(id);
        });
      });

      // Interactive Copy Action trigger
      btnCopyCode?.addEventListener('click', () => {
        const comp = showcaseComponents[activeComponentId];
        if (!comp) return;

        const combinedCode = `<!-- HTML Markup -->\n${comp.html}\n\n/* CSS Styling */\n${comp.css}`;
        
        navigator.clipboard.writeText(combinedCode)
          .then(() => {
            // Trigger floating global success toast notification
            const toast = document.getElementById('copy-toast');
            if (toast) {
              toast.querySelector('span').textContent = `Copied ${comp.name} code successfully!`;
              toast.classList.add('active');
              setTimeout(() => {
                toast.classList.remove('active');
              }, 2500);
            }
          })
          .catch(err => console.error('Failed to copy active code: ', err));
      });
    }
  };
}
