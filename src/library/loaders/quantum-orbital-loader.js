/**
 * Component: Quantum Atomic Orbital Loader
 * Category: loaders
 */

export const component = {
  id: 'quantum-orbital-loader',
  name: 'Quantum Atomic Orbital Loader',
  category: 'loaders',
  tag: 'Premium',
  html: `<div class="quantum-loader-wrapper">
  <div class="quantum-nucleus"></div>
  <div class="quantum-orbit orbit-1">
    <span class="quantum-electron electron-1"></span>
  </div>
  <div class="quantum-orbit orbit-2">
    <span class="quantum-electron electron-2"></span>
  </div>
  <div class="quantum-orbit orbit-3">
    <span class="quantum-electron electron-3"></span>
  </div>
</div>`,
  js: `// Fast spin deceleration on hover
const quantumWrapper = document.querySelector('.quantum-loader-wrapper');
if (quantumWrapper) {
  quantumWrapper.addEventListener('mouseenter', () => {
    const orbits = quantumWrapper.querySelectorAll('.quantum-orbit');
    orbits.forEach(orb => {
      orb.style.animationDuration = '4s';
    });
  });
  
  quantumWrapper.addEventListener('mouseleave', () => {
    const orbits = quantumWrapper.querySelectorAll('.quantum-orbit');
    orbits.forEach(orb => {
      orb.style.animationDuration = '';
    });
  });
}`,
  ts: `// TypeScript Implementation
const quantumWrapper = document.querySelector<HTMLDivElement>('.quantum-loader-wrapper');
if (quantumWrapper) {
  quantumWrapper.addEventListener('mouseenter', () => {
    const orbits = quantumWrapper.querySelectorAll<HTMLDivElement>('.quantum-orbit');
    orbits.forEach(orb => {
      orb.style.animationDuration = '4s';
    });
  });
  
  quantumWrapper.addEventListener('mouseleave', () => {
    const orbits = quantumWrapper.querySelectorAll<HTMLDivElement>('.quantum-orbit');
    orbits.forEach(orb => {
      orb.style.animationDuration = '';
    });
  });
}`,
  css: `/* Quantum Atomic Orbital Loader Styles */
.quantum-loader-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 500px;
}

.quantum-nucleus {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff 0%, #ff007f 60%, transparent 100%);
  box-shadow: 
    0 0 10px #ff007f,
    0 0 20px rgba(255, 0, 127, 0.8);
  z-index: 5;
}

.quantum-orbit {
  position: absolute;
  width: 90px;
  height: 32px;
  border: 1.5px solid rgba(0, 242, 254, 0.2);
  border-radius: 50%;
  transform-style: preserve-3d;
  display: flex;
  align-items: center;
}

.orbit-1 {
  transform: rotateZ(30deg) rotateX(65deg);
  animation: quantum-orbit-spin-1 1.8s linear infinite;
}

.orbit-2 {
  transform: rotateZ(150deg) rotateX(65deg);
  animation: quantum-orbit-spin-2 1.8s linear infinite;
}

.orbit-3 {
  transform: rotateZ(270deg) rotateX(65deg);
  animation: quantum-orbit-spin-3 1.8s linear infinite;
}

.quantum-electron {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 8px #fff, 0 0 15px #00f2fe;
}

.electron-1 { left: 0; }
.electron-2 { left: 0; }
.electron-3 { left: 0; }

@keyframes quantum-orbit-spin-1 {
  0% { transform: rotateZ(30deg) rotateX(65deg) rotateY(0deg); }
  100% { transform: rotateZ(30deg) rotateX(65deg) rotateY(360deg); }
}

@keyframes quantum-orbit-spin-2 {
  0% { transform: rotateZ(150deg) rotateX(65deg) rotateY(0deg); }
  100% { transform: rotateZ(150deg) rotateX(65deg) rotateY(360deg); }
}

@keyframes quantum-orbit-spin-3 {
  0% { transform: rotateZ(270deg) rotateX(65deg) rotateY(0deg); }
  100% { transform: rotateZ(270deg) rotateX(65deg) rotateY(360deg); }
}
`,
  tailwind: `<!-- Tailwind CSS Implementation -->
<div class="relative w-[120px] h-[120px] flex items-center justify-center">
  <div class="w-4 h-4 rounded-full bg-gradient-to-r from-white to-pink-500 shadow-[0_0_10px_#ff007f] z-10 animate-pulse"></div>
  <div class="absolute w-[90px] h-[32px] rounded-full border border-cyan-400/20 rotate-[30deg] skew-x-[65deg] animate-spin"></div>
</div>`,
  prompt: `High-fidelity quantum atomic loader. Inner glowing active nucleus is circled by three multi-axis neon-cyan electron tracks with glowing trace nodes orbiting at 60fps.`
};
