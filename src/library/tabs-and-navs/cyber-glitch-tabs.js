/**
 * Component: Cyber Glitch Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'cyber-glitch-tabs',
  name: 'Cyber Glitch Tabs',
  category: 'tabs-and-navs',
  tag: 'Creative',
  html: `<div class="cyber-tabs-sandbox" id="cyber-tabs-container">
  <div class="cyber-terminal">
    <div class="cyber-header">
      <span class="cyber-indicator">SYS.ONLINE</span>
      <span class="cyber-version">v2.98</span>
    </div>
    
    <div class="cyber-nav">
      <button class="cyber-tab-btn active" data-target="console">CONSOLE</button>
      <button class="cyber-tab-btn" data-target="network">NET_GRID</button>
      <button class="cyber-tab-btn" data-target="security">SEC_FIRE</button>
    </div>
    
    <div class="cyber-body">
      <div class="cyber-pane active" id="cyber-pane-console">
        <span class="glitch-text" data-text="TERMINAL READY">TERMINAL READY</span>
        <p class="cyber-meta">> Initialising kernel modules... SAFE.</p>
      </div>
      <div class="cyber-pane" id="cyber-pane-network">
        <span class="glitch-text" data-text="GRID ROUTER ACTIVE">GRID ROUTER ACTIVE</span>
        <p class="cyber-meta">> Listening on port 5173... ENCRYPTED.</p>
      </div>
      <div class="cyber-pane" id="cyber-pane-security">
        <span class="glitch-text" data-text="SHIELDS 100%">SHIELDS 100%</span>
        <p class="cyber-meta">> Cybernetic firewall operational.</p>
      </div>
    </div>

    <!-- Spectrogram equalizer graphic line -->
    <div class="cyber-spectrogram">
      <div class="spectro-bar"></div>
      <div class="spectro-bar"></div>
      <div class="spectro-bar"></div>
      <div class="spectro-bar"></div>
      <div class="spectro-bar"></div>
      <div class="spectro-bar"></div>
      <div class="spectro-bar"></div>
      <div class="spectro-bar"></div>
    </div>
  </div>
</div>`,
  js: `// Cyber Glitch terminal switcher logic
const container = document.getElementById('cyber-tabs-container');
if (container) {
  const buttons = container.querySelectorAll('.cyber-tab-btn');
  const panes = container.querySelectorAll('.cyber-pane');
  const spectroBars = container.querySelectorAll('.spectro-bar');
  
  // Set random equalizing spectrogram animations
  const triggerEqualizer = () => {
    spectroBars.forEach(bar => {
      const height = Math.floor(Math.random() * 16) + 4;
      bar.style.height = \`\${height}px\`;
    });
  };
  
  const eqInterval = setInterval(triggerEqualizer, 100);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      
      const target = btn.getAttribute('data-target');
      
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Chromatic glitch animation on text header
      const activePane = container.querySelector(\`#cyber-pane-\${target}\`);
      if (activePane) {
        const text = activePane.querySelector('.glitch-text');
        if (text) {
          text.classList.remove('glitching');
          void text.offsetWidth; // force reflow
          text.classList.add('glitching');
        }
      }

      // Switch active panes
      panes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === \`cyber-pane-\${target}\`) {
          pane.classList.add('active');
        }
      });

      // Height shock spike on spectrogram
      spectroBars.forEach(bar => {
        bar.style.height = '24px';
      });
    });
  });

  // Cleanup interval on page changes
  const checkConnection = setInterval(() => {
    if (!container.isConnected) {
      clearInterval(eqInterval);
      clearInterval(checkConnection);
    }
  }, 1000);
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('cyber-tabs-container') as HTMLDivElement | null;
if (container) {
  const buttons = container.querySelectorAll('.cyber-tab-btn');
  const panes = container.querySelectorAll('.cyber-pane');
  const spectroBars = container.querySelectorAll('.spectro-bar');
  
  const triggerEqualizer = () => {
    spectroBars.forEach(bar => {
      const height = Math.floor(Math.random() * 16) + 4;
      (bar as HTMLElement).style.height = \`\${height}px\`;
    });
  };
  
  const eqInterval = setInterval(triggerEqualizer, 100);

  buttons.forEach(btn => {
    const btnEl = btn as HTMLButtonElement;
    btnEl.addEventListener('click', () => {
      if (btnEl.classList.contains('active')) return;
      
      const target = btnEl.getAttribute('data-target');
      
      buttons.forEach(b => (b as HTMLElement).classList.remove('active'));
      btnEl.classList.add('active');
      
      const activePane = container.querySelector(\`#cyber-pane-\${target}\`);
      if (activePane) {
        const text = activePane.querySelector('.glitch-text');
        if (text) {
          text.classList.remove('glitching');
          void (text as HTMLElement).offsetWidth;
          text.classList.add('glitching');
        }
      }

      panes.forEach(pane => {
        (pane as HTMLElement).classList.remove('active');
        if ((pane as HTMLElement).id === \`cyber-pane-\${target}\`) {
          (pane as HTMLElement).classList.add('active');
        }
      });

      spectroBars.forEach(bar => {
        (bar as HTMLElement).style.height = '24px';
      });
    });
  });

  const checkConnection = setInterval(() => {
    if (!container.isConnected) {
      clearInterval(eqInterval);
      clearInterval(checkConnection);
    }
  }, 1000);
}`,
  css: `/* Cyberpunk Glitch terminal tab style */
.cyber-tabs-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #0f0a14 0%, #050307 100%);
  border: 1px solid rgba(168, 85, 247, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.cyber-terminal {
  width: 320px;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #a855f7;
  box-shadow: 0 0 25px rgba(168, 85, 247, 0.25);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
}

.cyber-terminal::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.12) 50%);
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 10;
}

.cyber-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Fira Code', monospace;
  font-size: 10px;
  color: #a855f7;
  border-bottom: 1px dashed rgba(168, 85, 247, 0.3);
  padding-bottom: 8px;
}

.cyber-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cyber-indicator::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #39ff14;
  box-shadow: 0 0 6px #39ff14;
}

.cyber-nav {
  display: flex;
  background: rgba(168, 85, 247, 0.05);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 6px;
  padding: 2px;
}

.cyber-tab-btn {
  flex-grow: 1;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Fira Code', monospace;
  font-size: 10.5px;
  font-weight: 700;
  padding: 8px 0;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.cyber-tab-btn.active {
  background: #a855f7;
  color: #000000;
  box-shadow: 0 0 10px #a855f7;
  text-shadow: none;
}

.cyber-body {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cyber-pane {
  display: none;
  text-align: center;
  width: 100%;
}

.cyber-pane.active {
  display: block;
  animation: terminalBoot 0.2s steps(2);
}

.glitch-text {
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  position: relative;
  display: inline-block;
}

.glitch-text.glitching::before,
.glitch-text.glitching::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  clip-path: rect(0 0 0 0);
}

.glitch-text.glitching::before {
  left: -2px;
  text-shadow: 2px 0 #ff0055;
  animation: glitch-anim 0.3s infinite linear alternate-reverse;
}

.glitch-text.glitching::after {
  left: 2px;
  text-shadow: -2px 0 #00f2fe;
  animation: glitch-anim2 0.3s infinite linear alternate-reverse;
}

.cyber-meta {
  font-family: 'Fira Code', monospace;
  font-size: 8.5px;
  color: #39ff14;
  margin: 6px 0 0 0;
}

.cyber-spectrogram {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  height: 25px;
  border-top: 1px dashed rgba(168, 85, 247, 0.2);
  padding-top: 8px;
}

.spectro-bar {
  width: 6px;
  height: 6px;
  background: #a855f7;
  box-shadow: 0 0 6px #a855f7;
  border-radius: 1px;
  transition: height 0.15s cubic-bezier(0.19, 1, 0.22, 1);
}

@keyframes terminalBoot {
  0% { opacity: 0.2; transform: scaleY(0.95); filter: hue-rotate(90deg); }
  50% { opacity: 0.9; transform: scaleY(1.02); }
  100% { opacity: 1; transform: scaleY(1); }
}

@keyframes glitch-anim {
  0% { clip-path: inset(40% 0 61% 0); }
  20% { clip-path: inset(92% 0 1% 0); }
  40% { clip-path: inset(15% 0 80% 0); }
  60% { clip-path: inset(80% 0 5% 0); }
  80% { clip-path: inset(3% 0 92% 0); }
  100% { clip-path: inset(55% 0 35% 0); }
}

@keyframes glitch-anim2 {
  0% { clip-path: inset(25% 0 58% 0); }
  30% { clip-path: inset(70% 0 10% 0); }
  65% { clip-path: inset(12% 0 78% 0); }
  90% { clip-path: inset(85% 0 2% 0); }
  100% { clip-path: inset(40% 0 45% 0); }
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#0f0a14] to-[#050307] border border-purple-500/15 rounded-3xl flex items-center justify-center p-4 box-border overflow-hidden" id="cyber-tabs-container">
  <div class="cyber-terminal w-[320px] bg-black/70 border border-purple-500 rounded-xl p-4 flex flex-col gap-4 relative overflow-hidden shadow-[0_0_25px_rgba(168,85,247,0.25)] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,0.03)_50%,rgba(0,0,0,0.12)_50%)] before:bg-[length:100%_4px] before:pointer-events-none before:z-50">
    <div class="cyber-header flex justify-between items-center font-mono text-[10px] text-purple-400 border-b border-dashed border-purple-500/30 pb-2">
      <span class="cyber-indicator flex items-center gap-1.5 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#39ff14] before:shadow-[0_0_6px_#39ff14]">SYS.ONLINE</span>
      <span class="cyber-version">v2.98</span>
    </div>
    
    <div class="cyber-nav flex bg-purple-500/5 border border-purple-500/20 rounded-md p-0.5">
      <button class="cyber-tab-btn active flex-grow bg-transparent border-none text-white/50 hover:text-white font-mono text-[10.5px] font-bold py-2 cursor-pointer rounded transition [&.active]:bg-purple-500 [&.active]:text-black [&.active]:shadow-[0_0_10px_#a855f7]" data-target="console">CONSOLE</button>
      <button class="cyber-tab-btn flex-grow bg-transparent border-none text-white/50 hover:text-white font-mono text-[10.5px] font-bold py-2 cursor-pointer rounded transition [&.active]:bg-purple-500 [&.active]:text-black [&.active]:shadow-[0_0_10px_#a855f7]" data-target="network">NET_GRID</button>
      <button class="cyber-tab-btn flex-grow bg-transparent border-none text-white/50 hover:text-white font-mono text-[10.5px] font-bold py-2 cursor-pointer rounded transition [&.active]:bg-purple-500 [&.active]:text-black [&.active]:shadow-[0_0_10px_#a855f7]" data-target="security">SEC_FIRE</button>
    </div>
    
    <div class="cyber-body h-[60px] flex items-center justify-center">
      <div class="cyber-pane active hidden text-center w-full [&.active]:block [&.active]:animate-[terminalBoot_0.2s_steps(2)]" id="cyber-pane-console">
        <span class="glitch-text relative inline-block font-sans text-base font-extrabold text-white [&.glitching]:before:content-[attr(data-text)] [&.glitching]:before:absolute [&.glitching]:before:left-0 [&.glitching]:before:w-full [&.glitching]:before:h-full [&.glitching]:before:bg-black [&.glitching]:before:clip-rect [&.glitching]:before:-left-[2px] [&.glitching]:before:text-shadow-[2px_0_#ff0055] [&.glitching]:before:animate-[glitch-anim_0.3s_infinite_linear_alternate-reverse] [&.glitching]:after:content-[attr(data-text)] [&.glitching]:after:absolute [&.glitching]:after:left-0 [&.glitching]:after:w-full [&.glitching]:after:h-full [&.glitching]:after:bg-black [&.glitching]:after:clip-rect [&.glitching]:after:left-[2px] [&.glitching]:after:text-shadow-[-2px_0_#00f2fe] [&.glitching]:after:animate-[glitch-anim2_0.3s_infinite_linear_alternate-reverse]" data-text="TERMINAL READY">TERMINAL READY</span>
        <p class="font-mono text-[8.5px] text-[#39ff14] mt-1.5">> Initialising kernel modules... SAFE.</p>
      </div>
      <div class="cyber-pane hidden text-center w-full [&.active]:block [&.active]:animate-[terminalBoot_0.2s_steps(2)]" id="cyber-pane-network">
        <span class="glitch-text relative inline-block font-sans text-base font-extrabold text-white [&.glitching]:before:content-[attr(data-text)] [&.glitching]:before:absolute [&.glitching]:before:left-0 [&.glitching]:before:w-full [&.glitching]:before:h-full [&.glitching]:before:bg-black [&.glitching]:before:clip-rect [&.glitching]:before:-left-[2px] [&.glitching]:before:text-shadow-[2px_0_#ff0055] [&.glitching]:before:animate-[glitch-anim_0.3s_infinite_linear_alternate-reverse] [&.glitching]:after:content-[attr(data-text)] [&.glitching]:after:absolute [&.glitching]:after:left-0 [&.glitching]:after:w-full [&.glitching]:after:h-full [&.glitching]:after:bg-black [&.glitching]:after:clip-rect [&.glitching]:after:left-[2px] [&.glitching]:after:text-shadow-[-2px_0_#00f2fe] [&.glitching]:after:animate-[glitch-anim2_0.3s_infinite_linear_alternate-reverse]" data-text="GRID ROUTER ACTIVE">GRID ROUTER ACTIVE</span>
        <p class="font-mono text-[8.5px] text-[#39ff14] mt-1.5">> Listening on port 5173... ENCRYPTED.</p>
      </div>
      <div class="cyber-pane hidden text-center w-full [&.active]:block [&.active]:animate-[terminalBoot_0.2s_steps(2)]" id="cyber-pane-security">
        <span class="glitch-text relative inline-block font-sans text-base font-extrabold text-white [&.glitching]:before:content-[attr(data-text)] [&.glitching]:before:absolute [&.glitching]:before:left-0 [&.glitching]:before:w-full [&.glitching]:before:h-full [&.glitching]:before:bg-black [&.glitching]:before:clip-rect [&.glitching]:before:-left-[2px] [&.glitching]:before:text-shadow-[2px_0_#ff0055] [&.glitching]:before:animate-[glitch-anim_0.3s_infinite_linear_alternate-reverse] [&.glitching]:after:content-[attr(data-text)] [&.glitching]:after:absolute [&.glitching]:after:left-0 [&.glitching]:after:w-full [&.glitching]:after:h-full [&.glitching]:after:bg-black [&.glitching]:after:clip-rect [&.glitching]:after:left-[2px] [&.glitching]:after:text-shadow-[-2px_0_#00f2fe] [&.glitching]:after:animate-[glitch-anim2_0.3s_infinite_linear_alternate-reverse]" data-text="SHIELDS 100%">SHIELDS 100%</span>
        <p class="font-mono text-[8.5px] text-[#39ff14] mt-1.5">> Cybernetic firewall operational.</p>
      </div>
    </div>

    <div class="cyber-spectrogram flex items-end justify-center gap-1 h-[25px] border-t border-dashed border-purple-500/20 pt-2">
      <div class="spectro-bar w-1.5 h-1.5 bg-purple-500 shadow-[0_0_6px_#a855f7] rounded-sm transition-all duration-150 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
      <div class="spectro-bar w-1.5 h-1.5 bg-purple-500 shadow-[0_0_6px_#a855f7] rounded-sm transition-all duration-150 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
      <div class="spectro-bar w-1.5 h-1.5 bg-purple-500 shadow-[0_0_6px_#a855f7] rounded-sm transition-all duration-150 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
      <div class="spectro-bar w-1.5 h-1.5 bg-purple-500 shadow-[0_0_6px_#a855f7] rounded-sm transition-all duration-150 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
      <div class="spectro-bar w-1.5 h-1.5 bg-purple-500 shadow-[0_0_6px_#a855f7] rounded-sm transition-all duration-150 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
      <div class="spectro-bar w-1.5 h-1.5 bg-purple-500 shadow-[0_0_6px_#a855f7] rounded-sm transition-all duration-150 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
      <div class="spectro-bar w-1.5 h-1.5 bg-purple-500 shadow-[0_0_6px_#a855f7] rounded-sm transition-all duration-150 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
      <div class="spectro-bar w-1.5 h-1.5 bg-purple-500 shadow-[0_0_6px_#a855f7] rounded-sm transition-all duration-150 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
    </div>
  </div>
</div>`,
  prompt: 'Design a cyberpunk terminal glitch tab bar selector featuring vertical audio spectrum visualizations and neon scanlines.'
};
