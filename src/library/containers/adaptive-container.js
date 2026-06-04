/**
 * Component: Adaptive Container
 * Category: containers
 */

export const component = {
  id: 'adaptive-container',
  name: 'Adaptive Container',
  category: 'containers',
  tag: 'Premium',
  html: `<div class="adapt-wrapper">
  <div class="adapt-container">
    <div class="adapt-header">
      <h2>Intelligent Adaptation</h2>
      <p>This container changes its fundamental layout structure based on breakpoints, switching from stacked to masonry to grid.</p>
    </div>
    
    <div class="adapt-layout">
      <div class="adapt-box adapt-featured">
        <div class="adapt-tag">FEATURED</div>
        <h3>The Great Convergence</h3>
        <p>A deep dive into how platforms are merging.</p>
      </div>
      
      <div class="adapt-box adapt-tall">
        <div class="adapt-tag">ANALYSIS</div>
        <h3>Market Shifts</h3>
        <p>Analyzing the trends of the last decade.</p>
      </div>
      
      <div class="adapt-box">
        <div class="adapt-tag">NEWS</div>
        <h3>Update 2.4 Live</h3>
        <p>Patch notes and upcoming changes.</p>
      </div>
      
      <div class="adapt-box">
        <div class="adapt-tag">COMMUNITY</div>
        <h3>Top 10 Highlights</h3>
        <p>User submitted clips of the week.</p>
      </div>
      
      <div class="adapt-box adapt-wide">
        <div class="adapt-tag">INTERVIEW</div>
        <h3>Behind the Scenes</h3>
        <p>Exclusive talk with the lead developers.</p>
      </div>
    </div>
  </div>
</div>`,
  js: `// Adaptive Container Logic
// We can use JS to actively monitor container width (not just viewport) using ResizeObserver, 
// allowing the component to adapt even if placed inside a smaller parent.

const adaptContainer = document.querySelector('.adapt-container');
const adaptLayout = document.querySelector('.adapt-layout');

if (adaptContainer && adaptLayout) {
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      const w = entry.contentRect.width;
      
      // Remove all size classes
      adaptLayout.classList.remove('layout-small', 'layout-medium', 'layout-large');
      
      // Add appropriate class based on container width
      if (w < 600) {
        adaptLayout.classList.add('layout-small');
      } else if (w < 1000) {
        adaptLayout.classList.add('layout-medium');
      } else {
        adaptLayout.classList.add('layout-large');
      }
    }
  });

  observer.observe(adaptContainer);
}`,
  ts: `// Adaptive Container Logic (TypeScript)
const adaptContainer = document.querySelector<HTMLDivElement>('.adapt-container');
const adaptLayout = document.querySelector<HTMLDivElement>('.adapt-layout');

if (adaptContainer && adaptLayout) {
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      const w = entry.contentRect.width;
      
      adaptLayout.classList.remove('layout-small', 'layout-medium', 'layout-large');
      
      if (w < 600) {
        adaptLayout.classList.add('layout-small');
      } else if (w < 1000) {
        adaptLayout.classList.add('layout-medium');
      } else {
        adaptLayout.classList.add('layout-large');
      }
    }
  });

  observer.observe(adaptContainer);
}`,
  css: `/* Adaptive Container Styles */
.adapt-wrapper {
  width: 100%;
  background: #121212;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  font-family: 'Outfit', system-ui, sans-serif;
  color: #fff;
  box-sizing: border-box;
}

.adapt-container {
  width: 100%;
  max-width: 1400px;
}

.adapt-header {
  margin-bottom: 30px;
}

.adapt-header h2 {
  font-size: 2.5rem;
  margin: 0 0 10px 0;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.adapt-header p {
  color: #a0a0a0;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0;
}

/* Base layout (Mobile first fallback, though JS handles classes) */
.adapt-layout {
  display: grid;
  gap: 20px;
  /* Default to a single column */
  grid-template-columns: 1fr;
  transition: all 0.5s ease;
}

.adapt-box {
  background: #1e1e1e;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid #333;
  transition: transform 0.3s, background 0.3s;
  min-height: 200px;
}

.adapt-box:hover {
  transform: translateY(-4px);
  background: #252525;
  border-color: #e52e71;
}

.adapt-tag {
  align-self: flex-start;
  background: rgba(229, 46, 113, 0.2);
  color: #e52e71;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: auto;
}

.adapt-box h3 {
  margin: 15px 0 8px 0;
  font-size: 1.5rem;
}

.adapt-box p {
  margin: 0;
  color: #888;
  font-size: 0.95rem;
}

/* 
  Container-Query-like classes applied via JS ResizeObserver.
  This makes the component adaptive regardless of viewport size!
*/

.layout-small {
  grid-template-columns: 1fr;
}

.layout-medium {
  grid-template-columns: repeat(2, 1fr);
}
.layout-medium .adapt-featured {
  grid-column: span 2;
  min-height: 300px;
}
.layout-medium .adapt-wide {
  grid-column: span 2;
}

.layout-large {
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(150px, auto);
}
.layout-large .adapt-featured {
  grid-column: span 2;
  grid-row: span 2;
  min-height: auto;
}
.layout-large .adapt-tall {
  grid-row: span 2;
}
.layout-large .adapt-wide {
  grid-column: span 2;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build an intelligent Adaptive Container that dynamically adjusts its layout, spacing, alignment, and dimensions according to screen size, device type, and content requirements.`
};
