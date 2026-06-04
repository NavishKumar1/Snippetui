/**
 * Component: Parallax Depth Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'parallax-depth-sidebar',
  name: 'Parallax Depth Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="para-sidebar-container">
  <!-- Multi-layered parallax background -->
  <div class="para-layer para-bg-back"></div>
  <div class="para-layer para-bg-mid"></div>
  <div class="para-layer para-bg-front"></div>

  <aside class="para-sidebar">
    <div class="para-header">
      <h2 class="para-logo">VISTA</h2>
    </div>

    <nav class="para-nav">
      <a href="#" class="para-item active">
        <span class="para-text">Overview</span>
        <div class="para-hover-layer"></div>
      </a>

      <a href="#" class="para-item">
        <span class="para-text">Analytics</span>
        <div class="para-hover-layer"></div>
      </a>

      <a href="#" class="para-item">
        <span class="para-text">Campaigns</span>
        <div class="para-hover-layer"></div>
      </a>

      <a href="#" class="para-item">
        <span class="para-text">Audiences</span>
        <div class="para-hover-layer"></div>
      </a>
    </nav>
  </aside>
</div>`,
  js: `// Parallax Depth Logic
const paraContainers = document.querySelectorAll('.para-sidebar-container');

paraContainers.forEach(container => {
  const layers = container.querySelectorAll('.para-layer');
  const items = container.querySelectorAll('.para-item');

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;

    // Move layers at different speeds
    if(layers[0]) layers[0].style.transform = \`translate(\${x * 20}px, \${y * 20}px)\`;
    if(layers[1]) layers[1].style.transform = \`translate(\${x * 40}px, \${y * 40}px)\`;
    if(layers[2]) layers[2].style.transform = \`translate(\${x * 80}px, \${y * 80}px)\`;
    
    // Parallax the text slightly
    items.forEach(item => {
      const text = item.querySelector('.para-text');
      if (text) text.style.transform = \`translate(\${x * -10}px, \${y * -10}px)\`;
    });
  });

  container.addEventListener('mouseleave', () => {
    layers.forEach(layer => {
      layer.style.transform = 'translate(0px, 0px)';
    });
    items.forEach(item => {
      const text = item.querySelector('.para-text');
      if (text) text.style.transform = 'translate(0px, 0px)';
    });
  });

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      items.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });
});`,
  ts: `// Parallax Depth Logic (TypeScript)
const paraContainers = document.querySelectorAll<HTMLDivElement>('.para-sidebar-container');

paraContainers.forEach(container => {
  const layers = container.querySelectorAll<HTMLDivElement>('.para-layer');
  const items = container.querySelectorAll<HTMLAnchorElement>('.para-item');

  container.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;

    // Move layers at different speeds
    if(layers[0]) layers[0].style.transform = \`translate(\${x * 20}px, \${y * 20}px)\`;
    if(layers[1]) layers[1].style.transform = \`translate(\${x * 40}px, \${y * 40}px)\`;
    if(layers[2]) layers[2].style.transform = \`translate(\${x * 80}px, \${y * 80}px)\`;
    
    // Parallax the text slightly
    items.forEach(item => {
      const text = item.querySelector<HTMLSpanElement>('.para-text');
      if(text) text.style.transform = \`translate(\${x * -10}px, \${y * -10}px)\`;
    });
  });

  container.addEventListener('mouseleave', () => {
    layers.forEach(layer => {
      layer.style.transform = 'translate(0px, 0px)';
    });
    items.forEach(item => {
      const text = item.querySelector<HTMLSpanElement>('.para-text');
      if(text) text.style.transform = 'translate(0px, 0px)';
    });
  });

  items.forEach(item => {
    item.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      items.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });
});`,
  css: `/* Parallax Depth Sidebar Styles */
.para-sidebar-container {
  position: relative;
  height: 600px;
  background: #0f172a;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  color: white;
}

/* Base styling for layers to cover a larger area than container to prevent edge bleed during parallax */
.para-layer {
  position: absolute;
  top: -10%; left: -10%; right: -10%; bottom: -10%;
  background-size: cover;
  background-position: center;
  transition: transform 0.1s linear;
  pointer-events: none;
}

/* Uses SVG patterns for abstract mountains/waves */
.para-bg-back {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%231e293b" fill-opacity="1" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>');
  background-repeat: no-repeat;
  background-position: bottom;
  z-index: 1;
}

.para-bg-mid {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23334155" fill-opacity="1" d="M0,192L60,181.3C120,171,240,149,360,165.3C480,181,600,235,720,224C840,213,960,139,1080,128C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>');
  background-repeat: no-repeat;
  background-position: bottom;
  z-index: 2;
  opacity: 0.8;
}

.para-bg-front {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23475569" fill-opacity="1" d="M0,128L80,144C160,160,320,192,480,176C640,160,800,96,960,96C1120,96,1280,160,1360,192L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>');
  background-repeat: no-repeat;
  background-position: bottom;
  z-index: 3;
  opacity: 0.6;
}

.para-sidebar {
  position: absolute;
  top: 0; left: 0;
  width: 300px;
  height: 100%;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(12px);
  border-right: 1px solid rgba(255,255,255,0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.para-header {
  padding: 40px 30px;
}

.para-logo {
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 4px;
  margin: 0;
  background: linear-gradient(90deg, #38bdf8, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.para-nav {
  display: flex;
  flex-direction: column;
  padding: 0 15px;
}

.para-item {
  position: relative;
  padding: 20px 15px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  overflow: hidden;
  transition: color 0.3s;
}

.para-text {
  display: block;
  transition: transform 0.1s linear;
  position: relative;
  z-index: 2;
}

.para-hover-layer {
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, rgba(56,189,248,0.2), transparent);
  transition: left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1;
}

.para-item:hover {
  color: #fff;
}

.para-item:hover .para-hover-layer {
  left: 0;
}

.para-item.active {
  color: #38bdf8;
  font-weight: 700;
}
.para-item.active .para-hover-layer {
  left: 0;
  background: rgba(56,189,248,0.1);
  border-left: 4px solid #38bdf8;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a Parallax Depth Sidebar. Use a dark theme with an abstract multi-layered background that tracks mouse movement to create a strong 3D parallax effect behind the frosted glass sidebar. Navigation text should also have subtle counter-parallax.`
};
