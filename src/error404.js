/**
 * SnippetUI - 404 Error Page
 * Highly visual retro-future error layout featuring glitch effects and launch notifications
 */

export function render404(onNavigate) {
  const htmlContent = `
    <div class="error-view-container">
      <!-- Ambient Cyber Grid Background -->
      <div class="error-grid-bg"></div>
      
      <!-- Interactive Glitch & Text Content -->
      <div class="error-content-wrapper">
        
        <div class="glitch-wrapper">
          <div class="glitch-text" data-text="404">404</div>
        </div>

        <h1 class="error-title">RESOURCE NOT FOUND</h1>
        <p class="error-subtitle">The requested coordinates have drifted into deep space.</p>
        
        <!-- Community Notice Card -->
        <div class="error-notice-card">
          <div class="notice-header">
            <span class="notice-pulsing-dot"></span>
            <span class="notice-badge">Launch Status Notice</span>
          </div>
          <h3>Official Community Launch Notice</h3>
          <p>
            If you arrived here by clicking our **Discord** or **Twitter** buttons, please note that 
            our official community servers are currently being styled and configured for release. We are 
            preparing to launch these spaces very soon!
          </p>
          <p class="notice-subtext">
            Stay tuned on our GitHub repository for code updates and release milestones.
          </p>
        </div>

        <!-- Back Button -->
        <div class="error-actions">
          <button class="btn-error-home" id="btn-error-back-home">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right: 8px;">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Return to Landing
          </button>
        </div>

      </div>
    </div>
  `;

  return {
    html: htmlContent,
    init: (appContainer) => {
      // Setup navigation handler for back button
      const backHomeBtn = appContainer.querySelector('#btn-error-back-home');
      backHomeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('landing');
      });
    }
  };
}
