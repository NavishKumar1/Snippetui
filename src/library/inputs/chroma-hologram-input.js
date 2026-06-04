/**
 * Component: Chroma Hologram Input
 * Category: inputs
 */

export const component = {
  id: 'chroma-hologram-input',
  name: 'Chroma Hologram',
  category: 'inputs',
  tag: 'Premium',
  html: `<div class="chroma-input-wrapper">
  <div class="hologram-grid-bg"></div>
  <div class="hologram-border-aberration"></div>
  <input type="text" class="chroma-hologram-field" placeholder="System decrypted..." />
  <label class="chroma-hologram-label">Decryption Key</label>
</div>`,
  js: `// Dynamic cursor parallax for holographic refracted borders
const wrapper = document.querySelector('.chroma-input-wrapper');
if (wrapper) {
  const input = wrapper.querySelector('.chroma-hologram-field');
  const border = wrapper.querySelector('.hologram-border-aberration');

  input.addEventListener('focus', () => {
    wrapper.classList.add('focused');
  });

  input.addEventListener('blur', () => {
    if (!input.value) {
      wrapper.classList.remove('focused');
    }
  });

  // Calculate mouse tilt inside the container to adjust glass refraction
  wrapper.addEventListener('mousemove', (e) => {
    if (!wrapper.classList.contains('focused')) return;
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    if (border) {
      border.style.setProperty('--rx', \`\${x * 12}px\`);
      border.style.setProperty('--ry', \`\${y * 12}px\`);
    }
  });

  wrapper.addEventListener('mouseleave', () => {
    if (border) {
      border.style.setProperty('--rx', '0px');
      border.style.setProperty('--ry', '0px');
    }
  });
}`,
  ts: `// TypeScript Implementation
const wrapper = document.querySelector<HTMLDivElement>('.chroma-input-wrapper');
if (wrapper) {
  const input = wrapper.querySelector<HTMLInputElement>('.chroma-hologram-field');
  const border = wrapper.querySelector<HTMLDivElement>('.hologram-border-aberration');

  if (input) {
    input.addEventListener('focus', () => {
      wrapper.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      if (!input.value) wrapper.classList.remove('focused');
    });

    wrapper.addEventListener('mousemove', (e: MouseEvent) => {
      if (!wrapper.classList.contains('focused')) return;
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (border) {
        border.style.setProperty('--rx', \`\${x * 12}px\`);
        border.style.setProperty('--ry', \`\${y * 12}px\`);
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      if (border) {
        border.style.setProperty('--rx', '0px');
        border.style.setProperty('--ry', '0px');
      }
    });
  }
}`,
  css: `/* Chroma Hologram Input Styles */
.chroma-input-wrapper {
  position: relative;
  width: 280px;
  height: 56px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: visible;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.chroma-input-wrapper.focused {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 0, 127, 0.2);
  box-shadow: 0 10px 30px -10px rgba(255, 0, 127, 0.15);
}

.chroma-hologram-field {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 20px 16px 6px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  position: relative;
  z-index: 5;
}

.chroma-hologram-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-family: 'Outfit', sans-serif;
  font-size: 13.5px;
  font-weight: 500;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 4;
}

.chroma-input-wrapper.focused .chroma-hologram-label,
.chroma-hologram-field:not(:placeholder-shown) ~ .chroma-hologram-label {
  top: 12px;
  font-size: 10px;
  color: #ff007f;
  text-shadow: 0 0 8px rgba(255, 0, 127, 0.4);
  letter-spacing: 0.05em;
}

/* Background Cyber grid mesh overlay */
.hologram-grid-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
  background-size: 10px 10px;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.chroma-input-wrapper.focused .hologram-grid-bg {
  opacity: 0.4;
}

/* Crystalline Aberrated Border Shadow */
.hologram-border-aberration {
  position: absolute;
  inset: -1px;
  border-radius: 4px;
  pointer-events: none;
  z-index: 2;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.chroma-input-wrapper.focused .hologram-border-aberration {
  box-shadow: 
    calc(-1px + var(--rx, 0px)) calc(-1px + var(--ry, 0px)) 0 #00ffff,
    calc(1px + var(--rx, 0px)) calc(1px + var(--ry, 0px)) 0 #ff007f;
  opacity: 0.8;
}

/* Dynamic glow flares */
.chroma-input-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(0, 255, 255, 0.08) 0%, transparent 80%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
  z-index: 0;
}

.chroma-input-wrapper.focused::after {
  opacity: 1;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[280px] h-[56px] bg-white/5 rounded border border-white/10 shadow-inner">
  <input type="text" class="w-full h-full bg-transparent border-none outline-none px-4 pt-5 pb-1 text-white text-sm" placeholder=" " />
  <label class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm transition-all duration-300 pointer-events-none">Decryption Key</label>
</div>`,
  prompt: `Design a premium "Chroma Hologram Input". Set on borderless crystalline floating glass, when selected it displays a gorgeous 3D chromatic aberration glitch grid border, projecting refracted pink and cyan light rays that skew in parallax corresponding to mouse coordinates.`
};
