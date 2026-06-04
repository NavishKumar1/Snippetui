/**
 * Component: Digital Binary Rain Stream
 * Category: text-animation
 */

export const component = {
  id: 'binary-rain-text',
  name: 'Binary Rain Stream',
  category: 'text-animation',
  tag: 'Digital',
  html: `<div class="binary-rain-container" style="cursor: pointer;">
  <span class="binary-char" style="--d: 1;">0</span>
  <span class="binary-char" style="--d: 2;">1</span>
  <span class="binary-char" style="--d: 3;">0</span>
  <span class="binary-char" style="--d: 4;">1</span>
  <span class="binary-char" style="--d: 5;">0</span>
  <span class="binary-char" style="--d: 6;">1</span>
</div>`,
  js: `// Dynamically alternate binary state during loops
const binaryChars = document.querySelectorAll('.binary-char');
binaryChars.forEach(char => {
  setInterval(() => {
    if (Math.random() > 0.6) {
      char.textContent = char.textContent === '0' ? '1' : '0';
    }
  }, 400);
});`,
  ts: `// TypeScript Implementation
const binaryChars = document.querySelectorAll<HTMLSpanElement>('.binary-char');
binaryChars.forEach(char => {
  setInterval(() => {
    if (Math.random() > 0.6) {
      char.textContent = char.textContent === '0' ? '1' : '0';
    }
  }, 400);
});`,
  css: `/* Digital Binary Rain Stream CSS */
.binary-rain-container {
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.4);
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 65, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
}

.binary-char {
  font-family: 'Fira Code', monospace;
  font-size: 26px;
  font-weight: 700;
  color: #00ff41;
  text-shadow: 0 0 10px #00ff41, 0 0 20px rgba(0, 255, 65, 0.5);
  
  /* Staggered green waterfall fade loops */
  animation: binary-rain-fade 2s infinite ease-in-out;
  animation-delay: calc(var(--d) * 0.15s);
  user-select: none;
}

@keyframes binary-rain-fade {
  0%, 100% {
    opacity: 0.25;
    filter: brightness(0.6) blur(0.5px);
  }
  50% {
    opacity: 1;
    filter: brightness(1.2) drop-shadow(0 0 4px #00ff41);
  }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex gap-2 bg-black/40 px-6 py-3 rounded-lg border border-[#00ff41]/10 shadow-[0_4px_15px_rgba(0,0,0,0.6)] cursor-pointer">
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse">0</span>
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse [animation-delay:150ms]">1</span>
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse [animation-delay:300ms]">0</span>
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse [animation-delay:450ms]">1</span>
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse [animation-delay:600ms]">0</span>
  <span class="font-mono text-[26px] font-bold text-[#00ff41] drop-shadow-[0_0_10px_#00ff41] animate-pulse [animation-delay:750ms]">1</span>
</div>`,
  prompt: `Design a "Digital Binary Rain Stream" text animation. Monospaced green 0s and 1s cascade sequentially with staggered animation delays, constantly switching states to simulate terminal matrix rain.`
};
