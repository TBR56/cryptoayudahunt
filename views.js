/**
 * Views for the SPA
 */

window.views = {
    home: () => `
        <section class="hero">
            <div class="container hero-container">
                <div class="hero-content">
                    <div class="badge">Enterprise-Grade Security</div>
                    <h1 class="mb-3">Protect your crypto assets with <span class="text-gradient">Artificial Intelligence</span>.</h1>
                    <p class="hero-sub">Analyze wallets, tokens and crypto websites instantly using artificial intelligence. Secure your digital assets before you transact.</p>
                    
                    <div class="hero-interactive">
                        <div class="input-group">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <input type="text" id="hero-input" placeholder="Paste wallet address, token contract or website link...">
                        </div>
                        <div class="hero-buttons">
                            <button class="btn btn-primary analyze-btn">Analyze Wallet</button>
                            <button class="btn btn-accent analyze-btn">Analyze Token</button>
                            <button class="btn btn-outline analyze-btn">Check Website</button>
                        </div>
                        <div id="analysis-result-area" class="analysis-result-area" style="display: none;"></div>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="cyber-shield">
                        <i class="fa-solid fa-shield-halved"></i>
                        <div class="pulse-ring"></div>
                        <div class="pulse-ring delay-1"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="how-it-works">
            <div class="container">
                <div class="section-header center">
                    <h2>How It Works</h2>
                    <p>Enterprise-grade security in three simple steps.</p>
                </div>
                <div class="steps-grid">
                    <div class="step-card">
                        <div class="step-icon"><i class="fa-solid fa-paste"></i></div>
                        <h3>Step 1</h3>
                        <p>Paste wallet address, token contract or crypto website into our AI engine.</p>
                    </div>
                    <div class="step-card">
                        <div class="step-icon"><i class="fa-solid fa-microchip"></i></div>
                        <h3>Step 2</h3>
                        <p>CryptoAyuda AI analyzes blockchain signals, contract data and security indicators instantly.</p>
                    </div>
                    <div class="step-card">
                        <div class="step-icon"><i class="fa-solid fa-bell"></i></div>
                        <h3>Step 3</h3>
                        <p>Receive an instant AI risk score and real-time security alerts before you invest.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="testimonials">
            <div class="container">
                <div class="section-header">
                    <h2>Trusted by Investors</h2>
                </div>
                <div class="testimonial-grid">
                    <div class="testimonial-card">
                        <p class="t-text">"CryptoAyuda AI helped me avoid investing in a scam token. The rug pull predictor is scary accurate. Saved me 3 ETH!"</p>
                        <div class="t-user">
                            <div class="t-avatar"><img src="https://i.pravatar.cc/100?img=3" alt="User"></div>
                            <div class="t-info">
                                <h4>Alex M.</h4>
                                <span>DeFi Trader</span>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <p class="t-text">"The phishing detector found a malicious exchange clone before I deposited my assets. Indispensable tool for web3."</p>
                        <div class="t-user">
                            <div class="t-avatar"><img src="https://i.pravatar.cc/100?img=5" alt="User"></div>
                            <div class="t-info">
                                <h4>Sarah J.</h4>
                                <span>NFT Collector</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="cta-section">
            <div class="container cta-container center">
                <h2>Stay protected in the crypto world with AI.</h2>
                <p>Don't wait until you lose your assets. Join thousands of secure users today.</p>
                <div class="cta-buttons">
                    <button class="btn btn-primary" data-route="home" onclick="window.scrollTo(0,0)">Start your AI security scan</button>
                    <button class="btn btn-outline" data-route="pricing">View Pricing</button>
                </div>
            </div>
        </section>
    `,

    tools: () => `
        <section class="page-header">
            <div class="container center">
                <h1>AI Guardian Tools</h1>
                <p>Our suite of artificial intelligence models trained to detect all forms of web3 fraud.</p>
            </div>
        </section>
        
        <section class="tools-section">
            <div class="container">
                <div class="tools-grid">
                    <!-- Tool 1 -->
                    <div class="tool-card">
                        <i class="fa-solid fa-wallet tool-icon"></i>
                        <h3>AI Wallet Guardian</h3>
                        <p>Paste a wallet address to scan for exposure to mixers, phishing, and sanction lists.</p>
                        <div class="tool-input-group mt-3">
                            <input type="text" class="custom-input tool-specific-input" placeholder="0x..." id="wallet-input" />
                            <button class="btn btn-outline tool-demo-btn" data-tool="wallet" data-input="#wallet-input">Analyze</button>
                        </div>
                        <div class="tool-result mt-4" style="display:none;"></div>
                    </div>

                    <!-- Tool 2 -->
                    <div class="tool-card">
                        <i class="fa-solid fa-parachute-box tool-icon"></i>
                        <h3>Rug Pull Predictor</h3>
                        <p>Paste a smart contract address. AI detects honeypots, hidden taxes, and mint functions.</p>
                        <div class="tool-input-group mt-3">
                            <input type="text" class="custom-input tool-specific-input" placeholder="0x..." id="token-input" />
                            <button class="btn btn-outline tool-demo-btn" data-tool="rug" data-input="#token-input">Analyze</button>
                        </div>
                        <div class="tool-result mt-4" style="display:none;"></div>
                    </div>

                    <!-- Tool 3 -->
                    <div class="tool-card">
                        <i class="fa-solid fa-spider tool-icon"></i>
                        <h3>Phishing Detector</h3>
                        <p>Check any URL or dApp link against our global registry of malicious domains.</p>
                        <div class="tool-input-group mt-3">
                            <input type="text" class="custom-input tool-specific-input" placeholder="https://..." id="url-input" />
                            <button class="btn btn-primary tool-demo-btn mt-3 w-100" data-tool="phishing" data-input="#url-input">Check URL</button>
                        </div>
                        <div class="tool-result mt-4" style="display:none;"></div>
                    </div>
                </div>
            </div>
        </section>
    `,

    blog: () => `
        <section class="page-header">
            <div class="container center">
                <h1>Cybersecurity Blog</h1>
                <p>Stay updated with the latest AI research and crypto threat intelligence.</p>
            </div>
        </section>
        
        <section class="blog-section">
            <div class="container blog-grid">
                <article class="blog-card">
                    <div class="blog-img placeholder-img"><span>Security</span></div>
                    <div class="blog-content">
                        <h3>How to detect crypto scams</h3>
                        <p>Learn the fundamental signals of a scam project and how our AI automates this detection process.</p>
                        <a href="#" class="read-more">Read More <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </article>

                <article class="blog-card">
                    <div class="blog-img placeholder-img"><span>Threat Intel</span></div>
                    <div class="blog-content">
                        <h3>Top crypto scams in 2026</h3>
                        <p>A comprehensive report on the evolution of web3 scams and the new sophisticated tactics used by hackers.</p>
                        <a href="#" class="read-more">Read More <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </article>

                <article class="blog-card">
                    <div class="blog-img placeholder-img"><span>DeFi</span></div>
                    <div class="blog-content">
                        <h3>How rug pulls work</h3>
                        <p>Deep dive into smart contract mechanics and how liquidity pools can be manipulated to steal funds.</p>
                        <a href="#" class="read-more">Read More <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </article>

                <article class="blog-card">
                    <div class="blog-img placeholder-img"><span>AI Tech</span></div>
                    <div class="blog-content">
                        <h3>How AI can detect crypto fraud</h3>
                        <p>Exploring the machine learning models behind CryptoAyuda and why heuristics beat manual auditing.</p>
                        <a href="#" class="read-more">Read More <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </article>

                <article class="blog-card">
                    <div class="blog-img placeholder-img"><span>Guide</span></div>
                    <div class="blog-content">
                        <h3>How to protect your crypto wallet</h3>
                        <p>The ultimate guide to operational security, hardware wallets, and safe interaction with dApps.</p>
                        <a href="#" class="read-more">Read More <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </article>
            </div>
        </section>
    `,

    pricing: () => `
        <section class="page-header">
            <div class="container center">
                <h1>Simple, Transparent Pricing</h1>
                <p>Enterprise-grade security accessible to everyone.</p>
            </div>
        </section>
        
        <section class="pricing-section">
            <div class="container pricing-grid">
                
                <div class="pricing-card">
                    <div class="plan-name">Free Plan</div>
                    <div class="plan-price">$0<span>/mo</span></div>
                    <p class="plan-desc">For casual crypto users protecting a single wallet.</p>
                    <ul class="plan-features">
                        <li><i class="fa-solid fa-check"></i> 3 AI scans per day</li>
                        <li><i class="fa-solid fa-check"></i> Basic risk score</li>
                        <li><i class="fa-solid fa-check"></i> Access to security blog</li>
                        <li class="disabled"><i class="fa-solid fa-xmark"></i> Real-time scam alerts</li>
                        <li class="disabled"><i class="fa-solid fa-xmark"></i> AI Crypto Assistant access</li>
                    </ul>
                    <button class="btn btn-outline full-width">Sign Up Free</button>
                </div>

                <div class="pricing-card pro">
                    <div class="badge plan-badge">Most Popular</div>
                    <div class="plan-name">Pro Plan</div>
                    <div class="plan-price">$29<span>/mo</span></div>
                    <p class="plan-desc">For active traders and investors who need constant vigilance.</p>
                    <ul class="plan-features">
                        <li><i class="fa-solid fa-check"></i> <strong>Unlimited</strong> AI scans</li>
                        <li><i class="fa-solid fa-check"></i> Advanced security analysis</li>
                        <li><i class="fa-solid fa-check"></i> Real-time scam alerts (SMS/Email)</li>
                        <li><i class="fa-solid fa-check"></i> AI Crypto Assistant access</li>
                        <li><i class="fa-solid fa-check"></i> API Access (1K requests)</li>
                    </ul>
                    <div id="paypal-button-container-pro" class="mt-4"></div>
                    <button class="btn btn-primary full-width" id="fake-pro-btn" style="display:none;">Upgrade to Pro</button>
                </div>
                
                <div class="pricing-card" style="border-color: var(--accent-glow);">
                    <div class="plan-name">Elite Plan</div>
                    <div class="plan-price">$49<span>/mo</span></div>
                    <p class="plan-desc">For institutional funds, DAOs, and crypto whales.</p>
                    <ul class="plan-features">
                        <li><i class="fa-solid fa-check"></i> <strong>Everything in Pro</strong></li>
                        <li><i class="fa-solid fa-check"></i> Custom API Integrations</li>
                        <li><i class="fa-solid fa-check"></i> 24/7 Priority Support</li>
                        <li><i class="fa-solid fa-check"></i> Dedicated Account Manager</li>
                    </ul>
                    <div id="paypal-button-container-elite" class="mt-4"></div>
                </div>

            </div>
        </section>
    `,

    about: () => `
        <section class="page-header">
            <div class="container center">
                <h1>About CryptoAyuda AI</h1>
                <p>Our mission is to make web3 safe for everyone.</p>
            </div>
        </section>

        <section class="about-content">
            <div class="container about-grid">
                <div class="about-text">
                    <h2>Our Mission</h2>
                    <p>CryptoAyuda AI Guardian was created to help people stay safe in the rapidly evolving crypto ecosystem. By using cutting-edge artificial intelligence, we democratize security, allowing anyone to automatically detect scams, risky tokens, and phishing attacks before they happen.</p>
                    
                    <h2 style="margin-top: 40px;">Why Security Matters</h2>
                    <p>In web3, you are your own bank. While decentralization provides immense freedom, it also removes the safety nets of traditional finance. Hacks, rug pulls, and phishing drained billions from users last year alone. We believe that AI is the only scalable solution capable of reading complex contracts and monitoring millions of transactions in real-time to protect end users.</p>
                </div>
                <div class="about-image">
                    <div class="cyber-shield large">
                        <i class="fa-solid fa-brain"></i>
                    </div>
                </div>
            </div>
        </section>
    `,

    resources: () => `
        <section class="page-header">
            <div class="container center">
                <h1>Security Resources</h1>
                <p>Free educational content to help you understand crypto safety.</p>
            </div>
        </section>

        <section class="resources-section">
            <div class="container">
                <div class="resource-list">
                    
                    <div class="resource-item">
                        <div class="resource-icon"><i class="fa-solid fa-book-open"></i></div>
                        <div class="resource-text">
                            <h3>Beginner Guide to Crypto Security</h3>
                            <p>Start here if you are new to crypto. Learn the fundamentals of self-custody, seed phrases, and basic opsec.</p>
                        </div>
                        <button class="btn btn-outline">Read Guide</button>
                    </div>

                    <div class="resource-item">
                        <div class="resource-icon"><i class="fa-solid fa-fish-fins"></i></div>
                        <div class="resource-text">
                            <h3>How to Detect Phishing Websites</h3>
                            <p>Hackers clone popular exchanges and dApps perfectly. Learn how to spot the subtle differences in URLs and SSL certs.</p>
                        </div>
                        <button class="btn btn-outline">Read Guide</button>
                    </div>

                    <div class="resource-item">
                        <div class="resource-icon"><i class="fa-solid fa-person-running"></i></div>
                        <div class="resource-text">
                            <h3>How to Avoid Rug Pulls</h3>
                            <p>Understand the mechanics of liquidity pools, contract ownership, and how to verify if a team can steal funds.</p>
                        </div>
                        <button class="btn btn-outline">Read Guide</button>
                    </div>

                    <div class="resource-item">
                        <div class="resource-icon"><i class="fa-solid fa-key"></i></div>
                        <div class="resource-text">
                            <h3>How to Secure Your Wallet</h3>
                            <p>Hardware wallets vs hot wallets, multi-sig setups, and why you should revoke token approvals regularly.</p>
                        </div>
                        <button class="btn btn-outline">Read Guide</button>
                    </div>

                    <div class="resource-item">
                        <div class="resource-icon"><i class="fa-solid fa-list-check"></i></div>
                        <div class="resource-text">
                            <h3>Crypto Security Checklist</h3>
                            <p>A printable PDF checklist to keep by your desk. Run through these steps before generating any transaction.</p>
                        </div>
                        <button class="btn btn-outline">Download PDF</button>
                    </div>

                </div>
            </div>
        </section>
    `,
    
    auth: () => `
        <section class="auth-section d-flex align-center justify-center" style="min-height: 80vh; padding-top: 100px;">
            <div class="auth-box card-blur p-4 fade-in center" style="max-width: 420px; width: 100%; border-top: 2px solid var(--accent-glow); margin: 0 auto;">
                <div class="auth-tabs d-flex justify-between mb-4" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
                    <button class="btn btn-ghost active w-50" id="tab-login">Login</button>
                    <button class="btn btn-ghost w-50" id="tab-register">Register</button>
                </div>
                
                <div id="login-form">
                    <h3 class="mb-4">Welcome Back</h3>
                    <div style="text-align: left;">
                        <input type="email" id="login-email" class="custom-input w-100 mb-3" placeholder="Email Address">
                        <input type="password" id="login-pass" class="custom-input w-100 mb-4" placeholder="Password">
                    </div>
                    <button class="btn btn-accent w-100" id="btn-login" style="padding: 14px;">Login to Dashboard</button>
                    <p class="text-medium mt-3 text-center" id="login-error" style="display:none;"></p>
                </div>

                <div id="register-form" style="display:none;">
                    <h3 class="mb-4">Create Account</h3>
                    <div style="text-align: left;">
                        <input type="email" id="reg-email" class="custom-input w-100 mb-3" placeholder="Email Address">
                        <input type="password" id="reg-pass" class="custom-input w-100 mb-4" placeholder="Password">
                    </div>
                    <button class="btn btn-primary w-100" id="btn-register" style="padding: 14px;">Sign Up for Free</button>
                    <p class="text-medium mt-3 text-center" id="reg-error" style="display:none;"></p>
                    <p class="text-low mt-3 text-center" id="reg-success" style="display:none;"></p>
                </div>
            </div>
        </section>
    `
};
