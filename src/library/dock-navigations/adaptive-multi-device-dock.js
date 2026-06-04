/**
 * Component: Adaptive Multi-Device Dock
 * Category: dock-navigations
 */

export const component = {
  id: 'adaptive-multi-device-dock',
  name: 'Adaptive Multi-Device Dock',
  category: 'dock-navigations',
  tag: 'Premium',
  html: `<div class="adaptive-dock-container">
  <nav class="adaptive-dock">
    <a href="#" class="ad-item active">
      <div class="ad-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
      </div>
      <span class="ad-label">Home</span>
      <div class="ad-glow"></div>
    </a>
    
    <a href="#" class="ad-item">
      <div class="ad-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
      </div>
      <span class="ad-label">Discover</span>
      <div class="ad-glow"></div>
    </a>
    
    <div class="ad-divider"></div>

    <a href="#" class="ad-item ad-center-btn">
      <div class="ad-icon ad-play">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"></path></svg>
      </div>
      <div class="ad-center-pulse"></div>
    </a>

    <div class="ad-divider"></div>

    <a href="#" class="ad-item">
      <div class="ad-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
      </div>
      <span class="ad-label">Create</span>
      <div class="ad-glow"></div>
    </a>

    <a href="#" class="ad-item">
      <div class="ad-icon">
        <div class="ad-avatar-wrapper">
          <img src="https://i.pravatar.cc/100?img=33" alt="Profile" />
          <div class="ad-status"></div>
        </div>
      </div>
      <span class="ad-label">Profile</span>
      <div class="ad-glow"></div>
    </a>
  </nav>
</div>`,
  js: `// Interactive hover states for Adaptive Multi-Device Dock
const adItems = document.querySelectorAll('.ad-item:not(.ad-center-btn)');
const centerBtn = document.querySelector('.ad-center-btn');

adItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    adItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});

if (centerBtn) {
  centerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    centerBtn.classList.add('pressed');
    setTimeout(() => {
      centerBtn.classList.remove('pressed');
    }, 200);
  });
}`,
  ts: `// Interactive hover states for Adaptive Multi-Device Dock (TypeScript)
const adItems = document.querySelectorAll<HTMLAnchorElement>('.ad-item:not(.ad-center-btn)');
const centerBtn = document.querySelector<HTMLAnchorElement>('.ad-center-btn');

adItems.forEach(item => {
  item.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    adItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
  });
});

if (centerBtn) {
  centerBtn.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    centerBtn.classList.add('pressed');
    setTimeout(() => {
      centerBtn.classList.remove('pressed');
    }, 200);
  });
}`,
  css: `/* Adaptive Multi-Device Dock Styles */
.adaptive-dock-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
  width: 100%;
  padding-bottom: 2rem;
  font-family: 'Outfit', sans-serif;
  background: radial-gradient(circle at bottom, rgba(30,30,40,1) 0%, rgba(10,10,15,1) 100%);
}

.adaptive-dock {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 30px;
  box-shadow: 
    0 30px 60px -12px rgba(0, 0, 0, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.ad-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

.ad-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.05);
  border-radius: inherit;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.3s;
}

.ad-item:hover::before {
  opacity: 1;
  transform: scale(1);
}

.ad-icon {
  position: relative;
  z-index: 2;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-label {
  position: relative;
  z-index: 2;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  transition: all 0.3s;
  /* Magic expansion trick */
  max-width: 0;
  opacity: 0;
  white-space: nowrap;
}

.ad-item:hover .ad-icon,
.ad-item.active .ad-icon {
  color: #fff;
  transform: translateY(-2px);
}

.ad-item:hover .ad-label,
.ad-item.active .ad-label {
  color: #fff;
}

/* Expansion logic on Desktop Hover */
@media (min-width: 1024px) {
  .adaptive-dock:hover .ad-item:not(.ad-center-btn) .ad-label {
    max-width: 100px;
    opacity: 1;
    margin-left: 2px;
  }
}

.ad-item.active {
  background: rgba(255,255,255,0.08);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
}
.ad-item.active .ad-label {
  max-width: 100px;
  opacity: 1;
  margin-left: 2px;
}

.ad-glow {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: #00e5ff;
  border-radius: 50%;
  filter: blur(15px);
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 0;
}

.ad-item.active .ad-glow {
  opacity: 0.6;
}

.ad-divider {
  width: 2px;
  height: 24px;
  background: rgba(255,255,255,0.05);
  margin: 0 4px;
}

/* Center Button */
.ad-center-btn {
  padding: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00e5ff, #b400ff);
  box-shadow: 
    0 10px 20px rgba(180, 0, 255, 0.4),
    inset 0 2px 4px rgba(255,255,255,0.4);
}
.ad-center-btn::before { display: none; }

.ad-center-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 
    0 15px 25px rgba(180, 0, 255, 0.5),
    inset 0 2px 4px rgba(255,255,255,0.4);
}
.ad-center-btn.pressed {
  transform: translateY(2px) scale(0.95);
}

.ad-center-btn .ad-icon {
  color: #fff;
  transform: none !important;
}

.ad-center-pulse {
  position: absolute;
  inset: -4px;
  border: 2px solid #b400ff;
  border-radius: 50%;
  opacity: 0;
  animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 0.8; }
  100% { transform: scale(1.5); opacity: 0; }
}

.ad-avatar-wrapper {
  position: relative;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05));
}
.ad-avatar-wrapper img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.ad-status {
  position: absolute;
  bottom: 0; right: 0;
  width: 8px; height: 8px;
  background: #00ff88;
  border-radius: 50%;
  border: 2px solid #1a1a24;
}

/* Tablet (Show Icons + Labels) */
@media (min-width: 768px) and (max-width: 1023px) {
  .ad-label {
    max-width: 100px;
    opacity: 1;
    margin-left: 2px;
  }
}

/* Mobile (Icons Only) */
@media (max-width: 767px) {
  .adaptive-dock {
    padding: 0.5rem;
    gap: 0.25rem;
  }
  .ad-item {
    padding: 10px;
  }
  .ad-item.active .ad-label {
    max-width: 0;
    opacity: 0;
    margin-left: 0;
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a dock navigation that intelligently adapts between mobile, tablet, desktop, ultrawide, and 4K screens. On mobile show icons only. On tablet show icons with labels. On desktop allow hover expansion with labels. Maintain perfect alignment, spacing, and touch targets. Use modern gaming aesthetics and optimized performance.`
};
