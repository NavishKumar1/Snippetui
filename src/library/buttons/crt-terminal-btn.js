/**
 * Component: CRT Retro Terminal Button
 * Category: buttons
 */

export const component = {
  id: 'crt-terminal-btn',
  name: 'CRT Retro Terminal',
  category: 'buttons',
  tag: 'Glitch',
  html: `<button class="crt-terminal-btn">
  <div class="crt-screen-overlay"></div>
  <div class="crt-glow-beam"></div>
  <span class="crt-text" data-text="EXECUTE QUERY">EXECUTE QUERY</span>
</button>`,
  js: `// Interactive CRT Screen static flash on click
const crtBtn = document.querySelector('.crt-terminal-btn');
if (crtBtn) {
  const overlay = crtBtn.querySelector('.crt-screen-overlay');
  
  crtBtn.addEventListener('click', () => {
    if (overlay) {
      overlay.style.animation = 'none';
      overlay.offsetHeight; // trigger reflow
      overlay.style.animation = 'crt-screen-static 0.25s linear';
    }
  });
}`,
  ts: `// TypeScript Implementation
const crtBtn = document.querySelector<HTMLButtonElement>('.crt-terminal-btn');
if (crtBtn) {
  const overlay = crtBtn.querySelector<HTMLDivElement>('.crt-screen-overlay');
  
  crtBtn.addEventListener('click', () => {
    if (overlay) {
      overlay.style.animation = 'none';
      overlay.offsetHeight; // trigger reflow
      overlay.style.animation = 'crt-screen-static 0.25s linear';
    }
  });
}`,
  css: `/* CRT Retro Terminal Button Styles */
.crt-terminal-btn {
  position: relative;
  background: #020b04;
  border: 2px solid #00ff33;
  padding: 16px 36px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 0 15px rgba(0, 255, 51, 0.25),
    inset 0 0 10px rgba(0, 255, 51, 0.15);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* CRT curvature scan line sweep overlay */
.crt-screen-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  z-index: 2;
  pointer-events: none;
}

/* Scanning vertical laser glow beam */
.crt-glow-beam {
  position: absolute;
  left: 0;
  right: 0;
  height: 10px;
  background: rgba(0, 255, 51, 0.15);
  box-shadow: 0 0 15px rgba(0, 255, 51, 0.4);
  top: -20px;
  z-index: 1;
  pointer-events: none;
}

.crt-text {
  position: relative;
  z-index: 3;
  color: #00ff33;
  font-family: 'Courier New', Courier, monospace;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-shadow: 
    0 0 2px rgba(0, 255, 51, 0.8),
    0 0 8px rgba(0, 255, 51, 0.5);
  transition: all 0.3s ease;
}

/* Hover CRT flickering sweeps */
.crt-terminal-btn:hover {
  border-color: #00ff66;
  box-shadow: 
    0 0 25px rgba(0, 255, 102, 0.55),
    inset 0 0 15px rgba(0, 255, 102, 0.35);
  animation: crt-screen-flicker 0.15s infinite;
  transform: translateY(-2px);
}

.crt-terminal-btn:hover .crt-glow-beam {
  animation: crt-scan-down 2s infinite linear;
}

.crt-terminal-btn:hover .crt-text {
  color: #ffffff;
  text-shadow: 
    0 0 5px #ffffff,
    0 0 12px #00ff33,
    0 0 25px #00ff33;
}

.crt-terminal-btn:active {
  transform: translateY(1px);
}

/* CRT Screen Keyframes */
@keyframes crt-scan-down {
  0% { top: -20px; }
  100% { top: 120%; }
}

@keyframes crt-screen-flicker {
  0%, 100% { opacity: 0.95; }
  50% { opacity: 1; filter: brightness(1.05); }
}

@keyframes crt-screen-static {
  0% { background: rgba(0, 255, 51, 0.2); }
  50% { background: rgba(0, 255, 51, 0.05); }
  100% { background: transparent; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#020b04] border-2 border-[#00ff33] px-9 py-4 rounded cursor-pointer overflow-hidden shadow-[0_0_15px_rgba(0,255,51,0.25)] hover:shadow-[0_0_25px_rgba(0,255,102,0.55)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-[#00ff33] font-bold text-xs tracking-[0.2em] font-mono [text-shadow:0_0_2px_rgba(0,255,51,0.8)]">EXECUTE QUERY</span>
</button>`,
  prompt: `Design a premium "CRT Retro Terminal Button" component. A dark green industrial layout glows intensely in phosphor green. Hovering triggers vintage scanline sweeps, subtle CRT screen flickers, and phosphor lag persistence.`
};
