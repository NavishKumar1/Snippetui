/**
 * Component: Infinite Scroll Grid
 * Category: grid-layouts
 */

export const component = {
  id: 'infinite-scroll-grid',
  name: 'Infinite Scroll Grid',
  category: 'grid-layouts',
  tag: 'Premium',
  html: `<div class="inf-wrapper">
  <div class="inf-header">
    <h2>All Games Repository</h2>
    <p>Scroll down to load more titles from our massive library.</p>
  </div>
  
  <div class="inf-grid" id="inf-grid-container">
    <!-- Initial 8 Cards -->
    <div class="inf-card"><div class="inf-img" style="background-color: #3b82f6;"></div><div class="inf-info"><div class="inf-t">Action RPG</div><div class="inf-s"></div></div></div>
    <div class="inf-card"><div class="inf-img" style="background-color: #10b981;"></div><div class="inf-info"><div class="inf-t">Platformer</div><div class="inf-s"></div></div></div>
    <div class="inf-card"><div class="inf-img" style="background-color: #f59e0b;"></div><div class="inf-info"><div class="inf-t">Strategy</div><div class="inf-s"></div></div></div>
    <div class="inf-card"><div class="inf-img" style="background-color: #ef4444;"></div><div class="inf-info"><div class="inf-t">Shooter</div><div class="inf-s"></div></div></div>
    <div class="inf-card"><div class="inf-img" style="background-color: #8b5cf6;"></div><div class="inf-info"><div class="inf-t">Puzzle</div><div class="inf-s"></div></div></div>
    <div class="inf-card"><div class="inf-img" style="background-color: #ec4899;"></div><div class="inf-info"><div class="inf-t">Racing</div><div class="inf-s"></div></div></div>
    <div class="inf-card"><div class="inf-img" style="background-color: #14b8a6;"></div><div class="inf-info"><div class="inf-t">Sports</div><div class="inf-s"></div></div></div>
    <div class="inf-card"><div class="inf-img" style="background-color: #f97316;"></div><div class="inf-info"><div class="inf-t">Simulation</div><div class="inf-s"></div></div></div>
  </div>
  
  <!-- Loading Indicator / Intersection Observer Target -->
  <div class="inf-loader" id="inf-loader-trigger">
    <div class="inf-spinner"></div>
    <span>Loading more content...</span>
  </div>
</div>`,
  js: `// Infinite Scroll Grid Logic
const grid = document.getElementById('inf-grid-container');
const loader = document.getElementById('inf-loader-trigger');

if (grid && loader) {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
  const titles = ['Adventure', 'Co-op', 'Survival', 'Battle Royale', 'Card Game', 'Rhythm', 'Fighting', 'Stealth'];
  
  let itemCount = 8;
  const maxItems = 40; // Stop loading after this many for the demo
  
  const loadMoreItems = () => {
    if (itemCount >= maxItems) {
      loader.innerHTML = '<span>End of results.</span>';
      return;
    }
    
    // Simulate network delay
    setTimeout(() => {
      // Append 4 new items
      for(let i=0; i<4; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        
        const card = document.createElement('div');
        card.className = 'inf-card';
        card.innerHTML = \`
          <div class="inf-img" style="background-color: \${randomColor};"></div>
          <div class="inf-info">
            <div class="inf-t">\${randomTitle} \${itemCount + 1}</div>
            <div class="inf-s"></div>
          </div>
        \`;
        
        // Add animation class
        card.style.animation = 'infFadeIn 0.5s ease forwards';
        grid.appendChild(card);
        itemCount++;
      }
    }, 800);
  };
  
  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && itemCount < maxItems) {
      loadMoreItems();
    }
  }, { rootMargin: '100px' });
  
  observer.observe(loader);
}`,
  ts: `// Infinite Scroll Grid Logic (TypeScript)
const grid = document.getElementById('inf-grid-container');
const loader = document.getElementById('inf-loader-trigger');

if (grid && loader) {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
  const titles = ['Adventure', 'Co-op', 'Survival', 'Battle Royale', 'Card Game', 'Rhythm', 'Fighting', 'Stealth'];
  
  let itemCount = 8;
  const maxItems = 40;
  
  const loadMoreItems = () => {
    if (itemCount >= maxItems) {
      loader.innerHTML = '<span>End of results.</span>';
      return;
    }
    
    setTimeout(() => {
      for(let i=0; i<4; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        
        const card = document.createElement('div');
        card.className = 'inf-card';
        card.innerHTML = \`
          <div class="inf-img" style="background-color: \${randomColor};"></div>
          <div class="inf-info">
            <div class="inf-t">\${randomTitle} \${itemCount + 1}</div>
            <div class="inf-s"></div>
          </div>
        \`;
        
        card.style.animation = 'infFadeIn 0.5s ease forwards';
        grid.appendChild(card);
        itemCount++;
      }
    }, 800);
  };
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && itemCount < maxItems) {
      loadMoreItems();
    }
  }, { rootMargin: '100px' });
  
  observer.observe(loader);
}`,
  css: `/* Infinite Scroll Grid Styles */
.inf-wrapper {
  background: #121212;
  color: #fff;
  font-family: system-ui, sans-serif;
  padding: 60px 20px;
  width: 100%;
}

.inf-header {
  text-align: center;
  margin-bottom: 40px;
}

.inf-header h2 {
  font-size: 2rem;
  margin: 0 0 10px 0;
}

.inf-header p {
  color: #888;
}

.inf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto 40px;
}

.inf-card {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;
}

.inf-card:hover {
  transform: translateY(-5px);
  background: #252525;
}

.inf-img {
  width: 100%;
  aspect-ratio: 16/9;
  /* Colors provided inline via JS or HTML for demo */
}

.inf-info {
  padding: 16px;
}

.inf-t {
  font-weight: 600;
  margin-bottom: 8px;
}

.inf-s {
  width: 60%;
  height: 8px;
  background: #333;
  border-radius: 4px;
}

@keyframes infFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.inf-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 0;
  color: #888;
  font-size: 0.9rem;
}

.inf-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: infSpin 1s linear infinite;
}

@keyframes infSpin {
  to { transform: rotate(360deg); }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build a next-generation Infinite Scroll Grid capable of handling massive content libraries efficiently. Support automatic content loading via IntersectionObserver and skeleton layouts.`
};
