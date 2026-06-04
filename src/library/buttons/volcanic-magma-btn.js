/**
 * Component: Volcanic Magma Flow Button
 * Category: buttons
 */

export const component = {
  id: 'volcanic-magma-btn',
  name: 'Volcanic Magma Flow',
  category: 'buttons',
  tag: 'Visual',
  html: `<button class="volcanic-magma-btn">
  <span class="magma-veins"></span>
  <span class="magma-overlay"></span>
  <span class="magma-text">ERUPT NOW</span>
</button>`,
  js: `// Interactive Magma Heat Pulse on Hover
const magmaBtn = document.querySelector('.volcanic-magma-btn');
if (magmaBtn) {
  magmaBtn.addEventListener('mousemove', (e) => {
    const rect = magmaBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set custom coordinates for radial heat point
    magmaBtn.style.setProperty('--magma-x', \`\${x}px\`);
    magmaBtn.style.setProperty('--magma-y', \`\${y}px\`);
  });
}`,
  ts: `// TypeScript Implementation
const magmaBtn = document.querySelector<HTMLButtonElement>('.volcanic-magma-btn');
if (magmaBtn) {
  magmaBtn.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = magmaBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    magmaBtn.style.setProperty('--magma-x', \`\${x}px\`);
    magmaBtn.style.setProperty('--magma-y', \`\${y}px\`);
  });
}`,
  css: `/* Volcanic Magma Flow Button Styles */
.volcanic-magma-btn {
  position: relative;
  background: #120502;
  border: 1px solid #ff4500;
  padding: 16px 36px;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(255, 69, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Basalt texture/veins effect */
.magma-veins {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 30% 20%, rgba(255, 69, 0, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(255, 0, 0, 0.2) 0%, transparent 45%);
  z-index: 1;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

/* Molten radial tracking flow */
.magma-overlay {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at var(--magma-x, 50%) var(--magma-y, 50%),
    rgba(255, 69, 0, 0.75) 0%,
    rgba(255, 0, 0, 0.4) 30%,
    transparent 65%
  );
  z-index: 2;
  mix-blend-mode: color-dodge;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.magma-text {
  position: relative;
  z-index: 3;
  color: #ff8c00;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-shadow: 
    0 0 5px rgba(255, 69, 0, 0.6),
    0 0 15px rgba(255, 69, 0, 0.3);
  transition: all 0.3s ease;
}

/* Hover active loops */
.volcanic-magma-btn:hover {
  border-color: #ff8c00;
  box-shadow: 
    0 8px 25px rgba(255, 69, 0, 0.45),
    0 0 30px rgba(255, 140, 0, 0.25),
    inset 0 0 15px rgba(255, 69, 0, 0.3);
  transform: translateY(-2px);
}

.volcanic-magma-btn:hover .magma-overlay {
  opacity: 1;
  animation: magma-heat-glow 2s infinite ease-in-out alternate;
}

.volcanic-magma-btn:hover .magma-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #ff4500,
    0 0 25px #ff4500;
}

.volcanic-magma-btn:active {
  transform: translateY(1px);
}

@keyframes magma-heat-glow {
  0% { transform: scale(1); filter: brightness(1); }
  100% { transform: scale(1.1); filter: brightness(1.2); }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#120502] border border-[#ff4500] px-9 py-4 rounded cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#ff8c00] hover:shadow-[0_8px_25px_rgba(255,69,0,0.45)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-[#ff8c00] font-extrabold text-sm tracking-[0.2em] [text-shadow:0_0_5px_rgba(255,69,0,0.6)]">ERUPT NOW</span>
</button>`,
  prompt: `Design a premium "Volcanic Magma Flow Button" component. Created in deep textured basalt-rock color shades, orange-crimson hot magma streams pulsate under the surface. Tracking the cursor sweeps a bright, molten radial heat gradient across the face, while text glows white-hot upon cursor hover.`
};
