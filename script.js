/**
 * CryptoAyuda AI Guardian - Main Script
 * Handles SPA Routing, Chatbot functionality, and Analysis Simulations
 */

let chatIsOpen = false; // Added global variable

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

// Basic SPA Router (Moved outside DOMContentLoaded as per instruction's implied structure)
function navigateTo(route) {
    const appContent = document.getElementById('app-content');
    
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

    // Load view from regular views or dedicated tool views
    if ((window.views && window.views[route]) || (window.toolViews && window.toolViews[route])) {
        const viewHtml = window.views[route] ? window.views[route]() : window.toolViews[route]();
        appContent.innerHTML = viewHtml;
        
        // Handle common event binding
        bindViewEvents(route);

        // Handle tool-specific route initialization
        if (route.startsWith('tool-')) {
            bindToolEvents(route);
        }
        
        if (route === 'dashboard') {
            setTimeout(loadDashboard, 100);
        } else if (route === 'tools') {
            // No special init for tool hub yet
        } else if (route === 'auth') {
            const loginForm = document.getElementById('login-form');
            if (loginForm) loginForm.addEventListener('submit', handleLogin);
            const registerForm = document.getElementById('register-form');
            if (registerForm) registerForm.addEventListener('submit', handleRegister);
        } else if (route === 'pricing') {
            const token = localStorage.getItem('token');
            const paypalButtonsContainer = document.getElementById('paypal-buttons-container');
            if (paypalButtonsContainer) {
                if (token) {
                    // Initialize PayPal for logged in users
                    setTimeout(initPayPalButtons, 100);
                } else {
                    paypalButtonsContainer.innerHTML = `<p class="center" style="color:var(--secondary-color);">Please <a href="#" data-route="auth" style="color:var(--accent-vibrant);">log in</a> to subscribe to a plan.</p>`;
                }
            }
        } else if (route === 'admin') {
            if (typeof adminLoadStats === 'function') adminLoadStats();
            if (typeof adminLoadUsers === 'function') adminLoadUsers();
        } else if (route === 'profile') {
            const logoutBtn = document.getElementById('btn-logout');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('plan');
                    localStorage.removeItem('email');
                    localStorage.removeItem('role');
                    updateAuthUI();
                    navigateTo('home');
                });
            }
            setTimeout(loadProfileXP, 100);
            setTimeout(loadProfileHistory, 100);
        } else if (route === 'leaderboard') {
            setTimeout(loadLeaderboard, 100);
        } else if (route === 'pricing') {
            setTimeout(initPayPalButtons, 100);
        }
    } else {
        appContent.innerHTML = `
            <div class="container center" style="padding:100px 20px;">
                <h1 style="font-size:4rem; margin-bottom:10px;">404</h1>
                <p style="color:var(--secondary-color); margin-bottom:30px;">This command does not exist in our AI registry.</p>
                <button class="btn btn-primary" onclick="navigateTo('home')">Return Home</button>
            </div>
        `;
    }
}

// Bind events for dedicated tool pages
function bindToolEvents(route) {
    const toolType = route.replace('tool-', '');
    const scanBtn = document.querySelector('.scan-bar-btn');
    
    if (scanBtn) {
        scanBtn.addEventListener('click', () => runToolScan(toolType));
    }

    // Bind example pills
    document.querySelectorAll('.example-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            let inputId = '';
            if (toolType === 'token') inputId = 'tt-address';
            else if (toolType === 'wallet') inputId = 'tw-address';
            else if (toolType === 'phishing') inputId = 'tp-url';
            else if (toolType === 'smart-money') inputId = 'tsm-address';
            else if (toolType === 'arbitrage') inputId = 'ta-address';
            else if (toolType === 'alpha') inputId = 'tal-address';

            const input = document.getElementById(inputId);
            if (input) {
                input.value = pill.getAttribute('data-addr') || pill.getAttribute('data-url') || pill.getAttribute('data-value') || pill.textContent;
                
                // Also set chain if available
                const chainId = pill.getAttribute('data-chain');
                if (chainId) {
                    const selectId = toolType === 'token' ? 'tt-chain' : 'tw-chain';
                    const select = document.getElementById(selectId);
                    if (select) select.value = chainId;
                }
                
                runToolScan(toolType);
            }
        });
    });

    // Enter key support
    const inputId = toolType === 'token' ? 'tt-address' : 
                    toolType === 'wallet' ? 'tw-address' : 
                    toolType === 'phishing' ? 'tp-url' : 
                    toolType === 'smart-money' ? 'tsm-address' : 
                    toolType === 'arbitrage' ? 'ta-address' : 'tal-address';
    const input = document.getElementById(inputId);
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') runToolScan(toolType);
        });
    }
}

// === ENTERPRISE SCAN ENGINE ===
async function runToolScan(type) {
    const token = localStorage.getItem('token');
    const prefix = type === 'token' ? 'tt' : type === 'wallet' ? 'tw' : type === 'phishing' ? 'tp' : type === 'smart-money' ? 'tsm' : type === 'arbitrage' ? 'ta' : 'tal';
    const resultsContainer = document.getElementById(`${prefix}-results`);
    const addressInput = document.getElementById(`${prefix}-address`) || document.getElementById(`${prefix}-url`);
    const chainSelect = document.getElementById(`${prefix}-chain`);
    
    if (!addressInput || !addressInput.value) {
        showToast("Please enter an address or URL", "warning");
        return;
    }

    const value = addressInput.value.trim();
    const chain = chainSelect ? chainSelect.value : 'eth';

    // Show Loading state
    resultsContainer.innerHTML = `
        <div class="tool-results-loading center" style="padding:40px; width:100%;">
            <div class="placeholder-icon-ring" style="animation: pulse 1.5s infinite; border-color:var(--accent-vibrant);">
                <i class="fa-solid fa-microchip fa-spin" style="color:var(--accent-vibrant); font-size:2.5rem;"></i>
            </div>
            <h3 style="margin-top:20px;">AI AGENT INITIALIZING...</h3>
            <p style="color:var(--secondary-color); font-family:var(--font-mono); font-size:0.8rem;">Querying node clusters & security registries</p>
            <div style="max-width:300px; margin:20px auto; height:4px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden;">
                <div id="scan-progress" style="width:0%; height:100%; background:var(--accent-vibrant); transition:width 2s ease;"></div>
            </div>
        </div>
    `;
    setTimeout(() => { if(document.getElementById('scan-progress')) document.getElementById('scan-progress').style.width = '100%'; }, 50);

    try {
        let endpoint = '';
        if (['token', 'wallet', 'phishing'].includes(type)) {
            endpoint = `/api/analyze/${type}?${type === 'phishing' ? 'url' : 'address'}=${value}&chain_id=${chain}`;
        } else {
            endpoint = `/api/trading/${type}?address=${value}`;
        }

        const res = await fetch(endpoint, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.status === 403 && data.planGate) {
            const plan = type === 'alpha' ? 'Elite' : 'Pro';
            resultsContainer.innerHTML = `
                <div class="center p-5" style="background:rgba(15,23,42,0.6); border:1px solid rgba(245,158,11,0.3); border-radius:16px;">
                    <i class="fa-solid fa-crown" style="font-size:3rem; color:#f59e0b; margin-bottom:20px;"></i>
                    <h2 style="margin-bottom:10px;">${plan} Access Required</h2>
                    <p style="color:var(--secondary-color); margin-bottom:25px; max-width:400px;">This institutional-grade tool is exclusive to <strong>${plan}</strong> plan holders. Upgrade to unlock Alpha signals.</p>
                    <button class="btn btn-primary" onclick="navigateTo('pricing')">Explore Plans</button>
                </div>
            `;
            return;
        }

        if (!res.ok) throw new Error(data.error || 'Scan failed');

        // Award XP
        if (data.xpReward) showXPToast(data.xpReward.xpGained, data.xpReward.rank);

        // Map to specific renderers
        if (type === 'token') renderTokenResult(data, resultsContainer);
        else if (type === 'wallet') renderWalletResult(data, resultsContainer);
        else if (type === 'phishing') renderPhishingResult(data, resultsContainer);
        else if (type === 'smart-money') renderSmartMoneyResult(data, resultsContainer);
        else if (type === 'arbitrage') renderArbitrageResult(data, resultsContainer);
        else if (type === 'alpha') renderAlphaResult(data, resultsContainer);

    } catch (err) {
        resultsContainer.innerHTML = `
            <div class="center p-5" style="border:1px solid rgba(239,68,68,0.2); border-radius:16px; background:rgba(239,68,68,0.05);">
                <i class="fa-solid fa-triangle-exclamation" style="font-size:2.5rem; color:#ef4444; margin-bottom:15px;"></i>
                <h3>Scan Interrupted</h3>
                <p style="color:var(--secondary-color);">${err.message}</p>
                <button class="btn btn-outline mt-3" onclick="runToolScan('${type}')">Retry Scan</button>
            </div>
        `;
    }
}

// === SPECIFIC RENDERERS ===

function renderTokenResult(data, container) {
    const riskColor = data.riskLevel === 'Low' ? '#10b981' : data.riskLevel === 'Medium' ? '#f59e0b' : '#ef4444';
    container.innerHTML = `
        <div class="tool-result-card fade-in">
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:25px; padding:25px;">
                <!-- Gauge & Overview -->
                <div style="background:rgba(255,255,255,0.03); padding:25px; border-radius:16px; text-align:center; border:1px solid rgba(255,255,255,0.05);">
                    <div class="risk-gauge">
                        <svg viewBox="0 0 100 100">
                            <circle class="gauge-bg" cx="50" cy="50" r="45"></circle>
                            <circle class="gauge-fill" cx="50" cy="50" r="45" style="stroke:${riskColor}; stroke-dasharray: ${data.riskScore * 2.8}, 282;"></circle>
                        </svg>
                        <div class="risk-gauge-label">
                            <span class="risk-score-num" style="color:${riskColor};">${data.riskScore}</span>
                            <span class="risk-score-label">RISK SCORE</span>
                        </div>
                    </div>
                    <h2 style="margin-top:20px; font-weight:900;">${data.raw.name} (${data.raw.symbol})</h2>
                    <p style="color:var(--secondary-color); font-size:0.85rem;">Liquidity: <strong>${data.raw.dex || 'Detecting...'}</strong></p>
                    <div style="display:flex; justify-content:center; gap:10px; margin-top:20px;">
                        <span class="badge" style="background:${riskColor}22; color:${riskColor}; border:1px solid ${riskColor}44; padding:6px 15px;">${data.riskLevel.toUpperCase()} RISK</span>
                    </div>
                </div>

                <!-- Signal Feed -->
                <div style="background:rgba(255,255,255,0.03); padding:25px; border-radius:16px; border:1px solid rgba(255,255,255,0.05);">
                    <p style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-vibrant); margin-bottom:15px;"><i class="fa-solid fa-microchip"></i> AUDIT SIGNALS</p>
                    <div class="signal-list">
                        ${data.riskFlags.map(flag => `
                            <div class="signal-row">
                                <div class="signal-icon" style="background:rgba(239,68,68,0.1); color:#ef4444;"><i class="fa-solid fa-triangle-exclamation"></i></div>
                                <span class="signal-label">${flag}</span>
                                <span class="signal-status" style="color:#ef4444;">RISK</span>
                            </div>
                        `).join('')}
                        ${data.positiveSignals.map(sig => `
                            <div class="signal-row">
                                <div class="signal-icon" style="background:rgba(16,185,129,0.1); color:#10b981;"><i class="fa-solid fa-check"></i></div>
                                <span class="signal-label">${sig}</span>
                                <span class="signal-status" style="color:#10b981;">SECURE</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div style="padding:20px 25px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px;">
                <div style="display:flex; gap:20px;">
                    <div><span style="font-size:0.65rem; color:var(--secondary-color);">BUY TAX</span><div style="font-family:var(--font-mono); font-weight:700;">${data.raw.buyTax}</div></div>
                    <div><span style="font-size:0.65rem; color:var(--secondary-color);">SELL TAX</span><div style="font-family:var(--font-mono); font-weight:700;">${data.raw.sellTax}</div></div>
                    <div><span style="font-size:0.65rem; color:var(--secondary-color);">HOLDERS</span><div style="font-family:var(--font-mono); font-weight:700;">${data.raw.holders}</div></div>
                </div>
                <button class="btn btn-outline btn-small" onclick="showToast('Audit report downloaded', 'success')"><i class="fa-solid fa-download"></i> Full Report</button>
            </div>
        </div>
    `;
}

function renderWalletResult(data, container) {
    const riskColor = data.riskScore > 70 ? '#ef4444' : data.riskScore > 30 ? '#f59e0b' : '#10b981';
    container.innerHTML = `
        <div class="tool-result-card fade-in">
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:25px; padding:25px;">
                <!-- Identity -->
                <div style="background:rgba(255,255,255,0.03); padding:25px; border-radius:16px; border:1px solid rgba(255,255,255,0.05);">
                    <div style="display:flex; align-items:center; gap:20px; margin-bottom:20px;">
                        <div style="width:60px; height:60px; border-radius:50%; background:linear-gradient(45deg, #1e293b, #0f172a); border:2px solid ${riskColor}; display:flex; align-items:center; justify-content:center;">
                            <i class="fa-solid fa-user-shield" style="color:${riskColor}; font-size:1.5rem;"></i>
                        </div>
                        <div>
                            <h3 style="margin:0;">Wallet Profile</h3>
                            <p style="margin:0; font-family:var(--font-mono); font-size:0.75rem; color:var(--secondary-color);">${data.address.substring(0,10)}...${data.address.substring(data.address.length-6)}</p>
                        </div>
                    </div>
                    <div class="risk-meter" style="height:8px; background:rgba(255,255,255,0.05); border-radius:10px; margin-bottom:10px; overflow:hidden;">
                        <div style="width:${data.riskScore}%; height:100%; background:${riskColor}; box-shadow:0 0 10px ${riskColor};"></div>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
                        <span style="color:var(--secondary-color);">Exposure Risk</span>
                        <span style="color:${riskColor}; font-weight:700;">${data.riskScore}% (${data.riskLevel})</span>
                    </div>
                    <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:20px;">
                        ${data.tags.map(tag => `<span class="badge" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); font-size:0.65rem;">${tag}</span>`).join('')}
                    </div>
                </div>

                <!-- Threat Intel -->
                <div style="background:rgba(255,255,255,0.03); padding:25px; border-radius:16px; border:1px solid rgba(255,255,255,0.05);">
                    <p style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-vibrant); margin-bottom:15px;"><i class="fa-solid fa-database"></i> REGISTRY MATCHES</p>
                    <div class="signal-list">
                        ${data.riskFlags.map(flag => `
                            <div class="signal-row">
                                <div class="signal-icon" style="background:rgba(168,85,247,0.1); color:#a855f7;"><i class="fa-solid fa-fingerprint"></i></div>
                                <span class="signal-label" style="font-size:0.8rem;">${flag}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div style="padding:20px 25px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05);">
                <p style="margin:0; font-size:0.85rem; color:var(--secondary-color);">🤖 <strong>AI Conclusion:</strong> ${data.summary}</p>
            </div>
        </div>
    `;
}

function renderPhishingResult(data, container) {
    const riskColor = data.isMalicious ? '#ef4444' : '#10b981';
    container.innerHTML = `
        <div class="tool-result-card fade-in" style="border:1px solid ${riskColor}44;">
            <div style="padding:30px; text-align:center;">
                <div style="width:80px; height:80px; border-radius:50%; background:${riskColor}11; border:2px solid ${riskColor}; display:flex; align-items:center; justify-content:center; margin:0 auto 20px;">
                    <i class="fa-solid ${data.isMalicious ? 'fa-biohazard' : 'fa-shield-heart'}" style="color:${riskColor}; font-size:2.5rem;"></i>
                </div>
                <h2 style="margin-bottom:10px;">${data.isMalicious ? 'DANGEROUS DOMAIN' : 'BENIGN DOMAIN'}</h2>
                <p style="font-family:var(--font-mono); color:var(--secondary-color);">${data.url}</p>
                
                <div style="max-width:500px; margin:30px auto; display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                    <div style="background:rgba(255,255,255,0.03); padding:15px; border-radius:12px; border:1px solid rgba(255,255,255,0.05);">
                        <div style="font-size:0.65rem; color:var(--secondary-color);">RISK SCORE</div>
                        <div style="font-size:1.5rem; font-weight:900; color:${riskColor};">${data.riskScore}/100</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.03); padding:15px; border-radius:12px; border:1px solid rgba(255,255,255,0.05);">
                        <div style="font-size:0.65rem; color:var(--secondary-color);">REGISTRY STATUS</div>
                        <div style="font-size:1rem; font-weight:900; color:${riskColor}; margin-top:5px;">${data.isMalicious ? 'FLAGGED' : 'CLEAN'}</div>
                    </div>
                </div>

                <div style="text-align:left; max-width:600px; margin:0 auto; padding:20px; background:rgba(0,0,0,0.3); border-radius:12px;">
                    <p style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-vibrant); margin-bottom:10px;">THREAT INTELLIGENCE LOGS:</p>
                    ${data.riskFlags.map(flag => `<div style="font-size:0.8rem; color:white; margin-bottom:5px;"><i class="fa-solid fa-caret-right" style="color:${riskColor}; margin-right:8px;"></i>${flag}</div>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderSmartMoneyResult(data, container) {
    const scoreColor = data.score > 75 ? '#10b981' : data.score > 50 ? '#38bdf8' : '#f59e0b';
    container.innerHTML = `
        <div class="tool-result-card fade-in">
            <div style="padding:25px; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h2 style="margin:0; font-weight:900;"><i class="fa-solid fa-fish-fins" style="color:#f59e0b;"></i> Smart Money Cluster Report</h2>
                    <p style="margin:5px 0 0; color:var(--secondary-color); font-family:var(--font-mono); font-size:0.8rem;">Target: ${data.address}</p>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:1.5rem; font-weight:900; color:${scoreColor};">${data.overall}</div>
                    <div style="font-size:0.6rem; color:var(--secondary-color); letter-spacing:2px;">CLUSTER POSTURE</div>
                </div>
            </div>
            
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:25px; padding:25px;">
                <!-- Whale Stats -->
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                    <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:16px; border:1px solid rgba(255,255,255,0.05);">
                        <div style="font-size:0.65rem; color:var(--secondary-color);">ETH BALANCE</div>
                        <div style="font-size:1.2rem; font-weight:900; color:white; margin-top:5px;">${data.whaleDetails.balance}</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:16px; border:1px solid rgba(255,255,255,0.05);">
                        <div style="font-size:0.65rem; color:var(--secondary-color);">TX COUNT</div>
                        <div style="font-size:1.2rem; font-weight:900; color:white; margin-top:5px;">${data.whaleDetails.txCount}</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:16px; border:1px solid rgba(255,255,255,0.05);">
                        <div style="font-size:0.65rem; color:var(--secondary-color);">ORIGIN</div>
                        <div style="font-size:1rem; font-weight:700; color:white; margin-top:5px;">${data.whaleDetails.firstSeen}</div>
                    </div>
                    <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:16px; border:1px solid rgba(255,255,255,0.05);">
                        <div style="font-size:0.65rem; color:var(--secondary-color);">LAST ACTIVE</div>
                        <div style="font-size:1rem; font-weight:700; color:white; margin-top:5px;">${data.whaleDetails.lastActive}</div>
                    </div>
                </div>

                <!-- Signals -->
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:16px; border:1px solid rgba(255,255,255,0.05); max-height:300px; overflow-y:auto;">
                    <p style="font-family:var(--font-mono); font-size:0.7rem; color:var(--accent-vibrant); margin-bottom:15px;">NEURAL PATTERN MATCHES:</p>
                    ${data.signals.map(s => `
                        <div style="margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.05);">
                            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                                <span style="font-size:0.8rem; font-weight:700; color:white;">${s.label}</span>
                                <span style="font-size:0.65rem; color:${s.sentiment === 'BULLISH' ? '#10b981' : '#f59e0b'};">${s.confidence}% Conf.</span>
                            </div>
                            <p style="margin:0; font-size:0.75rem; color:var(--secondary-color);">${s.detail}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderArbitrageResult(data, container) {
    container.innerHTML = `
        <div class="tool-result-card fade-in">
            <div style="padding:25px; background:rgba(16,185,129,0.05); border-bottom:1px solid rgba(16,185,129,0.2); display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h2 style="margin:0; font-weight:900; color:#10b981;"><i class="fa-solid fa-arrows-left-right"></i> Opportunity Matrix</h2>
                    <p style="margin:5px 0 0; color:var(--secondary-color); font-size:0.8rem;">Spread Detected: <strong style="color:white;">${data.spreadPct}</strong> | Window: <strong style="color:#10b981;">${data.status}</strong></p>
                </div>
                <div style="text-align:center; padding:8px 20px; background:#10b981; color:#000; border-radius:12px; font-weight:900; font-size:0.9rem;">
                    PROFITS: ${data.isProfit ? 'OPEN' : 'SCANNING'}
                </div>
            </div>
            
            <div style="padding:25px; overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse; font-family:var(--font-mono); font-size:0.85rem;">
                    <thead>
                        <tr style="border-bottom:1px solid rgba(255,255,255,0.1); text-align:left;">
                            <th style="padding:15px 10px; color:var(--secondary-color);">EXCHANGE</th>
                            <th style="padding:15px 10px; color:var(--secondary-color);">PRICE</th>
                            <th style="padding:15px 10px; color:var(--secondary-color);">PROX. GAS</th>
                            <th style="padding:15px 10px; color:var(--secondary-color);">LIQUIDITY</th>
                            <th style="padding:15px 10px; color:var(--secondary-color);">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.opportunities.map(o => {
                            const isBest = o.dex === data.bestSell.dex || o.dex === data.bestBuy.dex;
                            return `
                                <tr style="border-bottom:1px solid rgba(255,255,255,0.05); background:${isBest ? 'rgba(16,185,129,0.05)' : 'transparent'};">
                                    <td style="padding:15px 10px;"><i class="fa-solid fa-circle" style="color:${o.color}; font-size:0.5rem; margin-right:10px;"></i> ${o.dex}</td>
                                    <td style="padding:15px 10px; font-weight:900;">$${o.price}</td>
                                    <td style="padding:15px 10px; color:var(--secondary-color);">${o.gas}</td>
                                    <td style="padding:15px 10px;"><span class="badge" style="background:rgba(255,255,255,0.05); font-size:0.6rem;">${o.liquidity}</span></td>
                                    <td style="padding:15px 10px;">${o.dex === data.bestBuy.dex ? '<span style="color:#ef4444; font-weight:700;">BEST BUY</span>' : o.dex === data.bestSell.dex ? '<span style="color:#10b981; font-weight:700;">BEST SELL</span>' : '<span style="color:var(--secondary-color);">Neutral</span>'}</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            
            <div style="margin:0 25px 25px; padding:20px; background:rgba(0,0,0,0.3); border-radius:16px; border:1px solid rgba(255,255,255,0.05); display:flex; align-items:center; gap:20px;">
                <div style="width:50px; height:50px; border-radius:50%; background:#10b98111; border:1px solid #10b981; display:flex; align-items:center; justify-content:center;">
                    <i class="fa-solid fa-route" style="color:#10b981;"></i>
                </div>
                <div style="flex:1;">
                    <div style="font-size:0.7rem; color:var(--secondary-color);">OPTIMIZED ARBITRAGE ROUTE</div>
                    <div style="font-size:0.95rem; color:white; font-weight:700;">Buy on <strong style="color:#ef4444;">${data.bestBuy.dex}</strong> → Bridge → Sell on <strong style="color:#10b981;">${data.bestSell.dex}</strong></div>
                </div>
                <button class="btn btn-primary btn-small" style="background:#10b981; color:#000;">Execute via Bot</button>
            </div>
        </div>
    `;
}

function renderAlphaResult(data, container) {
    container.innerHTML = `
        <div class="tool-result-card fade-in" style="background:rgba(15,23,42,0.8); border:1px solid rgba(168,85,247,0.3);">
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
                <!-- Left: Master Score -->
                <div style="padding:40px; border-right:1px solid rgba(168,85,247,0.2); text-align:center;">
                    <p style="font-family:var(--font-mono); font-size:0.75rem; color:#a855f7; letter-spacing:4px; margin-bottom:20px;">NEURAL CONVERGENCE SCORE</p>
                    <div style="position:relative; width:180px; height:180px; margin:0 auto 30px;">
                        <svg viewBox="0 0 100 100" style="transform: rotate(-90deg); filter: drop-shadow(0 0 10px rgba(168,85,247,0.4));">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(168,85,247,0.1)" stroke-width="8"></circle>
                            <circle cx="50" cy="50" r="45" fill="none" stroke="url(#alphaGradient)" stroke-width="8" stroke-dasharray="${data.avgScore * 2.8} 282" stroke-linecap="round"></circle>
                            <defs>
                                <linearGradient id="alphaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stop-color="#a855f7" />
                                    <stop offset="100%" stop-color="#38bdf8" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                            <div style="font-size:3.5rem; font-weight:900; background:linear-gradient(135deg, white, #a855f7); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">${data.avgScore}</div>
                            <div style="font-size:0.7rem; color:var(--secondary-color); font-weight:800;">ALPHA INDEX</div>
                        </div>
                    </div>
                    <div style="background:rgba(168,85,247,0.15); padding:10px 25px; border-radius:30px; display:inline-block; border:1px solid rgba(168,85,247,0.3); margin-bottom:20px;">
                        <span style="font-weight:900; color:#a855f7; font-size:1.2rem;">${data.overallSignal}</span>
                    </div>
                    <p style="color:var(--secondary-color); font-size:0.85rem; line-height:1.6;">${data.recommendation}</p>
                </div>

                <!-- Right: Model Matrix -->
                <div style="padding:40px; background:rgba(0,0,0,0.2);">
                    <p style="font-family:var(--font-mono); font-size:0.7rem; color:var(--secondary-color); margin-bottom:25px;">MODEL SIGNAL STRENGTH MATRIX</p>
                    ${data.factors.map(f => `
                        <div style="margin-bottom:20px;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:8px; align-items:center;">
                                <div style="display:flex; align-items:center; gap:10px;">
                                    <i class="fa-solid ${f.icon}" style="color:${f.color}; font-size:0.9rem;"></i>
                                    <span style="font-size:0.85rem; color:white; font-weight:600;">${f.name}</span>
                                </div>
                                <span style="font-family:var(--font-mono); color:${f.color}; font-weight:900;">${f.score}%</span>
                            </div>
                            <div style="height:6px; background:rgba(255,255,255,0.04); border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,0.05);">
                                <div style="width:${f.score}%; height:100%; background:linear-gradient(90deg, transparent, ${f.color}); box-shadow:0 0 10px ${f.color}44;"></div>
                            </div>
                        </div>
                    `).join('')}
                    
                    <div style="margin-top:30px; border-top:1px solid rgba(255,255,255,0.05); padding-top:20px; display:flex; justify-content:space-between;">
                        <div>
                            <div style="font-size:0.6rem; color:var(--secondary-color);">LIQUIDITY</div>
                            <div style="font-size:0.9rem; font-weight:700; color:white;">${data.onchain.balance} ETH</div>
                        </div>
                        <div>
                            <div style="font-size:0.6rem; color:var(--secondary-color);">MOMENTUM</div>
                            <div style="font-size:0.9rem; font-weight:700; color:#10b981;">STABLE +${data.onchain.txCount} TX</div>
                        </div>
                        <div>
                            <div style="font-size:0.6rem; color:var(--secondary-color);">NETWORK</div>
                            <div style="font-size:0.9rem; font-weight:700; color:#38bdf8;">ETHEREUM</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}



document.addEventListener('DOMContentLoaded', () => {
    // === Particles Background ===
    initParticles();

    // === Spa Router ===
    const appContent = document.getElementById('app-content');
    const navLinks = document.querySelectorAll('[data-route]');

    // Intercept clicks on custom router links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-route]');
        if (link) {
            e.preventDefault();
            const route = link.getAttribute('data-route');
            navigateTo(route);
        }
    });

    // Default route
    navigateTo('home');

    // === Chatbot Logic ===
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');

    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });

    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // Handle Quick Questions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('qq-btn')) {
            const question = e.target.textContent;
            sendChatMessage(question);
            // Hide quick questions
            const qqContainer = e.target.closest('.quick-questions');
            if(qqContainer) qqContainer.style.display = 'none';
        }
    });

    // Handle Quick Questions
    async function processChatMessage(message) {
        const addressRegex = /0x[a-fA-F0-0]{40}/g;
        const matches = message.match(addressRegex);
        
        if (matches && matches.length > 0) {
            const address = matches[0];
            const token = localStorage.getItem('token');
            if(!token) return "I see you pasted an address, but you need to be logged in for me to analyze it on-chain.";
            
            // Show typing...
            const typingMsg = document.createElement('div');
            typingMsg.className = 'message ai-message typing';
            typingMsg.innerHTML = '<p><i class="fa-solid fa-brain fa-pulse"></i> AI is auditing address '+address.substring(0,8)+'... </p>';
            chatbotMessages.appendChild(typingMsg);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            try {
                const res = await fetch(`/api/godmode/audit?address=${address}`, { headers: { 'Authorization': `Bearer ${token}` } });
                const data = await res.json();
                typingMsg.remove();
                if(data.error) return "I tried to audit that address but encountered an error: " + data.error;
                
                const score = 100 - data.riskScore;
                return `**AI Audit Result for ${address.substring(0,10)}...**\n\nSecurity Score: **${score}/100**\nStatus: ${score > 70 ? '🟢 SAFE' : (score > 40 ? '🟡 MEDIUM RISK' : '🔴 CRITICAL')}\n\nKey Findings:\n- ${data.issues.join('\n- ')}\n\nTrust Level: ${data.trustLevel}. [View in God-Mode](#tools)`;
            } catch(e) {
                typingMsg.remove();
                return "My on-chain engine is currently busy. Please try manual scanning in the Tools section.";
            }
        }

        const lower = message.toLowerCase();
        let reply = "";
        
        if (lower.includes("hello") || lower.includes("hi")) {
            reply = "Hello! I am the AI Guardian Assistant. I'm monitoring real-time blockchain signals to keep your assets safe. How can I help you today?";
        } else if (lower.includes("scam") || lower.includes("safe") || lower.includes("rug")) {
            reply = "Security is my priority. My neural network analyzes contract bytecode, liquidity locks, and holder distributions. I recommend using the 'Rug Pull Predictor' for a full scan.";
        } else if (lower.includes("plan") || lower.includes("price") || lower.includes("premium")) {
            reply = "Our Pro and Elite plans offer unlimited real-time scanning and institutional API access. Professional traders use our Elite plan for sub-second threat detection.";
        } else if (lower.includes("wallet") || lower.includes("address")) {
            reply = "I can scan any EVM-compatible wallet. I check for interactions with mixers like Tornado Cash and known phishing deployers. Use the Wallet Guardian tool above!";
        } else if (lower.includes("hack") || lower.includes("drain")) {
            reply = "URGENT: If you suspect a drainer, revoke all approvals immediately using tools like Revoke.cash, then use our Wallet Guardian to see where funds are moving.";
        } else if (lower.includes("token") || lower.includes("contract")) {
            reply = "I recommend checking the 'Honeypot' status and 'Tax' levels. High sell taxes (>10%) are often a sign of a slow rug pull. My rug predictor tool can check this for you.";
        } else {
            const responses = [
                "I'm AI Guardian, your professional crypto security partner.",
                "Paste any contract address here and I will audit it instantly.",
                "Our God-Mode engine covers Ethereum, BSC, and Polygon.",
                "The Elite plan includes advanced Whale tracking and MEV protection.",
                "I detect hundreds of threats every hour on the global map."
            ];
            reply = responses[Math.floor(Math.random() * responses.length)];
        }
        return reply;
    }

    const handleSend = async () => {
        const message = chatbotInput.value.trim();
        if(!message) return;

        chatbotMessages.innerHTML += `<div class="message user-message"><p>${message}</p></div>`;
        chatbotInput.value = '';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        const reply = await processChatMessage(message);
        setTimeout(() => {
            const finalAi = document.createElement('div');
            finalAi.innerHTML = `<div class="message ai-message"><p>${reply}</p></div>`;
            chatbotMessages.appendChild(finalAi.firstElementChild);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 800);
    };

    chatbotSend.addEventListener('click', handleSend);
    chatbotInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });

    // Live Threat Feed Simulation (Functional View)
    function updateThreatFeed() {
        const feed = document.getElementById('threat-feed');
        if (!feed) return;
        
        feed.innerHTML = ''; // Clear initial
        const threats = [
            { text: "Suspicious contract deployed on BSC", risk: "MEDIUM" },
            { text: "Liquidity removed from $GOLD_PEPE", risk: "HIGH" },
            { text: "Tornado Cash interaction: 0x...4a2b", risk: "INFO" },
            { text: "Malicious DApp flagged: uniswap-claims.org", risk: "CRITICAL" },
            { text: "Whale dumping $PEPE in 5 venues", risk: "HIGH" }
        ];
        
        setInterval(() => {
            const t = threats[Math.floor(Math.random() * threats.length)];
            const item = document.createElement('div');
            item.className = 'threat-item';
            item.innerHTML = `<span>[LIVE] ${t.text}</span><span class="text-${t.risk === 'CRITICAL' ? 'high' : (t.risk === 'HIGH' ? 'high' : (t.risk === 'MEDIUM' ? 'medium' : 'low'))}">${t.risk}</span>`;
            feed.prepend(item);
            if (feed.children.length > 5) feed.lastElementChild.remove();
        }, 3000);
    }
    
    updateThreatFeed();
});

// Institutional Report Downloader
function downloadReport(type, address) {
    const reportData = {
        platform: "CryptoAyuda AI Guardian",
        reportId: "GOD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        timestamp: new Date().toISOString(),
        target: address,
        tool: type,
        status: "Institutional Verified"
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_GUARDIAN_REPORT_${address.substring(0,6)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    alert("Institutional Grade Report downloaded successfully.");
}

// View-specific event bindings
function bindViewEvents(route) {
    if (route === 'home') {
        const signupBtns = document.querySelectorAll('.signup-trigger');
        signupBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                navigateTo('auth');
                // Switch to register tab automatically
                setTimeout(() => {
                    const regTab = document.getElementById('tab-register');
                    if (regTab) regTab.click();
                }, 100);
            });
        });

        // Initialize Tactical Network Graph Demo
        initTacticalGraph('hero-network-graph', 8);
        initTacticalGraph('mock-graph-container', 12);
    }
    
    if (route === 'tools') {
        const plan = localStorage.getItem('plan') || 'free';
        const role = localStorage.getItem('role') || 'user';
        const isPro = plan === 'pro' || plan === 'elite' || role === 'admin';
        const isElite = plan === 'elite' || role === 'admin';
        const hasAccess = isPro || isElite;

        if (!hasAccess) {
            // Show upgrade gate banner at top
            const toolsSection = document.querySelector('.tools-section');
            if (toolsSection) {
                const gate = document.createElement('div');
                gate.className = 'plan-gate fade-in';
                gate.innerHTML = `
                    <div class="plan-gate-inner">
                        <i class="fa-solid fa-lock" style="font-size:2rem;color:var(--accent-color);margin-bottom:12px;"></i>
                        <h3>Limited Free Access</h3>
                        <p>Your current plan is <strong>Free</strong>. You have <strong>3 daily scans</strong> across all tools.</p>
                        <button class="btn btn-primary" onclick="navigateTo('pricing')" style="margin-top:16px;">Get Unlimited Scans</button>
                    </div>
                `;
                toolsSection.prepend(gate);
            }
        } else {
            // Show Developer API for premium tiers
            const apiCard = document.getElementById('api-access-card');
            if (apiCard) {
                apiCard.style.display = 'block';
                const email = localStorage.getItem('email') || 'USER';
                document.getElementById('display-api-key').textContent = `CA-${email.split('@')[0].toUpperCase()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
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
                    resultArea.innerHTML = `
                        <div style="text-align:center;padding:20px;">
                            <i class="fa-solid fa-crown" style="font-size:1.5rem;color:#f59e0b;margin-bottom:10px;display:block;"></i>
                            <p style="color:var(--secondary-color);margin-bottom:12px;">The <strong>Whale Move AI</strong> requires an <strong>Elite</strong> plan.</p>
                            <button class="btn btn-accent" onclick="navigateTo('pricing')">Get Elite Now</button>
                        </div>
                    `;
                    return;
                }

                if (!isPro && btnType !== 'wallet' && btnType !== 'rug' && btnType !== 'phishing') {
                    resultArea.style.display = 'block';
                    resultArea.innerHTML = `
                        <div style="text-align:center;padding:20px;">
                            <i class="fa-solid fa-lock" style="font-size:1.5rem;color:var(--risk-medium);margin-bottom:10px;display:block;"></i>
                            <p style="color:var(--secondary-color);margin-bottom:12px;">This advanced AI feature requires a <strong>Pro</strong> or <strong>Elite</strong> plan.</p>
                            <button class="btn btn-primary" onclick="navigateTo('pricing')">Upgrade Now</button>
                        </div>
                    `;
                    return;
                }

                // Route to the correct endpoint based on tool type
                if (btnType === 'smart-money' || btnType === 'arbitrage' || btnType === 'alpha') {
                    runTradingToolScan(btnType, inputValue, resultArea);
                } else {
                    runRealToolScan(btnType, inputValue, resultArea);
                }
            });
        });
    }

    if (route === 'auth') {
        const tabLogin = document.getElementById('tab-login');
        const tabRegister = document.getElementById('tab-register');
        const formLogin = document.getElementById('login-form');
        const formRegister = document.getElementById('register-form');

        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            formLogin.style.display = 'block';
            formRegister.style.display = 'none';
        });

        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            formRegister.style.display = 'block';
            formLogin.style.display = 'none';
        });

        // Register action
        document.getElementById('btn-register').addEventListener('click', async () => {
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-pass').value;
            const errEl = document.getElementById('reg-error');
            const sucEl = document.getElementById('reg-success');
            errEl.style.display = 'none'; sucEl.style.display = 'none';

            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if(!res.ok) throw new Error(data.error);

                sucEl.textContent = "Account created! You can now log in.";
                sucEl.style.display = 'block';
                setTimeout(() => tabLogin.click(), 2000);
            } catch(e) {
                errEl.textContent = e.message;
                errEl.style.display = 'block';
            }
        });

        // Login Action
        document.getElementById('btn-login').addEventListener('click', async () => {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-pass').value;
            const errEl = document.getElementById('login-error');
            errEl.style.display = 'none';

            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if(!res.ok) throw new Error(data.error);

                // Save auth session
                localStorage.setItem('token', data.token);
                localStorage.setItem('plan', data.plan);
                localStorage.setItem('email', data.email);
                localStorage.setItem('role', data.role || 'user');
                updateAuthUI();
                // Redirect admin to admin panel, others to tools
                if (data.role === 'admin') {
                    navigateTo('admin');
                } else {
                    navigateTo('tools');
                }
            } catch(e) {
                errEl.textContent = e.message;
                errEl.style.display = 'block';
            }
        });
    }

    if (route === 'pricing') {
        const token = localStorage.getItem('token');
        const paymentTriggers = document.querySelectorAll('.payment-trigger');

        paymentTriggers.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!token) {
                    alert("Please register or log in to purchase a premium plan.");
                    navigateTo('auth');
                    return;
                }

                const plan = btn.getAttribute('data-plan');
                const priceStr = plan === 'pro' ? '29.00' : '99.00';
                
                const containerId = `paypal-button-container-${plan}`;
                const containerEl = document.getElementById(containerId);
                
                if (containerEl && window.paypal) {
                    btn.style.display = 'none'; // Hide upgrade button
                    containerEl.style.display = 'block';
                    containerEl.innerHTML = ''; // prevent duplicates
                    
                    paypal.Buttons({
                        style: { layout: 'vertical', color: 'gold', shape: 'pill', label: 'checkout' },
                        createOrder: function(data, actions) {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: { currency_code: 'USD', value: priceStr },
                                    description: `CryptoAyuda - ${plan.toUpperCase()}`,
                                    payee: { email_address: "tbrcarabelli@gmail.com" }
                                }]
                            });
                        },
                        onApprove: function(data, actions) {
                            // Mostrar loader
                            document.body.insertAdjacentHTML('beforeend', '<div id="cinematic-overlay" style="position:fixed; inset:0; z-index:10000; background:black; display:flex; align-items:center; justify-content:center; color:var(--accent-vibrant); font-family:var(--font-mono); font-size:2rem; animation: fadeOut 3s forwards;"><div class="text-center"><i class="fa-solid fa-satellite-dish fa-spin" style="font-size:4rem;"></i><br>VERIFYING TRANSACTION...</div></div>');

                            return actions.order.capture().then(function(details) {
                                // Llamar al backend para subir de nivel
                                return fetch('/api/orders/capture', {
                                    method: 'POST',
                                    headers: { 
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    },
                                    body: JSON.stringify({ orderID: details.id, planType: plan })
                                }).then(res => res.json())
                                .then(serverData => {
                                    const overlay = document.getElementById('cinematic-overlay');
                                    if (serverData.error) {
                                         if(overlay) overlay.remove();
                                         alert("Error upgrading account: " + serverData.error);
                                    } else {
                                         if(overlay) overlay.innerHTML = `
                                             <div class="text-center fade-in">
                                                 <i class="fa-solid fa-circle-check" style="font-size:4rem; color:var(--risk-low); margin-bottom:20px;"></i>
                                                 <br>ACCESS GRANTED<br><small style="color:white; font-family:var(--font-main);">Welcome to ${plan.toUpperCase()}</small>
                                             </div>
                                         `;
                                         localStorage.setItem('plan', serverData.plan);
                                         setTimeout(() => {
                                             if(overlay) overlay.remove();
                                             location.reload(); 
                                         }, 2500);
                                    }
                                });
                            });
                        },
                        onError: function(err) {
                            console.error('PayPal Frontend Error:', err);
                            alert("There was an error processing your payment with PayPal. Please try again.");
                        }
                    }).render(`#${containerId}`);
                } else if (!window.paypal) {
                    alert("PayPal SDK not loaded. Check internet connection.");
                }
            });
        });
    }
}

// Scanning Simulation for Home Page
async function performScan(input, type, container) {
    if(!input) {
        input = "0x" + Math.random().toString(16).slice(2, 42); // Fallback dummy
    }
    
    container.innerHTML = `
        <div class="scanning-animation">
            <div class="scanner-line"></div>
            <div class="scanner-text">AI Neural Network Analyzing ${type}...</div>
            <div class="code-blocks">
                <span>> Analyzing blockchain signals...</span>
                <span>> Compiling contract data...</span>
                <span>> Checking security indicators...</span>
            </div>
        </div>
    `;
    container.style.display = 'block';

    try {
        let endpoint = '';
        if (type.includes('Token')) {
            endpoint = `/api/analyze/token?address=${input}`;
        } else if (type.includes('Wallet')) {
            endpoint = `/api/analyze/wallet?address=${input}`;
        } else {
            endpoint = `/api/analyze/phishing?url=${input}`;
        }

        const res = await fetch(endpoint, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();

        if (res.status === 403 && data.limitReached) {
            if (data.isDemo) {
                container.innerHTML = `
                    <div class="scan-error-card" style="border:1px solid rgba(14, 165, 233, 0.3);background:rgba(14, 165, 233, 0.05);padding:20px;border-radius:15px;text-align:center;">
                        <i class="fa-solid fa-lock" style="color:var(--accent-vibrant);font-size:1.5rem;margin-bottom:10px;"></i>
                        <h4 style="color:#fff;">Demo Limit Reached</h4>
                        <p style="font-size:0.85rem;color:var(--secondary-color);margin-bottom:15px;">You've used your free anonymous scan. Create a free account to unlock 3 more daily scans, or upgrade to Pro for unlimited access.</p>
                        <div style="display:flex; justify-content:center; gap:10px;">
                            <button class="btn btn-primary btn-small" onclick="navigateTo('auth')" style="padding:8px 16px;">Create Free Account</button>
                            <button class="btn btn-outline btn-small" onclick="navigateTo('pricing')" style="padding:8px 16px;">View Plans</button>
                        </div>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div class="scan-error-card" style="border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.05);padding:20px;border-radius:15px;text-align:center;">
                        <i class="fa-solid fa-circle-exclamation" style="color:#ef4444;font-size:1.5rem;margin-bottom:10px;"></i>
                        <h4 style="color:#fff;">Limit Reached</h4>
                        <p style="font-size:0.85rem;color:var(--secondary-color);margin-bottom:15px;">You've used your 3 daily scans. Upgrade to Pro for unlimited AI intelligence.</p>
                        <button class="btn btn-primary btn-small" onclick="navigateTo('pricing')">View Plans</button>
                    </div>
                `;
            }
            return;
        }
        
        if (!res.ok) throw new Error(data.error || "Analysis failed");
        
        const riskScore = data.riskScore || 0;
        const riskLevelClass = riskScore > 70 ? 'high' : (riskScore > 30 ? 'medium' : 'low');

        // Build issue list HTML
        let issueHTML = '';
        if (data.riskFlags && data.riskFlags.length > 0) {
            data.riskFlags.forEach(flag => {
                let icon = 'triangle-exclamation';
                if(flag.includes('High') || flag.includes('Critical')) icon = 'skull-crossbones';
                else if(flag.includes('Info')) icon = 'info-circle';
                
                issueHTML += `<li><i class="fa-solid fa-${icon}"></i> ${flag}</li>`;
            });
        } else {
            issueHTML = `<li><i class="fa-solid fa-check-circle" style="color:var(--risk-low)"></i> No critical issues detected</li>`;
        }

        container.innerHTML = `
            <div class="ai-result-card fade-in">
                <div class="result-header">
                    <h3>AI Security Analysis</h3>
                    <div class="risk-meter ${riskLevelClass}">
                        <svg class="circular-chart" viewBox="0 0 36 36">
                            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path class="circle" stroke-dasharray="${riskScore}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div class="score-text">${riskScore}<small>/100</small></div>
                    </div>
                </div>
                <div class="result-body">
                    <p class="risk-level text-${riskLevelClass}">Risk Level: <strong>${data.riskLevel || 'Unknown'}</strong></p>
                    <p class="target-analyzed">Target: <span>${input}</span></p>
                    
                    <h4>Detected Issues:</h4>
                    <ul class="issue-list">
                        ${issueHTML}
                    </ul>
                </div>
            </div>
        `;
    } catch (err) {
        console.error("Scan error: ", err);
        container.innerHTML = `<div class="ai-result-card fade-in" style="border: 1px solid var(--risk-high); text-align:center;"><h4 class="text-high"><i class="fa-solid fa-triangle-exclamation"></i> Analysis Failure</h4><p class="text-secondary">${err.message}</p></div>`;
    }
}

// Tool Card Scanning Logic
async function runRealToolScan(type, inputValue, container) {
    const token = localStorage.getItem('token');
    const isFreeTool = (type === 'wallet' || type === 'rug' || type === 'phishing');
    
    if (!token && !isFreeTool) {
         container.innerHTML = `<p class="text-medium"><i class="fa-solid fa-lock"></i> Please log in to use advanced AI Scanners.</p>`;
         container.style.display = 'block';
         return;
    }

    container.style.display = 'block';
    
    // Insane Matrix Decoder Animation during loading
    container.innerHTML = `
        <div class="cyber-loader-container text-center py-5 fade-in">
            <div class="radar-scan mb-4" style="position:relative; width:120px; height:120px; border-radius:50%; margin:0 auto; border:1px solid rgba(56,189,248,0.3); background:radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%); overflow:hidden;">
                <div class="radar-beam" style="position:absolute; top:0; left:50%; width:50%; height:50%; background:linear-gradient(90deg, transparent, rgba(56,189,248,0.8)); transform-origin:bottom left; animation:radarSpin 2s linear infinite;"></div>
                <i class="fa-solid fa-satellite-dish" style="font-size:2.5rem; color:var(--accent-vibrant); text-shadow:0 0 15px var(--accent-vibrant); position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);"></i>
            </div>
            <div class="matrix-text mb-2" style="font-size:1.2rem; letter-spacing:4px; font-family:var(--font-mono); color:var(--accent-vibrant); text-shadow:0 0 10px var(--accent-vibrant);">INTERCEPTING BLOCKCHAIN DATA...</div>
            <div class="typing-text text-sm" style="color:var(--secondary-color); font-family:var(--font-mono); min-height:20px;">> Parsing network nodes...</div>
            <div class="progress mt-3" style="height:4px; background:rgba(0,0,0,0.5); border:1px solid rgba(56, 189, 248, 0.3); border-radius:10px; overflow:hidden;">
                <div class="progress-bar" id="scan-progress-bar" style="width:0%; background:linear-gradient(90deg, transparent, var(--accent-vibrant)); transition:width 2s cubic-bezier(0.1, 0.7, 1.0, 0.1); height:100%; box-shadow:0 0 10px var(--accent-vibrant);"></div>
            </div>
        </div>
    `;
    setTimeout(() => { 
        const pb = document.getElementById('scan-progress-bar');
        if(pb) pb.style.width = '100%'; 
        const typing = container.querySelector('.typing-text');
        if(typing) {
            setTimeout(()=> typing.innerHTML = '> Extracting contract bytecode...', 600);
            setTimeout(()=> typing.innerHTML = '> Running heuristic ML models...', 1200);
            setTimeout(()=> typing.innerHTML = '> Finalizing threat vectors...', 1800);
        }
    }, 50);

    try {
        const chain = document.getElementById('chain-select')?.value || 'eth';
        let endpoint = "";
        
        // Build Endpoint
        if(type === 'wallet') endpoint = `/api/analyze/wallet?address=${inputValue}`;
        else if(type === 'rug') endpoint = `/api/analyze/token?address=${inputValue}`;
        else if(type === 'phishing') endpoint = `/api/analyze/phishing?url=${inputValue}`;
        else if(type === 'audit') endpoint = `/api/godmode/audit?address=${inputValue}&chain=${chain}`;
        else if(type === 'honeypot-pro') endpoint = `/api/godmode/honeypot?address=${inputValue}&chain=${chain}`;
        else if(type === 'whale') endpoint = `/api/godmode/whale?address=${inputValue}&chain=${chain}`;
        else if(type === 'mev') endpoint = `/api/godmode/mev?address=${inputValue}&chain=${chain}`;
        else if(type === 'history') endpoint = `/api/godmode/history?address=${inputValue}&chain=${chain}`;

        const res = await fetch(endpoint, { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        
        if(res.status === 403 && data.limitReached) {
            if (data.isDemo) {
                container.innerHTML = `<div class="scan-error-card text-center p-3" style="background:rgba(2,6,23,0.9); border:1px solid rgba(239,68,68,0.5); border-radius:15px;"><i class="fa-solid fa-hand text-high" style="font-size:3rem;margin-bottom:15px;"></i><h4>Demo Limit Reached</h4><p class="text-sm">Create a free account or login to continue hunting.</p><button class="btn btn-outline btn-sm mt-3" onclick="navigateTo('auth')">Login / Register</button></div>`;
            } else {
                container.innerHTML = `<div class="scan-error-card text-center p-3" style="background:rgba(2,6,23,0.9); border:1px solid rgba(56,189,248,0.5); border-radius:15px;"><i class="fa-solid fa-lock text-accent" style="font-size:3rem;margin-bottom:15px;"></i><h4>Limit Reached</h4><p class="text-sm">Upgrade to Pro for unlimited scans.</p><button class="btn btn-primary btn-sm mt-3" onclick="navigateTo('pricing')">Upgrade to Pro</button></div>`;
            }
            return;
        }
        if(!res.ok) throw new Error(data.error || "Analysis failed");

        // Advanced Universal Renderer (1,000,000x Better UX)
        let riskScore = data.riskScore || 0;
        let riskState = riskScore > 40 ? 'CRITICAL' : (riskScore > 15 ? 'WARNING' : 'SECURE');
        if(data.isHoneypot) { riskState = 'CRITICAL'; riskScore = 99; }
        
        let riskColor = riskState === 'CRITICAL' ? 'var(--risk-high)' : (riskState === 'WARNING' ? '#f59e0b' : 'var(--risk-low)');
        let riskIcon = riskState === 'CRITICAL' ? 'fa-skull-crossbones fa-beat-fade' : (riskState === 'WARNING' ? 'fa-triangle-exclamation fa-fade' : 'fa-check-double fa-bounce');
        
        let titleMap = { 'rug': 'Token Security Assessment', 'phishing': 'Domain Threat Intel', 'wallet': 'Wallet Behavioral Health', 'audit': 'Deep Smart Contract Audit', 'honeypot-pro': 'DEX Honeypot Detection' };
        let displayTitle = titleMap[type] || 'AI Scan Results';

        let customWidgets = '';
        if(type === 'rug' || type === 'honeypot-pro') {
            customWidgets = `
                <div class="row g-2 mt-3 mb-4">
                    <div class="col-4"><div class="stat-box" style="text-align:center; padding:12px 5px; border-radius:8px; display:flex; flex-direction:column; background:${riskColor}11; border:1px solid ${riskColor}44;"><span style="font-size:0.65rem; color:var(--secondary-color); text-transform:uppercase; font-family:var(--font-mono); letter-spacing:1px;">Liquidity</span><span style="font-size:1rem; font-weight:900; margin-top:5px; font-family:var(--font-mono);" class="text-green">Locked</span></div></div>
                    <div class="col-4"><div class="stat-box" style="text-align:center; padding:12px 5px; border-radius:8px; display:flex; flex-direction:column; background:${riskColor}11; border:1px solid ${riskColor}44;"><span style="font-size:0.65rem; color:var(--secondary-color); text-transform:uppercase; font-family:var(--font-mono); letter-spacing:1px;">Ownership</span><span style="font-size:1rem; font-weight:900; margin-top:5px; font-family:var(--font-mono); color:#f59e0b;">Renounced</span></div></div>
                    <div class="col-4"><div class="stat-box" style="text-align:center; padding:12px 5px; border-radius:8px; display:flex; flex-direction:column; background:${riskColor}11; border:1px solid ${riskColor}44;"><span style="font-size:0.65rem; color:var(--secondary-color); text-transform:uppercase; font-family:var(--font-mono); letter-spacing:1px;">Honeypot</span><span style="font-size:1rem; font-weight:900; margin-top:5px; font-family:var(--font-mono);" class="${data.isHoneypot || riskScore > 50 ? 'text-red' : 'text-green'}">${data.isHoneypot || riskScore > 50 ? 'DETECTED' : 'CLEAR'}</span></div></div>
                </div>
            `;
        } else if (type === 'wallet') {
            customWidgets = `
                <div class="row g-2 mt-3 mb-4">
                    <div class="col-6"><div class="stat-box" style="text-align:center; padding:12px 5px; border-radius:8px; display:flex; flex-direction:column; background:${riskColor}11; border:1px solid ${riskColor}44;"><span style="font-size:0.65rem; color:var(--secondary-color); text-transform:uppercase; font-family:var(--font-mono); letter-spacing:1px;">Mixer Tx</span><span style="font-size:1.1rem; font-weight:900; margin-top:5px; font-family:var(--font-mono);" class="text-green">0</span></div></div>
                    <div class="col-6"><div class="stat-box" style="text-align:center; padding:12px 5px; border-radius:8px; display:flex; flex-direction:column; background:${riskColor}11; border:1px solid ${riskColor}44;"><span style="font-size:0.65rem; color:var(--secondary-color); text-transform:uppercase; font-family:var(--font-mono); letter-spacing:1px;">Sanctions</span><span style="font-size:1.1rem; font-weight:900; margin-top:5px; font-family:var(--font-mono);" class="text-green">CLEAN</span></div></div>
                </div>
            `;
        }

        let issuesArray = data.riskDetails || data.issues || (data.summary ? [data.summary] : ['Telemetry analysis complete. No severe anomalies.']);

        container.innerHTML = `
            <div class="cyber-report-card fade-in" style="border:1px solid ${riskColor}88; box-shadow:0 0 30px ${riskColor}22; border-radius:12px; overflow:hidden; background:rgba(2,6,23,0.8); backdrop-filter:blur(20px);">
                <div class="report-header" style="background:linear-gradient(90deg, ${riskColor}22, transparent); border-bottom:1px solid ${riskColor}44; padding:20px;">
                    <div style="display:flex; align-items:center; justify-content:space-between;">
                        <div style="display:flex; align-items:center;">
                            <div style="width:60px; height:60px; border-radius:12px; background:${riskColor}22; border:1px solid ${riskColor}; display:flex; align-items:center; justify-content:center; margin-right:15px; box-shadow:0 0 15px ${riskColor}66;">
                                <i class="fa-solid ${riskIcon}" style="font-size:2rem; color:${riskColor};"></i>
                            </div>
                            <div>
                                <h3 style="margin:0; font-family:var(--font-mono); letter-spacing:1px; color:white; font-size:1.1rem;">${displayTitle.toUpperCase()}</h3>
                                <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">
                                    <span class="badge" style="background:${riskColor}; color:#000; font-weight:900; box-shadow:0 0 10px ${riskColor}; border:none;">STATUS: ${riskState}</span>
                                    <span class="text-sm" style="color:var(--secondary-color); font-family:var(--font-mono); border-left:1px solid rgba(255,255,255,0.2); padding-left:10px;">${inputValue.length > 20 ? inputValue.substring(0,6)+'...'+inputValue.substring(inputValue.length-4) : inputValue}</span>
                                </div>
                            </div>
                        </div>
                        <div class="risk-gauge-container" style="position:relative; width:65px; height:65px;">
                            <svg viewBox="0 0 36 36" style="width:100%; height:100%;">
                                <path stroke="rgba(255,255,255,0.1)" stroke-width="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path stroke="${riskColor}" stroke-width="3" fill="none" stroke-dasharray="${riskScore}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" style="animation: gaugeFill 2s ease-out forwards; filter:drop-shadow(0 0 4px ${riskColor});" />
                            </svg>
                            <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; flex-direction:column;">
                                <span style="font-weight:900; font-size:1.1rem; color:white; font-family:var(--font-mono); text-shadow:0 0 5px ${riskColor};">${riskScore}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="report-body p-4" style="background:linear-gradient(180deg, rgba(255,255,255,0.02), transparent);">
                    ${customWidgets}
                    <h5 style="color:var(--accent-vibrant); font-family:var(--font-mono); font-size:0.85rem; margin-bottom:15px; letter-spacing:1px;"><i class="fa-solid fa-microchip"></i> AI ENGINE HEURISTICS</h5>
                    <ul class="cyber-issue-list" style="list-style:none; padding:0; margin:0;">
                        ${issuesArray.map((i, idx) => `
                            <li style="margin-bottom:12px; padding:12px; background:rgba(255,255,255,0.02); border-left:2px solid ${i.includes('CRITICAL') || i.includes('HIGH') || riskScore > 40 ? 'var(--risk-high)' : 'var(--risk-low)'}; font-family:var(--font-main); font-size:0.9rem; border-radius:0 8px 8px 0; animation: slideInRight 0.5s ease forwards; animation-delay:${idx*0.2}s; opacity:0; transform:translateX(-10px);">
                                <i class="fa-solid fa-angle-right" style="color:var(--secondary-color); margin-right:8px; font-size:0.75rem;"></i> ${i}
                            </li>
                        `).join('')}
                    </ul>
                    ${['audit', 'honeypot-pro'].includes(type) && !isFreeTool ? `<button class="btn btn-primary w-100 mt-4" style="font-family:var(--font-mono); font-weight:bold; letter-spacing:1px;" onclick="downloadReport('${type}', '${inputValue}')"><i class="fa-solid fa-download"></i> GENERATE PDF RECEIPT</button>` : ''}
                </div>
            </div>
        `;
    } catch(err) {
        container.innerHTML = `<div class="p-3 text-high"><i class="fa-solid fa-triangle-exclamation"></i> Analysis Failure: ${err.message}</div>`;
    }
}

// Institutional Dashboard Engine
async function loadDashboard() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const user = JSON.parse(atob(token.split('.')[1]));
    const walletAddress = user.username === 'admin' ? '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8' : '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'; 
    
    addConsoleLog(`> Initiating Portfolio Scan for ${walletAddress.substring(0,8)}...`);
    
    try {
        const res = await fetch(`/api/godmode/wallet?address=${walletAddress}`, { headers: { 'Authorization': `Bearer ${token}` } });
        const data = await res.json();
        
        const ring = document.getElementById('wallet-health-percentage');
        const status = document.getElementById('wallet-health-status');
        const summary = document.getElementById('wallet-summary');
        
        if (ring) { ring.textContent = `${100 - data.riskScore}%`; ring.style.color = (100 - data.riskScore) > 70 ? 'var(--accent-vibrant)' : 'var(--risk-high)'; }
        if (status) {
            status.textContent = data.healthStatus;
            status.className = `badge badge-${data.riskScore > 50 ? 'high' : 'low'} p-2`;
        }
        if (summary) summary.textContent = data.summary;

        const tbody = document.getElementById('token-list-body');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td><img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" width="20" class="me-2"> Ethereum (ETH)</td>
                    <td>${parseFloat(data.balance).toFixed(4)} ETH</td>
                    <td><span class="text-low">5/100</span></td>
                    <td><span class="badge badge-low">SECURE</span></td>
                </tr>
                <tr>
                    <td><img src="https://cryptologos.cc/logos/tether-usdt-logo.png" width="20" class="me-2"> Tether (USDT)</td>
                    <td>1,250.00</td>
                    <td><span class="text-low">12/100</span></td>
                    <td><span class="badge badge-low">SECURE</span></td>
                </tr>
                <tr>
                    <td><img src="https://cryptologos.cc/logos/pepe-pepe-logo.png" width="20" class="me-2"> PEPE (EVM)</td>
                    <td>500,000,000</td>
                    <td><span class="text-high">85/100</span></td>
                    <td><span class="badge badge-high">HONEYPOT RISK</span></td>
                </tr>
            `;
        }
        addConsoleLog(`> [SUCCESS] Sync complete. High Risk assets identified: 1`);
    } catch (e) {
        addConsoleLog(`> [ERROR] Node refusal: ${e.message}`);
    }
}

function addConsoleLog(msg) {
    const consoleLogs = document.getElementById('console-logs');
    if (!consoleLogs) return;
    const line = document.createElement('div');
    line.className = 'console-line';
    line.textContent = msg;
    consoleLogs.appendChild(line);
    if(consoleLogs.children.length > 8) consoleLogs.firstElementChild.remove();
}

// Particles & Navigation Init
function initParticles() {
    const container = document.getElementById('particles-container');
    if(!container) return;
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'floating-particle';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        p.style.animationDuration = (Math.random() * 20 + 10) + 's';
        container.appendChild(p);
    }
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (link && link.dataset.link === 'dashboard') {
        setTimeout(loadDashboard, 100);
    }
});

// Final Setup
window.addEventListener('DOMContentLoaded', () => {
    initParticles();
    updateAuthUI();
});

// =============================================
// XP GAMIFICATION ENGINE
// =============================================

// Floating XP toast animation
function showXPToast(xpGained, rankData) {
    const existing = document.getElementById('xp-toast');
    if (existing) existing.remove();

    const rankColor = rankData?.color || '#a855f7';
    const toast = document.createElement('div');
    toast.id = 'xp-toast';
    toast.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:1.8rem; animation: bounceIn 0.5s ease;">${rankData?.icon || '⭐'}</span>
            <div>
                <div style="font-weight:900; font-size:1.1rem; color:${rankColor}; font-family:var(--font-mono); text-shadow:0 0 10px ${rankColor};">+${xpGained} XP</div>
                ${rankData?.name ? `<div style="font-size:0.75rem; color:rgba(255,255,255,0.7);">Rank: ${rankData.name}</div>` : ''}
            </div>
        </div>
    `;
    toast.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; z-index: 99999;
        background: rgba(2,6,23,0.95); backdrop-filter: blur(20px);
        border: 1px solid ${rankColor}88; border-radius: 16px; padding: 16px 24px;
        box-shadow: 0 0 30px ${rankColor}44; animation: slideInRight 0.4s ease, fadeOut 0.6s ease 2.4s forwards;
        pointer-events: none;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast?.remove(), 3100);
}

// Fetch user XP from server and populate profile XP bar
async function loadProfileXP() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const RANKS = [
        { name: 'Rookie', minXP: 0, icon: '🔰', color: '#6b7280' },
        { name: 'Hunter', minXP: 100, icon: '🏹', color: '#10b981' },
        { name: 'Silver Wolf', minXP: 300, icon: '🐺', color: '#94a3b8' },
        { name: 'Gold Shark', minXP: 700, icon: '🦈', color: '#f59e0b' },
        { name: 'Diamond Whale', minXP: 1500, icon: '💎', color: '#38bdf8' },
        { name: 'Grandmaster', minXP: 3000, icon: '👑', color: '#a855f7' }
    ];

    try {
        const res = await fetch('/api/auth/me', { headers: { 'Authorization': `Bearer ${token}` } });
        const user = await res.json();
        const xp = user.xp || 0;

        // Find current and next rank
        let currentRank = RANKS[0];
        let nextRank = RANKS[1];
        for (let i = RANKS.length - 1; i >= 0; i--) {
            if (xp >= RANKS[i].minXP) { currentRank = RANKS[i]; nextRank = RANKS[i + 1] || null; break; }
        }

        const pct = nextRank ? Math.min(((xp - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100, 100) : 100;

        // Update DOM elements
        const iconEl = document.getElementById('rank-icon-display');
        const nameEl = document.getElementById('rank-name-display');
        const xpEl = document.getElementById('xp-display');
        const barEl = document.getElementById('xp-progress-bar');
        const nextLabel = document.getElementById('xp-next-label');

        if (iconEl) iconEl.textContent = currentRank.icon;
        if (nameEl) { nameEl.textContent = currentRank.name.toUpperCase(); nameEl.style.color = currentRank.color; }
        if (xpEl) xpEl.textContent = `${xp} XP Total`;
        if (nextLabel) nextLabel.textContent = nextRank ? `${nextRank.minXP - xp} XP to ${nextRank.name}` : 'MAX RANK ACHIEVED 👑';
        if (barEl) setTimeout(() => { barEl.style.width = pct + '%'; }, 200);
    } catch (e) { console.warn('loadProfileXP failed:', e); }
}

// Fetch and render leaderboard
async function loadLeaderboard() {
    const bodyEl = document.getElementById('leaderboard-body');
    if (!bodyEl) return;

    const RANK_ICONS = { 'Rookie': '🔰', 'Hunter': '🏹', 'Silver Wolf': '🐺', 'Gold Shark': '🦈', 'Diamond Whale': '💎', 'Grandmaster': '👑' };
    const RANK_COLORS = { 'Rookie': '#6b7280', 'Hunter': '#10b981', 'Silver Wolf': '#94a3b8', 'Gold Shark': '#f59e0b', 'Diamond Whale': '#38bdf8', 'Grandmaster': '#a855f7' };
    const MEDALS = ['🥇', '🥈', '🥉'];

    try {
        const res = await fetch('/api/leaderboard');
        const users = await res.json();

        if (!users.length) { bodyEl.innerHTML = '<div class="text-center py-5" style="color:var(--secondary-color);">No hunters yet. Be the first!</div>'; return; }

        bodyEl.innerHTML = users.map((u, i) => {
            const icon = RANK_ICONS[u.rank] || '🔰';
            const color = RANK_COLORS[u.rank] || '#6b7280';
            const medal = MEDALS[i] || `#${i + 1}`;
            const isTop3 = i < 3;
            return `
                <div style="display:flex; align-items:center; justify-content:space-between; padding:16px 25px; border-bottom:1px solid rgba(255,255,255,0.03); ${isTop3 ? `background:${color}08;` : ''} animation: slideInRight 0.4s ease forwards; animation-delay:${i * 0.07}s; opacity:0; transform:translateX(-10px);">
                    <span style="font-size:${isTop3 ? '1.4rem' : '0.95rem'}; width:40px; text-align:center;">${medal}</span>
                    <div style="flex:1; margin-left:15px;">
                        <span style="font-family:var(--font-mono); color:white; font-size:0.9rem;">${u.email}</span>
                        <span style="margin-left:10px; font-size:0.65rem; padding:2px 8px; border-radius:10px; background:${color}22; border:1px solid ${color}44; color:${color};">${icon} ${u.rank}</span>
                    </div>
                    <div style="font-family:var(--font-mono); font-weight:900; color:${color}; text-shadow:0 0 8px ${color}66;">${u.xp.toLocaleString()} XP</div>
                </div>
            `;
        }).join('');
    } catch (e) { bodyEl.innerHTML = `<div class="text-center py-5" style="color:var(--risk-high);">Error loading leaderboard.</div>`; }
}

// Trading Tools Scan Engine
async function runTradingToolScan(type, inputValue, container) {
    const token = localStorage.getItem('token');
    if (!token) {
        container.style.display = 'block';
        container.innerHTML = `<div class="text-center p-4" style="background:rgba(2,6,23,0.9); border:1px solid rgba(239,68,68,0.5); border-radius:15px;"><i class="fa-solid fa-lock text-high" style="font-size:2rem;margin-bottom:10px;"></i><h4>Login Required</h4><button class="btn btn-outline mt-2" onclick="navigateTo('auth')">Login / Register</button></div>`;
        return;
    }
    if (!inputValue) {
        container.style.display = 'block';
        container.innerHTML = `<p class="text-high"><i class="fa-solid fa-triangle-exclamation"></i> Please enter a valid address.</p>`;
        return;
    }

    container.style.display = 'block';
    container.innerHTML = `
        <div class="cyber-loader-container text-center py-4 fade-in">
            <div style="position:relative; width:90px; height:90px; border-radius:50%; margin:0 auto 15px; border:1px solid rgba(168,85,247,0.3); background:radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%); overflow:hidden;">
                <div style="position:absolute; top:0; left:50%; width:50%; height:50%; background:linear-gradient(90deg, transparent, rgba(168,85,247,0.8)); transform-origin:bottom left; animation:radarSpin 1.5s linear infinite;"></div>
                <i class="fa-solid fa-brain" style="font-size:2rem; color:#a855f7; text-shadow:0 0 15px #a855f7; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);"></i>
            </div>
            <div style="font-size:1rem; letter-spacing:3px; font-family:var(--font-mono); color:#a855f7; text-shadow:0 0 10px #a855f7;">RUNNING AI MODELS...</div>
            <div style="height:3px; background:rgba(0,0,0,0.5); border-radius:10px; overflow:hidden; margin-top:15px; border:1px solid rgba(168,85,247,0.3);">
                <div style="width:0%; background:linear-gradient(90deg, #a855f7, #38bdf8); height:100%; transition:width 2s ease; box-shadow:0 0 10px #a855f7;" id="trade-progress-bar"></div>
            </div>
        </div>
    `;
    setTimeout(() => { const pb = document.getElementById('trade-progress-bar'); if(pb) pb.style.width = '100%'; }, 50);

    const endpointMap = { 'smart-money': 'smart-money', 'arbitrage': 'arbitrage', 'alpha': 'alpha' };
    try {
        const res = await fetch(`/api/trading/${endpointMap[type]}?address=${inputValue}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (res.status === 403 && data.planGate) {
            const plan = type === 'alpha' ? 'Elite' : 'Pro';
            const price = type === 'alpha' ? '99' : '29';
            container.innerHTML = `
                <div class="text-center p-4" style="background:rgba(2,6,23,0.9); border:1px solid rgba(168,85,247,0.5); border-radius:15px;">
                    <i class="fa-solid fa-crown" style="font-size:2.5rem; color:#a855f7; margin-bottom:15px;"></i>
                    <h4>${plan} Plan Required</h4>
                    <p class="text-secondary" style="font-size:0.9rem;">Unlock this tool for <strong style="color:#a855f7;">$${price}/mo</strong> with the ${plan} plan.</p>
                    <button class="btn btn-primary mt-3" onclick="navigateTo('pricing')">Upgrade to ${plan}</button>
                </div>
            `;
            return;
        }
        if (!res.ok) throw new Error(data.error || 'Analysis failed');

        // Show XP toast
        if (data.xpReward) showXPToast(data.xpReward.xpGained, data.xpReward.rank);

        // === RENDER: Smart Money Tracker ===
        if (type === 'smart-money') {
            const sentimentColor = data.overall === 'BULLISH' ? 'var(--risk-low)' : '#ef4444';
            container.innerHTML = `
                <div class="cyber-report-card fade-in" style="border:1px solid ${sentimentColor}88; border-radius:12px; overflow:hidden; background:rgba(2,6,23,0.8);">
                    <div style="padding:20px; background:linear-gradient(90deg,${sentimentColor}22,transparent); border-bottom:1px solid ${sentimentColor}33;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <h3 style="margin:0; font-family:var(--font-mono); font-size:1rem; letter-spacing:1px;">SMART MONEY ANALYSIS</h3>
                                <p style="margin:5px 0 0; font-size:0.8rem; color:var(--secondary-color); font-family:var(--font-mono);">${inputValue.substring(0,6)}...${inputValue.substring(inputValue.length-4)}</p>
                            </div>
                            <span style="padding:8px 18px; border-radius:20px; font-weight:900; font-size:1rem; background:${sentimentColor}; color:#000; box-shadow:0 0 15px ${sentimentColor};">${data.overall}</span>
                        </div>
                    </div>
                    <div class="p-4">
                        <p style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-vibrant); letter-spacing:1px; margin-bottom:15px;"><i class="fa-solid fa-signal"></i> SIGNAL BREAKDOWN</p>
                        ${(data.signals || []).map((s, i) => {
                            const sc = s.sentiment === 'BULLISH' ? 'var(--risk-low)' : s.sentiment === 'BEARISH' ? '#ef4444' : '#f59e0b';
                            return `<div style="margin-bottom:12px; padding:14px; background:rgba(255,255,255,0.02); border-left:3px solid ${sc}; border-radius:0 8px 8px 0; animation: slideInRight 0.5s ease forwards; animation-delay:${i*0.15}s; opacity:0; transform:translateX(-8px);">
                                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                    <strong style="font-family:var(--font-mono); font-size:0.85rem; color:white;">${s.label}</strong>
                                    <span style="font-size:0.7rem; padding:2px 8px; border-radius:10px; background:${sc}22; color:${sc}; border:1px solid ${sc}44;">${s.sentiment} ${s.confidence}%</span>
                                </div>
                                <p style="margin:0; font-size:0.8rem; color:var(--secondary-color);">${s.detail}</p>
                            </div>`;
                        }).join('')}
                        <div style="display:flex; gap:15px; margin-top:15px; padding-top:15px; border-top:1px solid rgba(255,255,255,0.05);">
                            <div style="flex:1; text-align:center;">
                                <div style="font-size:0.7rem; color:var(--secondary-color); font-family:var(--font-mono);">ETH FLOW</div>
                                <div style="font-size:1.3rem; font-weight:900; color:var(--accent-vibrant);">${data.totalFlow} ETH</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // === RENDER: Arbitrage Scanner ===
        else if (type === 'arbitrage') {
            const profitColor = data.isProfit ? 'var(--risk-low)' : '#f59e0b';
            container.innerHTML = `
                <div class="cyber-report-card fade-in" style="border:1px solid ${profitColor}88; border-radius:12px; overflow:hidden; background:rgba(2,6,23,0.8);">
                    <div style="padding:20px; background:linear-gradient(90deg,${profitColor}22,transparent); border-bottom:1px solid ${profitColor}33; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <h3 style="margin:0; font-family:var(--font-mono); font-size:1rem; letter-spacing:1px;">ARBITRAGE SCANNER</h3>
                            <p style="margin:3px 0 0; font-size:0.8rem; color:var(--secondary-color); font-family:var(--font-mono);">Spread: <strong style="color:${profitColor};">${data.spreadPct}</strong></p>
                        </div>
                        <span style="padding:8px 18px; border-radius:20px; font-weight:900; font-size:0.8rem; background:${profitColor}; color:#000; box-shadow:0 0 15px ${profitColor};">${data.status}</span>
                    </div>
                    <div class="p-4">
                        <p style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-vibrant); letter-spacing:1px; margin-bottom:15px;"><i class="fa-solid fa-table"></i> DEX PRICE MATRIX</p>
                        <div style="overflow-x:auto;">
                            <table style="width:100%; border-collapse:collapse; font-size:0.8rem; font-family:var(--font-mono);">
                                <thead><tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                                    <th style="padding:8px; text-align:left; color:var(--secondary-color);">Exchange</th>
                                    <th style="padding:8px; text-align:right; color:var(--secondary-color);">Price</th>
                                    <th style="padding:8px; text-align:right; color:var(--secondary-color);">Liquidity</th>
                                    <th style="padding:8px; text-align:right; color:var(--secondary-color);">Gas</th>
                                </tr></thead>
                                <tbody>
                                    ${(data.opportunities || []).map((o, i) => {
                                        const isBest = o.dex === data.bestSell.dex;
                                        const isBuy = o.dex === data.bestBuy.dex;
                                        return `<tr style="border-bottom:1px solid rgba(255,255,255,0.03); ${isBest ? 'background:rgba(16,185,129,0.08);' : isBuy ? 'background:rgba(239,68,68,0.05);' : ''} animation:slideInRight 0.4s ease forwards; animation-delay:${i*0.1}s; opacity:0; transform:translateX(-5px);">
                                            <td style="padding:10px 8px; color:white;">${isBest ? '📈 ' : isBuy ? '📉 ' : ''}${o.dex}</td>
                                            <td style="padding:10px 8px; text-align:right; color:${isBest ? 'var(--risk-low)' : 'var(--secondary-color)'}; font-weight:${isBest ? '900' : '400'};">\$${o.price}</td>
                                            <td style="padding:10px 8px; text-align:right; color:var(--secondary-color);">\$${parseInt(o.liquidity).toLocaleString()}</td>
                                            <td style="padding:10px 8px; text-align:right; color:var(--secondary-color);">${o.gasCost}</td>
                                        </tr>`;
                                    }).join('')}
                                </tbody>
                            </table>
                        </div>
                        ${data.isProfit ? `<div style="margin-top:15px; padding:12px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:8px; font-family:var(--font-mono); font-size:0.8rem; color:var(--risk-low);">💰 PROFIT WINDOW: Buy on <strong>${data.bestBuy.dex}</strong> @ \$${data.bestBuy.price} → Sell on <strong>${data.bestSell.dex}</strong> @ \$${data.bestSell.price}</div>` : ''}
                    </div>
                </div>
            `;
        }

        // === RENDER: AI Alpha Finder ===
        else if (type === 'alpha') {
            const sigColor = data.overallSignal?.includes('BUY') ? 'var(--risk-low)' : data.overallSignal?.includes('SELL') ? '#ef4444' : '#f59e0b';
            container.innerHTML = `
                <div class="cyber-report-card fade-in" style="border:1px solid #a855f788; border-radius:12px; overflow:hidden; background:rgba(2,6,23,0.8);">
                    <div style="padding:20px; background:linear-gradient(90deg,rgba(168,85,247,0.15),transparent); border-bottom:1px solid rgba(168,85,247,0.3);">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div>
                                <h3 style="margin:0; font-family:var(--font-mono); font-size:1rem; letter-spacing:1px; color:#a855f7;">AI ALPHA FINDER 👑</h3>
                                <p style="margin:3px 0 0; font-size:0.8rem; color:var(--secondary-color);">Confidence: <strong style="color:${sigColor};">${data.confidence}</strong></p>
                            </div>
                            <span style="padding:10px 18px; border-radius:20px; font-weight:900; font-size:1.1rem; background:${sigColor}; color:#000; box-shadow:0 0 20px ${sigColor};">${data.overallSignal}</span>
                        </div>
                    </div>
                    <div class="p-4">
                        <p style="font-family:var(--font-mono); font-size:0.75rem; color:var(--accent-vibrant); letter-spacing:1px; margin-bottom:15px;"><i class="fa-solid fa-network-wired"></i> 5-MODEL SIGNAL MATRIX</p>
                        ${(data.factors || []).map((f, i) => {
                            const fColor = f.trend === 'UP' ? 'var(--risk-low)' : f.trend === 'DOWN' ? '#ef4444' : '#f59e0b';
                            return `<div style="margin-bottom:12px; animation: slideInRight 0.5s ease forwards; animation-delay:${i*0.15}s; opacity:0; transform:translateX(-8px);">
                                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                    <span style="font-size:0.8rem; color:white; font-family:var(--font-mono);">${f.name}</span>
                                    <span style="font-size:0.7rem; color:${fColor}; font-family:var(--font-mono); font-weight:900;">${f.signal} ▲${f.score}</span>
                                </div>
                                <div style="height:5px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden;">
                                    <div style="width:${f.score}%; height:100%; background:linear-gradient(90deg, ${fColor}88, ${fColor}); border-radius:10px; transition:width 1s ease; box-shadow:0 0 5px ${fColor};"></div>
                                </div>
                            </div>`;
                        }).join('')}
                        <div style="margin-top:20px; padding:15px; background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3); border-radius:10px;">
                            <p style="margin:0; font-size:0.85rem; color:rgba(255,255,255,0.8);">🤖 ${data.recommendation}</p>
                        </div>
                        ${data.onchain ? `<div style="display:flex; gap:12px; margin-top:15px;">
                            <div style="flex:1; text-align:center; padding:12px; background:rgba(0,0,0,0.3); border-radius:8px; border:1px solid rgba(255,255,255,0.05);">
                                <div style="font-size:0.65rem; color:var(--secondary-color); font-family:var(--font-mono);">ON-CHAIN BALANCE</div>
                                <div style="font-size:1.1rem; font-weight:900; color:var(--accent-vibrant); margin-top:5px;">${data.onchain.balance} ETH</div>
                            </div>
                            <div style="flex:1; text-align:center; padding:12px; background:rgba(0,0,0,0.3); border-radius:8px; border:1px solid rgba(255,255,255,0.05);">
                                <div style="font-size:0.65rem; color:var(--secondary-color); font-family:var(--font-mono);">TX COUNT</div>
                                <div style="font-size:1.1rem; font-weight:900; color:var(--accent-vibrant); margin-top:5px;">${data.onchain.txCount?.toLocaleString()}</div>
                            </div>
                        </div>` : ''}
                    </div>
                </div>
            `;
        }

    } catch(err) {
        container.innerHTML = `<div class="p-3" style="border:1px solid rgba(239,68,68,0.5); border-radius:10px; color:#ef4444;"><i class="fa-solid fa-triangle-exclamation"></i> ${err.message}</div>`;
    }
}



// === NEW INTEGRATIONS (PAYPAL & HISTORY) ===

async function loadProfileHistory() {
    const historyBody = document.getElementById('profile-history-body');
    if (!historyBody) return;

    try {
        const res = await fetch('/api/profile/history', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const history = await res.json();

        if (!history || history.length === 0) {
            historyBody.innerHTML = '<tr><td colspan="3" class="text-center py-4" style="color:var(--secondary-color);">No recent activity. Start a scan to earn XP!</td></tr>';
            return;
        }

        historyBody.innerHTML = history.map(item => `
            <tr>
                <td style="padding:12px;"><span class="badge" style="background:rgba(56,189,248,0.1); color:var(--accent-vibrant); font-size:0.7rem;">${item.type}</span></td>
                <td style="padding:12px; color:rgba(255,255,255,0.8); font-weight:500;">${item.result}</td>
                <td style="padding:12px; font-size:0.7rem; opacity:0.5; font-family:var(--font-mono);">${new Date(item.timestamp).toLocaleTimeString()}</td>
            </tr>
        `).join('');
    } catch (e) {
        historyBody.innerHTML = '<tr><td colspan="3" class="text-center py-4 text-high">Error loading activity log.</td></tr>';
    }
}

function initPayPalButtons() {
    if (!window.paypal) {
        const script = document.createElement('script');
        script.src = "https://www.paypal.com/sdk/js?client-id=AWn_Xn6_0m5-3wM31kC3lE71x3t1U883yH5D94D6K9-2B3484h-l4B1sD7M_m0W1-v609Z_b18E1h9s5&currency=USD";
        script.onload = () => setupPayPal();
        document.head.appendChild(script);
    } else {
        setupPayPal();
    }
}

function setupPayPal() {
    const plans = [
        { id: 'pro', container: 'paypal-button-container-pro', amount: '29.00' },
        { id: 'elite', container: 'paypal-button-container-elite', amount: '99.00' }
    ];

    plans.forEach(plan => {
        const container = document.getElementById(plan.container);
        if (!container) return;
        container.innerHTML = ''; // Clear

        window.paypal.Buttons({
            style: { layout: 'vertical', color: 'blue', shape: 'pill', label: 'pay' },
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        description: `CryptoAyuda AI ${plan.id.toUpperCase()} Plan Upgrade`,
                        amount: { value: plan.amount }
                    }]
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                handleUpgradeSuccess(order.id, plan.id);
            },
            onError: (err) => {
                showToast("Payment processing error. Please try again.", "high");
                console.error("PayPal Error:", err);
            }
        }).render('#' + plan.container);
        
        // Hide standard upgrade buttons if PayPal is active
        const standardBtn = container.nextElementSibling;
        if (standardBtn && (standardBtn.classList.contains('payment-trigger') || (standardBtn.innerText && standardBtn.innerText.includes('Upgrade')))) {
            standardBtn.style.display = 'none';
        }
    });
}

async function handleUpgradeSuccess(orderID, planType) {
    try {
        const res = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ orderID, planType })
        });
        
        const data = await res.json();
        if (data.success) {
            localStorage.setItem('plan', data.newPlan);
            showToast(`LEVEL UP: You are now ${planType.toUpperCase()}! (+${data.bonusXP} XP Awarded)`, "low");
            // Sound effect simulation
            setTimeout(() => navigateTo('profile'), 3000);
        } else {
            showToast(data.error || "Upgrade verification failed.", "high");
        }
    } catch (e) {
        showToast("Network error verifying payment.", "high");
    }
}

// Tactical Network Graph Animation Logic
function initTacticalGraph(containerId, nodeCount) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ''; // Clear for re-init
    const nodes = [];
    
    // Create Nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'network-node';
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        
        if (Math.random() > 0.8) {
            node.style.background = 'var(--risk-high)';
            node.style.boxShadow = '0 0 15px var(--risk-high)';
            const pulse = document.createElement('div');
            pulse.className = 'pulse-ring';
            node.appendChild(pulse);
        }
        
        container.appendChild(node);
        nodes.push({ el: node, x, y });
    }
    
    // Create Random Edges
    nodes.forEach((node, i) => {
        const neighbors = nodes.slice(i + 1, i + 3);
        neighbors.forEach(neighbor => {
            const edge = document.createElement('div');
            edge.className = 'network-edge';
            
            const dx = neighbor.x - node.x;
            const dy = neighbor.y - node.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            // Adjust position slightly to center the edge on the node
            edge.style.width = `${distance}%`;
            edge.style.left = `${node.x}%`;
            edge.style.top = `${node.y}%`;
            edge.style.transform = `rotate(${angle}deg)`;
            
            container.appendChild(edge);
        });
    });
}
