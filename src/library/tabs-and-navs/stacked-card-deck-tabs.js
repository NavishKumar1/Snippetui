/**
 * Component: Stacked Card Deck Tabs
 * Category: tabs-and-navs
 */

export const component = {
  id: 'stacked-card-deck-tabs',
  name: 'Stacked Card Deck Tabs',
  category: 'tabs-and-navs',
  tag: 'Stunning',
  html: `<div class="deck-tabs-sandbox" id="deck-tabs-container">
  <div class="deck-wrapper">
    <div class="deck-card active" data-index="0" style="--c: #00f2fe; --z: 3; --t: 0px; --s: 1;">
      <div class="card-tab-label">CONSOLE</div>
      <div class="card-inner">
        <h4>System Console</h4>
        <p>Telemetry nodes initialized. Connection verified.</p>
      </div>
    </div>
    
    <div class="deck-card" data-index="1" style="--c: #9b5de5; --z: 2; --t: 20px; --s: 0.93;">
      <div class="card-tab-label">NETWORK</div>
      <div class="card-inner">
        <h4>Grid Networks</h4>
        <p>Port routing active. Data channels mapped.</p>
      </div>
    </div>
    
    <div class="deck-card" data-index="2" style="--c: #f15bb5; --z: 1; --t: 40px; --s: 0.86;">
      <div class="card-tab-label">LOGS</div>
      <div class="card-inner">
        <h4>Output Logs</h4>
        <p>HMR operational. Zero compiler faults detected.</p>
      </div>
    </div>
  </div>
</div>`,
  js: `// Stacked Card Deck switching logic
const container = document.getElementById('deck-tabs-container');
if (container) {
  const cards = container.querySelectorAll('.deck-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('active')) return;

      const selectedIdx = parseInt(card.getAttribute('data-index'));

      cards.forEach(c => {
        const idx = parseInt(c.getAttribute('data-index'));
        c.classList.remove('active');

        // Circular offset calculation for stack rotation
        let offset = idx - selectedIdx;
        if (offset < 0) offset += cards.length;

        // Active card gets top layer (3), rest slide behind (2, 1)
        const zIndex = cards.length - offset;
        const translateY = offset * 20;
        const scale = 1 - offset * 0.07;

        c.style.setProperty('--z', zIndex);
        c.style.setProperty('--t', \`\${translateY}px\`);
        c.style.setProperty('--s', scale);
      });

      card.classList.add('active');
    });
  });
}`,
  ts: `// TypeScript implementation
const container = document.getElementById('deck-tabs-container') as HTMLDivElement | null;
if (container) {
  const cards = container.querySelectorAll('.deck-card');

  cards.forEach(card => {
    const cardEl = card as HTMLDivElement;
    cardEl.addEventListener('click', () => {
      if (cardEl.classList.contains('active')) return;

      const selectedIdx = parseInt(cardEl.getAttribute('data-index') || '0');

      cards.forEach(c => {
        const cEl = c as HTMLDivElement;
        const idx = parseInt(cEl.getAttribute('data-index') || '0');
        cEl.classList.remove('active');

        let offset = idx - selectedIdx;
        if (offset < 0) offset += cards.length;

        const zIndex = cards.length - offset;
        const translateY = offset * 20;
        const scale = 1 - offset * 0.07;

        cEl.style.setProperty('--z', zIndex.toString());
        cEl.style.setProperty('--t', \`\${translateY}px\`);
        cEl.style.setProperty('--s', scale.toString());
      });

      cardEl.classList.add('active');
    });
  });
}`,
  css: `/* Stacked Card Deck Tabs styles */
.deck-tabs-sandbox {
  position: relative;
  width: 100%;
  max-width: 440px;
  height: 250px;
  background: radial-gradient(circle at center, #100615 0%, #040106 100%);
  border: 1px solid rgba(155, 93, 229, 0.15);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
}

.deck-wrapper {
  position: relative;
  width: 250px;
  height: 140px;
  perspective: 1000px;
}

.deck-card {
  position: absolute;
  inset: 0;
  background: #11091a;
  border: 1.5px solid var(--c);
  border-radius: 12px;
  padding: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: var(--z);
  transform: translateY(var(--t)) scale(var(--s)) rotateX(25deg);
  transform-origin: bottom center;
  transition: all 0.65s cubic-bezier(0.19, 1, 0.22, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.deck-card.active {
  background: radial-gradient(circle at top left, #160c24 0%, #0d0615 100%);
  transform: translateY(var(--t)) scale(var(--s)) rotateX(0deg) translateZ(10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6), 0 0 15px rgba(155, 93, 229, 0.2);
}

.card-tab-label {
  position: absolute;
  top: -12px;
  right: 16px;
  background: var(--c);
  color: #040106;
  font-family: 'Outfit', sans-serif;
  font-size: 8.5px;
  font-weight: 800;
  padding: 3px 8px;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.card-inner h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 6px 0;
}

.card-inner p {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
  margin: 0;
}
`,
  tailwind: `<div class="relative w-full max-w-[440px] h-[250px] bg-gradient-to-b from-[#100615] to-[#040106] border border-purple-500/10 rounded-3xl flex items-center justify-center overflow-hidden" id="deck-tabs-container">
  <div class="deck-wrapper relative w-[250px] h-[140px] [perspective:1000px]">
    <div class="deck-card active absolute inset-0 bg-[#11091a] border-1.5 rounded-xl p-3.5 shadow-2xl origin-bottom transition-all duration-[650ms] ease-[cubic-bezier(0.19,1,0.22,1)] cursor-pointer flex flex-col [&.active]:bg-gradient-to-br [&.active]:from-[#160c24] [&.active]:to-[#0d0615] [&.active]:rotate-x-0 [&.active]:translate-z-2 active-deck-card" data-index="0" style="--c: #00f2fe; --z: 3; --t: 0px; --s: 1; border-color: #00f2fe; z-index: var(--z); transform: translateY(var(--t)) scale(var(--s)) rotateX(25deg);">
      <div class="absolute -top-3 right-4 bg-cyan-400 text-slate-950 font-sans text-[8.5px] font-extrabold px-2 py-0.5 rounded shadow-md">CONSOLE</div>
      <div class="card-inner">
        <h4 class="font-sans text-xs font-bold text-white mb-1.5">System Console</h4>
        <p class="font-sans text-[10px] text-white/60 leading-normal">Telemetry nodes initialized. Connection verified.</p>
      </div>
    </div>
    
    <div class="deck-card absolute inset-0 bg-[#11091a] border-1.5 rounded-xl p-3.5 shadow-2xl origin-bottom transition-all duration-[650ms] ease-[cubic-bezier(0.19,1,0.22,1)] cursor-pointer flex flex-col [&.active]:bg-gradient-to-br [&.active]:from-[#160c24] [&.active]:to-[#0d0615] [&.active]:rotate-x-0 [&.active]:translate-z-2" data-index="1" style="--c: #9b5de5; --z: 2; --t: 20px; --s: 0.93; border-color: #9b5de5; z-index: var(--z); transform: translateY(var(--t)) scale(var(--s)) rotateX(25deg);">
      <div class="absolute -top-3 right-4 bg-purple-500 text-slate-950 font-sans text-[8.5px] font-extrabold px-2 py-0.5 rounded shadow-md">NETWORK</div>
      <div class="card-inner">
        <h4 class="font-sans text-xs font-bold text-white mb-1.5">Grid Networks</h4>
        <p class="font-sans text-[10px] text-white/60 leading-normal">Port routing active. Data channels mapped.</p>
      </div>
    </div>
    
    <div class="deck-card absolute inset-0 bg-[#11091a] border-1.5 rounded-xl p-3.5 shadow-2xl origin-bottom transition-all duration-[650ms] ease-[cubic-bezier(0.19,1,0.22,1)] cursor-pointer flex flex-col [&.active]:bg-gradient-to-br [&.active]:from-[#160c24] [&.active]:to-[#0d0615] [&.active]:rotate-x-0 [&.active]:translate-z-2" data-index="2" style="--c: #f15bb5; --z: 1; --t: 40px; --s: 0.86; border-color: #f15bb5; z-index: var(--z); transform: translateY(var(--t)) scale(var(--s)) rotateX(25deg);">
      <div class="absolute -top-3 right-4 bg-pink-500 text-slate-950 font-sans text-[8.5px] font-extrabold px-2 py-0.5 rounded shadow-md">LOGS</div>
      <div class="card-inner">
        <h4 class="font-sans text-xs font-bold text-white mb-1.5">Output Logs</h4>
        <p class="font-sans text-[10px] text-white/60 leading-normal">HMR operational. Zero compiler faults detected.</p>
      </div>
    </div>
  </div>
</div>`,
  prompt: 'Design a highly creative 3D stacked card deck tab switcher with physical scaling and rotating rearrangements.'
};
