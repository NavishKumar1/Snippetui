/**
 * Component: Magnetic Gravity Button
 * Category: buttons
 */

export const component = {
  id: 'magnetic-gravity-btn',
  name: 'Magnetic Gravity Button',
  category: 'buttons',
  tag: 'Interactive',
  html: `<div class="magnetic-btn-wrapper">
  <button class="magnetic-btn">
    <span class="magnetic-btn-text">EXPLORE</span>
  </button>
</div>`,
  js: `// Magnetic gravity hover pull
const magWrapper = document.querySelector('.magnetic-btn-wrapper');
if (magWrapper) {
  const btn = magWrapper.querySelector('.magnetic-btn');
  const text = magWrapper.querySelector('.magnetic-btn-text');
  
  magWrapper.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Pull button and text independently at different ratios (parallax)
    btn.style.transform = \`translate(\${x * 0.35}px, \${y * 0.35}px)\`;
    text.style.transform = \`translate(\${x * 0.15}px, \${y * 0.15}px)\`;
  });
  
  magWrapper.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
    text.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    text.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });
  
  magWrapper.addEventListener('mouseenter', () => {
    btn.style.transition = 'none';
    text.style.transition = 'none';
  });
}`,
  ts: `// TypeScript Implementation
const magWrapper = document.querySelector<HTMLDivElement>('.magnetic-btn-wrapper');
if (magWrapper) {
  const btn = magWrapper.querySelector<HTMLButtonElement>('.magnetic-btn');
  const text = magWrapper.querySelector<HTMLSpanElement>('.magnetic-btn-text');
  
  if (btn && text) {
    magWrapper.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = \`translate(\${x * 0.35}px, \${y * 0.35}px)\`;
      text.style.transform = \`translate(\${x * 0.15}px, \${y * 0.15}px)\`;
    });
    
    magWrapper.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      text.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      text.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    magWrapper.addEventListener('mouseenter', () => {
      btn.style.transition = 'none';
      text.style.transition = 'none';
    });
  }
}`,
  css: `/* Magnetic Gravity Button Styles */
.magnetic-btn-wrapper {
  padding: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.magnetic-btn {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  padding: 16px 36px;
  border-radius: 100px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.magnetic-btn-text {
  display: inline-block;
  transition: transform 0.2s ease;
}

.magnetic-btn:hover {
  border-color: rgba(0, 242, 254, 0.4);
  box-shadow: 
    0 10px 30px -10px rgba(0, 242, 254, 0.35),
    0 0 15px rgba(0, 242, 254, 0.1);
  background: rgba(255, 255, 255, 0.06);
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="p-[30px] inline-flex items-center justify-center">
  <button class="bg-white/5 border border-white/10 px-9 py-4 rounded-full text-white font-semibold text-sm tracking-widest cursor-pointer hover:border-[#00f2fe]/40 hover:shadow-[0_10px_30px_-10px_rgba(0,242,254,0.35)] transition-all duration-300">
    EXPLORE
  </button>
</div>`,
  prompt: `Design a premium "Magnetic Gravity Button" component. A minimalist dark capsule button pulls organically toward the cursor when hovered with elastic, responsive springs. The inside uppercase typography floats independently, creating a satisfy 3D parallax coordinate attraction.`
};
