/**
 * Component: Gaming Platform Dashboard
 * Category: dashboard-layouts
 */

export const component = {
  id: 'gaming-platform-dashboard',
  name: 'Cinematic Gaming Dashboard',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="gpd-wrapper">
  
  <!-- Hero / Cinematic Background -->
  <div class="gpd-hero-bg">
    <div class="gpd-hero-gradient"></div>
  </div>

  <div class="gpd-container">
    
    <!-- Top Navigation -->
    <header class="gpd-nav">
      <div class="gpd-nav-left">
        <div class="gpd-logo">NEXUS</div>
        <a href="#" class="active">Discover</a>
        <a href="#">Library</a>
        <a href="#">Community</a>
        <a href="#">Store</a>
      </div>
      <div class="gpd-nav-right">
        <button class="gpd-icon-btn">🔍</button>
        <button class="gpd-icon-btn">🔔<span class="gpd-dot"></span></button>
        <div class="gpd-user-pill">
          <img src="https://i.pravatar.cc/150?img=11" alt="Avatar">
          <span>ALEX_99</span>
          <div class="gpd-user-level">LVL 42</div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="gpd-main">
      
      <!-- Featured Hero -->
      <section class="gpd-hero-content">
        <div class="gpd-tag">AVAILABLE NOW</div>
        <h1>Cybernetic<br>Overdrive</h1>
        <p>Return to the neon-drenched streets in the massive new expansion. Experience improved ray-tracing, 40 new missions, and the all-new Phantom class.</p>
        <div class="gpd-hero-actions">
          <button class="gpd-btn gpd-btn-primary">▶ Play Now</button>
          <button class="gpd-btn gpd-btn-secondary">View Details</button>
        </div>
      </section>

      <div class="gpd-layout-grid">
        
        <!-- Left Column: Player Stats & Continue Playing -->
        <div class="gpd-col-left">
          
          <h3 class="gpd-section-title">Jump Back In</h3>
          <div class="gpd-game-card">
            <div class="gpd-gc-img" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop')"></div>
            <div class="gpd-gc-info">
              <h4>Cybernetic Overdrive</h4>
              <p>Last played 2 hours ago</p>
              <div class="gpd-progress">
                <div class="gpd-progress-fill" style="width: 78%;"></div>
              </div>
            </div>
            <button class="gpd-play-mini">▶</button>
          </div>

          <h3 class="gpd-section-title" style="margin-top: 32px;">Your Performance</h3>
          <div class="gpd-perf-card">
            <div class="gpd-perf-grid">
              <div class="gpd-perf-item">
                <span class="gpd-pi-lbl">Global Rank</span>
                <span class="gpd-pi-val">Diamond</span>
              </div>
              <div class="gpd-perf-item">
                <span class="gpd-pi-lbl">Win Rate</span>
                <span class="gpd-pi-val">64.2%</span>
              </div>
              <div class="gpd-perf-item">
                <span class="gpd-pi-lbl">Hours</span>
                <span class="gpd-pi-val">412</span>
              </div>
              <div class="gpd-perf-item">
                <span class="gpd-pi-lbl">Achievements</span>
                <span class="gpd-pi-val">128/150</span>
              </div>
            </div>
          </div>
          
        </div>

        <!-- Right Column: Monetization & Community -->
        <div class="gpd-col-right">
          
          <div class="gpd-sub-card">
            <div class="gpd-sub-bg"></div>
            <div class="gpd-sub-content">
              <span class="gpd-sub-badge">NEXUS+ PASS</span>
              <h4>Unlock the Ultimate Experience</h4>
              <ul class="gpd-sub-list">
                <li>✓ Access to 100+ premium titles</li>
                <li>✓ Monthly exclusive cosmetic drops</li>
                <li>✓ Priority cloud streaming servers</li>
              </ul>
              <div class="gpd-sub-action">
                <div class="gpd-sub-price">$14.99<span>/mo</span></div>
                <button class="gpd-btn gpd-btn-gold">Subscribe</button>
              </div>
            </div>
          </div>

          <h3 class="gpd-section-title" style="margin-top: 32px;">Friends Online (4)</h3>
          <div class="gpd-friends-list">
            <div class="gpd-friend">
              <div class="gpd-f-avatar">
                <img src="https://i.pravatar.cc/150?img=33" alt="Friend">
                <div class="gpd-status-dot online"></div>
              </div>
              <div class="gpd-f-info">
                <strong>Sarah_Connor</strong>
                <span>Playing Cybernetic Overdrive</span>
              </div>
              <button class="gpd-btn-join">Join</button>
            </div>
            <div class="gpd-friend">
              <div class="gpd-f-avatar">
                <img src="https://i.pravatar.cc/150?img=47" alt="Friend">
                <div class="gpd-status-dot online"></div>
              </div>
              <div class="gpd-f-info">
                <strong>MikeTheGamer</strong>
                <span>In Menus</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </main>
  </div>
</div>`,
  js: `// Gaming Platform Dashboard Logic
// Add subtle parallax to hero background on mouse move
const wrapper = document.querySelector('.gpd-wrapper');
const bg = document.querySelector('.gpd-hero-bg');

if (wrapper && bg) {
  wrapper.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Move background slightly opposite to mouse
    bg.style.transform = \`translate(-\${x * 20}px, -\${y * 20}px) scale(1.05)\`;
  });
}`,
  ts: `// Gaming Platform Dashboard Logic (TypeScript)
const wrapper = document.querySelector<HTMLDivElement>('.gpd-wrapper');
const bg = document.querySelector<HTMLDivElement>('.gpd-hero-bg');

if (wrapper && bg) {
  wrapper.addEventListener('mousemove', (e: MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    bg.style.transform = \`translate(-\${x * 20}px, -\${y * 20}px) scale(1.05)\`;
  });
}`,
  css: `/* Gaming Platform Dashboard Styles */
.gpd-wrapper {
  background: #0a0a0c;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #fff;
  position: relative;
  overflow-x: hidden;
}

/* Cinematic Background */
.gpd-hero-bg {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 80vh;
  background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000&auto=format&fit=crop');
  background-size: cover;
  background-position: top center;
  z-index: 0;
  transition: transform 0.1s ease-out;
  transform-origin: center;
}

.gpd-hero-gradient {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to bottom, rgba(10,10,12,0.2) 0%, rgba(10,10,12,0.8) 60%, #0a0a0c 100%),
              linear-gradient(to right, #0a0a0c 0%, rgba(10,10,12,0.4) 40%, rgba(10,10,12,0) 100%);
}

.gpd-container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 60px;
}

/* Navigation */
.gpd-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.gpd-nav-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.gpd-logo {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: #fff;
  background: linear-gradient(90deg, #fff, #a1a1aa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gpd-nav-left a {
  color: #a1a1aa;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
}

.gpd-nav-left a:hover, .gpd-nav-left a.active {
  color: #fff;
}

.gpd-nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.gpd-icon-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
}

.gpd-dot {
  position: absolute;
  top: 0; right: -2px;
  width: 8px; height: 8px;
  background: #ef4444;
  border-radius: 50%;
}

.gpd-user-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255,255,255,0.1);
  padding: 6px 12px 6px 6px;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.gpd-user-pill img {
  width: 32px; height: 32px;
  border-radius: 50%;
}

.gpd-user-pill span {
  font-size: 0.9rem;
  font-weight: 600;
}

.gpd-user-level {
  background: #3b82f6;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
}

/* Main Content Area */
.gpd-hero-content {
  padding: 80px 0;
  max-width: 600px;
}

.gpd-tag {
  background: #ef4444;
  color: #fff;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.gpd-hero-content h1 {
  font-size: 4.5rem;
  line-height: 1;
  font-weight: 900;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: -1px;
}

.gpd-hero-content p {
  font-size: 1.1rem;
  color: #d4d4d8;
  line-height: 1.6;
  margin: 0 0 32px 0;
}

.gpd-hero-actions {
  display: flex;
  gap: 16px;
}

.gpd-btn {
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: transform 0.2s, background 0.2s;
}

.gpd-btn:hover {
  transform: translateY(-2px);
}

.gpd-btn-primary { background: #fff; color: #000; }
.gpd-btn-primary:hover { background: #e4e4e7; }
.gpd-btn-secondary { background: rgba(255,255,255,0.1); color: #fff; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); }
.gpd-btn-secondary:hover { background: rgba(255,255,255,0.2); }

/* Layout Grid below Hero */
.gpd-layout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.gpd-section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #fff;
}

/* Game Card */
.gpd-game-card {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 16px;
  gap: 20px;
  transition: background 0.2s;
  cursor: pointer;
}

.gpd-game-card:hover {
  background: rgba(255,255,255,0.08);
}

.gpd-gc-img {
  width: 120px;
  height: 80px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
}

.gpd-gc-info { flex: 1; }
.gpd-gc-info h4 { margin: 0 0 4px 0; font-size: 1.1rem; }
.gpd-gc-info p { margin: 0 0 12px 0; font-size: 0.85rem; color: #a1a1aa; }

.gpd-progress {
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
}
.gpd-progress-fill { height: 100%; background: #3b82f6; border-radius: 2px; }

.gpd-play-mini {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: #fff; color: #000;
  border: none;
  font-size: 1.2rem;
  display: flex; justify-content: center; align-items: center;
  cursor: pointer;
}

/* Performance Stats */
.gpd-perf-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 24px;
}

.gpd-perf-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.gpd-perf-item { display: flex; flex-direction: column; gap: 4px; }
.gpd-pi-lbl { font-size: 0.85rem; color: #a1a1aa; text-transform: uppercase; font-weight: 600; }
.gpd-pi-val { font-size: 1.5rem; font-weight: 700; color: #fff; }

/* Subscription / Monetization Card */
.gpd-sub-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 32px;
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.gpd-sub-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(0,0,0,0) 100%);
  z-index: 0;
}

.gpd-sub-content { position: relative; z-index: 1; }
.gpd-sub-badge {
  background: #eab308; color: #000;
  font-size: 0.75rem; font-weight: 800;
  padding: 4px 8px; border-radius: 4px;
  letter-spacing: 1px;
}
.gpd-sub-content h4 { font-size: 1.5rem; margin: 16px 0; }
.gpd-sub-list { list-style: none; padding: 0; margin: 0 0 24px 0; color: #d4d4d8; font-size: 0.95rem; display: flex; flex-direction: column; gap: 8px; }

.gpd-sub-action { display: flex; justify-content: space-between; align-items: center; }
.gpd-sub-price { font-size: 2rem; font-weight: 800; }
.gpd-sub-price span { font-size: 1rem; color: #a1a1aa; font-weight: 500; }

.gpd-btn-gold { background: #eab308; color: #000; }
.gpd-btn-gold:hover { background: #facc15; }

/* Friends List */
.gpd-friends-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.gpd-friend {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255,255,255,0.02);
  padding: 12px;
  border-radius: 12px;
}

.gpd-f-avatar { position: relative; }
.gpd-f-avatar img { width: 40px; height: 40px; border-radius: 50%; }
.gpd-status-dot {
  position: absolute; bottom: 0; right: 0;
  width: 12px; height: 12px;
  border-radius: 50%; border: 2px solid #0a0a0c;
}
.online { background: #22c55e; }

.gpd-f-info { flex: 1; display: flex; flex-direction: column; }
.gpd-f-info strong { font-size: 0.95rem; }
.gpd-f-info span { font-size: 0.8rem; color: #a1a1aa; }

.gpd-btn-join {
  background: rgba(255,255,255,0.1); border: none; color: #fff;
  padding: 6px 16px; border-radius: 20px; font-weight: 600; cursor: pointer;
}
.gpd-btn-join:hover { background: rgba(255,255,255,0.2); }

/* Responsive */
@media (max-width: 1024px) {
  .gpd-layout-grid { grid-template-columns: 1fr; }
  .gpd-hero-content h1 { font-size: 3.5rem; }
}
@media (max-width: 600px) {
  .gpd-nav-left a { display: none; }
  .gpd-user-pill span, .gpd-user-level { display: none; }
  .gpd-hero-content h1 { font-size: 2.5rem; }
  .gpd-hero-actions { flex-direction: column; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a premium cinematic dashboard system for a gaming platform inspired by Xbox Game Pass and PlayStation. Include player statistics, engagement analytics, and premium upgrade flows.`
};
