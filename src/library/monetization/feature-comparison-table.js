/**
 * Component: Feature Comparison Table
 * Category: monetization
 */

export const component = {
  id: 'feature-comparison-table',
  name: 'Feature Comparison Table',
  category: 'monetization',
  tag: 'Premium',
  html: `<div class="fcomp-wrapper">
  <div class="fcomp-container">
    
    <div class="fcomp-header">
      <h2>Compare Plans</h2>
      <p>Find the perfect tier for your playstyle.</p>
    </div>
    
    <div class="fcomp-table-wrapper">
      <table class="fcomp-table">
        <thead>
          <tr>
            <th class="fcomp-feat-col">Features</th>
            <th>
              <div class="fcomp-th-content">
                <span class="fcomp-th-title">Basic</span>
                <span class="fcomp-th-price">Free</span>
              </div>
            </th>
            <th class="fcomp-highlight-col">
              <div class="fcomp-th-content">
                <span class="fcomp-th-badge">Recommended</span>
                <span class="fcomp-th-title">Pro</span>
                <span class="fcomp-th-price">$12<small>/mo</small></span>
              </div>
            </th>
            <th>
              <div class="fcomp-th-content">
                <span class="fcomp-th-title">Elite</span>
                <span class="fcomp-th-price">$24<small>/mo</small></span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Category Row -->
          <tr class="fcomp-category">
            <td colspan="4">Core Gaming</td>
          </tr>
          <tr>
            <td class="fcomp-feat-name">Multiplayer Access</td>
            <td><i class="fcomp-check"></i></td>
            <td class="fcomp-highlight-cell"><i class="fcomp-check"></i></td>
            <td><i class="fcomp-check"></i></td>
          </tr>
          <tr>
            <td class="fcomp-feat-name">Matchmaking Priority</td>
            <td>Standard</td>
            <td class="fcomp-highlight-cell">High</td>
            <td>Highest</td>
          </tr>
          <tr>
            <td class="fcomp-feat-name">Ad-Free Experience</td>
            <td><i class="fcomp-cross"></i></td>
            <td class="fcomp-highlight-cell"><i class="fcomp-check"></i></td>
            <td><i class="fcomp-check"></i></td>
          </tr>
          
          <!-- Category Row -->
          <tr class="fcomp-category">
            <td colspan="4">Cloud & Storage</td>
          </tr>
          <tr>
            <td class="fcomp-feat-name">Cloud Saves</td>
            <td><i class="fcomp-cross"></i></td>
            <td class="fcomp-highlight-cell">100 GB</td>
            <td>Unlimited</td>
          </tr>
          <tr>
            <td class="fcomp-feat-name">Auto-Sync</td>
            <td><i class="fcomp-cross"></i></td>
            <td class="fcomp-highlight-cell"><i class="fcomp-check"></i></td>
            <td><i class="fcomp-check"></i></td>
          </tr>
          
          <!-- Category Row -->
          <tr class="fcomp-category">
            <td colspan="4">Rewards & Extras</td>
          </tr>
          <tr>
            <td class="fcomp-feat-name">Monthly Cosmetics</td>
            <td><i class="fcomp-cross"></i></td>
            <td class="fcomp-highlight-cell">2 Items</td>
            <td>5 Items + Exclusive Pet</td>
          </tr>
          <tr>
            <td class="fcomp-feat-name">Tournament Entry</td>
            <td>Paid</td>
            <td class="fcomp-highlight-cell">1 Free/mo</td>
            <td>Unlimited Free</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td><button class="fcomp-btn fcomp-btn-outline">Current Plan</button></td>
            <td class="fcomp-highlight-cell"><button class="fcomp-btn fcomp-btn-primary">Upgrade to Pro</button></td>
            <td><button class="fcomp-btn fcomp-btn-outline">Upgrade to Elite</button></td>
          </tr>
        </tfoot>
      </table>
    </div>

  </div>
</div>`,
  js: `// Feature Comparison Table Logic
// Simple sticky header shadow effect on scroll could be added here if the table is very long.
// For the component demo, CSS handles the styling beautifully.`,
  ts: `// Feature Comparison Table Logic (TypeScript)`,
  css: `/* Feature Comparison Table Styles */
.fcomp-wrapper {
  background: #ffffff;
  padding: 80px 20px;
  font-family: 'Inter', system-ui, sans-serif;
  color: #0f172a;
}

.fcomp-container {
  max-width: 1000px;
  margin: 0 auto;
}

.fcomp-header {
  text-align: center;
  margin-bottom: 40px;
}

.fcomp-header h2 {
  font-size: 2.25rem;
  font-weight: 800;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

.fcomp-header p {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0;
}

.fcomp-table-wrapper {
  overflow-x: auto; /* For mobile scrolling */
  padding-bottom: 20px;
}

.fcomp-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
}

/* Table Headers */
.fcomp-table th {
  padding: 24px 16px;
  border-bottom: 2px solid #e2e8f0;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.fcomp-feat-col {
  text-align: left !important;
  width: 35%;
}

.fcomp-th-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.fcomp-th-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
}

.fcomp-th-price {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0f172a;
}

.fcomp-th-price small {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.fcomp-th-badge {
  background: #3b82f6;
  color: #fff;
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

/* Highlight Column (Recommended Plan) */
.fcomp-highlight-col {
  background: #f8fafc;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.fcomp-highlight-cell {
  background: #f8fafc;
  border-left: 2px solid #3b82f6 !important;
  border-right: 2px solid #3b82f6 !important;
}

.fcomp-table th.fcomp-highlight-col {
  border-top: 2px solid #3b82f6;
  border-bottom: 2px solid #3b82f6;
}

/* Table Body */
.fcomp-table td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  color: #475569;
  font-size: 0.95rem;
}

.fcomp-feat-name {
  text-align: left;
  font-weight: 500;
  color: #1e293b;
}

.fcomp-category td {
  text-align: left;
  font-weight: 700;
  color: #0f172a;
  background: #f8fafc;
  padding-top: 32px;
  padding-bottom: 12px;
  font-size: 1.1rem;
  border-bottom: 2px solid #e2e8f0;
}

/* Footer / Actions */
.fcomp-table tfoot td {
  padding: 32px 16px;
  border-bottom: none;
}

.fcomp-table tfoot .fcomp-highlight-cell {
  border-bottom: 2px solid #3b82f6 !important;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
}

.fcomp-btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.fcomp-btn-outline {
  background: #fff;
  border: 1px solid #cbd5e1;
  color: #0f172a;
}
.fcomp-btn-outline:hover { background: #f1f5f9; }

.fcomp-btn-primary {
  background: #3b82f6;
  border: none;
  color: #fff;
}
.fcomp-btn-primary:hover { background: #2563eb; }

/* Icons */
.fcomp-check, .fcomp-cross {
  width: 24px; height: 24px;
  display: inline-block;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.fcomp-check { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2310b981' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E"); }
.fcomp-cross { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E"); }

/* Responsive adjustments */
@media (max-width: 768px) {
  .fcomp-table th, .fcomp-table td { padding: 12px 8px; font-size: 0.85rem; }
  .fcomp-th-title { font-size: 1rem; }
  .fcomp-th-price { font-size: 1.25rem; }
  .fcomp-feat-col { min-width: 120px; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Design an enterprise-grade Feature Comparison Table comparing free, premium, and elite plans with sticky headers and visual highlights for recommended plans.`
};
