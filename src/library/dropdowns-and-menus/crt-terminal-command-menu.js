/**
 * Component: CRT Terminal Command Menu
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'crt-terminal-command-menu',
  name: 'CRT Terminal Command Menu',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="crt-menu-container">
  <!-- Terminal Prompt Trigger -->
  <button class="crt-menu-trigger">
    <span class="crt-cursor-blink">> </span>
    <span>TERMINAL_MENU</span>
  </button>
  
  <!-- CRT Phosphor Display -->
  <div class="crt-menu-display">
    <div class="crt-menu-scanlines"></div>
    <div class="crt-menu-glare"></div>
    <div class="crt-command-list">
      <div class="crt-cmd-item" style="--i: 0;">
        <span class="crt-prompt">> </span>
        <span class="crt-text">BOOT_CORE_DB</span>
      </div>
      <div class="crt-cmd-item" style="--i: 1;">
        <span class="crt-prompt">> </span>
        <span class="crt-text">TELEMETRY_STAT</span>
      </div>
      <div class="crt-cmd-item" style="--i: 2;">
        <span class="crt-prompt">> </span>
        <span class="crt-text">BYPASS_MATRIX</span>
      </div>
      <div class="crt-cmd-item" style="--i: 3;">
        <span class="crt-prompt">> </span>
        <span class="crt-text">SHUTDOWN_SYS</span>
      </div>
    </div>
  </div>
</div>`,
  js: `// Character typing boot simulation on CRT dropdown trigger
const ctWrapper = document.querySelector('.crt-menu-container');
if (ctWrapper) {
  const trigger = ctWrapper.querySelector('.crt-menu-trigger');
  const items = ctWrapper.querySelectorAll('.crt-cmd-item');
  
  trigger.addEventListener('click', () => {
    ctWrapper.classList.toggle('active');
    
    if (ctWrapper.classList.contains('active')) {
      // Re-trigger typewriter text animation by refreshing content
      items.forEach(item => {
        const textSpan = item.querySelector('.crt-text');
        const text = textSpan.textContent;
        textSpan.textContent = '';
        
        let charIndex = 0;
        const typing = setInterval(() => {
          textSpan.textContent += text[charIndex];
          charIndex++;
          if (charIndex >= text.length) {
            clearInterval(typing);
          }
        }, 30);
      });
    }
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.querySelector('.crt-text').textContent;
      trigger.querySelector('span:nth-child(2)').textContent = text;
      ctWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
    if (!ctWrapper.contains(e.target)) {
      ctWrapper.classList.remove('active');
    }
  });
}`,
  ts: `// TypeScript Implementation
const ctWrapper = document.querySelector<HTMLDivElement>('.crt-menu-container');
if (ctWrapper) {
  const trigger = ctWrapper.querySelector<HTMLButtonElement>('.crt-menu-trigger');
  const items = ctWrapper.querySelectorAll<HTMLDivElement>('.crt-cmd-item');
  
  if (trigger) {
    trigger.addEventListener('click', () => {
      ctWrapper.classList.toggle('active');
      
      if (ctWrapper.classList.contains('active')) {
        items.forEach(item => {
          const textSpan = item.querySelector<HTMLSpanElement>('.crt-text');
          if (!textSpan) return;
          const text = textSpan.textContent || '';
          textSpan.textContent = '';
          
          let charIndex = 0;
          const typing = setInterval(() => {
            if (textSpan) {
              textSpan.textContent += text[charIndex];
            }
            charIndex++;
            if (charIndex >= text.length) {
              clearInterval(typing);
            }
          }, 30);
        });
      }
    });
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const textSpan = item.querySelector<HTMLSpanElement>('.crt-text');
      const text = textSpan ? textSpan.textContent : '';
      const label = trigger ? trigger.querySelector<HTMLSpanElement>('span:nth-child(2)') : null;
      if (label && text) {
        label.textContent = text;
      }
      ctWrapper.classList.remove('active');
    });
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (ctWrapper && !ctWrapper.contains(e.target as Node)) {
      ctWrapper.classList.remove('active');
    }
  });
}`,
  css: `/* CRT Terminal Command Menu Styles */
.crt-menu-container {
  position: relative;
  width: 270px;
  background: #020904;
  border: 3px solid #1a331e;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(51, 255, 51, 0.15);
  font-family: 'Courier New', Courier, monospace;
  box-sizing: border-box;
  user-select: none;
}

.crt-menu-trigger {
  width: 100%;
  padding: 12px 16px;
  background: #031005;
  border: 1px solid #122c16;
  border-radius: 4px;
  color: #33ff33;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  outline: none;
  text-shadow: 0 0 4px rgba(51, 255, 51, 0.6);
  transition: all 0.3s;
}

.crt-menu-trigger:hover {
  background: #06200a;
  border-color: #33ff33;
  box-shadow: 0 0 10px rgba(51, 255, 51, 0.2);
}

.crt-cursor-blink {
  animation: crt-blink 1s infinite steps(2, start);
}

/* CRT Screen drop panel */
.crt-menu-display {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: #031005;
  border: 2.5px solid #1a331e;
  border-radius: 6px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 100;
  pointer-events: none;
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.crt-menu-container.active .crt-menu-display {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), inset 0 0 15px rgba(51, 255, 51, 0.1);
  border-color: #122c16;
}

.crt-menu-scanlines {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 5;
}

.crt-menu-glare {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 15%, rgba(255, 255, 255, 0.04) 0%, transparent 60%);
  pointer-events: none;
  z-index: 6;
}

/* Command items formatting */
.crt-command-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  z-index: 2;
}

.crt-cmd-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  color: rgba(51, 255, 51, 0.7);
  font-size: 12.5px;
  font-weight: 700;
  border-radius: 3px;
  cursor: pointer;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.15s, color 0.15s;
  transition-delay: calc(var(--i) * 0.05s);
}

.crt-menu-container.active .crt-cmd-item {
  opacity: 1;
  transform: translateX(0);
}

.crt-prompt {
  color: #ff0055;
  text-shadow: 0 0 3px rgba(255, 0, 85, 0.5);
  margin-right: 8px;
}

.crt-cmd-item:hover {
  background: rgba(51, 255, 51, 0.08);
  color: #33ff33;
  text-shadow: 0 0 4px rgba(51, 255, 51, 0.8);
}

.crt-cmd-item:hover .crt-prompt {
  color: #33ff33;
  text-shadow: 0 0 4px #33ff33;
}

@keyframes crt-blink {
  to { opacity: 0; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[270px] bg-[#020904] border-[3px] border-[#1a331e] rounded-lg p-2 shadow-2xl font-mono select-none">
  <button class="w-full px-4 py-3 bg-[#031005] border border-[#122c16] rounded text-green-400 font-bold text-xs tracking-wider flex items-center gap-2 shadow-[inset_0_0_10px_rgba(51,255,51,0.15)] hover:bg-[#06200a] transition-all">
    <span class="animate-pulse">> </span>
    <span>TERMINAL_MENU</span>
  </button>
</div>`,
  prompt: `Design a premium "CRT Terminal Command Menu" component. Opening the green phosphor CRT screen dropdown triggers rapid typewriter text simulation on command options with horizontal scanlines.`
};
