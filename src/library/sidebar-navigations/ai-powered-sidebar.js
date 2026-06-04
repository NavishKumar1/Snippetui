/**
 * Component: AI-Powered Sidebar
 * Category: sidebar-navigations
 */

export const component = {
  id: 'ai-powered-sidebar',
  name: 'AI-Powered Sidebar',
  category: 'sidebar-navigations',
  tag: 'Premium',
  html: `<div class="aips-container">
  <aside class="aips-sidebar">
    <div class="aips-header">
      <div class="aips-logo-ai">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      </div>
      <span class="aips-title">Quantum AI</span>
    </div>

    <!-- AI Assistant Prompt Area -->
    <div class="aips-prompt-zone">
      <div class="aips-prompt-box">
        <div class="aips-sparkle"></div>
        <input type="text" placeholder="Ask AI Assistant..." class="aips-input">
        <button class="aips-send">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>

    <div class="aips-content">
      <div class="aips-section">
        <h4 class="aips-subtitle">AI SUGGESTIONS</h4>
        <nav class="aips-nav">
          <a href="#" class="aips-item ai-highlight">
            <svg class="aips-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            <div class="aips-item-text">
              <span class="aips-label">Optimize Performance</span>
              <span class="aips-desc">System detected high usage</span>
            </div>
          </a>
          <a href="#" class="aips-item">
            <svg class="aips-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            <div class="aips-item-text">
              <span class="aips-label">Continue Guide</span>
              <span class="aips-desc">Elden Ring Walkthrough</span>
            </div>
          </a>
        </nav>
      </div>

      <div class="aips-section">
        <h4 class="aips-subtitle">LIBRARY</h4>
        <nav class="aips-nav">
          <a href="#" class="aips-item">
            <svg class="aips-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span class="aips-label">Dashboard</span>
          </a>
          <a href="#" class="aips-item">
            <svg class="aips-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg>
            <span class="aips-label">All Games</span>
          </a>
          <a href="#" class="aips-item">
            <svg class="aips-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line></svg>
            <span class="aips-label">Downloads</span>
          </a>
        </nav>
      </div>
    </div>
  </aside>
</div>`,
  js: `// AI Sidebar Magic Focus
const promptBox = document.querySelector('.aips-prompt-box');
const input = document.querySelector('.aips-input');

if (input) {
  input.addEventListener('focus', () => {
    promptBox.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    promptBox.classList.remove('focused');
  });
}`,
  ts: `// AI Sidebar Magic Focus (TypeScript)
const promptBox = document.querySelector<HTMLDivElement>('.aips-prompt-box');
const input = document.querySelector<HTMLInputElement>('.aips-input');

if (input && promptBox) {
  input.addEventListener('focus', () => {
    promptBox.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    promptBox.classList.remove('focused');
  });
}`,
  css: `/* AI-Powered Sidebar */
.aips-container {
  display: flex;
  height: 600px;
  background: #000;
  padding: 1rem;
  font-family: 'Inter', sans-serif;
  color: #fff;
}

.aips-sidebar {
  width: 280px;
  height: 100%;
  background: #09090b;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
}

.aips-header {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.aips-logo-ai {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0ea5e9, #6366f1, #d946ef);
  border-radius: 10px;
  color: white;
  animation: ai-pulse 3s infinite alternate;
}

@keyframes ai-pulse {
  0% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.4); }
  100% { box-shadow: 0 0 20px rgba(217, 70, 239, 0.8), inset 0 0 10px rgba(255,255,255,0.5); }
}

.aips-title {
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

/* Prompt Zone */
.aips-prompt-zone {
  padding: 0 20px 20px;
}

.aips-prompt-box {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 2px;
  transition: all 0.3s;
}

.aips-prompt-box.focused {
  background: rgba(255,255,255,0.05);
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
}

/* Moving gradient border effect */
.aips-prompt-box::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 13px;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.8), transparent);
  background-size: 200% 100%;
  animation: ai-scan 2s linear infinite;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s;
}

.aips-prompt-box.focused::before {
  opacity: 1;
}

@keyframes ai-scan {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.aips-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 12px 14px;
  color: #fff;
  font-size: 0.9rem;
  outline: none;
}

.aips-input::placeholder { color: #52525b; }

.aips-send {
  background: transparent;
  border: none;
  color: #6366f1;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}
.aips-send:hover {
  background: rgba(99, 102, 241, 0.1);
}

.aips-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 20px;
}
.aips-content::-webkit-scrollbar { display: none; }

.aips-section { margin-bottom: 24px; }

.aips-subtitle {
  font-size: 0.7rem;
  color: #52525b;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0 0 12px 0;
}

.aips-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.aips-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  color: #a1a1aa;
  text-decoration: none;
  transition: all 0.2s;
  background: transparent;
}

.aips-item:hover {
  background: rgba(255,255,255,0.03);
  color: #fff;
}

/* AI Highlight Item */
.aips-item.ai-highlight {
  background: linear-gradient(90deg, rgba(99, 102, 241, 0.1), transparent);
  border-left: 2px solid #6366f1;
  color: #fff;
}
.aips-item.ai-highlight .aips-icon {
  color: #6366f1;
}

.aips-icon { opacity: 0.8; }

.aips-item-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.aips-label {
  font-size: 0.9rem;
  font-weight: 500;
}

.aips-desc {
  font-size: 0.75rem;
  color: #71717a;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a futuristic sidebar with integrated AI Assistant access. Include contextual shortcuts, smart recommendations, and intelligent navigation suggestions.`
};
