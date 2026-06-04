/**
 * Component: Luxury Gold Specular Input
 * Category: inputs
 */

export const component = {
  id: 'luxury-gold-input',
  name: 'Luxury Gold Specular Input',
  category: 'inputs',
  tag: 'Luxury',
  html: `<div class="gold-input-group">
  <input type="text" class="gold-input-field" placeholder=" " id="gold-input-demo" autocomplete="off">
  <div class="gold-input-shine"></div>
  <label class="gold-input-label" for="gold-input-demo">PROMO CODE</label>
</div>`,
  js: `// Interactive Gold Glint Specular Angle Sweep on Focus
const goldInp = document.querySelector('.gold-input-field');
if (goldInp) {
  const glint = goldInp.parentElement.querySelector('.gold-input-shine');
  
  goldInp.addEventListener('focus', () => {
    if (glint) {
      glint.style.animation = 'none';
      glint.offsetHeight; // trigger reflow
      glint.style.animation = 'gold-input-glint-sweep 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
    }
  });
}`,
  ts: `// TypeScript Implementation
const goldInp = document.querySelector<HTMLInputElement>('.gold-input-field');
if (goldInp) {
  const parent = goldInp.parentElement;
  if (parent) {
    const glint = parent.querySelector<HTMLDivElement>('.gold-input-shine');
    
    if (glint) {
      goldInp.addEventListener('focus', () => {
        glint.style.animation = 'none';
        glint.offsetHeight; // trigger reflow
        glint.style.animation = 'gold-input-glint-sweep 0.7s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
      });
    }
  }
}`,
  css: `/* Luxury Gold Specular Input Styles */
.gold-input-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

.gold-input-field {
  width: 100%;
  padding: 16px 18px;
  background: linear-gradient(135deg, #110d05 0%, #1a1307 100%);
  border: 1px solid transparent;
  background-clip: padding-box;
  border-radius: 6px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  outline: none;
  z-index: 2;
  position: relative;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.6),
    inset 0 1px 1px rgba(255, 215, 0, 0.1);
  transition: all 0.3s ease;
}

/* Polished Gold Border via pseudo element */
.gold-input-group::before {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 1;
  margin: -1px;
  border-radius: 6px;
  background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%);
  pointer-events: none;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.gold-input-label {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: #bf953f;
  background: linear-gradient(135deg, #bf953f 0%, #fcf6ba 50%, #b38728 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  pointer-events: none;
  z-index: 3;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Diagonal specular shine overlay */
.gold-input-shine {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-25deg);
  left: -100%;
  z-index: 3;
  pointer-events: none;
}

/* Focus interactive changes */
.gold-input-field:focus {
  box-shadow: 
    0 8px 25px rgba(179, 135, 40, 0.25),
    0 0 15px rgba(251, 245, 183, 0.1),
    inset 0 1px 1px rgba(255, 215, 0, 0.2);
}

.gold-input-field:focus ~ .gold-input-label,
.gold-input-field:not(:placeholder-shown) ~ .gold-input-label {
  transform: translateY(-170%) scale(0.85);
  background: linear-gradient(135deg, #ffffff 0%, #fcf6ba 50%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0 6px;
  z-index: 10;
}

@keyframes gold-input-glint-sweep {
  0% { left: -100%; }
  100% { left: 150%; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="gold-input-demo" autocomplete="off"
    class="peer w-full px-[18px] py-4 bg-gradient-to-br from-[#110d05] to-[#1a1307] rounded text-white font-bold text-sm tracking-wider outline-none transition-all duration-300 relative z-10" />
  <label for="gold-input-demo"
    class="absolute left-[18px] top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] bg-clip-text text-transparent font-bold text-xs tracking-widest pointer-events-none transition-all duration-300 peer-focus:-translate-y-[170%] peer-focus:scale-85 peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-translate-y-[170%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:px-1.5 z-20">
    PROMO CODE
  </label>
</div>`,
  prompt: `Design a premium "Luxury Gold Specular Input" component. Deep matte obsidian casing outlines with metallic gold gradient borders. Focused states sweep bright diagonal specular lens glints across input text area.`
};
