/**
 * Component: Acoustic Equalizer Wave Input
 * Category: inputs
 */

export const component = {
  id: 'equalizer-pulse-input',
  name: 'Acoustic Equalizer Wave Input',
  category: 'inputs',
  tag: 'Interactive',
  html: `<div class="eq-inp-group">
  <div class="eq-inp-waves">
    <span class="eq-inp-bar eib-1"></span>
    <span class="eq-inp-bar eib-2"></span>
    <span class="eq-inp-bar eib-3"></span>
    <span class="eq-inp-bar eib-4"></span>
    <span class="eq-inp-bar eib-5"></span>
  </div>
  <input type="text" class="equalizer-input-field" placeholder=" " id="eq-input-demo" autocomplete="off">
  <label class="eq-inp-label" for="eq-input-demo">AUDIO STREAM</label>
</div>`,
  js: `// Interactive Equalizer Wave Frequency Pulse on Keypress
const eqInp = document.querySelector('.equalizer-input-field');
if (eqInp) {
  const bars = eqInp.parentElement.querySelectorAll('.eq-inp-bar');
  
  eqInp.addEventListener('focus', () => {
    bars.forEach((bar) => {
      bar.style.animationPlayState = 'running';
    });
  });

  eqInp.addEventListener('blur', () => {
    bars.forEach((bar) => {
      bar.style.animationPlayState = 'paused';
    });
  });
  
  // Accelerate bars momentarily on keydown keypresses
  eqInp.addEventListener('keydown', () => {
    bars.forEach((bar, index) => {
      bar.style.animationDuration = \`\${0.25 + (index * 0.05)}s\`;
      setTimeout(() => {
        bar.style.animationDuration = '1.2s';
      }, 300);
    });
  });
}`,
  ts: `// TypeScript Implementation
const eqInp = document.querySelector<HTMLInputElement>('.equalizer-input-field');
if (eqInp) {
  const parent = eqInp.parentElement;
  if (parent) {
    const bars = parent.querySelectorAll<HTMLSpanElement>('.eq-inp-bar');
    
    eqInp.addEventListener('focus', () => {
      bars.forEach((bar) => {
        bar.style.animationPlayState = 'running';
      });
    });

    eqInp.addEventListener('blur', () => {
      bars.forEach((bar) => {
        bar.style.animationPlayState = 'paused';
      });
    });
    
    eqInp.addEventListener('keydown', () => {
      bars.forEach((bar, index) => {
        bar.style.animationDuration = \`\${0.25 + (index * 0.05)}s\`;
        setTimeout(() => {
          bar.style.animationDuration = '1.2s';
        }, 300);
      });
    });
  }
}`,
  css: `/* Acoustic Equalizer Wave Input Styles */
.eq-inp-group {
  position: relative;
  width: 260px;
  margin: 15px 0;
}

/* Audio equalizer bars positioned inside lower border region */
.eq-inp-waves {
  position: absolute;
  bottom: 2px;
  left: 18px;
  right: 18px;
  height: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  z-index: 5;
  pointer-events: none;
  opacity: 0.35;
  transition: opacity 0.3s ease;
}

.eq-inp-bar {
  display: block;
  width: 2px;
  height: 100%;
  background: linear-gradient(to top, #00f2fe 0%, #4facfe 100%);
  border-radius: 20px;
  transform-origin: bottom;
  animation: eq-inp-bounce 1.2s infinite ease-in-out alternate;
  animation-play-state: paused;
}

/* Speed delays for complexity */
.eib-1 { animation-delay: 0.1s; height: 30%; }
.eib-2 { animation-delay: 0.4s; height: 70%; }
.eib-3 { animation-delay: 0.2s; height: 50%; }
.eib-4 { animation-delay: 0.6s; height: 90%; }
.eib-5 { animation-delay: 0.3s; height: 40%; }

.equalizer-input-field {
  width: 100%;
  padding: 16px 18px 22px 18px; /* Leave bottom padding for visualizer */
  background: #04060a;
  border: 1px solid rgba(0, 242, 254, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  outline: none;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.5),
    inset 0 0 10px rgba(0, 242, 254, 0.05);
  z-index: 2;
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.eq-inp-label {
  position: absolute;
  left: 18px;
  top: 45%;
  transform: translateY(-50%);
  color: #00f2fe;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.15em;
  pointer-events: none;
  z-index: 3;
  text-shadow: 0 0 5px rgba(0, 242, 254, 0.25);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: left top;
}

/* Focus configurations */
.equalizer-input-field:focus {
  border-color: #00f2fe;
  box-shadow: 
    0 8px 25px rgba(0, 242, 254, 0.25),
    0 0 15px rgba(0, 242, 254, 0.15),
    inset 0 0 10px rgba(0, 242, 254, 0.15);
}

.equalizer-input-field:focus ~ .eq-inp-waves {
  opacity: 0.95;
}

.equalizer-input-field:focus + .eq-inp-label,
.equalizer-input-field:not(:placeholder-shown) + .eq-inp-label {
  transform: translateY(-170%) scale(0.85);
  color: #ffffff;
  text-shadow: 
    0 0 5px #ffffff,
    0 0 12px #00f2fe;
  background-color: #04060a;
  padding: 0 6px;
  z-index: 10;
}

@keyframes eq-inp-bounce {
  0% { transform: scaleY(0.25); }
  100% { transform: scaleY(1); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[260px] my-4">
  <input type="text" placeholder=" " id="eq-input-demo" autocomplete="off"
    class="peer w-full px-[18px] pt-4 pb-5.5 bg-[#04060a] border border-[#00f2fe]/25 rounded-lg text-white font-bold text-sm tracking-wider outline-none focus:border-[#00f2fe] focus:shadow-[0_8px_25px_rgba(0,242,254,0.25)] transition-all duration-300 relative z-10" />
  <label for="eq-input-demo"
    class="absolute left-[18px] top-[45%] -translate-y-1/2 text-sm text-[#00f2fe] font-bold tracking-widest pointer-events-none transition-all duration-300 peer-focus:-translate-y-[170%] peer-focus:scale-85 peer-focus:text-white peer-focus:bg-[#04060a] peer-focus:px-1.5 peer-[:not(:placeholder-shown)]:-translate-y-[170%] peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-white peer-[:not(:placeholder-shown)]:bg-[#04060a] peer-[:not(:placeholder-shown)]:px-1.5 z-20">
    AUDIO STREAM
  </label>
</div>`,
  prompt: `Design a premium "Acoustic Equalizer Wave Input" component. Hollow boundaries glows in cyan. Typing variables accelerates vertical equalizer sound bars along input lower border dynamically.`
};
