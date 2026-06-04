/**
 * Component: Subscription Card
 * Category: monetization
 */

export const component = {
  id: 'subscription-card',
  name: 'Subscription Card',
  category: 'monetization',
  tag: 'Premium',
  html: `<div class="subc-wrapper">
  
  <div class="subc-card">
    <div class="subc-header">
      <div class="subc-plan-info">
        <span class="subc-badge">CURRENT PLAN</span>
        <h2>Pro Tier</h2>
        <p>You are on the Pro Tier. Your next billing date is Nov 12, 2026.</p>
      </div>
      <div class="subc-price">
        <span class="subc-currency">$</span>
        <span class="subc-amount">14</span>
        <span class="subc-period">/mo</span>
      </div>
    </div>
    
    <div class="subc-usage">
      <div class="subc-u-label">
        <span>Cloud Storage Used</span>
        <span>45GB / 100GB</span>
      </div>
      <div class="subc-u-bar">
        <div class="subc-u-fill" style="width: 45%;"></div>
      </div>
    </div>
    
    <div class="subc-features">
      <h4>Plan Benefits</h4>
      <ul>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Priority server queuing
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          100GB Cloud Save Storage
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Exclusive monthly cosmetic items
        </li>
      </ul>
    </div>
    
    <div class="subc-actions">
      <button class="subc-btn subc-btn-outline">Manage Billing</button>
      <button class="subc-btn subc-btn-primary">Upgrade to Elite</button>
    </div>
  </div>

</div>`,
  js: `// Subscription Card Logic
const subcFill = document.querySelector('.subc-u-fill');
if(subcFill) {
  setTimeout(() => {
    subcFill.style.width = '0%';
    setTimeout(() => {
      subcFill.style.width = '45%';
    }, 100);
  }, 300);
}`,
  ts: `// Subscription Card Logic (TypeScript)
const subcFill = document.querySelector<HTMLDivElement>('.subc-u-fill');
if(subcFill) {
  setTimeout(() => {
    subcFill.style.width = '0%';
    setTimeout(() => {
      subcFill.style.width = '45%';
    }, 100);
  }, 300);
}`,
  css: `/* Subscription Card Styles */
.subc-wrapper {
  background: #f8fafc;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  font-family: 'Inter', system-ui, sans-serif;
  color: #0f172a;
}

.subc-card {
  width: 100%;
  max-width: 500px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1);
  padding: 32px;
  border: 1px solid #e2e8f0;
}

.subc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 24px;
}

.subc-plan-info {
  flex: 1;
  padding-right: 20px;
}

.subc-badge {
  display: inline-block;
  background: #dbeafe;
  color: #2563eb;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.subc-plan-info h2 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.subc-plan-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
}

.subc-price {
  display: flex;
  align-items: flex-start;
  color: #0f172a;
}

.subc-currency {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 4px;
}

.subc-amount {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -1px;
}

.subc-period {
  font-size: 1rem;
  color: #64748b;
  font-weight: 500;
  margin-top: auto;
  margin-bottom: 6px;
}

.subc-usage {
  margin-bottom: 32px;
}

.subc-u-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 500;
  color: #475569;
  margin-bottom: 10px;
}

.subc-u-bar {
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
}

.subc-u-fill {
  height: 100%;
  background: #3b82f6;
  border-radius: 4px;
  transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.subc-features h4 {
  font-size: 0.9rem;
  color: #0f172a;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
}

.subc-features ul {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subc-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: #475569;
}

.subc-features svg {
  width: 20px;
  height: 20px;
  color: #10b981; /* Emerald green checkmarks */
  flex-shrink: 0;
}

.subc-actions {
  display: flex;
  gap: 16px;
}

.subc-btn {
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.subc-btn-outline {
  background: #fff;
  border: 1px solid #cbd5e1;
  color: #475569;
}

.subc-btn-outline:hover {
  background: #f8fafc;
  color: #0f172a;
  border-color: #94a3b8;
}

.subc-btn-primary {
  background: #0f172a;
  border: 1px solid #0f172a;
  color: #fff;
}

.subc-btn-primary:hover {
  background: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

@media (max-width: 480px) {
  .subc-header {
    flex-direction: column;
    gap: 20px;
  }
  .subc-actions {
    flex-direction: column;
  }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design a premium Subscription Card component optimized for gaming subscriptions, displaying plan usage, pricing, included features, and upgrade options.`
};
