/**
 * Component: Masonry Grid
 * Category: grid-layouts
 */

export const component = {
  id: 'masonry-grid',
  name: 'Masonry Grid',
  category: 'grid-layouts',
  tag: 'Premium',
  html: `<div class="masonry-wrapper">
  <div class="masonry-header">
    <h2>Community Gallery</h2>
    <p>Discover screenshots and fan art created by players.</p>
  </div>
  
  <div class="masonry-grid">
    <!-- Using CSS Columns for simple masonry without JS calculation overhead -->
    <div class="masonry-item">
      <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop" alt="Gallery Image">
      <div class="masonry-overlay"><span>Neon City Vibes</span></div>
    </div>
    
    <div class="masonry-item">
      <!-- Taller image -->
      <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&h=600&auto=format&fit=crop" alt="Gallery Image">
      <div class="masonry-overlay"><span>Retro Setup</span></div>
    </div>
    
    <div class="masonry-item">
      <img src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=500&h=400&auto=format&fit=crop" alt="Gallery Image">
      <div class="masonry-overlay"><span>Space Exploration</span></div>
    </div>
    
    <div class="masonry-item">
      <!-- Very tall image -->
      <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&h=700&auto=format&fit=crop" alt="Gallery Image">
      <div class="masonry-overlay"><span>VR headset details</span></div>
    </div>
    
    <div class="masonry-item">
      <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&h=300&auto=format&fit=crop" alt="Gallery Image">
      <div class="masonry-overlay"><span>Wide Shot</span></div>
    </div>
    
    <div class="masonry-item">
      <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500&h=500&auto=format&fit=crop" alt="Gallery Image">
      <div class="masonry-overlay"><span>Square crop</span></div>
    </div>
  </div>
</div>`,
  js: `// Masonry Grid Logic
// We are using CSS Multi-column layout for a robust, pure CSS masonry effect.
// No complex JS required for this implementation!`,
  ts: `// Masonry Grid Logic (TypeScript)`,
  css: `/* Masonry Grid Styles */
.masonry-wrapper {
  background: #09090b; /* Zinc 950 */
  color: #fff;
  font-family: 'Inter', sans-serif;
  padding: 60px 20px;
  width: 100%;
}

.masonry-header {
  text-align: center;
  margin-bottom: 40px;
}

.masonry-header h2 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  background: linear-gradient(90deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.masonry-header p {
  color: #a1a1aa;
  font-size: 1.1rem;
}

/* Pure CSS Masonry using column-count */
.masonry-grid {
  max-width: 1400px;
  margin: 0 auto;
  column-count: 4;
  column-gap: 20px;
}

.masonry-item {
  position: relative;
  margin-bottom: 20px; /* Replaces row gap */
  break-inside: avoid; /* Prevents items from breaking across columns */
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  /* Add subtle background for loading state */
  background: #18181b; 
}

.masonry-item img {
  width: 100%;
  height: auto;
  display: block; /* Removes bottom space */
  transition: transform 0.5s ease, filter 0.3s;
}

.masonry-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.masonry-overlay span {
  font-weight: 600;
  font-size: 1.25rem;
  transform: translateY(20px);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.masonry-item:hover img {
  transform: scale(1.05);
  filter: brightness(0.8);
}

.masonry-item:hover .masonry-overlay {
  opacity: 1;
}

.masonry-item:hover .masonry-overlay span {
  transform: translateY(0);
}

/* Responsive Column Adjustments */
@media (max-width: 1200px) {
  .masonry-grid { column-count: 3; }
}

@media (max-width: 900px) {
  .masonry-grid { column-count: 2; }
}

@media (max-width: 500px) {
  .masonry-grid { column-count: 1; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a sophisticated Masonry Grid optimized for mixed-height content without requiring complex JS calculations.`
};
