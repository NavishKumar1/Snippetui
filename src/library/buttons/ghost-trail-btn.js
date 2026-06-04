/**
 * Component: Ghost Specter Trail Button
 * Category: buttons
 */

export const component = {
  id: 'ghost-trail-btn',
  name: 'Ghost Specter Trail',
  category: 'buttons',
  tag: 'Interactive',
  html: `<button class="ghost-trail-btn">
  <span class="ghost-wrapper">
    <span class="ghost-label ghost-lag-3">WANDERER</span>
    <span class="ghost-label ghost-lag-2">WANDERER</span>
    <span class="ghost-label ghost-lag-1">WANDERER</span>
    <span class="ghost-label ghost-main">WANDERER</span>
  </span>
</button>`,
  js: `// Ghost Trail interactive movement trigger on Hover
const ghostBtn = document.querySelector('.ghost-trail-btn');
if (ghostBtn) {
  const mainText = ghostBtn.querySelector('.ghost-main');
  const echoes = ghostBtn.querySelectorAll('.ghost-label');
  
  ghostBtn.addEventListener('mousemove', (e) => {
    const rect = ghostBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Shift main coordinates and let echoes follow with coordinate lags
    const dx = (x - rect.width / 2) * 0.25;
    const dy = (y - rect.height / 2) * 0.25;
    
    mainText.style.transform = \`translate(\${dx}px, \${dy}px)\`;
    
    echoes.forEach((echo, idx) => {
      const lag = (idx + 1) * 0.1;
      echo.style.transform = \`translate(\${dx * lag}px, \${dy * lag}px)\`;
      echo.style.opacity = \`\${0.6 - (idx * 0.18)}\`;
    });
  });

  ghostBtn.addEventListener('mouseleave', () => {
    // Smooth snap back
    mainText.style.transform = 'translate(0, 0)';
    mainText.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    echoes.forEach((echo) => {
      echo.style.transform = 'translate(0, 0)';
      echo.style.opacity = '0';
      echo.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease';
    });
  });
  
  ghostBtn.addEventListener('mouseenter', () => {
    mainText.style.transition = 'none';
    echoes.forEach((echo) => {
      echo.style.transition = 'none';
    });
  });
}`,
  ts: `// TypeScript Implementation
const ghostBtn = document.querySelector<HTMLButtonElement>('.ghost-trail-btn');
if (ghostBtn) {
  const mainText = ghostBtn.querySelector<HTMLSpanElement>('.ghost-main');
  const echoes = ghostBtn.querySelectorAll<HTMLSpanElement>('.ghost-label');
  
  if (mainText) {
    ghostBtn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = ghostBtn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const dx = (x - rect.width / 2) * 0.25;
      const dy = (y - rect.height / 2) * 0.25;
      
      mainText.style.transform = \`translate(\${dx}px, \${dy}px)\`;
      
      echoes.forEach((echo, idx) => {
        const lag = (idx + 1) * 0.1;
        echo.style.transform = \`translate(\${dx * lag}px, \${dy * lag}px)\`;
        echo.style.opacity = \`\${0.6 - (idx * 0.18)}\`;
      });
    });

    ghostBtn.addEventListener('mouseleave', () => {
      mainText.style.transform = 'translate(0, 0)';
      mainText.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      echoes.forEach((echo) => {
        echo.style.transform = 'translate(0, 0)';
        echo.style.opacity = '0';
        echo.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease';
      });
    });
    
    ghostBtn.addEventListener('mouseenter', () => {
      mainText.style.transition = 'none';
      echoes.forEach((echo) => {
        echo.style.transition = 'none';
      });
    });
  }
}`,
  css: `/* Ghost Specter Trail Button Styles */
.ghost-trail-btn {
  position: relative;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 16px 36px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ghost-wrapper {
  position: relative;
  display: block;
  height: 20px;
  width: 100px;
}

/* Master typography and trail layers */
.ghost-label, .ghost-main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

.ghost-main {
  color: #ffffff;
  z-index: 5;
}

.ghost-label {
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}

.ghost-lag-1 { color: rgba(0, 242, 254, 0.8); }
.ghost-lag-2 { color: rgba(255, 0, 127, 0.6); }
.ghost-lag-3 { color: rgba(138, 43, 226, 0.4); }

/* Hover active sweeps */
.ghost-trail-btn:hover {
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 
    0 10px 25px rgba(255, 255, 255, 0.05),
    inset 0 0 10px rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.ghost-trail-btn:active {
  transform: translateY(1px);
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-transparent border border-white/15 px-9 py-4 rounded-lg cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:border-white/35 hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative block h-5 w-[100px] text-white font-bold text-xs tracking-[0.15em] text-center">WANDERER</span>
</button>`,
  prompt: `Design a premium "Ghost Specter Trail Button" component. A minimalist hollow vector capsule frame houses text inside. Hovering shifts text position organically, leaving behind three colored (cyan, magenta, violet) ghost echo trails lag-following the cursor movement coordinate paths.`
};
