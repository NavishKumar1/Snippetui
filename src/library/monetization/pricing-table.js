/**
 * Component: Pricing Table
 * Category: monetization
 */

export const component = {
  id: 'pricing-table',
  name: 'Pricing Table',
  category: 'monetization',
  tag: 'Premium',
  html: `<div class="ptab-wrapper">
  <div class="ptab-container">
    
    <div class="ptab-header">
      <h2>Simple, transparent pricing</h2>
      <p>Unlock the full potential of the platform. No hidden fees.</p>
      
      <div class="ptab-toggle">
        <span class="ptab-t-lbl">Monthly</span>
        <label class="ptab-switch">
          <input type="checkbox" id="ptab-billing-toggle" checked>
          <span class="ptab-slider"></span>
        </label>
        <span class="ptab-t-lbl active">Annually <span class="ptab-save">Save 20%</span></span>
      </div>
    </div>
    
    <div class="ptab-grid">
      
      <!-- Basic Plan -->
      <div class="ptab-card">
        <div class="ptab-c-head">
          <h3>Basic</h3>
          <p>For casual players looking for the essentials.</p>
          <div class="ptab-price">
            <span class="ptab-currency">$</span>
            <span class="ptab-amount" data-monthly="0" data-annual="0">0</span>
            <span class="ptab-period">/mo</span>
          </div>
        </div>
        <button class="ptab-btn ptab-btn-outline">Get Started</button>
        <div class="ptab-features">
          <ul>
            <li><i class="ptab-check"></i> Standard matchmaking</li>
            <li><i class="ptab-check"></i> Community forum access</li>
            <li><i class="ptab-cross"></i> No cloud saves</li>
            <li><i class="ptab-cross"></i> Ad-supported</li>
          </ul>
        </div>
      </div>
      
      <!-- Pro Plan -->
      <div class="ptab-card ptab-popular">
        <div class="ptab-popular-badge">MOST POPULAR</div>
        <div class="ptab-c-head">
          <h3>Pro</h3>
          <p>For dedicated gamers wanting a premium experience.</p>
          <div class="ptab-price">
            <span class="ptab-currency">$</span>
            <span class="ptab-amount" data-monthly="15" data-annual="12">12</span>
            <span class="ptab-period">/mo</span>
          </div>
        </div>
        <button class="ptab-btn ptab-btn-primary">Upgrade to Pro</button>
        <div class="ptab-features">
          <ul>
            <li><i class="ptab-check"></i> Priority matchmaking</li>
            <li><i class="ptab-check"></i> 100GB Cloud Save Storage</li>
            <li><i class="ptab-check"></i> Ad-free experience</li>
            <li><i class="ptab-check"></i> Monthly exclusive cosmetics</li>
          </ul>
        </div>
      </div>
      
      <!-- Elite Plan -->
      <div class="ptab-card">
        <div class="ptab-c-head">
          <h3>Elite</h3>
          <p>For the hardcore competitive player.</p>
          <div class="ptab-price">
            <span class="ptab-currency">$</span>
            <span class="ptab-amount" data-monthly="30" data-annual="24">24</span>
            <span class="ptab-period">/mo</span>
          </div>
        </div>
        <button class="ptab-btn ptab-btn-outline">Upgrade to Elite</button>
        <div class="ptab-features">
          <ul>
            <li><i class="ptab-check"></i> Everything in Pro</li>
            <li><i class="ptab-check"></i> Unlimited Cloud Storage</li>
            <li><i class="ptab-check"></i> Free tournament entries</li>
            <li><i class="ptab-check"></i> Private dedicated servers</li>
          </ul>
        </div>
      </div>
      
    </div>
  </div>
</div>`,
  js: `// Pricing Table Logic
const ptabToggle = document.getElementById('ptab-billing-toggle');
const ptabAmounts = document.querySelectorAll('.ptab-amount');
const ptabLabels = document.querySelectorAll('.ptab-t-lbl');

if (ptabToggle) {
  ptabToggle.addEventListener('change', (e) => {
    const isAnnual = e.target.checked;
    
    // Update labels
    ptabLabels[0].classList.toggle('active', !isAnnual);
    ptabLabels[1].classList.toggle('active', isAnnual);
    
    // Animate prices
    ptabAmounts.forEach(amt => {
      amt.style.opacity = '0';
      amt.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        const val = isAnnual ? amt.getAttribute('data-annual') : amt.getAttribute('data-monthly');
        amt.innerText = val;
        amt.style.opacity = '1';
        amt.style.transform = 'translateY(0)';
      }, 300);
    });
  });
}`,
  ts: `// Pricing Table Logic (TypeScript)
const ptabToggle = document.getElementById('ptab-billing-toggle') as HTMLInputElement | null;
const ptabAmounts = document.querySelectorAll<HTMLSpanElement>('.ptab-amount');
const ptabLabels = document.querySelectorAll<HTMLSpanElement>('.ptab-t-lbl');

if (ptabToggle) {
  ptabToggle.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLInputElement;
    const isAnnual = target.checked;
    
    if (ptabLabels.length >= 2) {
      ptabLabels[0].classList.toggle('active', !isAnnual);
      ptabLabels[1].classList.toggle('active', isAnnual);
    }
    
    ptabAmounts.forEach(amt => {
      amt.style.opacity = '0';
      amt.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        const val = isAnnual ? amt.getAttribute('data-annual') : amt.getAttribute('data-monthly');
        if (val !== null) amt.innerText = val;
        amt.style.opacity = '1';
        amt.style.transform = 'translateY(0)';
      }, 300);
    });
  });
}`,
  css: `/* Pricing Table Styles */
.ptab-wrapper {
  background: #ffffff;
  padding: 80px 20px;
  font-family: 'Inter', system-ui, sans-serif;
  color: #0f172a;
}

.ptab-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header & Toggle */
.ptab-header {
  text-align: center;
  margin-bottom: 60px;
}

.ptab-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin: 0 0 16px 0;
}

.ptab-header p {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0 0 32px 0;
}

.ptab-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.ptab-t-lbl {
  font-weight: 500;
  color: #94a3b8;
  transition: color 0.3s;
}

.ptab-t-lbl.active {
  color: #0f172a;
  font-weight: 600;
}

.ptab-save {
  background: #dcfce7;
  color: #166534;
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 8px;
  font-weight: 700;
}

/* Toggle Switch CSS */
.ptab-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

.ptab-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.ptab-slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #e2e8f0;
  transition: .4s;
  border-radius: 28px;
}

.ptab-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

input:checked + .ptab-slider { background-color: #3b82f6; }
input:focus + .ptab-slider { box-shadow: 0 0 1px #3b82f6; }
input:checked + .ptab-slider:before { transform: translateX(22px); }

/* Grid Layout */
.ptab-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  align-items: center;
}

/* Cards */
.ptab-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 40px 32px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
}

.ptab-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
}

.ptab-popular {
  border: 2px solid #3b82f6;
  box-shadow: 0 20px 25px -5px rgba(59,130,246,0.1);
  padding: 48px 32px; /* Make it taller */
  z-index: 1;
}

.ptab-popular-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: #3b82f6;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 20px;
  letter-spacing: 1px;
}

.ptab-c-head { margin-bottom: 32px; }
.ptab-c-head h3 { font-size: 1.5rem; margin: 0 0 12px 0; }
.ptab-c-head p { font-size: 0.95rem; color: #64748b; margin: 0 0 24px 0; min-height: 44px; }

.ptab-price { display: flex; align-items: flex-start; color: #0f172a; }
.ptab-currency { font-size: 1.5rem; font-weight: 600; margin-top: 8px; }
.ptab-amount { 
  font-size: 4rem; 
  font-weight: 800; 
  letter-spacing: -2px; 
  line-height: 1;
  transition: opacity 0.3s, transform 0.3s;
}
.ptab-period { font-size: 1rem; color: #64748b; font-weight: 500; margin-top: auto; margin-bottom: 8px; margin-left: 4px; }

/* Buttons */
.ptab-btn {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 32px;
  transition: all 0.2s;
}

.ptab-btn-outline { background: #fff; color: #0f172a; border: 1px solid #cbd5e1; }
.ptab-btn-outline:hover { border-color: #0f172a; }

.ptab-btn-primary { background: #3b82f6; color: #fff; border: none; }
.ptab-btn-primary:hover { background: #2563eb; box-shadow: 0 4px 12px rgba(37,99,235,0.3); transform: translateY(-2px); }

/* Features List */
.ptab-features ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
.ptab-features li { display: flex; align-items: flex-start; gap: 12px; font-size: 0.95rem; color: #475569; }

.ptab-check, .ptab-cross {
  width: 20px; height: 20px;
  flex-shrink: 0;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* SVG icons as background-images to save space */
.ptab-check {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
}

.ptab-cross {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E");
}

/* Responsive */
@media (max-width: 1024px) {
  .ptab-grid { grid-template-columns: 1fr; max-width: 500px; margin: 0 auto; }
  .ptab-popular { padding: 40px 32px; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Create a world-class Pricing Table component inspired by Stripe and Figma. Support multiple plans, monthly/yearly toggles with animations, and highlighted recommended plans.`
};
