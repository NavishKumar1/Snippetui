/**
 * Component: Magazine Grid
 * Category: grid-layouts
 */

export const component = {
  id: 'magazine-grid',
  name: 'Magazine Grid',
  category: 'grid-layouts',
  tag: 'Premium',
  html: `<div class="mag-wrapper">
  <div class="mag-container">
    <div class="mag-header">
      <h2>The Daily Read</h2>
      <p>Curated stories from the edge of the digital frontier.</p>
    </div>
    
    <div class="mag-grid">
      <!-- Lead Story -->
      <article class="mag-lead">
        <div class="mag-img" style="background-image: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop');"></div>
        <div class="mag-content">
          <span class="mag-category">Editorial</span>
          <h3>The Death of the physical console: Why streaming is inevitable.</h3>
          <p>As internet infrastructure improves globally, the concept of a physical box under your TV is rapidly becoming an anachronism. We spoke with industry leaders about the upcoming shift.</p>
          <div class="mag-meta">By Sarah Jenkins • 8 min read</div>
        </div>
      </article>

      <!-- Side Column Stories -->
      <div class="mag-side-col">
        <article class="mag-secondary">
          <div class="mag-img" style="background-image: url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop');"></div>
          <div class="mag-content">
            <span class="mag-category">Review</span>
            <h4>Arcade Classics: A hit of pure nostalgia</h4>
          </div>
        </article>
        
        <article class="mag-secondary">
          <div class="mag-img" style="background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop');"></div>
          <div class="mag-content">
            <span class="mag-category">Hardware</span>
            <h4>The new VR headset changes everything</h4>
          </div>
        </article>
      </div>

      <!-- Bottom Row Stories -->
      <article class="mag-tertiary">
        <span class="mag-category">Esports</span>
        <h4>Championship Finals break all concurrent viewership records</h4>
        <div class="mag-meta">2 hours ago</div>
      </article>

      <article class="mag-tertiary">
        <span class="mag-category">Culture</span>
        <h4>How speedrunners broke the unbreakable game in just 3 days</h4>
        <div class="mag-meta">5 hours ago</div>
      </article>

      <article class="mag-tertiary">
        <span class="mag-category">Interview</span>
        <h4>Hideo talks about his next bizarre project</h4>
        <div class="mag-meta">Yesterday</div>
      </article>
    </div>
  </div>
</div>`,
  js: `// Magazine Grid Logic
// The complex layout is achieved via CSS Grid Areas or spanning.`,
  ts: `// Magazine Grid Logic (TypeScript)`,
  css: `/* Magazine Grid Styles */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@400;700&display=swap');

.mag-wrapper {
  background: #fdfdfc;
  color: #1a1a1a;
  font-family: 'Lato', sans-serif;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
}

.mag-container {
  width: 100%;
  max-width: 1200px;
}

.mag-header {
  border-bottom: 2px solid #1a1a1a;
  padding-bottom: 20px;
  margin-bottom: 40px;
  text-align: center;
}

.mag-header h2 {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 10px 0;
  letter-spacing: -1px;
}

.mag-header p {
  color: #666;
  font-style: italic;
  margin: 0;
  font-size: 1.1rem;
}

/* The Magazine Grid Layout */
.mag-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 30px;
}

/* 
  Lead Story spans 2 columns.
  Secondary column takes the 3rd.
  Tertiary stories span 1 column each on the next row.
*/
.mag-lead {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
}

.mag-side-col {
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.mag-tertiary {
  grid-column: span 1;
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
}

/* Shared Elements */
.mag-img {
  width: 100%;
  background-size: cover;
  background-position: center;
  margin-bottom: 20px;
  transition: transform 0.5s ease;
}

.mag-category {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  color: #d32f2f;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.mag-meta {
  font-size: 0.85rem;
  color: #888;
  margin-top: 15px;
}

/* Specifics */
.mag-lead .mag-img {
  aspect-ratio: 16/9;
}

.mag-lead h3 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  line-height: 1.1;
  margin: 0 0 15px 0;
}

.mag-lead p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  margin: 0;
}

.mag-secondary .mag-img {
  aspect-ratio: 3/2;
}

.mag-secondary h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 0;
}

.mag-tertiary h4 {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
}

/* Hover Effects (Subtle, editorial style) */
article {
  cursor: pointer;
}

article:hover h3, 
article:hover h4 {
  color: #d32f2f;
}

.mag-lead:hover .mag-img,
.mag-secondary:hover .mag-img {
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 900px) {
  .mag-grid {
    grid-template-columns: 1fr;
  }
  .mag-lead, .mag-side-col, .mag-tertiary {
    grid-column: span 1;
  }
  .mag-lead h3 {
    font-size: 2rem;
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a premium Magazine Grid layout optimized for news, articles, and editorial experiences. Support varying card sizes and maintain visual balance regardless of content length using a newspaper/editorial aesthetic.`
};
