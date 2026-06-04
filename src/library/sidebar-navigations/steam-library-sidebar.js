/**
 * Component: Steam Library Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'steam-library-sidebar',
  name: 'Steam Library Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="steam-lib-container">
  <aside class="steam-lib-sidebar">
    <div class="sls-header">
      <div class="sls-search-box">
        <svg class="sls-search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" placeholder="Search" class="sls-search-input">
      </div>
      <button class="sls-filter-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
      </button>
    </div>

    <div class="sls-game-list">
      <!-- FAVORITES -->
      <div class="sls-category">
        <div class="sls-cat-header active">
          <svg class="sls-arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <span>FAVORITES (3)</span>
        </div>
        <div class="sls-cat-content" style="display: block;">
          <a href="#" class="sls-game installed active">
            <div class="sls-game-icon">
              <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=50&h=50&q=80" alt="Game">
            </div>
            <span class="sls-game-name">Cyber Strike 2077</span>
          </a>
          <a href="#" class="sls-game installed">
            <div class="sls-game-icon">
              <img src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=50&h=50&q=80" alt="Game">
            </div>
            <span class="sls-game-name">Elden Quest</span>
          </a>
          <a href="#" class="sls-game">
            <div class="sls-game-icon"></div>
            <span class="sls-game-name">Halo: Infinity</span>
          </a>
        </div>
      </div>

      <!-- ALL GAMES -->
      <div class="sls-category">
        <div class="sls-cat-header active">
          <svg class="sls-arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <span>UNCATEGORIZED (45)</span>
        </div>
        <div class="sls-cat-content" style="display: block;">
          <a href="#" class="sls-game installed updating">
            <div class="sls-game-icon">
              <img src="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=50&h=50&q=80" alt="Game">
            </div>
            <span class="sls-game-name">Apex Legends</span>
            <div class="sls-update-indicator">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            </div>
          </a>
          <a href="#" class="sls-game installed">
            <div class="sls-game-icon"></div>
            <span class="sls-game-name">Counter-Strike 2</span>
          </a>
          <a href="#" class="sls-game">
            <div class="sls-game-icon"></div>
            <span class="sls-game-name">Dota 2</span>
          </a>
          <a href="#" class="sls-game">
            <div class="sls-game-icon"></div>
            <span class="sls-game-name">Grand Theft Auto V</span>
          </a>
          <a href="#" class="sls-game">
            <div class="sls-game-icon"></div>
            <span class="sls-game-name">Left 4 Dead 2</span>
          </a>
          <a href="#" class="sls-game installed running">
            <div class="sls-game-icon"></div>
            <span class="sls-game-name">Team Fortress 2</span>
          </a>
        </div>
      </div>
    </div>
  </aside>
</div>`,
  js: `// Steam Library Sidebar Logic
const headers = document.querySelectorAll('.sls-cat-header');
const games = document.querySelectorAll('.sls-game');

// Toggle Categories
headers.forEach(header => {
  header.addEventListener('click', () => {
    header.classList.toggle('active');
    const content = header.nextElementSibling;
    if (header.classList.contains('active')) {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  });
});

// Select Game
games.forEach(game => {
  game.addEventListener('click', (e) => {
    e.preventDefault();
    games.forEach(g => g.classList.remove('active'));
    game.classList.add('active');
  });
});`,
  ts: `// Steam Library Sidebar Logic (TypeScript)
const headers = document.querySelectorAll<HTMLDivElement>('.sls-cat-header');
const games = document.querySelectorAll<HTMLAnchorElement>('.sls-game');

// Toggle Categories
headers.forEach(header => {
  header.addEventListener('click', () => {
    header.classList.toggle('active');
    const content = header.nextElementSibling as HTMLDivElement;
    if (header.classList.contains('active')) {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  });
});

// Select Game
games.forEach(game => {
  game.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    games.forEach(g => g.classList.remove('active'));
    game.classList.add('active');
  });
});`,
  css: `/* Steam Library Sidebar */
.steam-lib-container {
  display: flex;
  height: 600px;
  background: #171a21; /* Steam App Background */
  font-family: "Motiva Sans", -apple-system, system-ui, sans-serif;
  color: #c6d4df;
}

.steam-lib-sidebar {
  width: 280px;
  background: #1e2329; /* Slightly lighter inner sidebar */
  border-right: 1px solid #101214;
  display: flex;
  flex-direction: column;
}

/* Header / Search */
.sls-header {
  padding: 12px;
  display: flex;
  gap: 8px;
  background: #171a21;
}

.sls-search-box {
  flex: 1;
  background: #2a2e33;
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.sls-search-box:focus-within {
  border-color: #3d4450;
  background: #3d4450;
}

.sls-search-icon {
  color: #67707b;
}

.sls-search-input {
  width: 100%;
  background: transparent;
  border: none;
  color: #c6d4df;
  padding: 6px 8px;
  font-size: 13px;
  outline: none;
}
.sls-search-input::placeholder { color: #67707b; }

.sls-filter-btn {
  background: #2a2e33;
  border: none;
  border-radius: 3px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #67707b;
  cursor: pointer;
  transition: all 0.2s;
}
.sls-filter-btn:hover { background: #3d4450; color: #c6d4df; }


/* Game List Area */
.sls-game-list {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 20px;
}
.sls-game-list::-webkit-scrollbar { width: 12px; }
.sls-game-list::-webkit-scrollbar-track { background: #171a21; }
.sls-game-list::-webkit-scrollbar-thumb { background: #3d4450; border-radius: 6px; border: 3px solid #171a21; }
.sls-game-list::-webkit-scrollbar-thumb:hover { background: #5c6674; }

.sls-category {
  margin-top: 8px;
}

.sls-cat-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 16px;
  font-size: 11px;
  color: #9099a1;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: transparent;
}
.sls-cat-header:hover { color: #c6d4df; background: rgba(255,255,255,0.02); }

.sls-arrow {
  transition: transform 0.2s;
}
.sls-cat-header.active .sls-arrow {
  transform: rotate(90deg);
}

.sls-game {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 16px 4px 30px;
  text-decoration: none;
  font-size: 13px;
  color: #67707b; /* Uninstalled color */
}

.sls-game:hover {
  background: #2a2e33;
  color: #c6d4df;
}

.sls-game.active {
  background: #3d4450;
  color: #fff;
}

/* Installed Game State */
.sls-game.installed {
  color: #c6d4df; /* White text for installed */
}
.sls-game.installed.active {
  background: #3d4450;
  color: #fff;
}

/* Running Game State */
.sls-game.running {
  color: #a4d007; /* Steam Green */
}
.sls-game.running.active {
  background: #3d4450; /* Same bg, but keep green */
}

/* Updating Game State */
.sls-game.updating {
  color: #1a9fff; /* Steam Blue */
}

.sls-game-icon {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background: #2a2e33;
  flex-shrink: 0;
  overflow: hidden;
}
.sls-game-icon img {
  width: 100%; height: 100%; object-fit: cover;
}

.sls-update-indicator {
  margin-left: auto;
  color: #1a9fff;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a sidebar optimized for managing large game libraries. Include categories, filters, collections, favorites, downloads, and installed games. Focus on Steam's color palette.`
};
