/**
 * SnippetUI - Terms of Service Page
 * High-quality legal disclosure page detailing user agreements and platform liabilities
 */

import { t } from './i18n.js';

export function renderTerms(onNavigate) {
  const htmlContent = `
    <div class="privacy-view-container">
      <!-- Ambient Grid Background -->
      <div class="privacy-grid-bg"></div>
      
      <div class="privacy-content-wrapper">
        
        <!-- Header -->
        <header class="privacy-header">
          <div class="tech-badge">${t('terms_legal_badge')}</div>
          <h1 class="privacy-title">${t('terms_title')}</h1>
          <p class="privacy-subtitle">${t('terms_effective_date')}</p>
          <div class="header-divider"></div>
        </header>

        <!-- Main Content Core -->
        <main class="privacy-body">
          
          <!-- Introduction Card -->
          <div class="privacy-card intro-card">
            <div class="intro-icon">📄</div>
            <div class="intro-text">
              <h3>${t('terms_intro_title')}</h3>
              <p>
                ${t('terms_intro_p')}
              </p>
            </div>
          </div>

          <!-- Terms Sections -->
          <div class="policy-sections-grid">
            
            <!-- Section 1 -->
            <section class="policy-section">
              <div class="section-num">01</div>
              <h2>${t('terms_sec1_title')}</h2>
              <p>
                ${t('terms_sec1_p1')}
              </p>
              <p>
                ${t('terms_sec1_p2')}
              </p>
            </section>

            <!-- Section 2 -->
            <section class="policy-section">
              <div class="section-num">02</div>
              <h2>${t('terms_sec2_title')}</h2>
              <p>
                ${t('terms_sec2_p1')}
              </p>
              <p>
                ${t('terms_sec2_p2')}
              </p>
            </section>

            <!-- Section 3 -->
            <section class="policy-section">
              <div class="section-num">03</div>
              <h2>${t('terms_sec3_title')}</h2>
              <p>
                ${t('terms_sec3_p1')}
              </p>
              <p>
                ${t('terms_sec3_p2')}
              </p>
            </section>

            <!-- Section 4 -->
            <section class="policy-section">
              <div class="section-num">04</div>
              <h2>${t('terms_sec4_title')}</h2>
              <p>
                ${t('terms_sec4_p1')}
              </p>
              <p>
                ${t('terms_sec4_p2')}
              </p>
            </section>

            <!-- Section 5 -->
            <section class="policy-section">
              <div class="section-num">05</div>
              <h2>${t('terms_sec5_title')}</h2>
              <p>
                ${t('terms_sec5_p1')}
              </p>
              <p>
                ${t('terms_sec5_p2')}
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
              ${t('terms_btn_back')}
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
