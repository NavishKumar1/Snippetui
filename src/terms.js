/**
 * SnippetUI - Terms of Service Page
 * High-quality legal disclosure page detailing user agreements and platform liabilities
 */

export function renderTerms(onNavigate) {
  const htmlContent = `
    <div class="privacy-view-container">
      <!-- Ambient Grid Background -->
      <div class="privacy-grid-bg"></div>
      
      <div class="privacy-content-wrapper">
        
        <!-- Header -->
        <header class="privacy-header">
          <div class="tech-badge">Legal & Terms</div>
          <h1 class="privacy-title">Terms of Service</h1>
          <p class="privacy-subtitle">Effective Date: June 5, 2026</p>
          <div class="header-divider"></div>
        </header>

        <!-- Main Content Core -->
        <main class="privacy-body">
          
          <!-- Introduction Card -->
          <div class="privacy-card intro-card">
            <div class="intro-icon">📄</div>
            <div class="intro-text">
              <h3>Acceptance of Platform Agreements</h3>
              <p>
                By accessing or using the SnippetUI repository showcase, visual customizers, registry indexes, 
                or VS Code Extensions, you agree to be bound by these Terms of Service. If you do not agree to 
                these terms, please terminate your session and cease using our codebase.
              </p>
            </div>
          </div>

          <!-- Terms Sections -->
          <div class="policy-sections-grid">
            
            <!-- Section 1 -->
            <section class="policy-section">
              <div class="section-num">01</div>
              <h2>Open-Source License & Usage</h2>
              <p>
                All modular web components, text animations, dynamic buttons, loaders, docks, and responsive layouts 
                indexed within our repository are open-source software licensed under the terms of the 
                <strong>MIT License</strong>.
              </p>
              <p>
                You are granted a free, non-exclusive, worldwide license to copy, modify, merge, distribute, and compile 
                the snippets into your commercial or personal software packages. No royalty payments, licensing fees, 
                or visual attribution back to SnippetUI is required, although link-backs are appreciated.
              </p>
            </section>

            <!-- Section 2 -->
            <section class="policy-section">
              <div class="section-num">02</div>
              <h2>Proprietary Assets & Intellectual Property</h2>
              <p>
                While the individual code snippets are MIT-licensed, the SnippetUI brand identity, logos, custom graphics, 
                website text content, compilation databases, visual layout of the showcase directory, and design aesthetics 
                remain the exclusive proprietary property of SnippetUI.
              </p>
              <p>
                You may not clone, scrape, or republish the core SnippetUI web application or its promotional materials 
                to create a competing component library directory or distribute it under the SnippetUI trademark.
              </p>
            </section>

            <!-- Section 3 -->
            <section class="policy-section">
              <div class="section-num">03</div>
              <h2>Disclaimer of Warranties ("AS IS")</h2>
              <p>
                THE PLATFORM, REGISTRY INDEXES, INTEGRATED STYLESHEETS, AND VS CODE EXTENSIONS ARE PROVIDED 
                <strong>"AS IS"</strong> AND <strong>"AS AVAILABLE"</strong>, WITHOUT WARRANTY OF ANY KIND, 
                EXPRESS OR IMPLIED.
              </p>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SNIPPETUI DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT 
                LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, COMPATIBILITY, NON-INFRINGEMENT, AND FITNESS FOR A 
                PARTICULAR PURPOSE. WE DO NOT WARRANT THAT CODE INJECTIONS WILL COMPILE FLAWLESSLY IN ALL DEVELOPMENT ENVIRONMENT 
                DOCKS, NOR THAT STYLES ARE COMPATIBLE WITH ALL LEGACY BROWSER VIEWPORTS.
              </p>
            </section>

            <!-- Section 4 -->
            <section class="policy-section">
              <div class="section-num">04</div>
              <h2>Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL SNIPPETUI, ITS DEVELOPERS, CONTRIBUTING AUTHORS, OR OWNERS BE LIABLE FOR ANY DAMAGES, 
                INCLUDING BUT NOT LIMITED TO SPECIAL, INCIDENTAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES ARISING OUT OF 
                OR IN CONNECTION WITH THE SOFTWARE, INGESTED SCRIPTS, WEBSITE OUTAGE, OR DATA OUTCOMES.
              </p>
              <p>
                You assume full responsibility for auditing, testing, and verifying the security and structural integrity of 
                any HTML, CSS, or Javascript snippets before deploying them into production databases or active client platforms.
              </p>
            </section>

            <!-- Section 5 -->
            <section class="policy-section">
              <div class="section-num">05</div>
              <h2>External Resources & CDN Dependencies</h2>
              <p>
                SnippetUI contains integrations with third-party delivery nodes (such as Google Fonts CDNs, GitHub repositories, 
                and the Visual Studio Code Extension Marketplace). We do not control, monitor, or assume liability for 
                the uptime, policies, API changes, or privacy disclosures of these external platforms. Your interactions 
                with them are subject to their respective terms of use.
              </p>
            </section>

          </div>

          <!-- Bottom Call to Action / Back Button -->
          <div class="privacy-footer-cta">
            <button class="btn-privacy-home" id="btn-terms-back-home">
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
      const backHomeBtn = appContainer.querySelector('#btn-terms-back-home');
      backHomeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('landing');
      });
    }
  };
}
