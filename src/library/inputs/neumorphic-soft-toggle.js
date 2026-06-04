/**
 * Component: Neumorphic Soft Toggle
 * Category: inputs
 */

export const component = {
  id: 'neumorphic-soft-toggle',
  name: 'Neumorphic Soft Toggle',
  category: 'inputs',
  tag: 'Aesthetic',
  html: `<div class="neumorphic-toggle-wrapper">
  <input type="checkbox" id="neumorphic-chk-modular" class="neumorphic-checkbox">
  <label for="neumorphic-chk-modular" class="neumorphic-label"></label>
</div>`,
  js: `// Vanilla JavaScript Implementation
const chk = document.querySelector('.neumorphic-checkbox');
if (chk) {
  chk.addEventListener('change', (e) => {
    console.log('Toggle State Changed to:', e.target.checked);
  });
}`,
  ts: `// TypeScript Implementation
const chk = document.querySelector<HTMLInputElement>('.neumorphic-checkbox');
if (chk) {
  chk.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;
    console.log('Toggle State Changed to:', target.checked);
  });
}`,
  css: `/* Pure CSS Styles */
.neumorphic-toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.neumorphic-checkbox {
  display: none;
}

.neumorphic-label {
  width: 70px;
  height: 38px;
  background: #11111a;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  box-shadow: 
    inset 0 2px 5px rgba(0, 0, 0, 0.5), 
    inset 0 -2px 5px rgba(255, 255, 255, 0.03), 
    0 1px 1px rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease;
}

.neumorphic-label::after {
  content: '';
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffffff;
  position: absolute;
  top: 5px;
  left: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), background 0.3s ease;
}

.neumorphic-checkbox:checked + .neumorphic-label {
  background: #00f2fe;
}

.neumorphic-checkbox:checked + .neumorphic-label::after {
  transform: translateX(32px);
  background: #0a0a10;
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="flex items-center justify-center">
  <input type="checkbox" id="neumorphic-chk-modular" class="peer hidden" />
  <label for="neumorphic-chk-modular" 
    class="relative inline-block w-[70px] h-[38px] bg-[#11111a] rounded-[50px] cursor-pointer shadow-[inset_0_2px_5px_rgba(0,0,0,0.5),_inset_0_-2px_5px_rgba(255,255,255,0.03),_0_1px_1px_rgba(255,255,255,0.05)] transition-colors duration-300 peer-checked:bg-[#00f2fe] after:content-[''] after:absolute after:top-[5px] after:left-[5px] after:w-[28px] after:h-[28px] after:rounded-full after:bg-white after:shadow-[0_4px_10px_rgba(0,0,0,0.4)] after:transition-all after:duration-300 after:cubic-bezier-[0.68,-0.55,0.265,1.55] peer-checked:after:translate-x-[32px] peer-checked:after:bg-[#0a0a10]">
  </label>
</div>`,
  prompt: `Generate a premium "Neumorphic Soft Slide Toggle Switch" styled with industry-leading obsidian-dark aesthetics. The switch track must exhibit physical depth using high-fidelity inset box-shadow layers. The toggle thumb must slide smoothly using a transition spring curve, and the track background must shift seamlessly to active cyan when checked.`
};
