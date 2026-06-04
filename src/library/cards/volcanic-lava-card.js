/**
 * Component: Volcanic Lava Magma Card
 * Category: cards
 */

export const component = {
  id: 'volcanic-lava-card',
  name: 'Volcanic Lava Card',
  category: 'cards',
  tag: 'Mesmerizing',
  html: `<div class="volcanic-lava-card">
  <div class="lava-underlay">
    <span class="lava-flow flow-1"></span>
    <span class="lava-flow flow-2"></span>
    <span class="lava-flow flow-3"></span>
  </div>
  <div class="lava-cracks-overlay"></div>
  <div class="card-interior-content">
    <span class="lava-badge">MAGMA RESISTANT</span>
    <h3 class="lava-card-title">Geothermal System</h3>
    <p class="lava-card-desc">Harnessing high-pressure subterranean fluid streams to power grid expansion zones.</p>
  </div>
</div>`,
  js: `// Interactive mouse center gravity attracting magma flows on hover
const lavaCard = document.querySelector('.volcanic-lava-card');
if (lavaCard) {
  const flows = lavaCard.querySelectorAll('.lava-flow');
  
  lavaCard.addEventListener('mousemove', (e) => {
    const rect = lavaCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Attract the flow particles towards cursor offset
    flows.forEach((flow, idx) => {
      const delay = (idx + 1) * 6;
      const tx = (x - rect.width / 2) / delay;
      const ty = (y - rect.height / 2) / delay;
      flow.style.transform = \`translate(\${tx}px, \${ty}px) scale(\${1.1 + idx * 0.05})\`;
    });
  });

  lavaCard.addEventListener('mouseleave', () => {
    flows.forEach((flow) => {
      flow.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
}`,
  ts: `// TypeScript Implementation
const lavaCard = document.querySelector<HTMLDivElement>('.volcanic-lava-card');
if (lavaCard) {
  const flows = lavaCard.querySelectorAll<HTMLSpanElement>('.lava-flow');
  
  lavaCard.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = lavaCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    flows.forEach((flow, idx) => {
      const delay = (idx + 1) * 6;
      const tx = (x - rect.width / 2) / delay;
      const ty = (y - rect.height / 2) / delay;
      flow.style.transform = \`translate(\${tx}px, \${ty}px) scale(\${1.1 + idx * 0.05})\`;
    });
  });

  lavaCard.addEventListener('mouseleave', () => {
    flows.forEach((flow) => {
      flow.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
}`,
  css: `/* Volcanic Lava Card Styles */
.volcanic-lava-card {
  position: relative;
  width: 320px;
  height: 220px;
  background: #090301;
  border: 1px solid rgba(255, 69, 0, 0.15);
  border-radius: 16px;
  overflow: hidden;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.8);
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
  cursor: pointer;
}

.volcanic-lava-card:hover {
  border-color: rgba(255, 110, 0, 0.5);
  box-shadow: 
    0 20px 45px -10px rgba(0, 0, 0, 0.9),
    0 0 25px rgba(255, 69, 0, 0.15);
}

/* Background Lava Stream Flows */
.lava-underlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  opacity: 0.35;
  transition: opacity 0.4s ease;
}

.volcanic-lava-card:hover .lava-underlay {
  opacity: 0.65;
}

.lava-flow {
  position: absolute;
  border-radius: 50%;
  filter: blur(35px);
  pointer-events: none;
  transition: transform 0.2s cubic-bezier(0.1, 0.8, 0.25, 1);
}

.flow-1 {
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, #ff3700 0%, #ff8c00 70%, transparent 100%);
  top: 10%;
  left: 10%;
  animation: lava-drift-1 12s infinite alternate ease-in-out;
}

.flow-2 {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #ff0055 0%, #ff5500 80%, transparent 100%);
  bottom: 10%;
  right: 15%;
  animation: lava-drift-2 15s infinite alternate ease-in-out;
}

.flow-3 {
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #ffd700 0%, #ffaa00 70%, transparent 100%);
  top: 40%;
  right: 40%;
}

@keyframes lava-drift-1 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 30px); }
}

@keyframes lava-drift-2 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-40px, -45px); }
}

/* Lava Crack Vector Texture Overlay */
.lava-cracks-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-image: 
    linear-gradient(rgba(255, 69, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 69, 0, 0.05) 1px, transparent 1px);
  background-size: 15px 15px;
  pointer-events: none;
  opacity: 0.2;
}

.volcanic-lava-card:hover .lava-cracks-overlay {
  opacity: 0.45;
  background-image: 
    linear-gradient(rgba(255, 110, 0, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 110, 0, 0.12) 1px, transparent 1px);
}

/* Card Interior Content */
.card-interior-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.lava-badge {
  font-size: 9px;
  font-weight: 800;
  color: #ffd700;
  border: 1px solid rgba(255, 215, 0, 0.25);
  background: rgba(255, 110, 0, 0.05);
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.05em;
}

.lava-card-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.lava-card-desc {
  font-size: 12px;
  color: #d1d5db;
  line-height: 1.5;
  margin: 0;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[320px] h-[220px] bg-[#090301] rounded-2xl border border-red-500/10 overflow-hidden flex flex-col justify-end p-6 shadow-2xl">
  <div class="relative z-10 flex flex-col items-start gap-2">
    <span class="text-[9px] font-bold text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded">MAGMA RESISTANT</span>
    <h3 class="text-lg font-bold text-white">Geothermal System</h3>
    <p class="text-xs text-gray-300">Harnessing high-pressure subterranean fluid streams to power grid expansion zones.</p>
  </div>
</div>`,
  prompt: `Design a premium "Volcanic Lava Magma Card" component. An obsidian plate displaying moving glowing orange and gold heat cracks. On cursor hover, the inner lava flows expand dynamically and attract toward the exact cursor coordinate center, heating up card borders.`
};
