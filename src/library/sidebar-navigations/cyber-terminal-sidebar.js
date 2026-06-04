/**
 * Component: Cyber Security Terminal Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'cyber-terminal-sidebar',
  name: 'Cyber Terminal Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="cyber-container">
  <div class="cyber-scanline"></div>
  <aside class="cyber-sidebar">
    <div class="cyber-header">
      <div class="cyber-status-light"></div>
      <span class="cyber-title">SYSTEM.SECURE</span>
    </div>

    <nav class="cyber-nav">
      <a href="#" class="cyber-item active">
        <span class="cyber-prefix">root@sec:~#</span>
        <span class="cyber-text">monitor</span>
      </a>

      <a href="#" class="cyber-item">
        <span class="cyber-prefix">root@sec:~#</span>
        <span class="cyber-text">firewall</span>
      </a>

      <a href="#" class="cyber-item">
        <span class="cyber-prefix">root@sec:~#</span>
        <span class="cyber-text">logs</span>
      </a>

      <a href="#" class="cyber-item">
        <span class="cyber-prefix">root@sec:~#</span>
        <span class="cyber-text">access</span>
      </a>

      <a href="#" class="cyber-item">
        <span class="cyber-prefix">root@sec:~#</span>
        <span class="cyber-text">breach_sim</span>
      </a>
    </nav>
    
    <div class="cyber-matrix-bg">
      <span>010101</span>
      <span>110010</span>
      <span>001100</span>
    </div>
  </aside>
</div>`,
  js: `// Cyber Terminal Glitch and Type Logic
const cyberItems = document.querySelectorAll('.cyber-item');

cyberItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    cyberItems.forEach(n => {
      n.classList.remove('active');
      n.querySelector('.cyber-text').classList.remove('typing');
    });
    
    item.classList.add('active');
    
    // Simulate terminal typing effect on active item
    const textNode = item.querySelector('.cyber-text');
    const originalText = textNode.innerText;
    textNode.innerText = '';
    textNode.classList.add('typing');
    
    let i = 0;
    const typeWriter = setInterval(() => {
      if (i < originalText.length) {
        textNode.innerText += originalText.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
      }
    }, 50); // 50ms per character
  });
});

// Random Matrix code rain simulation in background
const matrixBg = document.querySelector('.cyber-matrix-bg');
setInterval(() => {
  if(!matrixBg) return;
  const spans = matrixBg.querySelectorAll('span');
  spans.forEach(span => {
    span.innerText = Math.random().toString(2).substr(2, 6);
  });
}, 200);`,
  ts: `// Cyber Terminal Glitch and Type Logic (TypeScript)
const cyberItems = document.querySelectorAll<HTMLAnchorElement>('.cyber-item');

cyberItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    cyberItems.forEach(n => {
      n.classList.remove('active');
      const txt = n.querySelector<HTMLSpanElement>('.cyber-text');
      if(txt) txt.classList.remove('typing');
    });
    
    item.classList.add('active');
    
    const textNode = item.querySelector<HTMLSpanElement>('.cyber-text');
    if(textNode) {
      const originalText = textNode.innerText;
      textNode.innerText = '';
      textNode.classList.add('typing');
      
      let i = 0;
      const typeWriter = setInterval(() => {
        if (i < originalText.length) {
          textNode.innerText += originalText.charAt(i);
          i++;
        } else {
          clearInterval(typeWriter);
        }
      }, 50);
    }
  });
});

const matrixBg = document.querySelector<HTMLDivElement>('.cyber-matrix-bg');
if(matrixBg) {
  setInterval(() => {
    const spans = matrixBg.querySelectorAll('span');
    spans.forEach(span => {
      span.innerText = Math.random().toString(2).substr(2, 6);
    });
  }, 200);
}`,
  css: `/* Cyber Terminal Sidebar Styles */
.cyber-container {
  display: flex;
  height: 600px;
  background: #020202;
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  overflow: hidden;
  border: 1px solid #0f331a;
}

/* Old CRT TV scanline overlay */
.cyber-scanline {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 4px, 3px 100%;
  z-index: 100;
  pointer-events: none;
}

.cyber-sidebar {
  width: 320px;
  height: 100%;
  background: rgba(0, 15, 0, 0.8);
  border-right: 2px solid #00ff00;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 10;
  box-shadow: 5px 0 20px rgba(0, 255, 0, 0.1);
}

.cyber-header {
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #004400;
}

.cyber-status-light {
  width: 12px;
  height: 12px;
  background: #00ff00;
  border-radius: 50%;
  margin-right: 15px;
  box-shadow: 0 0 10px #00ff00, 0 0 20px #00ff00;
  animation: cyber-blink 1s infinite alternate;
}

@keyframes cyber-blink {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

.cyber-title {
  color: #00ff00;
  font-weight: bold;
  letter-spacing: 2px;
}

.cyber-nav {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cyber-item {
  display: flex;
  align-items: center;
  padding: 10px;
  color: #008800;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.2s;
  position: relative;
}

.cyber-item:hover {
  background: rgba(0, 255, 0, 0.1);
  color: #00cc00;
}

.cyber-prefix {
  margin-right: 10px;
  opacity: 0.5;
}

.cyber-item.active {
  background: rgba(0, 255, 0, 0.2);
  color: #00ff00;
  text-shadow: 0 0 5px #00ff00;
  border-left: 4px solid #00ff00;
}

.cyber-text {
  position: relative;
}

/* Blinking cursor for active item */
.cyber-text.typing::after {
  content: '_';
  position: absolute;
  right: -15px;
  animation: cyber-cursor 0.8s step-end infinite;
}

@keyframes cyber-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.cyber-matrix-bg {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  color: #004400;
  font-size: 12px;
  opacity: 0.5;
  pointer-events: none;
  z-index: -1;
}

/* Subtle entire sidebar glitch occasionally */
.cyber-sidebar {
  animation: cyber-glitch 10s infinite;
}

@keyframes cyber-glitch {
  0%, 98%, 100% { transform: translate(0); }
  99% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a Cyber Security Terminal sidebar. Use a high-contrast hacker aesthetic (neon green on deep black). Incorporate CRT scanline overlays, typing animation effects when clicking menu items, a blinking command-line cursor, and random binary code generators in the background.`
};
