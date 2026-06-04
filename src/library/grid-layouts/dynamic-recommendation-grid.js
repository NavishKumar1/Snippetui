/**
 * Component: Dynamic Recommendation Grid
 * Category: grid-layouts
 */

export const component = {
  id: 'dynamic-recommendation-grid',
  name: 'Dynamic Recommendation Grid',
  category: 'grid-layouts',
  tag: 'Premium',
  html: `<div class="drg-wrapper">
  <div class="drg-container">
    <div class="drg-header">
      <h2>Recommended For You</h2>
      <p>Because you played <strong>Cybernetic Overdrive</strong></p>
      <button class="drg-refresh">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
        Refresh Algorithm
      </button>
    </div>
    
    <!-- AI-Powered looking grid -->
    <div class="drg-grid" id="drg-grid-target">
      <!-- 
        The layout uses a specific asymmetrical grid tailored for discovery.
        1 large focal card, 2 medium, and 4 small data points.
      -->
      <div class="drg-card drg-focus">
        <div class="drg-badge drg-match">98% Match</div>
        <div class="drg-media" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop');"></div>
        <div class="drg-content">
          <h3>Neon Syndicate</h3>
          <p>You love open-world sci-fi RPGs. This shares the exact same core mechanics.</p>
        </div>
      </div>
      
      <div class="drg-card drg-medium">
        <div class="drg-badge">Friends Play</div>
        <div class="drg-media" style="background-image: url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop');"></div>
        <div class="drg-content">
          <h3>Arcade Legends</h3>
        </div>
      </div>
      
      <div class="drg-card drg-medium">
        <div class="drg-badge drg-trending">Trending</div>
        <div class="drg-media" style="background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop');"></div>
        <div class="drg-content">
          <h3>VR Horizon</h3>
        </div>
      </div>
      
      <!-- Small data point cards -->
      <div class="drg-card drg-small drg-text-only">
        <div class="drg-content">
          <span class="drg-icon">🧠</span>
          <h4>AI Insight</h4>
          <p>You play mostly between 10PM and 2AM. Dark mode UI is preferred.</p>
        </div>
      </div>
      
      <div class="drg-card drg-small drg-text-only">
        <div class="drg-content">
          <span class="drg-icon">👥</span>
          <h4>Social Link</h4>
          <p>4 friends recently bought Stellar Explorer.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Dynamic Recommendation Grid Logic
const refreshBtn = document.querySelector('.drg-refresh');
const drgGrid = document.getElementById('drg-grid-target');

if(refreshBtn && drgGrid) {
  refreshBtn.addEventListener('click', () => {
    // Add spinning animation to icon
    const svg = refreshBtn.querySelector('svg');
    svg.style.transition = 'transform 0.5s';
    svg.style.transform = 'rotate(360deg)';
    
    // Simulate re-calculating recommendations
    drgGrid.style.opacity = '0';
    drgGrid.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      // Reset grid view
      drgGrid.style.opacity = '1';
      drgGrid.style.transform = 'scale(1)';
      
      // Reset icon
      setTimeout(() => {
        svg.style.transition = 'none';
        svg.style.transform = 'rotate(0deg)';
      }, 500);
    }, 600);
  });
}`,
  ts: `// Dynamic Recommendation Grid Logic (TypeScript)
const refreshBtn = document.querySelector<HTMLButtonElement>('.drg-refresh');
const drgGrid = document.getElementById('drg-grid-target');

if(refreshBtn && drgGrid) {
  refreshBtn.addEventListener('click', () => {
    const svg = refreshBtn.querySelector('svg');
    if(svg) {
      svg.style.transition = 'transform 0.5s';
      svg.style.transform = 'rotate(360deg)';
    }
    
    drgGrid.style.opacity = '0';
    drgGrid.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      drgGrid.style.opacity = '1';
      drgGrid.style.transform = 'scale(1)';
      
      setTimeout(() => {
        if(svg) {
          svg.style.transition = 'none';
          svg.style.transform = 'rotate(0deg)';
        }
      }, 500);
    }, 600);
  });
}`,
  css: `/* Dynamic Recommendation Grid Styles */
.drg-wrapper {
  background: linear-gradient(135deg, #0b0f19 0%, #161b2a 100%);
  color: #fff;
  font-family: system-ui, sans-serif;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
}

.drg-container {
  width: 100%;
  max-width: 1200px;
}

.drg-header {
  margin-bottom: 40px;
  position: relative;
}

.drg-header h2 {
  font-size: 2rem;
  margin: 0 0 5px 0;
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.drg-header p {
  color: #94a3b8;
  margin: 0;
}

.drg-header strong {
  color: #e2e8f0;
}

.drg-refresh {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
  color: #38bdf8;
  padding: 8px 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.drg-refresh:hover {
  background: rgba(56, 189, 248, 0.2);
}

/* 
  Asymmetrical Recommendation Layout 
  Using a dense grid system for a packed, Spotify/Netflix discovery feel.
*/
.drg-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 150px;
  gap: 20px;
  transition: opacity 0.5s, transform 0.5s;
}

.drg-card {
  background: #1e293b;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid rgba(255,255,255,0.05);
}

.drg-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  border-color: rgba(255,255,255,0.1);
}

/* Grid Sizing */
.drg-focus {
  grid-column: span 2;
  grid-row: span 2;
}

.drg-medium {
  grid-column: span 1;
  grid-row: span 2;
}

.drg-small {
  grid-column: span 1;
  grid-row: span 1;
}

.drg-media {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
}

.drg-media::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0) 100%);
}

.drg-content {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 24px;
  z-index: 2;
}

.drg-text-only .drg-content {
  position: relative;
  height: 100%;
  background: #1e293b; /* Fallback for no image */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.drg-icon {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.drg-card h3 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
}

.drg-focus h3 {
  font-size: 2rem;
}

.drg-text-only h4 {
  margin: 0 0 5px 0;
  color: #38bdf8;
}

.drg-card p {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.5;
}

.drg-badge {
  position: absolute;
  top: 16px; left: 16px;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 2;
}

.drg-match { background: #10b981; color: #fff; }
.drg-trending { background: #f59e0b; color: #fff; }

/* Responsive */
@media (max-width: 900px) {
  .drg-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .drg-refresh {
    position: relative;
    margin-top: 16px;
    width: fit-content;
  }
}

@media (max-width: 600px) {
  .drg-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .drg-card {
    grid-column: span 1 !important;
    min-height: 250px;
  }
  .drg-text-only {
    min-height: 150px;
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design an AI-powered Dynamic Recommendation Grid that intelligently adapts content presentation using asymmetrical, visually interesting grid arrangements.`
};
