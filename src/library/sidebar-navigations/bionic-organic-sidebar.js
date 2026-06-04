/**
 * Component: Bionic Organic Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'bionic-organic-sidebar',
  name: 'Bionic Organic Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="bionic-container">
  <aside class="bionic-sidebar">
    <div class="bio-blob-bg"></div>
    <div class="bio-content">
      <div class="bio-header">
        <svg class="bio-logo" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"></path><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path><path d="M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path></svg>
      </div>

      <nav class="bio-nav">
        <div class="bio-indicator"></div>

        <a href="#" class="bio-item active" data-index="0">
          <svg class="bio-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        </a>

        <a href="#" class="bio-item" data-index="1">
          <svg class="bio-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        </a>

        <a href="#" class="bio-item" data-index="2">
          <svg class="bio-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </a>

        <a href="#" class="bio-item" data-index="3">
          <svg class="bio-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </a>
      </nav>

      <div class="bio-footer">
        <img src="https://i.pravatar.cc/100?img=5" alt="User" class="bio-avatar">
      </div>
    </div>
  </aside>
</div>`,
  js: `// Bionic Organic Indicator Logic
const bioItems = document.querySelectorAll('.bio-item');
const bioIndicator = document.querySelector('.bio-indicator');

function updateBioIndicator(index) {
  if (!bioIndicator) return;
  // Item height is 60px, gap is 20px
  const offset = index * 80; 
  bioIndicator.style.transform = \`translateY(\${offset}px)\`;
}

// Init
updateBioIndicator(0);

bioItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    bioItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    
    const index = parseInt(item.getAttribute('data-index'));
    updateBioIndicator(index);
  });
});`,
  ts: `// Bionic Organic Indicator Logic (TypeScript)
const bioItems = document.querySelectorAll<HTMLAnchorElement>('.bio-item');
const bioIndicator = document.querySelector<HTMLDivElement>('.bio-indicator');

function updateBioIndicator(index: number) {
  if (!bioIndicator) return;
  const offset = index * 80; 
  bioIndicator.style.transform = \`translateY(\${offset}px)\`;
}

// Init
updateBioIndicator(0);

bioItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    bioItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    
    const index = parseInt(item.getAttribute('data-index') || '0');
    updateBioIndicator(index);
  });
});`,
  css: `/* Bionic Organic Sidebar Styles */
.bionic-container {
  display: flex;
  height: 600px;
  background: #fdfbf7; /* Warm off-white */
}

.bionic-sidebar {
  width: 100px;
  height: 100%;
  background: transparent;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* The organic curved background */
.bio-blob-bg {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: #d4e0ce; /* Sage green */
  border-radius: 0 40px 40px 0;
  z-index: 1;
  /* Organic animation using border-radius */
  animation: organic-morph 10s ease-in-out infinite alternate;
}

@keyframes organic-morph {
  0% { border-radius: 0 40px 80px 0 / 0 60px 40px 0; }
  50% { border-radius: 0 80px 40px 0 / 0 40px 80px 0; }
  100% { border-radius: 0 50px 60px 0 / 0 70px 50px 0; }
}

.bio-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
}

.bio-header {
  margin-bottom: 3rem;
}

.bio-logo {
  color: #4a5c40; /* Dark forest green */
  animation: pulse-spin 20s linear infinite;
}

@keyframes pulse-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.bio-nav {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.bio-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  background: #ffffff;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; /* Organic shape */
  z-index: 1;
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 10px 20px rgba(74, 92, 64, 0.1);
  animation: indicator-morph 4s linear infinite alternate;
}

@keyframes indicator-morph {
  0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  100% { border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%; }
}

.bio-item {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #798b6f;
  text-decoration: none;
  z-index: 2;
  transition: color 0.3s;
}

.bio-item:hover {
  color: #4a5c40;
}

.bio-item.active {
  color: #4a5c40;
}

.bio-icon {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.bio-item.active .bio-icon {
  transform: scale(1.1);
}

.bio-footer {
  margin-top: auto;
}

.bio-avatar {
  width: 48px;
  height: 48px;
  border-radius: 40% 60% 50% 50% / 50% 40% 60% 50%; /* Organic crop */
  border: 2px solid #ffffff;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a bionic/organic sidebar. Avoid sharp corners completely. Use CSS border-radius manipulation to create continuously morphing, fluid shapes for the background container and active item indicators. Use a soft, natural color palette (sage greens, warm whites).`
};
