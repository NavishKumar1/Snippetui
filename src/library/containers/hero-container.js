/**
 * Component: Hero Container
 * Category: containers
 */

export const component = {
  id: 'hero-container',
  name: 'Hero Container',
  category: 'containers',
  tag: 'Premium',
  html: `<div class="hero-wrapper">
  <!-- Background Image with Overlay -->
  <div class="hero-bg" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop');"></div>
  <div class="hero-overlay"></div>
  
  <div class="hero-container">
    <div class="hero-content">
      <span class="hero-badge">NEW RELEASE</span>
      <h1 class="hero-title">Cybernetic Overdrive</h1>
      <p class="hero-desc">Experience the ultimate next-generation role-playing game. Immerse yourself in a vast, neon-drenched metropolis where every choice shapes your destiny.</p>
      
      <div class="hero-actions">
        <a href="#" class="hero-btn primary">
          <span>Play Now</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </a>
        <a href="#" class="hero-btn secondary">
          <span>Watch Trailer</span>
        </a>
      </div>
      
      <div class="hero-meta">
        <div class="meta-item">
          <strong>98%</strong>
          <span>Positive Reviews</span>
        </div>
        <div class="meta-item">
          <strong>1.2M</strong>
          <span>Active Players</span>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Hero Container Logic
const heroWrapper = document.querySelector('.hero-wrapper');
if (heroWrapper) {
  // Simple parallax effect on mouse move
  heroWrapper.addEventListener('mousemove', (e) => {
    const bg = heroWrapper.querySelector('.hero-bg');
    if (!bg) return;
    
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    // Scale slightly so edges don't show when translating
    bg.style.transform = \`scale(1.05) translate(\${-x}px, \${-y}px)\`;
  });
  
  heroWrapper.addEventListener('mouseleave', () => {
    const bg = heroWrapper.querySelector('.hero-bg');
    if (bg) bg.style.transform = 'scale(1.05) translate(0px, 0px)';
  });
}`,
  ts: `// Hero Container Logic (TypeScript)
const heroWrapper = document.querySelector<HTMLDivElement>('.hero-wrapper');
if (heroWrapper) {
  heroWrapper.addEventListener('mousemove', (e: MouseEvent) => {
    const bg = heroWrapper.querySelector<HTMLDivElement>('.hero-bg');
    if (!bg) return;
    
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    bg.style.transform = \`scale(1.05) translate(\${-x}px, \${-y}px)\`;
  });
  
  heroWrapper.addEventListener('mouseleave', () => {
    const bg = heroWrapper.querySelector<HTMLDivElement>('.hero-bg');
    if (bg) bg.style.transform = 'scale(1.05) translate(0px, 0px)';
  });
}`,
  css: `/* Hero Container Styles */
@import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Rajdhani:wght@400;500;600;700&display=swap');

.hero-wrapper {
  position: relative;
  width: 100%;
  min-height: 80vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #000;
  font-family: 'Rajdhani', sans-serif;
  color: #fff;
}

.hero-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  /* Scale slightly so we have room to parallax without revealing edges */
  transform: scale(1.05);
  transition: transform 0.1s linear;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(
    90deg, 
    rgba(9, 9, 11, 0.9) 0%, 
    rgba(9, 9, 11, 0.7) 40%, 
    rgba(9, 9, 11, 0.2) 100%
  );
  z-index: 2;
}

.hero-container {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px;
}

.hero-content {
  max-width: 650px;
  animation: hero-fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes hero-fade-up {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}

.hero-badge {
  display: inline-block;
  padding: 6px 12px;
  background: rgba(0, 255, 170, 0.1);
  border: 1px solid #00ffaa;
  color: #00ffaa;
  font-weight: 700;
  letter-spacing: 2px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 0.85rem;
}

.hero-title {
  font-family: 'Syncopate', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.1;
  margin: 0 0 24px 0;
  text-transform: uppercase;
  text-shadow: 0 10px 30px rgba(0,0,0,0.5);
  background: linear-gradient(to bottom right, #fff, #a0a0a0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #d4d4d8;
  margin: 0 0 40px 0;
  font-weight: 400;
}

.hero-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.hero-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.hero-btn.primary {
  background: #00ffaa;
  color: #000;
  box-shadow: 0 0 20px rgba(0, 255, 170, 0.4);
}

.hero-btn.primary:hover {
  background: #fff;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
}

.hero-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
}

.hero-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #fff;
}

.hero-meta {
  display: flex;
  gap: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 30px;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-item strong {
  font-size: 1.8rem;
  color: #fff;
  line-height: 1;
  margin-bottom: 5px;
}

.meta-item span {
  font-size: 0.9rem;
  color: #a1a1aa;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .hero-overlay {
    background: linear-gradient(
      to top, 
      rgba(9, 9, 11, 1) 0%, 
      rgba(9, 9, 11, 0.7) 60%, 
      rgba(9, 9, 11, 0.3) 100%
    );
  }
  
  .hero-container {
    padding: 40px 20px;
    display: flex;
    align-items: flex-end;
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a premium Hero Container designed for landing pages and featured games. Support large background images, overlays, gradients, call-to-action sections, and interactive elements while maintaining performance.`
};
