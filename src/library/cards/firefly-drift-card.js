/**
 * Component: Luminescence Firefly Jar Card
 * Category: cards
 */

export const component = {
  id: 'firefly-drift-card',
  name: 'Luminescence Firefly Jar',
  category: 'cards',
  tag: 'Visual',
  html: `<div class="firefly-drift-card">
  <div class="firefly-jar-pool">
    <span class="firefly-node fly-1"></span>
    <span class="firefly-node fly-2"></span>
    <span class="firefly-node fly-3"></span>
    <span class="firefly-node fly-4"></span>
    <span class="firefly-node fly-5"></span>
  </div>
  <div class="firefly-card-content">
    <span class="firefly-card-tag">ECO-DYNAMICS</span>
    <h3 class="firefly-card-title">Firefly Biosphere</h3>
    <p class="firefly-card-desc">Simulating complex biological light swarm clusters, organic orbital drift tracks, and luminescent spore attraction indexes.</p>
    <div class="firefly-card-footer">
      <span class="firefly-card-status">LIGHT INTENSITY: 82%</span>
    </div>
  </div>
</div>`,
  js: `// Interactive Firefly Swarm attraction on Hover
const fireflyCard = document.querySelector('.firefly-drift-card');
if (fireflyCard) {
  const flies = fireflyCard.querySelectorAll('.firefly-node');
  
  fireflyCard.addEventListener('mousemove', (e) => {
    const rect = fireflyCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Attract flies to mouse coordinates with localized randomized spring offsets
    flies.forEach((fly, idx) => {
      const offsetX = (Math.sin(idx * 45) * 30);
      const offsetY = (Math.cos(idx * 45) * 30);
      
      const fx = x + offsetX;
      const fy = y + offsetY;
      
      fly.style.left = \`\${fx}px\`;
      fly.style.top = \`\${fy}px\`;
      fly.style.transition = 'left 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), top 0.4s cubic-bezier(0.1, 0.8, 0.3, 1)';
    });
  });

  fireflyCard.addEventListener('mouseleave', () => {
    // Release back to pre-programmed background orbit cycles
    flies.forEach((fly) => {
      fly.style.left = '';
      fly.style.top = '';
      fly.style.transition = 'all 1.5s ease-in-out';
    });
  });
}`,
  ts: `// TypeScript Implementation
const fireflyCard = document.querySelector<HTMLDivElement>('.firefly-drift-card');
if (fireflyCard) {
  const flies = fireflyCard.querySelectorAll<HTMLSpanElement>('.firefly-node');
  
  fireflyCard.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = fireflyCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    flies.forEach((fly, idx) => {
      const offsetX = (Math.sin(idx * 45) * 30);
      const offsetY = (Math.cos(idx * 45) * 30);
      
      const fx = x + offsetX;
      const fy = y + offsetY;
      
      fly.style.left = \`\${fx}px\`;
      fly.style.top = \`\${fy}px\`;
      fly.style.transition = 'left 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), top 0.4s cubic-bezier(0.1, 0.8, 0.3, 1)';
    });
  });

  fireflyCard.addEventListener('mouseleave', () => {
    flies.forEach((fly) => {
      fly.style.left = '';
      fly.style.top = '';
      fly.style.transition = 'all 1.5s ease-in-out';
    });
  });
}`,
  css: `/* Luminescence Firefly Jar Card Styles */
.firefly-drift-card {
  position: relative;
  width: 300px;
  height: 380px;
  background: #020603;
  border-radius: 16px;
  border: 1px solid rgba(57, 255, 20, 0.15);
  cursor: pointer;
  overflow: hidden;
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(57, 255, 20, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.firefly-jar-pool {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* Orbiting firefly node */
.firefly-node {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #39ff14;
  border-radius: 50%;
  box-shadow: 
    0 0 10px #39ff14,
    0 0 20px #39ff14;
  pointer-events: none;
  z-index: 2;
  opacity: 0.85;
}

/* Programmed slow orbital loops in standby */
.fly-1 { top: 20%; left: 30%; animation: firefly-orbit-1 6s infinite ease-in-out alternate; }
.fly-2 { top: 60%; left: 70%; animation: firefly-orbit-2 7s infinite ease-in-out alternate; }
.fly-3 { top: 40%; left: 15%; animation: firefly-orbit-3 8s infinite ease-in-out alternate; }
.fly-4 { top: 15%; left: 80%; animation: firefly-orbit-4 6.5s infinite ease-in-out alternate; }
.fly-5 { top: 75%; left: 40%; animation: firefly-orbit-5 7.5s infinite ease-in-out alternate; }

.firefly-card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  z-index: 3;
  background: linear-gradient(to top, #020603 50%, rgba(2, 6, 3, 0.2) 100%);
}

.firefly-card-tag {
  color: #00ff80;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 12px;
  text-shadow: 0 0 5px rgba(0, 255, 128, 0.3);
}

.firefly-card-title {
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}

.firefly-card-desc {
  color: #92af9d;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  margin-bottom: 25px;
}

.firefly-card-footer {
  border-top: 1px solid rgba(0, 255, 128, 0.15);
  padding-top: 15px;
}

.firefly-card-status {
  color: #39ff14;
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 5px rgba(57, 255, 20, 0.3);
}

/* Hover organic light attractions */
.firefly-drift-card:hover {
  border-color: #39ff14;
  box-shadow: 
    0 20px 45px rgba(57, 255, 20, 0.22),
    inset 0 0 15px rgba(57, 255, 20, 0.15);
  transform: translateY(-2px);
}

.firefly-drift-card:hover .firefly-node {
  animation-play-state: paused;
}

.firefly-drift-card:hover .firefly-card-title {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #39ff14;
}

/* Standby orbit paths keyframes */
@keyframes firefly-orbit-1 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(30px, -20px); }
}
@keyframes firefly-orbit-2 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-40px, 30px); }
}
@keyframes firefly-orbit-3 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(25px, 40px); }
}
@keyframes firefly-orbit-4 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-30px, -30px); }
}
@keyframes firefly-orbit-5 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 15px); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[300px] h-[380px] bg-[#020603] rounded-2xl border border-[#00ff80]/15 flex flex-col justify-end p-[30px] cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:border-[#39ff14] hover:shadow-[0_20px_45px_rgba(57,255,20,0.22)] hover:-translate-y-0.5 transition-all duration-300">
  <div class="relative h-full flex flex-col justify-end z-10">
    <div class="font-bold text-xs text-[#00ff80] tracking-widest mb-3">ECO-DYNAMICS</div>
    <div class="font-bold text-2xl text-white mb-2.5">Firefly Biosphere</div>
    <div class="text-xs text-[#92af9d] leading-relaxed mb-6">Simulating complex biological light swarm clusters, organic orbital drift tracks, and luminescent spore attraction indexes.</div>
    <div class="border-t border-[#00ff80]/15 pt-4 text-[#39ff14] font-bold text-xs tracking-wider">
      LIGHT INTENSITY: 82%
    </div>
  </div>
</div>`,
  prompt: `Design a premium "Luminescence Firefly Jar Card" component. Embedded inside deep dark-green casing, 5 glowing firefly dots orbit in glass jar loops. Hovering organically attracts all firefly coordinates directly towards the cursor.`
};
