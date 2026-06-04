/**
 * Component: Smart Auto-Scaling Container
 * Category: containers
 */

export const component = {
  id: 'smart-auto-scaling-container',
  name: 'Smart Auto-Scaling Container',
  category: 'containers',
  tag: 'Premium',
  html: `<div class="smart-wrapper">
  <div class="smart-container">
    <div class="smart-header">
      <div class="smart-logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
        <span>QUANTUM</span>
      </div>
      <div class="smart-controls">
        <button class="smart-btn">Log In</button>
        <button class="smart-btn primary">Sign Up</button>
      </div>
    </div>
    
    <div class="smart-hero">
      <div class="smart-content">
        <h1>Next-Gen Infrastructure</h1>
        <p>Deploy globally in seconds. Scale infinitely. The ultimate cloud platform for gaming backends.</p>
        <div class="smart-search">
          <input type="text" placeholder="Search documentation, guides, API..." class="smart-input">
          <button class="smart-search-btn">Search</button>
        </div>
      </div>
      
      <div class="smart-visual">
        <div class="smart-globe">
          <div class="smart-node n1"></div>
          <div class="smart-node n2"></div>
          <div class="smart-node n3"></div>
          <svg class="smart-connections" viewBox="0 0 100 100">
             <path d="M30,30 Q50,10 70,40 T40,70" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          </svg>
        </div>
      </div>
    </div>
    
    <div class="smart-features">
      <div class="smart-feature">
        <div class="smart-f-icon">⚡</div>
        <h3>Ultra Low Latency</h3>
        <p>Edge computing locations strategically placed worldwide.</p>
      </div>
      <div class="smart-feature">
        <div class="smart-f-icon">🛡️</div>
        <h3>DDoS Protection</h3>
        <p>Enterprise-grade security built directly into the network layer.</p>
      </div>
      <div class="smart-feature">
        <div class="smart-f-icon">📈</div>
        <h3>Auto Scaling</h3>
        <p>Resources spin up automatically to meet sudden player spikes.</p>
      </div>
    </div>
  </div>
</div>`,
  js: `// Smart Auto-Scaling Logic
// This component primarily uses CSS container queries (@container) 
// to independently scale its internal layout regardless of the viewport.
// We will add a small JS script to simulate resizing the container to prove it works.

const smartWrapper = document.querySelector('.smart-wrapper');
const smartContainer = document.querySelector('.smart-container');

if(smartWrapper && smartContainer) {
  // Demo resizer functionality for preview purposes
  const resizer = document.createElement('input');
  resizer.type = 'range';
  resizer.min = '300';
  resizer.max = '1200';
  resizer.value = '1200';
  resizer.className = 'smart-demo-resizer';
  
  const label = document.createElement('div');
  label.className = 'smart-demo-label';
  label.innerText = 'Drag to test Container Queries (Auto-Scaling)';
  
  smartWrapper.insertBefore(resizer, smartContainer);
  smartWrapper.insertBefore(label, resizer);
  
  resizer.addEventListener('input', (e) => {
    smartContainer.style.width = \`\${e.target.value}px\`;
  });
}`,
  ts: `// Smart Auto-Scaling Logic (TypeScript)
const smartWrapper = document.querySelector<HTMLDivElement>('.smart-wrapper');
const smartContainer = document.querySelector<HTMLDivElement>('.smart-container');

if(smartWrapper && smartContainer) {
  const resizer = document.createElement('input');
  resizer.type = 'range';
  resizer.min = '300';
  resizer.max = '1200';
  resizer.value = '1200';
  resizer.className = 'smart-demo-resizer';
  
  const label = document.createElement('div');
  label.className = 'smart-demo-label';
  label.innerText = 'Drag to test Container Queries (Auto-Scaling)';
  
  smartWrapper.insertBefore(resizer, smartContainer);
  smartWrapper.insertBefore(label, resizer);
  
  resizer.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLInputElement;
    smartContainer.style.width = \`\${target.value}px\`;
  });
}`,
  css: `/* Smart Auto-Scaling Container Styles */
.smart-wrapper {
  width: 100%;
  min-height: 800px;
  background: #050505;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: system-ui, -apple-system, sans-serif;
  color: #fff;
}

/* Demo specific controls */
.smart-demo-label { margin-bottom: 10px; color: #888; font-size: 0.9rem; }
.smart-demo-resizer { width: 100%; max-width: 400px; margin-bottom: 40px; cursor: ew-resize; }

/* The Core Container using Container Queries */
.smart-container {
  width: 100%;
  max-width: 1200px;
  /* Define the container context */
  container-type: inline-size;
  container-name: smart;
  
  background: #111;
  border: 1px solid #222;
  border-radius: 16px;
  overflow: hidden;
  transition: width 0.1s ease; /* Smooth demo resizing */
}

/* Header */
.smart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #222;
}

.smart-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: 1px;
}

.smart-logo svg {
  color: #3b82f6;
}

.smart-controls {
  display: flex;
  gap: 16px;
}

.smart-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 6px;
}

.smart-btn.primary {
  background: #3b82f6;
}

/* Hero Section */
.smart-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 60px 32px;
  align-items: center;
}

.smart-content h1 {
  font-size: clamp(2rem, 5cqi, 4rem); /* Container Query Units (cqi) */
  line-height: 1.1;
  margin: 0 0 20px 0;
  background: linear-gradient(90deg, #fff, #888);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.smart-content p {
  font-size: 1.125rem;
  color: #999;
  line-height: 1.6;
  margin: 0 0 32px 0;
  max-width: 500px;
}

.smart-search {
  display: flex;
  max-width: 450px;
}

.smart-input {
  flex-grow: 1;
  background: #222;
  border: 1px solid #333;
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px 0 0 8px;
  outline: none;
}
.smart-input:focus {
  border-color: #3b82f6;
}

.smart-search-btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 0 24px;
  font-weight: 600;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
}

/* Visual Element */
.smart-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 300px;
}

.smart-globe {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 1px dashed rgba(255,255,255,0.2);
  position: relative;
  animation: rotate 20s linear infinite;
}

@keyframes rotate { 100% { transform: rotate(360deg); } }

.smart-node {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 20px #3b82f6;
}

.n1 { top: 20%; left: 20%; }
.n2 { top: 40%; right: 10%; background: #10b981; box-shadow: 0 0 20px #10b981; }
.n3 { bottom: 20%; left: 40%; background: #8b5cf6; box-shadow: 0 0 20px #8b5cf6; }

.smart-connections {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
}

/* Features Grid */
.smart-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 0 32px 60px;
}

.smart-feature {
  background: rgba(255,255,255,0.03);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
}

.smart-f-icon {
  font-size: 24px;
  margin-bottom: 16px;
}

.smart-feature h3 {
  font-size: 1.1rem;
  margin: 0 0 10px 0;
}

.smart-feature p {
  color: #888;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

/* 
  ===========================================
  MAGIC HAPPENS HERE: CONTAINER QUERIES
  Adapts layout based on container width, NOT viewport width.
  ===========================================
*/

@container smart (max-width: 800px) {
  .smart-hero {
    grid-template-columns: 1fr; /* Stack hero content */
    text-align: center;
    padding: 40px 24px;
  }
  
  .smart-content p {
    margin-left: auto;
    margin-right: auto;
  }
  
  .smart-search {
    margin: 0 auto;
  }
  
  .smart-features {
    grid-template-columns: 1fr; /* Stack features */
    padding: 0 24px 40px;
  }
}

@container smart (max-width: 500px) {
  .smart-header {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .smart-search {
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .smart-input, .smart-search-btn {
    border-radius: 0;
    width: 100%;
  }
  
  .smart-search-btn {
    padding: 16px;
  }
  
  .smart-visual {
    display: none; /* Hide visual on very small containers */
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build an advanced Smart Auto-Scaling Container that intelligently adjusts width, height, spacing, typography, and layout structure using CSS container queries (@container) based on available space.`
};
