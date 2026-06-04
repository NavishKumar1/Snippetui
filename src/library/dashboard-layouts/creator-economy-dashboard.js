/**
 * Component: Creator Economy Dashboard
 * Category: dashboard-layouts
 */

export const component = {
  id: 'creator-economy-dashboard',
  name: 'Creator Economy Dashboard',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="ced-wrapper">
  
  <div class="ced-sidebar">
    <div class="ced-user-profile">
      <div class="ced-avatar-wrap">
        <img src="https://i.pravatar.cc/150?img=32" alt="Creator">
        <span class="ced-verified">✓</span>
      </div>
      <h3>Elena Studios</h3>
      <p>@elena_creates</p>
    </div>

    <nav class="ced-nav">
      <a href="#" class="active"><span>📊</span> Overview</a>
      <a href="#"><span>👥</span> Audience</a>
      <a href="#"><span>💰</span> Earnings</a>
      <a href="#"><span>🎁</span> Memberships</a>
      <a href="#"><span>📝</span> Content</a>
    </nav>
    
    <div class="ced-promo-box">
      <h4>Creator Pro</h4>
      <p>Unlock detailed retention graphs and custom emotes.</p>
      <button class="ced-btn-promo">Upgrade Now</button>
    </div>
  </div>

  <main class="ced-main">
    <header class="ced-header">
      <h2>Dashboard Overview</h2>
      <div class="ced-h-actions">
        <button class="ced-btn-outline">Last 28 Days</button>
        <button class="ced-btn-primary">Create Post</button>
      </div>
    </header>

    <div class="ced-content">
      
      <!-- Top Metrics -->
      <div class="ced-metrics-row">
        <div class="ced-metric">
          <div class="ced-m-label">Total Followers</div>
          <div class="ced-m-val">124.5K</div>
          <div class="ced-m-trend ced-pos">+2.4K</div>
        </div>
        <div class="ced-metric">
          <div class="ced-m-label">Active Members</div>
          <div class="ced-m-val">1,842</div>
          <div class="ced-m-trend ced-pos">+142</div>
        </div>
        <div class="ced-metric">
          <div class="ced-m-label">Est. Earnings</div>
          <div class="ced-m-val">$8,450</div>
          <div class="ced-m-trend ced-pos">+$840</div>
        </div>
        <div class="ced-metric">
          <div class="ced-m-label">Post Engagement</div>
          <div class="ced-m-val">14.2%</div>
          <div class="ced-m-trend ced-neg">-1.2%</div>
        </div>
      </div>

      <div class="ced-layout">
        
        <!-- Main Area: Revenue & Content -->
        <div class="ced-main-col">
          
          <div class="ced-card">
            <div class="ced-card-header">
              <h3>Earnings Breakdown</h3>
            </div>
            <!-- Bar Chart -->
            <div class="ced-chart-area">
              <div class="ced-c-bars">
                <!-- Ad Rev, Subs, Donations, Merch -->
                <div class="ced-bar-group">
                  <div class="ced-bar" style="height: 40%; background: #fbbf24;"></div>
                  <span>Ads</span>
                </div>
                <div class="ced-bar-group">
                  <div class="ced-bar" style="height: 80%; background: #8b5cf6;"></div>
                  <span>Subs</span>
                </div>
                <div class="ced-bar-group">
                  <div class="ced-bar" style="height: 30%; background: #ec4899;"></div>
                  <span>Tips</span>
                </div>
                <div class="ced-bar-group">
                  <div class="ced-bar" style="height: 50%; background: #3b82f6;"></div>
                  <span>Merch</span>
                </div>
              </div>
            </div>
          </div>

          <div class="ced-card">
            <div class="ced-card-header">
              <h3>Recent Posts Performance</h3>
              <a href="#" class="ced-link">View All</a>
            </div>
            <div class="ced-post-list">
              
              <div class="ced-post">
                <div class="ced-post-thumb" style="background-image:url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop')"></div>
                <div class="ced-post-info">
                  <h4>Studio Setup Tour 2026</h4>
                  <span>Published 2 days ago • Public</span>
                </div>
                <div class="ced-post-stats">
                  <div><span>👁️</span> 42K</div>
                  <div><span>❤️</span> 3.2K</div>
                  <div><span>💬</span> 450</div>
                </div>
              </div>

              <div class="ced-post">
                <div class="ced-post-thumb" style="background-image:url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=200&auto=format&fit=crop')">
                  <span class="ced-members-only">🔒 Members Only</span>
                </div>
                <div class="ced-post-info">
                  <h4>Exclusive Q&A Session VOD</h4>
                  <span>Published 5 days ago • Tier 2+</span>
                </div>
                <div class="ced-post-stats">
                  <div><span>👁️</span> 1.8K</div>
                  <div><span>❤️</span> 420</div>
                  <div><span>💬</span> 180</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Side Area: Memberships -->
        <div class="ced-side-col">
          
          <div class="ced-card ced-tiers-card">
            <div class="ced-card-header">
              <h3>Membership Tiers</h3>
            </div>
            
            <div class="ced-tier">
              <div class="ced-tier-head">
                <div>
                  <h4>Supporter</h4>
                  <span>$5 / month</span>
                </div>
                <strong>1,240</strong>
              </div>
              <div class="ced-tier-bar"><div class="ced-tier-fill" style="width: 70%; background: #3b82f6;"></div></div>
            </div>

            <div class="ced-tier">
              <div class="ced-tier-head">
                <div>
                  <h4>Insider</h4>
                  <span>$10 / month</span>
                </div>
                <strong>450</strong>
              </div>
              <div class="ced-tier-bar"><div class="ced-tier-fill" style="width: 35%; background: #8b5cf6;"></div></div>
            </div>

            <div class="ced-tier">
              <div class="ced-tier-head">
                <div>
                  <h4>VIP</h4>
                  <span>$25 / month</span>
                </div>
                <strong>152</strong>
              </div>
              <div class="ced-tier-bar"><div class="ced-tier-fill" style="width: 15%; background: #ec4899;"></div></div>
            </div>

            <button class="ced-btn-outline" style="width: 100%; margin-top: 16px;">Edit Tiers</button>
          </div>

          <div class="ced-card">
            <div class="ced-card-header">
              <h3>Recent Supporters</h3>
            </div>
            <div class="ced-supporter-list">
              <div class="ced-supporter">
                <img src="https://i.pravatar.cc/150?img=68" alt="Sub">
                <div><strong>David M.</strong> joined Insider</div>
              </div>
              <div class="ced-supporter">
                <img src="https://i.pravatar.cc/150?img=12" alt="Sub">
                <div><strong>Jenny K.</strong> tipped $50</div>
              </div>
              <div class="ced-supporter">
                <img src="https://i.pravatar.cc/150?img=44" alt="Sub">
                <div><strong>Alex R.</strong> upgraded to VIP</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </main>
</div>`,
  js: `// Creator Economy Dashboard Logic
const cedBars = document.querySelectorAll('.ced-bar');
cedBars.forEach((bar, i) => {
  bar.style.opacity = '0';
  bar.style.transform = 'scaleY(0)';
  bar.style.transformOrigin = 'bottom';
  setTimeout(() => {
    bar.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    bar.style.opacity = '1';
    bar.style.transform = 'scaleY(1)';
  }, 300 + (i * 100));
});`,
  ts: `// Creator Economy Dashboard Logic (TypeScript)
const cedBars = document.querySelectorAll<HTMLDivElement>('.ced-bar');
cedBars.forEach((bar, i) => {
  bar.style.opacity = '0';
  bar.style.transform = 'scaleY(0)';
  bar.style.transformOrigin = 'bottom';
  setTimeout(() => {
    bar.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    bar.style.opacity = '1';
    bar.style.transform = 'scaleY(1)';
  }, 300 + (i * 100));
});`,
  css: `/* Creator Economy Dashboard Styles */
.ced-wrapper {
  display: flex;
  min-height: 100vh;
  background: #fdf2f8; /* Soft pink tint background */
  font-family: -apple-system, "Inter", sans-serif;
  color: #1f2937;
}

/* Sidebar */
.ced-sidebar {
  width: 260px;
  background: #fff;
  border-right: 1px solid #fce7f3;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
}

.ced-user-profile {
  text-align: center;
  margin-bottom: 40px;
}

.ced-avatar-wrap {
  position: relative;
  width: 80px; height: 80px;
  margin: 0 auto 16px;
}

.ced-avatar-wrap img {
  width: 100%; height: 100%;
  border-radius: 50%;
  border: 3px solid #ec4899;
  padding: 3px;
}

.ced-verified {
  position: absolute;
  bottom: 0; right: 0;
  background: #3b82f6; color: #fff;
  width: 24px; height: 24px;
  border-radius: 50%;
  display: flex; justify-content: center; align-items: center;
  font-size: 0.8rem; border: 2px solid #fff;
}

.ced-user-profile h3 { margin: 0 0 4px 0; font-size: 1.25rem; }
.ced-user-profile p { margin: 0; color: #6b7280; font-size: 0.9rem; }

.ced-nav {
  display: flex; flex-direction: column; gap: 8px; flex: 1;
}

.ced-nav a {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #4b5563; text-decoration: none;
  font-weight: 500; font-size: 0.95rem;
  transition: all 0.2s;
}

.ced-nav a:hover, .ced-nav a.active {
  background: #fdf2f8; color: #db2777; font-weight: 600;
}
.ced-nav a span { font-size: 1.2rem; }

.ced-promo-box {
  background: linear-gradient(135deg, #ec4899, #8b5cf6);
  padding: 20px;
  border-radius: 16px;
  color: #fff;
  text-align: center;
}

.ced-promo-box h4 { margin: 0 0 8px 0; font-size: 1.1rem; }
.ced-promo-box p { font-size: 0.85rem; opacity: 0.9; margin: 0 0 16px 0; line-height: 1.4; }

.ced-btn-promo {
  background: #fff; color: #db2777; border: none;
  padding: 8px 16px; border-radius: 20px; font-weight: 700;
  font-size: 0.85rem; cursor: pointer; width: 100%;
}

/* Main */
.ced-main {
  flex: 1; display: flex; flex-direction: column; overflow-y: auto;
}

.ced-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 32px 40px; background: #fff; border-bottom: 1px solid #fce7f3;
}
.ced-header h2 { margin: 0; font-size: 1.5rem; font-weight: 700; }

.ced-h-actions { display: flex; gap: 12px; }

.ced-btn-outline {
  background: #fff; border: 1px solid #e5e7eb; padding: 10px 16px;
  border-radius: 8px; font-weight: 600; cursor: pointer; color: #374151;
}
.ced-btn-primary {
  background: #ec4899; border: none; color: #fff; padding: 10px 20px;
  border-radius: 8px; font-weight: 600; cursor: pointer;
}
.ced-btn-primary:hover { background: #db2777; }

.ced-content { padding: 40px; max-width: 1200px; margin: 0 auto; width: 100%; }

/* Metrics */
.ced-metrics-row {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px;
}

.ced-metric {
  background: #fff; padding: 24px; border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  border: 1px solid #fce7f3;
}

.ced-m-label { font-size: 0.85rem; color: #6b7280; font-weight: 600; margin-bottom: 12px; text-transform: uppercase; }
.ced-m-val { font-size: 2rem; font-weight: 800; margin-bottom: 8px; color: #111827; }
.ced-m-trend { font-size: 0.9rem; font-weight: 600; }
.ced-pos { color: #10b981; }
.ced-neg { color: #ef4444; }

/* Layout */
.ced-layout {
  display: grid; grid-template-columns: 2fr 1fr; gap: 24px;
}

.ced-card {
  background: #fff; border-radius: 16px; padding: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  border: 1px solid #fce7f3; margin-bottom: 24px;
}

.ced-card-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
}
.ced-card-header h3 { margin: 0; font-size: 1.1rem; }
.ced-link { color: #ec4899; text-decoration: none; font-size: 0.9rem; font-weight: 600; }

/* Chart Area */
.ced-chart-area { height: 250px; display: flex; align-items: flex-end; padding-bottom: 20px; }
.ced-c-bars { display: flex; justify-content: space-around; width: 100%; height: 100%; align-items: flex-end; }
.ced-bar-group { display: flex; flex-direction: column; align-items: center; width: 15%; height: 100%; justify-content: flex-end; gap: 12px; }
.ced-bar { width: 100%; border-radius: 8px 8px 0 0; }
.ced-bar-group span { font-size: 0.85rem; color: #6b7280; font-weight: 500; }

/* Posts */
.ced-post-list { display: flex; flex-direction: column; gap: 20px; }
.ced-post { display: flex; gap: 16px; align-items: center; padding-bottom: 20px; border-bottom: 1px solid #f3f4f6; }
.ced-post:last-child { border-bottom: none; padding-bottom: 0; }

.ced-post-thumb {
  width: 120px; height: 80px; border-radius: 8px;
  background-size: cover; background-position: center;
  position: relative;
}
.ced-members-only {
  position: absolute; top: 4px; left: 4px; background: rgba(0,0,0,0.7); color: #fff;
  font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; font-weight: bold;
}

.ced-post-info { flex: 1; }
.ced-post-info h4 { margin: 0 0 6px 0; font-size: 1rem; }
.ced-post-info span { font-size: 0.8rem; color: #6b7280; }

.ced-post-stats { display: flex; flex-direction: column; gap: 6px; font-size: 0.8rem; color: #4b5563; font-weight: 500; }
.ced-post-stats div { display: flex; align-items: center; gap: 6px; }

/* Tiers */
.ced-tiers-card { padding: 24px; }
.ced-tier { margin-bottom: 20px; }
.ced-tier-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.ced-tier-head h4 { margin: 0 0 2px 0; font-size: 0.95rem; }
.ced-tier-head span { font-size: 0.8rem; color: #6b7280; }
.ced-tier-head strong { font-size: 1.1rem; }
.ced-tier-bar { height: 8px; background: #f3f4f6; border-radius: 4px; }
.ced-tier-fill { height: 100%; border-radius: 4px; }

/* Supporters */
.ced-supporter-list { display: flex; flex-direction: column; gap: 16px; }
.ced-supporter { display: flex; align-items: center; gap: 12px; font-size: 0.9rem; }
.ced-supporter img { width: 36px; height: 36px; border-radius: 50%; }
.ced-supporter strong { color: #111827; }

/* Responsive */
@media (max-width: 1024px) {
  .ced-layout { grid-template-columns: 1fr; }
  .ced-metrics-row { grid-template-columns: 1fr 1fr; }
  .ced-sidebar { width: 80px; padding: 24px 12px; }
  .ced-user-profile h3, .ced-user-profile p, .ced-nav a text, .ced-promo-box { display: none; }
  .ced-avatar-wrap { width: 48px; height: 48px; }
  .ced-nav a { justify-content: center; padding: 16px 0; font-size: 0; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build a creator-focused dashboard supporting content creators. Include audience growth analytics, earnings reports, and premium membership tracking.`
};
