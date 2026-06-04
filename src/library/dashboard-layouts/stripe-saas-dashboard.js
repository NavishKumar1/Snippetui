/**
 * Component: Stripe SaaS Dashboard
 * Category: dashboard-layouts
 */

export const component = {
  id: 'stripe-saas-dashboard',
  name: 'Stripe-Inspired SaaS Dashboard',
  category: 'dashboard-layouts',
  tag: 'Premium',
  html: `<div class="stpd-wrapper">
  
  <!-- Navigation Topbar -->
  <header class="stpd-topbar">
    <div class="stpd-top-left">
      <div class="stpd-logo">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        SaasFlow
      </div>
      <nav class="stpd-nav">
        <a href="#" class="active">Home</a>
        <a href="#">Payments</a>
        <a href="#">Balances</a>
        <a href="#">Customers</a>
        <a href="#">Billing</a>
      </nav>
    </div>
    <div class="stpd-top-right">
      <div class="stpd-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        Search
      </div>
      <button class="stpd-icon-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      </button>
      <div class="stpd-avatar">D</div>
    </div>
  </header>

  <!-- Main Content Area -->
  <main class="stpd-main">
    <div class="stpd-container">
      
      <!-- Page Header -->
      <div class="stpd-page-header">
        <h1>Today</h1>
        <div class="stpd-actions">
          <button class="stpd-btn stpd-btn-secondary">Export</button>
          <button class="stpd-btn stpd-btn-primary">+ Create Payment</button>
        </div>
      </div>

      <!-- Stats Row (Stripe Style) -->
      <div class="stpd-stats-grid">
        
        <div class="stpd-stat-card">
          <div class="stpd-stat-head">
            Gross volume
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
          </div>
          <div class="stpd-stat-val">$24,500.00</div>
          <div class="stpd-stat-chart">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,20 L10,15 L20,18 L30,10 L40,12 L50,5 L60,8 L70,2 L80,10 L90,4 L100,0 L100,20 Z" fill="#e0e7ff" />
              <path d="M0,20 L10,15 L20,18 L30,10 L40,12 L50,5 L60,8 L70,2 L80,10 L90,4 L100,0" fill="none" stroke="#6366f1" stroke-width="1.5" />
            </svg>
          </div>
        </div>

        <div class="stpd-stat-card">
          <div class="stpd-stat-head">
            Net volume from sales
          </div>
          <div class="stpd-stat-val">$21,240.00</div>
          <div class="stpd-stat-chart">
            <svg viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,20 L15,18 L30,15 L45,16 L60,10 L75,12 L90,5 L100,8 L100,20 Z" fill="#e0e7ff" />
              <path d="M0,20 L15,18 L30,15 L45,16 L60,10 L75,12 L90,5 L100,8" fill="none" stroke="#6366f1" stroke-width="1.5" />
            </svg>
          </div>
        </div>

        <div class="stpd-stat-card">
          <div class="stpd-stat-head">
            New customers
          </div>
          <div class="stpd-stat-val">42</div>
          <div class="stpd-stat-chart">
            <!-- Simple CSS bars -->
            <div class="stpd-bars">
              <div class="stpd-bar" style="height: 40%"></div>
              <div class="stpd-bar" style="height: 60%"></div>
              <div class="stpd-bar" style="height: 30%"></div>
              <div class="stpd-bar" style="height: 80%"></div>
              <div class="stpd-bar" style="height: 100%"></div>
              <div class="stpd-bar" style="height: 50%"></div>
              <div class="stpd-bar" style="height: 70%"></div>
            </div>
          </div>
        </div>
        
      </div>

      <!-- Main Layout -->
      <div class="stpd-layout">
        
        <div class="stpd-col-main">
          
          <!-- Recent Payments Table -->
          <div class="stpd-card">
            <div class="stpd-card-header">
              <h2>Recent payments</h2>
              <button class="stpd-btn-text">View all</button>
            </div>
            <table class="stpd-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Customer</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>$149.00</strong> <span class="stpd-curr">USD</span></td>
                  <td><span class="stpd-badge stpd-success">Succeeded</span></td>
                  <td>Pro Annual Plan</td>
                  <td>alex@example.com</td>
                  <td>Today, 2:45 PM</td>
                </tr>
                <tr>
                  <td><strong>$49.00</strong> <span class="stpd-curr">USD</span></td>
                  <td><span class="stpd-badge stpd-success">Succeeded</span></td>
                  <td>Pro Monthly Plan</td>
                  <td>sarah.w@example.com</td>
                  <td>Today, 1:12 PM</td>
                </tr>
                <tr>
                  <td><strong>$299.00</strong> <span class="stpd-curr">USD</span></td>
                  <td><span class="stpd-badge stpd-failed">Failed</span></td>
                  <td>Enterprise Setup</td>
                  <td>billing@corp.com</td>
                  <td>Today, 11:30 AM</td>
                </tr>
                <tr>
                  <td><strong>$149.00</strong> <span class="stpd-curr">USD</span></td>
                  <td><span class="stpd-badge stpd-success">Succeeded</span></td>
                  <td>Pro Annual Plan</td>
                  <td>mike99@example.com</td>
                  <td>Yesterday</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Monetization / Subscription Management -->
          <div class="stpd-card stpd-sub-management">
            <div class="stpd-card-header">
              <h2>Subscription Products</h2>
              <button class="stpd-btn stpd-btn-secondary">New Product</button>
            </div>
            <div class="stpd-sub-list">
              <div class="stpd-sub-item">
                <div class="stpd-sub-icon">P</div>
                <div class="stpd-sub-details">
                  <h4>Pro Plan</h4>
                  <p>1,245 active subscribers</p>
                </div>
                <div class="stpd-sub-price">$49.00 / month</div>
                <button class="stpd-icon-btn">•••</button>
              </div>
              <div class="stpd-sub-item">
                <div class="stpd-sub-icon" style="background:#8b5cf6">E</div>
                <div class="stpd-sub-details">
                  <h4>Elite Plan</h4>
                  <p>420 active subscribers</p>
                </div>
                <div class="stpd-sub-price">$149.00 / month</div>
                <button class="stpd-icon-btn">•••</button>
              </div>
            </div>
          </div>

        </div>

        <div class="stpd-col-side">
          
          <!-- Balances -->
          <div class="stpd-card">
            <div class="stpd-card-header">
              <h2>Balances</h2>
            </div>
            <div class="stpd-balance">
              <span class="stpd-b-label">Available to pay out</span>
              <span class="stpd-b-val">$12,450.00</span>
              <button class="stpd-btn stpd-btn-secondary stpd-full">Pay out now</button>
            </div>
            <div class="stpd-balance-divider"></div>
            <div class="stpd-balance-future">
              <span class="stpd-b-label">On the way</span>
              <span class="stpd-b-subval">$4,200.00</span>
            </div>
          </div>
          
          <!-- Quick Upgrade Banner (Monetization tie-in) -->
          <div class="stpd-upgrade-box">
            <div class="stpd-ub-icon">⚡</div>
            <h4>Unlock Advanced Analytics</h4>
            <p>Get deeper insights into your subscription metrics and churn analysis.</p>
            <button class="stpd-btn-text">Learn about Revenue Recognition &rarr;</button>
          </div>

        </div>
        
      </div>
    </div>
  </main>
</div>`,
  js: `// Stripe SaaS Dashboard Logic
// Add subtle entry animation for rows
const stpdRows = document.querySelectorAll('.stpd-table tbody tr');
stpdRows.forEach((row, index) => {
  row.style.opacity = '0';
  row.style.transform = 'translateX(-10px)';
  setTimeout(() => {
    row.style.transition = 'all 0.3s ease';
    row.style.opacity = '1';
    row.style.transform = 'translateX(0)';
  }, 100 + (index * 50));
});`,
  ts: `// Stripe SaaS Dashboard Logic (TypeScript)
const stpdRows = document.querySelectorAll<HTMLTableRowElement>('.stpd-table tbody tr');
stpdRows.forEach((row, index) => {
  row.style.opacity = '0';
  row.style.transform = 'translateX(-10px)';
  setTimeout(() => {
    row.style.transition = 'all 0.3s ease';
    row.style.opacity = '1';
    row.style.transform = 'translateX(0)';
  }, 100 + (index * 50));
});`,
  css: `/* Stripe SaaS Dashboard Styles */
.stpd-wrapper {
  background: #f6f9fc; /* Stripe background color */
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #30313d;
}

/* Topbar */
.stpd-topbar {
  background: #fff;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.stpd-top-left {
  display: flex;
  align-items: center;
  gap: 32px;
}

.stpd-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  color: #635bff; /* Stripe Blurple */
}

.stpd-logo svg {
  width: 24px;
  height: 24px;
}

.stpd-nav {
  display: flex;
  gap: 24px;
}

.stpd-nav a {
  text-decoration: none;
  color: #697386;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 8px 0;
  transition: color 0.2s;
}

.stpd-nav a:hover, .stpd-nav a.active {
  color: #30313d;
}

.stpd-top-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stpd-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f3f4f6;
  padding: 6px 12px;
  border-radius: 6px;
  color: #697386;
  font-size: 0.9rem;
  cursor: text;
  width: 200px;
}

.stpd-search svg { width: 14px; height: 14px; }

.stpd-icon-btn {
  background: transparent;
  border: none;
  color: #697386;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stpd-icon-btn svg { width: 20px; height: 20px; }

.stpd-avatar {
  width: 28px;
  height: 28px;
  background: #635bff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.85rem;
}

/* Main Content */
.stpd-main {
  padding: 48px 24px;
}

.stpd-container {
  max-width: 1080px;
  margin: 0 auto;
}

.stpd-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.stpd-page-header h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.stpd-actions {
  display: flex;
  gap: 12px;
}

.stpd-btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.stpd-btn-secondary {
  background: #fff;
  border-color: #e5e7eb;
  color: #30313d;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.stpd-btn-secondary:hover { background: #f9fafb; border-color: #d1d5db; }

.stpd-btn-primary {
  background: #635bff;
  color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.stpd-btn-primary:hover { background: #5851df; }

/* Stats Grid */
.stpd-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.stpd-stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02);
  border: 1px solid #e5e7eb;
  position: relative;
  overflow: hidden;
}

.stpd-stat-head {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #697386;
  margin-bottom: 12px;
}

.stpd-stat-head svg { width: 14px; height: 14px; }

.stpd-stat-val {
  font-size: 1.5rem;
  font-weight: 600;
}

.stpd-stat-chart {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 40px;
  opacity: 0.8;
}

.stpd-stat-chart svg {
  width: 100%; height: 100%;
}

.stpd-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
  padding: 0 10px;
}

.stpd-bar {
  width: 10%;
  background: #e0e7ff;
  border-radius: 2px 2px 0 0;
}

/* Layout */
.stpd-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.stpd-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02);
  border: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

.stpd-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.stpd-card-header h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.stpd-btn-text {
  background: transparent;
  border: none;
  color: #635bff;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
}
.stpd-btn-text:hover { color: #0a2540; }

/* Table */
.stpd-table {
  width: 100%;
  border-collapse: collapse;
}

.stpd-table th {
  text-align: left;
  padding: 12px 20px;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #697386;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.stpd-table td {
  padding: 16px 20px;
  font-size: 0.9rem;
  border-bottom: 1px solid #e5e7eb;
}

.stpd-table tr:last-child td { border-bottom: none; }

.stpd-curr { color: #697386; font-size: 0.8rem; }

.stpd-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}
.stpd-success { background: #d1fae5; color: #065f46; }
.stpd-failed { background: #fee2e2; color: #991b1b; }

/* Subscription List */
.stpd-sub-list {
  padding: 8px 0;
}

.stpd-sub-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f3f4f6;
  gap: 16px;
}
.stpd-sub-item:last-child { border-bottom: none; }

.stpd-sub-icon {
  width: 40px; height: 40px;
  background: #3b82f6;
  color: #fff;
  border-radius: 8px;
  display: flex; justify-content: center; align-items: center;
  font-weight: 600;
}

.stpd-sub-details { flex: 1; }
.stpd-sub-details h4 { margin: 0 0 4px 0; font-size: 0.95rem; font-weight: 600; }
.stpd-sub-details p { margin: 0; font-size: 0.85rem; color: #697386; }

.stpd-sub-price {
  font-weight: 500;
  font-size: 0.9rem;
}

/* Balances side */
.stpd-balance {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.stpd-b-label {
  font-size: 0.85rem;
  color: #697386;
  font-weight: 500;
  margin-bottom: 8px;
}

.stpd-b-val {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.stpd-full { width: 100%; text-align: center; }

.stpd-balance-divider { height: 1px; background: #e5e7eb; }

.stpd-balance-future {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stpd-b-subval {
  font-weight: 600;
  font-size: 0.95rem;
}

/* Upgrade Box */
.stpd-upgrade-box {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.stpd-ub-icon {
  width: 32px; height: 32px;
  background: #fef08a;
  border-radius: 50%;
  display: flex; justify-content: center; align-items: center;
  margin-bottom: 16px;
}

.stpd-upgrade-box h4 { margin: 0 0 8px 0; font-size: 1rem; }
.stpd-upgrade-box p { margin: 0 0 16px 0; font-size: 0.9rem; color: #697386; line-height: 1.5; }

/* Responsive */
@media (max-width: 900px) {
  .stpd-stats-grid, .stpd-layout { grid-template-columns: 1fr; }
  .stpd-nav { display: none; }
}
`,
  tailwind: `<!-- Tailwind omitted -->`,
  prompt: `Build an enterprise-grade SaaS dashboard inspired by Stripe. Include real-time business metrics, revenue analytics, user growth tracking, and subscription management.`
};
