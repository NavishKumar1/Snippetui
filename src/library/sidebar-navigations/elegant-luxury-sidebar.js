/**
 * Component: Elegant Luxury Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'elegant-luxury-sidebar',
  name: 'Elegant Luxury Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="lux-container">
  <aside class="lux-sidebar">
    <div class="lux-header">
      <div class="lux-logo-mark">A</div>
      <h1 class="lux-logo-text">AURORA</h1>
      <p class="lux-subtitle">HOTEL & RESORT</p>
    </div>

    <nav class="lux-nav">
      <div class="lux-nav-section">
        <span class="lux-section-title">RESERVATIONS</span>
        <a href="#" class="lux-item active">
          <span class="lux-item-text">Book a Suite</span>
          <div class="lux-line"></div>
        </a>
        <a href="#" class="lux-item">
          <span class="lux-item-text">My Itinerary</span>
          <div class="lux-line"></div>
        </a>
      </div>

      <div class="lux-nav-section">
        <span class="lux-section-title">EXPERIENCES</span>
        <a href="#" class="lux-item">
          <span class="lux-item-text">Fine Dining</span>
          <div class="lux-line"></div>
        </a>
        <a href="#" class="lux-item">
          <span class="lux-item-text">The Spa</span>
          <div class="lux-line"></div>
        </a>
        <a href="#" class="lux-item">
          <span class="lux-item-text">Excursions</span>
          <div class="lux-line"></div>
        </a>
      </div>
    </nav>
    
    <div class="lux-footer">
      <button class="lux-concierge-btn">
        <span>CONTACT CONCIERGE</span>
      </button>
    </div>
  </aside>
</div>`,
  js: `// Elegant Luxury Nav Logic
const luxItems = document.querySelectorAll('.lux-item');

luxItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    luxItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  ts: `// Elegant Luxury Nav Logic (TypeScript)
const luxItems = document.querySelectorAll<HTMLAnchorElement>('.lux-item');

luxItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    luxItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});`,
  css: `/* Elegant Luxury Sidebar Styles */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400&display=swap');

.lux-container {
  display: flex;
  height: 600px;
  background: #f4f0ec; /* Soft elegant cream */
  font-family: 'Montserrat', sans-serif;
  color: #2c3e35; /* Deep forest/emerald */
}

.lux-sidebar {
  width: 320px;
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #e2dcd3;
  display: flex;
  flex-direction: column;
  box-shadow: 10px 0 30px rgba(0,0,0,0.02);
}

.lux-header {
  padding: 50px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #e2dcd3;
  position: relative;
}

/* Subtle gold accent */
.lux-header::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: #c5a880; /* Gold */
}

.lux-logo-mark {
  font-family: 'Cormorant Garamond', serif;
  font-size: 48px;
  line-height: 1;
  color: #c5a880;
  margin-bottom: 10px;
}

.lux-logo-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 6px;
  margin: 0 0 5px 0;
  color: #2c3e35;
}

.lux-subtitle {
  font-size: 10px;
  letter-spacing: 3px;
  color: #7a8c82;
  margin: 0;
}

.lux-nav {
  padding: 40px 30px;
  flex: 1;
  overflow-y: auto;
}

.lux-nav-section {
  margin-bottom: 40px;
}

.lux-section-title {
  display: block;
  font-size: 10px;
  letter-spacing: 2px;
  color: #c5a880;
  margin-bottom: 20px;
}

.lux-item {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #55665e;
  padding: 12px 0;
  margin-bottom: 5px;
  position: relative;
  transition: color 0.4s ease;
}

.lux-item-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: 400;
  transition: transform 0.4s ease;
}

.lux-line {
  position: absolute;
  bottom: 5px;
  left: 0;
  height: 1px;
  width: 0;
  background: #c5a880;
  transition: width 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.lux-item:hover {
  color: #2c3e35;
}

.lux-item:hover .lux-item-text {
  transform: translateX(10px);
}

.lux-item.active {
  color: #c5a880;
}

.lux-item.active .lux-item-text {
  transform: translateX(10px);
  font-style: italic;
}

.lux-item.active .lux-line {
  width: 40px;
}

.lux-footer {
  padding: 30px;
}

.lux-concierge-btn {
  width: 100%;
  padding: 15px;
  background: transparent;
  border: 1px solid #2c3e35;
  color: #2c3e35;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color 0.4s;
}

.lux-concierge-btn::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #2c3e35;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 1;
}

.lux-concierge-btn:hover::before {
  transform: scaleY(1);
}

.lux-concierge-btn:hover {
  color: #fff;
}

.lux-concierge-btn span {
  position: relative;
  z-index: 2;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design an Elegant Luxury Hotel sidebar. Rely heavily on typography (Cormorant Garamond and Montserrat), vast white space, subtle gold accents, and extremely refined, slow hover animations (like a delicate gold underline expanding or text sliding gently).`
};
