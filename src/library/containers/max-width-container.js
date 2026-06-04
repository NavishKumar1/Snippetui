/**
 * Component: Max-Width Container
 * Category: containers
 */

export const component = {
  id: 'max-width-container',
  name: 'Max-Width Container',
  category: 'containers',
  tag: 'Premium',
  html: `<div class="maxw-wrapper">
  <div class="maxw-container">
    <div class="maxw-header">
      <h2>Focus Mode</h2>
      <p>Content remains perfectly readable on ultrawide displays by enforcing a strict maximum width and centering the layout.</p>
    </div>
    
    <div class="maxw-content">
      <article class="maxw-article">
        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" alt="Gaming Setup" class="maxw-featured-img">
        <h3>The Evolution of Gaming Ergonomics</h3>
        <p>As screens get larger and wider, designing interfaces that respect human peripheral vision becomes paramount. Without a max-width constraint, text lines become exhaustingly long on 4K and ultrawide monitors, causing eye strain and poor readability.</p>
        <p>By enforcing a maximum width—typically around 1200px to 1400px—we ensure that paragraphs remain within the optimal 60-80 character line length, drastically improving the user experience for reading dense information.</p>
        
        <div class="maxw-stats">
          <div class="maxw-stat">
            <span class="maxw-stat-value">1200px</span>
            <span class="maxw-stat-label">Optimal Width</span>
          </div>
          <div class="maxw-stat">
            <span class="maxw-stat-value">60-80</span>
            <span class="maxw-stat-label">Characters / Line</span>
          </div>
          <div class="maxw-stat">
            <span class="maxw-stat-value">100%</span>
            <span class="maxw-stat-label">Readability</span>
          </div>
        </div>
      </article>
      
      <aside class="maxw-sidebar">
        <h4>Related Articles</h4>
        <ul class="maxw-links">
          <li><a href="#">Ultrawide UI Design Patterns</a></li>
          <li><a href="#">Typography for 4K Displays</a></li>
          <li><a href="#">Accessibility in Large Layouts</a></li>
          <li><a href="#">The Death of the Full-Bleed Text</a></li>
        </ul>
      </aside>
    </div>
  </div>
</div>`,
  js: `// Max-Width Container Logic
// Generally driven by CSS. We can add a simple script to demonstrate toggling the max-width for preview purposes.

const maxwWrapper = document.querySelector('.maxw-wrapper');
if (maxwWrapper) {
  // Just a visual enhancement for the demo - fade in elements on load
  const elements = maxwWrapper.querySelectorAll('.maxw-header, .maxw-article, .maxw-sidebar');
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + (index * 150));
  });
}`,
  ts: `// Max-Width Container Logic (TypeScript)
const maxwWrapper = document.querySelector<HTMLDivElement>('.maxw-wrapper');

if (maxwWrapper) {
  const elements = maxwWrapper.querySelectorAll<HTMLElement>('.maxw-header, .maxw-article, .maxw-sidebar');
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + (index * 150));
  });
}`,
  css: `/* Max-Width Container Styles */
.maxw-wrapper {
  width: 100%;
  background: #f8fafc; /* Slate 50 */
  padding: 60px 0;
  display: flex;
  justify-content: center;
  font-family: 'Inter', system-ui, sans-serif;
  color: #334155; /* Slate 700 */
}

.maxw-container {
  /* The core constraints */
  width: 100%;
  max-width: 1200px; /* Crucial max-width */
  margin: 0 auto; /* Crucial centering */
  padding: 0 24px; /* Gutters for mobile */
}

.maxw-header {
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
}

.maxw-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 12px 0;
  letter-spacing: -0.02em;
}

.maxw-header p {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0;
  max-width: 800px;
  line-height: 1.6;
}

.maxw-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

@media (min-width: 860px) {
  .maxw-content {
    grid-template-columns: 1fr 300px; /* Main content + sidebar */
  }
}

.maxw-article {
  background: #ffffff;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
}

.maxw-featured-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 24px;
}

.maxw-article h3 {
  font-size: 1.75rem;
  color: #0f172a;
  margin: 0 0 16px 0;
}

.maxw-article p {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #475569;
  margin: 0 0 20px 0;
  max-width: 75ch; /* Optimal line length */
}

.maxw-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid #f1f5f9;
}

.maxw-stat {
  display: flex;
  flex-direction: column;
}

.maxw-stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: #3b82f6; /* Blue 500 */
}

.maxw-stat-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
}

.maxw-sidebar {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  height: fit-content;
}

.maxw-sidebar h4 {
  font-size: 1.125rem;
  color: #0f172a;
  margin: 0 0 16px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #f1f5f9;
}

.maxw-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.maxw-links li {
  margin-bottom: 12px;
}

.maxw-links li:last-child {
  margin-bottom: 0;
}

.maxw-links a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.maxw-links a:hover {
  color: #2563eb;
}

.maxw-links a::before {
  content: '→';
  margin-right: 8px;
  transition: transform 0.2s;
}

.maxw-links a:hover::before {
  transform: translateX(4px);
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a production-ready Max-Width Container component that prevents content from becoming excessively wide on large screens while maintaining optimal readability. Automatically center content.`
};
