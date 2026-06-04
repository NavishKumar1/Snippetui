/**
 * Component: Glassmorphism Gaming Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'glassmorphism-dock',
  name: 'Glassmorphism Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="glass-dock-container">
  <div class="gd-ambient-orb orb-1"></div>
  <div class="gd-ambient-orb orb-2"></div>
  
  <nav class="glass-dock">
    <a href="#" class="gd-item active">
      <div class="gd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
      </div>
      <span class="gd-tooltip">Home</span>
    </a>

    <a href="#" class="gd-item">
      <div class="gd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
      </div>
      <span class="gd-tooltip">Media</span>
    </a>

    <div class="gd-separator"></div>

    <a href="#" class="gd-item gd-highlight">
      <div class="gd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
      </div>
      <span class="gd-tooltip">Store</span>
    </a>

    <div class="gd-separator"></div>

    <a href="#" class="gd-item">
      <div class="gd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </div>
      <span class="gd-tooltip">Chat</span>
    </a>

    <a href="#" class="gd-item">
      <div class="gd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      </div>
      <span class="gd-tooltip">Settings</span>
    </a>
  </nav>
</div>`,
  js: `// Glassmorphism interactions
const glassItems = document.querySelectorAll('.gd-item');

glassItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    glassItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Glassmorphism interactions (TypeScript)
const glassItems = document.querySelectorAll<HTMLAnchorElement>('.gd-item');

glassItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    glassItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Glassmorphism Gaming Dock Styles */
.glass-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 2rem;
  background: #0f0c29; /* fallback */
  background: linear-gradient(to right, #24243e, #302b63, #0f0c29);
  font-family: 'Outfit', sans-serif;
  position: relative;
  overflow: hidden;
}

.gd-ambient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  opacity: 0.6;
}
.orb-1 {
  width: 200px; height: 200px;
  background: #ff00cc;
  bottom: -50px; left: 30%;
  animation: float 8s ease-in-out infinite alternate;
}
.orb-2 {
  width: 250px; height: 250px;
  background: #333399;
  bottom: -80px; right: 25%;
  animation: float 12s ease-in-out infinite alternate-reverse;
}

@keyframes float {
  0% { transform: translateY(0) translateX(0); }
  100% { transform: translateY(-30px) translateX(30px); }
}

.glass-dock {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 10;
}

.gd-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  background: rgba(255, 255, 255, 0.02);
}

.gd-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: translateY(-4px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.gd-item.active {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  box-shadow: 
    0 4px 15px rgba(0,0,0,0.2),
    inset 0 1px 1px rgba(255,255,255,0.4);
}

.gd-icon {
  position: relative;
  z-index: 2;
  transition: transform 0.3s;
}

.gd-item.active .gd-icon {
  transform: scale(1.1);
}

.gd-highlight {
  background: linear-gradient(135deg, rgba(255,0,204,0.2), rgba(51,51,153,0.2));
  color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
}

.gd-highlight:hover, .gd-highlight.active {
  background: linear-gradient(135deg, rgba(255,0,204,0.4), rgba(51,51,153,0.4));
  border-color: rgba(255,255,255,0.4);
}

.gd-separator {
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 4px;
}

.gd-tooltip {
  position: absolute;
  top: -40px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  opacity: 0;
  pointer-events: none;
  transform: translateY(10px) scale(0.9);
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  border: 1px solid rgba(255,255,255,0.1);
  white-space: nowrap;
}

.gd-item:hover .gd-tooltip {
  opacity: 1;
  transform: translateY(0) scale(1);
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a floating glassmorphism dock using blurred backgrounds, layered transparency, subtle reflections, and premium gaming visuals. Include smooth icon animations, active indicators, and touch-friendly interactions.`
};
