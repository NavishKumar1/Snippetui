/**
 * Component: Stepper Timeline Progress
 * Category: tabs-and-navs
 */

export const component = {
  id: 'stepper-timeline-progress',
  name: 'Stepper Timeline Progress',
  category: 'tabs-and-navs',
  tag: 'Creative',
  html: `<div class="stepper-sandbox" id="stepper-timeline-container">
  <div class="stepper-wrapper">
    <!-- Progress Track Background -->
    <div class="stepper-track">
      <div class="stepper-track-fill" id="stepper-progress-line"></div>
    </div>
    
    <!-- Timeline Nodes -->
    <div class="stepper-nodes">
      <button class="step-node active" data-step="1" data-pct="0">
        <div class="node-circle">
          <span class="node-icon">🎨</span>
          <span class="node-check">✓</span>
        </div>
        <div class="node-label">DESIGN</div>
      </button>
      
      <button class="step-node" data-step="2" data-pct="33">
        <div class="node-circle">
          <span class="node-icon">💻</span>
          <span class="node-check">✓</span>
        </div>
        <div class="node-label">BUILD</div>
      </button>
      
      <button class="step-node" data-step="3" data-pct="66">
        <div class="node-circle">
          <span class="node-icon">🛡️</span>
          <span class="node-check">✓</span>
        </div>
        <div class="node-label">AUDIT</div>
      </button>
      
      <button class="step-node" data-step="4" data-pct="100">
        <div class="node-circle">
          <span class="node-icon">🚀</span>
          <span class="node-check">✓</span>
        </div>
        <div class="node-label">DEPLOY</div>
      </button>
    </div>
  </div>
</div>`,
  js: `// Stepper Timeline Progress interactive flow logic
const container = document.getElementById('stepper-timeline-container');
if (container) {
  const nodes = container.querySelectorAll('.step-node');
  const progressLine = container.querySelector('#stepper-progress-line');

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const activeStep = parseInt(node.getAttribute('data-step'));
      const pct = node.getAttribute('data-pct');

      // Update progress line length
      progressLine.style.width = \`\${pct}%\`;

      // Update active/completed states
      nodes.forEach(n => {
        const stepNum = parseInt(n.getAttribute('data-step'));
        n.classList.remove('active', 'completed');
        
        if (stepNum === activeStep) {
          n.classList.add('active');
        } else if (stepNum < activeStep) {
          n.classList.add('completed');
        }
      });
    });
  });
}
`,
  ts: `// TypeScript implementation
const container = document.getElementById('stepper-timeline-container') as HTMLDivElement | null;
if (container) {
  const nodes = container.querySelectorAll('.step-node');
  const progressLine = container.querySelector('#stepper-progress-line') as HTMLDivElement;

  nodes.forEach(node => {
    const nodeEl = node as HTMLButtonElement;

    nodeEl.addEventListener('click', () => {
      const activeStep = parseInt(nodeEl.getAttribute('data-step') || '1');
      const pct = nodeEl.getAttribute('data-pct') || '0';

      if (progressLine) progressLine.style.width = \`\${pct}%\`;

      nodes.forEach(n => {
        const nEl = n as HTMLElement;
        const stepNum = parseInt(nEl.getAttribute('data-step') || '1');
        nEl.classList.remove('active', 'completed');
        
        if (stepNum === activeStep) {
          nEl.classList.add('active');
        } else if (stepNum < activeStep) {
          nEl.classList.add('completed');
        }
      });
    });
  });
}`,
  css: `/* Stepper Timeline Progress styles */
.stepper-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #050b0f 0%, #010406 100%);
  border: 1px solid rgba(0, 242, 254, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.stepper-wrapper {
  position: relative;
  width: 340px;
  display: flex;
  align-items: center;
}

.stepper-track {
  position: absolute;
  left: 20px;
  right: 20px;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  z-index: 1;
}

.stepper-track-fill {
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, #00f2fe 0%, #4facfe 100%);
  box-shadow: 0 0 8px #00f2fe;
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.19, 1, 0.22, 1);
}

.stepper-nodes {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 2;
}

.step-node {
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0;
  width: 50px;
}

.node-circle {
  position: relative;
  width: 36px;
  height: 36px;
  background: #0b141a;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.node-check {
  position: absolute;
  font-size: 11px;
  font-weight: 900;
  color: #0b141a;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.node-label {
  font-family: 'Outfit', sans-serif;
  font-size: 8.5px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

/* Hover node */
.step-node:hover .node-circle {
  border-color: rgba(0, 242, 254, 0.5);
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
}

/* Active node state */
.step-node.active .node-circle {
  background: #00f2fe;
  border-color: #ffffff;
  box-shadow: 0 0 15px rgba(0, 242, 254, 0.6);
  transform: scale(1.15);
}

.step-node.active .node-icon {
  filter: brightness(0) saturate(100%) invert(0%); /* Make emoji dark/stark or just standard */
}

.step-node.active .node-label {
  color: #00f2fe;
}

/* Completed node state */
.step-node.completed .node-circle {
  background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
  border-color: #00f2fe;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.3);
}

.step-node.completed .node-icon {
  opacity: 0;
  transform: scale(0);
}

.step-node.completed .node-check {
  opacity: 1;
  transform: scale(1);
}

.step-node.completed .node-label {
  color: rgba(255, 255, 255, 0.7);
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#050b0f] to-[#010406] border border-cyan-500/15 rounded-3xl flex items-center justify-center overflow-hidden" id="stepper-timeline-container">
  <div class="relative w-[340px] flex items-center">
    
    <!-- Progress Track Background -->
    <div class="absolute left-5 right-5 h-[3px] bg-white/5 rounded">
      <div class="w-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_#00f2fe] rounded transition-all duration-500 ease-out progress-line-bar" id="stepper-progress-line"></div>
    </div>
    
    <!-- Timeline Nodes -->
    <div class="relative w-full flex justify-between z-10">
      
      <button class="bg-transparent border-none cursor-pointer flex flex-col items-center gap-2.5 p-0 w-[50px] step-node active" data-step="1" data-pct="0">
        <div class="relative w-9 h-9 bg-[#0b141a] border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(0,242,254,0.2)] rounded-full flex items-center justify-center transition-all duration-300 [&.active]:bg-cyan-400 [&.active]:border-white [&.active]:shadow-[0_0_15px_rgba(0,242,254,0.6)] [&.active]:scale-110 active-circle">
          <span class="text-[13px] node-icon">🎨</span>
          <span class="absolute text-[11px] font-black text-[#0b141a] opacity-0 scale-0 transition-all duration-300">✓</span>
        </div>
        <div class="font-sans text-[8.5px] font-black text-white/30 tracking-wide transition-colors duration-300 [&.active]:text-cyan-400 active-label">DESIGN</div>
      </button>
      
      <button class="bg-transparent border-none cursor-pointer flex flex-col items-center gap-2.5 p-0 w-[50px] step-node" data-step="2" data-pct="33">
        <div class="relative w-9 h-9 bg-[#0b141a] border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(0,242,254,0.2)] rounded-full flex items-center justify-center transition-all duration-300">
          <span class="text-[13px] node-icon">💻</span>
          <span class="absolute text-[11px] font-black text-[#0b141a] opacity-0 scale-0 transition-all duration-300">✓</span>
        </div>
        <div class="font-sans text-[8.5px] font-black text-white/30 tracking-wide transition-colors duration-300">BUILD</div>
      </button>
      
      <button class="bg-transparent border-none cursor-pointer flex flex-col items-center gap-2.5 p-0 w-[50px] step-node" data-step="3" data-pct="66">
        <div class="relative w-9 h-9 bg-[#0b141a] border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(0,242,254,0.2)] rounded-full flex items-center justify-center transition-all duration-300">
          <span class="text-[13px] node-icon">🛡️</span>
          <span class="absolute text-[11px] font-black text-[#0b141a] opacity-0 scale-0 transition-all duration-300">✓</span>
        </div>
        <div class="font-sans text-[8.5px] font-black text-white/30 tracking-wide transition-colors duration-300">AUDIT</div>
      </button>
      
      <button class="bg-transparent border-none cursor-pointer flex flex-col items-center gap-2.5 p-0 w-[50px] step-node" data-step="4" data-pct="100">
        <div class="relative w-9 h-9 bg-[#0b141a] border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(0,242,254,0.2)] rounded-full flex items-center justify-center transition-all duration-300">
          <span class="text-[13px] node-icon">🚀</span>
          <span class="absolute text-[11px] font-black text-[#0b141a] opacity-0 scale-0 transition-all duration-300">✓</span>
        </div>
        <div class="font-sans text-[8.5px] font-black text-white/30 tracking-wide transition-colors duration-300">DEPLOY</div>
      </button>
      
    </div>
  </div>
</div>`,
  prompt: 'Design a highly creative horizontal stepper pipeline interactive progress timeline menu navigator component.'
};
export const componentHtml = component.html;
export const componentTailwind = component.tailwind;
export const componentCss = component.css;
export const componentJs = component.js;
