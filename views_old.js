/**
 * Views for the SPA
 */

window.views = {
    home: () => `
        <section class="hero">
            <div class="hero-glow"></div>
            <div class="container hero-container">
                <div class="hero-content fade-in">
                    <div class="badge"><i class="fa-solid fa-sparkles"></i> Artificial Intelligence Guardian</div>
                    <h1>Enterprise-Grade Security <br>for your <span class="highlight">Crypto Assets.</span></h1>
                    <p class="hero-sub">Before you invest, let our AI analyze smart contracts, wallets, and dApps in 3 seconds to detect hidden threats, honeypots, and phishing scams.</p>
                    
                    <div class="hero-interactive">
                        <div class="input-group">
                            <i class="fa-solid fa-bolt" style="color: var(--accent-vibrant);"></i>
                            <input type="text" id="hero-input" placeholder="Paste wallet address, token contract or website link...">
                        </div>
                        <div class="hero-buttons">
                            <button class="btn btn-primary analyze-btn">Analyze Wallet</button>
                            <button class="btn btn-accent analyze-btn">Analyze Token</button>
                            <button class="btn btn-outline analyze-btn">Check Website</button>
                        </div>
                        <div id="analysis-result-area" class="analysis-result-area" style="display: none;"></div>
                        
                        <div class="trust-banner fade-in" style="animation-delay: 0.4s; margin-top: 30px; display: flex; align-items: center; gap: 15px;">
                            <div class="avatars" style="display:flex; margin-left: 10px;">
                                <img src="https://i.pravatar.cc/100?img=11" alt="User" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--bg-color); margin-left:-10px;">
                                <img src="https://i.pravatar.cc/100?img=12" alt="User" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--bg-color); margin-left:-10px;">
                                <img src="https://i.pravatar.cc/100?img=13" alt="User" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--bg-color); margin-left:-10px;">
                                <img src="https://i.pravatar.cc/100?img=14" alt="User" style="width:32px; height:32px; border-radius:50%; border:2px solid var(--bg-color); margin-left:-10px;">
                            </div>
                            <div style="text-align:left; font-size:0.9rem;">
                                <div style="color:#f59e0b; font-size:12px;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                                <span style="color:var(--secondary-color);">Trusted by <b>50,000+</b> active Web3 investors</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero-visual fade-in" style="animation-delay: 0.2s;">
                    <div class="threat-map-container">
                        <div class="badge" style="margin-bottom:10px;"><i class="fa-solid fa-earth-americas"></i> Live Global Threat Map</div>
                        <div class="map-visual" id="live-threat-map">
                            <!-- Tactical Map UI -->
                            <div class="map-dot" style="top:30%; left:25%;"></div>
                            <div class="map-dot" style="top:50%; left:60%;"></div>
                            <div class="map-dot" style="top:70%; left:40%;"></div>
                            <i class="fa-solid fa-satellite-dish" style="font-size:5rem; color:rgba(56, 189, 248, 0.2);"></i>
                        </div>
                        <div class="threat-feed" id="threat-feed">
                            <div class="threat-item"><span>[NEW SCAN] Phishing detected: metamask-verify.io</span><span class="text-high">HIGH RISK</span></div>
                            <div class="threat-item"><span>[NEW SCAN] Honeypot found: $ELON_SAFE</span><span class="text-high">CRITICAL</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="stats-section" style="padding: 40px 0; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); background: rgba(0,0,0,0.2);">
            <div class="container center">
                <div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">
                    <div>
                        <h3 style="font-size: 2.5rem; color: var(--accent-vibrant); margin-bottom: 5px;">$150M+</h3>
                        <p style="color: var(--secondary-color); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Assets Protected</p>
                    </div>
                    <div>
                        <h3 style="font-size: 2.5rem; color: var(--accent-vibrant); margin-bottom: 5px;">2.5M+</h3>
                        <p style="color: var(--secondary-color); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Contracts Scanned</p>
                    </div>
                    <div>
                        <h3 style="font-size: 2.5rem; color: var(--accent-vibrant); margin-bottom: 5px;">99.9%</h3>
                        <p style="color: var(--secondary-color); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Threat Detection Rate</p>
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

        <section class="testimonials" id="testimonials">
            <div class="container">
                <div class="section-header center">
                    <h2>Real Users, Real <span class="highlight">Saved Assets</span></h2>
                    <p>Don't just take our word for it.</p>
                </div>
                <div class="testimonial-grid">
                    <div class="testimonial-card">
                        <div style="color:#f59e0b; font-size:14px; margin-bottom: 10px;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                        <p class="t-text">"CryptoAyuda AI helped me avoid investing in a scam token. The rug pull predictor is scary accurate. Saved me 3 ETH!"</p>
                        <div class="t-user">
                            <div class="t-avatar"><img src="https://i.pravatar.cc/100?img=33" alt="User"></div>
                            <div class="t-info">
                                <h4>Alex M.</h4>
                                <span>DeFi Trader</span>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <div style="color:#f59e0b; font-size:14px; margin-bottom: 10px;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                        <p class="t-text">"The phishing detector found a malicious exchange clone before I deposited my assets. Indispensable tool for web3."</p>
                        <div class="t-user">
                            <div class="t-avatar"><img src="https://i.pravatar.cc/100?img=5" alt="User"></div>
                            <div class="t-info">
                                <h4>Sarah J.</h4>
                                <span>NFT Collector</span>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <div style="color:#f59e0b; font-size:14px; margin-bottom: 10px;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                        <p class="t-text">"As a fund manager, the God-Mode tools are essential. We run every single contract through this before deploying capital."</p>
                        <div class="t-user">
                            <div class="t-avatar"><img src="https://i.pravatar.cc/100?img=11" alt="User"></div>
                            <div class="t-info">
                                <h4>David R.</h4>
                                <span>Capital Fund VP</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="cta-section" style="background: radial-gradient(circle at 50% 100%, rgba(14, 165, 233, 0.1) 0%, transparent 50%); border-top: 1px solid var(--border-color);">
            <div class="container cta-container center">
                <i class="fa-solid fa-shield-halved" style="font-size: 3rem; color: var(--accent-vibrant); margin-bottom: 20px;"></i>
                <h2>Trust nothing, verify everything.</h2>
                <p>Join thousands of secure users today. Protection takes exactly 3 seconds.</p>
                <div class="cta-buttons" style="justify-content: center; margin-top:20px;">
                    <button class="btn btn-primary" data-route="home" onclick="window.scrollTo(0,0)">Start Free Scan Now</button>
                    <button class="btn btn-outline" data-route="pricing">View Pricing Plans</button>
                </div>
            </div>
        </section>
    `,

    tools: () => `
        <section style="padding: 120px 0 40px; background: radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.08) 0%, transparent 60%);">
            <div class="container center">
                <div class="badge" style="margin-bottom:15px;"><i class="fa-solid fa-satellite-dish"></i> AI Arsenal v3.0</div>
                <h1>Intelligence Command Center</h1>
                <p style="color:var(--secondary-color); max-width:600px; margin:0 auto;">Six enterprise-grade tools deployed across security and trading ÔÇö each with its own dedicated interface, real data and XP rewards.</p>
                <div style="display:flex; justify-content:center; gap:20px; margin-top:25px; flex-wrap:wrap;">
                    <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--secondary-color);"><span style="width:10px;height:10px;border-radius:50%;background:var(--risk-low);display:inline-block;"></span>Free</div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--secondary-color);"><span style="width:10px;height:10px;border-radius:50%;background:#f59e0b;display:inline-block;"></span>Pro</div>
                    <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--secondary-color);"><span style="width:10px;height:10px;border-radius:50%;background:#a855f7;display:inline-block;"></span>Elite</div>
                </div>
            </div>
        </section>

        <section style="padding: 20px 0 80px;">
            <div class="container">

                <!-- SECURITY SUITE -->
                <div style="margin-bottom:50px;">
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;padding-bottom:15px;border-bottom:1px solid rgba(56,189,248,0.15);">
                        <i class="fa-solid fa-shield-halved" style="color:var(--accent-vibrant);font-size:1.3rem;"></i>
                        <h3 style="margin:0;font-family:var(--font-mono);letter-spacing:2px;font-size:0.9rem;color:var(--secondary-color);">SECURITY SUITE</h3>
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;">

                        <!-- Token Security Pro -->
                        <div class="hub-tool-card" onclick="navigateTo('tool-token')" style="--card-color:#38bdf8;">
                            <div class="hub-tool-card-header">
                                <div class="hub-tool-icon" style="background:rgba(56,189,248,0.15);border-color:rgba(56,189,248,0.4);"><i class="fa-solid fa-coins" style="color:#38bdf8;"></i></div>
                                <span class="plan-pill-free">FREE</span>
                            </div>
                            <h3>Token Security Pro</h3>
                            <p>Honeypot detection, tax analysis, holder distribution, DEX liquidity & 15+ contract risk signals in one audit.</p>
                            <div class="hub-tool-tags">
                                <span>Honeypot</span><span>Tax Audit</span><span>Holders</span><span>+10ÔÇô25 XP</span>
                            </div>
                            <div class="hub-tool-launch"><span>Launch Tool</span><i class="fa-solid fa-arrow-right"></i></div>
                        </div>

                        <!-- Wallet Intelligence -->
                        <div class="hub-tool-card" onclick="navigateTo('tool-wallet')" style="--card-color:#a855f7;">
                            <div class="hub-tool-card-header">
                                <div class="hub-tool-icon" style="background:rgba(168,85,247,0.15);border-color:rgba(168,85,247,0.4);"><i class="fa-solid fa-wallet" style="color:#a855f7;"></i></div>
                                <span class="plan-pill-free">FREE</span>
                            </div>
                            <h3>Wallet Intelligence</h3>
                            <p>Chainalysis-grade profiling ÔÇö phishing history, mixer detection, sanctions check & real on-chain balance.</p>
                            <div class="hub-tool-tags">
                                <span>Sanction Check</span><span>Mixer</span><span>On-Chain</span><span>+15 XP</span>
                            </div>
                            <div class="hub-tool-launch"><span>Launch Tool</span><i class="fa-solid fa-arrow-right"></i></div>
                        </div>

                        <!-- Phishing Scanner -->
                        <div class="hub-tool-card" onclick="navigateTo('tool-phishing')" style="--card-color:#ef4444;">
                            <div class="hub-tool-card-header">
                                <div class="hub-tool-icon" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.4);"><i class="fa-solid fa-spider" style="color:#ef4444;"></i></div>
                                <span class="plan-pill-free">FREE</span>
                            </div>
                            <h3>Phishing & URL Scanner</h3>
                            <p>200+ blacklist registries, SSL validation, WHOIS data & contract associations ÔÇö like VirusTotal for Web3.</p>
                            <div class="hub-tool-tags">
                                <span>URL Check</span><span>WHOIS</span><span>Registry</span><span>+10 XP</span>
                            </div>
                            <div class="hub-tool-launch"><span>Launch Tool</span><i class="fa-solid fa-arrow-right"></i></div>
                        </div>
                    </div>
                </div>

                <!-- TRADING SUITE -->
                <div>
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;padding-bottom:15px;border-bottom:1px solid rgba(245,158,11,0.2);">
                        <i class="fa-solid fa-chart-candlestick" style="color:#f59e0b;font-size:1.3rem;"></i>
                        <h3 style="margin:0;font-family:var(--font-mono);letter-spacing:2px;font-size:0.9rem;color:var(--secondary-color);">TRADING INTELLIGENCE SUITE</h3>
                        <span class="badge" style="background:linear-gradient(135deg,#f59e0b33,#ef444433);border:1px solid rgba(245,158,11,0.4);color:#f59e0b;font-size:0.7rem;">PRO / ELITE REQUIRED</span>
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;">

                        <!-- Smart Money -->
                        <div class="hub-tool-card" onclick="navigateTo('tool-smart-money')" style="--card-color:#f59e0b;background:linear-gradient(135deg,rgba(245,158,11,0.05),rgba(2,6,23,0.95));">
                            <div class="hub-tool-card-header">
                                <div class="hub-tool-icon" style="background:rgba(245,158,11,0.15);border-color:rgba(245,158,11,0.4);"><i class="fa-solid fa-fish-fins" style="color:#f59e0b;"></i></div>
                                <span class="plan-pill-pro">PRO+</span>
                            </div>
                            <h3>Smart Money Tracker</h3>
                            <p>Real on-chain profiling of whale wallets ÔÇö classify wallet tier, detect accumulation/distribution & sentiment.</p>
                            <div class="hub-tool-tags" style="--tag-color:rgba(245,158,11,0.2);--tag-border:rgba(245,158,11,0.4);--tag-text:#f59e0b;">
                                <span>Whale Classification</span><span>Signal Feed</span><span>Sentiment</span><span>+30 XP</span>
                            </div>
                            <div class="hub-tool-launch" style="color:#f59e0b;"><span>Launch Tool</span><i class="fa-solid fa-arrow-right"></i></div>
                        </div>

                        <!-- Arbitrage -->
                        <div class="hub-tool-card" onclick="navigateTo('tool-arbitrage')" style="--card-color:#10b981;background:linear-gradient(135deg,rgba(16,185,129,0.05),rgba(2,6,23,0.95));">
                            <div class="hub-tool-card-header">
                                <div class="hub-tool-icon" style="background:rgba(16,185,129,0.15);border-color:rgba(16,185,129,0.4);"><i class="fa-solid fa-arrows-left-right" style="color:#10b981;"></i></div>
                                <span class="plan-pill-pro">PRO+</span>
                            </div>
                            <h3>Arbitrage Command Center</h3>
                            <p>Simultaneous scan of 5 DEXes ÔÇö detect price spreads, calculate profit windows with gas cost included.</p>
                            <div class="hub-tool-tags" style="--tag-color:rgba(16,185,129,0.2);--tag-border:rgba(16,185,129,0.4);--tag-text:#10b981;">
                                <span>5 DEX Grid</span><span>Profit Calc</span><span>Gas Estimate</span><span>+20 XP</span>
                            </div>
                            <div class="hub-tool-launch" style="color:#10b981;"><span>Launch Tool</span><i class="fa-solid fa-arrow-right"></i></div>
                        </div>

                        <!-- AI Alpha -->
                        <div class="hub-tool-card" onclick="navigateTo('tool-alpha')" style="--card-color:#a855f7;background:linear-gradient(135deg,rgba(168,85,247,0.08),rgba(2,6,23,0.95));border-color:rgba(168,85,247,0.4);">
                            <div class="hub-tool-card-header">
                                <div class="hub-tool-icon" style="background:rgba(168,85,247,0.15);border-color:rgba(168,85,247,0.5);animation:pulse 2s ease-in-out infinite;"><i class="fa-solid fa-brain" style="color:#a855f7;"></i></div>
                                <span class="plan-pill-elite">ELITE ­ƒææ</span>
                            </div>
                            <h3>AI Alpha Intelligence <span style="font-size:1rem;">Ô£¿</span></h3>
                            <p>Our most powerful model: 5 converging AI signals combined into a single investment alpha score with narrative.</p>
                            <div class="hub-tool-tags" style="--tag-color:rgba(168,85,247,0.2);--tag-border:rgba(168,85,247,0.4);--tag-text:#a855f7;">
                                <span>5 AI Models</span><span>Radar Chart</span><span>Deep Alpha</span><span>+50 XP</span>
                            </div>
                            <div class="hub-tool-launch" style="color:#a855f7;"><span>Launch Tool</span><i class="fa-solid fa-arrow-right"></i></div>
                        </div>
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
                    <button class="btn btn-outline full-width" data-route="auth">Sign Up Free</button>
                </div>

                <div class="pricing-card pro active">
                    <div class="badge plan-badge">Most Popular</div>
                    <div class="plan-name">Pro Plan</div>
                    <div class="plan-price">$29<span>/mo</span></div>
                    <p class="plan-desc">For active traders and investors who need constant vigilance.</p>
                    <ul class="plan-features">
                        <li><i class="fa-solid fa-check"></i> <strong>Unlimited</strong> AI scans</li>
                        <li><i class="fa-solid fa-check"></i> Smart Contract Audit AI</li>
                        <li><i class="fa-solid fa-check"></i> HoneyPot Pro AI (Deep Scan)</li>
                        <li><i class="fa-solid fa-check"></i> Real-time scam alerts (SMS/Email)</li>
                        <li><i class="fa-solid fa-check"></i> API Access (1K requests)</li>
                    </ul>
                    <div id="paypal-button-container-pro" class="paypal-container"></div>
                    <button class="btn btn-primary full-width payment-trigger" data-plan="pro">Upgrade to Pro</button>
                </div>

                <div class="pricing-card elite">
                    <div class="plan-name">Elite Plan</div>
                    <div class="plan-price">$99<span>/mo</span></div>
                    <p class="plan-desc">Enterprise-grade protection for institutions and whales.</p>
                    <ul class="plan-features">
                        <li><i class="fa-solid fa-check"></i> Everything in Pro</li>
                        <li><i class="fa-solid fa-check"></i> <strong>Whale Move AI</strong> Tracking</li>
                        <li><i class="fa-solid fa-check"></i> Flash Loan Attack Guard</li>
                        <li><i class="fa-solid fa-check"></i> Priority AI processing</li>
                        <li><i class="fa-solid fa-check"></i> 24/7 Dedicated Support</li>
                    </ul>
                    <div id="paypal-button-container-elite" class="paypal-container"></div>
                    <button class="btn btn-accent full-width payment-trigger" data-plan="elite">Get Elite Protection</button>
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
        <section class="auth-section d-flex align-center justify-center p-y-2" style="min-height: 80vh; padding-top: 100px;">
            <div class="auth-box fade-in" style="max-width: 440px; width: 100%; background: var(--surface-color); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 40px; box-shadow: var(--shadow-premium); backdrop-filter: var(--glass-blur);">
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <i class="fa-solid fa-shield-cat" style="font-size: 2.5rem; color: var(--primary-color); text-shadow: 0 0 20px rgba(255,255,255,0.5); margin-bottom: 16px;"></i>
                    <h2 style="font-size: 1.8rem; margin-bottom: 8px;">Welcome Back</h2>
                    <p style="color: var(--secondary-color); font-size: 0.95rem;">Enter your credentials to access the AI dashboard.</p>
                </div>

                <div class="auth-tabs d-flex justify-between mb-4" style="background: rgba(0,0,0,0.3); padding: 5px; border-radius: 99px;">
                    <button class="btn btn-ghost active w-50" id="tab-login" style="border-radius: 99px; padding: 10px;">Login</button>
                    <button class="btn btn-ghost w-50" id="tab-register" style="border-radius: 99px; padding: 10px;">Register</button>
                </div>
                
                <div id="login-form">
                    <div class="input-group" style="background: rgba(0,0,0,0.4); border-radius: 12px; margin-bottom: 16px;">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" id="login-email" placeholder="Email Address" style="width: 100%;">
                    </div>
                    <div class="input-group" style="background: rgba(0,0,0,0.4); border-radius: 12px; margin-bottom: 24px;">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" id="login-pass" placeholder="Password" style="width: 100%;">
                    </div>
                    <button class="btn btn-primary w-100" id="btn-login" style="padding: 16px; font-size: 1.05rem;">Login to Dashboard <i class="fa-solid fa-arrow-right ml-2"></i></button>
                    <p class="text-medium mt-3 text-center" id="login-error" style="display:none;"></p>
                </div>

                <div id="register-form" style="display:none;">
                    <div class="input-group" style="background: rgba(0,0,0,0.4); border-radius: 12px; margin-bottom: 16px;">
                        <i class="fa-solid fa-envelope"></i>
                        <input type="email" id="reg-email" placeholder="Email Address" style="width: 100%;">
                    </div>
                    <div class="input-group" style="background: rgba(0,0,0,0.4); border-radius: 12px; margin-bottom: 24px;">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" id="reg-pass" placeholder="Password" style="width: 100%;">
                    </div>
                    <button class="btn btn-primary w-100" id="btn-register" style="padding: 16px; font-size: 1.05rem;">Create Account <i class="fa-solid fa-user-plus ml-2"></i></button>
                    <p class="text-medium mt-3 text-center" id="reg-error" style="display:none;"></p>
                    <p class="text-low mt-3 text-center" id="reg-success" style="display:none;"></p>
                </div>

            </div>
        </section>
    `,
    dashboard: () => `
        <section class="dashboard-section page-padding">
            <div class="container mt-5 pt-5">
                <div class="section-header mb-5 fade-in">
                    <h2 class="display-5 fw-bold"><i class="fa-solid fa-gauge-high text-accent"></i> Institutional <span class="highlight">Portfolio Monitor</span></h2>
                    <p class="text-muted">Real-time deep-scan of your wallet assets across ETH, BSC, and Polygon.</p>
                </div>

                <div class="row g-4">
                    <div class="col-lg-4">
                        <div class="tool-card text-center p-4">
                            <h3 style="font-size:1.2rem;opacity:0.8;">OVERALL WALLET HEALTH</h3>
                            <div class="health-ring my-4">
                                <span id="wallet-health-percentage" style="animation: matrixDecode 2s infinite;">--%</span>
                            </div>
                            <div id="wallet-health-status" class="badge badge-low p-2">Initializing...</div>
                            <p class="mt-3 text-sm text-muted" id="wallet-summary">Analyzing transactions and linked risks...</p>
                        </div>
                    </div>

                    <div class="col-lg-8">
                        <div class="tool-card p-4">
                            <div class="flex-between mb-4">
                                <h3 class="mb-0">Token Security Analysis</h3>
                                <button class="btn btn-outline btn-sm" onclick="loadDashboard()"><i class="fa-solid fa-rotate"></i> Sync Portfolio</button>
                            </div>
                            <div class="table-responsive">
                                <table class="table custom-table" style="color:white; font-size:0.9rem;">
                                    <thead>
                                        <tr>
                                            <th>Asset</th>
                                            <th>Balance</th>
                                            <th>Risk Score</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody id="token-list-body">
                                        <tr><td colspan="4" class="text-center py-5"><i class="fa-solid fa-spinner fa-spin"></i> Synchronizing with Blockchain...</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tool-card mt-4 p-3 console-style" style="background:#000; border:1px solid #111;">
                    <div class="console-header flex-between mb-2" style="font-size:0.75rem;">
                         <span><i class="fa-solid fa-terminal"></i> AI GUARDIAN LIVE ENGINE v5.0</span>
                         <span class="text-green">[ONLINE]</span>
                    </div>
                    <div class="console-body" id="console-logs" style="font-size:0.8rem; height:100px; overflow:hidden;">
                        <div class="console-line">> Neural link established.</div>
                        <div class="console-line">> Monitoring real-time mempool data.</div>
                    </div>
                </div>
            </div>
        </section>
    `,
    profile: () => {
        const email = localStorage.getItem('email') || 'User';
        const plan = localStorage.getItem('plan') || 'free';
        const isPro = plan === 'pro' || plan === 'elite';
        
        return `
        <section class="profile-section" style="padding: 120px 0 60px; min-height: 80vh;">
            <div class="container">
                <div style="max-width:800px; margin:0 auto;">

                    <!-- XP / Rank Card -->
                    <div class="tool-card mb-4" id="xp-card" style="border-top: 4px solid #a855f7; background: linear-gradient(135deg, rgba(168,85,247,0.07), rgba(2,6,23,0.9)); position:relative; overflow:hidden;">
                        <div style="position:absolute; top:-40px; right:-40px; width:120px; height:120px; background:#a855f7; filter:blur(60px); opacity:0.2; border-radius:50%;"></div>
                        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px;">
                            <div style="display:flex; align-items:center; gap:20px;">
                                <div id="rank-icon-display" style="font-size:3rem; width:70px; height:70px; border-radius:50%; background:rgba(168,85,247,0.15); border:2px solid rgba(168,85,247,0.5); display:flex; align-items:center; justify-content:center;">­ƒö░</div>
                                <div>
                                    <p style="margin:0; color:var(--secondary-color); font-size:0.8rem; font-family:var(--font-mono); letter-spacing:1px;">CURRENT RANK</p>
                                    <h2 id="rank-name-display" style="margin:5px 0; font-family:var(--font-mono); color:#a855f7;">LOADING...</h2>
                                    <p id="xp-display" style="margin:0; font-size:0.85rem; color:var(--secondary-color);">0 XP Total</p>
                                </div>
                            </div>
                            <button class="btn btn-outline" onclick="navigateTo('leaderboard')" style="border-color:rgba(168,85,247,0.5); color:#a855f7;"><i class="fa-solid fa-trophy"></i> View Leaderboard</button>
                        </div>
                        <div style="margin-top:20px;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                                <span style="font-size:0.75rem; color:var(--secondary-color); font-family:var(--font-mono);">XP to next rank</span>
                                <span id="xp-next-label" style="font-size:0.75rem; color:#a855f7; font-family:var(--font-mono);">ÔÇö XP</span>
                            </div>
                            <div style="height:8px; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden; border:1px solid rgba(168,85,247,0.2);">
                                <div id="xp-progress-bar" style="height:100%; width:0%; background:linear-gradient(90deg,#a855f7,#38bdf8); border-radius:10px; transition:width 1.5s cubic-bezier(0.4,0,0.2,1); box-shadow:0 0 10px #a855f7;"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Profile Info Card -->
                    <div class="tool-card p-5" style="border-top: 4px solid var(--accent-vibrant); position: relative; overflow: hidden; background: rgba(2, 6, 23, 0.7); backdrop-filter: blur(20px);">
                        <div style="position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: var(--accent-vibrant); filter: blur(80px); opacity: 0.2; border-radius: 50%;"></div>
                        
                        <div class="d-flex align-items-center mb-4 pb-4" style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                            <div style="width: 80px; height: 80px; background: rgba(56, 189, 248, 0.1); border: 2px solid var(--accent-vibrant); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: var(--accent-vibrant); margin-right: 20px;">
                                <i class="fa-solid fa-user-astronaut"></i>
                            </div>
                            <div style="text-align: left;">
                                <h2 style="margin-bottom: 5px;">${email}</h2>
                                <span class="badge ${isPro ? 'badge-low' : 'badge-high'}" style="font-size: 0.9rem; padding: 6px 12px; background: rgba(255,255,255,0.1);">
                                    <i class="fa-solid ${isPro ? 'fa-crown' : 'fa-seedling'}"></i> Plan: ${plan.toUpperCase()}
                                </span>
                            </div>
                        </div>
                        
                        <div class="row g-4 mb-5" style="display:flex; gap:20px;">
                            <div class="col" style="flex:1;">
                                <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); text-align: left;">
                                    <h4 style="font-size: 0.9rem; color: var(--secondary-color); text-transform: uppercase; letter-spacing: 1px;"><i class="fa-solid fa-bolt"></i> API Limits</h4>
                                    <h3 style="font-size: 1.8rem; margin: 10px 0;">${isPro ? 'Unlimited' : '3 / 3 Daily'}</h3>
                                    <p style="font-size: 0.8rem; color: var(--secondary-color); margin: 0;">${isPro ? 'God-Mode Active.' : 'Upgrade for unlimited scans.'}</p>
                                </div>
                            </div>
                            <div class="col" style="flex:1;">
                                <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); text-align: left;">
                                    <h4 style="font-size: 0.9rem; color: var(--secondary-color); text-transform: uppercase; letter-spacing: 1px;"><i class="fa-solid fa-clock-rotate-left"></i> Security Status</h4>
                                    <h3 style="font-size: 1.8rem; margin: 10px 0; color: var(--risk-low);">Active</h3>
                                    <p style="font-size: 0.8rem; color: var(--secondary-color); margin: 0;">Real-time protection enabled.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
                            ${!isPro ? '<button class="btn btn-primary" data-route="pricing"><i class="fa-solid fa-arrow-up-right-dots"></i> Upgrade to Pro</button>' : '<button class="btn btn-outline" data-route="tools"><i class="fa-solid fa-shield-halved"></i> Access Arsenal</button>'}
                            <button class="btn btn-outline" style="color: #ef4444; border-color: rgba(239,68,68,0.3);" id="btn-logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
                        </div>

                        <!-- Recent Activity Section -->
                        <div style="margin-top: 40px; text-align: left;">
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                                <i class="fa-solid fa-clock-rotate-left" style="color: var(--accent-vibrant);"></i>
                                <h3 style="margin: 0; font-family: var(--font-mono); font-size: 0.9rem; letter-spacing: 2px;">RECENT SMART SCANS</h3>
                            </div>
                            <div class="table-responsive">
                                <table class="table custom-table" style="color:white; font-size:0.85rem; width: 100%;">
                                    <thead>
                                        <tr style="opacity: 0.5; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px;">
                                            <th style="padding: 10px;">Tool</th>
                                            <th style="padding: 10px;">Result Summary</th>
                                            <th style="padding: 10px;">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody id="profile-history-body">
                                        <tr><td colspan="3" class="text-center py-4" style="color: var(--secondary-color);"><i class="fa-solid fa-spinner fa-spin"></i> Loading activity...</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    },

    leaderboard: () => `
        <section class="page-header">
            <div class="container center">
                <i class="fa-solid fa-trophy" style="font-size:3rem; color:#f59e0b; margin-bottom:15px; display:block;"></i>
                <h1>Hunter Leaderboard</h1>
                <p style="color:var(--secondary-color);">Top analysts ranked by XP. Scan, trade, and earn your way to Grandmaster.</p>
            </div>
        </section>

        <section style="padding: 60px 0; min-height:60vh;">
            <div class="container" style="max-width:800px;">

                <!-- Rank Legend -->
                <div style="display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-bottom:40px;">
                    <div style="display:flex; align-items:center; gap:8px; padding:8px 16px; background:rgba(107,114,128,0.1); border:1px solid rgba(107,114,128,0.3); border-radius:20px;"><span>­ƒö░</span><span style="font-size:0.8rem; color:#6b7280;">Rookie (0 XP)</span></div>
                    <div style="display:flex; align-items:center; gap:8px; padding:8px 16px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:20px;"><span>­ƒÅ╣</span><span style="font-size:0.8rem; color:#10b981;">Hunter (100 XP)</span></div>
                    <div style="display:flex; align-items:center; gap:8px; padding:8px 16px; background:rgba(148,163,184,0.1); border:1px solid rgba(148,163,184,0.3); border-radius:20px;"><span>­ƒÉ║</span><span style="font-size:0.8rem; color:#94a3b8;">Silver Wolf (300 XP)</span></div>
                    <div style="display:flex; align-items:center; gap:8px; padding:8px 16px; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); border-radius:20px;"><span>­ƒªê</span><span style="font-size:0.8rem; color:#f59e0b;">Gold Shark (700 XP)</span></div>
                    <div style="display:flex; align-items:center; gap:8px; padding:8px 16px; background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.3); border-radius:20px;"><span>­ƒÆÄ</span><span style="font-size:0.8rem; color:#38bdf8;">Diamond Whale (1500 XP)</span></div>
                    <div style="display:flex; align-items:center; gap:8px; padding:8px 16px; background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3); border-radius:20px;"><span>­ƒææ</span><span style="font-size:0.8rem; color:#a855f7;">Grandmaster (3000 XP)</span></div>
                </div>

                <div id="leaderboard-container" style="background:rgba(2,6,23,0.8); border:1px solid rgba(255,255,255,0.07); border-radius:16px; overflow:hidden;">
                    <div style="padding:20px 25px; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between;">
                        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--secondary-color); letter-spacing:2px;">RANK</span>
                        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--secondary-color); letter-spacing:2px;">USER</span>
                        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--secondary-color); letter-spacing:2px;">XP</span>
                    </div>
                    <div id="leaderboard-body" style="min-height:250px;">
                        <div class="text-center py-5" style="color:var(--secondary-color);"><i class="fa-solid fa-spinner fa-spin" style="font-size:2rem;"></i><br>Loading leaderboard...</div>
                    </div>
                </div>
            </div>
        </section>
    `
};
