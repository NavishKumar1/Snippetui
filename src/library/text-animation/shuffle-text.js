/**
 * Component: Shuffle Text Scrambler
 * Category: text-animation
 */

export const component = {
  id: 'shuffle-text',
  name: 'Shuffle Scrambler',
  category: 'text-animation',
  tag: 'Glitch',
  html: `<div class="shuffle-text-wrapper" style="cursor: pointer;">
  <span class="shuffle-display" data-target="SHUFFLE">SHUFFLE</span>
</div>`,
  js: `// Character shuffle loop
const shuffleWrap = document.querySelector('.shuffle-text-wrapper');
if (shuffleWrap) {
  const display = shuffleWrap.querySelector('.shuffle-display');
  const target = display.getAttribute('data-target');
  const pool = 'A_B_C_D_E_F_G_H_I_J_K_L_M_N_O_P_Q_R_S_T_U_V_W_X_Y_Z_0_1_2_3_4_5_6_7_8_9_@_#_%_&';
  
  const triggerShuffle = () => {
    let count = 0;
    const maxCycles = 10;
    
    const interval = setInterval(() => {
      if (count >= maxCycles) {
        clearInterval(interval);
        display.textContent = target;
      } else {
        let sc = '';
        for (let i = 0; i < target.length; i++) {
          if (Math.random() > 0.4) {
            sc += pool.charAt(Math.floor(Math.random() * pool.length));
          } else {
            sc += target.charAt(i);
          }
        }
        display.textContent = sc;
        count++;
      }
    }, 60);
  };
  
  // Continuously trigger shuffle every 3.5 seconds
  setInterval(triggerShuffle, 3500);
  
  // Trigger on click
  shuffleWrap.addEventListener('click', triggerShuffle);
}`,
  ts: `// TypeScript Implementation
const shuffleWrap = document.querySelector<HTMLDivElement>('.shuffle-text-wrapper');
if (shuffleWrap) {
  const display = shuffleWrap.querySelector<HTMLSpanElement>('.shuffle-display');
  if (display) {
    const target = display.getAttribute('data-target') || 'SHUFFLE';
    const pool = 'A_B_C_D_E_F_G_H_I_J_K_L_M_N_O_P_Q_R_S_T_U_V_W_X_Y_Z_0_1_2_3_4_5_6_7_8_9_@_#_%_&';
    
    const triggerShuffle = () => {
      let count = 0;
      const maxCycles = 10;
      
      const interval = setInterval(() => {
        if (count >= maxCycles) {
          clearInterval(interval);
          display.textContent = target;
        } else {
          let sc = '';
          for (let i = 0; i < target.length; i++) {
            if (Math.random() > 0.4) {
              sc += pool.charAt(Math.floor(Math.random() * pool.length));
            } else {
              sc += target.charAt(i);
            }
          }
          display.textContent = sc;
          count++;
        }
      }, 60);
    };
    
    setInterval(triggerShuffle, 3500);
    shuffleWrap.addEventListener('click', triggerShuffle);
  }
}`,
  css: `/* Shuffle Text CSS */
.shuffle-text-wrapper {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-color);
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
}

.shuffle-display {
  font-family: 'Fira Code', monospace;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #00f2fe;
  text-transform: uppercase;
  text-shadow: 0 0 8px rgba(0, 242, 254, 0.6);
}`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="bg-black/40 border border-white/5 px-6 py-3 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.5)] cursor-pointer">
  <span class="font-mono text-[26px] font-bold tracking-widest text-[#00f2fe] drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]">
    SHUFFLE
  </span>
</div>`,
  prompt: `Design a repeating "Shuffle Scrambler" text animation. The word randomly scrambles into terminal tech characters and glitches before resolving back into high-fidelity cyan monospace lettering, loop repeating dynamically on short intervals.`
};
