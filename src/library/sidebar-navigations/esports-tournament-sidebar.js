/**
 * Component: E-Sports Tournament Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'esports-tournament-sidebar',
  name: 'E-Sports Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="esports-container">
  <aside class="esports-sidebar">
    <div class="es-header">
      <div class="es-logo-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22l10-4 10 4L12 2z"></path></svg>
      </div>
      <div class="es-brand">
        <span class="es-brand-top">NEXUS</span>
        <span class="es-brand-bot">LEAGUE</span>
      </div>
    </div>

    <div class="es-live-banner">
      <div class="es-live-dot"></div>
      <span>LIVE: FINALS STAGE</span>
    </div>

    <div class="es-nav-container">
      <nav class="es-nav">
        <a href="#" class="es-item active">
          <div class="es-accent"></div>
          <svg class="es-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span class="es-label">Bracket</span>
        </a>
        
        <a href="#" class="es-item">
          <div class="es-accent"></div>
          <svg class="es-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          <span class="es-label">Teams</span>
        </a>

        <a href="#" class="es-item">
          <div class="es-accent"></div>
          <svg class="es-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span class="es-label">Schedule</span>
        </a>

        <a href="#" class="es-item">
          <div class="es-accent"></div>
          <svg class="es-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10.04 10.04 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <span class="es-label">Results</span>
        </a>
      </nav>
    </div>

    <div class="es-matchup">
      <h4 class="es-match-title">UP NEXT</h4>
      <div class="es-teams">
        <div class="es-team">
          <div class="es-t-logo t1"></div>
          <span>TSM</span>
        </div>
        <div class="es-vs">VS</div>
        <div class="es-team">
          <div class="es-t-logo t2"></div>
          <span>C9</span>
        </div>
      </div>
    </div>
  </aside>
</div>`,
  js: `// E-Sports Navigation
const esItems = document.querySelectorAll('.es-item');

esItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    esItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// E-Sports Navigation (TypeScript)
const esItems = document.querySelectorAll<HTMLAnchorElement>('.es-item');

esItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    esItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* E-Sports Tournament Sidebar */
.esports-container {
  display: flex;
  height: 600px;
  background: #0f1015;
  padding: 1rem;
  font-family: 'Teko', 'Impact', sans-serif; /* Aggressive sports font */
  text-transform: uppercase;
}

.esports-sidebar {
  width: 260px;
  height: 100%;
  background: #1a1c23;
  display: flex;
  flex-direction: column;
  border-right: 4px solid #ff4655; /* Valorant Red */
}

.es-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.5rem;
  background: #111217;
}

.es-logo-box {
  color: #ff4655;
}

.es-brand {
  display: flex;
  flex-direction: column;
  line-height: 0.9;
}

.es-brand-top {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
}

.es-brand-bot {
  font-size: 1.2rem;
  color: #8b92a5;
  letter-spacing: 4px;
}

.es-live-banner {
  background: rgba(255, 70, 85, 0.1);
  color: #ff4655;
  padding: 8px 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 1px;
}

.es-live-dot {
  width: 8px;
  height: 8px;
  background: #ff4655;
  border-radius: 50%;
  animation: pulse-live 1.5s infinite;
}

@keyframes pulse-live {
  0% { box-shadow: 0 0 0 0 rgba(255, 70, 85, 0.7); }
  70% { box-shadow: 0 0 0 6px rgba(255, 70, 85, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 70, 85, 0); }
}

.es-nav-container {
  flex: 1;
  padding: 1.5rem 0;
}

.es-nav {
  display: flex;
  flex-direction: column;
}

.es-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 1.5rem;
  color: #8b92a5;
  text-decoration: none;
  font-size: 1.5rem;
  transition: all 0.2s;
  overflow: hidden;
}

.es-accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #ff4655;
  transform: translateX(-100%);
  transition: transform 0.2s;
}

.es-item:hover {
  background: rgba(255,255,255,0.03);
  color: #ece8e1;
}

.es-item.active {
  background: linear-gradient(90deg, rgba(255,70,85,0.15) 0%, transparent 100%);
  color: #fff;
}

.es-item.active .es-accent {
  transform: translateX(0);
}

.es-icon {
  margin-bottom: 4px; /* Offset for teko font */
}

/* Matchup */
.es-matchup {
  padding: 1.5rem;
  background: #111217;
  border-top: 1px solid rgba(255,255,255,0.05);
}

.es-match-title {
  color: #8b92a5;
  font-size: 1.2rem;
  margin: 0 0 12px 0;
  letter-spacing: 1px;
}

.es-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.es-team {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
}

.es-t-logo {
  width: 40px;
  height: 40px;
  background: #2a2c35;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
}

.es-vs {
  color: #ff4655;
  font-size: 1.2rem;
  font-weight: 700;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a bold, aggressive E-sports tournament sidebar navigation. Use sharp edges, high contrast accents (like Valorant Red), large typography for readability on stream, and live match indicators.`
};
