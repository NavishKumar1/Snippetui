/**
 * Component: Aurora Holographic Shimmer Button
 * Category: buttons
 */

export const component = {
  id: 'aurora-holo-btn',
  name: 'Aurora Holographic Shimmer',
  category: 'buttons',
  tag: 'Aesthetic',
  html: `<button class="aurora-holo-btn">
  <div class="holo-foil"></div>
  <div class="holo-shimmer"></div>
  <span class="holo-text">COLLECT NFT</span>
</button>`,
  js: `// Interactive Holographic light angle cursor reflection
const holoBtn = document.querySelector('.aurora-holo-btn');
if (holoBtn) {
  const foil = holoBtn.querySelector('.holo-foil');
  const shimmer = holoBtn.querySelector('.holo-shimmer');
  
  holoBtn.addEventListener('mousemove', (e) => {
    const rect = holoBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xp = (x / rect.width) * 100;
    const yp = (y / rect.height) * 100;
    
    // Shift holographic gradients based on coordinates
    if (foil) {
      foil.style.setProperty('--holo-x', \`\${xp}%\`);
      foil.style.setProperty('--holo-y', \`\${yp}%\`);
    }
    if (shimmer) {
      shimmer.style.setProperty('--shimmer-x', \`\${xp}%\`);
      shimmer.style.setProperty('--shimmer-y', \`\${yp}%\`);
    }
  });
}`,
  ts: `// TypeScript Implementation
const holoBtn = document.querySelector<HTMLButtonElement>('.aurora-holo-btn');
if (holoBtn) {
  const foil = holoBtn.querySelector<HTMLDivElement>('.holo-foil');
  const shimmer = holoBtn.querySelector<HTMLDivElement>('.holo-shimmer');
  
  holoBtn.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = holoBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xp = (x / rect.width) * 100;
    const yp = (y / rect.height) * 100;
    
    if (foil) {
      foil.style.setProperty('--holo-x', \`\${xp}%\`);
      foil.style.setProperty('--holo-y', \`\${yp}%\`);
    }
    if (shimmer) {
      shimmer.style.setProperty('--shimmer-x', \`\${xp}%\`);
      shimmer.style.setProperty('--shimmer-y', \`\${yp}%\`);
    }
  });
}`,
  css: `/* Aurora Holographic Shimmer Button Styles */
.aurora-holo-btn {
  position: relative;
  background: #0d0f12;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 16px 36px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.4),
    0 2px 4px rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Holographic foil base background */
.holo-foil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    #ff007f 0%,
    #7b2cbf 20%,
    #00f2fe 40%,
    #4facfe 60%,
    #ffd700 80%,
    #ff007f 100%
  );
  background-size: 200% 200%;
  background-position: var(--holo-x, 50%) var(--holo-y, 50%);
  z-index: 1;
  opacity: 0.15;
  transition: opacity 0.3s ease, background-position 0.1s ease-out;
}

/* Refractive sheen reflection sweep */
.holo-shimmer {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--shimmer-x, 50%) var(--shimmer-y, 50%),
    rgba(255, 255, 255, 0.4) 0%,
    transparent 50%
  );
  z-index: 2;
  mix-blend-mode: overlay;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, background-position 0.1s ease-out;
}

.holo-text {
  position: relative;
  z-index: 3;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  transition: all 0.3s ease;
}

/* Hover dynamic sheen adjustments */
.aurora-holo-btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 12px 30px rgba(0, 242, 254, 0.2),
    0 0 20px rgba(255, 0, 127, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.aurora-holo-btn:hover .holo-foil {
  opacity: 0.45;
}

.aurora-holo-btn:hover .holo-shimmer {
  opacity: 0.8;
}

.aurora-holo-btn:hover .holo-text {
  color: #ffffff;
  text-shadow: 
    0 0 10px rgba(255, 255, 255, 0.6),
    0 0 15px rgba(0, 242, 254, 0.4);
}

.aurora-holo-btn:active {
  transform: translateY(1px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#0d0f12] border border-white/15 px-9 py-4 rounded-lg cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-white font-bold text-xs tracking-[0.15em] [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">COLLECT NFT</span>
</button>`,
  prompt: `Design a premium "Aurora Holographic Shimmer Button" component. A rounded rectangular card format embedded with multiple dynamic foil gradient colors. Moving your mouse over the button realigns the refraction angle and sheen coordinates, producing a pearlescent, liquid silver holographic foil sweep.`
};
