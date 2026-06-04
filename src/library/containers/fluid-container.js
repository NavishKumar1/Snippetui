/**
 * Component: Fluid Container
 * Category: containers
 */

export const component = {
  id: 'fluid-container',
  name: 'Fluid Container',
  category: 'containers',
  tag: 'Premium',
  html: `<div class="fluid-wrapper">
  <div class="fluid-container">
    <header class="fluid-header">
      <h2 class="fluid-title">Expansive World</h2>
      <p class="fluid-subtitle">Adapts seamlessly to any viewport, edge to edge.</p>
    </header>
    <div class="fluid-grid">
      <div class="fluid-card">
        <div class="fluid-card-img" style="background-image: url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2070&auto=format&fit=crop');"></div>
        <div class="fluid-card-content">
          <h3>Stellar Explorer</h3>
          <p>Journey through procedurally generated galaxies with endless possibilities.</p>
        </div>
      </div>
      <div class="fluid-card">
        <div class="fluid-card-img" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop');"></div>
        <div class="fluid-card-content">
          <h3>Neon Syndicate</h3>
          <p>Navigate the underbelly of a cyberpunk metropolis filled with danger.</p>
        </div>
      </div>
      <div class="fluid-card">
        <div class="fluid-card-img" style="background-image: url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop');"></div>
        <div class="fluid-card-content">
          <h3>Arcade Classics</h3>
          <p>Rediscover the golden era of gaming with authentic retro experiences.</p>
        </div>
      </div>
      <div class="fluid-card">
        <div class="fluid-card-img" style="background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop');"></div>
        <div class="fluid-card-content">
          <h3>Virtual Horizon</h3>
          <p>Immerse yourself in breathtaking VR landscapes and simulations.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Fluid Container Logic
// The container primarily relies on modern CSS (clamp, flex/grid, relative units).
// We can add a simple resize observer just to log or add classes if extreme sizes are reached.

const fluidContainer = document.querySelector('.fluid-container');

if (fluidContainer) {
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry.contentRect.width < 400) {
        fluidContainer.classList.add('compact');
      } else {
        fluidContainer.classList.remove('compact');
      }
    }
  });

  observer.observe(fluidContainer);
}`,
  ts: `// Fluid Container Logic (TypeScript)
const fluidContainer = document.querySelector<HTMLDivElement>('.fluid-container');

if (fluidContainer) {
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (entry.contentRect.width < 400) {
        fluidContainer.classList.add('compact');
      } else {
        fluidContainer.classList.remove('compact');
      }
    }
  });

  observer.observe(fluidContainer);
}`,
  css: `/* Fluid Container Styles */
.fluid-wrapper {
  width: 100%;
  background: #0f172a; /* Slate 900 */
  padding: clamp(20px, 4vw, 60px) 0;
  display: flex;
  justify-content: center;
  font-family: 'Inter', system-ui, sans-serif;
  color: #e2e8f0;
}

.fluid-container {
  /* Fluid width: 95% on mobile, expanding to 90% on larger screens, no strict max-width */
  width: clamp(90%, 95vw, 100%);
  padding: 0 clamp(16px, 3vw, 40px);
}

.fluid-header {
  margin-bottom: clamp(30px, 5vw, 50px);
  text-align: center;
}

.fluid-title {
  /* Fluid typography */
  font-size: clamp(2rem, 5vw + 1rem, 4rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 10px 0;
  background: linear-gradient(135deg, #f8fafc, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.fluid-subtitle {
  font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);
  color: #94a3b8;
  margin: 0;
  max-width: 60ch;
  margin: 0 auto;
}

.fluid-grid {
  display: grid;
  /* Auto-fit grid for fluid wrapping without media queries */
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: clamp(16px, 3vw, 32px);
}

.fluid-card {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  display: flex;
  flex-direction: column;
}

.fluid-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
  background: rgba(30, 41, 59, 1);
  border-color: rgba(255, 255, 255, 0.2);
}

.fluid-card-img {
  width: 100%;
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.fluid-card-content {
  padding: clamp(16px, 2vw, 24px);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.fluid-card-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #f8fafc;
}

.fluid-card-content p {
  margin: 0;
  font-size: 0.95rem;
  color: #cbd5e1;
  line-height: 1.5;
}

/* Optional compact mode tweaks handled by ResizeObserver */
.fluid-container.compact .fluid-card-content {
  padding: 16px;
}
.fluid-container.compact .fluid-title {
  font-size: 2rem;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design and develop a premium Fluid Container component for a modern gaming platform. The container must automatically expand and contract based on available screen space while maintaining consistent spacing, alignment, and readability.`
};
