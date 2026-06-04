/**
 * Component: 3D Extrude Isometric Hover
 * Category: text-animation
 */

export const component = {
  id: 'perspective-3d-text',
  name: '3D Extrude Isometric Hover',
  category: 'text-animation',
  tag: 'Animated',
  html: `<div class="perspective-3d-text-effect" data-text="ISOMETRIC">ISOMETRIC</div>`,
  js: `// Vanilla JavaScript Implementation
const text3d = document.querySelector('.perspective-3d-text-effect');
if (text3d) {
  // We can track the mouse coordinates to dynamically shift perspective tilt angles!
  document.addEventListener('mousemove', (e) => {
    const rect = text3d.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth dynamic tilt offsets
    const tiltX = -(y / rect.height) * 15;
    const tiltY = (x / rect.width) * 15;
    
    text3d.style.transform = \`rotateX(\${15 + tiltX}deg) rotateY(\${-20 + tiltY}deg)\`;
  });
  
  // Reset tilt on mouseleave
  text3d.addEventListener('mouseleave', () => {
    text3d.style.transform = 'rotateX(15deg) rotateY(-20deg)';
  });
}`,
  ts: `// TypeScript Implementation
const text3d = document.querySelector<HTMLDivElement>('.perspective-3d-text-effect');
if (text3d) {
  document.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = text3d.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const tiltX = -(y / rect.height) * 15;
    const tiltY = (x / rect.width) * 15;
    
    text3d.style.transform = \`rotateX(\${15 + tiltX}deg) rotateY(\${-20 + tiltY}deg)\`;
  });
  
  text3d.addEventListener('mouseleave', () => {
    text3d.style.transform = 'rotateX(15deg) rotateY(-20deg)';
  });
}`,
  css: `/* Pure CSS Styles */
.perspective-3d-text-effect {
  position: relative;
  font-family: 'Outfit', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transform-style: preserve-3d;
  transform: rotateX(15deg) rotateY(-20deg);
  transition: transform 0.2s ease-out, text-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  
  /* Stacked layers creating solid 3D extrusion */
  text-shadow: 
    1px 1px 0px #00f2fe,
    2px 2px 0px #00f2fe,
    3px 3px 0px #00f2fe,
    4px 4px 0px #4facfe,
    5px 5px 0px #4facfe,
    6px 6px 0px #8a2be2,
    7px 7px 12px rgba(0, 0, 0, 0.6);
}

.perspective-3d-text-effect:hover {
  text-shadow: 
    1px 1px 0px #00f2fe,
    2px 2px 0px #00f2fe,
    3px 3px 0px #00f2fe,
    4px 4px 0px #00f2fe,
    5px 5px 0px #4facfe,
    6px 6px 0px #4facfe,
    7px 7px 0px #8a2be2,
    8px 8px 0px #8a2be2,
    9px 9px 0px #8a2be2,
    10px 10px 0px #8a2be2,
    11px 11px 20px rgba(0, 0, 0, 0.75);
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<!-- Note: Customize utility shadows in tailwind.config.js if desired,
  or build inline styles using custom CSS text-shadow parameters.
-->
<div class="relative font-heading text-[32px] font-extrabold text-white tracking-widest uppercase cursor-pointer transition-all duration-200 ease-out hover:duration-400
  [transform-style:preserve-3d] [transform:rotateX(15deg)_rotateY(-20deg)]
  [text-shadow:1px_1px_0px_#00f2fe,2px_2px_0px_#00f2fe,3px_3px_0px_#00f2fe,4px_4px_0px_#4facfe,5px_5px_0px_#4facfe,6px_6px_0px_#8a2be2,7px_7px_12px_rgba(0,0,0,0.6)]
  hover:[text-shadow:1px_1px_0px_#00f2fe,2px_2px_0px_#00f2fe,3px_3px_0px_#00f2fe,4px_4px_0px_#00f2fe,5px_5px_0px_#4facfe,6px_6px_0px_#4facfe,7px_7px_0px_#8a2be2,8px_8px_0px_#8a2be2,9px_9px_0px_#8a2be2,10px_10px_0px_#8a2be2,11px_11px_20px_rgba(0,0,0,0.75)]">
  ISOMETRIC
</div>`,
  prompt: `Design a stunning isometric 3D perspective extruding text shadow hover animation. The text must render at 3D rotation angles (tilt-X and tilt-Y) and extrude thick, solid-color isometric block layers (cyan, blue, and purple) using stacked text-shadow intervals.`
};
