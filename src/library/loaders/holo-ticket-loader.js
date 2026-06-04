/**
 * Component: Holographic Ticket Spinner Loader
 * Category: loaders
 */

export const component = {
  id: 'holo-ticket-loader',
  name: 'Holographic Ticket Spinner Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="holo-ticket-wrapper">
  <div class="holo-ticket-loader-box">
    <div class="ticket-shimmer-layer"></div>
    <div class="ticket-perfs">
      <span class="perf-tick perf-t-l"></span>
      <span class="perf-tick perf-t-r"></span>
    </div>
  </div>
</div>`,
  js: `// Holographic color shifting on coordinates tracking hover
const ticketContainer = document.querySelector('.holo-ticket-wrapper');
if (ticketContainer) {
  const shimmer = ticketContainer.querySelector('.ticket-shimmer-layer');
  
  ticketContainer.addEventListener('mousemove', (e) => {
    if (!shimmer) return;
    
    const rect = ticketContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    shimmer.style.setProperty('--x', \`\${percentX}%\`);
    shimmer.style.setProperty('--y', \`\${percentY}%\`);
  });
}`,
  ts: `// TypeScript Implementation
const ticketContainer = document.querySelector<HTMLDivElement>('.holo-ticket-wrapper');
if (ticketContainer) {
  const shimmer = ticketContainer.querySelector<HTMLDivElement>('.ticket-shimmer-layer');
  
  ticketContainer.addEventListener('mousemove', (e) => {
    if (!shimmer) return;
    
    const rect = ticketContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    shimmer.style.setProperty('--x', \`\${percentX}%\`);
    shimmer.style.setProperty('--y', \`\${percentY}%\`);
  });
}`,
  css: `/* Holographic Ticket Spinner Loader Styles */
.holo-ticket-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 400px;
}

.holo-ticket-loader-box {
  position: relative;
  width: 50px;
  height: 80px;
  background: #0d0c10;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  overflow: hidden;
  animation: ticket-spin-3d 3.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
}

.ticket-shimmer-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--x, 50%) var(--y, 50%),
    rgba(255, 0, 128, 0.18) 0%,
    rgba(0, 242, 254, 0.18) 40%,
    rgba(255, 255, 255, 0.05) 80%,
    transparent 100%
  );
  z-index: 1;
  pointer-events: none;
  opacity: 0.8;
  animation: ticket-color-shimmer 3s ease infinite alternate;
}

.ticket-perfs {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3;
}

.perf-tick {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #111116; /* matches background */
  border: 1.5px dashed rgba(255, 255, 255, 0.15);
}

.perf-t-l { left: -5px; }
.perf-t-r { right: -5px; }

@keyframes ticket-spin-3d {
  0% { transform: rotateY(0deg) rotateX(20deg); }
  50% { transform: rotateY(180deg) rotateX(-20deg); }
  100% { transform: rotateY(360deg) rotateX(20deg); }
}

@keyframes ticket-color-shimmer {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center [perspective:400px]">
  <div class="relative w-[50px] h-[80px] bg-[#0d0c10] border border-dashed border-white/10 rounded-lg overflow-hidden group">
    <div class="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-cyan-400/20 to-transparent"></div>
  </div>
</div>`,
  prompt: `Holographic tickets loading pass. Boarding pass coupon rotates in 3D perspective while its overlay dynamically shifts light reflections in rainbow hues.`
};
