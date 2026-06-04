/**
 * Component: Minimal Streaming Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'minimal-streaming-sidebar',
  name: 'Minimal Streaming Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="mss-container">
  <aside class="mss-sidebar">
    <div class="mss-header">
      <div class="mss-logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
      </div>
    </div>

    <nav class="mss-nav">
      <a href="#" class="mss-item active" data-tooltip="Following">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <div class="mss-dot"></div>
      </a>
      
      <a href="#" class="mss-item" data-tooltip="Browse">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
      </a>

      <a href="#" class="mss-item" data-tooltip="Esports">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </a>

      <div class="mss-separator"></div>

      <!-- Live Channels -->
      <a href="#" class="mss-channel" data-tooltip="Ninja • 45K">
        <img src="https://i.pravatar.cc/100?img=11" alt="Streamer">
      </a>
      <a href="#" class="mss-channel" data-tooltip="Pokimane • 32K">
        <img src="https://i.pravatar.cc/100?img=9" alt="Streamer">
      </a>
      <a href="#" class="mss-channel" data-tooltip="Shroud • 28K">
        <img src="https://i.pravatar.cc/100?img=14" alt="Streamer">
      </a>
    </nav>
  </aside>
</div>`,
  js: `// Minimal Streaming Sidebar Logic
const mssItems = document.querySelectorAll('.mss-item');
const mssChannels = document.querySelectorAll('.mss-channel');

mssItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    mssItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});

mssChannels.forEach(channel => {
  channel.addEventListener('click', (e) => {
    e.preventDefault();
    mssChannels.forEach(c => c.classList.remove('active'));
    channel.classList.add('active');
  });
});`,
  ts: `// Minimal Streaming Sidebar Logic (TypeScript)
const mssItems = document.querySelectorAll<HTMLAnchorElement>('.mss-item');
const mssChannels = document.querySelectorAll<HTMLAnchorElement>('.mss-channel');

mssItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    mssItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});

mssChannels.forEach(channel => {
  channel.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    mssChannels.forEach(c => c.classList.remove('active'));
    channel.classList.add('active');
  });
});`,
  css: `/* Minimal Streaming Sidebar Styles */
.mss-container {
  display: flex;
  height: 600px;
  background: #f9f9fb; /* Light Theme for contrast */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.mss-sidebar {
  width: 70px;
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #eef0f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 20px rgba(0,0,0,0.02);
}

.mss-header {
  padding: 1.5rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
}

.mss-logo {
  color: #9146ff; /* Twitch Purple */
}

.mss-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  flex: 1;
  padding-top: 1rem;
}

.mss-item {
  position: relative;
  color: #53535f;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
}

.mss-item:hover {
  color: #9146ff;
}

.mss-item.active {
  color: #9146ff;
}

.mss-dot {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 0;
  background: #9146ff;
  border-radius: 0 4px 4px 0;
  transition: height 0.2s;
}

.mss-item.active .mss-dot {
  height: 20px;
}

/* Tooltips */
.mss-item::before, .mss-channel::before {
  content: attr(data-tooltip);
  position: absolute;
  left: calc(100% + 10px);
  background: #18181b;
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.2s;
  z-index: 10;
}

.mss-item:hover::before, .mss-channel:hover::before {
  opacity: 1;
  transform: translateX(0);
}

.mss-separator {
  width: 32px;
  height: 2px;
  background: #eef0f2;
  margin: 10px 0;
}

.mss-channel {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  padding: 2px;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.mss-channel img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.mss-channel:hover {
  border-color: #9146ff;
  transform: scale(1.1);
}

.mss-channel.active {
  border-color: #9146ff;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a minimalist sidebar for a game streaming platform (like Twitch). Focus on an icon-only layout for channels and navigation, using tooltips for expanded information. Use clean, rounded UI elements.`
};
