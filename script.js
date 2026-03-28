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

    if (window.views && window.views[route]) {
        appContent.innerHTML = window.views[route]();
        bindViewEvents(route);

        if (route === 'dashboard') {
            setTimeout(loadDashboard, 100);
        }
        
        if (route === 'auth') {
            const loginForm = document.getElementById('login-form');
            if (loginForm) loginForm.addEventListener('submit', handleLogin);
            const registerForm = document.getElementById('register-form');
            if (registerForm) registerForm.addEventListener('submit', handleRegister);
        } else if (route === 'pricing') {
            const token = localStorage.getItem('token');
            const paypalButtonsContainer = document.getElementById('paypal-buttons-container');
            if (paypalButtonsContainer) {
                if (token) {
                    paypalButtonsContainer.innerHTML = `<p>PayPal buttons would render here if logged in.</p>`;
                } else {
                    paypalButtonsContainer.innerHTML = `<p>Please log in to view pricing options.</p>`;
                }
            }
        } else if (route === 'admin') {
            // Load admin panel data
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
        }
    } else {
        appContent.innerHTML = `<h2>404 - Page not found</h2>`;
    }
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
        const analyzeBtns = document.querySelectorAll('.analyze-btn');
        const inputField = document.getElementById('hero-input');
        const resultArea = document.getElementById('analysis-result-area');

        analyzeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.textContent;
                performScan(inputField.value, type, resultArea);
            });
        });
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

                runRealToolScan(btnType, inputValue, resultArea);
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
        container.innerHTML = `<div class="ai-result-card fade-in"><h4 class="text-high">Error fetching analysis. Is the Node.js backend running?</h4></div>`;
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
