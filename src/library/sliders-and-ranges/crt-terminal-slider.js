/**
 * Component: CRT Terminal Slider
 * Category: sliders-and-ranges
 */

export const component = {
  id: 'crt-terminal-slider',
  name: 'CRT Terminal Slider',
  category: 'sliders-and-ranges',
  tag: 'Stunning',
  html: `<div class="crt-slider-container">
  <div class="crt-screen">
    <div class="crt-scanlines"></div>
    <div class="crt-glare"></div>
    <div class="crt-header">SYS_MONITOR // R-45</div>
    <div class="crt-status-line">[SYS_IDLE] VAL: 50.00%</div>
    <div class="crt-slider-wrapper">
      <div class="crt-track">
        <div class="crt-fill" style="width: 50%;"></div>
      </div>
      <div class="crt-thumb" style="left: 50%;"></div>
    </div>
  </div>
</div>`,
  js: `// Update CRT retro status terminal value and status on drag
const crWrapper = document.querySelector('.crt-slider-container');
if (crWrapper) {
  const thumb = crWrapper.querySelector('.crt-thumb');
  const fill = crWrapper.querySelector('.crt-fill');
  const sliderWrapper = crWrapper.querySelector('.crt-slider-wrapper');
  const statusLine = crWrapper.querySelector('.crt-status-line');
  
  let isDragging = false;
  
  const updateSlider = (clientX) => {
    const rect = sliderWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    statusLine.textContent = \`[SYS_DRAG] VAL: \${percentage.toFixed(2)}%\`;
    statusLine.classList.add('flicker');
  };
  
  thumb.addEventListener('mousedown', () => {
    isDragging = true;
    thumb.classList.add('active');
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      thumb.classList.remove('active');
      statusLine.classList.remove('flicker');
      // Retrieve value to change state back to idle
      const curVal = parseFloat(thumb.style.left) || 50;
      statusLine.textContent = \`[SYS_IDLE] VAL: \${curVal.toFixed(2)}%\`;
    }
  });
  
  sliderWrapper.addEventListener('click', (e) => {
    if (e.target !== thumb) {
      updateSlider(e.clientX);
      const curVal = parseFloat(thumb.style.left) || 50;
      statusLine.textContent = \`[SYS_IDLE] VAL: \${curVal.toFixed(2)}%\`;
    }
  });
}`,
  ts: `// TypeScript Implementation
const crWrapper = document.querySelector<HTMLDivElement>('.crt-slider-container');
if (crWrapper) {
  const thumb = crWrapper.querySelector<HTMLDivElement>('.crt-thumb');
  const fill = crWrapper.querySelector<HTMLDivElement>('.crt-fill');
  const sliderWrapper = crWrapper.querySelector<HTMLDivElement>('.crt-slider-wrapper');
  const statusLine = crWrapper.querySelector<HTMLDivElement>('.crt-status-line');
  
  let isDragging = false;
  
  const updateSlider = (clientX: number) => {
    if (!sliderWrapper || !thumb || !fill || !statusLine) return;
    const rect = sliderWrapper.getBoundingClientRect();
    let percentage = ((clientX - rect.left) / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    
    thumb.style.left = \`\${percentage}%\`;
    fill.style.width = \`\${percentage}%\`;
    
    statusLine.textContent = \`[SYS_DRAG] VAL: \${percentage.toFixed(2)}%\`;
    statusLine.classList.add('flicker');
  };
  
  if (thumb && sliderWrapper && statusLine) {
    thumb.addEventListener('mousedown', () => {
      isDragging = true;
      thumb.classList.add('active');
    });
    
    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });
    
    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        thumb.classList.remove('active');
        statusLine.classList.remove('flicker');
        const curVal = parseFloat(thumb.style.left) || 50;
        statusLine.textContent = \`[SYS_IDLE] VAL: \${curVal.toFixed(2)}%\`;
      }
    });
    
    sliderWrapper.addEventListener('click', (e: MouseEvent) => {
      if (e.target !== thumb) {
        updateSlider(e.clientX);
        const curVal = parseFloat(thumb.style.left) || 50;
        statusLine.textContent = \`[SYS_IDLE] VAL: \${curVal.toFixed(2)}%\`;
      }
    });
  }
}`,
  css: `/* CRT Terminal Slider Styles */
.crt-slider-container {
  width: 320px;
  background: #020904;
  border: 3px solid #1a331e;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), inset 0 0 15px rgba(51, 255, 51, 0.15);
  font-family: 'Courier New', Courier, monospace;
  position: relative;
  user-select: none;
}

.crt-screen {
  position: relative;
  background: #031005;
  border-radius: 4px;
  padding: 8px;
  overflow: hidden;
  border: 1px solid #122c16;
}

.crt-scanlines {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%, 
    rgba(0, 0, 0, 0.25) 50%
  ), linear-gradient(
    90deg,
    rgba(255, 0, 0, 0.06),
    rgba(0, 255, 0, 0.02),
    rgba(0, 0, 255, 0.06)
  );
  background-size: 100% 4px, 6px 100%;
  pointer-events: none;
  z-index: 5;
}

.crt-glare {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 15%, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
  pointer-events: none;
  z-index: 6;
}

.crt-header {
  font-size: 10px;
  color: #1b8a2e;
  text-shadow: 0 0 2px rgba(27, 138, 46, 0.5);
  margin-bottom: 4px;
}

.crt-status-line {
  font-size: 13px;
  color: #33ff33;
  text-shadow: 0 0 4px rgba(51, 255, 51, 0.6);
  margin-bottom: 12px;
  height: 16px;
  display: flex;
  align-items: center;
}

.crt-status-line.flicker {
  animation: crt-text-flicker 0.15s infinite alternate;
}

.crt-slider-wrapper {
  position: relative;
  height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.crt-track {
  width: 100%;
  height: 4px;
  background: #06200a;
  position: relative;
  border-radius: 1px;
}

.crt-fill {
  position: absolute;
  height: 100%;
  background: #33ff33;
  width: 50%;
  box-shadow: 0 0 6px #33ff33;
}

.crt-thumb {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 16px;
  background: #33ff33;
  box-shadow: 0 0 10px #33ff33;
  z-index: 10;
  cursor: grab;
  animation: crt-cursor-blink 1s infinite steps(2, start);
}

.crt-thumb.active {
  cursor: grabbing;
  animation: none;
  background: #ffffff;
  box-shadow: 0 0 14px #ffffff, 0 0 20px #33ff33;
}

@keyframes crt-cursor-blink {
  to { opacity: 0.2; }
}

@keyframes crt-text-flicker {
  0% { opacity: 0.85; }
  100% { opacity: 1; }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="w-[320px] bg-[#020904] border-[3px] border-[#1a331e] rounded-lg p-3 shadow-2xl font-mono relative select-none">
  <div class="relative bg-[#031005] rounded p-2 overflow-hidden border border-[#122c16]">
    <div class="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-10"></div>
    <div class="text-[10px] text-emerald-700 mb-1">SYS_MONITOR // R-45</div>
    <div class="text-xs text-green-400 drop-shadow-[0_0_4px_rgba(51,255,51,0.6)] mb-3">[SYS_IDLE] VAL: 50.00%</div>
    <div class="relative h-6 flex items-center cursor-pointer">
      <div class="w-full h-1 bg-[#06200a] rounded-sm relative">
        <div class="absolute h-full bg-green-500 w-1/2 shadow-[0_0_6px_#33ff33]"></div>
      </div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-4 bg-green-500 shadow-[0_0_10px_#33ff33] cursor-grab animate-pulse"></div>
    </div>
  </div>
</div>`,
  prompt: `Design a premium "CRT Terminal Slider" range selector. Visuals styled like a monochromatic green phosphor computer terminal display with scanlines. Dragging the thumb block updates logs like [SYS_DRAG] in real-time.`
};
