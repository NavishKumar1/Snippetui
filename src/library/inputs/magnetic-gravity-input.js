/**
 * Component: Magnetic Gravity Input
 * Category: inputs
 */

export const component = {
  id: 'magnetic-gravity-input',
  name: 'Magnetic Gravity Input',
  category: 'inputs',
  tag: 'Interactive',
  html: `<div class="mag-input-wrapper">
  <div class="magnetic-input-container">
    <input type="text" class="magnetic-input-field" placeholder=" " id="mag-input-demo" autocomplete="off">
    <label class="magnetic-input-label" for="mag-input-demo">Search Query</label>
  </div>
</div>`,
  js: `// Interactive Magnetic Gravity pull on Hover
const magInpWrapper = document.querySelector('.mag-input-wrapper');
if (magInpWrapper) {
  const container = magInpWrapper.querySelector('.magnetic-input-container');
  const label = magInpWrapper.querySelector('.magnetic-input-label');
  
  magInpWrapper.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Pull container and label at different parallax equations
    container.style.transform = \`translate(\${x * 0.15}px, \${y * 0.15}px)\`;
    label.style.transform = \`translateY(-50%) translate(\${x * 0.05}px, \${y * 0.05}px)\`;
  });

  magInpWrapper.addEventListener('mouseleave', () => {
    container.style.transform = 'translate(0, 0)';
    label.style.transform = 'translateY(-50%) translate(0, 0)';
    container.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    label.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });
  
  magInpWrapper.addEventListener('mouseenter', () => {
    container.style.transition = 'none';
    label.style.transition = 'none';
  });
}`,
  ts: `// TypeScript Implementation
const magInpWrapper = document.querySelector<HTMLDivElement>('.mag-input-wrapper');
if (magInpWrapper) {
  const container = magInpWrapper.querySelector<HTMLDivElement>('.magnetic-input-container');
  const label = magInpWrapper.querySelector<HTMLLabelElement>('.magnetic-input-label');
  
  if (container && label) {
    magInpWrapper.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      container.style.transform = \`translate(\${x * 0.15}px, \${y * 0.15}px)\`;
      label.style.transform = \`translateY(-50%) translate(\${x * 0.05}px, \${y * 0.05}px)\`;
    });

    magInpWrapper.addEventListener('mouseleave', () => {
      container.style.transform = 'translate(0, 0)';
      label.style.transform = 'translateY(-50%) translate(0, 0)';
      container.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      label.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    magInpWrapper.addEventListener('mouseenter', () => {
      container.style.transition = 'none';
      label.style.transition = 'none';
    });
  }
}`,
  css: `/* Magnetic Gravity Input Styles */
.mag-input-wrapper {
  padding: 25px;
  display: inline-block;
}

.magnetic-input-container {
  position: relative;
  width: 260px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

.magnetic-input-field {
  width: 100%;
  padding: 16px 24px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  outline: none;
  z-index: 2;
  position: relative;
}

.magnetic-input-label {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  color: #5d677a;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  pointer-events: none;
  z-index: 3;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Focus interactive behaviors */
.magnetic-input-container:hover {
  border-color: rgba(0, 242, 254, 0.3);
  box-shadow: 
    0 10px 25px rgba(0, 242, 254, 0.2),
    0 0 15px rgba(0, 242, 254, 0.05);
}

.magnetic-input-field:focus {
  outline: none;
}

.magnetic-input-field:focus + .magnetic-input-label,
.magnetic-input-field:not(:placeholder-shown) + .magnetic-input-label {
  transform: translateY(-180%) scale(0.8) translate(0, 0) !important;
  color: #00f2fe;
  background-color: #0d0d14;
  padding: 0 8px;
  z-index: 10;
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="p-6 inline-block">
  <div class="relative w-[260px] bg-white/2 border border-white/8 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:border-[#00f2fe]/30 hover:shadow-[0_10px_25px_rgba(0,242,254,0.2)] transition-all duration-300">
    <input type="text" placeholder=" " id="mag-input-demo" autocomplete="off"
      class="peer w-full px-6 py-4 bg-transparent text-white outline-none relative z-10" />
    <label for="mag-input-demo"
      class="absolute left-6 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-bold pointer-events-none transition-all duration-300 peer-focus:-translate-y-[180%] peer-focus:scale-80 peer-focus:text-[#00f2fe] peer-focus:bg-[#0d0d14] peer-focus:px-2 peer-[:not(:placeholder-shown)]:-translate-y-[180%] peer-[:not(:placeholder-shown)]:scale-80 peer-[:not(:placeholder-shown)]:text-[#00f2fe] peer-[:not(:placeholder-shown)]:bg-[#0d0d14] peer-[:not(:placeholder-shown)]:px-2 z-20">
      Search Query
    </label>
  </div>
</div>`,
  prompt: `Design a premium "Magnetic Gravity Input" component. capsule shape draws organically toward pointer coordinates with springy springs, while typing variables trigger parallax tag shifts.`
};
