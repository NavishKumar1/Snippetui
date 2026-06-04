/**
 * Component: Discord-Inspired Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'discord-inspired-sidebar',
  name: 'Discord-Inspired Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="discord-sidebar-container">
  <!-- Server List (Outer Sidebar) -->
  <nav class="discord-servers">
    <div class="ds-server-item ds-home active">
      <div class="ds-pill"></div>
      <div class="ds-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"></path></svg>
      </div>
    </div>
    
    <div class="ds-separator"></div>
    
    <div class="ds-server-item unread">
      <div class="ds-pill"></div>
      <div class="ds-icon">
        <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&q=80" alt="Server 1">
      </div>
      <div class="ds-notification">3</div>
    </div>
    
    <div class="ds-server-item">
      <div class="ds-pill"></div>
      <div class="ds-icon">
        <img src="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=100&q=80" alt="Server 2">
      </div>
    </div>
    
    <div class="ds-server-item ds-add">
      <div class="ds-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </div>
    </div>
  </nav>

  <!-- Channels List (Inner Sidebar) -->
  <aside class="discord-channels">
    <div class="dc-header">
      <h3 class="dc-title">Pro Gamers Hub</h3>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </div>
    
    <div class="dc-scroll">
      <div class="dc-category">
        <div class="dc-category-header">
          <svg class="dc-arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          TEXT CHANNELS
        </div>
        <a href="#" class="dc-channel active">
          <span class="dc-hash">#</span> general
        </a>
        <a href="#" class="dc-channel unread">
          <span class="dc-hash">#</span> announcements
        </a>
        <a href="#" class="dc-channel">
          <span class="dc-hash">#</span> looking-for-group
        </a>
      </div>
      
      <div class="dc-category">
        <div class="dc-category-header">
          <svg class="dc-arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          VOICE CHANNELS
        </div>
        <a href="#" class="dc-channel">
          <svg class="dc-voice-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          Lobby
        </a>
        <a href="#" class="dc-channel">
          <svg class="dc-voice-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
          Squad Alpha
        </a>
      </div>
    </div>

    <!-- User Panel -->
    <div class="dc-user-panel">
      <div class="dc-user-profile">
        <div class="dc-avatar-box">
          <img src="https://i.pravatar.cc/100?img=11" alt="Avatar">
          <div class="dc-status online"></div>
        </div>
        <div class="dc-user-info">
          <span class="dc-username">HeroBoy</span>
          <span class="dc-tag">#4492</span>
        </div>
      </div>
      <div class="dc-user-controls">
        <button class="dc-control-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
        </button>
        <button class="dc-control-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        </button>
        <button class="dc-control-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
      </div>
    </div>
  </aside>
</div>`,
  js: `// Discord sidebar interactions
const servers = document.querySelectorAll('.ds-server-item:not(.ds-add)');
const channels = document.querySelectorAll('.dc-channel');

servers.forEach(server => {
  server.addEventListener('click', () => {
    servers.forEach(s => s.classList.remove('active'));
    server.classList.add('active');
    server.classList.remove('unread');
  });
});

channels.forEach(channel => {
  channel.addEventListener('click', (e) => {
    e.preventDefault();
    channels.forEach(c => c.classList.remove('active'));
    channel.classList.add('active');
    channel.classList.remove('unread');
  });
});`,
  ts: `// Discord sidebar interactions (TypeScript)
const servers = document.querySelectorAll<HTMLDivElement>('.ds-server-item:not(.ds-add)');
const channels = document.querySelectorAll<HTMLAnchorElement>('.dc-channel');

servers.forEach(server => {
  server.addEventListener('click', () => {
    servers.forEach(s => s.classList.remove('active'));
    server.classList.add('active');
    server.classList.remove('unread');
  });
});

channels.forEach(channel => {
  channel.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    channels.forEach(c => c.classList.remove('active'));
    channel.classList.add('active');
    channel.classList.remove('unread');
  });
});`,
  css: `/* Discord-Inspired Sidebar Styles */
.discord-sidebar-container {
  display: flex;
  height: 600px;
  background: #36393f; /* Discord Dark */
  font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  border-radius: 8px;
  overflow: hidden;
}

/* SERVER LIST (Outer) */
.discord-servers {
  width: 72px;
  background: #202225;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  gap: 8px;
  overflow-y: auto;
}
.discord-servers::-webkit-scrollbar { display: none; }

.ds-server-item {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.ds-icon {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: #36393f;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dcddde;
  transition: all 0.2s ease-out;
  overflow: hidden;
}

.ds-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ds-server-item:hover .ds-icon {
  border-radius: 16px;
  background: #5865F2; /* Discord Blurple */
  color: white;
}

.ds-server-item.active .ds-icon {
  border-radius: 16px;
  background: #5865F2;
  color: white;
}

/* Home Icon specifically */
.ds-home .ds-icon {
  background: #5865F2;
  color: white;
}

.ds-pill {
  position: absolute;
  left: -16px;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 0 4px 4px 0;
  transition: all 0.2s ease-out;
  transform: scale(0);
}

.ds-server-item:hover .ds-pill {
  transform: scale(1);
  height: 20px;
}

.ds-server-item.active .ds-pill {
  transform: scale(1);
  height: 40px;
}

.ds-server-item.unread .ds-pill {
  transform: scale(1);
}

.ds-notification {
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: #ed4245; /* Discord Red */
  border: 4px solid #202225;
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 0 4px;
  border-radius: 12px;
  min-width: 16px;
  text-align: center;
}

.ds-separator {
  width: 32px;
  height: 2px;
  background: #2d2f32;
  border-radius: 1px;
}

.ds-add .ds-icon {
  color: #3ba55c; /* Discord Green */
}
.ds-add:hover .ds-icon {
  background: #3ba55c;
  color: white;
}

/* CHANNELS LIST (Inner) */
.discord-channels {
  width: 240px;
  background: #2f3136;
  display: flex;
  flex-direction: column;
}

.dc-header {
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #202225;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
.dc-header:hover { background: #34373c; }

.dc-title { margin: 0; font-size: 15px; }

.dc-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 16px 8px;
}
.dc-scroll::-webkit-scrollbar { width: 6px; }
.dc-scroll::-webkit-scrollbar-thumb { background: #202225; border-radius: 3px; }

.dc-category { margin-bottom: 16px; }

.dc-category-header {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #8e9297;
  font-size: 12px;
  font-weight: 700;
  padding: 0 8px;
  margin-bottom: 4px;
  cursor: pointer;
}
.dc-category-header:hover { color: #dcddde; }

.dc-channel {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  color: #8e9297;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 2px;
}

.dc-channel:hover {
  background: #34373c;
  color: #dcddde;
}

.dc-channel.active {
  background: #393c43;
  color: white;
}

.dc-channel.unread {
  color: white;
  font-weight: 700;
}

.dc-hash, .dc-voice-icon {
  color: #8e9297;
  font-size: 18px;
  opacity: 0.7;
}

/* USER PANEL */
.dc-user-panel {
  height: 52px;
  background: #292b2f;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dc-user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
}
.dc-user-profile:hover { background: #393c43; }

.dc-avatar-box {
  position: relative;
  width: 32px;
  height: 32px;
}
.dc-avatar-box img {
  width: 100%; height: 100%; border-radius: 50%;
}

.dc-status {
  position: absolute;
  bottom: -2px; right: -2px;
  width: 10px; height: 10px;
  border-radius: 50%;
  border: 2px solid #292b2f;
}
.dc-status.online { background: #3ba55c; }

.dc-user-info {
  display: flex;
  flex-direction: column;
}
.dc-username {
  color: white;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}
.dc-tag {
  color: #b9bbbe;
  font-size: 11px;
  line-height: 1.2;
}

.dc-user-controls {
  display: flex;
}
.dc-control-btn {
  background: transparent;
  border: none;
  color: #b9bbbe;
  width: 32px; height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.dc-control-btn:hover {
  background: #393c43;
  color: #dcddde;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build a sidebar inspired by Discord's navigation structure while adapting it for gaming content. Focus on communities, voice chat, messages, and social interaction.`
};
