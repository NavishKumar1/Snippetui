/**
 * Component: Molten Liquid Mercury Ripple
 * Category: buttons
 */

export const component = {
  id: 'mercury-ripple-btn',
  name: 'Liquid Mercury Ripple',
  category: 'buttons',
  tag: 'Metallic',
  html: `<div class="mercury-btn-container">
  <button class="mercury-ripple-btn">
    <span class="mercury-ripple-text">SUBMIT</span>
    <span class="mercury-wave-ring ring-1"></span>
    <span class="mercury-wave-ring ring-2"></span>
  </button>
</div>`,
  js: `// Trigger ripples on click
const mercBtn = document.querySelector('.mercury-ripple-btn');
if (mercBtn) {
  mercBtn.addEventListener('click', () => {
    const rings = mercBtn.querySelectorAll('.mercury-wave-ring');
    rings.forEach(ring => {
      ring.style.animation = 'none';
      ring.offsetHeight; // trigger reflow
      ring.style.animation = 'mercury-ripple-wave 1.2s cubic-bezier(0.1, 0.8, 0.3, 1)';
    });
  });
}`,
  ts: `// TypeScript Implementation
const mercBtn = document.querySelector<HTMLButtonElement>('.mercury-ripple-btn');
if (mercBtn) {
  mercBtn.addEventListener('click', () => {
    const rings = mercBtn.querySelectorAll<HTMLSpanElement>('.mercury-wave-ring');
    rings.forEach(ring => {
      ring.style.animation = 'none';
      ring.offsetHeight; // trigger reflow
      ring.style.animation = 'mercury-ripple-wave 1.2s cubic-bezier(0.1, 0.8, 0.3, 1)';
    });
  });
}`,
  css: `/* Liquid Mercury Ripple Styles */
.mercury-btn-container {
  padding: 30px;
  display: inline-flex;
}

.mercury-ripple-btn {
  background: linear-gradient(135deg, #e1e4e8 0%, #a1a8b3 50%, #717883 100%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 16px 36px;
  border-radius: 100px;
  color: #0d0d15;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.12em;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 10px 30px -10px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255,255,255,0.4);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mercury-ripple-text {
  position: relative;
  z-index: 5;
}

/* Concentric mercury ripple rings */
.mercury-wave-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 
    inset 0 0 10px rgba(255,255,255,0.4),
    0 0 10px rgba(255,255,255,0.4);
  pointer-events: none;
  opacity: 0;
  z-index: 2;
}

.mercury-ripple-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 
    0 15px 35px -10px rgba(0, 0, 0, 0.5),
    inset 0 1px 1px rgba(255,255,255,0.6);
}

/* Hover ripple triggers */
.mercury-ripple-btn:hover .ring-1 {
  animation: mercury-ripple-wave 1.8s infinite linear;
}

.mercury-ripple-btn:hover .ring-2 {
  animation: mercury-ripple-wave 1.8s infinite linear;
  animation-delay: 0.9s;
}

@keyframes mercury-ripple-wave {
  0% {
    transform: translate(-50%, -50%) scale(0.2);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(15);
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="p-[30px] inline-flex">
  <button class="bg-gradient-to-br from-[#e1e4e8] via-[#a1a8b3] to-[#717883] border border-white/30 px-9 py-4 rounded-full text-[#0d0d15] font-extrabold text-sm tracking-widest cursor-pointer shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] hover:scale-105 hover:translate-y-[-2px] transition-all duration-300">
    SUBMIT
  </button>
</div>`,
  prompt: `Design a premium "Liquid Mercury Ripple" button component. A glossy, chrome-like liquid metal capsule button triggers concentric silver ripple waves radiating outwards on hover or click, mimicking metallic fluid mercury.`
};
