/**
 * Component: Intelligent Collapsible Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'intelligent-collapsible-sidebar',
  name: 'Collapsible Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="ics-container">
  <aside class="ics-sidebar">
    <div class="ics-header">
      <div class="ics-logo">
        <div class="ics-logo-icon"></div>
        <span class="ics-brand">AETHER</span>
      </div>
    </div>
    
    <div class="ics-nav-wrapper">
      <nav class="ics-nav">
        <a href="#" class="ics-item active" data-title="Dashboard">
          <svg class="ics-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
          <span class="ics-label">Dashboard</span>
        </a>
        <a href="#" class="ics-item" data-title="Library">
          <svg class="ics-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 6 4 14"></path><path d="M12 6v14"></path><path d="M8 8v12"></path><path d="M4 4v16"></path></svg>
          <span class="ics-label">Library</span>
        </a>
        <a href="#" class="ics-item" data-title="Community">
          <svg class="ics-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          <span class="ics-label">Community</span>
        </a>
        <a href="#" class="ics-item" data-title="Store">
          <svg class="ics-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <span class="ics-label">Store</span>
        </a>
      </nav>
    </div>

    <div class="ics-footer">
      <a href="#" class="ics-item" data-title="Settings">
        <svg class="ics-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        <span class="ics-label">Settings</span>
      </a>
    </div>
  </aside>
</div>`,
  js: `// Intelligent hover expansion
const sidebar = document.querySelector('.ics-sidebar');
const items = document.querySelectorAll('.ics-item');

sidebar.addEventListener('mouseenter', () => {
  sidebar.classList.add('expanded');
});

sidebar.addEventListener('mouseleave', () => {
  sidebar.classList.remove('expanded');
});

items.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    items.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Intelligent hover expansion (TypeScript)
const sidebar = document.querySelector<HTMLElement>('.ics-sidebar');
const items = document.querySelectorAll<HTMLAnchorElement>('.ics-item');

if (sidebar) {
  sidebar.addEventListener('mouseenter', () => {
    sidebar.classList.add('expanded');
  });

  sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.remove('expanded');
  });
}

items.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    items.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Intelligent Collapsible Sidebar */
.ics-container {
  display: flex;
  height: 600px;
  background: #f4f4f5; /* Light theme showcase */
  padding: 1rem;
  font-family: 'Inter', sans-serif;
}

.ics-sidebar {
  width: 72px; /* Collapsed state */
  height: 100%;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.05);
}

.ics-sidebar.expanded {
  width: 240px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.ics-header {
  padding: 1.5rem 1.25rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.ics-logo {
  display: flex;
  align-items: center;
  gap: 16px;
  white-space: nowrap;
}

.ics-logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 8px;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
}

.ics-brand {
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 1px;
  color: #111827;
  opacity: 0;
  transition: opacity 0.3s;
}

.ics-sidebar.expanded .ics-brand {
  opacity: 1;
}

.ics-nav-wrapper {
  flex: 1;
  padding: 1.5rem 0.75rem;
}

.ics-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ics-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0.75rem;
  border-radius: 10px;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s;
  position: relative;
  white-space: nowrap;
}

.ics-item:hover {
  background: #f3f4f6;
  color: #111827;
}

.ics-item.active {
  background: #eff6ff;
  color: #3b82f6;
}

.ics-icon {
  flex-shrink: 0;
  transition: transform 0.2s;
}

.ics-item:hover .ics-icon {
  transform: scale(1.1);
}

.ics-label {
  font-weight: 600;
  font-size: 0.95rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.ics-sidebar.expanded .ics-label {
  opacity: 1;
}

/* Tooltips in collapsed mode */
.ics-item::before {
  content: attr(data-title);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(10px);
  background: #1f2937;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s;
  white-space: nowrap;
  z-index: 100;
}

.ics-sidebar:not(.expanded) .ics-item:hover::before {
  opacity: 1;
  transform: translateY(-50%) translateX(16px);
}

.ics-footer {
  padding: 1rem 0.75rem;
  border-top: 1px solid rgba(0,0,0,0.05);
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a collapsible sidebar that expands and contracts smoothly on hover. Show icons only in collapsed mode and icons with labels in expanded mode. Maintain perfect usability across all devices.`
};
