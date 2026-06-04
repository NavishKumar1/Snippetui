/**
 * Component: Upgrade Banner
 * Category: monetization
 */

export const component = {
  id: 'upgrade-banner',
  name: 'Upgrade Banner',
  category: 'monetization',
  tag: 'Premium',
  html: `<div class="upb-wrapper">
  
  <div class="upb-banner">
    <!-- Background Glow Effect -->
    <div class="upb-glow"></div>
    
    <div class="upb-content">
      <div class="upb-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
      </div>
      
      <div class="upb-text">
        <h3>Unlock Premium Features</h3>
        <p>You've reached your free cloud storage limit. Upgrade to Pro for 100GB of storage, priority matchmaking, and exclusive cosmetics.</p>
      </div>
    </div>
    
    <div class="upb-actions">
      <button class="upb-dismiss">Maybe Later</button>
      <button class="upb-upgrade">Upgrade to Pro</button>
    </div>
  </div>

</div>`,
  js: `// Upgrade Banner Logic
const dismissBtn = document.querySelector('.upb-dismiss');
const banner = document.querySelector('.upb-banner');

if (dismissBtn && banner) {
  dismissBtn.addEventListener('click', () => {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-20px) scale(0.98)';
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);
  });
}`,
  ts: `// Upgrade Banner Logic (TypeScript)
const dismissBtn = document.querySelector<HTMLButtonElement>('.upb-dismiss');
const banner = document.querySelector<HTMLDivElement>('.upb-banner');

if (dismissBtn && banner) {
  dismissBtn.addEventListener('click', () => {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-20px) scale(0.98)';
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);
  });
}`,
  css: `/* Upgrade Banner Styles */
.upb-wrapper {
  background: #f8fafc;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  font-family: 'Inter', system-ui, sans-serif;
}

.upb-banner {
  width: 100%;
  max-width: 900px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.15), 0 8px 10px -6px rgba(59, 130, 246, 0.1);
  padding: 24px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 1px solid #bfdbfe;
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* Elegant radial glow behind the banner content */
.upb-glow {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at 0% 50%, rgba(59, 130, 246, 0.08) 0%, rgba(255,255,255,0) 60%);
  pointer-events: none;
}

.upb-content {
  display: flex;
  align-items: center;
  gap: 24px;
  position: relative;
  z-index: 1;
  flex: 1;
  padding-right: 32px;
}

.upb-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: #fff;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.upb-text h3 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}

.upb-text p {
  margin: 0;
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.5;
}

.upb-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.upb-dismiss {
  background: transparent;
  border: none;
  color: #64748b;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.2s;
}

.upb-dismiss:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.upb-upgrade {
  background: #0f172a;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

.upb-upgrade:hover {
  background: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .upb-banner {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 24px;
  }
  .upb-content {
    padding-right: 0;
  }
  .upb-actions {
    width: 100%;
    justify-content: flex-end;
  }
}

@media (max-width: 480px) {
  .upb-content {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 16px;
  }
  .upb-actions {
    flex-direction: column-reverse;
    width: 100%;
  }
  .upb-dismiss, .upb-upgrade {
    width: 100%;
    text-align: center;
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build a highly effective Upgrade Banner component designed to encourage users to upgrade their subscription using premium visual hierarchy and non-intrusive messaging.`
};
