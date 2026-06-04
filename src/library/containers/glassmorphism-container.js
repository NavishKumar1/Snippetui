/**
 * Component: Glassmorphism Container
 * Category: containers
 */

export const component = {
  id: 'glassmorphism-container',
  name: 'Glassmorphism Container',
  category: 'containers',
  tag: 'Premium',
  html: `<div class="glass-env">
  <!-- Decorative background elements to showcase the glass effect -->
  <div class="glass-blob glass-blob-1"></div>
  <div class="glass-blob glass-blob-2"></div>
  <div class="glass-blob glass-blob-3"></div>

  <div class="glass-container">
    <div class="glass-header">
      <h2>Account Settings</h2>
      <button class="glass-btn-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    
    <div class="glass-content">
      <div class="glass-profile">
        <img src="https://i.pravatar.cc/150?img=11" alt="Profile" class="glass-avatar">
        <div class="glass-user-info">
          <h3>Alexander Wright</h3>
          <p>alex.wright@example.com</p>
        </div>
        <button class="glass-btn">Edit Profile</button>
      </div>
      
      <div class="glass-settings-grid">
        <div class="glass-card">
          <div class="glass-card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h4>Security</h4>
          <p>Manage your password and 2-step verification.</p>
        </div>
        
        <div class="glass-card">
          <div class="glass-card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
          </div>
          <h4>Activity</h4>
          <p>Review your login history and active sessions.</p>
        </div>
        
        <div class="glass-card">
          <div class="glass-card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <h4>Notifications</h4>
          <p>Control what emails and alerts you receive.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  js: `// Glassmorphism Container Logic
const glassEnv = document.querySelector('.glass-env');
if(glassEnv) {
  // Make blobs gently follow mouse to emphasize the blur effect
  glassEnv.addEventListener('mousemove', (e) => {
    const blobs = glassEnv.querySelectorAll('.glass-blob');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 20;
      blob.style.transform = \`translate(\${x * speed}px, \${y * speed}px)\`;
    });
  });
}`,
  ts: `// Glassmorphism Container Logic (TypeScript)
const glassEnv = document.querySelector<HTMLDivElement>('.glass-env');
if(glassEnv) {
  glassEnv.addEventListener('mousemove', (e: MouseEvent) => {
    const blobs = glassEnv.querySelectorAll<HTMLDivElement>('.glass-blob');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 20;
      blob.style.transform = \`translate(\${x * speed}px, \${y * speed}px)\`;
    });
  });
}`,
  css: `/* Glassmorphism Container Styles */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

.glass-env {
  position: relative;
  width: 100%;
  min-height: 600px;
  background: #0f1115; /* Deep dark background */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  font-family: 'Outfit', sans-serif;
  color: #fff;
}

/* Decorative Blobs for background */
.glass-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  transition: transform 0.2s ease-out;
}

.glass-blob-1 {
  width: 300px;
  height: 300px;
  background: rgba(124, 58, 237, 0.4); /* Purple */
  top: 10%;
  left: 20%;
}

.glass-blob-2 {
  width: 400px;
  height: 400px;
  background: rgba(14, 165, 233, 0.4); /* Sky Blue */
  bottom: -10%;
  right: 10%;
}

.glass-blob-3 {
  width: 250px;
  height: 250px;
  background: rgba(236, 72, 153, 0.3); /* Pink */
  top: 40%;
  left: 60%;
}

/* The Core Glass Container */
.glass-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 800px;
  
  /* The Glassmorphism Magic */
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  /* Borders and Shadow */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.5),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  
  padding: 32px;
  overflow: hidden;
}

/* Sub-elements inside the glass */
.glass-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.glass-btn-icon {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glass-btn-icon:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: rotate(90deg);
}

.glass-profile {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.glass-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  padding: 3px;
}

.glass-user-info {
  flex-grow: 1;
}

.glass-user-info h3 {
  margin: 0 0 4px 0;
  font-size: 1.25rem;
  font-weight: 500;
}

.glass-user-info p {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.95rem;
}

.glass-btn {
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.2);
  padding: 10px 24px;
  border-radius: 8px;
  color: #fff;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.glass-settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.glass-card {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s;
  cursor: pointer;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
}

.glass-card-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  color: #38bdf8;
}

.glass-card h4 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.glass-card p {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a modern Glassmorphism Container featuring background blur, layered transparency, subtle reflections, soft shadows, and elegant borders. The component should feel futuristic and luxurious.`
};
