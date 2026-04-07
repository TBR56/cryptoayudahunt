/**
 * CryptoAyuda AI Guardian - Admin Panel
 * Handles Admin Dashboard view and all admin interactions
 */

window.views.admin = () => `
    <section class="page-header" style="padding-top: 120px; padding-bottom: 40px;">
        <div class="container">
            <div style="display:flex; align-items:center; gap:20px; margin-bottom:8px;">
                <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,rgba(239,68,68,0.2),rgba(239,68,68,0.05));border:1px solid rgba(239,68,68,0.3);display:flex;align-items:center;justify-content:center;">
                    <i class="fa-solid fa-crown" style="color:#ef4444;font-size:1.2rem;"></i>
                </div>
                <div>
                    <h1 style="font-size:2rem;margin:0;">Admin Dashboard</h1>
                    <p style="margin:4px 0 0; color:var(--secondary-color); font-size:0.9rem;">CryptoAyuda AI Guardian — Control Center</p>
                </div>
            </div>
        </div>
    </section>

    <section style="padding: 0 0 80px;">
        <div class="container">

            <!-- Stats Row -->
            <div id="admin-stats" style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:40px;">
                <div class="admin-stat-card" id="stat-total">
                    <i class="fa-solid fa-users"></i>
                    <div class="stat-val" id="val-total">—</div>
                    <div class="stat-label">Total Users</div>
                </div>
                <div class="admin-stat-card" id="stat-free">
                    <i class="fa-solid fa-user"></i>
                    <div class="stat-val" id="val-free">—</div>
                    <div class="stat-label">Free Plan</div>
                </div>
                <div class="admin-stat-card highlight-pro" id="stat-pro">
                    <i class="fa-solid fa-bolt"></i>
                    <div class="stat-val" id="val-pro">—</div>
                    <div class="stat-label">Pro Plan</div>
                </div>
                <div class="admin-stat-card highlight-elite" id="stat-elite">
                    <i class="fa-solid fa-shield-halved"></i>
                    <div class="stat-val" id="val-elite">—</div>
                    <div class="stat-label">Elite Plan</div>
                </div>
            </div>

            <!-- Tools Section (Unlocked for Admin) -->
            <div style="background:var(--surface-color);border:1px solid rgba(255,255,255,0.06);border-radius:24px;padding:30px;margin-bottom:40px;backdrop-filter:var(--glass-blur);">
                <h3 style="margin-bottom:6px;font-size:1.3rem;">
                    <i class="fa-solid fa-shield-cat" style="color:var(--accent-color);margin-right:10px;"></i>
                    AI Tools Preview (Admin Access)
                </h3>
                <p style="color:var(--secondary-color);margin-bottom:24px;font-size:0.9rem;">As admin you have full access to all tools without needing a paid plan.</p>
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
                    <div class="admin-tool-btn" onclick="navigateTo('tools')">
                        <i class="fa-solid fa-wallet"></i>
                        <span>Wallet Guardian</span>
                    </div>
                    <div class="admin-tool-btn" onclick="navigateTo('tools')">
                        <i class="fa-solid fa-parachute-box"></i>
                        <span>Rug Pull Predictor</span>
                    </div>
                    <div class="admin-tool-btn" onclick="navigateTo('tools')">
                        <i class="fa-solid fa-spider"></i>
                        <span>Phishing Detector</span>
                    </div>
                </div>
            </div>

            <!-- Tabs Navigation -->
            <div style="display:flex;gap:10px;margin-bottom:30px;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:10px;">
                <button class="btn btn-ghost active" id="admin-tab-users" style="padding:10px 20px;" onclick="adminSwitchTab('users')">Users</button>
                <button class="btn btn-ghost" id="admin-tab-affiliates" style="padding:10px 20px;" onclick="adminSwitchTab('affiliates')">Affiliates & Payouts</button>
                <button class="btn btn-ghost" id="admin-tab-payments" style="padding:10px 20px;" onclick="adminSwitchTab('payments')">Payments</button>
            </div>

            <!-- Users Section -->
            <div id="admin-section-users" style="background:var(--surface-color);border:1px solid rgba(255,255,255,0.06);border-radius:24px;padding:30px;backdrop-filter:var(--glass-blur);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
                    <h3 style="margin:0;font-size:1.3rem;">
                        <i class="fa-solid fa-database" style="color:var(--accent-color);margin-right:10px;"></i>
                        Registered Users
                    </h3>
                    <button class="btn btn-outline" style="padding:8px 18px;font-size:0.85rem;" onclick="adminLoadUsers()">
                        <i class="fa-solid fa-arrows-rotate"></i> Refresh
                    </button>
                </div>
                <div id="admin-users-table">
                    <div style="text-align:center;padding:40px;color:var(--secondary-color);">
                        <div class="spinner" style="margin:0 auto 16px;"></div>
                        Loading users...
                    </div>
                </div>
            </div>

            <!-- Affiliates Section -->
            <div id="admin-section-affiliates" style="display:none;background:var(--surface-color);border:1px solid rgba(255,255,255,0.06);border-radius:24px;padding:30px;backdrop-filter:var(--glass-blur);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
                    <h3 style="margin:0;font-size:1.3rem;">
                        <i class="fa-solid fa-users-viewfinder" style="color:#10b981;margin-right:10px;"></i>
                        Affiliate Performance
                    </h3>
                    <button class="btn btn-outline" style="padding:8px 18px;font-size:0.85rem;" onclick="adminLoadAffiliates()">
                        <i class="fa-solid fa-arrows-rotate"></i> Refresh
                    </button>
                </div>
                <div id="admin-affiliates-table">
                    <div style="text-align:center;padding:40px;color:var(--secondary-color);">Loading affiliates...</div>
                </div>
            </div>

            <!-- Payments Section -->
            <div id="admin-section-payments" style="display:none;background:var(--surface-color);border:1px solid rgba(255,255,255,0.06);border-radius:24px;padding:30px;backdrop-filter:var(--glass-blur);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
                    <h3 style="margin:0;font-size:1.3rem;">
                        <i class="fa-solid fa-credit-card" style="color:#f59e0b;margin-right:10px;"></i>
                        Recent Payments (PayPal)
                    </h3>
                </div>
                <div style="text-align:center;padding:40px;color:var(--secondary-color);">
                    <p>Live transaction data is pulled directly from PayPal Merchant API in production.</p>
                    <p style="font-size:0.8rem;margin-top:10px;opacity:0.6;">Check the "Users" tab to see active plans.</p>
                </div>
            </div>
        </div>
    </section>
`;

window.adminSwitchTab = (tab) => {
    document.querySelectorAll('[id^="admin-section-"]').forEach(s => s.style.display = 'none');
    document.getElementById(`admin-section-${tab}`).style.display = 'block';
    document.querySelectorAll('[id^="admin-tab-"]').forEach(b => b.classList.remove('active'));
    document.getElementById(`admin-tab-${tab}`).classList.add('active');
    if (tab === 'affiliates') adminLoadAffiliates();
    if (tab === 'users') adminLoadUsers();
};

async function adminLoadStats() {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch('/api/admin/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        document.getElementById('val-total').textContent = data.total;
        document.getElementById('val-free').textContent = data.free;
        document.getElementById('val-pro').textContent = data.pro;
        document.getElementById('val-elite').textContent = data.elite;
    } catch(e) {
        console.error('Admin stats error:', e);
    }
}

async function adminLoadUsers() {
    const token = localStorage.getItem('token');
    const table = document.getElementById('admin-users-table');
    if (!table) return;
    table.innerHTML = `<div style="text-align:center;padding:40px;color:var(--secondary-color);"><div class="spinner" style="margin:0 auto 16px;"></div>Loading users...</div>`;
    try {
        const res = await fetch('/api/admin/users', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const users = await res.json();
        if (!res.ok) throw new Error(users.error);

        if (users.length === 0) {
            table.innerHTML = `<p style="text-align:center;color:var(--secondary-color);">No users registered yet.</p>`;
            return;
        }

        table.innerHTML = `
            <div style="overflow-x:auto;">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Plan</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(u => `
                            <tr>
                                <td style="color:var(--secondary-color);">#${u.id}</td>
                                <td>${u.email}</td>
                                <td>
                                    <span class="plan-badge-small plan-${u.plan}">${u.plan.toUpperCase()}</span>
                                </td>
                                <td>
                                    <span class="plan-badge-small plan-${u.role}" style="${u.role==='admin'?'background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.4);color:#ef4444;':''}">
                                        ${u.role?.toUpperCase() || 'USER'}
                                    </span>
                                </td>
                                <td style="color:var(--secondary-color);font-size:0.85rem;">${new Date(u.created_at).toLocaleDateString()}</td>
                                <td>
                                    <div style="display:flex;gap:8px;">
                                        <select class="admin-select" onchange="adminChangePlan(${u.id}, this.value)">
                                            <option value="">Change Plan</option>
                                            <option value="free">Free</option>
                                            <option value="pro">Pro</option>
                                            <option value="elite">Elite</option>
                                        </select>
                                        ${u.role !== 'admin' ? `<button class="btn-icon-danger" onclick="adminDeleteUser(${u.id})" title="Delete User"><i class="fa-solid fa-trash"></i></button>` : ''}
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } catch(e) {
        table.innerHTML = `<p style="color:var(--risk-high);text-align:center;">${e.message}</p>`;
    }
}

async function adminChangePlan(userId, newPlan) {
    if (!newPlan) return;
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`/api/admin/users/${userId}/plan`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan: newPlan })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        await adminLoadUsers();
        await adminLoadStats();
    } catch(e) {
        alert('Error: ' + e.message);
    }
}

async function adminDeleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) return;
    const token = localStorage.getItem('token');
    try {
        const res = await fetch(`/api/admin/users/${userId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        await adminLoadUsers();
        await adminLoadStats();
    } catch(e) {
        alert('Error: ' + e.message);
    }
}

async function adminLoadAffiliates() {
    const table = document.getElementById('admin-affiliates-table');
    if (!table) return;
    const token = localStorage.getItem('token');
    try {
        const res = await fetch('/api/admin/affiliates', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        if (data.length === 0) {
            table.innerHTML = `<p style="text-align:center;color:var(--secondary-color);padding:20px;">No affiliates found.</p>`;
            return;
        }

        table.innerHTML = `
            <div style="overflow-x:auto;">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Code</th>
                            <th>Referrals</th>
                            <th>Earnings</th>
                            <th>Unpaid</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.map(a => `
                            <tr>
                                <td>${a.email}</td>
                                <td style="font-family:var(--font-mono);">${a.code}</td>
                                <td>${a.referrals}</td>
                                <td style="color:#10b981;">$${a.earnings.toFixed(2)}</td>
                                <td style="color:${a.unpaid > 0 ? '#f59e0b' : 'inherit'}; font-weight:bold;">$${a.unpaid.toFixed(2)}</td>
                                <td>
                                    ${a.unpaid > 0 ? `<button class="btn btn-primary btn-sm" onclick="adminPayoutAffiliate(${a.id})" style="padding:4px 12px;font-size:0.75rem;">Mark Paid</button>` : '<span style="opacity:0.5;font-size:0.8rem;">Paid</span>'}
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } catch(e) {
        table.innerHTML = `<p style="color:var(--risk-high);">${e.message}</p>`;
    }
}

async function adminPayoutAffiliate(userId) {
    if (!confirm('Mark all unpaid earnings as paid?')) return;
    const token = localStorage.getItem('token');
    try {
        const res = await fetch('/api/admin/affiliates/payout', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        adminLoadAffiliates();
    } catch(e) {
        alert('Error: ' + e.message);
    }
}
