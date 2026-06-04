/**
 * Component: Glassmorphic Fluid Tracker Card
 * Category: cards
 */

export const component = {
  id: 'glass-fluid-card',
  name: 'Glassmorphic Fluid Tracker',
  category: 'cards',
  tag: 'Interactive',
  html: `<div class="glass-fluid-card">
  <div class="glass-fluid-orb"></div>
  <div class="glass-card-content">
    <span class="glass-card-tag">SECURE SHIELD</span>
    <h3 class="glass-card-title">Encrypted Vault</h3>
    <p class="glass-card-desc">End-to-end cryptographic key blocks protecting relational database clusters and cloud logs.</p>
    <div class="glass-card-footer">
      <span class="glass-card-status"><span class="status-indicator"></span>PROTECTED</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Glass Fluid Orb Cursor Tracker
const glassCard = document.querySelector('.glass-fluid-card');
if (glassCard) {
  const orb = glassCard.querySelector('.glass-fluid-orb');
  
  glassCard.addEventListener('mousemove', (e) => {
    const rect = glassCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Smooth tracking positioning
    if (orb) {
      orb.style.left = \`\${x}px\`;
      orb.style.top = \`\${y}px\`;
      orb.style.opacity = '1';
    }
  });

  glassCard.addEventListener('mouseleave', () => {
    if (orb) {
      orb.style.transition = 'left 0.8s ease, top 0.8s ease, opacity 0.5s ease';
      orb.style.opacity = '0.3';
      orb.style.left = '50%';
      orb.style.top = '50%';
    }
  });
  
  glassCard.addEventListener('mouseenter', () => {
    if (orb) orb.style.transition = 'none';
  });
}`,
  ts: `// TypeScript Implementation
const glassCard = document.querySelector<HTMLDivElement>('.glass-fluid-card');
if (glassCard) {
  const orb = glassCard.querySelector<HTMLDivElement>('.glass-fluid-orb');
  
  glassCard.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = glassCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (orb) {
      orb.style.left = \`\${x}px\`;
      orb.style.top = \`\${y}px\`;
      orb.style.opacity = '1';
    }
  });

  glassCard.addEventListener('mouseleave', () => {
    if (orb) {
      orb.style.transition = 'left 0.8s ease, top 0.8s ease, opacity 0.5s ease';
      orb.style.opacity = '0.3';
      orb.style.left = '50%';
      orb.style.top = '50%';
    }
  });
  
  glassCard.addEventListener('mouseenter', () => {
    if (orb) orb.style.transition = 'none';
  });
}`,
  css: `/* Glassmorphic Fluid Tracker Card Styles */
.glass-fluid-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.4),
    inset 0 1px 2px rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Backstage glowing organic fluid orb */
.glass-fluid-orb {
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, #00f2fe 0%, #4facfe 50%, transparent 100%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.3;
  left: 50%;
  top: 50%;
  transition: opacity 0.5s ease;
}

.glass-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, rgba(9, 9, 15, 0.8) 0%, rgba(9, 9, 15, 0.2) 100%);
}

.glass-card-tag {
  align-self: flex-start;
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
}

.glass-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.glass-card-desc {
  color: #9ca3af;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.glass-card-footer {
  display: flex;
  align-items: center;
}

.glass-card-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #00ff80;
  font-family: 'Outfit', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.status-indicator {
  width: 6px;
  height: 6px;
  background: #00ff80;
  border-radius: 50%;
  box-shadow: 0 0 8px #00ff80;
  display: inline-block;
  animation: pulse-indicator-glow 1.5s infinite alternate ease-in-out;
}

/* Hover organic glass glows */
.glass-fluid-card:hover {
  border-color: rgba(0, 242, 254, 0.35);
  box-shadow: 
    0 25px 50px rgba(0, 242, 254, 0.12),
    0 0 20px rgba(0, 242, 254, 0.05),
    inset 0 1px 2px rgba(255, 255, 255, 0.2);
}

.glass-fluid-card:hover .glass-fluid-orb {
  opacity: 0.7;
}

@keyframes pulse-indicator-glow {
  0% { transform: scale(0.9); opacity: 0.7; }
  100% { transform: scale(1.15); opacity: 1; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-white/5 backdrop-blur-[25px] rounded-2xl border border-white/8 flex flex-col justify-end cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:border-[#00f2fe]/35 transition-all duration-300">
  <div class="absolute w-[150px] h-[150px] bg-[radial-gradient(circle,#00f2fe_0%,#4facfe_50%,transparent_100%)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 group-hover:opacity-70 left-1/2 top-1/2 -z-10 transition-opacity duration-500"></div>
  <div class="relative h-full flex flex-col justify-end p-[30px] z-10 bg-gradient-to-t from-[#09090f]/80 to-[#09090f]/20">
    <div class="font-bold text-xs text-[#00f2fe] tracking-widest mb-3">SECURE SHIELD</div>
    <div class="font-bold text-2xl text-white mb-2.5">Encrypted Vault</div>
    <div class="text-xs text-[#9ca3af] leading-relaxed mb-6">End-to-end cryptographic key blocks protecting relational database clusters and cloud logs.</div>
    <div class="flex items-center text-[#00ff80] font-bold text-xs tracking-wider">
      <span class="w-1.5 h-1.5 bg-[#00ff80] rounded-full shadow-[0_0_8px_#00ff80] mr-2 animate-pulse"></span>
      PROTECTED
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Glassmorphic Fluid Tracker Card" component. Embedded inside high-blur frosted glass, a radiant glowing turquoise fluid orb smoothly tracks user cursor movements underneath the frosted cover.`
};
