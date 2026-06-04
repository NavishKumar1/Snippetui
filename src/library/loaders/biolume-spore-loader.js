/**
 * Component: Bioluminescent Spore Drift Loader
 * Category: loaders
 */

export const component = {
  id: 'biolume-spore-loader',
  name: 'Bioluminescent Spore Drift Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="spore-loader-wrapper">
  <div class="spore-chamber">
    <span class="spore-node sp-1"></span>
    <span class="spore-node sp-2"></span>
    <span class="spore-node sp-3"></span>
    <span class="spore-node sp-4"></span>
  </div>
</div>`,
  js: `// Interactive spore repelling force on mousemove coordinates
const sporeWrapper = document.querySelector('.spore-loader-wrapper');
if (sporeWrapper) {
  sporeWrapper.addEventListener('mousemove', (e) => {
    const spores = sporeWrapper.querySelectorAll('.spore-node');
    const rect = sporeWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    
    spores.forEach((spore, idx) => {
      const offset = (idx % 2 === 0 ? 1 : -1) * x * 0.4;
      spore.style.transform = \`translateX(\${offset}px)\`;
    });
  });
  
  sporeWrapper.addEventListener('mouseleave', () => {
    const spores = sporeWrapper.querySelectorAll('.spore-node');
    spores.forEach(spore => {
      spore.style.transform = '';
    });
  });
}`,
  ts: `// TypeScript Implementation
const sporeWrapper = document.querySelector<HTMLDivElement>('.spore-loader-wrapper');
if (sporeWrapper) {
  sporeWrapper.addEventListener('mousemove', (e) => {
    const spores = sporeWrapper.querySelectorAll<HTMLSpanElement>('.spore-node');
    const rect = sporeWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    
    spores.forEach((spore, idx) => {
      const offset = (idx % 2 === 0 ? 1 : -1) * x * 0.4;
      spore.style.transform = \`translateX(\${offset}px)\`;
    });
  });
  
  sporeWrapper.addEventListener('mouseleave', () => {
    const spores = sporeWrapper.querySelectorAll<HTMLSpanElement>('.spore-node');
    spores.forEach(spore => {
      spore.style.transform = '';
    });
  });
}`,
  css: `/* Bioluminescent Spore Drift Loader Styles */
.spore-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spore-chamber {
  position: relative;
  width: 80px;
  height: 90px;
  border-radius: 12px;
  background: rgba(0, 255, 127, 0.02);
  border: 1px solid rgba(0, 255, 127, 0.1);
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0,0,0,0.4),
    inset 0 0 10px rgba(0, 255, 127, 0.05);
}

.spore-node {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, #e6fff2 10%, #00ffd0 60%, transparent 100%);
  box-shadow: 0 0 8px #00ffd0, 0 0 16px rgba(0, 255, 208, 0.6);
  opacity: 0;
  transition: transform 0.2s ease-out;
}

.sp-1 { width: 8px; height: 8px; left: 20%; animation: spore-rise-drift 3s linear infinite; }
.sp-2 { width: 6px; height: 6px; left: 50%; animation: spore-rise-drift 2.5s linear infinite; animation-delay: 0.8s; }
.sp-3 { width: 9px; height: 9px; left: 70%; animation: spore-rise-drift 3.5s linear infinite; animation-delay: 1.5s; }
.sp-4 { width: 5px; height: 5px; left: 35%; animation: spore-rise-drift 2.8s linear infinite; animation-delay: 2.2s; }

@keyframes spore-rise-drift {
  0% { bottom: -10%; transform: translateX(0); opacity: 0; }
  10% { opacity: 0.95; }
  50% { transform: translateX(8px); }
  90% { opacity: 0.95; }
  100% { bottom: 110%; transform: translateX(-8px); opacity: 0; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="relative w-[80px] h-[90px] rounded-xl bg-emerald-950/5 border border-emerald-500/10 overflow-hidden">
    <div class="absolute w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_8px_#00ffd0] animate-bounce bottom-0 left-[20%]"></div>
  </div>
</div>`,
  prompt: `Deep forest marine bioluminescent loader. Soft glowing green-cyan spores float and drift slowly upwards inside a translucent chamber cylinder.`
};
