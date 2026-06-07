/**
 * SnippetUI - Privacy Policy Page
 * High-quality legal disclosure page detailing user-first security practices
 */

import { t } from './i18n.js';

export function renderPrivacy(onNavigate) {
  const htmlContent = `
    <div class="privacy-view-container">
      <!-- Ambient Grid Background -->
      <div class="privacy-grid-bg"></div>
      
      <div class="privacy-content-wrapper">
        
        <!-- Header -->
        <header class="privacy-header">
          <div class="tech-badge">${t('privacy_legal_badge')}</div>
          <h1 class="privacy-title">${t('privacy_title')}</h1>
          <p class="privacy-subtitle">${t('privacy_effective_date')}</p>
          <div class="header-divider"></div>
        </header>

        <!-- Main Content Core -->
        <main class="privacy-body">
          
          <!-- Introduction Card -->
          <div class="privacy-card intro-card">
            <div class="intro-icon">🛡️</div>
            <div class="intro-text">
              <h3>${t('privacy_intro_title')}</h3>
              <p>
                ${t('privacy_intro_p')}
              </p>
            </div>
          </div>

          <!-- Policy Sections -->
          <div class="policy-sections-grid">
            
            <!-- Section 1 -->
            <section class="policy-section">
              <div class="section-num">01</div>
              <h2>${t('privacy_sec1_title')}</h2>
              <p>
                ${t('privacy_sec1_p')}
              </p>
            </section>

            <!-- Section 2 -->
            <section class="policy-section">
              <div class="section-num">02</div>
              <h2>${t('privacy_sec2_title')}</h2>
              <p>
                ${t('privacy_sec2_p1')}
              </p>
              <p>
                ${t('privacy_sec2_p2')}
              </p>
              <p class="privacy-google-disclosure">
                ${t('privacy_sec2_google_p')}
              </p>
            </section>

            <!-- Section 3 -->
            <section class="policy-section">
              <div class="section-num">03</div>
              <h2>${t('privacy_sec3_title')}</h2>
              <p>
                ${t('privacy_sec3_p')}
              </p>
            </section>

            <!-- Section 4 -->
            <section class="policy-section">
              <div class="section-num">04</div>
              <h2>${t('privacy_sec4_title')}</h2>
              <p>
                ${t('privacy_sec4_p')}
              </p>
            </section>

            <!-- Section 5 -->
            <section class="policy-section">
              <div class="section-num">05</div>
              <h2>${t('privacy_sec5_title')}</h2>
              <p>
                ${t('privacy_sec5_p')}
              </p>
              <ul class="privacy-security-list">
                <li>
                  ${t('privacy_sec5_li1')}
                </li>
                <li>
                  ${t('privacy_sec5_li2')}
                </li>
                <li>
                  ${t('privacy_sec5_li3')}
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
              ${t('privacy_btn_back')}
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
