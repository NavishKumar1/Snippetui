/**
 * Component: Ethereal Ghost Light Trails
 * Category: text-animation
 */

export const component = {
  id: 'ghost-light-text',
  name: 'Ethereal Ghost Light',
  category: 'text-animation',
  tag: 'Particles',
  html: `<div class="ghost-light-container" style="cursor: pointer;">
  <span class="ghost-light-text">GHOST LIGHT</span>
  <div class="ghost-particles-field">
    <div class="ghost-dot" style="--l: 12%; --speed: 3s; --delay: 0s; --dx: 30px;"></div>
    <div class="ghost-dot" style="--l: 45%; --speed: 2.5s; --delay: -0.8s; --dx: -20px;"></div>
    <div class="ghost-dot" style="--l: 80%; --speed: 3.2s; --delay: -1.5s; --dx: 25px;"></div>
  </div>
</div>`,
  js: `// Speed up particles on click
const ghostContainer = document.querySelector('.ghost-light-container');
if (ghostContainer) {
  ghostContainer.addEventListener('mousedown', () => {
    ghostContainer.querySelectorAll('.ghost-dot').forEach(dot => {
      dot.style.animationDuration = '0.8s';
    });
  });
  ghostContainer.addEventListener('mouseup', () => {
    ghostContainer.querySelectorAll('.ghost-dot').forEach(dot => {
      dot.style.animationDuration = '';
    });
  });
}`,
  ts: `// TypeScript Implementation
const ghostContainer = document.querySelector<HTMLDivElement>('.ghost-light-container');
if (ghostContainer) {
  ghostContainer.addEventListener('mousedown', () => {
    ghostContainer.querySelectorAll<HTMLDivElement>('.ghost-dot').forEach(dot => {
      dot.style.animationDuration = '0.8s';
    });
  });
  ghostContainer.addEventListener('mouseup', () => {
    ghostContainer.querySelectorAll<HTMLDivElement>('.ghost-dot').forEach(dot => {
      dot.style.animationDuration = '';
    });
  });
}`,
  css: `/* Ethereal Ghost Light Styles */
.ghost-light-container {
  position: relative;
  display: inline-flex;
  padding: 24px;
}

.ghost-light-text {
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  
  /* Reflective periwinkle specular neon gradient */
  background: linear-gradient(135deg, #ffffff 30%, #8ec5fc 70%, #e0c3fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 10px rgba(142, 197, 252, 0.35));
}

.ghost-particles-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 10;
}

/* Floating ambient ghost particles leaving trails */
.ghost-dot {
  position: absolute;
  bottom: 0px;
  left: var(--l);
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #ffffff 10%, #e0c3fc 60%, transparent 100%);
  border-radius: 50%;
  box-shadow: 0 0 10px #e0c3fc, 0 0 20px #8ec5fc;
  opacity: 0;
  
  /* Continuous floating drift loops */
  animation: ghost-float-up var(--speed) infinite linear;
  animation-delay: var(--delay);
}

@keyframes ghost-float-up {
  0% {
    transform: translateY(10px) translateX(0) scale(0.6);
    opacity: 0;
  }
  30%, 70% {
    opacity: 0.85;
  }
  100% {
    transform: translateY(-60px) translateX(var(--dx)) scale(1.2);
    opacity: 0;
    filter: blur(1px);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative inline-flex p-6 cursor-pointer">
  <span class="font-extrabold text-[32px] tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-br from-white via-[#8ec5fc] to-[#e0c3fc] filter drop-shadow-[0_2px_10px_rgba(142,197,252,0.35)]">
    GHOST LIGHT
  </span>
</div>`,
  prompt: `Design a premium "Ethereal Ghost Light" typography effect. Pristine periwinkle text is surrounded by floating, glowing ambient ghost lights that rise upwards, leaving soft light trails in infinite loops.`
};
