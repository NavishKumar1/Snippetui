/**
 * SnippetUI - High-Fidelity Boilerplate Templates
 */

export const TEMPLATES = [
  {
    id: 'tailwind-hero',
    name: 'Tailwind Hero Banner',
    description: 'A premium, modern SaaS landing hero banner with glassmorphism, responsive grid, dynamic gradient background, and interactive theme switcher.',
    tailwind: true,
    html: `<!-- Tailwind SaaS Landing Hero Banner -->
<div class="relative min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center overflow-hidden w-full px-6 py-20">
  <!-- Dynamic Glowing Mesh Background -->
  <div class="absolute inset-0 z-0">
    <div class="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse"></div>
    <div class="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-violet-600/10 blur-[120px] animate-pulse" style="animation-delay: 2s;"></div>
  </div>

  <div class="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
    <!-- Accent Badge -->
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-semibold mb-8 animate-bounce">
      <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
      Introducing SnippetUI v2.0
    </div>

    <!-- Main Heading -->
    <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none">
      Design components like a <br/>
      <span class="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">Billion-Dollar Company</span>
    </h1>

    <!-- Subtitle -->
    <p class="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
      A beautiful browser-based sandbox IDE equipped with Monaco code editing, modular exports, variables customizer, and Tailwind Play integration.
    </p>

    <!-- Call to Actions -->
    <div class="flex flex-col sm:flex-row gap-4 items-center mb-16">
      <button class="px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-cyan-500 text-slate-950 font-bold rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/30 hover:scale-105 active:scale-95 transition-all duration-200">
        Start Creating Free
      </button>
      <button class="px-8 py-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 font-semibold rounded-lg hover:bg-slate-800 transition-all duration-200 flex items-center gap-2">
        View Documentation
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>

    <!-- Glassmorphic Dashboard Mockup -->
    <div class="relative w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 shadow-2xl">
      <div class="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
        <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
        <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
        <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
        <span class="text-xs text-slate-500 font-mono ml-2">sandbox-editor-preview.js</span>
      </div>
      <div class="h-48 sm:h-72 rounded-lg bg-slate-950/80 border border-white/5 flex items-center justify-center text-slate-500 font-mono text-sm">
        [Interactive Iframe Live Preview Screen]
      </div>
    </div>
  </div>
</div>`,
    css: `/* Custom overrides for Tailwind template */
@keyframes pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.05); }
}
.animate-pulse {
  animation: pulse 8s infinite ease-in-out;
}`,
    js: `// Interactive Hero Banner Events
console.log('Tailwind Hero Template loaded!');

const mainButton = document.querySelector('button');
if (mainButton) {
  mainButton.addEventListener('click', () => {
    console.log('SaaS CTA Clicked!');
    alert('Welcome to the billion-dollar developer platform!');
  });
}`
  },
  {
    id: 'svg-loader',
    name: 'SVG Animated Loader',
    description: 'An interactive circular progress loader driven by CSS custom properties and JavaScript speed dials.',
    tailwind: false,
    html: `<div class="loader-container">
  <div class="loader-card">
    <div class="svg-wrapper">
      <svg class="progress-ring" width="120" height="120">
        <circle class="progress-ring__circle" stroke="url(#loader-gradient)" stroke-width="8" fill="transparent" r="50" cx="60" cy="60"/>
        <defs>
          <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#00f2fe" />
            <stop offset="100%" stop-color="#9d4edd" />
          </linearGradient>
        </defs>
      </svg>
      <div class="percentage-label" id="loader-percentage">0%</div>
    </div>
    
    <h3 class="loader-title">Circular Progress</h3>
    <p class="loader-subtitle">Adjust the slider below to control speed</p>
    
    <div class="dial-container">
      <input type="range" id="speed-slider" min="1" max="10" value="5" class="speed-dial">
      <div class="speed-badge" id="speed-badge">Speed: 5x</div>
    </div>
  </div>
</div>`,
    css: `:root {
  --loader-bg: #0c0c14;
  --card-bg: #121220;
  --accent-cyan: #00f2fe;
  --border-radius: 16px;
  --transition-speed: 0.3s;
}

body {
  background: var(--loader-bg);
  color: #ffffff;
  font-family: -apple-system, sans-serif;
}

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.loader-card {
  background: var(--card-bg);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 32px;
  text-align: center;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  max-width: 280px;
}

.svg-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring__circle {
  stroke-dasharray: 314.15;
  stroke-dashoffset: 314.15;
  transition: stroke-dashoffset 0.1s ease;
  stroke-linecap: round;
}

.percentage-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
}

.loader-title {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
}

.loader-subtitle {
  margin: 0 0 24px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
}

.dial-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.speed-dial {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
}

.speed-dial::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent-cyan);
  cursor: pointer;
  box-shadow: 0 0 8px var(--accent-cyan);
}

.speed-badge {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent-cyan);
}`,
    js: `// SVG Progress Animation Loop
const circle = document.querySelector('.progress-ring__circle');
const label = document.querySelector('#loader-percentage');
const slider = document.querySelector('#speed-slider');
const badge = document.querySelector('#speed-badge');

const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = circumference;

let progress = 0;
let speed = 5;

function setProgress(percent) {
  const offset = circumference - (percent / 100 * circumference);
  circle.style.strokeDashoffset = offset;
  label.textContent = Math.round(percent) + '%';
}

function tick() {
  progress += (speed * 0.1);
  if (progress > 100) progress = 0;
  setProgress(progress);
  requestAnimationFrame(tick);
}

slider.addEventListener('input', (e) => {
  speed = parseInt(e.target.value);
  badge.textContent = 'Speed: ' + speed + 'x';
});

// Run loop
tick();`
  },
  {
    id: 'glass-card',
    name: 'Glassmorphic Profile Card',
    description: 'A frosted-glass user profile card featuring modern typography, overlay gradients, and interactive social buttons.',
    tailwind: false,
    html: `<div class="bg-wrapper">
  <!-- Glowing backgrounds -->
  <div class="glow-orb orb-1"></div>
  <div class="glow-orb orb-2"></div>
  
  <div class="glass-card">
    <div class="profile-header">
      <div class="profile-avatar">
        <span class="avatar-initials">NK</span>
      </div>
      <h3 class="profile-name">Navish Kumar</h3>
      <p class="profile-role">Senior Product Designer</p>
    </div>
    
    <div class="profile-stats">
      <div class="stat-item">
        <span class="stat-val">24</span>
        <span class="stat-lbl">Snippets</span>
      </div>
      <div class="stat-item">
        <span class="stat-val">840</span>
        <span class="stat-lbl">Followers</span>
      </div>
    </div>
    
    <div class="profile-actions">
      <button class="profile-btn follow">Follow Designer</button>
      <button class="profile-btn message">Message</button>
    </div>
  </div>
</div>`,
    css: `:root {
  --glow-1: #00f2fe;
  --glow-2: #8a2be2;
  --radius-card: 20px;
}

body {
  margin: 0;
  background: #06060c;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.bg-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.glow-orb {
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
}

.orb-1 {
  background: var(--glow-1);
  top: 25%;
  left: 35%;
}

.orb-2 {
  background: var(--glow-2);
  bottom: 25%;
  right: 35%;
}

.glass-card {
  position: relative;
  z-index: 2;
  width: 300px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-card);
  padding: 32px 24px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--glow-1), var(--glow-2));
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 242, 254, 0.3);
}

.avatar-initials {
  font-size: 24px;
  font-weight: 800;
  color: #0c0c14;
}

.profile-name {
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 700;
}

.profile-role {
  margin: 0 0 24px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.profile-stats {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 16px 0;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-val {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
}

.stat-lbl {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 2px;
}

.profile-actions {
  display: flex;
  gap: 12px;
}

.profile-btn {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.profile-btn.follow {
  background: #ffffff;
  color: #0c0c14;
}

.profile-btn.follow:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
}

.profile-btn.message {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-btn.message:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}`,
    js: `// Glassmorphic Card Interaction
console.log('Glass Card Template loaded!');

const followBtn = document.querySelector('.profile-btn.follow');
if (followBtn) {
  let isFollowing = false;
  followBtn.addEventListener('click', () => {
    isFollowing = !isFollowing;
    followBtn.textContent = isFollowing ? 'Following' : 'Follow Designer';
    followBtn.style.background = isFollowing ? '#00f2fe' : '#ffffff';
    followBtn.style.color = '#0c0c14';
    console.log('Follow state toggle:', isFollowing);
  });
}`
  },
  {
    id: 'ripple-btn',
    name: 'Ripple Effect Button',
    description: 'A button driven by mouse coordinates using CSS custom properties to render dynamic ripples on click.',
    tailwind: false,
    html: `<div class="container">
  <button class="ripple-button" id="btn-ripple">
    <span>Click Me For Ripple</span>
  </button>
</div>`,
    css: `:root {
  --btn-width: 220px;
  --btn-height: 54px;
  --ripple-size: 0px;
  --ripple-x: 0px;
  --ripple-y: 0px;
}

body {
  margin: 0;
  background: #050508;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: -apple-system, sans-serif;
}

.ripple-button {
  position: relative;
  width: var(--btn-width);
  height: var(--btn-height);
  border: none;
  outline: none;
  background: linear-gradient(135deg, #7b2cbf, #3c096c);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(123, 44, 191, 0.3);
  transition: transform 0.15s, box-shadow 0.15s;
}

.ripple-button:hover {
  box-shadow: 0 10px 24px rgba(123, 44, 191, 0.4);
}

.ripple-button:active {
  transform: scale(0.98);
}

/* Ripple Layer */
.ripple-button::before {
  content: '';
  position: absolute;
  top: var(--ripple-y);
  left: var(--ripple-x);
  width: var(--ripple-size);
  height: var(--ripple-size);
  background: rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
}

.ripple-button.animating::before {
  animation: ripple-grow 0.6s cubic-bezier(0.1, 0.8, 0.3, 1);
}

@keyframes ripple-grow {
  from {
    opacity: 1;
    width: 0px;
    height: 0px;
  }
  to {
    opacity: 0;
    width: calc(var(--btn-width) * 2.5);
    height: calc(var(--btn-width) * 2.5);
  }
}`,
    js: `// Button Ripple Coordinates Listener
const button = document.getElementById('btn-ripple');

if (button) {
  button.addEventListener('click', (e) => {
    // Get mouse coordinates relative to button bounds
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set custom CSS variables
    button.style.setProperty('--ripple-x', x + 'px');
    button.style.setProperty('--ripple-y', y + 'px');

    // Trigger animation class
    button.classList.remove('animating');
    void button.offsetWidth; // Force CSS reflow
    button.classList.add('animating');
    
    console.log('Ripple triggered at coordinates:', { x, y });
  });
}`
  }
];
