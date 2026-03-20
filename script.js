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
    document.querySelector('.nav-links').classList.remove('active'); // Added to close mobile menu

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
                let reply = "I analyzed standard patterns, and this looks generally secure, but exercise caution. Never share your seed phrase.";
                
                const lower = text.toLowerCase();
                if (lower.includes('token')) {
                    reply = "I've checked the token contract. Liquidity appears locked for 6 months, and the contract is perfectly verified. Risk score: 24/100 (Low Risk).";
                } else if (lower.includes('wallet')) {
                    reply = "This wallet has interacted with known phishing contracts in the past 30 days. Exercise EXTREME caution. Risk score: 89/100 (High Risk).";
                } else if (lower.includes('nft') || lower.includes('legit')) {
                    reply = "The NFT contract has a hidden mint function that could dilute your assets. The team is anonymous. Risk score: 76/100 (Medium/High Risk).";
                }

                const finalAi = document.createElement('div');
                finalAi.innerHTML = `<div class="message ai-message"><p>${reply}</p></div>`;
                chatbotMessages.appendChild(finalAi.firstElementChild);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 1500);
        }, 500);
    }
});

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
        const hasAccess = role === 'admin' || plan === 'pro' || plan === 'elite';

        if (!hasAccess) {
            // Show upgrade gate banner at top
            const toolsSection = document.querySelector('.tools-section');
            if (toolsSection) {
                const gate = document.createElement('div');
                gate.className = 'plan-gate fade-in';
                gate.innerHTML = `
                    <div class="plan-gate-inner">
                        <i class="fa-solid fa-lock" style="font-size:2rem;color:var(--accent-color);margin-bottom:12px;"></i>
                        <h3>Upgrade to Run Scans</h3>
                        <p>Your current plan is <strong>Free</strong>. Upgrade to <strong>Pro</strong> or <strong>Elite</strong> to use the live AI scanners.</p>
                        <button class="btn btn-primary" onclick="navigateTo('pricing')" style="margin-top:16px;">See Plans &amp; Upgrade</button>
                    </div>
                `;
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

                if (!hasAccess) {
                    resultArea.style.display = 'block';
                    resultArea.innerHTML = `
                        <div style="text-align:center;padding:20px;">
                            <i class="fa-solid fa-lock" style="font-size:1.5rem;color:var(--risk-medium);margin-bottom:10px;display:block;"></i>
                            <p style="color:var(--secondary-color);margin-bottom:12px;">This feature requires a <strong>Pro</strong> or <strong>Elite</strong> plan.</p>
                            <button class="btn btn-accent" onclick="navigateTo('pricing')">Upgrade Now</button>
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
                                let msg = "Payment successful! Your plan is upgraded.";
                                if (orderData.error) msg = "Payment failed: " + orderData.error;
                                else {
                                    localStorage.setItem('plan', orderData.plan);
                                }
                                alert(msg);
                                navigateTo('tools');
                            });
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

        const res = await fetch(endpoint);
        const data = await res.json();
        
        let riskScore = data.riskScore || 0;
        let riskLevelClass = data.riskLevel ? data.riskLevel.toLowerCase() : 'low';
        
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
        if(type === 'wallet') {
            const res = await fetch(`/api/analyze/wallet?address=${inputValue}`, { headers });
            const data = await res.json();
            
            if(res.status === 401 || res.status === 403) throw new Error("Session expired. Please log in again.");
            if(data.error) throw new Error(data.error);

            // Badges for tags
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
                    <div class="report-row mb-2">
                        <strong class="text-medium">Detection History:</strong>
                    </div>
                    <ul class="issue-list text-sm mb-3">
                        ${data.riskFlags.map(f => `<li><i class="fa-solid fa-flag text-${f.includes('CRITICAL') || f.includes('HIGH') ? 'high' : (f.includes('MEDIUM') ? 'medium' : 'low')}"></i> ${f}</li>`).join('')}
                    </ul>
                    <p class="summary-text ${data.riskScore > 50 ? 'warning' : ''}">${data.summary}</p>
                </div>
            `;
        } else if(type === 'rug') {
            const res = await fetch(`/api/analyze/token?address=${inputValue}`, { headers });
            const data = await res.json();
            
            if(res.status === 401 || res.status === 403) throw new Error("Session expired. Please log in again.");
            if(data.error) throw new Error(data.error);
            if(!data.found) throw new Error(data.message);

            container.innerHTML = `
                <div class="tool-report fade-in">
                    <div class="report-header flex-between mb-3 border-bottom pb-2">
                        <span><strong>Token Analyzed:</strong> ${data.raw.name} (${data.raw.symbol})</span>
                        <span class="text-muted" title="${inputValue}">${inputValue.substring(0,6)}...${inputValue.slice(-4)}</span>
                    </div>
                    
                    <div class="report-grid mb-3" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                         <div class="grid-item">
                            <small class="text-muted">Rug Pull Risk</small>
                            <h4 class="text-${data.riskLevel.toLowerCase()}">${data.riskScore}/100</h4>
                        </div>
                        <div class="grid-item">
                            <small class="text-muted">Taxes (Buy/Sell)</small>
                            <h4>${data.raw.buyTax} / ${data.raw.sellTax}</h4>
                        </div>
                        <div class="grid-item">
                            <small class="text-muted">Holders</small>
                            <h4>${data.raw.holders}</h4>
                        </div>
                         <div class="grid-item">
                            <small class="text-muted">Traded On</small>
                            <h4>${data.raw.dex}</h4>
                        </div>
                    </div>

                    ${data.riskFlags.length > 0 && data.riskScore > 0 ? `
                    <div class="report-row mb-2"><strong class="text-high">Security Warnings:</strong></div>
                    <ul class="issue-list text-sm mb-3">
                        ${data.riskFlags.map(f => `<li><i class="fa-solid fa-triangle-exclamation text-${f.includes('CRITICAL') || f.includes('HIGH') ? 'high' : 'medium'}"></i> ${f}</li>`).join('')}
                    </ul>` : ''}

                    ${data.positiveSignals.length > 0 ? `
                    <div class="report-row mb-2"><strong class="text-low">Positive Indicators:</strong></div>
                    <ul class="issue-list text-sm mb-3">
                        ${data.positiveSignals.map(f => `<li><i class="fa-solid fa-check text-low"></i> ${f}</li>`).join('')}
                    </ul>` : ''}

                    <p class="summary-text ${data.riskScore > 50 ? 'warning' : ''}">AI Summary: Risk is evaluated at <b>${data.riskLevel}</b> based on contract logic heuristics.</p>
                </div>
            `;
        } else if(type === 'phishing') {
            const res = await fetch(`/api/analyze/phishing?url=${inputValue}`, { headers });
            const data = await res.json();
            
            if(res.status === 401 || res.status === 403) throw new Error("Session expired. Please log in again.");
            if(data.error) throw new Error(data.error);

            container.innerHTML = `
                <div class="tool-report fade-in">
                    <div class="report-header flex-between mb-3 border-bottom pb-2">
                        <span><strong>Domain Checked</strong></span>
                        <span class="text-muted" title="${data.cleanUrl}">${data.cleanUrl.substring(0,30)}</span>
                    </div>
                    <div class="report-grid mb-3">
                        <div class="grid-item">
                            <small class="text-muted">Phishing Probability</small>
                            <h4 class="text-${data.riskLevel.toLowerCase()}">${data.riskScore}%</h4>
                        </div>
                        <div class="grid-item">
                            <small class="text-muted">Status</small>
                            <h4 class="text-${data.isMalicious ? 'high' : 'low'}">${data.isMalicious ? 'Flagged Malicious' : 'Clean'}</h4>
                        </div>
                    </div>
                    <div class="report-row mb-2">
                        <strong class="text-medium">Details:</strong>
                    </div>
                    <ul class="issue-list text-sm mb-3">
                        ${data.riskFlags.map(f => `<li><i class="fa-solid ${data.isMalicious ? 'fa-skull-crossbones text-high' : 'fa-info-circle text-muted'}"></i> ${f}</li>`).join('')}
                    </ul>
                    <p class="summary-text ${data.riskScore > 50 ? 'warning' : ''}">${data.summary}</p>
                </div>
            `;
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
