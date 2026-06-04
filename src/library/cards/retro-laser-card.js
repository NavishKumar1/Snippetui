/**
 * Component: Retro Laser Scanner Card
 * Category: cards
 */

export const component = {
  id: 'retro-laser-card',
  name: 'Retro Laser Scanner Card',
  category: 'cards',
  tag: 'Aesthetic',
  html: `<div class="retro-laser-card">
  <div class="retro-laser-scanner-grid"></div>
  <div class="retro-laser-beam"></div>
  <div class="retro-laser-content">
    <span class="retro-laser-tag">GRID SCANNER</span>
    <h3 class="retro-laser-title">System Scanner</h3>
    <p class="retro-laser-desc">Monitoring automated memory registry buffers, active file logs, and network packets for anomalous signatures.</p>
    <div class="retro-laser-footer">
      <span class="retro-laser-status">SYS LEVEL: SECURE</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Laser scan sweep speedup on Hover
const retroLaserCard = document.querySelector('.retro-laser-card');
if (retroLaserCard) {
  const beam = retroLaserCard.querySelector('.retro-laser-beam');
  
  retroLaserCard.addEventListener('mouseenter', () => {
    if (beam) {
      beam.style.animationPlayState = 'running';
      beam.style.animationDuration = '1.2s';
    }
  });

  retroLaserCard.addEventListener('mouseleave', () => {
    if (beam) {
      beam.style.animationDuration = '3s';
    }
  });
}`,
  ts: `// TypeScript Implementation
const retroLaserCard = document.querySelector<HTMLDivElement>('.retro-laser-card');
if (retroLaserCard) {
  const beam = retroLaserCard.querySelector<HTMLDivElement>('.retro-laser-beam');
  
  retroLaserCard.addEventListener('mouseenter', () => {
    if (beam) {
      beam.style.animationPlayState = 'running';
      beam.style.animationDuration = '1.2s';
    }
  });

  retroLaserCard.addEventListener('mouseleave', () => {
    if (beam) {
      beam.style.animationDuration = '3s';
    }
  });
}`,
  css: `/* Retro Laser Scanner Card Styles */
.retro-laser-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #020803;
  border-radius: 16px;
  border: 1px solid rgba(0, 255, 102, 0.2);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.65),
    0 0 10px rgba(0, 255, 102, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.retro-laser-scanner-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(0, 255, 102, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 255, 102, 0.08) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: 1;
  pointer-events: none;
  opacity: 0.6;
  transition: all 0.3s ease;
}

/* Horizontal scanning laser beam */
.retro-laser-beam {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #00ff66;
  box-shadow: 
    0 0 8px #00ff66,
    0 0 18px rgba(0, 255, 102, 0.6);
  top: -10px;
  z-index: 2;
  pointer-events: none;
  animation: laser-sweep-loop 3s infinite linear;
}

.retro-laser-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, #020803 50%, rgba(2, 8, 3, 0.1) 100%);
}

.retro-laser-tag {
  color: #00ff66;
  font-family: 'Courier New', Courier, monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 12px;
  text-shadow: 0 0 5px rgba(0, 255, 102, 0.35);
}

.retro-laser-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.retro-laser-desc {
  color: #8fa592;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.retro-laser-footer {
  border-top: 1px solid rgba(0, 255, 102, 0.15);
  padding-top: 15px;
}

.retro-laser-status {
  color: #00ff66;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

/* Hover scanner adjustments */
.retro-laser-card:hover {
  border-color: #00ff66;
  box-shadow: 
    0 20px 45px rgba(0, 255, 102, 0.25),
    0 0 20px rgba(0, 255, 102, 0.12),
    inset 0 0 15px rgba(0, 255, 102, 0.15);
  transform: translateY(-2px);
}

.retro-laser-card:hover .retro-laser-scanner-grid {
  background-image: 
    linear-gradient(to right, rgba(0, 255, 102, 0.15) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 255, 102, 0.15) 1px, transparent 1px);
  opacity: 1;
}

.retro-laser-card:hover .retro-laser-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00ff66;
}

@keyframes laser-sweep-loop {
  0% { top: 0%; opacity: 0.7; }
  50% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#020803] rounded-2xl border border-[#00ff66]/20 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.65)] hover:border-[#00ff66] hover:shadow-[0_20px_45px_rgba(0,255,102,0.25)] hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-[#00ff66] tracking-widest mb-3 font-mono">GRID SCANNER</div>
    <div class="font-bold text-2xl text-white mb-2.5">System Scanner</div>
    <div class="text-xs text-emerald-800 leading-relaxed mb-6 font-mono">Monitoring automated memory registry buffers, active file logs, and network packets for anomalous signatures.</div>
    <div class="border-t border-[#00ff66]/20 pt-4 text-[#00ff66] font-bold text-xs tracking-wider">
      SYS LEVEL: SECURE
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Retro Laser Scanner Card" component. Embedded inside a dark-green matrix grid, a horizontal glowing green scan sweep traversing back and forth continuously across stats.`
};
