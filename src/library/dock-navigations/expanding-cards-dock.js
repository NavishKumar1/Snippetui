/**
 * Component: Expanding Cards Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'expanding-cards-dock',
  name: 'Expanding Cards Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="exp-dock-container">
  <div class="exp-dock">
    <div class="exp-panel active" style="background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop');">
      <div class="exp-overlay"></div>
      <div class="exp-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        <h3 class="exp-title">Home Base</h3>
      </div>
    </div>
    
    <div class="exp-panel" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop');">
      <div class="exp-overlay"></div>
      <div class="exp-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
        <h3 class="exp-title">Collections</h3>
      </div>
    </div>
    
    <div class="exp-panel" style="background-image: url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop');">
      <div class="exp-overlay"></div>
      <div class="exp-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
        <h3 class="exp-title">Media</h3>
      </div>
    </div>
    
    <div class="exp-panel" style="background-image: url('https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070&auto=format&fit=crop');">
      <div class="exp-overlay"></div>
      <div class="exp-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <h3 class="exp-title">Messages</h3>
      </div>
    </div>
    
    <div class="exp-panel" style="background-image: url('https://images.unsplash.com/photo-1533709752211-118fcaf6647c?q=80&w=2070&auto=format&fit=crop');">
      <div class="exp-overlay"></div>
      <div class="exp-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <h3 class="exp-title">Profile</h3>
      </div>
    </div>
  </div>
</div>`,
  js: `// Expanding Cards Logic
const expPanels = document.querySelectorAll('.exp-panel');

expPanels.forEach(panel => {
  panel.addEventListener('click', () => {
    expPanels.forEach(p => p.classList.remove('active'));
    panel.classList.add('active');
  });
});`,
  ts: `// Expanding Cards Logic (TypeScript)
const expPanels = document.querySelectorAll<HTMLDivElement>('.exp-panel');

expPanels.forEach(panel => {
  panel.addEventListener('click', () => {
    expPanels.forEach(p => p.classList.remove('active'));
    panel.classList.add('active');
  });
});`,
  css: `/* Expanding Cards Dock Styles */
.exp-dock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
  background: #111;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
}

.exp-dock {
  display: flex;
  width: 90vw;
  max-width: 900px;
  height: 250px;
}

.exp-panel {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  flex: 0.5;
  margin: 10px;
  position: relative;
  transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.exp-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  opacity: 0;
  transition: opacity 0.5s;
}

.exp-panel.active {
  flex: 5;
}

.exp-panel.active .exp-overlay {
  opacity: 1;
}

.exp-content {
  position: absolute;
  bottom: 30px;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.5s ease-in-out 0.2s; /* Delayed transition */
}

/* Base icon state for collapsed panels */
.exp-panel > .exp-content {
  opacity: 1;
  transform: translateX(0);
}

.exp-panel:not(.active) .exp-title {
  display: none;
}

.exp-panel:not(.active) .exp-content {
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  opacity: 0.7;
}

.exp-panel.active .exp-content {
  opacity: 1;
  transform: translateX(0);
}

.exp-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 2px 5px rgba(0,0,0,0.5);
  white-space: nowrap;
}

/* Hover effect on collapsed cards */
.exp-panel:not(.active):hover {
  flex: 0.8;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design an Expanding Cards Dock. It should function as a large horizontal gallery where inactive items are thin vertical strips with an icon, and clicking them expands them smoothly into full-width cards displaying background imagery and a title.`
};
