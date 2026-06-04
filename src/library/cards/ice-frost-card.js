/**
 * Component: Sub-Zero Ice Frost Card
 * Category: cards
 */

export const component = {
  id: 'ice-frost-card',
  name: 'Sub-Zero Ice Frost Card',
  category: 'cards',
  tag: 'Visual',
  html: `<div class="ice-frost-card">
  <div class="ice-frost-overlay"></div>
  <div class="ice-card-content">
    <span class="ice-card-tag">THERMAL SYSTEMS</span>
    <h3 class="ice-card-title">Glacier Node</h3>
    <p class="ice-card-desc">Sub-zero cryo-cooling grids, absolute zero heat sinks, and refrigerant pressure status logs.</p>
    <div class="ice-card-footer">
      <span class="ice-card-status">TEMP: -84°C</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Ice Frost Melting on Hover
const iceCard = document.querySelector('.ice-frost-card');
if (iceCard) {
  const frost = iceCard.querySelector('.ice-frost-overlay');
  
  iceCard.addEventListener('mouseenter', () => {
    if (frost) {
      frost.style.opacity = '0.15';
      frost.style.transform = 'scale(1.05)';
      frost.style.filter = 'blur(15px)';
    }
  });

  iceCard.addEventListener('mouseleave', () => {
    if (frost) {
      frost.style.opacity = '1';
      frost.style.transform = 'scale(1)';
      frost.style.filter = 'none';
    }
  });
}`,
  ts: `// TypeScript Implementation
const iceCard = document.querySelector<HTMLDivElement>('.ice-frost-card');
if (iceCard) {
  const frost = iceCard.querySelector<HTMLDivElement>('.ice-frost-overlay');
  
  iceCard.addEventListener('mouseenter', () => {
    if (frost) {
      frost.style.opacity = '0.15';
      frost.style.transform = 'scale(1.05)';
      frost.style.filter = 'blur(15px)';
    }
  });

  iceCard.addEventListener('mouseleave', () => {
    if (frost) {
      frost.style.opacity = '1';
      frost.style.transform = 'scale(1)';
      frost.style.filter = 'none';
    }
  });
}`,
  css: `/* Sub-Zero Ice Frost Card Styles */
.ice-frost-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #010813;
  border-radius: 16px;
  border: 1px solid rgba(0, 242, 254, 0.2);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.6),
    0 0 10px rgba(0, 242, 254, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Frosted Ice Melter Overlay */
.ice-frost-overlay {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.18) 70%),
    linear-gradient(135deg, rgba(0, 242, 254, 0.25) 0%, rgba(255, 255, 255, 0.12) 100%);
  backdrop-filter: blur(18px) contrast(1.1);
  -webkit-backdrop-filter: blur(18px) contrast(1.1);
  z-index: 2;
  pointer-events: none;
  border-radius: 16px;
  opacity: 1;
  transform: scale(1);
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ice-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, #010813 30%, rgba(1, 8, 19, 0.1) 100%);
}

.ice-card-tag {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.35);
}

.ice-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.ice-card-desc {
  color: #8fa0b5;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.ice-card-footer {
  border-top: 1px solid rgba(0, 242, 254, 0.25);
  padding-top: 15px;
}

.ice-card-status {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(0, 242, 254, 0.3);
}

/* Hover melting states */
.ice-frost-card:hover {
  border-color: rgba(0, 242, 254, 0.65);
  box-shadow: 
    0 20px 45px rgba(0, 242, 254, 0.28),
    0 0 20px rgba(0, 242, 254, 0.15),
    inset 0 0 15px rgba(0, 242, 254, 0.15);
  transform: translateY(-2px);
}

.ice-frost-card:hover .ice-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#010813] rounded-2xl border border-[#00f2fe]/20 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-[#00f2fe]/65 hover:shadow-[0_20px_45px_rgba(0,242,254,0.28)] hover:-translate-y-0.5 transition-all duration-300">
  <span class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.18)_70%),linear-gradient(135deg,rgba(0,242,254,0.25)_0%,rgba(255,255,255,0.12)_100%)] backdrop-blur-[18px] z-10 opacity-100 group-hover:opacity-15 group-hover:scale-105 group-hover:blur-[15px] transition-all duration-500 rounded-2xl"></span>
  <div class="relative h-full flex flex-col justify-end z-20">
    <div class="font-bold text-xs text-[#00f2fe] tracking-widest mb-3">THERMAL SYSTEMS</div>
    <div class="font-bold text-2xl text-white mb-2.5">Glacier Node</div>
    <div class="text-xs text-[#8fa0b5] leading-relaxed mb-6">Sub-zero cryo-cooling grids, absolute zero heat sinks, and refrigerant pressure status logs.</div>
    <div class="border-t border-[#00f2fe]/25 pt-4 text-[#00f2fe] font-bold text-xs tracking-wider">
      TEMP: -84°C
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Sub-Zero Ice Frost Card" component. Embedded inside a sub-zero icy-slate casing, a frosted glacier overlay melts organically (fading opacity and scaling up) on hover to reveal underlying stats.`
};
