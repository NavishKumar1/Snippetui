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
      // 1. Set up main navigation trigger event listeners
      document.getElementById('hero-btn-browse')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
      });
      document.getElementById('footer-link-library')?.addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('library');
      });

    }
  };
}
