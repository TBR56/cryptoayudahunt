/**
 * CryptoAyuda AI Guardian - Main Script
 * Handles SPA Routing, Chatbot functionality, and Analysis Simulations
 */

let chatIsOpen = false;

// URL Parameter Handling (Affiliate System)
function handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref) {
        localStorage.setItem('ref', ref);
        console.log("Referral captured:", ref);
    }
}
handleURLParams();

// Global Auth UI Updater
function updateAuthUI() {
    const authBtn = document.getElementById('nav-auth-btn');
    const adminLink = document.getElementById('nav-admin-link');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
        authBtn.innerHTML = '<i class="fa-solid fa-user-astronaut"></i> Profile';
        authBtn.classList.remove('btn-outline');
        authBtn.classList.add('btn-primary');
        authBtn.setAttribute('data-route', 'profile');
        authBtn.onclick = null;
        if (adminLink) {
            adminLink.style.display = role === 'admin' ? 'inline-flex' : 'none';
        }
    } else {
        authBtn.innerHTML = 'Login';
        authBtn.classList.remove('btn-primary');
        authBtn.classList.add('btn-outline');
        authBtn.setAttribute('data-route', 'auth');
        authBtn.onclick = null;
        if (adminLink) adminLink.style.display = 'none';
    }
}

// Basic SPA Router
function navigateTo(route, subRoute = null) {
    const appContent = document.getElementById('app-content');
    if (!appContent) return;

    // Update active class in nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('data-route') === route) {
            link.classList.add('active');
        }
    });

    // Close mobile menu if open
    const navLinksContainer = document.querySelector('.nav-links');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (navLinksContainer) {
        navLinksContainer.classList.remove('active');
        if (mobileMenuBtn) {
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        }
    }

    // Load view
    window.scrollTo(0, 0);

    // Guard admin route
    if (route === 'admin') {
        const role = localStorage.getItem('role');
        if (role !== 'admin') {
            appContent.innerHTML = `
                <div style="text-align:center;padding:100px 20px;">
                    <i class="fa-solid fa-lock" style="font-size:3rem;color:var(--risk-high);margin-bottom:20px;"></i>
                    <h2>Access Denied</h2>
                    <p>You do not have permission to view this page.</p>
                    <button class="btn btn-outline" onclick="navigateTo('home')" style="margin-top:20px;">Go Home</button>
                </div>
            `;
            return;
        }
    }

    if ((window.views && window.views[route]) || (window.toolViews && window.toolViews[route])) {
        const viewHtml = window.views[route] ? window.views[route]() : window.toolViews[route]();
        appContent.innerHTML = viewHtml;
        handleRouteLogic(route, subRoute);
    } else {
        appContent.innerHTML = `<div class="container center" style="padding:100px 20px;"><h1 style="font-size:4rem; margin-bottom:10px;">404</h1><p style="color:var(--secondary-color); margin-bottom:30px;">This command does not exist in our AI registry.</p><button class="btn btn-primary" onclick="navigateTo('home')">Return Home</button></div>`;
    }
}

// Handle route-specific initializations after render
function handleRouteLogic(route, subRoute) {
    bindViewEvents(route);
    if (route.startsWith('tool-')) bindToolEvents(route);
    
    if (route === 'home') initPricingLogic();
    else if (route === 'dashboard') setTimeout(loadDashboard, 100);
    else if (route === 'tools') initToolsLogic();
    else if (route === 'auth') initAuthLogic(subRoute);
    else if (route === 'pricing') initPricingLogic();
    else if (route === 'admin') {
        if (typeof adminLoadStats === 'function') adminLoadStats();
        if (typeof adminLoadUsers === 'function') adminLoadUsers();
    } else if (route === 'profile') initProfileLogic();
    else if (route === 'leaderboard') setTimeout(loadLeaderboard, 100);
    else if (route === 'affiliate') setTimeout(loadAffiliateStats, 100);
}

function initToolsLogic() {
    const plan = localStorage.getItem('plan') || 'free';
    const role = localStorage.getItem('role') || 'user';
    const isPro = plan === 'pro' || plan === 'elite' || role === 'admin';
    const isElite = plan === 'elite' || role === 'admin';

    if (!isPro && !isElite) {
        const toolsSection = document.querySelector('.tools-section');
        if (toolsSection) {
            const gate = document.createElement('div');
            gate.className = 'plan-gate fade-in';
            gate.innerHTML = `<div class="plan-gate-inner"><i class="fa-solid fa-lock" style="font-size:2rem;color:var(--accent-color);margin-bottom:12px;"></i><h3>Limited Free Access</h3><p>Your current plan is <strong>Free</strong>. You have <strong>3 daily scans</strong> across all tools.</p><button class="btn btn-primary" onclick="navigateTo('pricing')" style="margin-top:16px;">Get Unlimited Scans</button></div>`;
            toolsSection.prepend(gate);
        }
    }

    const demoBtns = document.querySelectorAll('.tool-demo-btn');
    demoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const toolCard = e.target.closest('.tool-card');
            const resultArea = toolCard.querySelector('.tool-result');
            const btnType = e.target.getAttribute('data-tool');
            const inputSelector = e.target.getAttribute('data-input');
            let inputValue = "";
            if(inputSelector) {
                const inputEl = toolCard.querySelector(inputSelector);
                if(inputEl) inputValue = inputEl.value;
            }
            if (!inputValue) {
                 resultArea.style.display = 'block';
                 resultArea.innerHTML = `<p class="text-high">Please enter a valid address or URL.</p>`;
                 return;
            }
            if (btnType === 'whale' && !isElite) {
                resultArea.style.display = 'block';
                resultArea.innerHTML = `<div style="text-align:center;padding:20px;"><i class="fa-solid fa-crown" style="font-size:1.5rem;color:#f59e0b;margin-bottom:10px;display:block;"></i><p style="color:var(--secondary-color);margin-bottom:12px;">The <strong>Whale Move AI</strong> requires an <strong>Elite</strong> plan.</p><button class="btn btn-accent" onclick="navigateTo('pricing')">Get Elite Now</button></div>`;
                return;
            }
            if (!isPro && !isElite && !['wallet','rug','phishing'].includes(btnType)) {
                resultArea.style.display = 'block';
                resultArea.innerHTML = `<div style="text-align:center;padding:20px;"><i class="fa-solid fa-lock" style="font-size:1.5rem;color:var(--risk-medium);margin-bottom:10px;display:block;"></i><p style="color:var(--secondary-color);margin-bottom:12px;">This advanced AI feature requires a <strong>Pro</strong> or <strong>Elite</strong> plan.</p><button class="btn btn-primary" onclick="navigateTo('pricing')">Upgrade Now</button></div>`;
                return;
            }
            if (['smart-money','arbitrage','alpha'].includes(btnType)) runTradingToolScan(btnType, inputValue, resultArea);
            else runRealToolScan(btnType, inputValue, resultArea);
        });
    });
}

function initAuthLogic(subRoute = null) {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('login-form');
    const formRegister = document.getElementById('register-form');

    if (tabLogin && tabRegister) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active'); tabRegister.classList.remove('active');
            formLogin.style.display = 'block'; formRegister.style.display = 'none';
            if (document.getElementById('login-error')) document.getElementById('login-error').style.display = 'none';
            if (document.getElementById('reg-error')) document.getElementById('reg-error').style.display = 'none';
            if (document.getElementById('reg-success')) document.getElementById('reg-success').style.display = 'none';
        });
        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('active'); tabLogin.classList.remove('active');
            formRegister.style.display = 'block'; formLogin.style.display = 'none';
            if (document.getElementById('login-error')) document.getElementById('login-error').style.display = 'none';
            if (document.getElementById('reg-error')) document.getElementById('reg-error').style.display = 'none';
        });

        // Toggle to register if requested
        if (subRoute === 'register') {
            tabRegister.click();
        }
    }

    const btnReg = document.getElementById('btn-register');
    if (btnReg) {
        btnReg.addEventListener('click', async () => {
            const usernameInput = document.getElementById('reg-user');
            const emailInput = document.getElementById('reg-email');
            const passwordInput = document.getElementById('reg-pass');
            const username = usernameInput ? usernameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const password = passwordInput ? passwordInput.value : "";
            
            const ref = localStorage.getItem('ref') || null;
            const errEl = document.getElementById('reg-error');
            const sucEl = document.getElementById('reg-success');
            
            if (!email || !password) { 
                errEl.textContent = "Email and password are required."; 
                errEl.style.display = 'block'; 
                return; 
            }
            
            errEl.style.display = 'none';
            btnReg.disabled = true; btnReg.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            
            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username || null, email, password, ref })
                });
                const data = await res.json();
                if(!res.ok) throw new Error(data.error || "Registration failed");
                
                sucEl.textContent = "Hunter Account Created! Redirecting to login..."; 
                sucEl.style.display = 'block';
                
                // Pre-fill login email for convenience
                const loginEmailInput = document.getElementById('login-email');
                if (loginEmailInput) loginEmailInput.value = email;
                
                setTimeout(() => { 
                    if (tabLogin) tabLogin.click(); 
                    if (sucEl) sucEl.style.display = 'none';
                }, 2500);
            } catch(e) { 
                errEl.textContent = e.message; 
                errEl.style.display = 'block'; 
            }
            finally { 
                btnReg.disabled = false; 
                btnReg.innerHTML = 'Create Account <i class="fa-solid fa-user-plus ml-2"></i>'; 
            }
        });
    }

    const btnLogin = document.getElementById('btn-login');
    if (btnLogin) {
        btnLogin.addEventListener('click', async () => {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-pass').value;
            const errEl = document.getElementById('login-error');
            if (!email || !password) { errEl.textContent = "Email and password required."; errEl.style.display = 'block'; return; }
            errEl.style.display = 'none';
            btnLogin.disabled = true; btnLogin.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if(!res.ok) throw new Error(data.error || "Login failed");
                localStorage.setItem('token', data.token);
                localStorage.setItem('plan', data.plan);
                localStorage.setItem('email', data.email);
                localStorage.setItem('role', data.role || 'user');
                localStorage.setItem('username', data.username || 'Hunter');
                updateAuthUI();
                navigateTo(data.role === 'admin' ? 'admin' : 'tools');
            } catch(e) { errEl.textContent = e.message; errEl.style.display = 'block'; }
            finally { btnLogin.disabled = false; btnLogin.innerHTML = 'Login to Dashboard <i class="fa-solid fa-arrow-right ml-2"></i>'; }
        });
    }
}

function initPricingLogic() {
    const token = localStorage.getItem('token');
    const paymentTriggers = document.querySelectorAll('.payment-trigger');
    paymentTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!token) {
                navigateTo('auth', 'register');
                return;
            }
            const plan = btn.getAttribute('data-plan');
            const priceStr = plan === 'basic' ? '7.00' : (plan === 'pro' ? '19.00' : '39.00');
            const containerId = `paypal-button-container-${plan}`;
            const containerEl = document.getElementById(containerId);
            if (containerEl && window.paypal) {
                btn.style.display = 'none'; containerEl.style.display = 'block'; containerEl.innerHTML = '';
                paypal.Buttons({
                    style: { layout: 'vertical', color: 'gold', shape: 'pill' },
                    createOrder: (data, actions) => actions.order.create({ purchase_units: [{ amount: { currency_code: 'USD', value: priceStr }, description: `CryptoAyuda - ${plan.toUpperCase()}` }] }),
                    onApprove: (data, actions) => actions.order.capture().then(details => {
                        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying Payment...';
                        return fetch('/api/orders/capture', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                            body: JSON.stringify({ orderID: details.id, planType: plan })
                        }).then(res => res.json()).then(serverData => {
                            if (serverData.error) {
                                alert("Upgrade failed: " + serverData.error);
                                btn.style.display = 'block';
                                btn.innerHTML = 'Retry Upgrade';
                            } else {
                                localStorage.setItem('plan', serverData.plan);
                                containerEl.innerHTML = `
                                    <div class="fade-in center p-4" style="background:rgba(16,185,129,0.1); border:1px solid var(--risk-low); border-radius:12px;">
                                        <i class="fa-solid fa-circle-check" style="font-size:2rem;color:var(--risk-low);margin-bottom:10px;"></i>
                                        <h3 style="color:var(--risk-low);">Upgrade Successful!</h3>
                                        <p style="font-size:0.9rem;">Your account is now <strong>${serverData.plan.toUpperCase()}</strong>.</p>
                                        <button class="btn btn-primary btn-sm mt-3" onclick="location.reload()">Refresh Dashboard</button>
                                    </div>
                                `;
                            }
                        });
                    }),
                    onError: (err) => {
                        console.error('PayPal Error:', err);
                        alert("There was an error with the PayPal checkout process.");
                        btn.style.display = 'block';
                    }
                }).render(`#${containerId}`);
            }
        });
    });
}

function initProfileLogic() {
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear(); updateAuthUI(); navigateTo('home');
        });
    }
    setTimeout(loadProfileXP, 100);
    setTimeout(loadProfileHistory, 100);
}

function bindViewEvents(route) {
    if (route === 'home') {
        const checkBtn = document.getElementById('landing-check-btn');
        if (checkBtn) {
            checkBtn.addEventListener('click', async () => {
                const input = document.getElementById('landing-link-input');
                const val = input ? input.value.trim() : "";
                if(!val) return;
                const resultArea = document.getElementById('landing-result-area');
                const resultContent = document.getElementById('landing-result-content');
                if (resultArea) resultArea.style.display = 'block';
                if (resultContent) resultContent.innerHTML = `<div class="center p-4"><i class="fa-solid fa-satellite-dish fa-spin" style="font-size:2rem;color:var(--accent-color);"></i><p style="margin-top:10px;">Analyzing URL security signatures...</p></div>`;
                
                try {
                    // Use real API for landing page check
                    const res = await fetch(`/api/analyze/phishing?url=${encodeURIComponent(val)}`);
                    const data = await res.json();
                    
                    if (data.isMalicious || data.riskScore > 50) {
                        resultContent.innerHTML = `
                            <div class="glitch-container fade-up">
                                <div class="glitch-text" data-text="DANGER DETECTED">DANGER DETECTED</div>
                                <p style="color:var(--primary-color); margin-top:15px; font-weight:700;">PHISHING VENTURE IDENTIFIED. AVOID INTERACTION.</p>
                                <p style="font-size:0.9rem;opacity:0.8;margin-top:5px;">This URL has been flagged in our malicious registry.</p>
                            </div>
                        `;
                    } else {
                        resultContent.innerHTML = `
                            <div class="safe-container fade-up">
                                <div style="display:flex; align-items:center; gap:20px; justify-content:center; flex-wrap:wrap;">
                                    <i class="fa-solid fa-shield-check" style="color:var(--risk-low); font-size:3rem;"></i>
                                    <div style="text-align:left;">
                                        <h3 style="color:var(--risk-low); margin:0;">VERIFIED SECURE</h3>
                                        <p style="margin:5px 0 0; color:var(--secondary-color);">No malicious signatures detected in our registry.</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                    // Scroll to result
                    resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } catch(e) {
                    resultContent.innerHTML = `<div class="p-3 text-high">Analysis failed. Please check your connection.</div>`;
                }
            });
        }
    }
}

function bindToolEvents(route) {
    const toolType = route.replace('tool-', '');
    const scanBtn = document.querySelector('.scan-bar-btn');
    if (scanBtn) scanBtn.addEventListener('click', () => runToolScan(toolType));
}

async function runToolScan(type) {
    const token = localStorage.getItem('token');
    const prefix = type === 'token' ? 'tt' : (type === 'wallet' ? 'tw' : 'tp');
    const input = document.getElementById(`${prefix}-address`) || document.getElementById(`${prefix}-url`);
    const results = document.getElementById(`${prefix}-results`);
    if (!input || !input.value) return;
    results.innerHTML = `<div class="center p-4"><i class="fa-solid fa-spinner fa-spin"></i> ANALYSIS IN PROGRESS...</div>`;
    try {
        const res = await fetch(`/api/analyze/${type}?${type==='phishing'?'url':'address'}=${input.value.trim()}`, { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        if (type === 'token') renderTokenResult(data, results);
        else if (type === 'wallet') renderWalletResult(data, results);
        else renderPhishingResult(data, results);
    } catch (e) { results.innerHTML = `<div class="p-3 text-high">Scan failed: ${e.message}</div>`; }
}

async function runRealToolScan(type, inputValue, container) {
    container.style.display = 'block';
    container.innerHTML = `<div class="center p-3"><i class="fa-solid fa-satellite-dish fa-spin"></i> AI SCANNING...</div>`;
    try {
        const res = await fetch(`/api/analyze/${type==='rug'?'token':type}?${type==='phishing'?'url':'address'}=${inputValue}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
        const data = await res.json();
        if (type === 'wallet') renderWalletResult(data, container);
        else if (type === 'rug') renderTokenResult(data, container);
        else renderPhishingResult(data, container);
    } catch (e) { container.innerHTML = `<div class="p-2 text-high">Error: ${e.message}</div>`; }
}

async function runTradingToolScan(type, inputValue, container) {
    container.style.display = 'block';
    container.innerHTML = `<div class="center p-3"><i class="fa-solid fa-brain fa-pulse"></i> AI PREDICTING...</div>`;
    try {
        const res = await fetch(`/api/trading/${type}?address=${inputValue}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
        const data = await res.json();
        if (type === 'smart-money') renderSmartMoneyResult(data, container);
        else if (type === 'arbitrage') renderArbitrageResult(data, container);
        else renderAlphaResult(data, container);
    } catch (e) { container.innerHTML = `<div class="p-2 text-high">Error: ${e.message}</div>`; }
}

function renderTokenResult(data, c) {
    const color = data.riskScore > 50 ? '#ef4444' : '#10b981';
    c.innerHTML = `<div class="tool-result-card fade-in" style="border-left:4px solid ${color}; padding:20px;"><h3>${data.raw?.name || 'Token Analysis'}</h3><p>Risk Score: <strong style="color:${color}">${data.riskScore}/100</strong></p><ul>${data.riskFlags?.map(f=>`<li>${f}</li>`).join('') || ''}</ul></div>`;
}

function renderWalletResult(data, c) {
    const color = data.riskScore > 50 ? '#ef4444' : '#10b981';
    c.innerHTML = `<div class="tool-result-card fade-in" style="padding:20px;"><h3>Wallet Profile</h3><p>Exposure: <strong style="color:${color}">${data.riskScore}%</strong></p></div>`;
}

function renderPhishingResult(data, c) {
    const color = data.isMalicious ? '#ef4444' : '#10b981';
    c.innerHTML = `<div class="tool-result-card fade-in" style="text-align:center; padding:30px;"><h2 style="color:${color}">${data.isMalicious ? 'DANGEROUS' : 'SECURE'}</h2><p>${data.url}</p></div>`;
}

function renderSmartMoneyResult(data, c) {
    c.innerHTML = `<div class="tool-result-card fade-in" style="padding:20px;"><h3>Smart Money: ${data.overall}</h3><p>Total Flow: ${data.totalFlow} ETH</p></div>`;
}

function renderArbitrageResult(data, c) {
    c.innerHTML = `<div class="tool-result-card fade-in" style="padding:20px;"><h3>Arbitrage Window: ${data.status}</h3><p>Spread: ${data.spreadPct}</p></div>`;
}

function renderAlphaResult(data, c) {
    c.innerHTML = `<div class="tool-result-card fade-in" style="padding:20px;"><h3>AI Alpha: ${data.overallSignal}</h3><p>Confidence: ${data.avgScore}%</p></div>`;
}

async function loadDashboard() {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
        const res = await fetch('/api/godmode/wallet?address=0x742d35Cc6634C0532925a3b844Bc454e4438f44e', { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        const health = document.getElementById('wallet-health-percentage');
        if (health) health.textContent = `${100 - data.riskScore}%`;
    } catch(e) { console.error(e); }
}

async function loadProfileXP() {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
        const res = await fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } });
        const user = await res.json();
        const xpDisp = document.getElementById('xp-display');
        if (xpDisp) xpDisp.textContent = `${user.xp || 0} XP Total`;
    } catch(e) {}
}

async function loadLeaderboard() {
    const body = document.getElementById('leaderboard-body');
    if (!body) return;
    try {
        const res = await fetch('/api/leaderboard');
        const users = await res.json();
        body.innerHTML = users.map((u, i) => `<div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid rgba(255,255,255,0.05);"><span>#${i+1} ${u.email}</span><strong>${u.xp} XP</strong></div>`).join('');
    } catch(e) {}
}

async function loadProfileHistory() {
    const historyBody = document.getElementById('profile-history-body');
    if (!historyBody) return;
    try {
        const res = await fetch('/api/profile/history', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
        const history = await res.json();
        historyBody.innerHTML = history.map(item => `<tr><td>${item.type}</td><td>${item.result}</td><td>${new Date(item.timestamp).toLocaleTimeString()}</td></tr>`).join('');
    } catch (e) {}
}

async function loadAffiliateStats() {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
        const res = await fetch('/api/affiliate/stats', { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        if (document.getElementById('aff-clicks')) document.getElementById('aff-clicks').textContent = data.clicks || 0;
        if (document.getElementById('aff-referrals')) document.getElementById('aff-referrals').textContent = data.referrals || 0;
        if (document.getElementById('aff-earnings')) document.getElementById('aff-earnings').textContent = `\$${(data.earnings || 0).toFixed(2)}`;
        if (document.getElementById('aff-link-input')) document.getElementById('aff-link-input').value = `${window.location.origin}?ref=${data.code}`;
    } catch (e) {}
}

function initParticles() {
    const container = document.getElementById('particles-container');
    if(!container) return;
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'floating-particle';
        p.style.left = Math.random() * 100 + 'vw'; p.style.top = Math.random() * 100 + 'vh';
        container.appendChild(p);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    updateAuthUI();
    const currentRoute = 'home';
    navigateTo(currentRoute);

    // Chatbot toggler
    const chatToggle = document.getElementById('chatbot-toggle');
    const chatWin = document.getElementById('chatbot-window');
    if (chatToggle && chatWin) {
        chatToggle.addEventListener('click', () => chatWin.classList.toggle('active'));
    }
    
    // Global router click interceptor
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-route]');
        if (link) {
            e.preventDefault();
            navigateTo(link.getAttribute('data-route'));
        }
    });
});
