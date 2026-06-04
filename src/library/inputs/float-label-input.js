/**
 * Component: Floating Label Input
 * Category: inputs
 */

export const component = {
  id: 'float-label-input',
  name: 'Floating Label Input',
  category: 'inputs',
  tag: 'Responsive',
  html: `<div class="float-input-group">
  <input type="text" class="float-input-field" placeholder=" " id="email-field-demo">
  <label class="float-input-label" for="email-field-demo">Your Email</label>
</div>`,
  js: `// Vanilla JavaScript Implementation
const field = document.querySelector('.float-input-field');
if (field) {
  field.addEventListener('input', (e) => {
    console.log('Value entered:', e.target.value);
  });
}`,
  ts: `// TypeScript Implementation
const field = document.querySelector<HTMLInputElement>('.float-input-field');
if (field) {
  field.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLInputElement;
    console.log('Value entered:', target.value);
  });
}`,
  css: `/* Pure CSS Styles */
.float-input-group {
  position: relative;
  width: 240px;
  margin: 10px 0;
}

.float-input-field {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.float-input-field:focus {
  border-color: #00f2fe;
}

.float-input-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 14px;
  pointer-events: none;
  font-family: 'Inter', sans-serif;
  transition: transform 0.3s ease, font-size 0.3s ease, color 0.3s ease, background-color 0.3s ease;
}

.float-input-field:focus + .float-input-label,
.float-input-field:not(:placeholder-shown) + .float-input-label {
  transform: translateY(-160%) scale(0.85);
  left: 10px;
  color: #00f2fe;
  background-color: #0d0d14;
  padding: 0 6px;
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[240px] my-[10px]">
  <input type="text" placeholder=" " id="email-field-demo" 
    class="peer w-full px-4 py-3.5 border-2 border-white/8 rounded-lg bg-white/2 text-white outline-none focus:border-[#00f2fe] transition-colors duration-300" />
  <label for="email-field-demo" 
    class="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#6b7280] pointer-events-none transition-all duration-300 peer-focus:-translate-y-[160%] peer-focus:scale-85 peer-focus:left-[10px] peer-focus:text-[#00f2fe] peer-focus:bg-[#0d0d14] peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-translate-y-[160%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:left-[10px] peer-[:not(:placeholder-shown)]:text-[#00f2fe] peer-[:not(:placeholder-shown)]:bg-[#0d0d14] peer-[:not(:placeholder-shown)]:px-1.5">
    Your Email
  </label>
</div>`,
  prompt: `Generate a premium "Floating Label Input Field" styled with industry-leading obsidian-dark aesthetics. The field must display an organic background scale, and the floating label must sit comfortably inside the input area. On focus or when the field contains text, the label must scale down smoothly, colorize to a vivid cyan tone, and lock into place at the top border with a secure background cover.`
};
