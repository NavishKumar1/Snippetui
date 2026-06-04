/**
 * Component: Magnetic Compass Radar Button
 * Category: buttons
 */

export const component = {
  id: 'magnetic-compass-btn',
  name: 'Magnetic Compass Radar',
  category: 'buttons',
  tag: 'Interactive',
  html: `<button class="magnetic-compass-btn">
  <span class="compass-radar-grid"></span>
  <span class="compass-pointer-needle"></span>
  <span class="compass-text">CALIBRATE RADAR</span>
</button>`,
  js: `// Interactive 360-degree compass needle rotation
const compassBtn = document.querySelector('.magnetic-compass-btn');
if (compassBtn) {
  const needle = compassBtn.querySelector('.compass-pointer-needle');
  
  compassBtn.addEventListener('mousemove', (e) => {
    const rect = compassBtn.getBoundingClientRect();
    
    // Find centers of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate angle in radians, then convert to degrees
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const degree = angle * (180 / Math.PI);
    
    if (needle) {
      needle.style.transform = \`translate(-50%, -50%) rotate(\${degree}deg)\`;
    }
  });

  compassBtn.addEventListener('mouseleave', () => {
    if (needle) {
      needle.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      needle.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    }
  });
  
  compassBtn.addEventListener('mouseenter', () => {
    if (needle) needle.style.transition = 'none';
  });
}`,
  ts: `// TypeScript Implementation
const compassBtn = document.querySelector<HTMLButtonElement>('.magnetic-compass-btn');
if (compassBtn) {
  const needle = compassBtn.querySelector<HTMLSpanElement>('.compass-pointer-needle');
  
  compassBtn.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = compassBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const degree = angle * (180 / Math.PI);
    
    if (needle) {
      needle.style.transform = \`translate(-50%, -50%) rotate(\${degree}deg)\`;
    }
  });

  compassBtn.addEventListener('mouseleave', () => {
    if (needle) {
      needle.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      needle.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    }
  });
  
  compassBtn.addEventListener('mouseenter', () => {
    if (needle) needle.style.transition = 'none';
  });
}`,
  css: `/* Magnetic Compass Radar Button Styles */
.magnetic-compass-btn {
  position: relative;
  background: #02050b;
  border: 1px solid rgba(0, 242, 254, 0.25);
  padding: 16px 36px;
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(0, 242, 254, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Radar polar grid lines background */
.compass-radar-grid {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle, transparent 30%, rgba(0, 242, 254, 0.03) 30%, rgba(0, 242, 254, 0.03) 32%, transparent 32%),
    radial-gradient(circle, transparent 60%, rgba(0, 242, 254, 0.03) 60%, rgba(0, 242, 254, 0.03) 62%, transparent 62%);
  z-index: 1;
  pointer-events: none;
  opacity: 0.8;
  transition: all 0.3s ease;
}

/* Polar radar pointer needle */
.compass-pointer-needle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32px;
  height: 2px;
  background: linear-gradient(90deg, transparent 50%, #00f2fe 50%);
  transform: translate(-50%, -50%) rotate(0deg);
  transform-origin: center center;
  z-index: 2;
  pointer-events: none;
  box-shadow: 0 0 8px #00f2fe;
}

/* Pointer center pivot node */
.compass-pointer-needle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 5px #00f2fe;
  transform: translate(-50%, -50%);
}

.compass-text {
  position: relative;
  z-index: 3;
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  padding-left: 20px; /* Leave space for needle */
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.3);
  transition: all 0.3s ease;
}

/* Hover radar sweep */
.magnetic-compass-btn:hover {
  border-color: #00f2fe;
  box-shadow: 
    0 8px 25px rgba(0, 242, 254, 0.3),
    0 0 15px rgba(0, 242, 254, 0.15),
    inset 0 0 15px rgba(0, 242, 254, 0.15);
  transform: translateY(-2px);
}

.magnetic-compass-btn:hover .compass-radar-grid {
  opacity: 1;
  background-size: 110% 110%; /* pulse grid */
}

.magnetic-compass-btn:hover .compass-text {
  color: #ffffff;
  text-shadow: 
    0 0 8px #ffffff,
    0 0 15px #00f2fe;
}

.magnetic-compass-btn:active {
  transform: translateY(1px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#02050b] border border-[#00f2fe]/25 px-9 py-4 rounded-full cursor-pointer overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:border-[#00f2fe] hover:shadow-[0_8px_25px_rgba(0,242,254,0.3)] hover:-translate-y-0.5 active:translate-y-0.25 transition-all duration-300">
  <span class="relative z-10 text-[#00f2fe] font-bold text-xs tracking-[0.18em] pl-5 [text-shadow:0_0_8px_rgba(0,242,254,0.3)]">CALIBRATE RADAR</span>
</button>`,
  prompt: `Design a premium "Magnetic Compass Radar Button" component. Nestled inside a sleek round capsule dark casing, concentric radar lines overlay a pointer vector needle. Moving the cursor rotates the dial needle to target coordinates in a 360-degree range.`
};
