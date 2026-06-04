/**
 * Component: Magnetic Sinusoidal Flux Loader
 * Category: loaders
 */

export const component = {
  id: 'magnetic-flux-loader',
  name: 'Magnetic Sinusoidal Flux Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="flux-loader-wrapper">
  <div class="flux-column col-1"></div>
  <div class="flux-column col-2"></div>
  <div class="flux-column col-3"></div>
  <div class="flux-column col-4"></div>
  <div class="flux-column col-5"></div>
</div>`,
  js: `// Undulating columns tracking mouse coordinates on hover
const fluxWrapper = document.querySelector('.flux-loader-wrapper');
if (fluxWrapper) {
  fluxWrapper.addEventListener('mousemove', (e) => {
    const cols = fluxWrapper.querySelectorAll('.flux-column');
    const rect = fluxWrapper.getBoundingClientRect();
    const y = e.clientY - rect.top;
    
    cols.forEach((col, idx) => {
      const offset = Math.sin((y * 0.05) + idx) * 20;
      col.style.transform = \`translateY(\${offset}px)\`;
    });
  });
  
  fluxWrapper.addEventListener('mouseleave', () => {
    const cols = fluxWrapper.querySelectorAll('.flux-column');
    cols.forEach(col => {
      col.style.transform = '';
    });
  });
}`,
  ts: `// TypeScript Implementation
const fluxWrapper = document.querySelector<HTMLDivElement>('.flux-loader-wrapper');
if (fluxWrapper) {
  fluxWrapper.addEventListener('mousemove', (e) => {
    const cols = fluxWrapper.querySelectorAll<HTMLDivElement>('.flux-column');
    const rect = fluxWrapper.getBoundingClientRect();
    const y = e.clientY - rect.top;
    
    cols.forEach((col, idx) => {
      const offset = Math.sin((y * 0.05) + idx) * 20;
      col.style.transform = \`translateY(\${offset}px)\`;
    });
  });
  
  fluxWrapper.addEventListener('mouseleave', () => {
    const cols = fluxWrapper.querySelectorAll<HTMLDivElement>('.flux-column');
    cols.forEach(col => {
      col.style.transform = '';
    });
  });
}`,
  css: `/* Magnetic Sinusoidal Flux Loader Styles */
.flux-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  cursor: pointer;
}

.flux-column {
  width: 8px;
  height: 48px;
  border-radius: 4px;
  background: linear-gradient(180deg, #00f2fe 0%, #a28cff 50%, #ff007f 100%);
  box-shadow: 
    0 0 10px rgba(0, 242, 254, 0.4),
    0 0 20px rgba(255, 0, 127, 0.2);
  transition: transform 0.15s ease-out;
}

.col-1 { animation: flux-sine-wave 1.6s ease-in-out infinite; animation-delay: 0s; }
.col-2 { animation: flux-sine-wave 1.6s ease-in-out infinite; animation-delay: 0.2s; }
.col-3 { animation: flux-sine-wave 1.6s ease-in-out infinite; animation-delay: 0.4s; }
.col-4 { animation: flux-sine-wave 1.6s ease-in-out infinite; animation-delay: 0.6s; }
.col-5 { animation: flux-sine-wave 1.6s ease-in-out infinite; animation-delay: 0.8s; }

@keyframes flux-sine-wave {
  0%, 100% { transform: translateY(0) scaleY(1); filter: brightness(1); }
  50% { transform: translateY(-16px) scaleY(1.3); filter: brightness(1.3); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-around px-2">
  <div class="w-2 h-12 rounded-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 shadow-[0_0_10px_cyan] animate-bounce"></div>
  <div class="w-2 h-12 rounded-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-500 shadow-[0_0_10px_cyan] animate-bounce [animation-delay:0.2s]"></div>
</div>`,
  prompt: `Futuristic magnetic flux columns. Sinusoidal vertical bar matrix undulates smoothly, responsive to pointer offsets and active proximity.`
};
