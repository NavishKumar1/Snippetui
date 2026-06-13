/**
 * Component: Holographic Glitch Ticket 404
 * Category: error-404
 */

export const component = {
  id: 'holographic-glitch-ticket-404',
  name: 'Holographic Glitch Ticket 404',
  category: 'error-404',
  tag: 'Holographic',
  html: `<div class="ticket-sandbox" id="holo-ticket-container">
  <div class="ticket-wrapper" id="holo-ticket-element">
    <!-- Holographic Foil Overlay Shines -->
    <div class="ticket-holo-foil"></div>

    <div class="ticket-left">
      <div class="ticket-header">
        <span class="ticket-brand">VOID-AIRWAY</span>
        <span class="ticket-class">LOST SECTOR CLASS</span>
      </div>
      
      <div class="ticket-body">
        <div class="ticket-row">
          <div class="ticket-col">
            <span class="label">PASSENGER NAME</span>
            <span class="value">DRIFTING_USER //</span>
          </div>
          <div class="ticket-col text-right">
            <span class="label">CARRIER</span>
            <span class="value cyan-glow">HTTP-404</span>
          </div>
        </div>

        <div class="ticket-row mt-15">
          <div class="ticket-col">
            <span class="label">ORIGIN PORT</span>
            <span class="value-large text-glow">LOCAL_HOST</span>
          </div>
          <div class="ticket-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <div class="ticket-col text-right">
            <span class="label">DESTINATION SECTOR</span>
            <span class="value-large pink-glow">VOID_MATRIX</span>
          </div>
        </div>
      </div>

      <div class="ticket-footer">
        <div class="ticket-gate-info">
          <span>GATE: NULL</span>
          <span class="dot"></span>
          <span>SEAT: NO_INDEX</span>
          <span class="dot"></span>
          <span>FLIGHT: CORRUPTED</span>
        </div>
      </div>
    </div>

    <div class="ticket-right-stub">
      <div class="stub-dashed-divider"></div>
      <div class="stub-body">
        <div class="stub-logo">404</div>
        <div class="stub-barcode">
          <span class="bar-l"></span>
          <span class="bar-s"></span>
          <span class="bar-m"></span>
          <span class="bar-l"></span>
          <span class="bar-s"></span>
          <span class="bar-l"></span>
          <span class="bar-m"></span>
          <span class="bar-s"></span>
          <span class="bar-l"></span>
        </div>
        <div class="stub-status">BOARDING FAULT</div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Holographic Glitch Ticket 404
const container = document.getElementById('holo-ticket-container');
if (container) {
  const card = container.querySelector('#holo-ticket-element');
  const foil = container.querySelector('.ticket-holo-foil');

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation angles
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;

    const rotateX = -(dy / cy) * 16; // Up to 16 degrees tilt
    const rotateY = (dx / cx) * 16;

    // Set 3D transform properties
    card.style.transform = 'rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)';

    // Update holographic gradient shine center coordinates
    const foilX = (x / rect.width) * 100;
    const foilY = (y / rect.height) * 100;
    foil.style.backgroundPosition = foilX + '% ' + foilY + '%';
    foil.style.opacity = '0.36';
  };

  const handleMouseLeave = () => {
    // Return card to original resting state smoothly
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    foil.style.opacity = '0.08';
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  // Cleanup
  container.addEventListener('destroyed', () => {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
  });
}`,
  ts: `// Holographic Glitch Ticket 404 TS Definitions
const container = document.getElementById('holo-ticket-container') as HTMLDivElement | null;
if (container) {
  const card = container.querySelector('#holo-ticket-element') as HTMLDivElement;
  const foil = container.querySelector('.ticket-holo-foil') as HTMLDivElement;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = container!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;

    const rotateX = -(dy / cy) * 16;
    const rotateY = (dx / cx) * 16;

    card.style.transform = 'rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)';

    const foilX = (x / rect.width) * 100;
    const foilY = (y / rect.height) * 100;
    foil.style.backgroundPosition = foilX + '% ' + foilY + '%';
    foil.style.opacity = '0.36';
  };

  const handleMouseLeave = () => {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    foil.style.opacity = '0.08';
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  container.addEventListener('destroyed', () => {
    container!.removeEventListener('mousemove', handleMouseMove);
    container!.removeEventListener('mouseleave', handleMouseLeave);
  });
}`,
  css: `/* Holographic Glitch Ticket 404 Styles */
.ticket-sandbox {
  position: relative;
  width: 100%;
  height: 540px;
  background: #020108;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit', system-ui, -apple-system, sans-serif;
  color: #ffffff;
  perspective: 1200px;
  box-sizing: border-box;
}

.ticket-wrapper {
  position: relative;
  width: 86%;
  max-width: 520px;
  height: 220px;
  background: rgba(10, 6, 22, 0.64);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  display: flex;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
  will-change: transform;
}

.ticket-wrapper:hover {
  box-shadow: 0 40px 80px rgba(0, 242, 254, 0.12), 0 0 30px rgba(255, 0, 127, 0.08);
}

.ticket-holo-foil {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  background: linear-gradient(115deg, 
    transparent 20%, 
    rgba(0, 242, 254, 0.28) 35%, 
    rgba(255, 0, 127, 0.28) 50%, 
    rgba(255, 220, 0, 0.25) 65%, 
    transparent 80%
  );
  background-size: 140px 140px;
  opacity: 0.08;
  pointer-events: none;
  z-index: 5;
  mix-blend-mode: color-dodge;
  transition: opacity 0.3s ease;
}

.ticket-left {
  flex-grow: 1;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
}

.ticket-brand {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #a0aec0;
}

.ticket-class {
  font-size: 10px;
  font-weight: 700;
  color: #ff007f;
  background: rgba(255, 0, 127, 0.08);
  padding: 2px 8px;
  border-radius: 20px;
  border: 1px solid rgba(255, 0, 127, 0.15);
}

.ticket-body {
  margin: 16px 0;
}

.ticket-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ticket-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #718096;
}

.value {
  font-family: monospace;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
}

.value-large {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: -0.5px;
}

.text-glow {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

.cyan-glow {
  color: #00f2fe;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.4);
}

.pink-glow {
  color: #ff007f;
  text-shadow: 0 0 8px rgba(255, 0, 127, 0.4);
}

.ticket-arrow {
  color: #718096;
  opacity: 0.6;
}

.ticket-footer {
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  padding-top: 10px;
}

.ticket-gate-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 700;
  color: #a0aec0;
}

.ticket-gate-info .dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
}

.ticket-right-stub {
  position: relative;
  width: 110px;
  min-width: 110px;
  background: rgba(255, 255, 255, 0.02);
  display: flex;
}

.stub-dashed-divider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 1px;
  border-left: 2px dotted rgba(255, 255, 255, 0.12);
}

.stub-body {
  flex-grow: 1;
  padding: 22px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.stub-logo {
  font-size: 24px;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

.stub-barcode {
  display: flex;
  gap: 2.5px;
  height: 55px;
  opacity: 0.65;
}

.stub-barcode span {
  background: #ffffff;
}

.bar-s { width: 1px; }
.bar-m { width: 2px; }
.bar-l { width: 4px; }

.stub-status {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1px;
  color: #ff007f;
}
`,
  tailwind: `<div class="relative w-full h-[540px] bg-[#020108] rounded-[24px] overflow-hidden flex items-center justify-center font-sans text-white" id="holo-ticket-container" style="perspective: 1200px;">
  <div class="relative w-[86%] max-w-[520px] h-[220px] bg-[#0a0616]/64 backdrop-blur-[18px] border border-white/8 rounded-[18px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex overflow-hidden hover:shadow-[0_40px_80px_rgba(0,242,254,0.12),_0_0_30px_rgba(255,0,127,0.08)] transition-all duration-[350ms] ease-out will-change-transform" id="holo-ticket-element" style="transform-style: preserve-3d;">
    <div class="ticket-holo-foil absolute top-0 left-0 w-[200%] h-[200%] pointer-events-none z-[5] mix-blend-color-dodge transition-opacity duration-300 opacity-[0.08]" style="background: linear-gradient(115deg, transparent 20%, rgba(0, 242, 254, 0.28) 35%, rgba(255, 0, 127, 0.28) 50%, rgba(255, 220, 0, 0.25) 65%, transparent 80%); background-size: 140px 140px;"></div>

    <div class="flex-grow p-[22px_24px] flex flex-col justify-between">
      <div class="flex justify-between items-center border-b border-dashed border-white/10 pb-[10px]">
        <span class="text-[11px] font-extrabold tracking-[2px] text-[#a0aec0]">VOID-AIRWAY</span>
        <span class="text-[10px] font-bold text-[#ff007f] bg-[#ff007f]/8 p-[2px_8px] rounded-full border border-[#ff007f]/15">LOST SECTOR CLASS</span>
      </div>
      
      <div class="my-[16px]">
        <div class="flex justify-between items-center">
          <div class="flex flex-col gap-[3px]">
            <span class="text-[9px] font-bold tracking-[1px] text-[#718096]">PASSENGER NAME</span>
            <span class="font-mono text-[13px] font-bold text-white">DRIFTING_USER //</span>
          </div>
          <div class="flex flex-col gap-[3px] text-right">
            <span class="text-[9px] font-bold tracking-[1px] text-[#718096]">CARRIER</span>
            <span class="font-mono text-[13px] font-bold text-[#00f2fe]" style="text-shadow: 0 0 8px rgba(0, 242, 254, 0.4);">HTTP-404</span>
          </div>
        </div>

        <div class="flex justify-between items-center mt-[15px]">
          <div class="flex flex-col gap-[3px]">
            <span class="text-[9px] font-bold tracking-[1px] text-[#718096]">ORIGIN PORT</span>
            <span class="text-[18px] font-black tracking-[-0.5px]" style="text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);">LOCAL_HOST</span>
          </div>
          <div class="text-[#718096] opacity-60">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <div class="flex flex-col gap-[3px] text-right">
            <span class="text-[9px] font-bold tracking-[1px] text-[#718096]">DESTINATION SECTOR</span>
            <span class="text-[18px] font-black tracking-[-0.5px] text-[#ff007f]" style="text-shadow: 0 0 8px rgba(255, 0, 127, 0.4);">VOID_MATRIX</span>
          </div>
        </div>
      </div>

      <div class="border-t border-dashed border-white/10 pt-[10px]">
        <div class="flex items-center gap-[8px] text-[10px] font-bold text-[#a0aec0]">
          <span>GATE: NULL</span>
          <span class="w-[3px] h-[3px] rounded-full bg-white/30"></span>
          <span>SEAT: NO_INDEX</span>
          <span class="w-[3px] h-[3px] rounded-full bg-white/30"></span>
          <span>FLIGHT: CORRUPTED</span>
        </div>
      </div>
    </div>

    <div class="relative w-[110px] min-w-[110px] bg-white/2 flex">
      <div class="absolute top-0 left-0 h-full w-[1px] border-l-2 border-dotted border-white/12"></div>
      <div class="flex-grow p-[22px_14px] flex flex-col justify-between items-center">
        <div class="text-[24px] font-black text-white" style="text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);">404</div>
        <div class="flex gap-[2.5px] h-[55px] opacity-[0.65]">
          <span class="w-[4px] bg-white"></span>
          <span class="w-[1px] bg-white"></span>
          <span class="w-[2px] bg-white"></span>
          <span class="w-[4px] bg-white"></span>
          <span class="w-[1px] bg-white"></span>
          <span class="w-[4px] bg-white"></span>
          <span class="w-[2px] bg-white"></span>
          <span class="w-[1px] bg-white"></span>
          <span class="w-[4px] bg-white"></span>
        </div>
        <div class="text-[9px] font-extrabold tracking-[1px] text-[#ff007f]">BOARDING FAULT</div>
      </div>
    </div>
  </div>
</div>`
};
