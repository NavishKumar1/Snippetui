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
      </section>

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
                <div class="step-icon">🔍</div>
                <h3>1. Discover</h3>
                <p>Browse through hundreds of highly responsive, glassmorphism UI components designed for immediate, copy-paste deployment.</p>
              </div>
            </div>

            <div class="pipeline-step" id="step-copy">
              <div class="step-marker">
                <span class="step-num">2</span>
                <div class="marker-pulse"></div>
              </div>
              <div class="step-card">
                <div class="step-icon">📋</div>
                <h3>2. Copy</h3>
                <p>Grab modular, lightweight vanilla HTML and CSS variables configuration with one single click. No bloated framework dependencies required.</p>
              </div>
            </div>

            <div class="pipeline-step" id="step-deploy">
              <div class="step-marker">
                <span class="step-num">3</span>
                <div class="marker-pulse"></div>
              </div>
              <div class="step-card">
                <div class="step-icon">🚀</div>
                <h3>3. Deploy</h3>
                <p>Paste the code blocks into your stylesheet and markup directly. Your components inherit variables dynamically and compile in &lt; 1ms.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

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
                <p>Exposes clear CSS Custom Properties (\`--glow-color\`, \`--radius\`) to allow fast styling adjustments directly in your stylesheet.</p>
              </div>

            </div>
          </div>

        </div>
      </section>

      <!-- Section 4: Live Styling Playground -->
      <section class="landing-playground-section">
        <div class="section-header">
          <div class="tech-badge">Interactive Playground</div>
          <h2 class="section-title">Live Customizer</h2>
          <p class="section-subtitle">Tweak CSS customization tokens in real-time and export production-ready code dynamically.</p>
        </div>

        <div class="playground-panel">
          <!-- Controls Panel (Left) -->
          <div class="playground-controls">
            <h3>Style Variables</h3>
            
            <div class="control-group">
              <label>Glow Intensity: <span id="label-glow">40%</span></label>
              <input type="range" id="slider-glow" min="0" max="100" value="40" class="premium-slider" />
            </div>

            <div class="control-group">
              <label>Border Radius: <span id="label-radius">24px</span></label>
              <input type="range" id="slider-radius" min="0" max="50" value="24" class="premium-slider" />
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
              <!-- Live customizable component -->
              <div class="custom-premium-card" id="custom-preview-card">
                <div class="preview-badge">Preview</div>
                <h4 class="preview-card-title">Responsive Glassmorphic Card</h4>
                <p>Tweak sliders on the left to see variables apply instantly with smooth, hardware-accelerated transitions.</p>
                <button class="preview-card-action">Interact</button>
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
      const sliderSpeed = appContainer.querySelector('#slider-speed');
      const sliderHue = appContainer.querySelector('#slider-hue');

      const labelGlow = appContainer.querySelector('#label-glow');
      const labelRadius = appContainer.querySelector('#label-radius');
      const labelSpeed = appContainer.querySelector('#label-speed');
      const labelHue = appContainer.querySelector('#label-hue');

      const previewCard = appContainer.querySelector('#custom-preview-card');
      const codeSnippet = appContainer.querySelector('#playground-code-snippet');
      const btnCopyPlaygroundCss = appContainer.querySelector('#btn-copy-playground-css');
      const themeButtons = appContainer.querySelectorAll('.btn-theme');
      const playgroundDeck = appContainer.querySelector('#playground-deck');

      function updatePlayground() {
        const glowVal = sliderGlow ? sliderGlow.value : 40;
        const radiusVal = sliderRadius ? sliderRadius.value : 24;
        const speedVal = sliderSpeed ? (sliderSpeed.value / 10).toFixed(1) : 1.5;
        const hueVal = sliderHue ? sliderHue.value : 180;

        if (labelGlow) labelGlow.textContent = `${glowVal}%`;
        if (labelRadius) labelRadius.textContent = `${radiusVal}px`;
        if (labelSpeed) labelSpeed.textContent = `${speedVal}s`;
        if (labelHue) labelHue.textContent = `${hueVal}deg`;

        // Apply styles to preview card
        if (previewCard) {
          previewCard.style.setProperty('--card-glow-intensity', `${glowVal / 100}`);
          previewCard.style.setProperty('--card-border-radius', `${radiusVal}px`);
          previewCard.style.setProperty('--card-animation-speed', `${speedVal}s`);
          previewCard.style.setProperty('--card-hue-rotate', `${hueVal}deg`);
        }

        // Generate matching CSS snippet
        const cssOutput = `.premium-glass-card {
  /* Dynamic custom styling variables */
  --card-glow: rgba(0, 242, 254, ${(glowVal / 100).toFixed(2)});
  border-radius: ${radiusVal}px;
  animation: float-pulse ${speedVal}s ease-in-out infinite;
  filter: hue-rotate(${hueVal}deg);

  /* Frost & Glass Core design tokens */
  background: rgba(17, 17, 25, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 
              0 0 30px var(--card-glow);
}`;
        if (codeSnippet) {
          codeSnippet.textContent = cssOutput;
        }
      }

      // Attach event listeners to sliders
      [sliderGlow, sliderRadius, sliderSpeed, sliderHue].forEach(slider => {
        slider?.addEventListener('input', updatePlayground);
      });

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
    }
  };
}
