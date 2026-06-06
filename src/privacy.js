/**
 * SnippetUI - Privacy Policy Page
 * High-quality legal disclosure page detailing user-first security practices
 */

export function renderPrivacy(onNavigate) {
  const htmlContent = `
    <div class="privacy-view-container">
      <!-- Ambient Grid Background -->
      <div class="privacy-grid-bg"></div>
      
      <div class="privacy-content-wrapper">
        
        <!-- Header -->
        <header class="privacy-header">
          <div class="tech-badge">Legal & Privacy</div>
          <h1 class="privacy-title">Privacy Policy</h1>
          <p class="privacy-subtitle">Effective Date: June 5, 2026</p>
          <div class="header-divider"></div>
        </header>

        <!-- Main Content Core -->
        <main class="privacy-body">
          
          <!-- Introduction Card -->
          <div class="privacy-card intro-card">
            <div class="intro-icon">🛡️</div>
            <div class="intro-text">
              <h3>Our Core Philosophy: User-First, Zero Friction</h3>
              <p>
                SnippetUI was designed from the ground up to respect developer privacy. We believe that 
                your code, designs, and workspace configurations belong exclusively to you. This platform 
                <strong>does not collect, store, or transmit your personal data</strong>.
              </p>
            </div>
          </div>

          <!-- Policy Sections -->
          <div class="policy-sections-grid">
            
            <!-- Section 1 -->
            <section class="policy-section">
              <div class="section-num">01</div>
              <h2>Zero Personal Data Collection</h2>
              <p>
                We do not require user accounts, emails, profiles, or registration. SnippetUI operates as a 
                serverless registry showpiece. Consequently, we have no backend databases, user tables, or profile tracking 
                mechanisms. We do not track, process, or sell your copied snippets, text animation settings, or layout choices.
              </p>
            </section>

            <!-- Section 2 -->
            <section class="policy-section">
              <div class="section-num">02</div>
              <h2>Integrations, CDN, & Performance Analytics</h2>
              <p>
                To deliver custom typography (including <em>Inter</em>, <em>Outfit</em>, and <em>Fira Code</em>), optimize content delivery, and analyze site performance and search indexation, SnippetUI integrates standard web telemetry, content delivery networks (CDNs), and diagnostics tools provided by Google.
              </p>
              <p>
                When you access our platform, these integrated services may automatically compile technical log data (such as your IP address, browser configuration, page views, and navigation behavior) in an aggregated, anonymous format. This data is used solely to improve site performance, analyze traffic flow, and ensure optimal service.
              </p>
              <p class="privacy-google-disclosure">
                For detailed disclosures on how this third-party provider manages and processes data, please visit the 
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="privacy-link">
                  Google Privacy Policy <span class="external-arrow">↗</span>
                </a> and the 
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" class="privacy-link">
                  Google Partner Policy <span class="external-arrow">↗</span>
                </a>.
              </p>
            </section>

            <!-- Section 3 -->
            <section class="policy-section">
              <div class="section-num">03</div>
              <h2>Local Caching & Browser Storage</h2>
              <p>
                When you adjust styling configurations in our live customization sandbox, these adjustments (glow intensity, 
                border-radius, theme properties, etc.) are processed locally in your browser memory. We may use standard browser 
                <code>localStorage</code> or <code>sessionStorage</code> layers to cache your workspace variables. This caching 
                remains 100% local to your machine, is never transmitted to our servers, and can be cleared instantly 
                at any time by purging your browser cookies and site data.
              </p>
            </section>

            <!-- Section 4 -->
            <section class="policy-section">
              <div class="section-num">04</div>
              <h2>VS Code Extension Offline Security</h2>
              <p>
                The SnippetUI VS Code Extension is designed to operate locally and offline inside your development environment. 
                It does not read your workspace file trees, index your codebases, or capture keystroke files. The extension runs 
                sandboxed, compiling snippets only when you explicitly select a component to inject. It transmits no logs, telemetry, 
                or source code signatures back to us.
              </p>
            </section>

            <!-- Section 5 -->
            <section class="policy-section">
              <div class="section-num">05</div>
              <h2>Security & Cookie Disclosures</h2>
              <p>
                SnippetUI enforces secure communication protocols to protect your sessions. Because we run a zero-advertising platform, we operate under strict cookie guidelines:
              </p>
              <ul class="privacy-security-list">
                <li>
                  <strong>HTTPS Enforcement:</strong> Secure Socket Layer (SSL/TLS) encryption is actively enforced on all 
                  asset routing and script delivery pathways to prevent data interception.
                </li>
                <li>
                  <strong>Open-Source Auditing:</strong> The entire platform codebase is fully transparent and hosted publicly on 
                  GitHub. Anyone can review, run, or audit the compiler structure for absolute safety compliance.
                </li>
                <li>
                  <strong>No Advertising Cookies:</strong> We deploy absolutely zero third-party advertising cookies, marketing beacons, or cross-site tracking profiles. We utilize standard, privacy-conscious performance analytics and site tools to monitor load speeds and aggregate component page traffic. This data remains non-identifying and is processed in the aggregate to preserve visitor privacy.
                </li>
              </ul>
            </section>

          </div>

          <!-- Bottom Call to Action / Back Button -->
          <div class="privacy-footer-cta">
            <button class="btn-privacy-home" id="btn-privacy-back-home">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 8px;">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Home Page
            </button>
          </div>

        </main>

      </div>
    </div>
  `;

  return {
    html: htmlContent,
    init: (appContainer) => {
      // Setup navigation handler for back button
      const backHomeBtn = appContainer.querySelector('#btn-privacy-back-home');
      backHomeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('landing');
      });
    }
  };
}
