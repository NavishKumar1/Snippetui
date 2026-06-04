/**
 * Component: Neural Synapse Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'neural-synapse-slider',
  name: 'Neural Synapse Slider',
  category: 'sliders-and-ranges',
  tag: 'Premium',
  html: `<div class="synapse-slider-wrapper">
  <div class="synapse-canvas-container">
    <canvas class="synapse-canvas"></canvas>
  </div>
  <div class="synapse-track">
    <div class="synapse-fill" style="width: 50%;"></div>
  </div>
  <div class="synapse-thumb" style="left: 50%;"></div>
</div>`,
  js: `// Interactive neural network impulse spark animations on drag
const sWrapper = document.querySelector('.synapse-slider-wrapper');
if (sWrapper) {
  const thumb = sWrapper.querySelector('.synapse-thumb');
  const fill = sWrapper.querySelector('.synapse-fill');
  const canvas = sWrapper.querySelector('.synapse-canvas');
  const ctx = canvas.getContext('2d');
  
  let isDragging = false;
  let percentage = 50;
  
  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = sWrapper.clientWidth || 300;
    canvas.height = 48;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const updateSlider = (clientX) => {
    const rect = sWrapper.getBoundingClientRect();
    percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    // Spawn electrical pulse on active drag coords
    if (isDragging && Math.random() < 0.3) {
      spawnPulse();
    }
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('active');
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('active');
    }
  });
  
  sWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
  
  // Neural Net Structure
  const nodes = [];
  const connections = [];
  const pulses = [];
  
  const numNodes = 12;
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: (i / (numNodes - 1)) * 100, // percentage x
      y: 20 + Math.random() * 8, // pixels y
      baseY: 24,
      pulseFactor: Math.random() * 10
    });
  }
  
  // Connect adjacent nodes
  for (let i = 0; i < numNodes - 1; i++) {
    connections.push({ from: i, to: i + 1 });
    if (i < numNodes - 2 && Math.random() < 0.4) {
      connections.push({ from: i, to: i + 2 });
    }
  }
  
  const spawnPulse = () => {
    // Spawn starting from nearest node to thumb or index 0
    const targetIdx = Math.floor((percentage / 100) * (numNodes - 1));
    pulses.push({
      currentSegment: Math.max(0, targetIdx - 1),
      progress: 0,
      speed: 0.05 + Math.random() * 0.05,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  };
  
  let animId;
  const draw = () => {
    if (!sWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    
    // Draw static connection tracks
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
    ctx.lineWidth = 1.5;
    connections.forEach(conn => {
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      ctx.beginPath();
      ctx.moveTo((fromNode.x / 100) * w, fromNode.y);
      ctx.lineTo((toNode.x / 100) * w, toNode.y);
      ctx.stroke();
    });
    
    // Draw active filled fill lines matching percentage
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
    ctx.lineWidth = 2;
    connections.forEach(conn => {
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      if (fromNode.x <= percentage && toNode.x <= percentage) {
        ctx.beginPath();
        ctx.moveTo((fromNode.x / 100) * w, fromNode.y);
        ctx.lineTo((toNode.x / 100) * w, toNode.y);
        ctx.stroke();
      }
    });
    
    // Animate & Draw electric action potential pulses
    pulses.forEach((pulse, idx) => {
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        // Move to next segment or remove
        pulse.currentSegment += pulse.direction;
        pulse.progress = 0;
        if (pulse.currentSegment < 0 || pulse.currentSegment >= connections.length) {
          pulses.splice(idx, 1);
          return;
        }
      }
      
      const conn = connections[pulse.currentSegment];
      if (!conn) return;
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      
      const px = fromNode.x + (toNode.x - fromNode.x) * pulse.progress;
      const py = fromNode.y + (toNode.y - fromNode.y) * pulse.progress;
      
      ctx.beginPath();
      ctx.arc((px / 100) * w, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    });
    
    // Draw synapses nodes
    nodes.forEach(node => {
      const isActive = node.x <= percentage;
      ctx.beginPath();
      ctx.arc((node.x / 100) * w, node.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? '#00f2fe' : 'rgba(255,255,255,0.1)';
      ctx.fill();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
  
  // Cleanup listener
  sWrapper._cleanupResize = () => {
    window.removeEventListener('resize', resizeCanvas);
  };
}`,
  ts: `// TypeScript Implementation
const sWrapper = document.querySelector<HTMLDivElement>('.synapse-slider-wrapper');
if (sWrapper) {
  const thumb = sWrapper.querySelector<HTMLDivElement>('.synapse-thumb');
  const fill = sWrapper.querySelector<HTMLDivElement>('.synapse-fill');
  const canvas = sWrapper.querySelector<HTMLCanvasElement>('.synapse-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  
  let isDragging = false;
  let percentage = 50;
  
  const resizeCanvas = () => {
    if (canvas && sWrapper) {
      canvas.width = sWrapper.clientWidth || 300;
      canvas.height = 48;
    }
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const updateSlider = (clientX: number) => {
    if (!sWrapper || !thumb || !fill) return;
    const rect = sWrapper.getBoundingClientRect();
    percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    if (isDragging && Math.random() < 0.3) {
      spawnPulse();
    }
  };
  
  if (thumb) {
    thumb.addEventListener('mousedown', () => {
      isDragging = true;
      thumb.classList.add('active');
    });
  }
  
  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      if (thumb) thumb.classList.remove('active');
    }
  });
  
  sWrapper.addEventListener('click', (e: MouseEvent) => {
    if (thumb && e.target !== thumb) {
      updateSlider(e.clientX);
    }
  });
  
  interface SynapseNode {
    x: number;
    y: number;
    baseY: number;
    pulseFactor: number;
  }
  
  interface SynapseConnection {
    from: number;
    to: number;
  }
  
  interface ElectricPulse {
    currentSegment: number;
    progress: number;
    speed: number;
    direction: number;
  }
  
  const nodes: SynapseNode[] = [];
  const connections: SynapseConnection[] = [];
  const pulses: ElectricPulse[] = [];
  
  const numNodes = 12;
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      x: (i / (numNodes - 1)) * 100,
      y: 20 + Math.random() * 8,
      baseY: 24,
      pulseFactor: Math.random() * 10
    });
  }
  
  for (let i = 0; i < numNodes - 1; i++) {
    connections.push({ from: i, to: i + 1 });
    if (i < numNodes - 2 && Math.random() < 0.4) {
      connections.push({ from: i, to: i + 2 });
    }
  }
  
  const spawnPulse = () => {
    const targetIdx = Math.floor((percentage / 100) * (numNodes - 1));
    pulses.push({
      currentSegment: Math.max(0, targetIdx - 1),
      progress: 0,
      speed: 0.05 + Math.random() * 0.05,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  };
  
  let animId: number;
  const draw = () => {
    if (!sWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
    ctx.lineWidth = 1.5;
    connections.forEach(conn => {
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      ctx.beginPath();
      ctx.moveTo((fromNode.x / 100) * w, fromNode.y);
      ctx.lineTo((toNode.x / 100) * w, toNode.y);
      ctx.stroke();
    });
    
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
    ctx.lineWidth = 2;
    connections.forEach(conn => {
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      if (fromNode.x <= percentage && toNode.x <= percentage) {
        ctx.beginPath();
        ctx.moveTo((fromNode.x / 100) * w, fromNode.y);
        ctx.lineTo((toNode.x / 100) * w, toNode.y);
        ctx.stroke();
      }
    });
    
    pulses.forEach((pulse, idx) => {
      pulse.progress += pulse.speed;
      if (pulse.progress >= 1) {
        pulse.currentSegment += pulse.direction;
        pulse.progress = 0;
        if (pulse.currentSegment < 0 || pulse.currentSegment >= connections.length) {
          pulses.splice(idx, 1);
          return;
        }
      }
      
      const conn = connections[pulse.currentSegment];
      if (!conn) return;
      const fromNode = nodes[conn.from];
      const toNode = nodes[conn.to];
      
      const px = fromNode.x + (toNode.x - fromNode.x) * pulse.progress;
      const py = fromNode.y + (toNode.y - fromNode.y) * pulse.progress;
      
      ctx.beginPath();
      ctx.arc((px / 100) * w, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    
    nodes.forEach(node => {
      const isActive = node.x <= percentage;
      ctx.beginPath();
      ctx.arc((node.x / 100) * w, node.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? '#00f2fe' : 'rgba(255,255,255,0.1)';
      ctx.fill();
    });
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* Neural Synapse Slider Styles */
.synapse-slider-wrapper {
  position: relative;
  width: 300px;
  height: 48px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  overflow: visible;
}

.synapse-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.synapse-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.synapse-track {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 2px;
  position: relative;
  z-index: 2;
}

.synapse-fill {
  position: absolute;
  height: 100%;
  background: #00f2fe;
  border-radius: 2px;
  width: 50%;
  box-shadow: 0 0 10px rgba(0, 242, 254, 0.4);
}

.synapse-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: #ffffff;
  border: 2px solid #00f2fe;
  border-radius: 50%;
  z-index: 10;
  cursor: grab;
  box-shadow: 0 0 12px #00f2fe;
  transition: transform 0.15s ease, border-color 0.3s;
}

.synapse-thumb.active {
  cursor: grabbing;
  transform: translate(-50%, -50%) scale(1.25);
  border-color: #8a2be2;
  box-shadow: 0 0 15px #8a2be2, 0 0 25px #00f2fe;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[300px] h-12 flex items-center select-none cursor-pointer">
  <div class="absolute inset-0 opacity-40 pointer-events-none">
    <!-- Neural Net placeholder markup -->
    <div class="absolute w-full h-0.5 bg-cyan-400/10 top-1/2 -translate-y-1/2"></div>
  </div>
  <div class="w-full h-1 bg-white/5 rounded relative">
    <div class="absolute h-full bg-cyan-400 rounded w-1/2 shadow-[0_0_10px_rgba(0,242,254,0.4)]"></div>
  </div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-cyan-400 rounded-full cursor-grab shadow-[0_0_12px_#00f2fe]"></div>
</div>`,
  prompt: `Design a premium "Neural Synapse Slider" range selector. Track embedded with a gorgeous glowing neural connection diagram. Dragging the thumb triggers rapid action potential electric current pulses to spark along the paths.`
};
