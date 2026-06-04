/**
 * Component: Typing Terminal Console
 * Category: text-animation
 */

export const component = {
  id: 'typing-terminal-text',
  name: 'Typing Terminal Console',
  category: 'text-animation',
  tag: 'Animated',
  html: `<div class="typing-terminal-wrapper">
  <span class="typing-terminal-text"></span><span class="typing-terminal-cursor">|</span>
</div>`,
  js: `// Vanilla JavaScript Implementation
const text = 'console.log("Welcome to SnippetUI!");';
const target = document.querySelector('.typing-terminal-text');
if (target) {
  target.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(type, 80);
    } else {
      // Loop or pause
      setTimeout(() => {
        target.textContent = '';
        i = 0;
        type();
      }, 3000);
    }
  }
  type();
}`,
  ts: `// TypeScript Implementation
const text: string = 'console.log("Welcome to SnippetUI!");';
const target = document.querySelector<HTMLSpanElement>('.typing-terminal-text');
if (target) {
  target.textContent = '';
  let i: number = 0;
  const type = () => {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(type, 80);
    } else {
      setTimeout(() => {
        target.textContent = '';
        i = 0;
        type();
      }, 3000);
    }
  };
  type();
}`,
  css: `/* Pure CSS Styles */
.typing-terminal-wrapper {
  display: inline-flex;
  align-items: center;
  font-family: 'Fira Code', monospace;
  font-size: 18px;
  font-weight: 500;
  color: #00f2fe;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.typing-terminal-cursor {
  font-weight: 700;
  color: #00f2fe;
  margin-left: 2px;
  animation: cursor-blink 0.8s steps(2, start) infinite;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Configure keyframes & animation in tailwind.config.js:
  theme: {
    extend: {
      keyframes: {
        'cursor-blink': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        'cursor-blink': 'cursor-blink 0.8s steps(2, start) infinite'
      }
    }
  }
-->
<div class="inline-flex items-center font-mono text-[18px] font-medium text-[#00f2fe] bg-black/40 border border-white/5 px-5 py-3 rounded-lg shadow-2xl">
  <span class="typing-terminal-text"></span>
  <span class="font-bold text-[#00f2fe] ml-0.5 animate-cursor-blink">|</span>
</div>`,
  prompt: `Design a sleek dark terminal typewriter console interface. The text must display character by character in real-time, accompanied by a bright cyan typing cursor that flashes dynamically at step-increments. The container should have an obsidian frosted box with subtle shadows.`
};
