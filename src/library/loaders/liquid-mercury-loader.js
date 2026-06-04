/**
 * Component: Liquid Mercury Morphing Loader
 * Category: loaders
 */

export const component = {
  id: 'liquid-mercury-loader',
  name: 'Liquid Mercury Morphing Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="mercury-loader-wrapper">
  <svg class="mercury-goo-svg" style="position: absolute; width: 0; height: 0;">
    <defs>
      <filter id="mercury-gooey-filter">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
  
  <div class="mercury-gooey-container">
    <div class="mercury-blob central-blob"></div>
    <div class="mercury-blob satellite-blob blob-1"></div>
    <div class="mercury-blob satellite-blob blob-2"></div>
    <div class="mercury-blob satellite-blob blob-3"></div>
  </div>
</div>`,
  js: `// Mercury droplet speed accelerator on click
const centralBlob = document.querySelector('.central-blob');
if (centralBlob) {
  centralBlob.addEventListener('click', () => {
    const satellites = centralBlob.parentElement.querySelectorAll('.satellite-blob');
    satellites.forEach(sat => {
      sat.style.animationDuration = '1s';
      setTimeout(() => sat.style.animationDuration = '', 2000);
    });
  });
}`,
  ts: `// TypeScript Implementation
const centralBlob = document.querySelector<HTMLDivElement>('.central-blob');
if (centralBlob) {
  centralBlob.addEventListener('click', () => {
    const parent = centralBlob.parentElement;
    if (parent) {
      const satellites = parent.querySelectorAll<HTMLDivElement>('.satellite-blob');
      satellites.forEach(sat => {
        sat.style.animationDuration = '1s';
        setTimeout(() => sat.style.animationDuration = '', 2000);
      });
    }
  });
}`,
  css: `/* Liquid Mercury Morphing Loader Styles */
.mercury-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mercury-gooey-container {
  position: relative;
  width: 100px;
  height: 100px;
  filter: url('#mercury-gooey-filter');
  display: flex;
  align-items: center;
  justify-content: center;
}

.mercury-blob {
  position: absolute;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 45%, #94a3b8 70%, #475569 100%);
  border-radius: 50%;
  box-shadow: 
    inset 0 2px 4px rgba(255,255,255,0.8),
    0 4px 10px rgba(0,0,0,0.3);
}

.central-blob {
  width: 32px;
  height: 32px;
  z-index: 2;
  cursor: pointer;
}

.satellite-blob {
  width: 22px;
  height: 22px;
}

.blob-1 {
  animation: mercury-orbit-1 3.2s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
}

.blob-2 {
  animation: mercury-orbit-2 3.2s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  animation-delay: -1.06s;
}

.blob-3 {
  animation: mercury-orbit-3 3.2s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  animation-delay: -2.13s;
}

@keyframes mercury-orbit-1 {
  0% { transform: rotate(0deg) translate(28px) scale(1); }
  50% { transform: rotate(180deg) translate(34px) scale(0.85); }
  100% { transform: rotate(360deg) translate(28px) scale(1); }
}

@keyframes mercury-orbit-2 {
  0% { transform: rotate(120deg) translate(28px) scale(1); }
  50% { transform: rotate(300deg) translate(34px) scale(0.85); }
  100% { transform: rotate(480deg) translate(28px) scale(1); }
}

@keyframes mercury-orbit-3 {
  0% { transform: rotate(240deg) translate(28px) scale(1); }
  50% { transform: rotate(420deg) translate(34px) scale(0.85); }
  100% { transform: rotate(600deg) translate(28px) scale(1); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="relative w-[100px] h-[100px] flex items-center justify-center" style="filter: url('#mercury-gooey-filter')">
    <div class="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-white via-slate-300 to-slate-600 shadow-[inset_0_2px_4px_white,0_4px_10px_black] cursor-pointer"></div>
  </div>
</div>`,
  prompt: `Liquid mercury metal droplet loader. SVG gooey fusion matrix allows central drop to merge, split, spin, and absorb satellite silver blobs recursively.`
};
