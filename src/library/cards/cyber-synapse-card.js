/**
 * Component: Cyber Synapse Neural Card
 * Category: cards
 */

export const component = {
  id: 'cyber-synapse-card',
  name: 'Cyber Synapse Card',
  category: 'cards',
  tag: 'Stunning',
  html: `<div class="cyber-synapse-card">
  <div class="synapse-network">
    <div class="synapse-node node-1" style="top: 25%; left: 30%;"></div>
    <div class="synapse-node node-2" style="top: 45%; left: 75%;"></div>
    <div class="synapse-node node-3" style="top: 70%; left: 40%;"></div>
    <div class="synapse-node node-4" style="top: 20%; left: 80%;"></div>
    
    <!-- SVG Pathway vectors connecting nodes -->
    <svg class="synapse-paths-svg">
      <line class="path-line line-1" x1="30%" y1="25%" x2="75%" y2="45%"></line>
      <line class="path-line line-2" x1="75%" y1="45%" x2="40%" y2="70%"></line>
      <line class="path-line line-3" x1="30%" y1="25%" x2="40%" y2="70%"></line>
      <line class="path-line line-4" x1="75%" y1="45%" x2="80%" y2="20%"></line>
    </svg>
  </div>
  <div class="synapse-card-interior">
    <span class="synapse-status-pill">NEURAL NET ACTIVE</span>
    <h3 class="synapse-title">Synaptic Core</h3>
    <p class="synapse-desc">Mapping high-dimensional vector signals across autonomous deep reinforcement clusters.</p>
  </div>
</div>`,
  js: `// Interactive electrical synapses zip nodes on mouse hover
const synapseCard = document.querySelector('.cyber-synapse-card');
if (synapseCard) {
  const nodes = synapseCard.querySelectorAll('.synapse-node');
  const lines = synapseCard.querySelectorAll('.path-line');
  
  synapseCard.addEventListener('mouseenter', () => {
    // Light up nodes and trigger speed pulse animations
    nodes.forEach(node => {
      node.style.boxShadow = '0 0 20px #00f2fe, 0 0 35px #8a2be2';
      node.style.background = '#00f2fe';
    });

    lines.forEach(line => {
      line.style.strokeDashoffset = '0';
    });
  });

  synapseCard.addEventListener('mouseleave', () => {
    nodes.forEach(node => {
      node.style.boxShadow = 'none';
      node.style.background = 'rgba(255, 255, 255, 0.15)';
    });

    lines.forEach(line => {
      line.style.strokeDashoffset = '100';
    });
  });
}`,
  ts: `// TypeScript Implementation
const synapseCard = document.querySelector<HTMLDivElement>('.cyber-synapse-card');
if (synapseCard) {
  const nodes = synapseCard.querySelectorAll<HTMLDivElement>('.synapse-node');
  const lines = synapseCard.querySelectorAll<SVGLineElement>('.path-line');
  
  synapseCard.addEventListener('mouseenter', () => {
    nodes.forEach(node => {
      node.style.boxShadow = '0 0 20px #00f2fe, 0 0 35px #8a2be2';
      node.style.background = '#00f2fe';
    });

    lines.forEach(line => {
      line.style.strokeDashoffset = '0';
    });
  });

  synapseCard.addEventListener('mouseleave', () => {
    nodes.forEach(node => {
      node.style.boxShadow = 'none';
      node.style.background = 'rgba(255, 255, 255, 0.15)';
    });

    lines.forEach(line => {
      line.style.strokeDashoffset = '100';
    });
  });
}`,
  css: `/* Cyber Synapse Neural Card Styles */
.cyber-synapse-card {
  position: relative;
  width: 320px;
  height: 220px;
  background: #06050b;
  border: 1px solid rgba(138, 43, 226, 0.15);
  border-radius: 16px;
  overflow: hidden;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.8);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}

.cyber-synapse-card:hover {
  border-color: rgba(138, 43, 226, 0.45);
  box-shadow: 
    0 20px 45px -10px rgba(0, 0, 0, 0.9),
    0 0 25px rgba(138, 43, 226, 0.1);
}

/* Neural Network Background Layers */
.synapse-network {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.synapse-node {
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.synapse-paths-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.path-line {
  stroke: rgba(138, 43, 226, 0.12);
  stroke-width: 1.5px;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  transition: stroke-dashoffset 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), stroke 0.3s;
}

.cyber-synapse-card:hover .path-line {
  stroke: url(#cyan-purple-grad);
  stroke-width: 2px;
}

/* Internal contents */
.synapse-card-interior {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.synapse-status-pill {
  font-size: 9px;
  font-weight: 800;
  color: var(--accent-cyan);
  border: 1px solid rgba(0, 242, 254, 0.2);
  background: rgba(0, 242, 254, 0.05);
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.05em;
}

.synapse-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.synapse-desc {
  font-size: 12px;
  color: #a78bfa;
  line-height: 1.5;
  margin: 0;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] h-[220px] bg-[#06050b] rounded-2xl border border-violet-500/10 overflow-hidden flex flex-col justify-end p-6 shadow-2xl">
  <div class="relative z-10 flex flex-col items-start gap-2">
    <span class="text-[9px] font-bold text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded">NEURAL NET ACTIVE</span>
    <h3 class="text-lg font-bold text-white">Synaptic Core</h3>
    <p class="text-xs text-gray-300">Mapping high-dimensional vector signals across autonomous deep reinforcement clusters.</p>
  </div>
</div>`,
  prompt: `Design a premium "Cyber Synapse Neural Card" component. Features glowing vector nodes and connections. On hover, the neural pathways trace bright electric pulses and nodes glow intensely in violet/cyan gradients.`
};
