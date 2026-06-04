/**
 * Component: Auto-Fill Grid
 * Category: grid-layouts
 */

export const component = {
  id: 'auto-fill-grid',
  name: 'Auto-Fill Grid',
  category: 'grid-layouts',
  tag: 'Premium',
  html: `<div class="autofill-wrapper">
  <div class="autofill-header">
    <h2>Auto-Fill Grid (Maintains Size)</h2>
    <p>Using <code>grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))</code>. Items do NOT stretch indefinitely if there are few items; the grid creates empty tracks instead.</p>
  </div>
  
  <div class="autofill-grid">
    <!-- Generating a few small items -->
    <div class="autofill-item"><div class="autofill-icon">🎮</div><span>Action</span></div>
    <div class="autofill-item"><div class="autofill-icon">🧩</div><span>Puzzle</span></div>
    <div class="autofill-item"><div class="autofill-icon">🏎️</div><span>Racing</span></div>
    <div class="autofill-item"><div class="autofill-icon">⚔️</div><span>RPG</span></div>
    <div class="autofill-item"><div class="autofill-icon">⚽</div><span>Sports</span></div>
    <!-- The grid will leave blank spaces to the right rather than stretching these items huge -->
  </div>
</div>`,
  js: `// Auto-Fill Grid Logic
// Driven by CSS Grid.`,
  ts: `// Auto-Fill Grid Logic (TypeScript)
// Driven by CSS Grid.`,
  css: `/* Auto-Fill Grid Styles */
.autofill-wrapper {
  width: 100%;
  padding: 40px;
  background: #fafafa;
  color: #111;
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 400px;
}

.autofill-header {
  margin-bottom: 30px;
}

.autofill-header h2 {
  font-size: 2rem;
  margin: 0 0 10px 0;
  color: #111827;
}

.autofill-header p {
  color: #4b5563;
  margin: 0;
  max-width: 700px;
  line-height: 1.5;
}

.autofill-grid {
  display: grid;
  /* The Magic of Auto-Fill */
  /* Unlike auto-fit, auto-fill creates implicitly empty tracks if there is extra space.
     This stops a small number of items from stretching to massive, unusable sizes. */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.autofill-item {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.autofill-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  border-color: #d1d5db;
}

.autofill-icon {
  font-size: 32px;
}

.autofill-item span {
  font-weight: 600;
  color: #374151;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a production-ready Auto-Fill Grid system that automatically generates and fills available grid space while maintaining perfect alignment without over-stretching items.`
};
