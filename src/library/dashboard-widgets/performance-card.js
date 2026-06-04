/**
 * Component: Performance Card
 * Category: dashboard-widgets
 */

export const component = {
  id: 'performance-card',
  name: 'Performance Card',
  category: 'dashboard-widgets',
  tag: 'Premium',
  html: `<div class="pcard-wrapper">
  <div class="pcard">
    <div class="pcard-header">
      <div class="pcard-user">
        <img src="https://i.pravatar.cc/150?img=11" alt="Player Avatar">
        <div class="pcard-user-info">
          <h3>Alexander_W</h3>
          <span class="pcard-rank">Diamond Tier</span>
        </div>
      </div>
      <div class="pcard-level">
        <span>LVL</span>
        <strong>84</strong>
      </div>
    </div>

    <div class="pcard-progress-section">
      <div class="pcard-progress-labels">
        <span>Progress to Level 85</span>
        <span>42,500 / 50,000 XP</span>
      </div>
      <div class="pcard-progress-bar">
        <div class="pcard-progress-fill" style="width: 85%;"></div>
      </div>
    </div>

    <div class="pcard-stats">
      <div class="pcard-stat-box">
        <div class="pcard-stat-icon">🎯</div>
        <div class="pcard-stat-val">2.4</div>
        <div class="pcard-stat-lbl">K/D Ratio</div>
      </div>
      <div class="pcard-stat-box">
        <div class="pcard-stat-icon">🏆</div>
        <div class="pcard-stat-val">128</div>
        <div class="pcard-stat-lbl">Wins</div>
      </div>
      <div class="pcard-stat-box">
        <div class="pcard-stat-icon">⏱️</div>
        <div class="pcard-stat-val">412h</div>
        <div class="pcard-stat-lbl">Playtime</div>
      </div>
    </div>

    <div class="pcard-insight">
      <span class="pcard-insight-icon">💡</span>
      <p><strong>AI Insight:</strong> You perform 15% better during weekend matches. Consider joining the upcoming Saturday tournament.</p>
    </div>
  </div>
</div>`,
  js: `// Performance Card Logic
const pcardFills = document.querySelectorAll('.pcard-progress-fill');
setTimeout(() => {
  pcardFills.forEach(fill => {
    const width = fill.style.width;
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.width = width;
    }, 100);
  });
}, 300);`,
  ts: `// Performance Card Logic (TypeScript)
const pcardFills = document.querySelectorAll<HTMLDivElement>('.pcard-progress-fill');
setTimeout(() => {
  pcardFills.forEach(fill => {
    const width = fill.style.width;
    fill.style.width = '0%';
    setTimeout(() => {
      fill.style.width = width;
    }, 100);
  });
}, 300);`,
  css: `/* Performance Card Styles */
.pcard-wrapper {
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  font-family: 'Inter', sans-serif;
  color: #fff;
}

.pcard {
  background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  width: 100%;
  max-width: 420px;
  padding: 32px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pcard:hover {
  transform: translateY(-8px);
  border-color: rgba(56, 189, 248, 0.3);
}

.pcard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.pcard-user {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pcard-user img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid #38bdf8;
  padding: 2px;
}

.pcard-user-info h3 {
  margin: 0 0 4px 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.pcard-rank {
  font-size: 0.85rem;
  color: #38bdf8;
  font-weight: 600;
  background: rgba(56, 189, 248, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
}

.pcard-level {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0f172a;
  padding: 8px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
}

.pcard-level span { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
.pcard-level strong { font-size: 1.5rem; color: #fff; }

.pcard-progress-section {
  margin-bottom: 30px;
}

.pcard-progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #cbd5e1;
  margin-bottom: 10px;
  font-weight: 500;
}

.pcard-progress-bar {
  height: 10px;
  background: rgba(255,255,255,0.05);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
}

.pcard-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #38bdf8);
  border-radius: 5px;
  transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.pcard-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 30px;
}

.pcard-stat-box {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  padding: 16px 12px;
  text-align: center;
  transition: background 0.2s;
}

.pcard-stat-box:hover {
  background: rgba(255,255,255,0.05);
}

.pcard-stat-icon { font-size: 1.5rem; margin-bottom: 8px; }
.pcard-stat-val { font-size: 1.25rem; font-weight: 700; margin-bottom: 4px; }
.pcard-stat-lbl { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; }

.pcard-insight {
  display: flex;
  gap: 16px;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  padding: 16px;
  border-radius: 12px;
}

.pcard-insight-icon { font-size: 1.5rem; }
.pcard-insight p { margin: 0; font-size: 0.9rem; color: #e2e8f0; line-height: 1.5; }
.pcard-insight strong { color: #c4b5fd; }
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build a premium Performance Card component that showcases key performance indicators, achievements, player rankings, and AI insights.`
};
