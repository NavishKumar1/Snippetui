/**
 * Component: Abstract Kinetic Stretch Warp
 * Category: text-animation
 */

export const component = {
  id: 'kinetic-stretch-text',
  name: 'Kinetic Stretch Warp',
  category: 'text-animation',
  tag: 'Modern',
  html: `<div class="kinetic-stretch-wrapper">
  <span class="kinetic-stretch-char" data-char="K" style="--i: 1;">K</span>
  <span class="kinetic-stretch-char" data-char="I" style="--i: 2;">I</span>
  <span class="kinetic-stretch-char" data-char="N" style="--i: 3;">N</span>
  <span class="kinetic-stretch-char" data-char="E" style="--i: 4;">E</span>
  <span class="kinetic-stretch-char" data-char="T" style="--i: 5;">T</span>
  <span class="kinetic-stretch-char" data-char="I" style="--i: 6;">I</span>
  <span class="kinetic-stretch-char" data-char="C" style="--i: 7;">C</span>
</div>`,
  js: `// Dynamic mouse tracking vertical stretch
const stretchChars = document.querySelectorAll('.kinetic-stretch-char');
stretchChars.forEach(char => {
  char.addEventListener('mousemove', (e) => {
    const rect = char.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const ratio = Math.abs(mouseY - rect.height / 2) / (rect.height / 2);
    char.style.transform = \`scaleY(\${1 + ratio * 1.5}) scaleX(\${1 - ratio * 0.25})\`;
    char.style.color = '#00f2fe';
  });
  
  char.addEventListener('mouseleave', () => {
    char.style.transform = 'scaleY(1) scaleX(1)';
    char.style.color = '#ffffff';
  });
});`,
  ts: `// TypeScript Implementation
const stretchChars = document.querySelectorAll<HTMLSpanElement>('.kinetic-stretch-char');
stretchChars.forEach(char => {
  char.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = char.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const ratio = Math.abs(mouseY - rect.height / 2) / (rect.height / 2);
    char.style.transform = \`scaleY(\${1 + ratio * 1.5}) scaleX(\${1 - ratio * 0.25})\`;
    char.style.color = '#00f2fe';
  });
  
  char.addEventListener('mouseleave', () => {
    char.style.transform = 'scaleY(1) scaleX(1)';
    char.style.color = '#ffffff';
  });
});`,
  css: `/* Abstract Kinetic Stretch Styles */
.kinetic-stretch-wrapper {
  display: flex;
  gap: 4px;
  padding: 10px;
  cursor: crosshair;
}

.kinetic-stretch-char {
  display: inline-block;
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 850;
  color: #ffffff;
  position: relative;
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.2s ease;
  user-select: none;
  
  /* Underlying structural lines for kinetic feel */
  text-shadow: 
    0px 0px 8px rgba(255, 255, 255, 0.1),
    0px 2px 10px rgba(0, 242, 254, 0.15);
}

.kinetic-stretch-char::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 2px;
  background: var(--accent-cyan);
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.kinetic-stretch-char:hover::before {
  transform: scaleX(1);
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex gap-1 p-[10px] cursor-crosshair">
  <span class="font-extrabold text-[32px] text-white hover:scale-y-[2.2] hover:scale-x-[0.8] hover:text-[#00f2fe] transition-all duration-200 ease-out">K</span>
  <span class="font-extrabold text-[32px] text-white hover:scale-y-[2.2] hover:scale-x-[0.8] hover:text-[#00f2fe] transition-all duration-200 ease-out">I</span>
  <span class="font-extrabold text-[32px] text-white hover:scale-y-[2.2] hover:scale-x-[0.8] hover:text-[#00f2fe] transition-all duration-200 ease-out">N</span>
  <span class="font-extrabold text-[32px] text-white hover:scale-y-[2.2] hover:scale-x-[0.8] hover:text-[#00f2fe] transition-all duration-200 ease-out">E</span>
  <span class="font-extrabold text-[32px] text-white hover:scale-y-[2.2] hover:scale-x-[0.8] hover:text-[#00f2fe] transition-all duration-200 ease-out">T</span>
  <span class="font-extrabold text-[32px] text-white hover:scale-y-[2.2] hover:scale-x-[0.8] hover:text-[#00f2fe] transition-all duration-200 ease-out">I</span>
  <span class="font-extrabold text-[32px] text-white hover:scale-y-[2.2] hover:scale-x-[0.8] hover:text-[#00f2fe] transition-all duration-200 ease-out">C</span>
</div>`,
  prompt: `Generate an abstract "Kinetic Stretch Warp" typography animation. Text is heavy block sans-serif in pristine white. When hovered or dragged, characters vertically stretch/expand up to 200% using dynamic spring-back transitions and custom coordinate skew transforms, giving a high-end editorial layouts look.`
};
