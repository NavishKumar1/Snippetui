/**
 * Component: Neon Border Glow Card
 * Category: cards
 */

export const component = {
  id: 'neon-glow-card',
  name: 'Neon Border Glow Card',
  category: 'cards',
  tag: 'Aesthetic',
  html: `<div class="card-neon-glow">
  <div class="card-neon-glow-title">Neon Card</div>
  <div class="card-neon-glow-desc">Hover over this card to watch it glow.</div>
</div>`,
  js: `// Vanilla JavaScript Implementation
const card = document.querySelector('.card-neon-glow');
if (card) {
  card.addEventListener('mouseenter', () => {
    console.log('Cursor entered card boundaries');
  });
}`,
  ts: `// TypeScript Implementation
const card = document.querySelector<HTMLDivElement>('.card-neon-glow');
if (card) {
  card.addEventListener('mouseenter', (e: MouseEvent) => {
    console.log('Cursor entered card boundaries', e);
  });
}`,
  css: `/* Pure CSS Styles */
.card-neon-glow {
  width: 260px;
  height: 150px;
  background: #0b0b12;
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  overflow: hidden;
}

.card-neon-glow::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #00f2fe, #8a2be2);
  z-index: -1;
  border-radius: 14px;
  opacity: 0.15;
  transition: opacity 0.3s ease;
}

.card-neon-glow:hover::before {
  opacity: 1;
  filter: blur(8px);
}

.card-neon-glow-title {
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #ffffff;
}

.card-neon-glow-desc {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="group relative w-[260px] h-[150px] bg-[#0b0b12] rounded-xl flex flex-col justify-center items-center p-5 cursor-pointer overflow-hidden border border-white/5">
  <span class="absolute -inset-[2px] bg-gradient-to-br from-[#00f2fe] to-[#8a2be2] rounded-[14px] -z-10 opacity-15 group-hover:opacity-100 group-hover:blur-[8px] transition-all duration-300"></span>
  <div class="font-bold text-base text-white mb-[6px] z-10">Neon Card</div>
  <div class="text-xs text-[#9ca3af] text-center z-10">Hover over this card to watch it glow.</div>
</div>`,
  prompt: `Generate a premium "Neon Border Glow Card" styled with industry-leading obsidian-dark aesthetics. The card must have a translucent deep-slate core and utilize a dual-tone glowing gradient border underneath. When the mouse cursor hovers over the card, the under-border glow must transition smoothly to high opacity and acquire an aesthetic blur filter effect, reflecting a rich neon aura.`
};
