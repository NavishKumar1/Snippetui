/**
 * Component: Auto-Fit Grid
 * Category: grid-layouts
 */

export const component = {
  id: 'auto-fit-grid',
  name: 'Auto-Fit Grid',
  category: 'grid-layouts',
  tag: 'Premium',
  html: `<div class="autofit-wrapper">
  <div class="autofit-header">
    <h2>Auto-Fit Grid (Stretches)</h2>
    <p>Using <code>grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))</code>. Items stretch to fill available space if there are few items.</p>
  </div>
  
  <div class="autofit-grid">
    <div class="autofit-card">
      <div class="autofit-card-img" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop');"></div>
      <div class="autofit-card-content">
        <h3>Cybernetic Overdrive</h3>
        <p>RPG / Open World</p>
        <button class="autofit-btn">Play Now</button>
      </div>
    </div>
    
    <div class="autofit-card">
      <div class="autofit-card-img" style="background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop');"></div>
      <div class="autofit-card-content">
        <h3>Neon Drifter</h3>
        <p>Racing / Arcade</p>
        <button class="autofit-btn">Play Now</button>
      </div>
    </div>
    
    <div class="autofit-card">
      <div class="autofit-card-img" style="background-image: url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000&auto=format&fit=crop');"></div>
      <div class="autofit-card-content">
        <h3>Stellar Explorer</h3>
        <p>Simulation / Space</p>
        <button class="autofit-btn">Play Now</button>
      </div>
    </div>
  </div>
</div>`,
  js: `// Auto-Fit Grid Logic
// The power of auto-fit is entirely in CSS.
// We can add a simple hover animation logic if we wanted, but CSS handles it well.`,
  ts: `// Auto-Fit Grid Logic (TypeScript)
// Logic handled primarily by CSS Grid.`,
  css: `/* Auto-Fit Grid Styles */
.autofit-wrapper {
  width: 100%;
  padding: 40px;
  background: #0f1115;
  color: #fff;
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 500px;
}

.autofit-header {
  margin-bottom: 30px;
}

.autofit-header h2 {
  font-size: 2rem;
  margin: 0 0 10px 0;
}

.autofit-header p {
  color: #94a3b8;
  margin: 0;
  max-width: 600px;
  line-height: 1.5;
}

.autofit-grid {
  display: grid;
  /* The Magic of Auto-Fit */
  /* This tells the grid to fit as many 280px minimum columns as possible.
     Crucially, with auto-fit, if there is extra space, the columns expand (1fr) to fill it. */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.autofit-card {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #334155;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.autofit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5);
  border-color: #475569;
}

.autofit-card-img {
  width: 100%;
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
}

.autofit-card-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.autofit-card h3 {
  margin: 0 0 4px 0;
  font-size: 1.25rem;
}

.autofit-card p {
  color: #94a3b8;
  margin: 0 0 20px 0;
  font-size: 0.9rem;
}

.autofit-btn {
  margin-top: auto;
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.autofit-btn:hover {
  background: #2563eb;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design and develop a world-class Auto-Fit Grid component. The grid must automatically calculate and fit the maximum number of columns possible without breaking layout consistency.`
};
