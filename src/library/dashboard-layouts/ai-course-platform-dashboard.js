/**
 * Component: AI Course Platform Dashboard
 * Category: dashboard-layouts
 */

export const component = {
  id: 'ai-course-platform-dashboard',
  name: 'AI Course Platform Dashboard',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="aicd-wrapper">
  
  <aside class="aicd-sidebar">
    <div class="aicd-brand">EduSmart AI</div>
    <div class="aicd-creator-profile">
      <img src="https://i.pravatar.cc/150?img=47" alt="Creator">
      <div class="aicd-cp-info">
        <strong>Dr. Sarah Jenkins</strong>
        <span>Pro Educator Tier</span>
      </div>
    </div>
    <nav class="aicd-nav">
      <div class="aicd-nav-section">Dashboard</div>
      <a href="#" class="active">Overview</a>
      <a href="#">Student Analytics</a>
      <a href="#">AI Course Builder</a>
      <a href="#">Revenue & Sales</a>
      
      <div class="aicd-nav-section">Monetization</div>
      <a href="#">Memberships</a>
      <a href="#">Coupons & Promos</a>
    </nav>
  </aside>

  <main class="aicd-main">
    <header class="aicd-header">
      <div class="aicd-h-left">
        <h2>Welcome back, Sarah</h2>
        <p>Here is how your AI-assisted courses are performing.</p>
      </div>
      <button class="aicd-btn-magic">✨ Generate New Lesson</button>
    </header>

    <div class="aicd-content">
      
      <!-- Stats Row -->
      <div class="aicd-stats-row">
        <div class="aicd-stat-card">
          <div class="aicd-sc-icon" style="background:#dbeafe; color:#2563eb;">👥</div>
          <div class="aicd-sc-data">
            <span class="aicd-sc-lbl">Total Students</span>
            <span class="aicd-sc-val">12,450</span>
          </div>
          <div class="aicd-sc-trend positive">+240 this week</div>
        </div>
        
        <div class="aicd-stat-card">
          <div class="aicd-sc-icon" style="background:#dcfce7; color:#16a34a;">💰</div>
          <div class="aicd-sc-data">
            <span class="aicd-sc-lbl">Monthly Revenue</span>
            <span class="aicd-sc-val">$24.5K</span>
          </div>
          <div class="aicd-sc-trend positive">+12% vs last month</div>
        </div>
        
        <div class="aicd-stat-card">
          <div class="aicd-sc-icon" style="background:#f3e8ff; color:#9333ea;">🧠</div>
          <div class="aicd-sc-data">
            <span class="aicd-sc-lbl">AI Quizzes Taken</span>
            <span class="aicd-sc-val">42.8K</span>
          </div>
          <div class="aicd-sc-trend positive">High Engagement</div>
        </div>
        
        <div class="aicd-stat-card">
          <div class="aicd-sc-icon" style="background:#fee2e2; color:#dc2626;">⭐</div>
          <div class="aicd-sc-data">
            <span class="aicd-sc-lbl">Avg Course Rating</span>
            <span class="aicd-sc-val">4.8/5</span>
          </div>
          <div class="aicd-sc-trend neutral">Based on 1.2k reviews</div>
        </div>
      </div>

      <div class="aicd-grid">
        
        <!-- Course Performance -->
        <div class="aicd-card aicd-span-2">
          <div class="aicd-card-header">
            <h3>Course Performance (Revenue vs Engagement)</h3>
          </div>
          
          <div class="aicd-course-list">
            
            <div class="aicd-course-item">
              <div class="aicd-ci-img" style="background-image:url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200&auto=format&fit=crop')"></div>
              <div class="aicd-ci-details">
                <h4>Advanced Machine Learning (AI Assisted)</h4>
                <div class="aicd-ci-meta">
                  <span>4,200 Students</span> • <span>$142,000 Total Rev</span>
                </div>
                <div class="aicd-progress-wrap">
                  <div class="aicd-progress-lbl">Avg Completion Rate: 78%</div>
                  <div class="aicd-progress-bg"><div class="aicd-progress-fill" style="width: 78%; background:#2563eb"></div></div>
                </div>
              </div>
              <button class="aicd-btn-outline">Edit Course</button>
            </div>
            
            <div class="aicd-course-item">
              <div class="aicd-ci-img" style="background-image:url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop')"></div>
              <div class="aicd-ci-details">
                <h4>Data Science Foundations</h4>
                <div class="aicd-ci-meta">
                  <span>8,150 Students</span> • <span>$81,500 Total Rev</span>
                </div>
                <div class="aicd-progress-wrap">
                  <div class="aicd-progress-lbl">Avg Completion Rate: 45% <span class="aicd-ai-badge">AI Alert: Drop-off at Mod 4</span></div>
                  <div class="aicd-progress-bg"><div class="aicd-progress-fill" style="width: 45%; background:#f59e0b"></div></div>
                </div>
              </div>
              <button class="aicd-btn-magic-sm">✨ Fix with AI</button>
            </div>

          </div>
        </div>

        <!-- Monetization Upsell -->
        <div class="aicd-card">
          <div class="aicd-card-header">
            <h3>Boost Your Sales</h3>
          </div>
          
          <div class="aicd-upsell-box">
            <div class="aicd-ub-icon">📈</div>
            <h4>Launch a Subscription Model</h4>
            <p>You have 3 active courses. Bundling them into a monthly subscription could increase your LTV by 40%.</p>
            <div class="aicd-ub-pricing">
              <div class="aicd-ub-plan">
                <span>Suggested Tier 1</span>
                <strong>$29/mo</strong>
              </div>
            </div>
            <button class="aicd-btn-primary w-full">Set Up Membership</button>
          </div>
          
          <div class="aicd-student-feed">
            <div class="aicd-feed-title">Recent Subscriptions</div>
            <div class="aicd-feed-item">
              <div class="aicd-fi-avatar">M</div>
              <div class="aicd-fi-info">
                <strong>Mike T.</strong> upgraded to <span>Pro Bundle</span>
              </div>
            </div>
            <div class="aicd-feed-item">
              <div class="aicd-fi-avatar">A</div>
              <div class="aicd-fi-info">
                <strong>Anna K.</strong> upgraded to <span>Pro Bundle</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </main>
</div>`,
  js: `// AI Course Platform Dashboard Logic
const magicBtns = document.querySelectorAll('.aicd-btn-magic-sm, .aicd-btn-magic');
magicBtns.forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.transform = 'scale(1.05)';
    btn.style.boxShadow = '0 0 15px rgba(147, 51, 234, 0.4)';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = 'none';
  });
});`,
  ts: `// AI Course Platform Dashboard Logic (TypeScript)
const magicBtns = document.querySelectorAll<HTMLButtonElement>('.aicd-btn-magic-sm, .aicd-btn-magic');
magicBtns.forEach(btn => {
  btn.addEventListener('mouseover', () => {
    btn.style.transform = 'scale(1.05)';
    btn.style.boxShadow = '0 0 15px rgba(147, 51, 234, 0.4)';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = 'none';
  });
});`,
  css: `/* AI Course Platform Dashboard Styles */
.aicd-wrapper {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Inter', sans-serif;
  color: #0f172a;
}

/* Sidebar */
.aicd-sidebar {
  width: 280px;
  background: #fff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.aicd-brand {
  font-size: 1.25rem;
  font-weight: 800;
  color: #2563eb;
  padding: 24px;
  border-bottom: 1px solid #f1f5f9;
}

.aicd-creator-profile {
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.aicd-creator-profile img {
  width: 48px; height: 48px;
  border-radius: 50%;
}

.aicd-cp-info { display: flex; flex-direction: column; gap: 4px; }
.aicd-cp-info strong { font-size: 0.95rem; }
.aicd-cp-info span { font-size: 0.8rem; color: #64748b; font-weight: 500; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; display: inline-block; width: fit-content;}

.aicd-nav { padding: 24px 16px; display: flex; flex-direction: column; gap: 4px; }

.aicd-nav-section {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #94a3b8;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 16px 0 8px 8px;
}

.aicd-nav a {
  padding: 10px 16px;
  border-radius: 8px;
  color: #475569;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;
}

.aicd-nav a:hover, .aicd-nav a.active {
  background: #eff6ff;
  color: #2563eb;
  font-weight: 600;
}

/* Main Content */
.aicd-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.aicd-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 48px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.aicd-h-left h2 { margin: 0 0 8px 0; font-size: 1.5rem; }
.aicd-h-left p { margin: 0; color: #64748b; font-size: 0.95rem; }

.aicd-btn-magic {
  background: linear-gradient(135deg, #9333ea, #db2777);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.aicd-content { padding: 48px; max-width: 1200px; margin: 0 auto; width: 100%; }

/* Stats */
.aicd-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.aicd-stat-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.aicd-sc-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex; justify-content: center; align-items: center;
  font-size: 1.25rem;
}

.aicd-sc-data { display: flex; flex-direction: column; gap: 4px; }
.aicd-sc-lbl { font-size: 0.85rem; color: #64748b; font-weight: 500; }
.aicd-sc-val { font-size: 1.75rem; font-weight: 800; }

.aicd-sc-trend { font-size: 0.85rem; font-weight: 500; }
.positive { color: #16a34a; }
.neutral { color: #64748b; }

/* Grid */
.aicd-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.aicd-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}

.aicd-span-2 { grid-column: span 1; }

.aicd-card-header { margin-bottom: 24px; }
.aicd-card-header h3 { margin: 0; font-size: 1.1rem; font-weight: 600; }

/* Course List */
.aicd-course-list {
  display: flex; flex-direction: column; gap: 24px;
}

.aicd-course-item {
  display: flex;
  gap: 20px;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;
}
.aicd-course-item:last-child { border-bottom: none; padding-bottom: 0; }

.aicd-ci-img {
  width: 140px; height: 90px;
  border-radius: 8px;
  background-size: cover; background-position: center;
}

.aicd-ci-details { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.aicd-ci-details h4 { margin: 0; font-size: 1.05rem; }
.aicd-ci-meta { font-size: 0.85rem; color: #64748b; }

.aicd-progress-wrap { margin-top: 4px; }
.aicd-progress-lbl { font-size: 0.8rem; color: #475569; margin-bottom: 6px; display: flex; justify-content: space-between; }
.aicd-progress-bg { height: 6px; background: #f1f5f9; border-radius: 3px; overflow: hidden; }
.aicd-progress-fill { height: 100%; border-radius: 3px; }

.aicd-ai-badge {
  background: #fef2f2; color: #dc2626; padding: 2px 6px; border-radius: 4px; font-weight: 600;
}

.aicd-btn-outline {
  padding: 8px 16px; border: 1px solid #cbd5e1; background: #fff; border-radius: 6px; font-weight: 600; cursor: pointer; color: #0f172a;
}
.aicd-btn-magic-sm {
  background: #f3e8ff; color: #9333ea; border: 1px solid #e9d5ff; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s;
}

/* Upsell Box */
.aicd-upsell-box {
  background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  margin-bottom: 24px;
}

.aicd-ub-icon { font-size: 2rem; margin-bottom: 12px; }
.aicd-upsell-box h4 { margin: 0 0 12px 0; font-size: 1.1rem; color: #1e3a8a; }
.aicd-upsell-box p { font-size: 0.9rem; color: #475569; line-height: 1.5; margin: 0 0 20px 0; }

.aicd-ub-pricing {
  background: #fff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 20px;
}
.aicd-ub-plan { display: flex; justify-content: space-between; align-items: center; font-size: 0.95rem; }
.aicd-ub-plan strong { font-size: 1.25rem; color: #2563eb; }

.aicd-btn-primary { background: #2563eb; color: #fff; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; }
.w-full { width: 100%; }

/* Feed */
.aicd-student-feed { padding-top: 24px; border-top: 1px solid #e2e8f0; }
.aicd-feed-title { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: #64748b; margin-bottom: 16px; }
.aicd-feed-item { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.aicd-fi-avatar { width: 32px; height: 32px; background: #e2e8f0; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-weight: 600; font-size: 0.85rem; color: #475569; }
.aicd-fi-info { font-size: 0.9rem; color: #475569; }
.aicd-fi-info strong { color: #0f172a; }
.aicd-fi-info span { font-weight: 600; color: #2563eb; }

/* Responsive */
@media (max-width: 1200px) {
  .aicd-grid { grid-template-columns: 1fr; }
  .aicd-stats-row { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .aicd-sidebar { display: none; }
  .aicd-stats-row { grid-template-columns: 1fr; }
  .aicd-course-item { flex-direction: column; align-items: flex-start; }
  .aicd-ci-img { width: 100%; height: 160px; }
  .aicd-btn-outline, .aicd-btn-magic-sm { width: 100%; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a premium dashboard for an AI-powered course platform featuring student analytics, creator revenue, and subscription upgrades.`
};
