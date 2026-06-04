/**
 * Component: Nebula Spiral Vector Input
 * Category: inputs
 */

export const component = {
  id: 'nebula-spiral-input',
  name: 'Nebula Spiral Input',
  category: 'inputs',
  tag: 'Stunning',
  html: `<div class="nebula-input-wrapper">
  <div class="nebula-spiral-glow"></div>
  <div class="nebula-spiral-border">
    <span class="spiral-dot"></span>
  </div>
  <div class="nebula-stardust-canvas"></div>
  <input type="text" class="nebula-spiral-field" placeholder="Enter coordinates..." />
  <label class="nebula-spiral-label">System Coordinates</label>
</div>`,
  js: `// Interactive dynamic stellar particle flashes and spiral speedup
const wrapper = document.querySelector('.nebula-input-wrapper');
if (wrapper) {
  const input = wrapper.querySelector('.nebula-spiral-field');
  const spiralDot = wrapper.querySelector('.spiral-dot');
  const canvas = wrapper.querySelector('.nebula-stardust-canvas');

  input.addEventListener('focus', () => {
    wrapper.classList.add('focused');
    if (spiralDot) {
      spiralDot.style.animationDuration = '1s';
    }
  });

  input.addEventListener('blur', () => {
    if (!input.value) {
      wrapper.classList.remove('focused');
    }
    if (spiralDot) {
      spiralDot.style.animationDuration = '3s';
    }
  });

  input.addEventListener('input', () => {
    // Spawn active stardust spark upon typing
    if (canvas) {
      const spark = document.createElement('span');
      spark.className = 'stardust-spark';
      
      const size = 2 + Math.random() * 4;
      const left = 20 + Math.random() * (input.offsetWidth - 40);
      const top = 10 + Math.random() * (input.offsetHeight - 20);
      
      spark.style.width = \`\${size}px\`;
      spark.style.height = \`\${size}px\`;
      spark.style.left = \`\${left}px\`;
      spark.style.top = \`\${top}px\`;
      spark.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 40}px\`);
      spark.style.setProperty('--dy', \`\${-30 - Math.random() * 30}px\`);
      
      canvas.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    }
  });
}`,
  ts: `// TypeScript Implementation
const wrapper = document.querySelector<HTMLDivElement>('.nebula-input-wrapper');
if (wrapper) {
  const input = wrapper.querySelector<HTMLInputElement>('.nebula-spiral-field');
  const spiralDot = wrapper.querySelector<HTMLSpanElement>('.spiral-dot');
  const canvas = wrapper.querySelector<HTMLDivElement>('.nebula-stardust-canvas');

  if (input) {
    input.addEventListener('focus', () => {
      wrapper.classList.add('focused');
      if (spiralDot) spiralDot.style.animationDuration = '1s';
    });

    input.addEventListener('blur', () => {
      if (!input.value) wrapper.classList.remove('focused');
      if (spiralDot) spiralDot.style.animationDuration = '3s';
    });

    input.addEventListener('input', () => {
      if (canvas) {
        const spark = document.createElement('span');
        spark.className = 'stardust-spark';
        const size = 2 + Math.random() * 4;
        const left = 20 + Math.random() * (input.offsetWidth - 40);
        const top = 10 + Math.random() * (input.offsetHeight - 20);
        
        spark.style.width = \`\${size}px\`;
        spark.style.height = \`\${size}px\`;
        spark.style.left = \`\${left}px\`;
        spark.style.top = \`\${top}px\`;
        spark.style.setProperty('--dx', \`\${(Math.random() - 0.5) * 40}px\`);
        spark.style.setProperty('--dy', \`\${-30 - Math.random() * 30}px\`);
        
        canvas.appendChild(spark);
        setTimeout(() => spark.remove(), 1000);
      }
    });
  }
}`,
  css: `/* Nebula Spiral Input Styles */
.nebula-input-wrapper {
  position: relative;
  width: 280px;
  height: 56px;
  background: rgba(13, 13, 21, 0.7);
  border-radius: 12px;
  overflow: visible;
  box-sizing: border-box;
}

.nebula-spiral-field {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 20px 16px 6px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  position: relative;
  z-index: 5;
}

.nebula-spiral-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 500;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 4;
}

/* Focused input state shifts label */
.nebula-input-wrapper.focused .nebula-spiral-label,
.nebula-spiral-field:not(:placeholder-shown) ~ .nebula-spiral-label {
  top: 12px;
  font-size: 11px;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.3);
}

/* Ambient Purple Glow inside backing field */
.nebula-spiral-glow {
  position: absolute;
  inset: -1px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.25) 0%, rgba(0, 242, 254, 0.25) 100%);
  opacity: 0.3;
  z-index: 1;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.nebula-input-wrapper.focused .nebula-spiral-glow {
  opacity: 0.8;
  filter: blur(4px);
}

/* Continuous Spiral Laser Border Animation */
.nebula-spiral-border {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  z-index: 3;
  pointer-events: none;
  overflow: hidden;
}

.nebula-input-wrapper.focused .nebula-spiral-border {
  border-color: rgba(0, 242, 254, 0.15);
}

.spiral-dot {
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, #00f2fe 0%, transparent 70%);
  border-radius: 50%;
  animation: spiral-travel 3s infinite linear;
  opacity: 0;
  transition: opacity 0.3s;
}

.nebula-input-wrapper.focused .spiral-dot {
  opacity: 1;
}

@keyframes spiral-travel {
  0% { left: -30px; top: -30px; }
  25% { left: calc(100% - 30px); top: -30px; }
  50% { left: calc(100% - 30px); top: calc(100% - 30px); }
  75% { left: -30px; top: calc(100% - 30px); }
  100% { left: -30px; top: -30px; }
}

/* Cosmic spark elements */
.nebula-stardust-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
}

.stardust-spark {
  position: absolute;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 8px #00f2fe, 0 0 15px #8a2be2;
  animation: spark-drift-fade 1s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
}

@keyframes spark-drift-fade {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--dx), var(--dy)) scale(0);
    opacity: 0;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[280px] h-[56px] bg-[#0d0315]/70 rounded-xl border border-white/5 shadow-inner">
  <input type="text" class="w-full h-full bg-transparent border-none outline-none px-4 pt-5 pb-1 text-white text-sm" placeholder=" " />
  <label class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm transition-all duration-300 pointer-events-none">System Coordinates</label>
</div>`,
  prompt: `Design a premium "Nebula Spiral Vector Input". A translucent glass capsule in a deep cosmic violet space. On focus, a glowing cyan/magenta laser spiral dot loops quickly around the border like a cosmic orbit path, and user typing triggers glowing stardust particles to float upward inside the input body.`
};
