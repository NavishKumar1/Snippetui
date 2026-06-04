/**
 * Component: Cyberpunk Glitch Accordion
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'cyberpunk-glitch-accordion',
  name: 'Cyberpunk Glitch Accordion',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="cyber-accordion-wrapper">
  <div class="cyber-accordion-container">
    <div class="cyber-accordion-item">
      <button class="cyber-accordion-trigger" data-glitch="SYSTEM DIAGNOSTICS">
        <span class="cyber-trigger-text">SYSTEM DIAGNOSTICS</span>
        <span class="cyber-chevron">[+]</span>
      </button>
      <div class="cyber-accordion-content">
        <div class="cyber-grid-overlay"></div>
        <div class="cyber-inner-text">
          <p class="cyber-terminal-text">> TELEMETRY DENSITY: ACTIVE</p>
          <p class="cyber-terminal-text">> SHIELD_MATRIX: STABLE (94%)</p>
          <p class="cyber-terminal-text">> NEURAL_LINK: CONVERGED</p>
          <p class="cyber-terminal-text">> status: [ALL_SYSTEMS_OPERATIONAL]</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Glitch text triggers and cyberpunk neon flicker toggling
const cbWrapper = document.querySelector('.cyber-accordion-wrapper');
if (cbWrapper) {
  const trigger = cbWrapper.querySelector('.cyber-accordion-trigger');
  const container = cbWrapper.querySelector('.cyber-accordion-container');
  const textEl = cbWrapper.querySelector('.cyber-trigger-text');
  const chevron = cbWrapper.querySelector('.cyber-chevron');
  
  const originalText = textEl.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%@$';
  
  const glitchEffect = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      textEl.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iterations) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      if (iterations >= originalText.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 20);
  };

  trigger.addEventListener('click', () => {
    container.classList.toggle('expanded');
    glitchEffect();
    
    // Add visual glitch impact flicker class
    trigger.classList.add('glitch-flicker');
    setTimeout(() => {
      trigger.classList.remove('glitch-flicker');
    }, 400);

    if (container.classList.contains('expanded')) {
      chevron.textContent = '[-]';
    } else {
      chevron.textContent = '[+]';
    }
  });
}`,
  ts: `// TypeScript Implementation
const cbWrapper = document.querySelector<HTMLDivElement>('.cyber-accordion-wrapper');
if (cbWrapper) {
  const trigger = cbWrapper.querySelector<HTMLButtonElement>('.cyber-accordion-trigger');
  const container = cbWrapper.querySelector<HTMLDivElement>('.cyber-accordion-container');
  const textEl = cbWrapper.querySelector<HTMLSpanElement>('.cyber-trigger-text');
  const chevron = cbWrapper.querySelector<HTMLSpanElement>('.cyber-chevron');
  
  if (trigger && container && textEl && chevron) {
    const originalText = textEl.textContent || '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%@$';
    
    const glitchEffect = () => {
      let iterations = 0;
      const interval = setInterval(() => {
        textEl.textContent = originalText
          .split('')
          .map((char, index) => {
            if (index < iterations) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        if (iterations >= originalText.length) {
          clearInterval(interval);
        }
        iterations += 1 / 3;
      }, 20);
    };

    trigger.addEventListener('click', () => {
      container.classList.toggle('expanded');
      glitchEffect();
      
      trigger.classList.add('glitch-flicker');
      setTimeout(() => {
        trigger.classList.remove('glitch-flicker');
      }, 400);

      if (container.classList.contains('expanded')) {
        chevron.textContent = '[-]';
      } else {
        chevron.textContent = '[+]';
      }
    });
  }
}`,
  css: `/* Cyberpunk Glitch Accordion Styles */
.cyber-accordion-wrapper {
  position: relative;
  width: 300px;
  font-family: 'Courier New', Courier, monospace;
  box-sizing: border-box;
  padding: 10px;
}

.cyber-accordion-container {
  display: flex;
  flex-direction: column;
}

.cyber-accordion-item {
  background: #020205;
  border: 2px solid #00ff46;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 255, 70, 0.15);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.cyber-accordion-trigger {
  width: 100%;
  padding: 16px 20px;
  background: transparent;
  border: none;
  color: #00ff46;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
  position: relative;
  border-bottom: 2px solid transparent;
  text-shadow: 0 0 4px rgba(0, 255, 70, 0.5);
}

/* Neon split-channel text glitch effect */
.cyber-accordion-trigger::before,
.cyber-accordion-trigger::after {
  content: attr(data-glitch);
  position: absolute;
  top: 16px;
  left: 20px;
  width: calc(100% - 40px);
  height: 100%;
  background: #020205;
  overflow: hidden;
  clip-path: rect(0 0 0 0);
}

.cyber-accordion-trigger.glitch-flicker::before {
  left: 22px;
  text-shadow: -2px 0 #ff0055;
  clip-path: rect(10px 9999px 20px 0);
  animation: glitch-anim-1 0.3s infinite linear alternate-reverse;
}

.cyber-accordion-trigger.glitch-flicker::after {
  left: 18px;
  text-shadow: 2px 0 #00f2fe;
  clip-path: rect(25px 9999px 35px 0);
  animation: glitch-anim-2 0.3s infinite linear alternate-reverse;
}

.cyber-chevron {
  color: #ff0055;
  text-shadow: 0 0 4px rgba(255, 0, 85, 0.5);
  font-weight: bold;
}

.cyber-accordion-content {
  max-height: 0px;
  opacity: 0;
  padding: 0 20px;
  position: relative;
  overflow: hidden;
  background: #040905;
  border-top: 1px solid rgba(0, 255, 70, 0.1);
  transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s, padding 0.4s;
}

.cyber-grid-overlay {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%);
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 1;
}

.cyber-inner-text {
  padding: 16px 0;
  position: relative;
  z-index: 2;
}

.cyber-terminal-text {
  font-size: 12px;
  color: rgba(0, 255, 70, 0.85);
  text-shadow: 0 0 3px rgba(0, 255, 70, 0.3);
  margin: 6px 0;
  line-height: 1.5;
}

/* Expanded styles */
.cyber-accordion-container.expanded .cyber-accordion-item {
  border-color: #ff0055;
  box-shadow: 0 0 15px rgba(255, 0, 85, 0.3);
}

.cyber-accordion-container.expanded .cyber-accordion-trigger {
  color: #ff0055;
  text-shadow: 0 0 4px rgba(255, 0, 85, 0.5);
  border-color: rgba(255, 0, 85, 0.2);
}

.cyber-accordion-container.expanded .cyber-accordion-content {
  max-height: 130px;
  opacity: 1;
  padding-bottom: 8px;
}

@keyframes glitch-anim-1 {
  0% { clip-path: rect(12px, 9999px, 15px, 0); }
  50% { clip-path: rect(5px, 9999px, 20px, 0); }
  100% { clip-path: rect(18px, 9999px, 2px, 0); }
}

@keyframes glitch-anim-2 {
  0% { clip-path: rect(25px, 9999px, 5px, 0); }
  50% { clip-path: rect(14px, 9999px, 28px, 0); }
  100% { clip-path: rect(8px, 9999px, 33px, 0); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] font-mono p-2">
  <div class="flex flex-col">
    <div class="bg-[#020205] border-2 border-green-500 rounded shadow-[0_0_10px_rgba(0,255,70,0.15)] overflow-hidden">
      <button class="w-full px-5 py-4 text-left text-green-400 font-bold text-xs tracking-widest flex justify-between items-center shadow-[0_0_4px_rgba(0,255,70,0.5)]">
        <span>SYSTEM DIAGNOSTICS</span>
        <span class="text-rose-500">[+]</span>
      </button>
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Cyberpunk Glitch Accordion" menu. Set inside a retro-cyber matrix frame, opening the item fires rapid character descrambling and split-channel cyan/red text offset glitches alongside phosphor scanlines.`
};
