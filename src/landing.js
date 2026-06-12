/**
 * SnippetUI - Landing Page Component
 */
import { t } from './i18n.js';

// Step 1: Discover Animation (Auto-typing "glassmorphic-card")
let typingTimer = null;
function runStep1Animation(stepEl) {
  if (stepEl.getAttribute('data-animated') === 'true') return;
  stepEl.setAttribute('data-animated', 'true');
  const textEl = stepEl.querySelector('#pipeline-search-text');
  const resultCard = stepEl.querySelector('#pipeline-search-results');
  if (!textEl || !resultCard) return;

  textEl.textContent = '';
  resultCard.style.opacity = '0';
  resultCard.style.transform = 'translateY(10px) scale(0.95)';
  resultCard.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

  const textToType = 'glassmorphic-card';
  let idx = 0;
  
  if (typingTimer) clearTimeout(typingTimer);
  
  function typeChar() {
    if (idx < textToType.length) {
      textEl.textContent += textToType[idx];
      idx++;
      typingTimer = setTimeout(typeChar, 80);
    } else {
      resultCard.style.opacity = '1';
      resultCard.style.transform = 'translateY(0) scale(1)';
    }
  }
  typeChar();
}

function resetStep1Animation(stepEl) {
  if (stepEl.getAttribute('data-animated') !== 'true') return;
  stepEl.removeAttribute('data-animated');
  if (typingTimer) {
    clearTimeout(typingTimer);
    typingTimer = null;
  }
  const textEl = stepEl.querySelector('#pipeline-search-text');
  const resultCard = stepEl.querySelector('#pipeline-search-results');
  if (textEl) textEl.textContent = '';
  if (resultCard) {
    resultCard.style.opacity = '0';
    resultCard.style.transform = 'translateY(10px) scale(0.95)';
  }
}

// Step 2: Copy Animation (Simulated Clipboard Copy click & Editor Glow)
let copyAnimationTimer = null;
function runStep2Animation(stepEl) {
  if (stepEl.getAttribute('data-animated') === 'true') return;
  stepEl.setAttribute('data-animated', 'true');
  const copyBtn = stepEl.querySelector('#pipeline-copy-btn');
  const codeEditor = stepEl.querySelector('.mock-code-editor-premium');
  if (!copyBtn || !codeEditor) return;

  copyBtn.classList.remove('copied');
  copyBtn.style.background = '';
  copyBtn.style.color = '';
  copyBtn.innerHTML = `<span class="copy-icon">📋</span><span class="copy-text" style="margin-left: 4px;">${t('pipeline_copy_btn')}</span>`;

  if (copyAnimationTimer) clearTimeout(copyAnimationTimer);

  copyAnimationTimer = setTimeout(() => {
    copyBtn.classList.add('copied');
    copyBtn.style.background = '#00f2fe';
    copyBtn.style.color = '#08080c';
    copyBtn.innerHTML = `<span class="copy-icon">✓</span><span class="copy-text" style="font-family: var(--font-heading); font-size: 11px; margin-left: 4px; font-weight: 700;">${t('pipeline_copied_btn')}</span>`;
    
    codeEditor.style.borderColor = 'rgba(0, 242, 254, 0.4)';
    codeEditor.style.boxShadow = '0 10px 40px rgba(0, 242, 254, 0.15)';
    codeEditor.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease';

    setTimeout(() => {
      codeEditor.style.borderColor = '';
      codeEditor.style.boxShadow = '';
    }, 1500);
  }, 1000);
}

function resetStep2Animation(stepEl) {
  if (stepEl.getAttribute('data-animated') !== 'true') return;
  stepEl.removeAttribute('data-animated');
  if (copyAnimationTimer) {
    clearTimeout(copyAnimationTimer);
    copyAnimationTimer = null;
  }
  const copyBtn = stepEl.querySelector('#pipeline-copy-btn');
  const codeEditor = stepEl.querySelector('.mock-code-editor-premium');
  if (copyBtn) {
    copyBtn.classList.remove('copied');
    copyBtn.style.background = '';
    copyBtn.style.color = '';
    copyBtn.innerHTML = `<span class="copy-icon">📋</span><span class="copy-text" style="margin-left: 4px;">${t('pipeline_copy_btn')}</span>`;
  }
  if (codeEditor) {
    codeEditor.style.borderColor = '';
    codeEditor.style.boxShadow = '';
  }
}

// Step 3: Deploy Animation (Simulated component fade-in inside wireframe viewport)
let deployAnimationTimer = null;
function runStep3Animation(stepEl) {
  if (stepEl.getAttribute('data-animated') === 'true') return;
  stepEl.setAttribute('data-animated', 'true');
  const deployedBtn = stepEl.querySelector('#pipeline-deployed-btn');
  const browserWin = stepEl.querySelector('#pipeline-browser-window');
  if (!deployedBtn || !browserWin) return;

  deployedBtn.style.opacity = '0';
  deployedBtn.style.transform = 'scale(0.8) translateY(10px)';

  if (deployAnimationTimer) clearTimeout(deployAnimationTimer);

  deployAnimationTimer = setTimeout(() => {
    deployedBtn.style.opacity = '1';
    deployedBtn.style.transform = 'scale(1) translateY(0)';
    deployedBtn.style.transition = 'opacity 0.4s ease, transform 0.4s ease, background 0.3s ease, box-shadow 0.3s ease';
    
    browserWin.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    browserWin.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(16, 185, 129, 0.15)';
    browserWin.style.transition = 'border-color 0.4s ease, box-shadow 0.4s ease';

    setTimeout(() => {
      browserWin.style.borderColor = '';
      browserWin.style.boxShadow = '';
    }, 1500);
  }, 1200);
}

function resetStep3Animation(stepEl) {
  if (stepEl.getAttribute('data-animated') !== 'true') return;
  stepEl.removeAttribute('data-animated');
  if (deployAnimationTimer) {
    clearTimeout(deployAnimationTimer);
    deployAnimationTimer = null;
  }
  const deployedBtn = stepEl.querySelector('#pipeline-deployed-btn');
  const browserWin = stepEl.querySelector('#pipeline-browser-window');
  if (deployedBtn) {
    deployedBtn.style.opacity = '0';
    deployedBtn.style.transform = 'scale(0.8) translateY(10px)';
  }
  if (browserWin) {
    browserWin.style.borderColor = '';
    browserWin.style.boxShadow = '';
  }
}

export function renderLanding(onNavigate) {
  // Returns HTML structure for the landing page
  const htmlContent = `
    <div class="landing-view">
      <!-- Hero Section -->
      <section class="hero-section">
        <!-- Left Column: Content -->
        <div class="hero-content-left">

          <h1 class="hero-title">
            ${t('hero_title')}
          </h1>
          
          <p class="hero-subtitle">
            ${t('hero_subtitle')}
          </p>
          
          <div class="hero-actions">
            <a href="#library" class="btn-hero-primary" id="hero-btn-browse">
              ${t('hero_btn_browse')}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-left: 6px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="#extension" class="btn-hero-secondary btn-hero-extension">
              ${t('hero_btn_extension')}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-left: 6px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
          
          <div class="hero-cli-trigger">
            <span class="cli-icon">💻</span>
            <span class="cli-cmd-text">npx snippetui init</span>
            <a href="#cli-guide" class="btn-hero-cli-link" id="hero-btn-cli">
              ${t('hero_btn_cli')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-left: 4px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>

        <!-- Right Column: Visual Showcase -->
        <div class="hero-visual-right">
          <!-- Column 1 (Bottom to Top) -->
          <div class="hero-marquee-column col-up">
            <div class="marquee-track">
              <!-- Item 1: Text Gradient Shimmer -->
              <div class="mock-card card-text-shimmer">
                <div class="mock-text-shimmer">SnippetUI</div>
              </div>
              <!-- Item 2: Magnetic Gravity Button -->
              <div class="mock-card card-btn-magnetic">
                <button class="mock-magnetic-btn">
                  <span>Connect</span>
                  <div class="btn-magnetic-glow"></div>
                </button>
              </div>
              <!-- Item 3: Liquid Distortion wave -->
              <div class="mock-card card-text-liquid-wave">
                <div class="mock-text-liquid-wave" data-text="LIQUID">LIQUID</div>
              </div>
              <!-- Item 4: Glassmorphism Fluid Orb (Button) -->
              <div class="mock-card card-btn-glass-orb">
                <button class="mock-glass-orb-btn">Launch</button>
              </div>
              <!-- Item 5: Kinetic Stretch Warp -->
              <div class="mock-card card-text-stretch">
                <div class="mock-text-stretch">WARP</div>
              </div>
              <!-- Item 6: Chroma Refraction (Button) -->
              <div class="mock-card card-btn-chroma-refract">
                <button class="mock-chroma-refract-btn">Refract</button>
              </div>
              <!-- Item 7: Volcano Blast Glow -->
              <div class="mock-card card-text-volcano">
                <div class="mock-text-volcano">BLAST</div>
              </div>
              <!-- Item 8: Ethereal Smoke (Button) -->
              <div class="mock-card card-btn-smoke">
                <button class="mock-smoke-btn">Vapor</button>
              </div>
              <!-- Item 9: Chroma Oil-Slick Vortex (Button) -->
              <div class="mock-card card-btn-vortex">
                <button class="mock-vortex-btn">Slick</button>
              </div>

              <!-- Duplicate list for infinite scroll seamless looping -->
              <div class="mock-card card-text-shimmer">
                <div class="mock-text-shimmer">SnippetUI</div>
              </div>
              <div class="mock-card card-btn-magnetic">
                <button class="mock-magnetic-btn">
                  <span>Connect</span>
                  <div class="btn-magnetic-glow"></div>
                </button>
              </div>
              <div class="mock-card card-text-liquid-wave">
                <div class="mock-text-liquid-wave" data-text="LIQUID">LIQUID</div>
              </div>
              <div class="mock-card card-btn-glass-orb">
                <button class="mock-glass-orb-btn">Launch</button>
              </div>
              <div class="mock-card card-text-stretch">
                <div class="mock-text-stretch">WARP</div>
              </div>
              <div class="mock-card card-btn-chroma-refract">
                <button class="mock-chroma-refract-btn">Refract</button>
              </div>
              <div class="mock-card card-text-volcano">
                <div class="mock-text-volcano">BLAST</div>
              </div>
              <div class="mock-card card-btn-smoke">
                <button class="mock-smoke-btn">Vapor</button>
              </div>
              <div class="mock-card card-btn-vortex">
                <button class="mock-vortex-btn">Slick</button>
              </div>
            </div>
          </div>

          <!-- Column 2 (Top to Bottom) -->
          <div class="hero-marquee-column col-down">
            <div class="marquee-track">
              <!-- Item 1: Cyber Wave Loader -->
              <div class="mock-card card-loader-cyber-wave">
                <div class="cyber-wave">
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>
              <!-- Item 2: Liquid Range Slider -->
              <div class="mock-card card-slider-liquid">
                <div class="mock-slider-container">
                  <div class="slider-liquid-track">
                    <div class="slider-liquid-fill" style="width: 65%;"></div>
                    <div class="slider-liquid-thumb" style="left: 65%;">
                      <div class="slider-liquid-tooltip">65%</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Item 3: Liquid Mercury Morphing Loader -->
              <div class="mock-card card-loader-mercury">
                <div class="mercury-blob"></div>
              </div>
              <!-- Item 4: Cosmic Nebula Slider -->
              <div class="mock-card card-slider-nebula">
                <div class="nebula-slider-wrap">
                  <div class="nebula-track"></div>
                  <div class="nebula-thumb"></div>
                </div>
              </div>
              <!-- Item 5: Bioluminescent Synapse Impulse -->
              <div class="mock-card card-loader-synapse">
                <div class="synapse-node">
                  <div class="impulse"></div>
                </div>
              </div>
              <!-- Item 6: Glossy Physics Balls -->
              <div class="mock-card card-bg-physics">
                <div class="physics-balls">
                  <span class="ball b1"></span>
                  <span class="ball b2"></span>
                  <span class="ball b3"></span>
                </div>
              </div>
              <!-- Item 7: Cosmic Nebula Portal Ring -->
              <div class="mock-card card-loader-nebula-portal">
                <div class="nebula-ring"></div>
              </div>
              <!-- Item 8: Interactive Electric Lightning -->
              <div class="mock-card card-bg-lightning">
                <div class="lightning-strike"></div>
              </div>

              <!-- Duplicate list for infinite scroll seamless looping -->
              <div class="mock-card card-loader-cyber-wave">
                <div class="cyber-wave">
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>
              <div class="mock-card card-slider-liquid">
                <div class="mock-slider-container">
                  <div class="slider-liquid-track">
                    <div class="slider-liquid-fill" style="width: 65%;"></div>
                    <div class="slider-liquid-thumb" style="left: 65%;">
                      <div class="slider-liquid-tooltip">65%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mock-card card-loader-mercury">
                <div class="mercury-blob"></div>
              </div>
              <div class="mock-card card-slider-nebula">
                <div class="nebula-slider-wrap">
                  <div class="nebula-track"></div>
                  <div class="nebula-thumb"></div>
                </div>
              </div>
              <div class="mock-card card-loader-synapse">
                <div class="synapse-node">
                  <div class="impulse"></div>
                </div>
              </div>
              <div class="mock-card card-bg-physics">
                <div class="physics-balls">
                  <span class="ball b1"></span>
                  <span class="ball b2"></span>
                  <span class="ball b3"></span>
                </div>
              </div>
              <div class="mock-card card-loader-nebula-portal">
                <div class="nebula-ring"></div>
              </div>
              <div class="mock-card card-bg-lightning">
                <div class="lightning-strike"></div>
              </div>
            </div>
          </div>

          <!-- Column 3 (Bottom to Top) -->
          <div class="hero-marquee-column col-up">
            <div class="marquee-track">
              <!-- Item 1: Liquid Glass Metaballs -->
              <div class="mock-card card-bg-metaballs">
                <div class="metaballs-container">
                  <div class="meta-blob m1"></div>
                  <div class="meta-blob m2"></div>
                </div>
              </div>
              <!-- Item 2: Statistics Widget -->
              <div class="mock-card card-widget-stats">
                <div class="sui-stat-widget">
                  <span class="widget-label">Conversion Rate</span>
                  <div class="widget-row">
                    <span class="widget-value">24.8%</span>
                    <span class="widget-trend up">+4.2%</span>
                  </div>
                  <div class="widget-sparkline">
                    <svg class="spark-svg" viewBox="0 0 100 30" width="100%" height="24">
                      <path d="M0,25 Q15,10 30,22 T60,5 T90,20" fill="none" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <!-- Item 3: Vector Field Swarm -->
              <div class="mock-card card-bg-vector-swarm">
                <div class="vector-swarm">
                  <div class="particle p1"></div>
                  <div class="particle p2"></div>
                  <div class="particle p3"></div>
                </div>
              </div>
              <!-- Item 4: Analytics Chart -->
              <div class="mock-card card-widget-chart">
                <div class="sui-chart-widget">
                  <span class="widget-label">Daily Traffic</span>
                  <div class="widget-chart-bars">
                    <div class="chart-bar bar-active" style="height: 40%"></div>
                    <div class="chart-bar" style="height: 60%"></div>
                    <div class="chart-bar" style="height: 85%"></div>
                    <div class="chart-bar" style="height: 55%"></div>
                    <div class="chart-bar" style="height: 95%"></div>
                  </div>
                </div>
              </div>
              <!-- Item 5: Bioluminescent Spore Ring -->
              <div class="mock-card card-gauge-spore">
                <div class="spore-ring">
                  <div class="spore-inner"></div>
                </div>
              </div>
              <!-- Item 6: Liquid Magma Thermometer -->
              <div class="mock-card card-gauge-thermometer">
                <div class="thermometer-gauge">
                  <div class="bulb"></div>
                  <div class="tube">
                    <div class="fill" style="height: 70%;"></div>
                  </div>
                </div>
              </div>
              <!-- Item 7: Quantum Wave Gauge -->
              <div class="mock-card card-gauge-quantum-wave">
                <div class="quantum-wave">
                  <svg viewBox="0 0 100 40" class="q-wave-svg">
                    <path d="M0,20 Q25,5 50,20 T100,20" fill="none" stroke="#00f2fe" stroke-width="2.5" stroke-linecap="round"></path>
                  </svg>
                </div>
              </div>
              <!-- Item 8: Star Constellation Progress -->
              <div class="mock-card card-progress-star">
                <div class="star-progress">
                  <div class="const-dot d1"></div>
                  <div class="const-dot d2"></div>
                  <div class="const-dot d3"></div>
                  <svg class="const-line" width="60" height="20">
                    <line x1="10" y1="10" x2="30" y2="10" stroke="rgba(0, 242, 254, 0.4)" stroke-width="1.5"></line>
                    <line x1="30" y1="10" x2="50" y2="10" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1.5"></line>
                  </svg>
                </div>
              </div>
              <!-- Item 9: Origami Geometric Ring -->
              <div class="mock-card card-gauge-origami">
                <div class="origami-geometric">
                  <div class="poly p1"></div>
                  <div class="poly p2"></div>
                </div>
              </div>

              <!-- Duplicate list for infinite scroll seamless looping -->
              <div class="mock-card card-bg-metaballs">
                <div class="metaballs-container">
                  <div class="meta-blob m1"></div>
                  <div class="meta-blob m2"></div>
                </div>
              </div>
              <div class="mock-card card-widget-stats">
                <div class="sui-stat-widget">
                  <span class="widget-label">Conversion Rate</span>
                  <div class="widget-row">
                    <span class="widget-value">24.8%</span>
                    <span class="widget-trend up">+4.2%</span>
                  </div>
                  <div class="widget-sparkline">
                    <svg class="spark-svg" viewBox="0 0 100 30" width="100%" height="24">
                      <path d="M0,25 Q15,10 30,22 T60,5 T90,20" fill="none" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="mock-card card-bg-vector-swarm">
                <div class="vector-swarm">
                  <div class="particle p1"></div>
                  <div class="particle p2"></div>
                  <div class="particle p3"></div>
                </div>
              </div>
              <div class="mock-card card-widget-chart">
                <div class="sui-chart-widget">
                  <span class="widget-label">Daily Traffic</span>
                  <div class="widget-chart-bars">
                    <div class="chart-bar bar-active" style="height: 40%"></div>
                    <div class="chart-bar" style="height: 60%"></div>
                    <div class="chart-bar" style="height: 85%"></div>
                    <div class="chart-bar" style="height: 55%"></div>
                    <div class="chart-bar" style="height: 95%"></div>
                  </div>
                </div>
              </div>
              <div class="mock-card card-gauge-spore">
                <div class="spore-ring">
                  <div class="spore-inner"></div>
                </div>
              </div>
              <div class="mock-card card-gauge-thermometer">
                <div class="thermometer-gauge">
                  <div class="bulb"></div>
                  <div class="tube">
                    <div class="fill" style="height: 70%;"></div>
                  </div>
                </div>
              </div>
              <div class="mock-card card-gauge-quantum-wave">
                <div class="quantum-wave">
                  <svg viewBox="0 0 100 40" class="q-wave-svg">
                    <path d="M0,20 Q25,5 50,20 T100,20" fill="none" stroke="#00f2fe" stroke-width="2.5" stroke-linecap="round"></path>
                  </svg>
                </div>
              </div>
              <div class="mock-card card-progress-star">
                <div class="star-progress">
                  <div class="const-dot d1"></div>
                  <div class="const-dot d2"></div>
                  <div class="const-dot d3"></div>
                  <svg class="const-line" width="60" height="20">
                    <line x1="10" y1="10" x2="30" y2="10" stroke="rgba(0, 242, 254, 0.4)" stroke-width="1.5"></line>
                    <line x1="30" y1="10" x2="50" y2="10" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1.5"></line>
                  </svg>
                </div>
              </div>
              <div class="mock-card card-gauge-origami">
                <div class="origami-geometric">
                  <div class="poly p1"></div>
                  <div class="poly p2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Curved Wave Divider -->
        <div class="hero-wave-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 C180,120 300,40 450,40 C650,40 850,120 1050,120 C1200,120 1350,70 1440,70 L1440,120 L0,120 Z" class="wave-path"></path>
          </svg>
        </div>
      </section>

      <div class="landing-body-light">
        <!-- Section 1: Animated Statistics & Counter Dashboard -->
        <section class="landing-stats-section" id="stats-section">
        <div class="stats-grid">
          
          <div class="stat-card" data-target="350">
            <div class="stat-visual">
              <svg class="progress-ring" width="80" height="80">
                <circle class="progress-ring-bg" cx="40" cy="40" r="34" />
                <circle class="progress-ring-circle ring-cyan" cx="40" cy="40" r="34" />
              </svg>
              <div class="stat-icon-overlay">💎</div>
            </div>
            <div class="stat-info">
              <h2 class="stat-number"><span class="counter-value">0</span>+</h2>
              <p class="stat-label">${t('stat_components')}</p>
            </div>
          </div>

          <div class="stat-card" data-target="1">
            <div class="stat-visual">
              <svg class="progress-ring" width="80" height="80">
                <circle class="progress-ring-bg" cx="40" cy="40" r="34" />
                <circle class="progress-ring-circle ring-purple" cx="40" cy="40" r="34" />
              </svg>
              <div class="stat-icon-overlay">⚡</div>
            </div>
            <div class="stat-info">
              <h2 class="stat-number">&lt; <span class="counter-value">0</span>ms</h2>
              <p class="stat-label">${t('stat_speed')}</p>
            </div>
          </div>

          <div class="stat-card" data-target="100">
            <div class="stat-visual">
              <svg class="progress-ring" width="80" height="80">
                <circle class="progress-ring-bg" cx="40" cy="40" r="34" />
                <circle class="progress-ring-circle ring-blue" cx="40" cy="40" r="34" />
              </svg>
              <div class="stat-icon-overlay">🔥</div>
            </div>
            <div class="stat-info">
              <h2 class="stat-number"><span class="counter-value">0</span>%</h2>
              <p class="stat-label">${t('stat_open_source')}</p>
            </div>
          </div>

          <div class="stat-card" data-target="24">
            <div class="stat-visual">
              <svg class="progress-ring" width="80" height="80">
                <circle class="progress-ring-bg" cx="40" cy="40" r="34" />
                <circle class="progress-ring-circle ring-gold" cx="40" cy="40" r="34" />
              </svg>
              <div class="stat-icon-overlay">✨</div>
            </div>
            <div class="stat-info">
              <h2 class="stat-number"><span class="counter-value">0</span>/7</h2>
              <p class="stat-label">${t('stat_customization')}</p>
            </div>
          </div>

        </div>
      </section>
      
      <!-- Bottom Wave Divider (Stats to Pipeline) -->
      <div class="stats-wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,120 C180,120 300,40 450,40 C650,40 850,120 1050,120 C1200,120 1350,70 1440,70 L1440,120 L0,120 Z" class="wave-path-dark"></path>
        </svg>
      </div>
      </div>

      <!-- Section 2: Visual "How It Works" Sticky Pipeline -->
      <section class="landing-pipeline-section" id="pipeline-section">
        <div class="section-header">
          <div class="tech-badge">${t('pipeline_badge')}</div>
          <h2 class="section-title">${t('pipeline_title')}</h2>
          <p class="section-subtitle">${t('pipeline_subtitle')}</p>
        </div>

        <div class="pipeline-split-layout">
          <!-- Left Sticky: Morphing Sandbox Viewport -->
          <div class="pipeline-sticky-viewport">
            <div class="morphing-sandbox-card" id="pipeline-morph-sandbox">
              
              <!-- Sandbox Stage 1: Discover Search -->
              <div class="sandbox-stage stage-discover visible" id="sandbox-stage-1">
                <div class="mock-search-container">
                  <div class="mock-search-bar">
                    <span class="mock-search-icon">🔍</span>
                    <span class="mock-search-text" id="pipeline-search-text"></span>
                    <span class="mock-search-cursor">|</span>
                  </div>
                  <div class="mock-search-results-list" id="pipeline-search-results">
                    <div class="mock-result-card-premium">
                      <div class="mock-card-glow-aurora"></div>
                      <div class="mock-card-badge-neon">New</div>
                      <span class="result-icon">✨</span>
                      <div>
                        <div class="result-title">Aurora Gradient Text</div>
                        <div class="result-category">Text Animation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Sandbox Stage 2: Code Copy Editor -->
              <div class="sandbox-stage stage-copy" id="sandbox-stage-2">
                <div class="mock-code-editor-premium">
                  <div class="editor-header-tabs">
                    <div class="tabs-dots">
                      <span class="dot-tab red"></span>
                      <span class="dot-tab yellow"></span>
                      <span class="dot-tab green"></span>
                    </div>
                    <div class="tab-title-text">aurora-text.css</div>
                  </div>
                  <pre class="editor-code-block"><code><span class="token-selector">.aurora-text</span> {
  <span class="token-property">background</span>: <span class="token-value">linear-gradient(to right, #00f2fe, #4facfe, #8a2be2)</span>;
  <span class="token-property">background-clip</span>: <span class="token-value">text</span>;
  <span class="token-property">color</span>: <span class="token-value">transparent</span>;
  <span class="token-property">animation</span>: <span class="token-value">shimmer 3s infinite</span>;
}</code></pre>
                  <button class="mock-copy-btn-premium" id="pipeline-copy-btn">
                    <span class="copy-icon">📋</span>
                    <span class="copy-text">${t('pipeline_copy_btn')}</span>
                  </button>
                </div>
              </div>

              <!-- Sandbox Stage 3: Browser Injection Viewport -->
              <div class="sandbox-stage stage-deploy" id="sandbox-stage-3">
                <div class="mock-browser-viewport-premium" id="pipeline-browser-window">
                  <div class="browser-address-header">
                    <div class="browser-actions-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <div class="address-bar-url">localhost:3000</div>
                  </div>
                  <div class="browser-display-screen">
                    <div class="demo-application-wireframe">
                      <div class="mock-app-logo"></div>
                      <div class="mock-app-content">
                        <div class="mock-line wide"></div>
                        <div class="mock-line"></div>
                        <div class="mock-live-inject-target">
                          <div class="mock-injected-aurora-text" id="pipeline-deployed-btn">Aurora Gradient</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Right: Scrolling Text Cards -->
          <div class="pipeline-scroll-steps">
            
            <div class="scroll-step active" data-step="1">
              <div class="step-line-indicator">
                <div class="indicator-dot">1</div>
                <div class="indicator-bar"></div>
              </div>
              <div class="step-card-detail">
                <span class="step-small-badge">${t('step1_badge')}</span>
                <h3>${t('step1_title')}</h3>
                <p>
                  ${t('step1_desc')}
                </p>
              </div>
            </div>

            <div class="scroll-step" data-step="2">
              <div class="step-line-indicator">
                <div class="indicator-dot">2</div>
                <div class="indicator-bar"></div>
              </div>
              <div class="step-card-detail">
                <span class="step-small-badge">${t('step2_badge')}</span>
                <h3>${t('step2_title')}</h3>
                <p>
                  ${t('step2_desc')}
                </p>
              </div>
            </div>

            <div class="scroll-step" data-step="3">
              <div class="step-line-indicator">
                <div class="indicator-dot">3</div>
                <div class="indicator-bar"></div>
              </div>
              <div class="step-card-detail">
                <span class="step-small-badge">${t('step3_badge')}</span>
                <h3>${t('step3_title')}</h3>
                <p>
                  ${t('step3_desc')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      <!-- Glowing Vector Transition Line -->
      <div class="pipeline-bottom-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 Q360,90 720,50 T1440,50" fill="none" stroke="url(#cyan-purple-grad)" stroke-width="3" class="glow-vector-line"></path>
          <defs>
            <linearGradient id="cyan-purple-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#00f2fe" />
              <stop offset="50%" stop-color="#4facfe" />
              <stop offset="100%" stop-color="#8a2be2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Section 3: Featured Category Grid with Horizontal Scroll Pinning -->
      <section class="landing-categories-section" id="categories-scroll-track">
        <div class="category-sticky-wrap">
          
          <div class="section-header">
            <div class="tech-badge">${t('cat_badge')}</div>
            <h2 class="section-title">${t('cat_title')}</h2>
            <p class="section-subtitle">${t('cat_subtitle')}</p>
          </div>

          <div class="categories-row-container">
            <div class="categories-row" id="categories-row">
              
              <div class="category-card" data-category="text-animation">
                <div class="card-glow"></div>
                <div class="category-card-icon">✍️</div>
                <h3>${t('cat_text')}</h3>
                <p>${t('cat_text_desc')}</p>
                <span class="card-arrow">${t('cat_explore')}</span>
              </div>

              <div class="category-card" data-category="buttons">
                <div class="card-glow"></div>
                <div class="category-card-icon">⚡</div>
                <h3>${t('cat_buttons')}</h3>
                <p>${t('cat_buttons_desc')}</p>
                <span class="card-arrow">${t('cat_explore')}</span>
              </div>

              <div class="category-card" data-category="page-transitions">
                <div class="card-glow"></div>
                <div class="category-card-icon">🔄</div>
                <h3>${t('cat_transitions')}</h3>
                <p>${t('cat_transitions_desc')}</p>
                <span class="card-arrow">${t('cat_explore')}</span>
              </div>

              <div class="category-card" data-category="loaders">
                <div class="card-glow"></div>
                <div class="category-card-icon">🌀</div>
                <h3>${t('cat_loaders')}</h3>
                <p>${t('cat_loaders_desc')}</p>
                <span class="card-arrow">${t('cat_explore')}</span>
              </div>

              <div class="category-card" data-category="dock-navigations">
                <div class="card-glow"></div>
                <div class="category-card-icon">💻</div>
                <h3>${t('cat_docks')}</h3>
                <p>${t('cat_docks_desc')}</p>
                <span class="card-arrow">${t('cat_explore')}</span>
              </div>

            </div>
          </div>

          <div class="elite-row-container">
            <div class="elite-row" id="elite-row">
              
              <div class="elite-card">
                <div class="card-glow"></div>
                <div class="elite-card-icon">💫</div>
                <h3>${t('elite_micro_title')}</h3>
                <p>${t('elite_micro_desc')}</p>
              </div>

              <div class="elite-card">
                <div class="card-glow"></div>
                <div class="elite-card-icon">📦</div>
                <h3>${t('elite_zero_title')}</h3>
                <p>${t('elite_zero_desc')}</p>
              </div>

              <div class="elite-card">
                <div class="card-glow"></div>
                <div class="elite-card-icon">🔮</div>
                <h3>${t('elite_neon_title')}</h3>
                <p>${t('elite_neon_desc')}</p>
              </div>

              <div class="elite-card">
                <div class="card-glow"></div>
                <div class="elite-card-icon">♿</div>
                <h3>${t('elite_access_title')}</h3>
                <p>${t('elite_access_desc')}</p>
              </div>

              <div class="elite-card">
                <div class="card-glow"></div>
                <div class="elite-card-icon">🧪</div>
                <h3>${t('elite_vars_title')}</h3>
                <p>${t('elite_vars_desc')}</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      <!-- Glowing Vector Transition Line after Categories & Elite -->
      <div class="categories-bottom-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 Q360,90 720,50 T1440,50 L1440,100 L0,100 Z" fill="#f8fafc" stroke="none"></path>
          <path d="M0,50 Q360,90 720,50 T1440,50" fill="none" stroke="url(#cyan-purple-grad-3)" stroke-width="3" class="glow-vector-line"></path>
          <defs>
            <linearGradient id="cyan-purple-grad-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#00f2fe" />
              <stop offset="50%" stop-color="#4facfe" />
              <stop offset="100%" stop-color="#8a2be2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="landing-body-light">
        <!-- Section 3.5: VS Code Extension Showcase Section -->
        <section class="landing-extension-section" id="extension-section">
          <div class="extension-grid">
            <!-- Visual Container (Left Side) -->
            <div class="extension-visual-container">
              <!-- Animated dashed connector path -->
              <svg class="extension-curve-svg" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50 150 Q 150 50 250 200 T 450 100" stroke="rgba(99, 102, 241, 0.2)" stroke-width="3" stroke-linecap="round" class="extension-curve-path" />
                <path d="M 50 150 Q 150 50 250 200 T 450 100" stroke="url(#active-flow-grad)" stroke-width="3.5" stroke-linecap="round" class="extension-curve-flow-path" />
                <defs>
                  <linearGradient id="active-flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#3b82f6" stop-opacity="0" />
                    <stop offset="50%" stop-color="#6366f1" />
                    <stop offset="100%" stop-color="#a855f7" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <!-- Floating 3D glossy cards -->
              <div class="floating-glass-pill pill-main">
                <span class="puzzle-3d-icon">🧩</span>
                <span class="pill-title">VS Code Extension?</span>
              </div>

              <!-- Badges along the path -->
              <div class="floating-tech-badge tech-react" style="left: 10%; top: 40%;">
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <ellipse rx="10" ry="4.5" fill="none" stroke="#61dafb" stroke-width="1.2" transform="translate(12 12) rotate(0)"/>
                  <ellipse rx="10" ry="4.5" fill="none" stroke="#61dafb" stroke-width="1.2" transform="translate(12 12) rotate(60)"/>
                  <ellipse rx="10" ry="4.5" fill="none" stroke="#61dafb" stroke-width="1.2" transform="translate(12 12) rotate(120)"/>
                  <circle cx="12" cy="12" r="2" fill="#61dafb"/>
                </svg>
              </div>

              <div class="floating-tech-badge tech-vue" style="left: 32%; top: 18%;">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 2L2 19h4L12 8.5 18 19h4L12 2z" fill="#41B883"/>
                  <path d="M12 2L5.5 13.5 8 18l4-7 4 7 2.5-4.5L12 2z" fill="#35495E"/>
                </svg>
              </div>

              <div class="floating-tech-badge tech-svelte" style="left: 54%; top: 58%;">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M19.1 10.3c-.6-1.5-1.9-2.3-3.6-2.3H12l4.4-7.6c.3-.5.1-1.1-.4-1.4-.5-.3-1.1-.1-1.4.4L9 8.6C8 7 6.4 6 4.4 6 2 6 .1 7.7.1 9.9c0 1 .4 1.9 1.1 2.5l5.2 4.4-4.4 7.6c-.3.5-.1 1.1.4 1.4.2.1.4.2.6.2.3 0 .7-.2.9-.5l5.6-9.6c1.1 1.6 2.6 2.5 4.5 2.5 2.4 0 4.3-1.7 4.3-3.9 0-1.1-.4-2-1.1-2.7zM4.4 9.9c0-1.1.9-2 2-2 1 0 1.8.7 2 1.6L4.7 12c-.2-.5-.3-1.1-.3-2.1zm7.8 7.3c-.2-.9-1-1.6-2-1.6-.2 0-.4 0-.6.1l3.7-6.4c.2.5.3 1.1.3 1.6.1 2.2-1.4 6.3-1.4 6.3z" fill="#FF3E00"/>
                </svg>
              </div>

              <div class="floating-tech-badge tech-html" style="left: 74%; top: 38%;">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.1 6.2H7.4l.3 3.1h7.8l-.3 3.5-3.2 1-3.2-1-.2-2.1H5.7l.4 4.5 5.9 1.9 5.9-1.9.7-7.9.1-1.2z" fill="#E34F26"/>
                </svg>
              </div>

              <!-- VS Code Badge -->
              <div class="floating-vscode-logo" style="left: 85%; top: 15%;">
                <div class="vscode-logo-wrap">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29L7.164 9.684 1.776 5.864a1.493 1.493 0 0 0-1.776.082L.002 6.075l-.002.115v11.624l.002.115.002.128a1.49 1.49 0 0 0 1.776.082l5.388-3.82 9.341 9.184a1.494 1.494 0 0 0 1.705.29l4.94-2.377a1.5 1.5 0 0 0 .85-1.352V3.939a1.5 1.5 0 0 0-.85-1.352zM17.44 19.38l-7.397-7.275 7.397-7.274z" fill="#007acc" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Content Container (Right Side) -->
            <div class="extension-content">
              <div class="tech-badge">${t('ext_badge')}</div>
              <h2 class="section-title">${t('ext_title')}</h2>
              <p class="section-subtitle">${t('ext_subtitle')}</p>
              
              <div class="extension-features-list">
                <div class="extension-feature-item">
                  <span class="feature-check">✓</span>
                  <span>${t('ext_f1')}</span>
                </div>
                <div class="extension-feature-item">
                  <span class="feature-check">✓</span>
                  <span>${t('ext_f2')}</span>
                </div>
                <div class="extension-feature-item">
                  <span class="feature-check">✓</span>
                  <span>${t('ext_f3')}</span>
                </div>
              </div>

              <a href="#extension" class="btn-extension">
                <span>${t('ext_btn')}</span>
                <span class="btn-arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        <!-- Elegant Animated Connector Line (Extension to Playground transition) -->
        <div class="extension-bottom-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" fill="none" class="animated-divider-svg">
            <path id="divider-path" d="M0,40 Q360,10 720,40 T1440,40" stroke="url(#divider-grad)" stroke-width="2.5" opacity="0.65"/>
            <!-- Animated Glowing Node (Particle moving along path) -->
            <circle r="4.5" fill="#6366f1" filter="url(#node-shadow)">
              <animateMotion dur="6s" repeatCount="indefinite" path="M0,40 Q360,10 720,40 T1440,40" />
            </circle>
            <defs>
              <linearGradient id="divider-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#3b82f6" />
                <stop offset="50%" stop-color="#8b5cf6" />
                <stop offset="100%" stop-color="#06b6d4" />
              </linearGradient>
              <filter id="node-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feFlood flood-color="#8b5cf6" />
                <feComposite in2="offsetblur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        <!-- Section 4: Live Styling Playground -->
        <section class="landing-playground-section" id="playground-section">
        <div class="section-header">
          <div class="tech-badge">${t('play_badge')}</div>
          <h2 class="section-title">${t('play_title')}</h2>
          <p class="section-subtitle">${t('play_subtitle')}</p>
        </div>

        <div class="playground-panel">
          <!-- Controls Panel (Left) -->
          <div class="playground-controls">
            <h3>${t('play_vars')}</h3>
            
            <div class="component-selector-group">
              <label>${t('play_select')}</label>
              <div class="component-buttons">
                <button class="btn-comp active" data-component="card">${t('play_comp_card')}</button>
                <button class="btn-comp" data-component="button">${t('play_comp_button')}</button>
                <button class="btn-comp" data-component="badge">${t('play_comp_badge')}</button>
              </div>
            </div>

            <div class="control-group">
              <label>${t('play_glow')}: <span id="label-glow">40%</span></label>
              <input type="range" id="slider-glow" min="0" max="100" value="40" class="premium-slider" />
            </div>

            <div class="control-group">
              <label>${t('play_radius')}: <span id="label-radius">24px</span></label>
              <input type="range" id="slider-radius" min="0" max="50" value="24" class="premium-slider" />
            </div>

            <div class="control-group">
              <label>${t('play_blur')}: <span id="label-blur">12px</span></label>
              <input type="range" id="slider-blur" min="0" max="40" value="12" class="premium-slider" />
            </div>

            <div class="control-group">
              <label>${t('play_speed')}: <span id="label-speed">1.5s</span></label>
              <input type="range" id="slider-speed" min="5" max="30" value="15" class="premium-slider" />
            </div>

            <div class="control-group">
              <label>${t('play_hue')}: <span id="label-hue">180deg</span></label>
              <input type="range" id="slider-hue" min="0" max="360" value="180" class="premium-slider" />
            </div>
            
            <div class="theme-selector-group">
              <label>${t('play_theme')}</label>
              <div class="theme-buttons">
                <button class="btn-theme active" data-theme="dark">${t('play_theme_nebula')}</button>
                <button class="btn-theme" data-theme="cyber">${t('play_theme_cyber')}</button>
                <button class="btn-theme" data-theme="glass">${t('play_theme_glass')}</button>
              </div>
            </div>
          </div>

          <!-- Live Preview & Code Panel (Right) -->
          <div class="playground-preview-deck" id="playground-deck">
            <!-- Grid overlay texture -->
            <div class="deck-grid-overlay"></div>
            <!-- Glow background linked to color shift -->
            <div class="deck-ambient-glow" id="play-ambient-glow"></div>

            <div class="preview-stage">
              <!-- Live customizable component wrapper for float -->
              <div class="preview-card-float-wrap">
                <!-- Live customizable component -->
                <div class="custom-premium-card" id="custom-preview-card">
                  <div class="preview-badge">${t('play_preview')}</div>
                  <h4 class="preview-card-title">${t('play_card_title')}</h4>
                  <p>${t('play_card_desc')}</p>
                  <button class="preview-card-action">${t('play_interact')}</button>
                </div>
              </div>
            </div>

            <!-- Generated CSS Export box -->
            <div class="export-code-box">
              <div class="export-header">
                <span>generated-styles.css</span>
                <button class="btn-copy-export" id="btn-copy-playground-css">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>${t('play_copy_css')}</span>
                </button>
              </div>
              <pre class="code-display" id="playground-code-snippet"><code>${t('play_loading')}</code></pre>
            </div>
          </div>
        </div>
      </section>
      </div> <!-- Close the second landing-body-light container -->

      <!-- Customizer bottom curved wave shelf transition to FAQ dark section -->
      <div class="customizer-bottom-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M 0,90 L 180,90 C 280,90 320,70 420,60 L 1020,30 C 1120,20 1160,20 1260,20 L 1440,20 L 1440,120 L 0,120 Z" class="customizer-divider-path"></path>
        </svg>
      </div>

      <!-- Section 5: Premium Interactive FAQ Section -->
      <section class="landing-faq-section" id="faq-section">
        <div class="faq-container-inner">
          <div class="section-header">
          <div class="tech-badge">
            <span>${t('faq_badge')}</span>
          </div>
          <h2 class="section-title">${t('faq_title')}</h2>
          <p class="section-subtitle">${t('faq_subtitle')}</p>
        </div>

        <!-- FAQ Search and Tabs Controls -->
        <div class="faq-controls">
          <!-- Glassmorphism Search Panel -->
          <div class="faq-search-wrapper">
            <svg class="faq-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="faq-search-input" placeholder="${t('faq_search_placeholder')}" aria-label="Search FAQs" />
            <button id="btn-faq-search-clear" aria-label="Clear Search" class="faq-search-clear-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- FAQ Category Filtering tabs -->
          <div class="faq-tabs" id="faq-category-tabs">
            <button class="btn-faq-filter active" data-category="all">${t('faq_cat_all')}</button>
            <button class="btn-faq-filter" data-category="general">${t('faq_cat_general')}</button>
            <button class="btn-faq-filter" data-category="integration">${t('faq_cat_integration')}</button>
            <button class="btn-faq-filter" data-category="extension">${t('faq_cat_extension')}</button>
            <button class="btn-faq-filter" data-category="licensing">${t('faq_cat_licensing')}</button>
          </div>
        </div>

        <!-- FAQ Accordion List -->
        <div class="faq-accordion-list" id="faq-accordion">
          
          <!-- Item 1: General -->
          <div class="faq-item" data-categories="general">
            <button class="faq-trigger" aria-expanded="false">
              <span class="faq-question">${t('faq_q1')}</span>
              <span class="faq-icon-wrapper">
                <span class="faq-icon-line horizontal"></span>
                <span class="faq-icon-line vertical"></span>
              </span>
            </button>
            <div class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p>${t('faq_a1')}</p>
              </div>
            </div>
          </div>

          <!-- Item 2: Integration -->
          <div class="faq-item" data-categories="integration">
            <button class="faq-trigger" aria-expanded="false">
              <span class="faq-question">${t('faq_q2')}</span>
              <span class="faq-icon-wrapper">
                <span class="faq-icon-line horizontal"></span>
                <span class="faq-icon-line vertical"></span>
              </span>
            </button>
            <div class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p>${t('faq_a2')}</p>
              </div>
            </div>
          </div>

          <!-- Item 3: Extension (Under Development Info) -->
          <div class="faq-item" data-categories="extension">
            <button class="faq-trigger" aria-expanded="false">
              <span class="faq-question">${t('faq_q3')}</span>
              <span class="faq-icon-wrapper">
                <span class="faq-icon-line horizontal"></span>
                <span class="faq-icon-line vertical"></span>
              </span>
            </button>
            <div class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p>${t('faq_a3')}</p>
              </div>
            </div>
          </div>

          <!-- Item 4: Licensing -->
          <div class="faq-item" data-categories="licensing">
            <button class="faq-trigger" aria-expanded="false">
              <span class="faq-question">${t('faq_q4')}</span>
              <span class="faq-icon-wrapper">
                <span class="faq-icon-line horizontal"></span>
                <span class="faq-icon-line vertical"></span>
              </span>
            </button>
            <div class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p>${t('faq_a4')}</p>
              </div>
            </div>
          </div>

          <!-- Item 5: Integration -->
          <div class="faq-item" data-categories="integration">
            <button class="faq-trigger" aria-expanded="false">
              <span class="faq-question">${t('faq_q5')}</span>
              <span class="faq-icon-wrapper">
                <span class="faq-icon-line horizontal"></span>
                <span class="faq-icon-line vertical"></span>
              </span>
            </button>
            <div class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p>${t('faq_a5')}</p>
              </div>
            </div>
          </div>

          <!-- Item 6: General -->
          <div class="faq-item" data-categories="general">
            <button class="faq-trigger" aria-expanded="false">
              <span class="faq-question">${t('faq_q6')}</span>
              <span class="faq-icon-wrapper">
                <span class="faq-icon-line horizontal"></span>
                <span class="faq-icon-line vertical"></span>
              </span>
            </button>
            <div class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p>${t('faq_a6')}</p>
              </div>
            </div>
          </div>

          <!-- Item 7: Licensing & General -->
          <div class="faq-item" data-categories="licensing general">
            <button class="faq-trigger" aria-expanded="false">
              <span class="faq-question">${t('faq_q7')}</span>
              <span class="faq-icon-wrapper">
                <span class="faq-icon-line horizontal"></span>
                <span class="faq-icon-line vertical"></span>
              </span>
            </button>
            <div class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p>${t('faq_a7')}</p>
              </div>
            </div>
          </div>

          <!-- Item 8: Integration -->
          <div class="faq-item" data-categories="integration">
            <button class="faq-trigger" aria-expanded="false">
              <span class="faq-question">${t('faq_q8')}</span>
              <span class="faq-icon-wrapper">
                <span class="faq-icon-line horizontal"></span>
                <span class="faq-icon-line vertical"></span>
              </span>
            </button>
            <div class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p>${t('faq_a8')}</p>
              </div>
            </div>
          </div>

          <!-- Item 9: General -->
          <div class="faq-item" data-categories="general">
            <button class="faq-trigger" aria-expanded="false">
              <span class="faq-question">${t('faq_q9')}</span>
              <span class="faq-icon-wrapper">
                <span class="faq-icon-line horizontal"></span>
                <span class="faq-icon-line vertical"></span>
              </span>
            </button>
            <div class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p>${t('faq_a9')}</p>
              </div>
            </div>
          </div>

          <!-- Item 10: Extension -->
          <div class="faq-item" data-categories="extension">
            <button class="faq-trigger" aria-expanded="false">
              <span class="faq-question">${t('faq_q10')}</span>
              <span class="faq-icon-wrapper">
                <span class="faq-icon-line horizontal"></span>
                <span class="faq-icon-line vertical"></span>
              </span>
            </button>
            <div class="faq-answer-wrapper">
              <div class="faq-answer-content">
                <p>${t('faq_a10')}</p>
              </div>
            </div>
          </div>
          
          <!-- No Results Mock Element -->
          <div class="faq-no-results" id="faq-no-results-msg">
            <div class="no-results-icon">🔍</div>
            <h4>${t('faq_no_results_title')}</h4>
            <p>${t('faq_no_results_desc')}</p>
          </div>

        </div>
      </div>
      </section>

      <!-- FAQ bottom curved transition to Light Banner theme -->
      <div class="faq-bottom-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M 0,30 L 180,30 C 280,30 320,80 420,90 L 1020,90 C 1120,90 1160,90 1260,90 L 1440,90 L 1440,120 L 0,120 Z" class="faq-divider-path"></path>
        </svg>
      </div>

      <!-- Section 6: Premium Page-Peel Socials/CTA Banner (White Theme) -->
      <section class="landing-banner-section">
        <div class="peel-banner-container">
          <!-- Left floating avatar + bubble -->
          <div class="floating-avatar-wrap left-wrap">
            <div class="speech-bubble">#snippetui</div>
            <div class="avatar-circle">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80" alt="Developer Avatar" />
            </div>
          </div>

          <!-- Main Contents -->
          <div class="peel-banner-content">
            <h2 class="peel-banner-title">${t('peel_title')}</h2>
            <button class="btn-peel-cta" id="btn-peel-browse">${t('peel_btn')}</button>
          </div>

          <!-- Right floating avatar + bubble -->
          <div class="floating-avatar-wrap right-wrap">
            <div class="speech-bubble">#cssvariables</div>
            <div class="avatar-circle">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80" alt="Developer Avatar" />
            </div>
          </div>

          <!-- Page Peel Effect elements -->
          <div class="peel-cutout"></div>
          <div class="peel-fold"></div>
        </div>
      </section>

      <!-- Banner bottom curved transition to Dark Footer theme -->
      <div class="banner-bottom-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M 0,90 L 180,90 C 280,90 320,70 420,60 L 1020,30 C 1120,20 1160,20 1260,20 L 1440,20 L 1440,120 L 0,120 Z" class="banner-divider-path"></path>
        </svg>
      </div>

      <!-- Footer Section -->
      <footer class="global-footer">
        <div class="footer-container">
          <div class="footer-left">
            <img src="/assets/logo.png" alt="SnippetUI Logo" class="footer-logo-img" />
            <p>${t('footer_desc')}</p>
            <p>${t('footer_copyright')}</p>
            <p style="color: var(--text-secondary);">Created with <span style="color: var(--accent-cyan);">💙</span> by Navish Kumar</p>
          </div>
          
          <div class="footer-links">
            <div class="footer-link-group">
              <h4>${t('footer_products')}</h4>
              <a href="#library" id="footer-link-library">${t('footer_library')}</a>
              <a href="#" style="opacity: 0.5; pointer-events: none;">${t('footer_templates')}</a>
            </div>
            
            <div class="footer-link-group">
              <h4>${t('footer_resources')}</h4>
              <a href="https://github.com/NavishKumar1/Snippetui" target="_blank">GitHub</a>
              <a href="#404" id="footer-link-discord">Discord</a>
              <a href="#404" id="footer-link-twitter">Twitter</a>
            </div>
            
            <div class="footer-link-group">
              <h4>${t('footer_legal')}</h4>
              <a href="#privacy" id="footer-link-privacy">${t('footer_privacy')}</a>
              <a href="#terms" id="footer-link-terms">${t('footer_terms')}</a>
            </div>
          </div>
        </div>
      </footer>

      <!-- Footer Huge Signature Branding -->
      <div class="footer-signature-wrap">
        <h1 class="footer-signature-text">SnippetUI</h1>
      </div>
    </div>
  `;

  return {
    html: htmlContent,
    init: (appContainer) => {
      // 1. Set up navigation triggers
      document.getElementById('hero-btn-browse')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
      });
      document.getElementById('hero-btn-cli')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('cli-guide');
      });
      document.getElementById('btn-peel-browse')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
      });
      document.getElementById('footer-link-library')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
      });
      document.getElementById('footer-link-privacy')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('privacy');
      });
      document.getElementById('footer-link-terms')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('terms');
      });
      document.getElementById('footer-link-discord')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('404');
      });
      document.getElementById('footer-link-twitter')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('404');
      });
      
      // Route extension showcase page buttons
      appContainer.querySelectorAll('.btn-hero-extension, .btn-extension').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          onNavigate('extension');
        });
      });

      // 2. Animated Stats & Counters IntersectionObserver
      const statsSection = appContainer.querySelector('#stats-section');
      const statCards = appContainer.querySelectorAll('.stat-card');

      const animateProgressRings = () => {
        statCards.forEach(card => {
          const ring = card.querySelector('.progress-ring-circle');
          if (ring) {
            const radius = ring.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            ring.style.strokeDasharray = `${circumference}`;
            ring.style.strokeDashoffset = `${circumference}`;
            
            const targetPct = parseInt(card.getAttribute('data-target')) || 100;
            const displayPct = Math.min(100, targetPct);
            
            // Force reflow before applying transition
            ring.getBoundingClientRect();
            ring.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)';
            ring.style.strokeDashoffset = `${circumference - (displayPct / 100) * circumference}`;
          }

          const counter = card.querySelector('.counter-value');
          const targetVal = parseInt(card.getAttribute('data-target'));
          if (counter && targetVal) {
            let startTimestamp = null;
            const duration = 2000; // 2 seconds
            
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              const currentVal = Math.floor(progress * targetVal);
              counter.textContent = currentVal;
              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                counter.textContent = targetVal;
              }
            };
            window.requestAnimationFrame(step);
          }
        });
      };

      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateProgressRings();
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      if (statsSection) statsObserver.observe(statsSection);

            // 3. Scroll-linked pipeline stage morphing and progress
      function updatePipelinePath() {
        const section = appContainer.querySelector('#pipeline-section');
        if (!section) return;

        const steps = appContainer.querySelectorAll('.scroll-step');
        const stages = appContainer.querySelectorAll('.sandbox-stage');
        const windowHeight = window.innerHeight;

        let activeIdx = 0;
        steps.forEach((step, idx) => {
          const stepRect = step.getBoundingClientRect();
          if (stepRect.top < windowHeight * 0.55) {
            activeIdx = idx;
          }
        });

        steps.forEach((step, idx) => {
          const stage = stages[idx];
          if (idx === activeIdx) {
            step.classList.add('active');
            if (stage) {
              stage.classList.add('visible');
              if (idx === 0) runStep1Animation(stage);
              if (idx === 1) runStep2Animation(stage);
              if (idx === 2) runStep3Animation(stage);
            }
          } else {
            step.classList.remove('active');
            if (stage) {
              stage.classList.remove('visible');
              if (idx === 0) resetStep1Animation(stage);
              if (idx === 1) resetStep2Animation(stage);
              if (idx === 2) resetStep3Animation(stage);
            }
          }
        });

        // Compute --scroll-progress for each indicator bar
        steps.forEach((step, idx) => {
          const bar = step.querySelector('.indicator-bar');
          if (!bar) return;
          const rect = step.getBoundingClientRect();
          const startTrigger = windowHeight * 0.55;
          const progress = Math.max(0, Math.min(1, (startTrigger - rect.top) / rect.height));
          bar.style.setProperty('--scroll-progress', `${progress * 100}%`);
        });
      }

      // 4. Scroll-pinned horizontal scroll for category and elite cards (Combined)
      const categoryTrack = appContainer.querySelector('#categories-scroll-track');
      const categoriesRow = appContainer.querySelector('#categories-row');
      const eliteRow = appContainer.querySelector('#elite-row');

      function updateHorizontalScroll() {
        if (!categoryTrack) return;

        const rect = categoryTrack.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate scroll ratio (0 when sticky track top meets top of screen, 1 when sticky track bottom meets bottom of screen)
        const start = rect.top;
        const totalScrollableHeight = rect.height - windowHeight;
        
        if (totalScrollableHeight <= 0) return;

        const scrollRatio = Math.max(0, Math.min(1, -start / totalScrollableHeight));
        
        // Translate Categories Row (Right-to-Left)
        if (categoriesRow) {
          const maxTranslate = categoriesRow.scrollWidth - window.innerWidth;
          if (maxTranslate > 0) {
            categoriesRow.style.transform = `translateX(-${scrollRatio * maxTranslate}px)`;
          } else {
            categoriesRow.style.transform = 'none';
          }
        }

        // Translate Elite Row (Left-to-Right)
        if (eliteRow) {
          const maxTranslate = eliteRow.scrollWidth - window.innerWidth;
          if (maxTranslate > 0) {
            eliteRow.style.transform = `translateX(-${(1 - scrollRatio) * maxTranslate}px)`;
          } else {
            eliteRow.style.transform = 'none';
          }
        }
      }

      // Combine all scroll listeners into a single optimized scroll engine with RAF throttling
      let ticking = false;
      function handleScrollActions() {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updatePipelinePath();
            updateHorizontalScroll();
            ticking = false;
          });
          ticking = true;
        }
      }

      // De-duplicate scroll listeners to avoid memory leaks
      if (window.currentLandingScrollListener) {
        window.removeEventListener('scroll', window.currentLandingScrollListener);
      }
      window.currentLandingScrollListener = handleScrollActions;
      window.addEventListener('scroll', handleScrollActions);
      handleScrollActions(); // Init layout values immediately

      // 5. Category Cards hover and navigation
      const categoryCards = appContainer.querySelectorAll('.category-card');
      categoryCards.forEach(card => {
        card.addEventListener('click', () => {
          const category = card.getAttribute('data-category');
          if (category) {
            onNavigate(`library?category=${category}`);
          }
        });

        // Interactive mouse glow coordinate mapping
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const glow = card.querySelector('.card-glow');
          if (glow) {
            glow.style.background = `radial-gradient(circle 120px at ${x}px ${y}px, rgba(0, 242, 254, 0.15), transparent)`;
          }
        });

        card.addEventListener('mouseleave', () => {
          const glow = card.querySelector('.card-glow');
          if (glow) {
            glow.style.background = 'none';
          }
        });
      });

      // 5.5. Elite Cards hover coordinate mapping (Purple Glows)
      const eliteCards = appContainer.querySelectorAll('.elite-card');
      eliteCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const glow = card.querySelector('.card-glow');
          if (glow) {
            glow.style.background = `radial-gradient(circle 120px at ${x}px ${y}px, rgba(138, 43, 226, 0.15), transparent)`;
          }
        });

        card.addEventListener('mouseleave', () => {
          const glow = card.querySelector('.card-glow');
          if (glow) {
            glow.style.background = 'none';
          }
        });
      });

      // 5. Interactive Playground Customizer
      const sliderGlow = appContainer.querySelector('#slider-glow');
      const sliderRadius = appContainer.querySelector('#slider-radius');
      const sliderBlur = appContainer.querySelector('#slider-blur');
      const sliderSpeed = appContainer.querySelector('#slider-speed');
      const sliderHue = appContainer.querySelector('#slider-hue');

      const labelGlow = appContainer.querySelector('#label-glow');
      const labelRadius = appContainer.querySelector('#label-radius');
      const labelBlur = appContainer.querySelector('#label-blur');
      const labelSpeed = appContainer.querySelector('#label-speed');
      const labelHue = appContainer.querySelector('#label-hue');

      const codeSnippet = appContainer.querySelector('#playground-code-snippet');
      const btnCopyPlaygroundCss = appContainer.querySelector('#btn-copy-playground-css');
      const themeButtons = appContainer.querySelectorAll('.btn-theme');
      const compButtons = appContainer.querySelectorAll('.btn-comp');
      const playgroundDeck = appContainer.querySelector('#playground-deck');
      const previewStage = appContainer.querySelector('.preview-stage');

      let activeComponent = 'card';

      function updatePlayground() {
        const glowVal = sliderGlow ? sliderGlow.value : 40;
        const radiusVal = sliderRadius ? sliderRadius.value : 24;
        const blurVal = sliderBlur ? sliderBlur.value : 12;
        const speedVal = sliderSpeed ? (sliderSpeed.value / 10).toFixed(1) : 1.5;
        const hueVal = sliderHue ? sliderHue.value : 180;

        if (labelGlow) labelGlow.textContent = `${glowVal}%`;
        if (labelRadius) labelRadius.textContent = `${radiusVal}px`;
        if (labelBlur) labelBlur.textContent = `${blurVal}px`;
        if (labelSpeed) labelSpeed.textContent = `${speedVal}s`;
        if (labelHue) labelHue.textContent = `${hueVal}deg`;

        // Apply styles to current preview element
        // Apply styles to preview stage so all children can inherit
        if (previewStage) {
          previewStage.style.setProperty('--card-glow-intensity', `${glowVal / 100}`);
          previewStage.style.setProperty('--card-border-radius', `${radiusVal}px`);
          previewStage.style.setProperty('--card-blur', `${blurVal}px`);
          previewStage.style.setProperty('--card-animation-speed', `${speedVal}s`);
          previewStage.style.setProperty('--card-hue-rotate', `${hueVal}deg`);
        }

        // Generate matching CSS snippet depending on active component
        let cssOutput = '';
        if (activeComponent === 'card') {
          cssOutput = `.premium-glass-card {
  /* Dynamic custom styling variables */
  --card-glow: rgba(0, 242, 254, ${(glowVal / 100).toFixed(2)});
  border-radius: ${radiusVal}px;
  animation: float-pulse ${speedVal}s ease-in-out infinite alternate;
  filter: hue-rotate(${hueVal}deg);

  /* Frost & Glass Core design tokens */
  background: rgba(17, 17, 25, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(${blurVal}px);
  -webkit-backdrop-filter: blur(${blurVal}px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6), 
              0 0 35px var(--card-glow);
}`;
        } else if (activeComponent === 'button') {
          cssOutput = `.premium-glass-button {
  /* Dynamic custom styling variables */
  --button-glow: rgba(0, 242, 254, ${(glowVal / 100).toFixed(2)});
  border-radius: ${radiusVal}px;
  filter: hue-rotate(${hueVal}deg);

  /* Glassmorphism Button styles */
  padding: 16px 36px;
  font-family: 'Outfit', sans-serif;
  color: #ffffff;
  background: rgba(17, 17, 25, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(${blurVal}px);
  -webkit-backdrop-filter: blur(${blurVal}px);
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5),
              0 0 25px var(--button-glow);
  cursor: pointer;
  transition: all 0.3s ease;
}

.premium-glass-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 35px -8px rgba(0, 0, 0, 0.6),
              0 0 30px var(--button-glow);
}`;
        } else if (activeComponent === 'badge') {
          cssOutput = `.premium-glass-badge {
  /* Dynamic custom styling variables */
  --badge-glow: rgba(0, 242, 254, ${(glowVal / 100).toFixed(2)});
  border-radius: ${radiusVal}px;
  filter: hue-rotate(${hueVal}deg);

  /* Glassmorphism Badge styles */
  padding: 12px 28px;
  font-family: 'Fira Code', monospace;
  color: #00f2fe;
  background: rgba(0, 242, 254, 0.05);
  border: 1.5px solid rgba(0, 242, 254, 0.25);
  backdrop-filter: blur(${blurVal}px);
  -webkit-backdrop-filter: blur(${blurVal}px);
  box-shadow: 0 10px 25px -8px rgba(0, 0, 0, 0.4),
              0 0 20px var(--badge-glow);
}`;
        }

        if (codeSnippet) {
          codeSnippet.textContent = cssOutput;
        }
      }

      // Attach event listeners to sliders
      [sliderGlow, sliderRadius, sliderBlur, sliderSpeed, sliderHue].forEach(slider => {
        slider?.addEventListener('input', updatePlayground);
      });

      // Switch active preview component
      compButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          compButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeComponent = btn.getAttribute('data-component') || 'card';

          if (previewStage) {
            if (activeComponent === 'card') {
              previewStage.innerHTML = `
                <div class="preview-card-float-wrap">
                  <div class="custom-premium-card" id="custom-preview-card">
                    <div class="preview-badge">Preview</div>
                    <h4 class="preview-card-title">Responsive Glassmorphic Card</h4>
                    <p>Tweak sliders on the left to see variables apply instantly with smooth, hardware-accelerated transitions.</p>
                    <button class="preview-card-action">Interact</button>
                  </div>
                </div>
              `;
            } else if (activeComponent === 'button') {
              previewStage.innerHTML = `
                <div class="preview-card-float-wrap">
                  <button class="custom-premium-button" id="custom-preview-card">
                    <span>Customize Me</span>
                  </button>
                </div>
              `;
            } else if (activeComponent === 'badge') {
              previewStage.innerHTML = `
                <div class="preview-card-float-wrap">
                  <div class="custom-premium-badge" id="custom-preview-card">
                    <span>PRO EDITION</span>
                  </div>
                </div>
              `;
            }
          }
          updatePlayground();
        });
      });

      // 3D Parallax Tilt mouse movement handlers
      if (previewStage) {
        previewStage.addEventListener('mousemove', (e) => {
          const activeEl = previewStage.querySelector('#custom-preview-card');
          if (!activeEl) return;
          
          const rect = activeEl.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          // Max rotation of 18 degrees
          const rotateX = -(y / (rect.height / 2)) * 18;
          const rotateY = (x / (rect.width / 2)) * 18;
          
          activeEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`;
          
          // Subtle translation shift for the background ambient glow
          const ambientGlow = appContainer.querySelector('#play-ambient-glow');
          if (ambientGlow) {
            ambientGlow.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translate(-50%, -50%)`;
          }
        });
        
        previewStage.addEventListener('mouseleave', () => {
          const activeEl = previewStage.querySelector('#custom-preview-card');
          if (!activeEl) return;
          
          activeEl.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
          
          const ambientGlow = appContainer.querySelector('#play-ambient-glow');
          if (ambientGlow) {
            ambientGlow.style.transform = 'translate(-50%, -50%)';
          }
        });
      }

      // Export copy operation
      btnCopyPlaygroundCss?.addEventListener('click', () => {
        const text = codeSnippet?.textContent || '';
        navigator.clipboard.writeText(text).then(() => {
          const copySpan = btnCopyPlaygroundCss.querySelector('span');
          if (copySpan) {
            copySpan.textContent = t('pipeline_copied_btn');
            setTimeout(() => {
              copySpan.textContent = t('play_copy_css');
            }, 2000);
          }
        });
      });

      // Background theme selection
      themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          themeButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const theme = btn.getAttribute('data-theme');
          if (playgroundDeck) {
            playgroundDeck.className = `playground-preview-deck theme-${theme}`;
          }
        });
      });

      // Init on load
      updatePlayground();

      // --- FAQ Interactive Accordion & Filter/Search Logic ---
      const faqItems = appContainer.querySelectorAll('.faq-item');
      const faqSearchInput = appContainer.querySelector('#faq-search-input');
      const btnFaqSearchClear = appContainer.querySelector('#btn-faq-search-clear');
      const faqFilterButtons = appContainer.querySelectorAll('.btn-faq-filter');
      const faqNoResults = appContainer.querySelector('#faq-no-results-msg');

      let faqSearchQuery = '';
      let faqActiveCategory = 'all';

      // 1. Accordion Toggle Logic (using height transition for high performance)
      faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        trigger?.addEventListener('click', () => {
          const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
          
          // Collapse all other active items
          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
              otherItem.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
            }
          });

          // Toggle current
          if (isExpanded) {
            item.classList.remove('active');
            trigger.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
          }
        });
      });

      // 2. Filter Evaluation
      function filterFaqItems() {
        let visibleCount = 0;
        const query = faqSearchQuery.toLowerCase().trim();

        faqItems.forEach(item => {
          const categoriesAttr = item.getAttribute('data-categories') || '';
          const categories = categoriesAttr.split(' ');
          const questionText = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
          const answerText = item.querySelector('.faq-answer-content p')?.textContent.toLowerCase() || '';

          const matchesCategory = faqActiveCategory === 'all' || categories.includes(faqActiveCategory);
          const matchesSearch = query === '' || questionText.includes(query) || answerText.includes(query);

          if (matchesCategory && matchesSearch) {
            item.classList.remove('faq-hide');
            visibleCount++;
          } else {
            item.classList.add('faq-hide');
            // Ensure collapsed when hidden
            item.classList.remove('active');
            item.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
          }
        });

        if (faqNoResults) {
          if (visibleCount === 0) {
            faqNoResults.classList.add('visible');
          } else {
            faqNoResults.classList.remove('visible');
          }
        }
      }

      // 3. Search events
      faqSearchInput?.addEventListener('input', (e) => {
        faqSearchQuery = e.target.value;
        if (faqSearchQuery.length > 0) {
          btnFaqSearchClear?.classList.add('visible');
        } else {
          btnFaqSearchClear?.classList.remove('visible');
        }
        filterFaqItems();
      });

      btnFaqSearchClear?.addEventListener('click', () => {
        if (faqSearchInput) faqSearchInput.value = '';
        faqSearchQuery = '';
        btnFaqSearchClear.classList.remove('visible');
        filterFaqItems();
        faqSearchInput?.focus();
      });

      // 4. Category Filter tabs click
      faqFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          faqFilterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          faqActiveCategory = btn.getAttribute('data-category') || 'all';
          filterFaqItems();
        });
      });
    },
    destroy: () => {
      if (window.currentLandingScrollListener) {
        window.removeEventListener('scroll', window.currentLandingScrollListener);
        window.currentLandingScrollListener = null;
      }
    }
  };
}
