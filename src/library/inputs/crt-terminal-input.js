/**
 * Component: CRT Retro Terminal Input
 * Category: inputs
 */

export const component = {
  id: 'crt-terminal-input',
  name: 'CRT Retro Terminal Input',
  category: 'inputs',
  tag: 'Glitch',
  html: `<div class="crt-input-group">
  <div class="crt-input-overlay"></div>
  <div class="crt-input-scan"></div>
  <input type="text" class="crt-terminal-input-field" placeholder=" " id="crt-input-demo" autocomplete="off">
  <label class="crt-input-label" for="crt-input-demo">SYS_PROMPT</label>
</div>`,
  js: `// Interactive Screen flicker and keydown flashes
const crtInp = document.querySelector('.crt-terminal-input-field');
if (crtInp) {
  const overlay = crtInp.parentElement.querySelector('.crt-input-overlay');
  
  crtInp.addEventListener('keydown', () => {
    // Flash crt cathode rays on keypresses
    if (overlay) {
      overlay.style.background = 'rgba(0, 255, 51, 0.1)';
      setTimeout(() => {
        overlay.style.background = 'transparent';
      }, 50);
    }
  });
}`,
  ts: `// TypeScript Implementation
const crtInp = document.querySelector<HTMLInputElement>('.crt-terminal-input-field');
if (crtInp) {
  const parent = crtInp.parentElement;
  if (parent) {
    const overlay = parent.querySelector<HTMLDivElement>('.crt-input-overlay');
    
    if (overlay) {
      crtInp.addEventListener('keydown', () => {
        overlay.style.background = 'rgba(0, 255, 51, 0.1)';
        setTimeout(() => {
          overlay.style.background = 'transparent';
        }, 50);
      });
    }
  }
}`,
  css: `/* CRT Retro Terminal Input Styles */
.crt-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.crt-input-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  z-index: 2;
  pointer-events: none;
  border-radius: 4px;
  transition: background 0.1s ease;
}

.crt-input-scan {
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(0, 255, 51, 0.2);
  box-shadow: 0 0 10px #00ff33;
  top: -10px;
  z-index: 1;
  pointer-events: none;
}

.crt-terminal-input-field {
  width: 100%;
  padding: 16px 18px;
  background: #020b04;
  border: 2px solid #00ff33;
  border-radius: 4px;
  color: #00ff33;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  font-weight: 900;
  outline: none;
  box-shadow: 
    0 0 10px rgba(0, 255, 51, 0.2),
    inset 0 0 8px rgba(0, 255, 51, 0.1);
  z-index: 2;
  position: relative;
  transition: all 0.3s ease;
}

.crt-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #00ff33;
  font-family: 'Courier New', Courier, monospace;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.1em;
  pointer-events: none;
  z-index: 3;
  text-shadow: 0 0 5px rgba(0, 255, 51, 0.5);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Focus CRT adjustments */
.crt-terminal-input-field:focus {
  border-color: #00ff66;
  box-shadow: 
    0 0 20px rgba(0, 255, 102, 0.45),
    inset 0 0 12px rgba(0, 255, 102, 0.25);
  animation: crt-input-flicker 0.15s infinite;
}

.crt-terminal-input-field:focus ~ .crt-input-scan {
  animation: crt-input-scan-down 2s infinite linear;
}

.crt-terminal-input-field:focus + .crt-input-label,
.crt-terminal-input-field:not(:placeholder-shown) + .crt-input-label {
  transform: translateY(-170%) scale(0.85);
  color: #ffffff;
  text-shadow: 
    0 0 5px #ffffff,
    0 0 12px #00ff33;
  background-color: #020b04;
  padding: 0 6px;
  z-index: 10;
}

@keyframes crt-input-scan-down {
  0% { top: 0%; }
  100% { top: 100%; }
}

@keyframes crt-input-flicker {
  0%, 100% { opacity: 0.96; }
  50% { opacity: 1; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="crt-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-[#020b04] border-2 border-[#00ff33] rounded text-[#00ff33] font-bold font-mono text-sm outline-none focus:border-[#00ff66] focus:shadow-[0_0_20px_rgba(0,255,102,0.45)] transition-all duration-300 relative z-10" />
  <label for="crt-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs text-[#00ff33] font-bold tracking-widest font-mono pointer-events-none transition-all duration-300 peer-focus:-translate-y-[170%] peer-focus:scale-85 peer-focus:text-white peer-focus:bg-[#020b04] peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-translate-y-[170%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:bg-[#020b04] peer-[:not(:placeholder-shown)]:px-1.5 z-20">
    SYS_PROMPT
  </label>
</div>`,
  prompt: `Design a premium "CRT Retro Terminal Input" component. Vintage screen overlay. Focus activates horizontal scanner sweep cycles and phosphor flickers, while typing glows green letters.`
};
