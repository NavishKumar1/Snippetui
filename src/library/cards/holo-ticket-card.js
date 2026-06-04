/**
 * Component: Holographic Ticket Card
 * Category: cards
 */

export const component = {
  id: 'holo-ticket-card',
  name: 'Holographic Ticket Card',
  category: 'cards',
  tag: 'Aesthetic',
  html: `<div class="holo-ticket-card">
  <div class="ticket-hologram-foil"></div>
  <div class="ticket-hologram-sheen"></div>
  
  <!-- Perforated ticket circles -->
  <span class="ticket-punch punch-left"></span>
  <span class="ticket-punch punch-right"></span>
  
  <div class="ticket-card-content">
    <div class="ticket-card-header">
      <span class="ticket-brand">INTERSTELLAR CO.</span>
      <span class="ticket-class-tier">FIRST CLASS</span>
    </div>
    <div class="ticket-main-details">
      <span class="ticket-route-tag">FLIGHT PASS</span>
      <h3 class="ticket-route-title">Orion Nebula</h3>
      <p class="ticket-route-desc">Stellar transit visa card valid for deep star cruise travelers traversing the Orion coordinate lanes.</p>
    </div>
    <div class="ticket-card-footer">
      <span class="ticket-barcode">||||||||| | ||||| | ||||</span>
      <span class="ticket-serial">N°- 884.321</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Holographic ticket sheen cursor tracker
const holoTicket = document.querySelector('.holo-ticket-card');
if (holoTicket) {
  const foil = holoTicket.querySelector('.ticket-hologram-foil');
  const sheen = holoTicket.querySelector('.ticket-hologram-sheen');
  
  holoTicket.addEventListener('mousemove', (e) => {
    const rect = holoTicket.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xp = (x / rect.width) * 100;
    const yp = (y / rect.height) * 100;
    
    if (foil) {
      foil.style.setProperty('--ticket-hx', \`\${xp}%\`);
      foil.style.setProperty('--ticket-hy', \`\${yp}%\`);
      foil.style.opacity = '0.35';
    }
    if (sheen) {
      sheen.style.setProperty('--ticket-sx', \`\${xp}%\`);
      sheen.style.setProperty('--ticket-sy', \`\${yp}%\`);
      sheen.style.opacity = '0.85';
    }
  });

  holoTicket.addEventListener('mouseleave', () => {
    if (foil) {
      foil.style.transition = 'background-position 0.6s ease, opacity 0.5s ease';
      foil.style.setProperty('--ticket-hx', '50%');
      foil.style.setProperty('--ticket-hy', '50%');
      foil.style.opacity = '0.15';
    }
    if (sheen) {
      sheen.style.transition = 'background-position 0.6s ease, opacity 0.5s ease';
      sheen.style.setProperty('--ticket-sx', '50%');
      sheen.style.setProperty('--ticket-sy', '50%');
      sheen.style.opacity = '0';
    }
  });
  
  holoTicket.addEventListener('mouseenter', () => {
    if (foil) foil.style.transition = 'none';
    if (sheen) sheen.style.transition = 'none';
  });
}`,
  ts: `// TypeScript Implementation
const holoTicket = document.querySelector<HTMLDivElement>('.holo-ticket-card');
if (holoTicket) {
  const foil = holoTicket.querySelector<HTMLDivElement>('.ticket-hologram-foil');
  const sheen = holoTicket.querySelector<HTMLDivElement>('.ticket-hologram-sheen');
  
  holoTicket.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = holoTicket.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xp = (x / rect.width) * 100;
    const yp = (y / rect.height) * 100;
    
    if (foil) {
      foil.style.setProperty('--ticket-hx', \`\${xp}%\`);
      foil.style.setProperty('--ticket-hy', \`\${yp}%\`);
      foil.style.opacity = '0.35';
    }
    if (sheen) {
      sheen.style.setProperty('--ticket-sx', \`\${xp}%\`);
      sheen.style.setProperty('--ticket-sy', \`\${yp}%\`);
      sheen.style.opacity = '0.85';
    }
  });

  holoTicket.addEventListener('mouseleave', () => {
    if (foil) {
      foil.style.transition = 'background-position 0.6s ease, opacity 0.5s ease';
      foil.style.setProperty('--ticket-hx', '50%');
      foil.style.setProperty('--ticket-hy', '50%');
      foil.style.opacity = '0.15';
    }
    if (sheen) {
      sheen.style.transition = 'background-position 0.6s ease, opacity 0.5s ease';
      sheen.style.setProperty('--ticket-sx', '50%');
      sheen.style.setProperty('--ticket-sy', '50%');
      sheen.style.opacity = '0';
    }
  });
  
  holoTicket.addEventListener('mouseenter', () => {
    if (foil) foil.style.transition = 'none';
    if (sheen) sheen.style.transition = 'none';
  });
}`,
  css: `/* Holographic Ticket Card Styles */
.holo-ticket-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #0c0e12;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.55),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Perforated ticket punch holes */
.ticket-punch {
  position: absolute;
  width: 20px;
  height: 20px;
  background: #1e1e24; /* Should match background workspace */
  border-radius: 50%;
  top: 75%;
  z-index: 5;
  border: 1px solid rgba(255, 255, 255, 0.12);
  pointer-events: none;
}

.punch-left  { left: -10px; box-shadow: inset -5px 0 5px rgba(0,0,0,0.5); }
.punch-right { right: -10px; box-shadow: inset 5px 0 5px rgba(0,0,0,0.5); }

/* Holographic foil base background */
.ticket-hologram-foil {
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
  background-position: var(--ticket-hx, 50%) var(--ticket-hy, 50%);
  z-index: 1;
  opacity: 0.15;
  transition: opacity 0.3s ease, background-position 0.1s ease-out;
}

/* Refractive sheen reflection sweep */
.ticket-hologram-sheen {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--ticket-sx, 50%) var(--ticket-sy, 50%),
    rgba(255, 255, 255, 0.35) 0%,
    transparent 55%
  );
  z-index: 2;
  mix-blend-mode: overlay;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, background-position 0.1s ease-out;
}

.ticket-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  z-index: 3;
}

.ticket-card-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.15);
  padding-bottom: 15px;
}

.ticket-brand {
  color: #a0aec0;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

.ticket-class-tier {
  color: #ff007f;
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-shadow: 0 0 5px rgba(255, 0, 127, 0.2);
}

.ticket-main-details {
  margin-top: 10px;
  margin-bottom: 30px;
}

.ticket-route-tag {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
}

.ticket-route-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 8px 0;
}

.ticket-route-desc {
  color: #a0aec0;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 1.5;
}

.ticket-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
  padding-top: 25px;
}

.ticket-barcode {
  color: #718096;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  letter-spacing: 2px;
}

.ticket-serial {
  color: #a0aec0;
  font-family: 'Outfit', sans-serif;
  font-size: 10px;
  font-weight: 700;
}

/* Hover dynamic sheen adjustments */
.holo-ticket-card:hover {
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 20px 45px rgba(0, 242, 254, 0.2),
    0 0 20px rgba(255, 0, 127, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.holo-ticket-card:hover .ticket-hologram-foil {
  opacity: 0.45;
}

.holo-ticket-card:hover .ticket-hologram-sheen {
  opacity: 0.85;
}

.holo-ticket-card:hover .ticket-route-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#0c0e12] rounded-2xl border border-white/12 flex flex-col justify-between p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.55)] hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-between z-10">
    <div class="flex justify-between border-b border-white/15 pb-4">
      <span class="text-[11px] text-slate-400 font-bold tracking-widest">INTERSTELLAR CO.</span>
      <span class="text-[10px] text-fuchsia-500 font-extrabold tracking-wider">FIRST CLASS</span>
    </div>
    <div class="my-5">
      <span class="text-[10px] text-[#00f2fe] font-bold tracking-widest">FLIGHT PASS</span>
      <div class="font-bold text-2xl text-white my-2">Orion Nebula</div>
      <p class="text-xs text-slate-400 leading-relaxed">Stellar transit visa card valid for deep star cruise travelers traversing the Orion coordinate lanes.</p>
    </div>
    <div class="flex justify-between border-t border-white/15 pt-5 items-center font-mono">
      <span class="text-slate-500 text-sm tracking-widest">||||||||| | ||||| | ||||</span>
      <span class="text-slate-400 text-[10px] font-bold">N°- 884.321</span>
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Holographic Ticket Card" component. Perforated cinema punch holes trim the borders. Moving the cursor realigns gradients, generating pearlescent holographic ticket card sheens.`
};
