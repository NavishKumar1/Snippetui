/**
 * Component: Firefly Drift Text
 * Category: text-animation
 */

export const component = {
  id: 'firefly-drift-text',
  name: 'Firefly Drift Glow',
  category: 'text-animation',
  tag: 'Magical',
  html: `<div class="firefly-drift-container">
  <span class="firefly-drift-text">FIREFLY</span>
  <div class="firefly-swarm">
    <div class="firefly-bug" style="--x: 10%; --y: 20%; --speed: 6s; --delay: 0s;"></div>
    <div class="firefly-bug" style="--x: 80%; --y: 40%; --speed: 8s; --delay: -2s;"></div>
    <div class="firefly-bug" style="--x: 40%; --y: 70%; --speed: 7s; --delay: -4s;"></div>
  </div>
</div>`,
  js: `// Interactive hover bug attraction
const fireflyContainer = document.querySelector('.firefly-drift-container');
if (fireflyContainer) {
  fireflyContainer.addEventListener('mousemove', (e) => {
    const rect = fireflyContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const bugs = fireflyContainer.querySelectorAll('.firefly-bug');
    bugs.forEach(bug => {
      bug.style.left = \`\${x}px\`;
      bug.style.top = \`\${y}px\`;
      bug.style.transition = 'left 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), top 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });
  });
  
  fireflyContainer.addEventListener('mouseleave', () => {
    const bugs = fireflyContainer.querySelectorAll('.firefly-bug');
    bugs.forEach(bug => {
      bug.style.left = '';
      bug.style.top = '';
      bug.style.transition = '';
    });
  });
}`,
  ts: `// TypeScript Implementation
const fireflyContainer = document.querySelector<HTMLDivElement>('.firefly-drift-container');
if (fireflyContainer) {
  fireflyContainer.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = fireflyContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const bugs = fireflyContainer.querySelectorAll<HTMLDivElement>('.firefly-bug');
    bugs.forEach(bug => {
      bug.style.left = \`\${x}px\`;
      bug.style.top = \`\${y}px\`;
      bug.style.transition = 'left 0.8s cubic-bezier(0.165, 0.84, 0.44, 1), top 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });
  });
  
  fireflyContainer.addEventListener('mouseleave', () => {
    const bugs = fireflyContainer.querySelectorAll<HTMLDivElement>('.firefly-bug');
    bugs.forEach(bug => {
      bug.style.left = '';
      bug.style.top = '';
      bug.style.transition = '';
    });
  });
}`,
  css: `/* Firefly Swarm Styles */
.firefly-drift-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.02) 0%, transparent 70%);
}

.firefly-drift-text {
  font-family: 'Outfit', sans-serif;
  font-size: 34px;
  font-weight: 850;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.08);
  text-transform: uppercase;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.08) 35%, #ffd700 50%, rgba(255, 255, 255, 0.08) 65%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: firefly-shine 6s ease infinite alternate;
}

.firefly-swarm {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
}

/* Firefly dots drifting */
.firefly-bug {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #ffd700;
  border-radius: 50%;
  box-shadow: 0 0 10px #ffd700, 0 0 20px #ffaa00;
  animation: firefly-wander var(--speed) infinite ease-in-out alternate;
  animation-delay: var(--delay);
  opacity: 0.8;
}

@keyframes firefly-wander {
  0% {
    left: var(--x);
    top: var(--y);
    transform: scale(0.8) translate(0, 0);
  }
  50% {
    transform: scale(1.2) translate(15px, -20px);
    opacity: 0.9;
  }
  100% {
    left: calc(var(--x) + 10%);
    top: calc(var(--y) - 15%);
    transform: scale(0.6) translate(-10px, 15px);
    opacity: 0.4;
  }
}

@keyframes firefly-shine {
  0% { background-position: 150% center; }
  100% { background-position: -50% center; }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex items-center justify-center p-[30px]">
  <span class="font-extrabold text-[34px] tracking-widest uppercase text-white/10 animate-pulse">
    FIREFLY
  </span>
</div>`,
  prompt: `Design a premium "Firefly Swarm Glow" text animation. Golden, glowing firefly dots drift organically around dim gray typography, casting soft glowing highlights on the text surface as they pass, loop repeating in a magical night forest aesthetic.`
};
