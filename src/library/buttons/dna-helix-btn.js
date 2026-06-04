/**
 * Component: DNA Helix Orbital Button
 * Category: buttons
 */

export const component = {
  id: 'dna-helix-btn',
  name: 'DNA Helix Orbital',
  category: 'buttons',
  tag: 'Creative',
  html: `<button class="dna-helix-btn">
  <div class="dna-capsule-glass"></div>
  <div class="dna-strand-viewport">
    <div class="dna-helix-container">
      <span class="nucleotide node-a" style="--d: 0s; --h: -15px;"></span>
      <span class="nucleotide node-b" style="--d: 0s; --h: 15px;"></span>
      <span class="nucleotide node-a" style="--d: 0.3s; --h: -15px;"></span>
      <span class="nucleotide node-b" style="--d: 0.3s; --h: 15px;"></span>
      <span class="nucleotide node-a" style="--d: 0.6s; --h: -15px;"></span>
      <span class="nucleotide node-b" style="--d: 0.6s; --h: 15px;"></span>
      <span class="nucleotide node-a" style="--d: 0.9s; --h: -15px;"></span>
      <span class="nucleotide node-b" style="--d: 0.9s; --h: 15px;"></span>
      <span class="nucleotide node-a" style="--d: 1.2s; --h: -15px;"></span>
      <span class="nucleotide node-b" style="--d: 1.2s; --h: 15px;"></span>
    </div>
  </div>
  <span class="dna-btn-text">SEQUENCE DNA</span>
</button>`,
  js: `// Interactive DNA strand rotation speedup on cursor hover
const dnaBtn = document.querySelector('.dna-helix-btn');
if (dnaBtn) {
  const nucleotides = dnaBtn.querySelectorAll('.nucleotide');
  
  dnaBtn.addEventListener('mouseenter', () => {
    nucleotides.forEach(node => {
      node.style.animationDuration = '0.7s';
    });
  });

  dnaBtn.addEventListener('mouseleave', () => {
    nucleotides.forEach(node => {
      node.style.animationDuration = '1.8s';
    });
  });
}`,
  ts: `// TypeScript Implementation
const dnaBtn = document.querySelector<HTMLButtonElement>('.dna-helix-btn');
if (dnaBtn) {
  const nucleotides = dnaBtn.querySelectorAll<HTMLSpanElement>('.nucleotide');
  
  dnaBtn.addEventListener('mouseenter', () => {
    nucleotides.forEach(node => {
      node.style.animationDuration = '0.7s';
    });
  });

  dnaBtn.addEventListener('mouseleave', () => {
    nucleotides.forEach(node => {
      node.style.animationDuration = '1.8s';
    });
  });
}`,
  css: `/* DNA Helix Orbital Button Styles */
.dna-helix-btn {
  position: relative;
  background: #020606;
  border: 1.5px solid rgba(0, 242, 254, 0.25);
  padding: 16px 36px;
  border-radius: 100px;
  color: #00ffff;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
  outline: none;
  overflow: hidden;
  box-shadow: 
    0 0 15px rgba(0, 242, 254, 0.1),
    inset 0 0 10px rgba(0, 242, 254, 0.05);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.dna-capsule-glass {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%);
  z-index: 2;
  pointer-events: none;
}

/* 3D DNA Helix background viewport */
.dna-strand-viewport {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.25;
  transition: opacity 0.3s;
  overflow: hidden;
}

.dna-helix-btn:hover .dna-strand-viewport {
  opacity: 0.65;
}

.dna-helix-container {
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 30px;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-around;
  pointer-events: none;
}

.nucleotide {
  position: relative;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  transform-origin: center center;
  animation: dna-rotate 1.8s infinite ease-in-out alternate;
  animation-delay: var(--d);
}

.node-a {
  background: #00f2fe;
  box-shadow: 0 0 8px #00f2fe;
}

.node-b {
  background: #ff007f;
  box-shadow: 0 0 8px #ff007f;
}

@keyframes dna-rotate {
  0% {
    transform: translateY(var(--h)) scale(0.6);
    opacity: 0.3;
  }
  100% {
    transform: translateY(calc(-1 * var(--h))) scale(1.3);
    opacity: 1;
  }
}

.dna-btn-text {
  position: relative;
  z-index: 3;
  color: #00f2fe;
  text-shadow: 
    0 0 5px #00f2fe,
    0 0 10px rgba(0, 242, 254, 0.4);
  transition: all 0.3s;
}

/* Hover effects */
.dna-helix-btn:hover {
  border-color: #ff007f;
  box-shadow: 
    0 0 25px rgba(255, 0, 127, 0.25),
    inset 0 0 15px rgba(255, 0, 127, 0.1);
  transform: translateY(-2px);
}

.dna-helix-btn:hover .dna-btn-text {
  color: #ffffff;
  text-shadow: 
    0 0 5px #ffffff,
    0 0 15px #ff007f;
}

.dna-helix-btn:active {
  transform: translateY(1px);
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<button class="relative bg-[#020606] border border-cyan-500/30 px-9 py-4 rounded-full text-cyan-400 font-bold text-xs tracking-widest cursor-pointer overflow-hidden shadow-[0_0_15px_rgba(0,242,254,0.1)] hover:border-pink-500 hover:shadow-[0_0_25px_rgba(255,0,127,0.25)] transition-all duration-300">
  <span class="relative z-10 [text-shadow:0_0_5px_#00f2fe]">SEQUENCE DNA</span>
</button>`,
  prompt: `Design a premium "DNA Helix Orbital Button". Inside the glass capsule, a three-dimensional double-stranded DNA helix composed of glowing nodes rotates in a continuous orbit, accelerating and changing color (from teal to magenta) on hover.`
};
