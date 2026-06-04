/**
 * Component: Dynamic Floating Liquid Metal Card
 * Category: cards
 */

export const component = {
  id: 'liquid-mercury-card',
  name: 'Dynamic Floating Liquid Metal Card',
  category: 'cards',
  tag: 'Interactive',
  html: `<div class="liquid-mercury-card">
  <div class="mercury-mesh-layer"></div>
  <div class="mercury-card-content">
    <span class="mercury-card-tag">LIQUID TELEMETRY</span>
    <h3 class="mercury-card-title">Hydra Engine</h3>
    <p class="mercury-card-desc">Simulating sub-zero metallic mercury currents, viscosity grid friction, and thermal fluid displacement values.</p>
    <div class="mercury-card-footer">
      <span class="mercury-card-status">FLOWING STABLE</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Liquid Mercury warp coordinates tracker
const mercuryCard = document.querySelector('.liquid-mercury-card');
if (mercuryCard) {
  const mesh = mercuryCard.querySelector('.mercury-mesh-layer');
  
  mercuryCard.addEventListener('mousemove', (e) => {
    const rect = mercuryCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xp = (x / rect.width) * 100;
    const yp = (y / rect.height) * 100;
    
    // Shift mercury mesh specular gradients
    if (mesh) {
      mesh.style.setProperty('--mercury-x', \`\${xp}%\`);
      mesh.style.setProperty('--mercury-y', \`\${yp}%\`);
      mesh.style.opacity = '1';
    }
  });

  mercuryCard.addEventListener('mouseleave', () => {
    if (mesh) {
      mesh.style.transition = 'background-position 0.6s ease, opacity 0.5s ease';
      mesh.style.setProperty('--mercury-x', '50%');
      mesh.style.setProperty('--mercury-y', '50%');
      mesh.style.opacity = '0.4';
    }
  });
  
  mercuryCard.addEventListener('mouseenter', () => {
    if (mesh) mesh.style.transition = 'none';
  });
}`,
  ts: `// TypeScript Implementation
const mercuryCard = document.querySelector<HTMLDivElement>('.liquid-mercury-card');
if (mercuryCard) {
  const mesh = mercuryCard.querySelector<HTMLDivElement>('.mercury-mesh-layer');
  
  mercuryCard.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = mercuryCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xp = (x / rect.width) * 100;
    const yp = (y / rect.height) * 100;
    
    if (mesh) {
      mesh.style.setProperty('--mercury-x', \`\${xp}%\`);
      mesh.style.setProperty('--mercury-y', \`\${yp}%\`);
      mesh.style.opacity = '1';
    }
  });

  mercuryCard.addEventListener('mouseleave', () => {
    if (mesh) {
      mesh.style.transition = 'background-position 0.6s ease, opacity 0.5s ease';
      mesh.style.setProperty('--mercury-x', '50%');
      mesh.style.setProperty('--mercury-y', '50%');
      mesh.style.opacity = '0.4';
    }
  });
  
  mercuryCard.addEventListener('mouseenter', () => {
    if (mesh) mesh.style.transition = 'none';
  });
}`,
  css: `/* Dynamic Floating Liquid Metal Card Styles */
.liquid-mercury-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #020306;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.65),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Liquid metal shifting background */
.mercury-mesh-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mercury-x, 50%) var(--mercury-y, 50%),
    rgba(255, 255, 255, 0.35) 0%,
    rgba(17, 17, 24, 0.8) 50%,
    #020306 100%
  ), linear-gradient(
    135deg,
    #2c3e50 0%,
    #000000 50%,
    #bdc3c7 100%
  );
  z-index: 1;
  opacity: 0.4;
  transition: opacity 0.5s ease;
  mix-blend-mode: exclusion;
}

.mercury-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, #020306 40%, rgba(2, 3, 6, 0.1) 100%);
}

.mercury-card-tag {
  color: #bdc3c7;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
}

.mercury-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}

.mercury-card-desc {
  color: #95a5a6;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.mercury-card-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 15px;
}

.mercury-card-status {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}

/* Hover organic gloss sweeps */
.liquid-mercury-card:hover {
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 
    0 20px 45px rgba(255, 255, 255, 0.12),
    inset 0 1px 1px rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.liquid-mercury-card:hover .mercury-mesh-layer {
  opacity: 0.85;
}

.liquid-mercury-card:hover .mercury-card-title {
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#020306] rounded-2xl border border-white/8 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.65)] hover:border-white/25 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-slate-400 tracking-widest mb-3">LIQUID TELEMETRY</div>
    <div class="font-bold text-2xl text-white mb-2.5">Hydra Engine</div>
    <div class="text-xs text-slate-500 leading-relaxed mb-6">Simulating sub-zero metallic mercury currents, viscosity grid friction, and thermal fluid displacement values.</div>
    <div class="border-t border-white/10 pt-4 text-white font-bold text-xs tracking-wider">
      FLOWING STABLE
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Dynamic Floating Liquid Metal Card" component. Translucent glass overlaying a highly glossy liquid metal mercury backdrop. Hovering warps the specular reflections organically based on cursor coordinate inputs.`
};
