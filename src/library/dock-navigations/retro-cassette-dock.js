/**
 * Component: Retro Cassette Deck Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'retro-cassette-dock',
  name: 'Retro Cassette Deck Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="cassette-dock-container">
  <div class="deck-housing">
    <nav class="cassette-dock">
      <a href="#" class="deck-btn active" data-action="rw">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
      </a>

      <a href="#" class="deck-btn" data-action="play">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      </a>

      <a href="#" class="deck-btn" data-action="ff">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
      </a>

      <a href="#" class="deck-btn" data-action="stop">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12"></rect></svg>
      </a>

      <a href="#" class="deck-btn rec" data-action="rec">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="6"></circle></svg>
      </a>
    </nav>
    <div class="deck-labels">
      <span>REW</span>
      <span>PLAY</span>
      <span>FF</span>
      <span>STOP</span>
      <span class="rec-lbl">REC</span>
    </div>
  </div>
</div>`,
  js: `// Cassette Deck Logic
const deckBtns = document.querySelectorAll('.deck-btn');

deckBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Stop removes active from all
    if (btn.getAttribute('data-action') === 'stop') {
      deckBtns.forEach(n => n.classList.remove('active'));
      // Press effect for stop
      btn.style.transform = 'translateY(8px)';
      btn.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.8), 0 0 0 #000';
      setTimeout(() => {
        btn.style.transform = '';
        btn.style.boxShadow = '';
      }, 150);
      return;
    }

    // Toggle active state for others
    if(btn.classList.contains('active')) {
       btn.classList.remove('active');
    } else {
       deckBtns.forEach(n => n.classList.remove('active'));
       btn.classList.add('active');
    }
  });
});`,
  ts: `// Cassette Deck Logic (TypeScript)
const deckBtns = document.querySelectorAll<HTMLAnchorElement>('.deck-btn');

deckBtns.forEach(btn => {
  btn.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    
    // Stop removes active from all
    if (btn.getAttribute('data-action') === 'stop') {
      deckBtns.forEach(n => n.classList.remove('active'));
      // Press effect for stop
      btn.style.transform = 'translateY(8px)';
      btn.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.8), 0 0 0 #000';
      setTimeout(() => {
        btn.style.transform = '';
        btn.style.boxShadow = '';
      }, 150);
      return;
    }

    // Toggle active state for others
    if(btn.classList.contains('active')) {
       btn.classList.remove('active');
    } else {
       deckBtns.forEach(n => n.classList.remove('active'));
       btn.classList.add('active');
    }
  });
});`,
  css: `/* Retro Cassette Deck Dock Styles */
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

.cassette-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 2rem;
  background: #2a2a2a; /* Dark textured background */
  background-image: radial-gradient(#333 1px, transparent 1px);
  background-size: 10px 10px;
  font-family: 'VT323', monospace;
}

.deck-housing {
  background: #c0c0c0; /* Silver plastic */
  padding: 20px 30px 10px;
  border-radius: 8px;
  border: 2px solid #888;
  border-bottom-color: #555;
  border-right-color: #555;
  box-shadow: 
    0 20px 30px rgba(0,0,0,0.5),
    inset 0 2px 5px rgba(255,255,255,0.8);
}

.cassette-dock {
  display: flex;
  gap: 10px;
  background: #111;
  padding: 10px;
  border-radius: 4px;
  box-shadow: inset 0 5px 10px rgba(0,0,0,0.8);
}

.deck-btn {
  width: 50px;
  height: 60px;
  background: #e0e0e0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  text-decoration: none;
  /* Thick 3D button effect */
  box-shadow: 
    inset 0 2px 2px rgba(255,255,255,0.9),
    0 6px 0 #888,
    0 8px 5px rgba(0,0,0,0.5);
  transform: translateY(-4px);
  transition: all 0.1s ease;
  position: relative;
}

.deck-btn::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background: rgba(0,0,0,0.1);
  border-radius: 2px;
}

/* The Record Button */
.deck-btn.rec {
  color: #d32f2f;
}

/* Hover state (slight press) */
.deck-btn:hover:not(.active) {
  transform: translateY(-2px);
  box-shadow: 
    inset 0 2px 2px rgba(255,255,255,0.9),
    0 4px 0 #888,
    0 6px 4px rgba(0,0,0,0.5);
}

/* Active state (pushed in) */
.deck-btn.active {
  transform: translateY(4px);
  background: #ccc;
  box-shadow: 
    inset 0 2px 4px rgba(0,0,0,0.4),
    0 0 0 #888,
    0 2px 2px rgba(0,0,0,0.2);
}

/* Labels below buttons */
.deck-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0 10px;
}

.deck-labels span {
  width: 50px;
  text-align: center;
  font-size: 18px;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.deck-labels .rec-lbl {
  color: #d32f2f;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a retro cassette deck dock. The navigation items should look like chunky physical mechanical buttons (Play, Fast Forward, Rewind, Stop, Record). They should physically depress and stay down when active, simulating heavy 80s hardware mechanics.`
};
