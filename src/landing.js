/**
 * SnippetUI - Landing Page Component
 */

export function renderLanding(onNavigate) {
  // Returns HTML structure for the landing page
  const htmlContent = `
    <div class="landing-view">
      <!-- Hero Section -->
      <section class="hero-section">
        <!-- Left Column: Content -->
        <div class="hero-content-left">
          <div class="hero-badge">
            <span class="badge-dot"></span>
            100+ Styles created
          </div>
          
          <h1 class="hero-title">
            Find your vibe<br/>We'll <span>code it right</span>
          </h1>
          
          <p class="hero-subtitle">
            Turn your components into the look you love, without any guesswork. Frosted glassmorphism, animated capsule elements, glowing gradient borders, and mesmerizing micro-animations.
          </p>
          
          <div class="hero-actions">
            <a href="#library" class="btn-hero-primary" id="hero-btn-browse">
              Browse Components
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-left: 6px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="https://marketplace.visualstudio.com" target="_blank" class="btn-hero-secondary btn-hero-extension">
              Get Extension
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-left: 6px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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
              <p class="stat-label">Premium Components</p>
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
              <p class="stat-label">Execution Time</p>
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
              <p class="stat-label">Free & Open-Source</p>
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
              <p class="stat-label">Seamless Customization</p>
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

      <!-- Section 2: Visual "How It Works" Pipeline -->
      <section class="landing-pipeline-section" id="pipeline-section">
        <div class="section-header">
          <div class="tech-badge">Pipeline</div>
          <h2 class="section-title">How It Works</h2>
          <p class="section-subtitle">Get production-ready components integrated into your project in three seconds flat.</p>
        </div>

        <div class="pipeline-container">
          <!-- Scroll Tracer SVG -->
          <div class="pipeline-line-wrapper">
            <svg class="pipeline-svg" viewBox="0 0 100 600" preserveAspectRatio="none">
              <!-- Background Path -->
              <path class="pipeline-path-bg" d="M 50 0 L 50 600" />
              <!-- Animated Glowing Active Path -->
              <path class="pipeline-path-active" id="pipeline-active-path" d="M 50 0 L 50 600" />
            </svg>
          </div>

          <div class="pipeline-steps">
            
            <div class="pipeline-step" id="step-discover">
              <div class="step-marker">
                <span class="step-num">1</span>
                <div class="marker-pulse"></div>
              </div>
              <div class="step-card">
                <div class="step-card-content">
                  <div class="step-icon">🔍</div>
                  <h3>1. Discover</h3>
                  <p>Browse through hundreds of highly responsive, glassmorphism UI components designed for immediate, copy-paste deployment.</p>
                </div>
                <div class="step-card-preview">
                  <div class="preview-discover-search">
                    <div class="mock-search-bar">
                      <span class="mock-search-icon">🔍</span>
                      <span class="mock-search-text"></span>
                      <span class="mock-search-cursor">|</span>
                    </div>
                    <div class="mock-search-results">
                      <div class="mock-result-card">
                        <div class="mock-card-glow"></div>
                        <div class="mock-card-icon">✨</div>
                        <div class="mock-card-title">Glassmorphism Card</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pipeline-step" id="step-copy">
              <div class="step-marker">
                <span class="step-num">2</span>
                <div class="marker-pulse"></div>
              </div>
              <div class="step-card">
                <div class="step-card-content">
                  <div class="step-icon">📋</div>
                  <h3>2. Copy</h3>
                  <p>Grab modular, lightweight vanilla HTML and CSS variables configuration with one single click. No bloated framework dependencies required.</p>
                </div>
                <div class="step-card-preview">
                  <div class="preview-copy-snippet">
                    <div class="mock-code-editor">
                      <div class="editor-header">
                        <span class="editor-dot red"></span>
                        <span class="editor-dot yellow"></span>
                        <span class="editor-dot green"></span>
                        <span class="editor-title">style.css</span>
                      </div>
                      <pre class="editor-code"><code><span class="token-selector">.card-glass</span> {
  <span class="token-property">backdrop-filter</span>: <span class="token-value">blur(12px)</span>;
  <span class="token-property">background</span>: <span class="token-value">rgba(255,255,255,0.1)</span>;
}</code></pre>
                      <button class="mock-copy-btn">
                        <span class="copy-icon">📋</span>
                        <span class="copy-text"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pipeline-step" id="step-deploy">
              <div class="step-marker">
                <span class="step-num">3</span>
                <div class="marker-pulse"></div>
              </div>
              <div class="step-card">
                <div class="step-card-content">
                  <div class="step-icon">🚀</div>
                  <h3>3. Deploy</h3>
                  <p>Paste the code blocks into your stylesheet and markup directly. Your components inherit variables dynamically and compile in &lt; 1ms.</p>
                </div>
                <div class="step-card-preview">
                  <div class="preview-deploy-stage">
                    <div class="mock-browser-window">
                      <div class="browser-header">
                        <span class="browser-dot red"></span>
                        <span class="browser-dot yellow"></span>
                        <span class="browser-dot green"></span>
                        <div class="browser-address">localhost:3000</div>
                      </div>
                      <div class="browser-body">
                        <div class="mock-app-wireframe">
                          <div class="wireframe-nav">
                            <div class="wireframe-nav-logo"></div>
                            <div class="wireframe-nav-links">
                              <span></span><span></span>
                            </div>
                          </div>
                          <div class="wireframe-hero">
                            <div class="wireframe-line long"></div>
                            <div class="wireframe-line short"></div>
                            <div class="mock-deploy-btn-wrapper">
                              <div class="mock-deployed-btn">⚡ Inserted!</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
            <div class="tech-badge">Categories</div>
            <h2 class="section-title">Explore Featured Categories</h2>
            <p class="section-subtitle">Scroll to explore our main component collections side-by-side.</p>
          </div>

          <div class="categories-row-container">
            <div class="categories-row" id="categories-row">
              
              <div class="category-card" data-category="text-animation">
                <div class="card-glow"></div>
                <div class="category-card-icon">✍️</div>
                <h3>Text Animations</h3>
                <p>Glassmorphic text gradients, neon glows, typing terminals, and sliding text reveals.</p>
                <span class="card-arrow">Explore Category →</span>
              </div>

              <div class="category-card" data-category="buttons">
                <div class="card-glow"></div>
                <div class="category-card-icon">⚡</div>
                <h3>Dynamic Buttons</h3>
                <p>Liquid gradients, magnetic gravity triggers, elastic press ripples, and particles.</p>
                <span class="card-arrow">Explore Category →</span>
              </div>

              <div class="category-card" data-category="page-transitions">
                <div class="card-glow"></div>
                <div class="category-card-icon">🔄</div>
                <h3>Page Transitions</h3>
                <p>Frosted scroll-linked stacks, liquid sweeps, and cascading grid reveal animations.</p>
                <span class="card-arrow">Explore Category →</span>
              </div>

              <div class="category-card" data-category="loaders">
                <div class="card-glow"></div>
                <div class="category-card-icon">🌀</div>
                <h3>Premium Loaders</h3>
                <p>Soundwave amplitude gauges, DNA strand helices, and orbital quantum progress rings.</p>
                <span class="card-arrow">Explore Category →</span>
              </div>

              <div class="category-card" data-category="dock-navigations">
                <div class="card-glow"></div>
                <div class="category-card-icon">💻</div>
                <h3>Capsule Docks</h3>
                <p>Xbox-inspired dashboard bars, minimal streaming headers, and dynamic OS docks.</p>
                <span class="card-arrow">Explore Category →</span>
              </div>

            </div>
          </div>

          <div class="elite-row-container">
            <div class="elite-row" id="elite-row">
              
              <div class="elite-card">
                <div class="card-glow"></div>
                <div class="elite-card-icon">💫</div>
                <h3>Micro-Animations</h3>
                <p>Supercharged hover animations, magnetic snaps, and organic ripple interactions built using pure, performant CSS.</p>
              </div>

              <div class="elite-card">
                <div class="card-glow"></div>
                <div class="elite-card-icon">📦</div>
                <h3>Zero Dependencies</h3>
                <p>Clean, framework-agnostic HTML and CSS files. Drop them into React, Svelte, Vue, or HTML templates instantly.</p>
              </div>

              <div class="elite-card">
                <div class="card-glow"></div>
                <div class="elite-card-icon">🔮</div>
                <h3>Radiant Neon Glows</h3>
                <p>Highly customizable glows and border drop-shadows optimized for high refresh-rate monitors.</p>
              </div>

              <div class="elite-card">
                <div class="card-glow"></div>
                <div class="elite-card-icon">♿</div>
                <h3>Strict Accessibility</h3>
                <p>Semantic markup structures and ARIA roles implemented out-of-the-box for beautiful, screen-reader friendly designs.</p>
              </div>

              <div class="elite-card">
                <div class="card-glow"></div>
                <div class="elite-card-icon">🧪</div>
                <h3>CSS Custom Variables</h3>
                <p>Exposes clear CSS Custom Properties (--glow-color, --radius) to allow fast styling adjustments directly in your stylesheet.</p>
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
              <div class="tech-badge">VS Code Integration</div>
              <h2 class="section-title">Access Snippets Instantly Anywhere You Code</h2>
              <p class="section-subtitle">Our official VS Code extension brings the entire SnippetUI library of premium glassmorphic components right into your editor. Search, preview, and insert code blocks with a single shortcut.</p>
              
              <div class="extension-features-list">
                <div class="extension-feature-item">
                  <span class="feature-check">✓</span>
                  <span>1-Click Code Injection directly into files</span>
                </div>
                <div class="extension-feature-item">
                  <span class="feature-check">✓</span>
                  <span>Global Variable Sync with your CSS design tokens</span>
                </div>
                <div class="extension-feature-item">
                  <span class="feature-check">✓</span>
                  <span>Support for Vanilla HTML/CSS, React, Vue, & Svelte</span>
                </div>
              </div>

              <a href="https://marketplace.visualstudio.com" target="_blank" class="btn-extension">
                <span>Get VS Code Extension</span>
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
          <div class="tech-badge">Interactive Playground</div>
          <h2 class="section-title">Live Customizer</h2>
          <p class="section-subtitle">Tweak CSS customization tokens in real-time and export production-ready code dynamically.</p>
        </div>

        <div class="playground-panel">
          <!-- Controls Panel (Left) -->
          <div class="playground-controls">
            <h3>Style Variables</h3>
            
            <div class="component-selector-group">
              <label>Select Component</label>
              <div class="component-buttons">
                <button class="btn-comp active" data-component="card">Card</button>
                <button class="btn-comp" data-component="button">Button</button>
                <button class="btn-comp" data-component="badge">Badge</button>
              </div>
            </div>

            <div class="control-group">
              <label>Glow Intensity: <span id="label-glow">40%</span></label>
              <input type="range" id="slider-glow" min="0" max="100" value="40" class="premium-slider" />
            </div>

            <div class="control-group">
              <label>Border Radius: <span id="label-radius">24px</span></label>
              <input type="range" id="slider-radius" min="0" max="50" value="24" class="premium-slider" />
            </div>

            <div class="control-group">
              <label>Backdrop Blur: <span id="label-blur">12px</span></label>
              <input type="range" id="slider-blur" min="0" max="40" value="12" class="premium-slider" />
            </div>

            <div class="control-group">
              <label>Animation Speed: <span id="label-speed">1.5s</span></label>
              <input type="range" id="slider-speed" min="5" max="30" value="15" class="premium-slider" />
            </div>

            <div class="control-group">
              <label>Color Hue Shift: <span id="label-hue">180deg</span></label>
              <input type="range" id="slider-hue" min="0" max="360" value="180" class="premium-slider" />
            </div>
            
            <div class="theme-selector-group">
              <label>Ambient Backdrop Theme</label>
              <div class="theme-buttons">
                <button class="btn-theme active" data-theme="dark">Deep Nebula</button>
                <button class="btn-theme" data-theme="cyber">Cyber Grid</button>
                <button class="btn-theme" data-theme="glass">Pure Frost</button>
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
                  <div class="preview-badge">Preview</div>
                  <h4 class="preview-card-title">Responsive Glassmorphic Card</h4>
                  <p>Tweak sliders on the left to see variables apply instantly with smooth, hardware-accelerated transitions.</p>
                  <button class="preview-card-action">Interact</button>
                </div>
              </div>
            </div>

            <!-- Generated CSS Export box -->
            <div class="export-code-box">
              <div class="export-header">
                <span>generated-styles.css</span>
                <button class="btn-copy-export" id="btn-copy-playground-css">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  <span>Copy CSS</span>
                </button>
              </div>
              <pre class="code-display" id="playground-code-snippet"><code>/* CSS Output Loading... */</code></pre>
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
              <a href="https://github.com/NavishKumar1/Snippetui" target="_blank">GitHub</a>
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
      document.getElementById('footer-link-library')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
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

      // 3. Scroll-linked SVG Path filling for pipeline
      const activePath = appContainer.querySelector('#pipeline-active-path');
      let pathLength = 0;
      if (activePath) {
        pathLength = activePath.getTotalLength();
        activePath.style.strokeDasharray = `${pathLength}`;
        activePath.style.strokeDashoffset = `${pathLength}`;
      }

      function updatePipelinePath() {
        const section = appContainer.querySelector('#pipeline-section');
        if (!section || !activePath) return;

        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate scroll ratio
        const start = rect.top - windowHeight * 0.4;
        const totalHeight = rect.height;
        const scrollRatio = Math.max(0, Math.min(1, -start / (totalHeight - windowHeight * 0.5)));

        activePath.style.strokeDashoffset = `${pathLength * (1 - scrollRatio)}`;

        // Highlight pipeline markers
        const steps = appContainer.querySelectorAll('.pipeline-step');
        steps.forEach((step, idx) => {
          const stepRect = step.getBoundingClientRect();
          if (stepRect.top < windowHeight * 0.6) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
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

      // Combine all scroll listeners into a single optimized scroll engine
      function handleScrollActions() {
        updatePipelinePath();
        updateHorizontalScroll();
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
            copySpan.textContent = 'Copied!';
            setTimeout(() => {
              copySpan.textContent = 'Copy CSS';
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
    },
    destroy: () => {
      if (window.currentLandingScrollListener) {
        window.removeEventListener('scroll', window.currentLandingScrollListener);
        window.currentLandingScrollListener = null;
      }
    }
  };
}
