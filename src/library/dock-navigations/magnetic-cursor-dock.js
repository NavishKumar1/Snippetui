/**
 * Component: Magnetic Cursor Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'magnetic-cursor-dock',
  name: 'Magnetic Cursor Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="mag-dock-container">
  <nav class="mag-dock">
    <div class="mag-item">
      <a href="#" class="mag-btn active">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
      </a>
      <span class="mag-tooltip">Home</span>
    </div>

    <div class="mag-item">
      <a href="#" class="mag-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </a>
      <span class="mag-tooltip">Search</span>
    </div>

    <div class="mag-item">
      <a href="#" class="mag-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </a>
      <span class="mag-tooltip">Chat</span>
    </div>

    <div class="mag-item">
      <a href="#" class="mag-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      </a>
      <span class="mag-tooltip">Security</span>
    </div>

    <div class="mag-item">
      <a href="#" class="mag-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
      </a>
      <span class="mag-tooltip">Options</span>
    </div>
  </nav>
</div>`,
  js: `// Magnetic Hover Logic
const magBtns = document.querySelectorAll('.mag-btn');

magBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    // Calculate distance from center of button
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Move the button towards the cursor (magnet effect)
    btn.style.transform = \`translate(\${x * 0.4}px, \${y * 0.4}px) scale(1.1)\`;
    
    // Move the icon slightly more for parallax
    const icon = btn.querySelector('svg');
    if(icon) {
      icon.style.transform = \`translate(\${x * 0.2}px, \${y * 0.2}px)\`;
    }
  });

  btn.addEventListener('mouseleave', () => {
    // Reset positions with transition
    btn.style.transform = 'translate(0px, 0px) scale(1)';
    const icon = btn.querySelector('svg');
    if(icon) {
      icon.style.transform = 'translate(0px, 0px)';
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    magBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});`,
  ts: `// Magnetic Hover Logic (TypeScript)
const magBtns = document.querySelectorAll<HTMLAnchorElement>('.mag-btn');

magBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = btn.getBoundingClientRect();
    // Calculate distance from center of button
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Move the button towards the cursor (magnet effect)
    btn.style.transform = \`translate(\${x * 0.4}px, \${y * 0.4}px) scale(1.1)\`;
    
    // Move the icon slightly more for parallax
    const icon = btn.querySelector('svg');
    if(icon) {
      icon.style.transform = \`translate(\${x * 0.2}px, \${y * 0.2}px)\`;
    }
  });

  btn.addEventListener('mouseleave', () => {
    // Reset positions with transition
    btn.style.transform = 'translate(0px, 0px) scale(1)';
    const icon = btn.querySelector('svg');
    if(icon) {
      icon.style.transform = 'translate(0px, 0px)';
    }
  });

  btn.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    magBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});`,
  css: `/* Magnetic Cursor Dock Styles */
.mag-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 2rem;
  background: #0f172a; /* Slate 900 */
  font-family: 'Inter', sans-serif;
}

.mag-dock {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.mag-item {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* The invisible bounding box that catches the hover earlier */
.mag-item::before {
  content: '';
  position: absolute;
  top: -20px; left: -20px; right: -20px; bottom: -20px;
  z-index: 1;
}

.mag-btn {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #94a3b8;
  text-decoration: none;
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), background 0.3s, color 0.3s;
  z-index: 2;
  border: 1px solid rgba(255,255,255,0.05);
}

.mag-btn svg {
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  pointer-events: none;
}

.mag-btn:hover {
  background: #38bdf8; /* Light Blue */
  color: #fff;
  box-shadow: 0 10px 20px rgba(56, 189, 248, 0.4);
  /* The transition duration is shortened by JS instantly, 
     but kept here for smooth mouse-leave */
  transition: transform 0.1s linear, background 0.3s, color 0.3s; 
}

.mag-btn.active {
  background: #fff;
  color: #0f172a;
}

.mag-tooltip {
  position: absolute;
  top: -45px;
  background: #1e293b;
  color: #f8fafc;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  opacity: 0;
  transform: translateY(10px) scale(0.9);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  pointer-events: none;
  z-index: 3;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* Tooltip triangle */
.mag-tooltip::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 4px 4px 0;
  border-style: solid;
  border-color: #1e293b transparent transparent transparent;
}

.mag-item:hover .mag-tooltip {
  opacity: 1;
  transform: translateY(0) scale(1);
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a magnetic cursor dock. The buttons should be pulled towards the user's cursor when hovered, creating a sticky magnetic physics effect using Javascript tracking.`
};
