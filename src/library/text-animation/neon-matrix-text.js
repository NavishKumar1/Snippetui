/**
 * Component: Neon Matrix Code Rain
 * Category: text-animation
 */

export const component = {
  id: 'neon-matrix-text',
  name: 'Neon Matrix Code Rain',
  category: 'text-animation',
  tag: 'Cyberpunk',
  html: `<div class="matrix-text-container">
  <span class="matrix-char" style="--d: 1;">M</span>
  <span class="matrix-char" style="--d: 2;">A</span>
  <span class="matrix-char" style="--d: 3;">T</span>
  <span class="matrix-char" style="--d: 4;">R</span>
  <span class="matrix-char" style="--d: 5;">I</span>
  <span class="matrix-char" style="--d: 6;">X</span>
</div>`,
  js: `// Dynamically randomize characters during animation
const matrixChars = document.querySelectorAll('.matrix-char');
const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&';

matrixChars.forEach(char => {
  setInterval(() => {
    if (Math.random() > 0.7) {
      const original = char.textContent;
      char.textContent = pool.charAt(Math.floor(Math.random() * pool.length));
      setTimeout(() => {
        char.textContent = original;
      }, 150);
    }
  }, 300);
});`,
  ts: `// TypeScript Implementation
const matrixChars = document.querySelectorAll<HTMLSpanElement>('.matrix-char');
const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&';

matrixChars.forEach(char => {
  setInterval(() => {
    if (Math.random() > 0.7) {
      const original = char.textContent || '';
      char.textContent = pool.charAt(Math.floor(Math.random() * pool.length));
      setTimeout(() => {
        char.textContent = original;
      }, 150);
    }
  }, 300);
});`,
  css: `/* Neon Matrix Code Rain Styles */
.matrix-text-container {
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.4);
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 65, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

.matrix-char {
  font-family: 'Fira Code', monospace;
  font-size: 26px;
  font-weight: 700;
  color: #00ff41;
  text-shadow: 0 0 10px #00ff41, 0 0 20px rgba(0, 255, 65, 0.5);
  animation: matrix-flicker 1.8s infinite ease-in-out;
  animation-delay: calc(var(--d) * 0.15s);
  user-select: none;
}

@keyframes matrix-flicker {
  0%, 100% {
    opacity: 0.3;
    filter: brightness(0.6);
  }
  50% {
    opacity: 1;
    filter: brightness(1.2) drop-shadow(0 0 4px #00ff41);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex gap-2 bg-black/40 px-6 py-3 rounded-lg border border-[#00ff41]/10 shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer">
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse">M</span>
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse [animation-delay:150ms]">A</span>
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse [animation-delay:300ms]">T</span>
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse [animation-delay:450ms]">R</span>
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse [animation-delay:600ms]">I</span>
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse [animation-delay:750ms]">X</span>
</div>`,
  prompt: `Design a "Neon Matrix Code Rain" text animation that flickers in terminal cyber green. Letters are styled in a custom monospaced Fira Code font, and glowing code drop-shadows pulse sequentially. The individual letters dynamically glitch and randomize occasionally, simulating matrix stream code fall.`
};
