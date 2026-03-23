/**
 * CryptoAyuda AI Guardian - Main Script
 * Handles SPA Routing, Chatbot functionality, and Analysis Simulations
 */

let chatIsOpen = false; // Added global variable

// Global Auth UI Updater (Moved outside DOMContentLoaded as per instruction's implied structure)
function updateAuthUI() {
    const authBtn = document.getElementById('nav-auth-btn');
    const adminLink = document.getElementById('nav-admin-link');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
        authBtn.textContent = 'Logout';
        authBtn.onclick = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('plan');
            localStorage.removeItem('email');
            localStorage.removeItem('role');
            updateAuthUI();
            navigateTo('home');
        };
        authBtn.removeAttribute('data-route');
        // Show Admin link for admins
        if (adminLink) {
            adminLink.style.display = role === 'admin' ? 'inline-flex' : 'none';
        }
    } else {
        authBtn.textContent = 'Login';
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

    chatbotSend.addEventListener('click', () => {
        if (chatbotInput.value.trim() !== '') {
            sendChatMessage(chatbotInput.value);
            chatbotInput.value = '';
        }
    });

    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatbotInput.value.trim() !== '') {
            sendChatMessage(chatbotInput.value);
            chatbotInput.value = '';
        }
    });

    function sendChatMessage(text) {
        // Render User Message
        const tempUser = document.createElement('div');
        tempUser.innerHTML = `<div class="message user-message"><p>${text}</p></div>`;
        chatbotMessages.appendChild(tempUser.firstElementChild);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Simulate AI Thinking
        setTimeout(() => {
            const tempAi = document.createElement('div');
            tempAi.innerHTML = `<div class="message ai-message"><p class="loading-dots">Thinking<span>.</span><span>.</span><span>.</span></p></div>`;
            const thinkingNode = tempAi.firstElementChild;
            chatbotMessages.appendChild(thinkingNode);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            // Generate AI Response
            setTimeout(() => {
                thinkingNode.remove();
                
                const lower = text.toLowerCase();
                let reply = "I've analyzed your request against my current web3 threat database. Can you provide a specific address or URL for a deep audit?";
                
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
                }

                const finalAi = document.createElement('div');
                finalAi.innerHTML = `<div class="message ai-message"><p>${reply}</p></div>`;
                chatbotMessages.appendChild(finalAi.firstElementChild);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 1500);
        }, 500);
    }

    // Live Threat Feed Simulation (Functional View)
    function updateThreatFeed() {
        const feed = document.getElementById('threat-feed');
        if (!feed) return;
        
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

                // If logged in, show PayPal buttons for this plan
                const plan = btn.getAttribute('data-plan');
                const containerId = `paypal-button-container-${plan}`;
                const containerEl = document.getElementById(containerId);
                
                if (containerEl && window.paypal) {
                    btn.style.display = 'none'; // Hide the "Upgrade" button
                    containerEl.style.display = 'block';
                    
                    // Render PayPal buttons only when clicked
                    paypal.Buttons({
                        style: {
                            layout: 'vertical',
                            color:  'gold',
                            shape:  'pill',
                            label:  'checkout'
                        },
                        createOrder: function(data, actions) {
                            return fetch('/api/orders', {
                                method: 'post',
                                headers: { 
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ planType: plan })
                            }).then(res => res.json()).then(orderData => orderData.id);
                        },
                        onApprove: function(data, actions) {
                            return fetch('/api/orders/capture', {
                                method: 'post',
                                headers: { 
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: JSON.stringify({ orderID: data.orderID, planType: plan })
                            }).then(res => res.json())
                            .then(orderData => {
                                let msg = "Successful! Plan upgraded to " + plan.toUpperCase();
                                if (orderData.error) msg = "Payment failed: " + orderData.error;
                                else {
                                    localStorage.setItem('plan', orderData.plan);
                                }
                                alert(msg);
                                navigateTo('tools');
                            });
                        },
                        onError: function(err) {
                            console.error('PayPal Error:', err);
                            alert("There was an error with PayPal. Please try again or use another card.");
                        }
                    }).render(`#${containerId}`);
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
            container.innerHTML = `
                <div class="scan-error-card" style="border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.05);padding:20px;border-radius:15px;text-align:center;">
                    <i class="fa-solid fa-circle-exclamation" style="color:#ef4444;font-size:1.5rem;margin-bottom:10px;"></i>
                    <h4 style="color:#fff;">Limit Reached</h4>
                    <p style="font-size:0.85rem;color:var(--secondary-color);margin-bottom:15px;">You've used your 3 daily scans. Upgrade to Pro for unlimited AI intelligence.</p>
                    <button class="btn btn-primary btn-small" onclick="navigateTo('pricing')">View Plans</button>
                </div>
            `;
            return;
        }
        
        if (!res.ok) throw new Error(data.error || "Analysis failed");
        
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
    if (!token) {
         container.innerHTML = `<p class="text-medium"><i class="fa-solid fa-lock"></i> Please log in or register to use the advanced AI Scanners.</p>
         <button class="btn btn-outline mt-3" onclick="navigateTo('auth')">Go to Login</button>`;
         container.style.display = 'block';
         return;
    }

    container.innerHTML = `<div class="mini-loader"><div class="spinner"></div><p>AI Processing live blockchain data...</p></div>`;
    container.style.display = 'block';
    
    const headers = { 'Authorization': `Bearer ${token}` };

    try {
        let endpoint = '';
        if(type === 'wallet') endpoint = `/api/analyze/wallet?address=${inputValue}`;
        else if(type === 'rug') endpoint = `/api/analyze/token?address=${inputValue}`;
        else if(type === 'phishing') endpoint = `/api/analyze/phishing?url=${inputValue}`;

        const res = await fetch(endpoint, { headers });
        const data = await res.json();
            
        if(res.status === 403 && data.limitReached) {
            container.innerHTML = `
                <div class="scan-error-card" style="border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.05);padding:20px;border-radius:15px;text-align:center;">
                    <i class="fa-solid fa-circle-exclamation" style="color:#ef4444;font-size:1.5rem;margin-bottom:10px;"></i>
                    <h4 style="color:#fff;">Limit Reached</h4>
                    <p style="font-size:0.85rem;color:var(--secondary-color);margin-bottom:15px;">You've used your 3 daily scans. Upgrade to Pro for unlimited AI intelligence.</p>
                    <button class="btn btn-primary btn-small" onclick="navigateTo('pricing')">View Plans</button>
                </div>
            `;
            return;
        }

        if(!res.ok) throw new Error(data.error || "Analysis failed");

        if(type === 'wallet') {
            let tagsHtml = data.tags.map(t => `<span class="badge ${t.includes('Spam') ? 'badge-high' : 'badge-low'}">${t}</span>`).join(' ');
            container.innerHTML = `
                <div class="tool-report fade-in">
                    <div class="report-header flex-between mb-3 border-bottom pb-2">
                        <span><strong>Wallet Analyzed</strong></span>
                        <span class="text-muted" title="${inputValue}">${inputValue.substring(0,6)}...${inputValue.slice(-4)}</span>
                    </div>
                    <div class="report-grid mb-3">
                        <div class="grid-item">
                            <small class="text-muted">Global Risk Score</small>
                            <h4 class="text-${data.riskLevel.toLowerCase()}">${data.riskScore}/100</h4>
                        </div>
                        <div class="grid-item">
                            <small class="text-muted">Entity Tags</small>
                            <div>${tagsHtml || '-'}</div>
                        </div>
                    </div>
                    <div class="report-row mb-2"><strong class="text-medium">Detection History:</strong></div>
                    <ul class="issue-list text-sm mb-3">
                        ${data.riskFlags.map(f => `<li><i class="fa-solid fa-flag text-${f.includes('CRITICAL') || f.includes('HIGH') ? 'high' : (f.includes('MEDIUM') ? 'medium' : 'low')}"></i> ${f}</li>`).join('')}
                    </ul>
                    <p class="summary-text ${data.riskScore > 50 ? 'warning' : ''}">${data.summary}</p>
                </div>
            `;
        } else if(type === 'rug') {
            if(!data.found) throw new Error(data.message);
            container.innerHTML = `
                <div class="tool-report fade-in">
                    <div class="report-header flex-between mb-3 border-bottom pb-2">
                        <span><strong>Token Analyzed:</strong> ${data.raw.name} (${data.raw.symbol})</span>
                        <span class="text-muted" title="${inputValue}">${inputValue.substring(0,6)}...${inputValue.slice(-4)}</span>
                    </div>
                    <div class="report-grid mb-3" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                         <div class="grid-item"><small class="text-muted">Rug Pull Risk</small><h4 class="text-${data.riskLevel.toLowerCase()}">${data.riskScore}/100</h4></div>
                         <div class="grid-item"><small class="text-muted">Taxes (Buy/Sell)</small><h4>${data.raw.buyTax} / ${data.raw.sellTax}</h4></div>
                         <div class="grid-item"><small class="text-muted">Holders</small><h4>${data.raw.holders}</h4></div>
                         <div class="grid-item"><small class="text-muted">Traded On</small><h4>${data.raw.dex}</h4></div>
                    </div>
                    ${data.riskFlags.length > 0 && data.riskScore > 0 ? `
                    <div class="report-row mb-2"><strong class="text-high">Security Warnings:</strong></div>
                    <ul class="issue-list text-sm mb-3">
                        ${data.riskFlags.map(f => `<li><i class="fa-solid fa-triangle-exclamation text-${f.includes('CRITICAL') || f.includes('HIGH') ? 'high' : 'medium'}"></i> ${f}</li>`).join('')}
                    </ul>` : ''}
                    <p class="summary-text ${data.riskScore > 50 ? 'warning' : ''}">AI Summary: Risk is evaluated at <b>${data.riskLevel}</b> based on contract logic heuristics.</p>
                </div>
            `;
        } else if(type === 'phishing') {
            container.innerHTML = `
                <div class="tool-report fade-in">
                    <div class="report-header flex-between mb-3 border-bottom pb-2">
                        <span><strong>Domain Checked</strong></span>
                        <span class="text-muted" title="${data.cleanUrl}">${data.cleanUrl.substring(0,30)}</span>
                    </div>
                    <div class="report-grid mb-3">
                        <div class="grid-item"><small class="text-muted">Phishing Probability</small><h4 class="text-${data.riskLevel.toLowerCase()}">${data.riskScore}%</h4></div>
                        <div class="grid-item"><small class="text-muted">Status</small><h4 class="text-${data.isMalicious ? 'high' : 'low'}">${data.isMalicious ? 'Flagged Malicious' : 'Clean'}</h4></div>
                    </div>
                    <div class="report-row mb-2"><strong class="text-medium">Details:</strong></div>
                    <ul class="issue-list text-sm mb-3">
                        ${data.riskFlags.map(f => `<li><i class="fa-solid ${data.isMalicious ? 'fa-skull-crossbones text-high' : 'fa-info-circle text-muted'}"></i> ${f}</li>`).join('')}
                    </ul>
                    <p class="summary-text ${data.riskScore > 50 ? 'warning' : ''}">${data.summary}</p>
                </div>
            `;
            // Real on-chain data fetching
            try {
                const chain = document.getElementById('chain-select')?.value || 'eth';
                let endpoint = "";
                if(type === 'audit') endpoint = `/api/godmode/audit?address=${inputValue}&chain=${chain}`;
                else if(type === 'honeypot-pro') endpoint = `/api/godmode/honeypot?address=${inputValue}&chain=${chain}`;
                else if(type === 'whale') endpoint = `/api/godmode/whale?address=${inputValue}&chain=${chain}`;
                else if(type === 'mev') endpoint = `/api/godmode/mev?address=${inputValue}&chain=${chain}`;
                else if(type === 'history') endpoint = `/api/godmode/history?address=${inputValue}&chain=${chain}`;

                const res = await fetch(endpoint, { headers: { 'Authorization': `Bearer ${token}` } });
                const data = await res.json();
                if(!res.ok) throw new Error(data.error || "Analysis failed");

                if(type === 'audit') {
                    container.innerHTML = `
                        <div class="tool-report fade-in" style="border-left: 4px solid var(--accent-vibrant); background: rgba(0,20,30,0.6);">
                            <div class="report-header flex-between mb-3 border-bottom pb-2">
                                <span><strong>Real-Time Bytecode Audit [${chain.toUpperCase()}]</strong></span>
                                <span class="badge ${data.riskScore > 0 ? 'badge-high' : 'badge-low'}">${data.riskScore > 0 ? 'Threats Found' : 'Verified Secure'}</span>
                            </div>
                            <div class="report-grid mb-3" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                                 <div class="grid-item"><small class="text-muted">Bytecode Size</small><h4>${data.bytecodeSize} bytes</h4></div>
                                 <div class="grid-item"><small class="text-muted">Security Score</small><h4 class="text-${data.riskScore > 30 ? 'high' : 'low'}">${100 - data.riskScore}/100</h4></div>
                            </div>
                            <ul class="issue-list text-sm">
                                ${data.issues.map(i => `<li><i class="fa-solid ${i.includes('Secure') ? 'fa-check text-low' : 'fa-triangle-exclamation text-high'}"></i> ${i}</li>`).join('')}
                            </ul>
                            <button class="btn btn-premium btn-sm mt-3 w-100" onclick="downloadReport('${type}', '${inputValue}')">Generate Institutional Report</button>
                        </div>
                    `;
                } else if(type === 'honeypot-pro') {
                    container.innerHTML = `
                        <div class="tool-report fade-in" style="border-left: 4px solid ${data.isHoneypot ? 'var(--risk-high)' : 'var(--risk-low)'}; background: rgba(0,0,0,0.4);">
                            <div class="report-header flex-between mb-3">
                                <span><strong>Honeypot Simulation [${chain.toUpperCase()}]</strong></span>
                                <span class="badge ${data.isHoneypot ? 'badge-high' : 'badge-low'}">${data.isHoneypot ? 'HONEYPOT' : 'Safe to Buy'}</span>
                            </div>
                            <div class="report-grid mb-3" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                                 <div class="grid-item"><small class="text-muted">Buy Tax</small><h4>${data.buyTax || '0.0%'}</h4></div>
                                 <div class="grid-item"><small class="text-muted">Sell Tax</small><h4>${data.sellTax || '0.0%'}</h4></div>
                            </div>
                            <div class="chart-container mb-3" style="height:200px; border-radius:10px; overflow:hidden; border:1px solid var(--border-color);">
                                <iframe 
                                    src="https://dexscreener.com/${chain}/${inputValue}?embed=1&theme=dark&trades=0&info=0" 
                                    style="width:100%; height:100%; border:none;">
                                </iframe>
                            </div>
                            <button class="btn btn-premium btn-sm w-100" onclick="downloadReport('${type}', '${inputValue}')">Institutional PDF Receipt</button>
                        </div>
                    `;
                } else if(type === 'mev') {
                    container.innerHTML = `
                        <div class="tool-report fade-in" style="border-left: 4px solid #f59e0b; background: rgba(245,158,11,0.05);">
                            <div class="report-header flex-between mb-3 border-bottom pb-2">
                                <span><strong>MEV & Front-Run Guard</strong></span>
                                <span class="badge" style="background:#f59e0b; color:black;">${data.status}</span>
                            </div>
                            <p class="summary-text mb-3">${data.status === 'BOTS ACTIVE' ? 'WARNING: High bot concentration detected in current blocks.' : 'Safe: No bot manipulation detected.'}</p>
                            <div class="report-grid">
                                 <div class="grid-item"><small class="text-muted">MEV Intensity</small><h4>${data.mevActivity}/30</h4></div>
                            </div>
                        </div>
                    `;
                } else if(type === 'history') {
                    container.innerHTML = `
                        <div class="tool-report fade-in" style="border-left: 4px solid #6366f1; background: rgba(99,102,241,0.05);">
                            <div class="report-header flex-between mb-3 border-bottom pb-2">
                                <span><strong>Deployer Trust Analyzer</strong></span>
                                <span class="badge" style="background:#6366f1; color:white;">Trust: ${data.trustScore}%</span>
                            </div>
                            <p class="summary-text">${data.summary}</p>
                            <ul class="issue-list text-sm mt-3">
                                <li><i class="fa-solid fa-check text-low"></i> Funding: ${data.fundingSource}</li>
                                <li><i class="fa-solid fa-shield-halved text-low"></i> Linked Rugs: ${data.linkedRugs}</li>
                            </ul>
                        </div>
                    `;
                } else if(type === 'whale') {
                     container.innerHTML = `
                        <div class="tool-report fade-in" style="border-left: 4px solid #6366f1; background:rgba(99,102,241,0.05);">
                            <div class="report-header flex-between mb-3 border-bottom pb-2">
                                <span><strong>Real-Time Whale Sentiment</strong></span>
                                <span class="badge" style="background:rgba(99,102,241,0.2);color:#6366f1;">${data.sentiment}</span>
                            </div>
                            <p class="summary-text">Analyzed logs on ${chain.toUpperCase()}. Recent volume detected: ${data.recentTransfers} interactions.</p>
                        </div>
                    `;
                }
            } catch(e) {
                container.innerHTML = `<p class="text-high">Institutional Error: ${e.message}</p>`;
            }
        }
    } catch(err) {
        container.innerHTML = `<p class="text-high">Error fetching AI API: ${err.message}</p>`;
    }
}

function initParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        
        // Random properties
        const size = Math.random() * 4 + 1; // 1px to 5px
        const xPos = Math.random() * 100; // 0% to 100vw
        const yPos = Math.random() * 100; // 0% to 100vh
        const opacity = Math.random() * 0.5 + 0.1;
        const duration = Math.random() * 20 + 10; // 10s to 30s
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${xPos}vw`;
        particle.style.top = `${yPos}vh`;
        particle.style.opacity = opacity;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}
