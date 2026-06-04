/**
 * Component: Bento Grid (Apple Style)
 * Category: grid-layouts
 */

export const component = {
  id: 'bento-grid',
  name: 'Bento Grid',
  category: 'grid-layouts',
  tag: 'Premium',
  html: `<div class="bento-wrapper">
  <div class="bento-container">
    <div class="bento-header">
      <h2>Your Gaming Hub</h2>
      <p>Everything you need, perfectly arranged.</p>
    </div>
    
    <div class="bento-grid">
      <!-- Top Row: Large Feature + 2 Small -->
      <div class="bento-box bento-large bento-image" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop');">
        <div class="bento-content bento-dark">
          <span class="bento-tag">PLAYING NOW</span>
          <h3>Cybernetic Overdrive</h3>
          <p>54 Hours Played • Last played 2 hours ago</p>
        </div>
      </div>
      
      <div class="bento-box bento-small bento-gradient-1">
        <div class="bento-content">
          <span class="bento-icon">🏆</span>
          <h3>Achievements</h3>
          <div class="bento-stat">124</div>
          <p>Top 5% of players</p>
        </div>
      </div>
      
      <div class="bento-box bento-small bento-glass">
        <div class="bento-content">
          <span class="bento-icon">🎮</span>
          <h3>Library</h3>
          <div class="bento-stat">42</div>
          <p>Installed Games</p>
        </div>
      </div>

      <!-- Middle Row: Medium wide + Medium tall (spans down) + Small -->
      <div class="bento-box bento-wide bento-dark-solid">
        <div class="bento-content">
          <h3>Friends Online</h3>
          <div class="bento-friends">
            <img src="https://i.pravatar.cc/150?img=11" alt="Friend" title="Playing Cybernetic Overdrive">
            <img src="https://i.pravatar.cc/150?img=33" alt="Friend" title="Online">
            <img src="https://i.pravatar.cc/150?img=47" alt="Friend" title="In Menus">
            <div class="bento-friend-more">+12</div>
          </div>
        </div>
      </div>

      <div class="bento-box bento-tall bento-image" style="background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop');">
        <div class="bento-content bento-dark">
          <span class="bento-tag">UPCOMING</span>
          <h3>Neon Drifter</h3>
          <p>Pre-load available in 2 days.</p>
        </div>
      </div>

      <div class="bento-box bento-small bento-gradient-2">
        <div class="bento-content">
          <span class="bento-icon">📺</span>
          <h3>Clips</h3>
          <div class="bento-stat">8</div>
          <p>New captures</p>
        </div>
      </div>

      <!-- Bottom Row: Small + Wide -->
      <div class="bento-box bento-small bento-light">
        <div class="bento-content">
          <span class="bento-icon">⚙️</span>
          <h3>Settings</h3>
          <p>System up to date.</p>
        </div>
      </div>
      
      <div class="bento-box bento-wide bento-glass">
        <div class="bento-content">
          <h3>Weekly Summary</h3>
          <p>You played 14 hours this week. Mostly RPGs.</p>
          <div class="bento-progress">
            <div class="bento-progress-bar" style="width: 70%"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Bento Grid Logic
// The complex bento layout is purely CSS Grid.
// We add a subtle hover effect using JS for precise mouse tracking if desired, 
// but CSS handles the core layout beautifully.`,
  ts: `// Bento Grid Logic (TypeScript)`,
  css: `/* Bento Grid Styles (Apple Style) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.bento-wrapper {
  background: #f5f5f7; /* Apple light gray */
  color: #1d1d1f; /* Apple dark text */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
}

.bento-container {
  width: 100%;
  max-width: 1000px; /* Keep it constrained for the bento look */
}

.bento-header {
  text-align: center;
  margin-bottom: 40px;
}

.bento-header h2 {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 10px 0;
}

.bento-header p {
  font-size: 1.25rem;
  color: #86868b;
  margin: 0;
}

/* The Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
  gap: 20px;
}

/* Bento Boxes */
.bento-box {
  border-radius: 24px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
}

.bento-box:hover {
  transform: scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
}

/* Sizing Classes */
.bento-small { grid-column: span 1; grid-row: span 1; }
.bento-wide { grid-column: span 2; grid-row: span 1; }
.bento-tall { grid-column: span 1; grid-row: span 2; }
.bento-large { grid-column: span 2; grid-row: span 2; }

/* Theming/Backgrounds */
.bento-image {
  background-size: cover;
  background-position: center;
}

.bento-image::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%);
  z-index: 1;
}

.bento-gradient-1 { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%); }
.bento-gradient-2 { background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); }
.bento-dark-solid { background: #1d1d1f; color: #fff; }
.bento-light { background: #ffffff; }
.bento-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

/* Content */
.bento-content {
  position: relative;
  z-index: 2;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.bento-dark {
  color: #fff;
  justify-content: flex-end;
}

.bento-tag {
  align-self: flex-start;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: auto;
}

.bento-icon {
  font-size: 2rem;
  margin-bottom: 10px;
}

.bento-box h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  letter-spacing: -0.01em;
}

.bento-large h3 {
  font-size: 2rem;
}

.bento-box p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.bento-stat {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: auto 0 5px 0;
}

/* Mini components inside */
.bento-friends {
  display: flex;
  margin-top: auto;
}

.bento-friends img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #1d1d1f;
  margin-left: -10px;
}
.bento-friends img:first-child { margin-left: 0; }

.bento-friend-more {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #333;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  border: 2px solid #1d1d1f;
  margin-left: -10px;
}

.bento-progress {
  width: 100%;
  height: 8px;
  background: rgba(0,0,0,0.1);
  border-radius: 4px;
  margin-top: auto;
  overflow: hidden;
}

.bento-progress-bar {
  height: 100%;
  background: #0071e3; /* Apple Blue */
  border-radius: 4px;
}

/* Responsive */
@media (max-width: 900px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .bento-large { grid-column: span 2; grid-row: span 2; }
  .bento-wide { grid-column: span 2; }
  /* Ensure tall items don't break layout unexpectedly */
}

@media (max-width: 500px) {
  .bento-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .bento-box {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
    min-height: 200px;
  }
  .bento-large { min-height: 300px; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a world-class Bento Grid inspired by Apple's modern design language. Use varying tile sizes, intelligent content grouping, premium spacing, and soft rounded corners.`
};
