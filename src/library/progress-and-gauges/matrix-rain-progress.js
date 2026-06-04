/**
 * Component: Matrix Rain Progress
 * Category: progress-and-gauges
 */

export const component = {
  id: 'matrix-rain-progress',
  name: 'Matrix Rain Progress',
  category: 'progress-and-gauges',
  tag: 'Stunning',
  html: `<div class="matrix-progress-sandbox" id="matrix-progress-sandbox-container">
  <div class="matrix-wrapper">
    <canvas class="matrix-canvas"></canvas>
    <div class="matrix-info">
      <span class="matrix-title">DECRYPTION MODULE</span>
      <span class="matrix-val">0%</span>
    </div>
  </div>
  
  <div class="matrix-controls">
    <input type="range" class="matrix-slider" min="0" max="100" value="60" />
  </div>
</div>`,
  js: `// Matrix Rain Progress Canvas Animation Logic
const container = document.querySelector('.matrix-progress-sandbox');
if (container) {
  const canvas = container.querySelector('.matrix-canvas');
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.matrix-slider');
  const valLabel = container.querySelector('.matrix-val');
  
  let animId = null;
  let currentVal = 0;
  let targetVal = parseInt(slider.value, 10);
  let streams = [];
  
  canvas.width = 280;
  canvas.height = 80;
  
  const fontSize = 8;
  const cols = Math.floor(canvas.width / fontSize);
  
  class MatrixStream {
    constructor(x) {
      this.x = x;
      this.y = Math.random() * -100;
      this.speed = Math.random() * 2 + 1;
      this.chars = [];
      this.length = Math.floor(Math.random() * 8 + 4);
      
      for (let i = 0; i < this.length; i++) {
        this.chars.push(Math.random() < 0.5 ? '0' : '1');
      }
    }
    
    update() {
      this.y += this.speed;
      if (this.y - this.length * fontSize > canvas.height) {
        this.y = Math.random() * -20;
        this.speed = Math.random() * 2 + 1;
      }
      
      // Mutate chars ambiently
      if (Math.random() < 0.1) {
        const index = Math.floor(Math.random() * this.length);
        this.chars[index] = Math.random() < 0.5 ? '0' : '1';
      }
    }
    
    draw(activeWidth) {
      if (this.x > activeWidth) return; // Only draw inside active progress bar viewport
      
      ctx.save();
      ctx.font = '7px monospace';
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#00ff41';
      
      for (let i = 0; i < this.length; i++) {
        const charY = this.y - i * fontSize;
        if (charY < 0 || charY > canvas.height) continue;
        
        // The leading character is bright white, trailing ones fade from green to dark green
        if (i === 0) {
          ctx.fillStyle = '#ffffff';
        } else {
          const alpha = 1.0 - (i / this.length);
          ctx.fillStyle = \`rgba(0, 255, 65, \${alpha})\`;
        }
        
        ctx.fillText(this.chars[i], this.x, charY);
      }
      ctx.restore();
    }
  }
  
  // Initialize streams
  for (let i = 0; i < cols; i++) {
    streams.push(new MatrixStream(i * fontSize + 2));
  }
  
  const animate = () => {
    if (!canvas.isConnected) {
      cancelAnimationFrame(animId);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const w = canvas.width;
    const h = canvas.height;
    
    // Smooth value interpolation
    currentVal += (targetVal - currentVal) * 0.12;
    valLabel.textContent = \`\${Math.round(currentVal)}%\`;
    
    const barH = 20;
    const barY = h / 2 - barH / 2 + 10;
    const activeW = w * (currentVal / 100);
    
    // 1. Draw outer ambient frame
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 255, 65, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(0, barY, w, barH, 4) : ctx.rect(0, barY, w, barH);
    ctx.stroke();
    ctx.restore();
    
    // 2. Draw matrix viewport in clipping mask
    ctx.save();
    ctx.beginPath();
    ctx.roundRect ? ctx.roundRect(1, barY + 1, w - 2, barH - 2, 3) : ctx.rect(1, barY + 1, w - 2, barH - 2);
    ctx.clip();
    
    // Render streams behind active region
    streams.forEach(stream => {
      stream.update();
      stream.draw(activeW);
    });
    
    ctx.restore();
    
    // 3. Draw active glowing vertical slice boundary line
    if (activeW > 2 && activeW < w - 2) {
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.0;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00ff41';
      ctx.beginPath();
      ctx.moveTo(activeW, barY);
      ctx.lineTo(activeW, barY + barH);
      ctx.stroke();
      ctx.restore();
    }
    
    animId = requestAnimationFrame(animate);
  };
  
  slider.addEventListener('input', () => {
    targetVal = parseInt(slider.value, 10);
  });
  
  animate();
}`,
  ts: `// TypeScript Implementation
const container = document.querySelector('.matrix-progress-sandbox') as HTMLDivElement | null;
if (container) {
  const canvas = container.querySelector('.matrix-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const slider = container.querySelector('.matrix-slider') as HTMLInputElement;
  const valLabel = container.querySelector('.matrix-val') as HTMLSpanElement;
  
  if (ctx) {
    let animId: number;
    let currentVal = 0;
    let targetVal = parseInt(slider.value, 10);
    let streams: MatrixStream[] = [];
    
    canvas.width = 280;
    canvas.height = 80;
    
    const fontSize = 8;
    const cols = Math.floor(canvas.width / fontSize);
    
    class MatrixStream {
      x: number; y: number; speed: number; chars: string[]; length: number;
      constructor(x: number) {
        this.x = x;
        this.y = Math.random() * -100;
        this.speed = Math.random() * 2 + 1;
        this.chars = [];
        this.length = Math.floor(Math.random() * 8 + 4);
        
        for (let i = 0; i < this.length; i++) {
          this.chars.push(Math.random() < 0.5 ? '0' : '1');
        }
      }
      
      update() {
        this.y += this.speed;
        if (this.y - this.length * fontSize > canvas.height) {
          this.y = Math.random() * -20;
          this.speed = Math.random() * 2 + 1;
        }
        
        if (Math.random() < 0.1) {
          const index = Math.floor(Math.random() * this.length);
          this.chars[index] = Math.random() < 0.5 ? '0' : '1';
        }
      }
      
      draw(activeWidth: number) {
        if (this.x > activeWidth || !ctx) return;
        
        ctx.save();
        ctx.font = '7px monospace';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#00ff41';
        
        for (let i = 0; i < this.length; i++) {
          const charY = this.y - i * fontSize;
          if (charY < 0 || charY > canvas.height) continue;
          
          if (i === 0) {
            ctx.fillStyle = '#ffffff';
          } else {
            const alpha = 1.0 - (i / this.length);
            ctx.fillStyle = \`rgba(0, 255, 65, \${alpha})\`;
          }
          
          ctx.fillText(this.chars[i], this.x, charY);
        }
        ctx.restore();
      }
    }
    
    for (let i = 0; i < cols; i++) {
      streams.push(new MatrixStream(i * fontSize + 2));
    }
    
    const animate = () => {
      if (!canvas.isConnected) {
        cancelAnimationFrame(animId);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      
      currentVal += (targetVal - currentVal) * 0.12;
      valLabel.textContent = \`\${Math.round(currentVal)}%\`;
      
      const barH = 20;
      const barY = h / 2 - barH / 2 + 10;
      const activeW = w * (currentVal / 100);
      
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if ('roundRect' in ctx) {
        (ctx as any).roundRect(0, barY, w, barH, 4);
      } else {
        ctx.rect(0, barY, w, barH);
      }
      ctx.stroke();
      ctx.restore();
      
      ctx.save();
      ctx.beginPath();
      if ('roundRect' in ctx) {
        (ctx as any).roundRect(1, barY + 1, w - 2, barH - 2, 3);
      } else {
        ctx.rect(1, barY + 1, w - 2, barH - 2);
      }
      ctx.clip();
      
      streams.forEach(stream => {
        stream.update();
        stream.draw(activeW);
      });
      
      ctx.restore();
      
      if (activeW > 2 && activeW < w - 2) {
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.0;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff41';
        ctx.beginPath();
        ctx.moveTo(activeW, barY);
        ctx.lineTo(activeW, barY + barH);
        ctx.stroke();
        ctx.restore();
      }
      
      animId = requestAnimationFrame(animate);
    };
    
    slider.addEventListener('input', () => {
      targetVal = parseInt(slider.value, 10);
    });
    
    animate();
  }
}`,
  css: `/* Matrix Rain Progress styles */
.matrix-progress-sandbox {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 250px;
  background: radial-gradient(circle at center, #010e04 0%, #000201 100%);
  border: 1px solid rgba(0, 255, 65, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}

.matrix-wrapper {
  position: relative;
  width: 280px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.matrix-canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.matrix-info {
  position: absolute;
  top: -12px;
  left: 6px;
  display: flex;
  flex-direction: column;
  pointer-events: none;
  z-index: 10;
}

.matrix-title {
  font-family: monospace;
  font-size: 7.5px;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 1.5px;
}

.matrix-val {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #00ff41;
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
  margin-top: 2px;
}

.matrix-controls {
  width: 100%;
  max-width: 160px;
  margin-top: 32px;
}

.matrix-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  outline: none;
}

.matrix-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00ff41;
  border: 2px solid #010e04;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 255, 65, 0.5);
  transition: transform 0.15s;
}

.matrix-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
`,
  tailwind: `<div class="relative w-full max-w-[420px] h-[250px] bg-gradient-to-b from-[#010e04] to-[#000201] border border-green-500/10 rounded-2xl flex flex-col items-center justify-center p-4 box-border overflow-hidden" id="matrix-progress-sandbox-container">
  <div class="relative w-[280px] h-[80px] flex items-center justify-center">
    <canvas class="matrix-canvas absolute inset-0"></canvas>
    <div class="absolute -top-3 left-1.5 flex flex-col pointer-events-none z-10">
      <span class="font-mono text-[7.5px] text-white/25 tracking-widest">DECRYPTION MODULE</span>
      <span class="matrix-val font-sans text-sm font-extrabold text-[#00ff41] drop-shadow-[0_0_10px_rgba(0,255,65,0.5)] mt-0.5">0%</span>
    </div>
  </div>
  
  <div class="w-full max-w-[160px] mt-8">
    <input type="range" class="matrix-slider w-full h-1 bg-white/5 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00ff41] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#010e04] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-120" min="0" max="100" value="60" />
  </div>
</div>`,
  prompt: 'Design a landscape digital binary matrix rain progress bar component, masking falling code streams in active regions and outlining white cyber split boundaries.'
};
