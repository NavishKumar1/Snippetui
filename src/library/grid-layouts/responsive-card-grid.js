/**
 * Component: Responsive Card Grid
 * Category: grid-layouts
 */

export const component = {
  id: 'responsive-card-grid',
  name: 'Responsive Card Grid',
  category: 'grid-layouts',
  tag: 'Premium',
  html: `<div class="rcg-wrapper">
  <div class="rcg-container">
    <div class="rcg-header">
      <h2>Trending Now</h2>
      <div class="rcg-filters">
        <button class="active">All</button>
        <button>Action</button>
        <button>RPG</button>
        <button>Strategy</button>
      </div>
    </div>
    
    <div class="rcg-grid">
      <!-- Card 1 -->
      <a href="#" class="rcg-card">
        <div class="rcg-card-media">
          <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop" alt="Game">
          <div class="rcg-price">$59.99</div>
        </div>
        <div class="rcg-card-body">
          <div class="rcg-tags">
            <span class="rcg-tag">RPG</span>
            <span class="rcg-tag">Multiplayer</span>
          </div>
          <h3>Cybernetic Overdrive</h3>
          <p>Explore the neon-lit streets in this sprawling open-world adventure.</p>
        </div>
      </a>

      <!-- Card 2 -->
      <a href="#" class="rcg-card">
        <div class="rcg-card-media">
          <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop" alt="Game">
          <div class="rcg-badge">SALE -20%</div>
          <div class="rcg-price"><del>$29.99</del> $23.99</div>
        </div>
        <div class="rcg-card-body">
          <div class="rcg-tags">
            <span class="rcg-tag">Retro</span>
            <span class="rcg-tag">Action</span>
          </div>
          <h3>Arcade Classics</h3>
          <p>The ultimate collection of 80s arcade hits remastered for modern displays.</p>
        </div>
      </a>

      <!-- Card 3 -->
      <a href="#" class="rcg-card">
        <div class="rcg-card-media">
          <img src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop" alt="Game">
          <div class="rcg-price">Free to Play</div>
        </div>
        <div class="rcg-card-body">
          <div class="rcg-tags">
            <span class="rcg-tag">Space</span>
            <span class="rcg-tag">Sim</span>
          </div>
          <h3>Stellar Explorer</h3>
          <p>Chart unknown galaxies and build your empire from the stars.</p>
        </div>
      </a>
      
      <!-- Card 4 -->
      <a href="#" class="rcg-card">
        <div class="rcg-card-media">
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" alt="Game">
          <div class="rcg-badge">NEW UPDATE</div>
          <div class="rcg-price">$19.99</div>
        </div>
        <div class="rcg-card-body">
          <div class="rcg-tags">
            <span class="rcg-tag">VR</span>
            <span class="rcg-tag">Puzzle</span>
          </div>
          <h3>Virtual Horizon</h3>
          <p>Mind-bending puzzles in a fully immersive virtual reality environment.</p>
        </div>
      </a>
    </div>
  </div>
</div>`,
  js: `// Responsive Card Grid Logic
const rcgFilters = document.querySelectorAll('.rcg-filters button');

rcgFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    rcgFilters.forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
    // Logic to filter cards would go here
  });
});`,
  ts: `// Responsive Card Grid Logic (TypeScript)
const rcgFilters = document.querySelectorAll<HTMLButtonElement>('.rcg-filters button');

rcgFilters.forEach(btn => {
  btn.addEventListener('click', () => {
    rcgFilters.forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
  });
});`,
  css: `/* Responsive Card Grid Styles */
.rcg-wrapper {
  background: #0f1115;
  color: #fff;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
}

.rcg-container {
  width: 100%;
  max-width: 1400px;
}

.rcg-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.rcg-header h2 {
  font-size: 2rem;
  margin: 0;
  font-weight: 700;
}

.rcg-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.rcg-filters button {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #a0a0a0;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.rcg-filters button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.rcg-filters button.active {
  background: #fff;
  color: #000;
  border-color: #fff;
}

/* 
  The Core Responsive Grid 
  Uses minmax to ensure cards never get too skinny.
*/
.rcg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.rcg-card {
  display: flex;
  flex-direction: column;
  background: #1a1d24;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
  border: 1px solid transparent;
}

.rcg-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.1);
}

.rcg-card-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.rcg-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.rcg-card:hover .rcg-card-media img {
  transform: scale(1.05);
}

.rcg-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #3b82f6;
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.rcg-price {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
}

.rcg-price del {
  color: #a0a0a0;
  font-size: 0.8rem;
  margin-right: 6px;
}

.rcg-card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.rcg-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.rcg-tag {
  font-size: 0.75rem;
  color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.rcg-card-body h3 {
  margin: 0 0 10px 0;
  font-size: 1.25rem;
  line-height: 1.3;
}

.rcg-card-body p {
  margin: 0;
  color: #a0a0a0;
  font-size: 0.95rem;
  line-height: 1.5;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build a premium Responsive Card Grid designed specifically for gaming platforms. The grid must intelligently resize cards while preserving aspect ratios, visual hierarchy, and readability.`
};
