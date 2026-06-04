/**
 * Component: Aurora Holographic Wave
 * Category: text-animation
 */

export const component = {
  id: 'aurora-holographic-text',
  name: 'Aurora Holographic Wave',
  category: 'text-animation',
  tag: 'Premium',
  html: `<div class="aurora-holographic-text" data-text="AURORA WAVE">AURORA WAVE</div>`,
  js: `// Dynamic interactive tilt to aurora gradient angle
const auroraText = document.querySelector('.aurora-holographic-text');
if (auroraText) {
  document.addEventListener('mousemove', (e) => {
    const percentageX = (e.clientX / window.innerWidth) * 100;
    const percentageY = (e.clientY / window.innerHeight) * 100;
    auroraText.style.setProperty('--aurora-angle', \`\${percentageX + percentageY}deg\`);
  });
}`,
  ts: `// TypeScript Implementation
const auroraText = document.querySelector<HTMLDivElement>('.aurora-holographic-text');
if (auroraText) {
  document.addEventListener('mousemove', (e: MouseEvent) => {
    const percentageX = (e.clientX / window.innerWidth) * 100;
    const percentageY = (e.clientY / window.innerHeight) * 100;
    auroraText.style.setProperty('--aurora-angle', \`\${percentageX + percentageY}deg\`);
  });
}`,
  css: `/* Aurora Holographic Wave Styles */
.aurora-holographic-text {
  --aurora-angle: 120deg;
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: linear-gradient(
    var(--aurora-angle),
    #ff007f 0%,
    #7f00ff 25%,
    #00f2fe 50%,
    #4facfe 75%,
    #ff007f 100%
  );
  background-size: 300% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: aurora-shift 6s ease infinite alternate;
  filter: drop-shadow(0px 2px 20px rgba(0, 242, 254, 0.15));
  transition: --aurora-angle 0.3s ease;
}

@keyframes aurora-shift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 300% 50%;
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="font-extrabold text-[32px] tracking-widest uppercase bg-gradient-to-r from-[#ff007f] via-[#00f2fe] to-[#7f00ff] bg-[length:300%_auto] bg-clip-text text-transparent animate-pulse filter drop-shadow-[0_2px_20px_rgba(0,242,254,0.15)]">
  AURORA WAVE
</div>`,
  prompt: `Create an ultra-premium, modern "Aurora Holographic Wave" text effect that shines with dynamic, shifting northern lights colors in HSL-curated pink, teal, and royal blue. The background-gradient shimmers actively over the text surface, evoking holographic high-end tech typography.`
};
