/**
 * Component: Acoustic Equalizer Wave Button
 * Category: buttons
 */

export const component = {
  id: 'equalizer-pulse-btn',
  name: 'Acoustic Equalizer Wave',
  category: 'buttons',
  tag: 'Interactive',
  html: `<button class="equalizer-pulse-btn">
  <span class="equalizer-content">
    <span class="equalizer-waves">
      <span class="eq-bar eq-bar-1"></span>
      <span class="eq-bar eq-bar-2"></span>
      <span class="eq-bar eq-bar-3"></span>
      <span class="eq-bar eq-bar-4"></span>
      <span class="eq-bar eq-bar-5"></span>
    </span>
    <span class="equalizer-text">TUNE IN</span>
  </span>
  <span class="equalizer-pulse-ring"></span>
</button>`,
  js: `// Interactive Equalizer Wave Frequency Pulse
const eqBtn = document.querySelector('.equalizer-pulse-btn');
if (eqBtn) {
  const bars = eqBtn.querySelectorAll('.eq-bar');
  const ring = eqBtn.querySelector('.equalizer-pulse-ring');
  
  eqBtn.addEventListener('mouseenter', () => {
    // Accelerate acoustic frequencies on hover
    bars.forEach((bar, index) => {
      bar.style.animationPlayState = 'running';
      bar.style.animationDuration = \`\${0.3 + (index * 0.1)}s\`;
    });
  });

  eqBtn.addEventListener('mouseleave', () => {
    // Decelerate to standard low-energy standby states
    bars.forEach((bar) => {
      bar.style.animationDuration = '1.2s';
    });
  });

  eqBtn.addEventListener('click', () => {
    // Trigger visual concentric shockwave pulse
    if (ring) {
      ring.style.animation = 'none';
      ring.offsetHeight; // trigger reflow
      ring.style.animation = 'equalizer-wave-pulse-ring 0.6s cubic-bezier(0.1, 0.8, 0.3, 1)';
    }
  });
}`,
  ts: `// TypeScript Implementation
const eqBtn = document.querySelector<HTMLButtonElement>('.equalizer-pulse-btn');
if (eqBtn) {
  const bars = eqBtn.querySelectorAll<HTMLSpanElement>('.eq-bar');
  const ring = eqBtn.querySelector<HTMLSpanElement>('.equalizer-pulse-ring');
  
  eqBtn.addEventListener('mouseenter', () => {
    bars.forEach((bar, index) => {
      bar.style.animationPlayState = 'running';
      bar.style.animationDuration = \`\${0.3 + (index * 0.1)}s\`;
    });
  });

  eqBtn.addEventListener('mouseleave', () => {
    bars.forEach((bar) => {
      bar.style.animationDuration = '1.2s';
    });
  });

  eqBtn.addEventListener('click', () => {
    if (ring) {
      ring.style.animation = 'none';
      ring.offsetHeight; // trigger reflow
      ring.style.animation = 'equalizer-wave-pulse-ring 0.6s cubic-bezier(0.1, 0.8, 0.3, 1)';
    }
  });
}`,
  css: `/* Acoustic Equalizer Wave Button Styles */
.equalizer-pulse-btn {
  position: relative;
  background: #080a10;
  border: 1px solid rgba(0, 242, 254, 0.2);
  padding: 16px 36px;
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.4),
    inset 0 0 10px rgba(0, 242, 254, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.equalizer-content {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Audio waves layout */
.equalizer-waves {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 16px;
  width: 23px;
}

.eq-bar {
  display: block;
  width: 2px;
  height: 100%;
  background: linear-gradient(to top, #00f2fe 0%, #4facfe 100%);
  border-radius: 20px;
  transform-origin: bottom;
  animation: eq-bounce 1.2s infinite ease-in-out alternate;
  animation-play-state: paused; /* Standby energy conservation */
}

/* Random speed offset keys */
.eq-bar-1 { animation-delay: 0.1s; height: 40%; }
.eq-bar-2 { animation-delay: 0.3s; height: 80%; }
.eq-bar-3 { animation-delay: 0.5s; height: 50%; }
.eq-bar-4 { animation-delay: 0.2s; height: 90%; }
.eq-bar-5 { animation-delay: 0.4s; height: 60%; }

.equalizer-text {
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.3);
  transition: all 0.3s ease;
}

/* Radial pulse shockwave */
.equalizer-pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 2px solid #00f2fe;
  border-radius: 50px;
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

/* Hover & Active triggers */
.equalizer-pulse-btn:hover {
  border-color: #00f2fe;
  box-shadow: 
    0 8px 25px rgba(0, 242, 254, 0.2),
    0 0 15px rgba(0, 242, 254, 0.1);
  background: #0c101a;
  transform: translateY(-2px);
}

.equalizer-pulse-btn:hover .equalizer-text {
  color: #ffffff;
  text-shadow: 0 0 10px #00f2fe;
}

.equalizer-pulse-btn:hover .eq-bar {
  animation-play-state: running;
}

.equalizer-pulse-btn:active {
  transform: translateY(1px);
}

@keyframes eq-bounce {
  0% { transform: scaleY(0.25); }
  100% { transform: scaleY(1); }
}

@keyframes equalizer-wave-pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(0.95);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.4);
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#080a10] border border-[#00f2fe]/20 px-9 py-4 rounded-full cursor-pointer hover:border-[#00f2fe] hover:shadow-[0_8px_25px_rgba(0,242,254,0.2)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 flex items-center gap-3">
    <span class="flex items-end gap-0.5 h-4 w-[23px]">
      <span class="block w-[2px] h-2 bg-gradient-to-t from-[#00f2fe] to-[#4facfe] rounded-full"></span>
      <span class="block w-[2px] h-3 bg-gradient-to-t from-[#00f2fe] to-[#4facfe] rounded-full"></span>
      <span class="block w-[2px] h-1.5 bg-gradient-to-t from-[#00f2fe] to-[#4facfe] rounded-full"></span>
      <span class="block w-[2px] h-3.5 bg-gradient-to-t from-[#00f2fe] to-[#4facfe] rounded-full"></span>
      <span class="block w-[#2px] h-2 bg-gradient-to-t from-[#00f2fe] to-[#4facfe] rounded-full"></span>
    </span>
    <span class="text-[#00f2fe] font-bold text-xs tracking-[0.15em] [text-shadow:0_0_8px_rgba(0,242,254,0.3)]">TUNE IN</span>
  </span>
</button>`,
  prompt: `Design a premium "Acoustic Equalizer Wave Button" component. Nestled inside a capsule dark-indigo structure, 5 vertical equalizer sound wave lines scale dynamically. Hovering accelerates the acoustic frequencies, while clicking releases a concentric ring ripple shockwave radiating from the button boundary.`
};
