/**
 * Component: Content Container
 * Category: containers
 */

export const component = {
  id: 'content-container',
  name: 'Content Container',
  category: 'containers',
  tag: 'Premium',
  html: `<div class="content-wrapper">
  <main class="content-container">
    <header class="content-header">
      <div class="content-meta">
        <span class="content-category">Design Engineering</span>
        <span class="content-date">October 24, 2026</span>
      </div>
      <h1 class="content-title">The Art of Spacing: Designing for Readability</h1>
      <p class="content-lead">A comprehensive guide to utilizing white space, line height, and typography scales to create beautiful reading experiences.</p>
      
      <div class="content-author">
        <img src="https://i.pravatar.cc/150?img=68" alt="Author" class="author-avatar">
        <div class="author-info">
          <strong>Elena Rodriguez</strong>
          <span>Lead UX Researcher</span>
        </div>
      </div>
    </header>

    <div class="content-body">
      <p>When designing a <em>content container</em> optimized for long-form reading, the primary goal is to reduce cognitive load. Readers shouldn't have to work hard to track from the end of one line to the beginning of the next.</p>
      
      <h2>Optimal Line Length</h2>
      <p>The ideal line length for text is universally considered to be between <strong>45 and 75 characters</strong> per line (including spaces and punctuation). Our container restricts the width of text blocks while allowing images and pull-quotes to break out.</p>
      
      <figure class="content-breakout-img">
        <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop" alt="Clean workspace">
        <figcaption>A clean workspace reflects a clean layout.</figcaption>
      </figure>
      
      <h2>Typography Hierarchy</h2>
      <p>Establishing a clear visual hierarchy helps readers scan content efficiently. Notice how headings stand out without overwhelming the body text.</p>
      
      <blockquote>
        <p>"Whitespace is to be regarded as an active element, not a passive background."</p>
        <cite>— Jan Tschichold</cite>
      </blockquote>
      
      <h3>Implementation Details</h3>
      <p>To achieve this, we use CSS properties like <code>max-width: 65ch</code> on paragraphs, while the main container uses a broader width to accommodate floating elements and imagery.</p>
      
      <pre><code>.content-body p {
  max-width: 65ch;
  line-height: 1.7;
  font-size: 1.125rem;
}</code></pre>

      <p>By implementing these principles, you ensure that your documentation, articles, and guides provide a world-class reading experience across all devices.</p>
    </div>
  </main>
</div>`,
  js: `// Content Container Logic
// We can add a reading progress bar logic.

const contentWrapper = document.querySelector('.content-wrapper');
const contentContainer = document.querySelector('.content-container');

if (contentWrapper && contentContainer) {
  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'content-progress-bar';
  contentWrapper.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    // Calculate how far down the container the user has scrolled
    const rect = contentContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Total scrollable height of the container
    const totalScroll = rect.height - windowHeight;
    
    if (totalScroll > 0) {
      // Amount scrolled relative to the container
      let scrolled = (windowHeight - rect.top) / rect.height * 100;
      
      // Clamp between 0 and 100
      scrolled = Math.max(0, Math.min(100, scrolled));
      progressBar.style.width = \`\${scrolled}%\`;
    }
  });
}`,
  ts: `// Content Container Logic (TypeScript)
const contentWrapper = document.querySelector<HTMLDivElement>('.content-wrapper');
const contentContainer = document.querySelector<HTMLElement>('.content-container');

if (contentWrapper && contentContainer) {
  const progressBar = document.createElement('div');
  progressBar.className = 'content-progress-bar';
  contentWrapper.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const rect = contentContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const totalScroll = rect.height - windowHeight;
    
    if (totalScroll > 0) {
      let scrolled = (windowHeight - rect.top) / rect.height * 100;
      scrolled = Math.max(0, Math.min(100, scrolled));
      progressBar.style.width = \`\${scrolled}%\`;
    }
  });
}`,
  css: `/* Content Container Styles */
@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,400&family=Open+Sans:wght@400;600;700&display=swap');

.content-wrapper {
  width: 100%;
  background: #fdfdfc;
  display: flex;
  justify-content: center;
  position: relative;
  /* Subtly off-white background for reduced eye strain */
}

/* Progress bar added via JS */
.content-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: #10b981; /* Emerald 500 */
  width: 0%;
  z-index: 100;
  transition: width 0.1s ease-out;
}

.content-container {
  width: 100%;
  max-width: 900px; /* Wider than reading column to allow breakouts */
  padding: 60px 24px 100px;
  font-family: 'Open Sans', sans-serif;
  color: #374151; /* Gray 700 */
}

/* Header Styling */
.content-header {
  margin-bottom: 50px;
  text-align: center;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
}

.content-meta {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}

.content-category {
  color: #10b981;
}

.content-date {
  color: #9ca3af;
}

.content-title {
  font-family: 'Merriweather', serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  color: #111827; /* Gray 900 */
  line-height: 1.2;
  margin: 0 0 24px 0;
}

.content-lead {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #4b5563;
  margin: 0 0 32px 0;
}

.content-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.author-info strong {
  color: #111827;
  font-size: 1rem;
}

.author-info span {
  color: #6b7280;
  font-size: 0.875rem;
}

/* Body Styling */
.content-body {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center everything by default */
}

/* Restrict text to optimal character width (ch unit is perfect here) */
.content-body > p, 
.content-body > h2, 
.content-body > h3, 
.content-body > ul, 
.content-body > ol {
  width: 100%;
  max-width: 65ch; /* ~65 characters wide */
}

.content-body p {
  font-size: 1.125rem;
  line-height: 1.8;
  margin: 0 0 28px 0;
}

.content-body h2 {
  font-family: 'Merriweather', serif;
  font-size: 2rem;
  color: #111827;
  margin: 48px 0 24px 0;
  line-height: 1.3;
}

.content-body h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin: 32px 0 16px 0;
}

/* Breakout Elements */
.content-breakout-img {
  width: 100%;
  max-width: 900px; /* Spans full container width, breaking out of 65ch */
  margin: 40px 0;
}

.content-breakout-img img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.content-breakout-img figcaption {
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 12px;
  font-style: italic;
}

/* Blockquotes */
.content-body blockquote {
  width: 100%;
  max-width: 75ch; /* Slightly wider than standard text */
  margin: 40px 0;
  padding: 0 32px;
  border-left: 4px solid #10b981;
}

.content-body blockquote p {
  font-family: 'Merriweather', serif;
  font-size: 1.5rem;
  font-style: italic;
  color: #111827;
  line-height: 1.5;
  margin-bottom: 16px;
  max-width: 100%; /* Override default p constraint */
}

.content-body blockquote cite {
  font-size: 1rem;
  font-weight: 600;
  color: #4b5563;
}

/* Code Blocks */
.content-body pre {
  width: 100%;
  max-width: 75ch; /* Breakout slightly */
  background: #1f2937;
  padding: 24px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 32px 0;
}

.content-body code {
  font-family: 'Fira Code', monospace;
  color: #e5e7eb;
  font-size: 0.95rem;
  line-height: 1.5;
}

.content-body p code {
  background: #f3f4f6;
  color: #ef4444;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a Content Container optimized for displaying articles, guides, documentation, news feeds, game descriptions. Focus on readability, typography, spacing, content hierarchy, and optimal line lengths.`
};
