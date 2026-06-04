/**
 * Component: Netflix-Style Gaming Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'netflix-style-dock',
  name: 'Netflix-Style Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="netflix-dock-container">
  <div class="nd-background-glow"></div>
  <nav class="netflix-dock">
    <a href="#" class="nd-item active">
      <div class="nd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
      </div>
      <span class="nd-label">Home</span>
    </a>

    <a href="#" class="nd-item">
      <div class="nd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
      </div>
      <span class="nd-label">Games</span>
    </a>

    <a href="#" class="nd-item nd-featured">
      <div class="nd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      </div>
      <span class="nd-label">Play</span>
    </a>

    <a href="#" class="nd-item">
      <div class="nd-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </div>
      <span class="nd-label">New & Hot</span>
    </a>

    <a href="#" class="nd-item">
      <div class="nd-icon">
        <img src="https://i.pravatar.cc/100?img=55" alt="Profile" class="nd-avatar">
      </div>
      <span class="nd-label">My Netflix</span>
    </a>
  </nav>
</div>`,
  js: `// Netflix-style interactions
const netflixItems = document.querySelectorAll('.nd-item');

netflixItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    netflixItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Netflix-style interactions (TypeScript)
const netflixItems = document.querySelectorAll<HTMLAnchorElement>('.nd-item');

netflixItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    netflixItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Netflix-Style Dock Styles */
.netflix-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
  width: 100%;
  padding-bottom: 2rem;
  background: #000; /* Pure black background */
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  position: relative;
}

.nd-background-glow {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 150px;
  background: linear-gradient(to top, rgba(229, 9, 20, 0.15) 0%, transparent 100%);
  pointer-events: none;
}

.netflix-dock {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  z-index: 10;
}

.nd-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
  color: #808080;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  width: 60px;
}

.nd-item:hover, .nd-item.active {
  color: #fff;
}

.nd-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nd-item:hover .nd-icon,
.nd-item.active .nd-icon {
  transform: translateY(-4px) scale(1.1);
}

.nd-label {
  font-size: 10px;
  font-weight: 500;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  white-space: nowrap;
}

.nd-item:hover .nd-label,
.nd-item.active .nd-label {
  opacity: 1;
  transform: translateY(0);
}

/* Featured / Play Button */
.nd-featured .nd-icon {
  background: #e50914; /* Netflix Red */
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(229, 9, 20, 0.4);
}

.nd-featured:hover .nd-icon,
.nd-featured.active .nd-icon {
  background: #f40612;
  transform: translateY(-4px) scale(1.15);
  box-shadow: 0 6px 20px rgba(229, 9, 20, 0.6);
}

/* Avatar */
.nd-avatar {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.3s;
}

.nd-item.active .nd-avatar {
  border-color: #fff;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a content-first dock navigation inspired by Netflix. Prioritize game discovery, recently played games, trending content, and profile access. Include elegant transitions and cinematic visual language.`
};
