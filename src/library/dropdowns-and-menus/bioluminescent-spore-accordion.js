/**
 * Component: Bioluminescent Spore Accordion
 * Category: dropdowns-and-menus
 */

export const component = {
  id: 'bioluminescent-spore-accordion',
  name: 'Bioluminescent Spore Accordion',
  category: 'dropdowns-and-menus',
  tag: 'Stunning',
  html: `<div class="bs-accordion-wrapper">
  <div class="bs-container">
    <div class="bs-item">
      <!-- Organic Trigger -->
      <button class="bs-trigger">
        <span>SPORE telemetry</span>
        <div class="bs-trigger-glow">
          <span class="bs-dot"></span>
        </div>
      </button>
      
      <!-- Unfolding biological option panel -->
      <div class="bs-accordion-content">
        <div class="bs-inner-text">
          <div class="bs-cluster-nodes">
            <span class="cluster-node cn-1"></span>
            <span class="cluster-node cn-2"></span>
            <span class="cluster-node cn-3"></span>
          </div>
          <p class="bs-organic-text">> fungal grid converged. telepathic channels stable inside the forest deck.</p>
          <p class="bs-organic-text">> spore concentration level: optimal.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Fungal spore breathing accordion toggle
const bsWrapper = document.querySelector('.bs-accordion-wrapper');
if (bsWrapper) {
  const trigger = bsWrapper.querySelector('.bs-trigger');
  const container = bsWrapper.querySelector('.bs-container');
  
  trigger.addEventListener('click', () => {
    container.classList.toggle('unfolded');
  });
}`,
  ts: `// TypeScript Implementation
const bsWrapper = document.querySelector<HTMLDivElement>('.bs-accordion-wrapper');
if (bsWrapper) {
  const trigger = bsWrapper.querySelector<HTMLButtonElement>('.bs-trigger');
  const container = bsWrapper.querySelector<HTMLDivElement>('.bs-container');
  
  if (trigger && container) {
    trigger.addEventListener('click', () => {
      container.classList.toggle('unfolded');
    });
  }
}`,
  css: `/* Bioluminescent Spore Accordion Styles */
.bs-accordion-wrapper {
  position: relative;
  width: 290px;
  font-family: 'Outfit', sans-serif;
  box-sizing: border-box;
  padding: 10px;
  user-select: none;
}

.bs-container {
  width: 100%;
}

.bs-item {
  background: rgba(4, 18, 14, 0.85);
  border: 1.5px solid rgba(16, 185, 129, 0.25);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(16, 185, 129, 0.05);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.bs-trigger {
  width: 100%;
  padding: 16px 20px;
  background: transparent;
  border: none;
  color: #a3e635;
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
  text-shadow: 0 0 4px rgba(163, 230, 53, 0.4);
}

.bs-trigger-glow {
  display: flex;
  align-items: center;
}

.bs-dot {
  width: 8px;
  height: 8px;
  background: #a3e635;
  border-radius: 50%;
  box-shadow: 0 0 8px #a3e635;
  animation: bs-spore-breath 1.8s infinite alternate ease-in-out;
}

/* Unfolding biological panel */
.bs-accordion-content {
  max-height: 0px;
  opacity: 0;
  position: relative;
  overflow: hidden;
  background: #020b08;
  border-top: 1px solid rgba(16, 185, 129, 0.1);
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s;
}

.bs-inner-text {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Fungal spore clusters glowing on active unfold */
.bs-cluster-nodes {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 6px;
}

.cluster-node {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
  opacity: 0;
  transform: scale(0);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.bs-container.unfolded .cluster-node {
  opacity: 1;
  transform: scale(1);
}

.cn-1 { animation: bs-spore-breath 1.2s infinite alternate 0.1s; }
.cn-2 { animation: bs-spore-breath 1.6s infinite alternate 0.3s; }
.cn-3 { animation: bs-spore-breath 1.4s infinite alternate 0.5s; }

.bs-organic-text {
  font-size: 11.5px;
  color: rgba(16, 185, 129, 0.85);
  text-shadow: 0 0 2px rgba(16, 185, 129, 0.2);
  margin: 6px 0;
  line-height: 1.5;
  font-family: 'Courier New', Courier, monospace;
  width: calc(100% - 40px);
}

/* Unfolded state updates */
.bs-container.unfolded .bs-item {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 15px rgba(16, 185, 129, 0.1);
  border-color: #a3e635;
}

.bs-container.unfolded .bs-trigger {
  color: #a3e635;
}

.bs-container.unfolded .bs-accordion-content {
  max-height: 100px;
  opacity: 1;
}

@keyframes bs-spore-breath {
  0% { transform: scale(0.85); opacity: 0.5; box-shadow: 0 0 4px currentColor; }
  100% { transform: scale(1.15); opacity: 1; box-shadow: 0 0 12px currentColor; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[290px] font-sans p-2 select-none">
  <div class="bg-[#04120e] border border-emerald-500/30 rounded-xl overflow-hidden shadow-lg">
    <button class="w-full px-5 py-4 text-left text-lime-400 font-bold text-xs tracking-wider flex justify-between items-center shadow-[inset_0_0_10px_rgba(16,185,129,0.05)]">
      <span>SPORE TELEMETRY</span>
      <span class="text-lime-400">●</span>
    </button>
  </div>
</div>`,
  prompt: `Design a premium "Bioluminescent Spore Accordion" menu. Unfolding deep-sea bio-organic moss panels triggers biological nodes to grow and pulse dynamically in neon-teal spore breathing cycles.`
};
