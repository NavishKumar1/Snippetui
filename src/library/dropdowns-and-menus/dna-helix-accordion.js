/**
 * Component: DNA Helix Accordion
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'dna-helix-accordion',
  name: 'DNA Helix Accordion',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="dna-accordion-wrapper">
  <div class="dna-container">
    <div class="dna-item">
      <!-- Interactive Trigger -->
      <button class="dna-trigger">
        <span>GENOME TELEMETRY</span>
        <span class="dna-indicator">[ ⎈ ]</span>
      </button>
      
      <!-- Foldable content box with DNA background canvas -->
      <div class="dna-accordion-content">
        <div class="dna-canvas-container">
          <canvas class="dna-helix-canvas"></canvas>
        </div>
        <div class="dna-inner-text">
          <p class="dna-blue-text">> SEQUENCING DATA STACK ACTIVE</p>
          <p class="dna-blue-text">> MUTATION INDEX: 0.04%</p>
          <p class="dna-blue-text">> COILING AMPLITUDE: OPTIMAL</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Twin-helix 3D rotating simulation on HTML5 Canvas inside the accordion content
const dWrapper = document.querySelector('.dna-accordion-wrapper');
if (dWrapper) {
  const trigger = dWrapper.querySelector('.dna-trigger');
  const container = dWrapper.querySelector('.dna-container');
  const canvas = dWrapper.querySelector('.dna-helix-canvas');
  const ctx = canvas.getContext('2d');
  
  let isOpen = false;
  
  const resizeCanvas = () => {
    canvas.width = dWrapper.clientWidth || 290;
    canvas.height = 100;
  };
  resizeCanvas();
  
  trigger.addEventListener('click', () => {
    container.classList.toggle('unfolded');
    isOpen = container.classList.contains('unfolded');
    if (isOpen) {
      resizeCanvas();
    }
  });

  // 3D DNA Helix Math Model
  let angle = 0;
  const nodes = 15;
  const radius = 24;
  
  let animId;
  const draw = () => {
    if (!dWrapper.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      const w = canvas.width;
      const h = canvas.height;
      
      angle += 0.035;
      
      for (let i = 0; i < nodes; i++) {
        // Spatial progression along horizontal axis
        const x = (i / (nodes - 1)) * (w - 40) + 20;
        
        // Phase offsets for both strands
        const strand1Angle = angle + (i * 0.4);
        const strand2Angle = strand1Angle + Math.PI; // 180 degrees shift
        
        // 3D projections
        const y1 = h / 2 + Math.sin(strand1Angle) * radius;
        const y2 = h / 2 + Math.sin(strand2Angle) * radius;
        
        // Depth scale simulating z-axis
        const z1 = Math.cos(strand1Angle);
        const z2 = Math.cos(strand2Angle);
        
        const size1 = 2.5 + (z1 + 1) * 1.5;
        const size2 = 2.5 + (z2 + 1) * 1.5;
        
        // Draw connection rungs (hydrogen bonds) between matching base pairs
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Color channel split based on depth
        // Strand 1 (Teal)
        ctx.beginPath();
        ctx.arc(x, y1, size1, 0, Math.PI * 2);
        ctx.fillStyle = z1 > 0 ? '#00f2fe' : 'rgba(0, 242, 254, 0.4)';
        ctx.fill();
        
        // Strand 2 (Magenta)
        ctx.beginPath();
        ctx.arc(x, y2, size2, 0, Math.PI * 2);
        ctx.fillStyle = z2 > 0 ? '#ff0055' : 'rgba(255, 0, 85, 0.4)';
        ctx.fill();
      }
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  ts: `// TypeScript Implementation
const dWrapper = document.querySelector<HTMLDivElement>('.dna-accordion-wrapper');
if (dWrapper) {
  const trigger = dWrapper.querySelector<HTMLButtonElement>('.dna-trigger');
  const container = dWrapper.querySelector<HTMLDivElement>('.dna-container');
  const canvas = dWrapper.querySelector<HTMLCanvasElement>('.dna-helix-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  
  let isOpen = false;
  
  const resizeCanvas = () => {
    if (canvas && dWrapper) {
      canvas.width = dWrapper.clientWidth || 290;
      canvas.height = 100;
    }
  };
  resizeCanvas();
  
  if (trigger && container) {
    trigger.addEventListener('click', () => {
      container.classList.toggle('unfolded');
      isOpen = container.classList.contains('unfolded');
      if (isOpen) {
        resizeCanvas();
      }
    });
  }

  let angle = 0;
  const nodes = 15;
  const radius = 24;
  
  let animId: number;
  const draw = () => {
    if (!dWrapper.isConnected || !ctx || !canvas) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (isOpen) {
      const w = canvas.width;
      const h = canvas.height;
      angle += 0.035;
      
      for (let i = 0; i < nodes; i++) {
        const x = (i / (nodes - 1)) * (w - 40) + 20;
        const strand1Angle = angle + (i * 0.4);
        const strand2Angle = strand1Angle + Math.PI;
        
        const y1 = h / 2 + Math.sin(strand1Angle) * radius;
        const y2 = h / 2 + Math.sin(strand2Angle) * radius;
        
        const z1 = Math.cos(strand1Angle);
        const z2 = Math.cos(strand2Angle);
        
        const size1 = 2.5 + (z1 + 1) * 1.5;
        const size2 = 2.5 + (z2 + 1) * 1.5;
        
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(x, y1, size1, 0, Math.PI * 2);
        ctx.fillStyle = z1 > 0 ? '#00f2fe' : 'rgba(0, 242, 254, 0.4)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x, y2, size2, 0, Math.PI * 2);
        ctx.fillStyle = z2 > 0 ? '#ff0055' : 'rgba(255, 0, 85, 0.4)';
        ctx.fill();
      }
    }
    
    animId = requestAnimationFrame(draw);
  };
  
  draw();
}`,
  css: `/* DNA Helix Accordion Styles */
.dna-accordion-wrapper {
  position: relative;
  width: 290px;
  font-family: 'Outfit', sans-serif;
  box-sizing: border-box;
  padding: 10px;
}

.dna-container {
  width: 100%;
}

.dna-item {
  border: 1.5px solid rgba(0, 242, 254, 0.25);
  border-radius: 8px;
  background: #020408;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(0, 242, 254, 0.05);
  transition: border-color 0.4s, box-shadow 0.4s;
}

.dna-trigger {
  width: 100%;
  padding: 16px 20px;
  background: transparent;
  border: none;
  color: #00f2fe;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
  text-shadow: 0 0 4px rgba(0, 242, 254, 0.4);
}

.dna-indicator {
  font-size: 11px;
  color: #ff0055;
  text-shadow: 0 0 4px rgba(255, 0, 85, 0.5);
  font-weight: bold;
}

/* Foldable content panel with DNA backdrop */
.dna-accordion-content {
  max-height: 0px;
  opacity: 0;
  position: relative;
  overflow: hidden;
  background: #03060c;
  border-top: 1px solid rgba(0, 242, 254, 0.1);
  transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
}

.dna-canvas-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.dna-helix-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.dna-inner-text {
  position: relative;
  z-index: 2;
  padding: 16px 20px;
}

.dna-blue-text {
  font-size: 11.5px;
  color: rgba(0, 242, 254, 0.8);
  text-shadow: 0 0 2px rgba(0, 242, 254, 0.2);
  margin: 6px 0;
  line-height: 1.5;
  font-family: 'Courier New', Courier, monospace;
}

/* Expanded active state transitions */
.dna-container.unfolded .dna-item {
  border-color: #ff0055;
  box-shadow: 0 0 15px rgba(255, 0, 85, 0.25);
}

.dna-container.unfolded .dna-trigger {
  color: #ff0055;
  text-shadow: 0 0 4px rgba(255, 0, 85, 0.4);
}

.dna-container.unfolded .dna-accordion-content {
  max-height: 100px;
  opacity: 1;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[290px] font-sans p-2 select-none">
  <div class="bg-[#020408] border border-cyan-400/30 rounded-lg overflow-hidden shadow-lg">
    <button class="w-full px-5 py-4 text-left text-cyan-400 font-bold text-xs tracking-wider flex justify-between items-center shadow-[inset_0_0_10px_rgba(0,242,254,0.05)]">
      <span>GENOME TELEMETRY</span>
      <span class="text-rose-500">[ ⎈ ]</span>
    </button>
  </div>
</div>`,
  prompt: `Design a premium "DNA Helix Accordion" component. Toggling the science telemetry accordion unfolds segments where a central twin-helix DNA strand rotates in 3D perspective inside a background Canvas.`
};
