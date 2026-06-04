/**
 * Component: Steampunk Gear Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'steampunk-gear-dock',
  name: 'Steampunk Gear Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="steam-dock-container">
  <div class="steam-machinery">
    <!-- Decorative background gears -->
    <svg class="steam-bg-gear sg-1" viewBox="0 0 100 100" fill="#a67c00"><path d="M50 0 A50 50 0 1 0 50 100 A50 50 0 1 0 50 0 Z M50 20 A30 30 0 1 1 50 80 A30 30 0 1 1 50 20 Z" stroke="#ffd700" stroke-width="2" stroke-dasharray="10 5"/></svg>
    <svg class="steam-bg-gear sg-2" viewBox="0 0 100 100" fill="#8c3e00"><path d="M50 0 A50 50 0 1 0 50 100 A50 50 0 1 0 50 0 Z M50 20 A30 30 0 1 1 50 80 A30 30 0 1 1 50 20 Z" stroke="#d2691e" stroke-width="2" stroke-dasharray="10 5"/></svg>

    <nav class="steam-dock">
      <a href="#" class="steam-item active" style="--rot: 45deg;">
        <div class="steam-gear">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        </div>
        <div class="steam-pipe"></div>
      </a>

      <a href="#" class="steam-item" style="--rot: -30deg;">
        <div class="steam-gear">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </div>
        <div class="steam-pipe"></div>
      </a>

      <a href="#" class="steam-item" style="--rot: 90deg;">
        <div class="steam-gear">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div class="steam-pipe"></div>
      </a>

      <a href="#" class="steam-item" style="--rot: -60deg;">
        <div class="steam-gear">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        </div>
        <div class="steam-pipe"></div>
      </a>

      <a href="#" class="steam-item" style="--rot: 15deg;">
        <div class="steam-gear">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10.1 10.1 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div class="steam-pipe"></div>
      </a>
    </nav>
  </div>
</div>`,
  js: `// Steampunk Gear Logic
const steamItems = document.querySelectorAll('.steam-item');

steamItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (item.classList.contains('active')) return;

    steamItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    
    // Simulate mechanical grind
    const gear = item.querySelector('.steam-gear');
    gear.style.transform = \`rotate(calc(\${item.style.getPropertyValue('--rot')} + 360deg)) scale(1.1)\`;
    
    // Shake the whole machinery slightly
    const mach = document.querySelector('.steam-machinery');
    mach.classList.add('shake');
    setTimeout(() => {
      mach.classList.remove('shake');
      gear.style.transform = ''; // reset to let css take over active state
    }, 300);
  });
});`,
  ts: `// Steampunk Gear Logic (TypeScript)
const steamItems = document.querySelectorAll<HTMLAnchorElement>('.steam-item');

steamItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    
    if (item.classList.contains('active')) return;

    steamItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    
    const gear = item.querySelector<HTMLDivElement>('.steam-gear');
    if(gear) {
      gear.style.transform = \`rotate(calc(\${item.style.getPropertyValue('--rot')} + 360deg)) scale(1.1)\`;
    }
    
    const mach = document.querySelector<HTMLDivElement>('.steam-machinery');
    if(mach) {
      mach.classList.add('shake');
      setTimeout(() => {
        mach.classList.remove('shake');
        if(gear) gear.style.transform = '';
      }, 300);
    }
  });
});`,
  css: `/* Steampunk Gear Dock Styles */
.steam-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 2rem;
  background: #1a1512; /* Dark soot */
  background-image: 
    radial-gradient(#2b1e16 1px, transparent 1px),
    radial-gradient(#2b1e16 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

.steam-machinery {
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 20px 40px;
  background: linear-gradient(to bottom, #5c4033, #3e2723);
  border-radius: 12px;
  border: 4px solid #8c5a2b; /* Brass/Copper */
  box-shadow: 
    inset 0 0 20px rgba(0,0,0,0.8),
    0 10px 20px rgba(0,0,0,0.6);
}

.steam-machinery.shake {
  animation: mechanical-shake 0.3s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes mechanical-shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.steam-bg-gear {
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: 0.3;
  z-index: 0;
  animation: gear-spin 20s linear infinite;
}

.sg-1 { top: -40px; left: -20px; }
.sg-2 { top: -30px; right: -20px; animation-direction: reverse; width: 80px; height: 80px; }

@keyframes gear-spin { 100% { transform: rotate(360deg); } }

.steam-dock {
  display: flex;
  gap: 25px;
  position: relative;
  z-index: 1;
}

.steam-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  position: relative;
}

/* The mechanical pipe underneath the gear */
.steam-pipe {
  width: 16px;
  height: 30px;
  background: linear-gradient(to right, #795548, #d7ccc8 30%, #795548 80%);
  border: 2px solid #3e2723;
  border-top: none;
  border-bottom: none;
  box-shadow: inset 0 5px 10px rgba(0,0,0,0.8);
  transition: height 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.steam-gear {
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, #ffb300, #ff6f00); /* Brass */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3e2723;
  border: 4px dashed #5d4037; /* Simulating gear teeth */
  box-shadow: 
    0 10px 15px rgba(0,0,0,0.5),
    inset 0 0 10px rgba(0,0,0,0.5);
  transform: rotate(var(--rot));
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 2;
}

.steam-gear svg {
  transform: rotate(calc(var(--rot) * -1)); /* Counter-rotate icon to keep it upright */
  transition: transform 0.4s;
}

.steam-item:hover .steam-gear {
  transform: rotate(calc(var(--rot) + 45deg));
  filter: brightness(1.2);
}
.steam-item:hover .steam-gear svg {
  transform: rotate(calc(var(--rot) * -1 - 45deg));
}

.steam-item.active .steam-pipe {
  height: 10px; /* Compress the pipe */
}

.steam-item.active .steam-gear {
  transform: translateY(20px) rotate(calc(var(--rot) + 180deg)); /* Push down and spin */
  box-shadow: 
    0 2px 5px rgba(0,0,0,0.5),
    inset 0 0 15px rgba(0,0,0,0.8);
  background: radial-gradient(circle, #ffe082, #ff8f00); /* Hotter brass */
}

.steam-item.active .steam-gear svg {
  transform: rotate(calc(var(--rot) * -1 - 180deg));
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a steampunk-themed dock navigation. The buttons should resemble brass gears mounted on pneumatic pipes. When clicked, the pipe should compress and the gear should spin and lock into place, accompanied by a subtle mechanical shake effect on the entire container.`
};
