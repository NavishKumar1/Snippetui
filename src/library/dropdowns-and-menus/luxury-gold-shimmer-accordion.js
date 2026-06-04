/**
 * Component: Luxury Gold Shimmer Accordion
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'luxury-gold-shimmer-accordion',
  name: 'Luxury Gold Shimmer Accordion',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="gold-accordion-wrapper">
  <div class="gold-container">
    <div class="gold-item">
      <!-- Velvet and Gold Trigger -->
      <button class="gold-trigger">
        <span>ROYAL PROTOCOL</span>
        <span class="gold-indicator">⚜️</span>
      </button>
      
      <!-- Scrolling gold foil content panel -->
      <div class="gold-accordion-content">
        <div class="gold-shimmer-bar"></div>
        <div class="gold-inner-text">
          <p class="gold-foil-text">Vault telemetry established inside the Sovereign Core. Elite archives are active with 100% density indexes.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Luxury gold shimmer roll-open accordion toggle
const gdWrapper = document.querySelector('.gold-accordion-wrapper');
if (gdWrapper) {
  const trigger = gdWrapper.querySelector('.gold-trigger');
  const container = gdWrapper.querySelector('.gold-container');
  
  trigger.addEventListener('click', () => {
    container.classList.toggle('unfolded');
  });
}`,
  ts: `// TypeScript Implementation
const gdWrapper = document.querySelector<HTMLDivElement>('.gold-accordion-wrapper');
if (gdWrapper) {
  const trigger = gdWrapper.querySelector<HTMLButtonElement>('.gold-trigger');
  const container = gdWrapper.querySelector<HTMLDivElement>('.gold-container');
  
  if (trigger && container) {
    trigger.addEventListener('click', () => {
      container.classList.toggle('unfolded');
    });
  }
}`,
  css: `/* Luxury Gold Shimmer Accordion Styles */
.gold-accordion-wrapper {
  position: relative;
  width: 290px;
  font-family: 'Outfit', sans-serif;
  box-sizing: border-box;
  padding: 10px;
  user-select: none;
}

.gold-container {
  width: 100%;
}

.gold-item {
  background: radial-gradient(circle at center, #1c150c 0%, #0d0a06 100%);
  border: 1.5px solid #d4af37;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(212, 175, 55, 0.05);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.gold-trigger {
  width: 100%;
  padding: 16px 20px;
  background: transparent;
  border: none;
  color: #d4af37;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
  text-shadow: 0 0 4px rgba(212, 175, 55, 0.3);
  transition: letter-spacing 0.3s;
}

.gold-trigger:hover {
  letter-spacing: 0.12em;
}

.gold-indicator {
  font-size: 12px;
  text-shadow: 0 0 4px #d4af37;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.gold-container.unfolded .gold-indicator {
  transform: rotate(360deg) scale(1.15);
}

/* Gold scroll fold open panel drawer */
.gold-accordion-content {
  max-height: 0px;
  opacity: 0;
  position: relative;
  overflow: hidden;
  background: #090704;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s;
}

/* Sliding metallic gold shimmer light ray */
.gold-shimmer-bar {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ffd700, #ffffff, #ffd700, transparent);
  transition: left 0.5s;
  pointer-events: none;
}

.gold-container.unfolded .gold-shimmer-bar {
  animation: gold-shimmer-sweep 2.5s infinite ease-in-out;
}

.gold-inner-text {
  padding: 16px 20px;
}

.gold-foil-text {
  font-size: 12px;
  color: #f3e5ab;
  text-shadow: 0 0 2px rgba(243, 229, 171, 0.2);
  line-height: 1.6;
  margin: 0;
}

/* Unfolded state modifications */
.gold-container.unfolded .gold-item {
  box-shadow: 0 0 25px rgba(212, 175, 55, 0.3), inset 0 0 15px rgba(212, 175, 55, 0.1);
  border-color: #ffd700;
}

.gold-container.unfolded .gold-accordion-content {
  max-height: 100px;
  opacity: 1;
}

@keyframes gold-shimmer-sweep {
  0% { left: -100%; }
  50% { left: 150%; }
  100% { left: 150%; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[290px] font-sans p-2 select-none">
  <div class="bg-gradient-to-br from-[#1c150c] to-[#0d0a06] border border-amber-500 rounded-lg overflow-hidden shadow-lg">
    <button class="w-full px-5 py-4 text-left text-amber-500 font-bold text-xs tracking-wider flex justify-between items-center shadow-[inset_0_0_10px_rgba(212,175,55,0.05)]">
      <span>ROYAL PROTOCOL</span>
      <span class="text-xs">⚜️</span>
    </button>
  </div>
</div>`,
  prompt: `Design a premium "Luxury Gold Shimmer Accordion" menu. Unfolding rolls open the velvet panel like a gold scroll, carrying a beautiful golden shimmer sweep across gold-embossed option labels.`
};
