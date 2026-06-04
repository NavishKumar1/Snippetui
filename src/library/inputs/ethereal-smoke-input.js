/**
 * Component: Ethereal Aura Smoke Input
 * Category: inputs
 */

export const component = {
  id: 'ethereal-smoke-input',
  name: 'Ethereal Aura Smoke Input',
  category: 'inputs',
  tag: 'Creative',
  html: `<div class="smoke-input-group">
  <input type="text" class="smoke-input-field" placeholder=" " id="smoke-input-demo" autocomplete="off">
  <div class="smoke-flow-backdrop"></div>
  <div class="smoke-rings-container"></div>
  <label class="smoke-input-label" for="smoke-input-demo">AURA RESONANCE</label>
</div>`,
  js: `// Keydown triggers expanding smokey halos/rings inside the box
const smokeInput = document.querySelector('.smoke-input-field');
if (smokeInput) {
  const container = smokeInput.parentElement.querySelector('.smoke-rings-container');
  
  smokeInput.addEventListener('keydown', () => {
    if (!container) return;
    
    const ring = document.createElement('span');
    ring.className = 'smoke-ring-particle';
    
    const startX = Math.random() * 50 + 25;
    ring.style.left = \`\${startX}%\`;
    ring.style.animation = 'smoke-halo-expand 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards';
    
    container.appendChild(ring);
    setTimeout(() => ring.remove(), 1200);
  });
}`,
  ts: `// TypeScript Implementation
const smokeInput = document.querySelector<HTMLInputElement>('.smoke-input-field');
if (smokeInput) {
  const parent = smokeInput.parentElement;
  if (parent) {
    const container = parent.querySelector<HTMLDivElement>('.smoke-rings-container');
    
    smokeInput.addEventListener('keydown', () => {
      if (!container) return;
      
      const ring = document.createElement('span');
      ring.className = 'smoke-ring-particle';
      
      const startX = Math.random() * 50 + 25;
      ring.style.left = \`\${startX}%\`;
      ring.style.animation = 'smoke-halo-expand 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards';
      
      container.appendChild(ring);
      setTimeout(() => ring.remove(), 1200);
    });
  }
}`,
  css: `/* Ethereal Aura Smoke Input Styles */
.smoke-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.smoke-input-field {
  width: 100%;
  padding: 16px 18px;
  background: #05060b;
  border: 1px solid rgba(147, 197, 253, 0.15);
  border-radius: 12px;
  color: #f0f5ff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  z-index: 2;
  position: relative;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.smoke-flow-backdrop {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: radial-gradient(circle at 50% 120%, rgba(99, 102, 241, 0.12) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.smoke-rings-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 12px;
  pointer-events: none;
  z-index: 3;
}

.smoke-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(147, 197, 253, 0.5);
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  pointer-events: none;
  z-index: 4;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

.smoke-ring-particle {
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: -10px;
  border-radius: 50%;
  border: 1px solid rgba(147, 197, 253, 0.3);
  background: radial-gradient(circle, rgba(147, 197, 253, 0.05) 0%, transparent 80%);
  filter: blur(4px);
  opacity: 0;
  pointer-events: none;
}

/* Interactions */
.smoke-input-field:focus {
  border-color: rgba(147, 197, 253, 0.5);
  box-shadow: 
    0 8px 25px rgba(99, 102, 241, 0.15),
    0 0 15px rgba(59, 130, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.smoke-input-field:focus ~ .smoke-flow-backdrop {
  opacity: 1;
  animation: smoke-pulse-breathing 4s ease-in-out infinite alternate;
}

.smoke-input-field:focus ~ .smoke-input-label,
.smoke-input-field:not(:placeholder-shown) ~ .smoke-input-label {
  transform: translateY(-165%) scale(0.85);
  color: #93c5fd;
  text-shadow: 0 0 8px rgba(147, 197, 253, 0.4);
  background: #05060b;
  padding: 0 4px;
}

@keyframes smoke-pulse-breathing {
  0% { transform: scale(1); filter: brightness(1); }
  100% { transform: scale(1.05); filter: brightness(1.2); }
}

@keyframes smoke-halo-expand {
  0% {
    transform: scale(0.1) translateY(20px);
    opacity: 0.8;
  }
  100% {
    transform: scale(3.5) translateY(-40px);
    opacity: 0;
  }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="smoke-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-[#05060b] border border-blue-400/20 rounded-xl text-blue-100 outline-none focus:border-blue-400 transition-all duration-300 relative z-10" />
  <label for="smoke-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 text-xs font-bold tracking-widest text-blue-400/50 pointer-events-none transition-all duration-300 peer-focus:-translate-y-[165%] peer-focus:scale-85 peer-focus:text-blue-400 peer-focus:bg-[#05060b] peer-focus:px-1 peer-[:not(:placeholder-shown)]:-translate-y-[165%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-blue-400 peer-[:not(:placeholder-shown)]:bg-[#05060b] peer-[:not(:placeholder-shown)]:px-1 z-20">
    AURA RESONANCE
  </label>
</div>`,
  prompt: `Minimalist sapphire casing. Focus starts abstract swirling deep blue smokey vectors in backplane. Keydowns fire expanding faint smoke halos that rise up and drift out.`
};
