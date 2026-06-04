/**
 * Component: Featured Content Grid
 * Category: grid-layouts
 */

export const component = {
  id: 'featured-content-grid',
  name: 'Featured Content Grid',
  category: 'grid-layouts',
  tag: 'Premium',
  html: `<div class="fcg-wrapper">
  <div class="fcg-container">
    <div class="fcg-header">
      <h2>Featured Releases</h2>
    </div>
    
    <div class="fcg-grid">
      <!-- Primary Feature -->
      <div class="fcg-item fcg-primary">
        <div class="fcg-bg" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop');"></div>
        <div class="fcg-overlay"></div>
        <div class="fcg-content">
          <span class="fcg-label">OUT NOW</span>
          <h3>Cybernetic Overdrive</h3>
          <p>The highly anticipated sequel is finally here. Experience the neon metropolis in stunning 4K.</p>
          <button class="fcg-btn">Explore Game</button>
        </div>
      </div>
      
      <!-- Secondary Features -->
      <div class="fcg-item">
        <div class="fcg-bg" style="background-image: url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop');"></div>
        <div class="fcg-overlay"></div>
        <div class="fcg-content">
          <span class="fcg-label fcg-label-alt">EXPANSION</span>
          <h3>Arcade Classics Vol 2</h3>
        </div>
      </div>
      
      <div class="fcg-item">
        <div class="fcg-bg" style="background-image: url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop');"></div>
        <div class="fcg-overlay"></div>
        <div class="fcg-content">
          <span class="fcg-label fcg-label-alt">EARLY ACCESS</span>
          <h3>Stellar Explorer</h3>
        </div>
      </div>
      
      <div class="fcg-item fcg-span-2">
        <div class="fcg-bg" style="background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop');"></div>
        <div class="fcg-overlay"></div>
        <div class="fcg-content">
          <span class="fcg-label">VR EXCLUSIVE</span>
          <h3>Virtual Horizon: The Ascent</h3>
          <p>Pushing the boundaries of virtual reality.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Featured Content Grid Logic
// Interaction logic for elegant hover states is handled by CSS, 
// but we can add parallax if desired.`,
  ts: `// Featured Content Grid Logic (TypeScript)
// Interaction logic handled by CSS.`,
  css: `/* Featured Content Grid Styles */
.fcg-wrapper {
  background: #000;
  color: #fff;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
}

.fcg-container {
  width: 100%;
  max-width: 1400px;
}

.fcg-header {
  margin-bottom: 30px;
}

.fcg-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* The Core Grid */
.fcg-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 300px 300px;
  gap: 20px;
}

/* Grid Cell Definitions */
.fcg-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.fcg-primary {
  grid-column: span 2;
  grid-row: span 2;
}

.fcg-span-2 {
  grid-column: span 2;
}

/* Backgrounds & Overlays */
.fcg-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1;
}

.fcg-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%);
  z-index: 2;
  transition: background 0.3s;
}

/* Interactions */
.fcg-item:hover .fcg-bg {
  transform: scale(1.05);
}

.fcg-item:hover .fcg-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%);
}

/* Content */
.fcg-content {
  position: relative;
  z-index: 3;
  padding: 30px;
  transform: translateY(10px);
  transition: transform 0.3s;
}

.fcg-item:hover .fcg-content {
  transform: translateY(0);
}

.fcg-label {
  display: inline-block;
  background: #ff3366;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.fcg-label-alt {
  background: #33ccff;
  color: #000;
}

.fcg-item h3 {
  margin: 0 0 10px 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.fcg-primary h3 {
  font-size: 2.5rem;
}

.fcg-item p {
  color: #ccc;
  font-size: 1rem;
  margin: 0 0 20px 0;
  max-width: 400px;
  line-height: 1.5;
  
  /* Hide paragraphs on non-primary items by default if we want cleaner look */
}

.fcg-btn {
  background: #fff;
  color: #000;
  border: none;
  padding: 12px 24px;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s 0.1s; /* Delayed entrance */
}

.fcg-primary:hover .fcg-btn {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .fcg-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    /* Let rows determine their height or keep a fixed height */
  }
  .fcg-item {
    height: 300px; /* Base height for all when stacked */
  }
  .fcg-primary {
    height: 400px;
  }
}

@media (max-width: 600px) {
  .fcg-grid {
    grid-template-columns: 1fr;
  }
  .fcg-primary, .fcg-span-2 {
    grid-column: span 1;
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a cinematic Featured Content Grid inspired by Netflix and Epic Games. The grid should prioritize featured items through intelligent sizing, visual hierarchy, and content emphasis.`
};
