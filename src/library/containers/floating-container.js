/**
 * Component: Floating Container
 * Category: containers
 */

export const component = {
  id: 'floating-container',
  name: 'Floating Container',
  category: 'containers',
  tag: 'Premium',
  html: `<div class="float-wrapper">
  <!-- Mock background content to show floating effect -->
  <div class="float-mock-bg">
    <div class="mock-header"></div>
    <div class="mock-grid">
      <div class="mock-card"></div>
      <div class="mock-card"></div>
      <div class="mock-card"></div>
      <div class="mock-card"></div>
    </div>
  </div>

  <div class="float-container">
    <div class="float-close">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </div>
    
    <div class="float-content">
      <div class="float-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
      </div>
      
      <div class="float-text">
        <h3>Performance Boost Active</h3>
        <p>Your system has been optimized for gaming. Background tasks are suspended to deliver maximum framerates.</p>
      </div>
      
      <div class="float-actions">
        <button class="float-btn primary">View Details</button>
        <button class="float-btn secondary">Dismiss</button>
      </div>
    </div>
  </div>
</div>`,
  js: `// Floating Container Logic
const floatContainers = document.querySelectorAll('.float-container');

floatContainers.forEach(container => {
  // Add an entrance animation class after a slight delay
  setTimeout(() => {
    container.classList.add('float-visible');
  }, 300);

  // Close functionality
  const closeBtn = container.querySelector('.float-close');
  const dismissBtn = container.querySelector('.float-btn.secondary');

  const closeFloat = () => {
    container.classList.remove('float-visible');
    // In a real app, you might remove it from DOM after animation
  };

  if (closeBtn) closeBtn.addEventListener('click', closeFloat);
  if (dismissBtn) dismissBtn.addEventListener('click', closeFloat);
});`,
  ts: `// Floating Container Logic (TypeScript)
const floatContainers = document.querySelectorAll<HTMLDivElement>('.float-container');

floatContainers.forEach(container => {
  setTimeout(() => {
    container.classList.add('float-visible');
  }, 300);

  const closeBtn = container.querySelector<HTMLDivElement>('.float-close');
  const dismissBtn = container.querySelector<HTMLButtonElement>('.float-btn.secondary');

  const closeFloat = () => {
    container.classList.remove('float-visible');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeFloat);
  if (dismissBtn) dismissBtn.addEventListener('click', closeFloat);
});`,
  css: `/* Floating Container Styles */
.float-wrapper {
  position: relative;
  width: 100%;
  height: 600px;
  background: #f1f5f9;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* Mock BG to provide context */
.float-mock-bg {
  padding: 40px;
  opacity: 0.5;
}
.mock-header { height: 60px; background: #e2e8f0; border-radius: 8px; margin-bottom: 30px; }
.mock-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.mock-card { height: 150px; background: #e2e8f0; border-radius: 8px; }

/* The Floating Container itself */
.float-container {
  position: absolute;
  bottom: 40px;
  right: 40px;
  width: 380px;
  background: #ffffff;
  border-radius: 16px;
  
  /* Complex Multi-layered Shadow for realistic elevation */
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.05),
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1),
    0 25px 50px -12px rgba(0, 0, 0, 0.25);
    
  padding: 24px;
  z-index: 100;
  
  /* Initial state for animation */
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.float-container.float-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.float-close {
  position: absolute;
  top: 16px;
  right: 16px;
  color: #94a3b8;
  cursor: pointer;
  transition: color 0.2s;
  padding: 4px;
  border-radius: 50%;
}

.float-close:hover {
  color: #0f172a;
  background: #f1f5f9;
}

.float-content {
  display: flex;
  flex-direction: column;
}

.float-icon {
  width: 56px;
  height: 56px;
  background: #eff6ff; /* Blue 50 */
  color: #3b82f6; /* Blue 500 */
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.float-text h3 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}

.float-text p {
  margin: 0 0 24px 0;
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.5;
}

.float-actions {
  display: flex;
  gap: 12px;
}

.float-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
}

.float-btn.primary {
  background: #0f172a;
  color: #fff;
}

.float-btn.primary:hover {
  background: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.float-btn.secondary {
  background: #f1f5f9;
  color: #475569;
}

.float-btn.secondary:hover {
  background: #e2e8f0;
  color: #0f172a;
}

@media (max-width: 480px) {
  .float-container {
    right: 16px;
    left: 16px;
    bottom: 16px;
    width: auto;
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build a Floating Container component that visually appears elevated above the interface using advanced shadows, depth systems, spacing, and motion effects.`
};
