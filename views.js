/**
 * Views for the SPA
 */

window.views = {
    home: () => `
        <!-- v2.0 HIGH-CONVERSION LANDING PAGE -->
        <section class="hero landing-hero center" style="min-height: 90vh; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; padding:20px;">
            <div class="background-grid"></div>
            <div class="particles" id="particles-container"></div>
            
            <div class="container hero-container" style="max-width: 1000px; text-align:center; position:relative; z-index:5;">
                <div class="badge fade-in" style="margin-bottom:24px; text-transform:uppercase; letter-spacing:3px; background:rgba(0, 242, 255, 0.1); border-color:rgba(0, 242, 255, 0.3); color:var(--accent-vibrant);">
                    <i class="fa-solid fa-brain"></i> NEURAL ALPHA ENGINE V4.0
                </div>
                
                <h1 class="fade-up" style="font-size: clamp(3rem, 10vw, 5.5rem); line-height:0.95; margin-bottom:28px; font-weight:900; letter-spacing:-3px;">
                    Own the on-chain <br><span style="color:var(--accent-vibrant); text-shadow:0 0 30px rgba(0, 242, 255, 0.5);">alpha</span> before <br>it hits the chart.
                </h1>
                
                <p class="hero-sub fade-up" style="font-size: clamp(1.1rem, 3.5vw, 1.6rem); color:var(--secondary-color); margin-bottom:60px; max-width:700px; margin-left:auto; margin-right:auto; opacity:0.9;">
                    Deploy institutional-grade intelligence to detect <strong style="color:#fff;">whales</strong>, locate <strong style="color:#fff;">moonshots</strong>, and predict <strong style="color:#fff;">narrative shifts</strong> with 94% accuracy.
                </p>
                
                <div class="landing-check-box fade-up" style="max-width:800px; margin: 0 auto; background:rgba(2,6,23,0.85); border:1px solid rgba(255,255,255,0.1); border-radius:28px; padding:12px; backdrop-filter:blur(30px); box-shadow:0 30px 60px rgba(0,0,0,0.6);">
                    <div style="display:flex; gap:12px; flex-wrap:wrap;">
                        <div class="input-group-modern" style="flex:1; padding:18px 25px; display:flex; align-items:center; min-width:300px; background:rgba(0,0,0,0.3); border-radius:20px;">
                            <i class="fa-solid fa-bolt" style="color:var(--accent-vibrant); margin-right:15px; font-size:1.3rem;"></i>
                            <input type="text" id="landing-link-input" placeholder="Paste Token address to analyze Alpha Potential..." style="width:100%; border:none; background:transparent; color:#fff; font-size:1.2rem; outline:none; font-family:var(--font-mono);">
                        </div>
                        <button id="landing-check-btn" class="btn btn-primary btn-glow" style="padding:15px 40px; border-radius:20px; font-weight:900; font-size:1.1rem; text-transform:uppercase; background:linear-gradient(135deg, var(--accent-vibrant), #7000FF); border:none;">
                            REVEAL ALPHA
                        </button>
                    </div>
                </div>
                
                <div style="display:flex; justify-content:center; gap:50px; margin-top:50px; opacity:0.6; flex-wrap:wrap;">
                    <div style="font-size:0.85rem; display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-chart-line" style="color:var(--risk-low);"></i> High-Yield Alerts</div>
                    <div style="font-size:0.85rem; display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-microchip" style="color:var(--accent-color);"></i> Institutional Models</div>
                    <div style="font-size:0.85rem; display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-wallet" style="color:var(--risk-medium);"></i> $1.2B Managed Portfolio Intel</div>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div style="position:absolute; bottom:30px; left:50%; transform:translateX(-50%); animation: bounce 2s infinite; opacity:0.3;">
                <i class="fa-solid fa-chevron-down" style="font-size:1.5rem;"></i>
            </div>
        </section>

        <div id="landing-result-area" style="display:none; padding:100px 24px; border-top:1px solid rgba(255,255,255,0.05); background:rgba(2,6,23,0.5);">
            <div class="container" style="max-width:900px;" id="landing-result-content"></div>
        </div>

        <!-- Social Proof Stats -->
        <section style="padding: 80px 0; background:rgba(0,0,0,0.2);">
            <div class="container" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:40px; text-align:center;">
                <div>
                    <div style="font-size:3rem; font-weight:900; color:var(--accent-vibrant);">12k+</div>
                    <div style="color:var(--secondary-color); text-transform:uppercase; letter-spacing:2px; font-size:0.75rem;">Active Hunters</div>
                </div>
                <div>
                    <div style="font-size:3rem; font-weight:900; color:var(--risk-high);">480k</div>
                    <div style="color:var(--secondary-color); text-transform:uppercase; letter-spacing:2px; font-size:0.75rem;">Scams Blocked</div>
                </div>
                <div>
                    <div style="font-size:3rem; font-weight:900; color:var(--risk-low);">1.2s</div>
                    <div style="color:var(--secondary-color); text-transform:uppercase; letter-spacing:2px; font-size:0.75rem;">Avg Detection Time</div>
                </div>
            </div>
        </section>

        <section class="monetization-section center" id="pricing" style="padding: 120px 24px;">
            <div class="container">
                <div class="badge" style="margin-bottom:20px; background:rgba(112, 0, 255, 0.1); color:#7000FF; border-color:rgba(112, 0, 255, 0.3);">MONETIZATION TIER</div>
                <h2 style="font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: 20px; font-weight: 800; letter-spacing:-1px;">Join the Elite 1% of Alpha Seekers</h2>
                <p style="color: var(--secondary-color); margin-bottom: 80px; font-size: 1.2rem; max-width:600px; margin-left:auto; margin-right:auto;">Stop being the "exit liquidity". Deploy institutional intelligence today.</p>
                
                <div class="pricing-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1200px; margin: 0 auto;">
                    <!-- Free / Observer -->
                    <div class="plan-card" style="padding: 50px 40px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 30px; text-align: left; transition: var(--transition);">
                        <div style="color: var(--secondary-color); font-weight: bold; letter-spacing: 2px; margin-bottom: 20px; font-size:0.8rem;">OBSERVER</div>
                        <div style="font-size: 3.5rem; font-weight: 900; margin-bottom: 25px;">$0<span style="font-size: 1rem; color: var(--secondary-color); font-weight:400;">/mo</span></div>
                        <ul style="list-style: none; padding: 0; margin: 0 0 50px; color: var(--secondary-color); line-height: 2.2; font-size:0.95rem;">
                            <li><i class="fa-solid fa-check" style="color:var(--risk-low); margin-right:12px;"></i> 3 Basic Scans per day</li>
                            <li><i class="fa-solid fa-check" style="color:var(--risk-low); margin-right:12px;"></i> Basic Risk Scoring</li>
                            <li style="opacity:0.4;"><i class="fa-solid fa-xmark" style="margin-right:12px;"></i> Real-time Alpha Alerts</li>
                            <li style="opacity:0.4;"><i class="fa-solid fa-xmark" style="margin-right:12px;"></i> Smart Money Tracking</li>
                        </ul>
                        <button class="btn btn-outline full-width" onclick="navigateTo('auth', 'register')" style="padding:18px; font-weight:800;">Get Started</button>
                    </div>

                    <!-- Pro / Hunter -->
                    <div class="plan-card" style="padding: 60px 40px; background: rgba(0, 242, 255, 0.05); border: 2px solid var(--accent-vibrant); border-radius: 30px; text-align: left; position: relative; box-shadow: 0 0 60px rgba(0, 242, 255, 0.1); transform: scale(1.05); z-index:2;">
                        <div class="badge" style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: var(--accent-vibrant); border: none; font-size:0.7rem; color:#000;">PROFIT MAXIMIZER</div>
                        <div style="color: var(--accent-vibrant); font-weight: bold; letter-spacing: 2px; margin-bottom: 20px; font-size:0.8rem;">ALPHA HUNTER</div>
                        <div style="font-size: 4rem; font-weight: 900; margin-bottom: 25px;">$29<span style="font-size: 1rem; color: var(--secondary-color); font-weight:400;">/mo</span></div>
                        <ul style="list-style: none; padding: 0; margin: 0 0 50px; line-height: 2.2; font-size:0.95rem;">
                            <li><i class="fa-solid fa-bolt" style="color:var(--accent-vibrant); margin-right:12px;"></i> <strong>Unlimited</strong> AI Scans</li>
                            <li><i class="fa-solid fa-bolt" style="color:var(--accent-vibrant); margin-right:12px;"></i> Smart Money Tracker Pro</li>
                            <li><i class="fa-solid fa-bolt" style="color:var(--accent-vibrant); margin-right:12px;"></i> Real-time Whale Alerts</li>
                            <li><i class="fa-solid fa-bolt" style="color:var(--accent-vibrant); margin-right:12px;"></i> Priority Access to Moonshots</li>
                        </ul>
                        <button class="btn btn-primary full-width payment-trigger" data-plan="pro" style="padding:20px; font-weight:900; background:var(--accent-vibrant); border:none; color:#000; box-shadow:0 10px 30px rgba(0, 242, 255, 0.3);">DEPLOY HUNTER</button>
                    </div>

                    <!-- Elite / Oracle -->
                    <div class="plan-card" style="padding: 50px 40px; background: rgba(112, 0, 255, 0.05); border: 1px solid rgba(112, 0, 255, 0.3); border-radius: 30px; text-align: left;">
                        <div style="color: #7000FF; font-weight: bold; letter-spacing: 2px; margin-bottom: 20px; font-size:0.8rem;">INSTITUTIONAL</div>
                        <div style="font-size: 3.5rem; font-weight: 900; margin-bottom: 25px;">$99<span style="font-size: 1rem; color: var(--secondary-color); font-weight:400;">/mo</span></div>
                        <ul style="list-style: none; padding: 0; margin: 0 0 50px; color: var(--secondary-color); line-height: 2.2; font-size:0.95rem;">
                            <li><i class="fa-solid fa-crown" style="color:#7000FF; margin-right:12px;"></i> Everything in Pro</li>
                            <li><i class="fa-solid fa-crown" style="color:#7000FF; margin-right:12px;"></i> Predictive Entry/Exit Signals</li>
                            <li><i class="fa-solid fa-crown" style="color:#7000FF; margin-right:12px;"></i> Narrative Shift Detection</li>
                            <li><i class="fa-solid fa-crown" style="color:#7000FF; margin-right:12px;"></i> Direct API / Private Signal</li>
                        </ul>
                        <button class="btn btn-primary full-width payment-trigger" data-plan="elite" style="padding:18px; font-weight:800; background:#7000FF; border:none;">ASCEND TO ORACLE</button>
                    </div>
                </div>
            </div>
        </section>
    `,

    tools: () => `
        <div class="tool-hub-v2" style="padding: 40px 24px;">
            <div style="margin-bottom: 40px;">
                <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Alpha Arsenal</h1>
                <p style="color: var(--secondary-color);">Select an intelligence module to deploy. Your rank determines signal quality.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
                <!-- Moonshot Discovery -->
                <div class="tool-card-v2 report-card-v2 clickable" onclick="navigateTo('tool-token')" style="cursor:pointer; transition: var(--transition);">
                    <div style="margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center;">
                        <div style="width:50px; height:50px; background:rgba(0, 242, 255, 0.1); border:1px solid rgba(0, 242, 255, 0.2); border-radius:12px; display:flex; align-items:center; justify-content:center;">
                            <i class="fa-solid fa-rocket" style="color:var(--accent-vibrant); font-size:1.5rem;"></i>
                        </div>
                        <span class="badge" style="background:var(--risk-low); border:none; color:#000; font-size:0.7rem;">FREE</span>
                    </div>
                    <h3 style="margin-bottom: 10px;">Moonshot Discovery</h3>
                    <p style="font-size: 0.9rem; color: var(--secondary-color); margin-bottom: 20px;">Locate 10x-100x candidates before the social explosion. AI-vetted liquidity.</p>
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        <span style="font-size:0.7rem; padding:4px 8px; background:rgba(255,255,255,0.05); border-radius:6px; color:var(--secondary-color);">Early Bird</span>
                        <span style="font-size:0.7rem; padding:4px 8px; background:rgba(255,255,255,0.05); border-radius:6px; color:var(--secondary-color);">Vetted Pools</span>
                    </div>
                </div>

                <!-- Smart Money Tracker -->
                <div class="tool-card-v2 report-card-v2 clickable" onclick="navigateTo('tool-wallet')" style="cursor:pointer;">
                    <div style="margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center;">
                        <div style="width:50px; height:50px; background:rgba(112, 0, 255, 0.1); border:1px solid rgba(112, 0, 255, 0.2); border-radius:12px; display:flex; align-items:center; justify-content:center;">
                            <i class="fa-solid fa-user-secret" style="color:var(--synapse-purple); font-size:1.5rem;"></i>
                        </div>
                        <span class="badge" style="background:var(--synapse-cyan); border:none; color:#000; font-size:0.7rem;">PRO</span>
                    </div>
                    <h3 style="margin-bottom: 10px;">Smart Money Tracker</h3>
                    <p style="font-size: 0.9rem; color: var(--secondary-color); margin-bottom: 20px;">Shadow-trade the world's most profitable wallets in real-time.</p>
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        <span style="font-size:0.7rem; padding:4px 8px; background:rgba(255,255,255,0.05); border-radius:6px; color:var(--secondary-color);">PnL Analyzer</span>
                    </div>
                </div>

                <!-- Market Momentum -->
                <div class="tool-card-v2 report-card-v2 clickable" onclick="navigateTo('tool-phishing')" style="cursor:pointer;">
                    <div style="margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center;">
                        <div style="width:50px; height:50px; background:rgba(0, 255, 136, 0.1); border:1px solid rgba(0, 255, 136, 0.2); border-radius:12px; display:flex; align-items:center; justify-content:center;">
                            <i class="fa-solid fa-chart-line" style="color:var(--risk-low); font-size:1.5rem;"></i>
                        </div>
                        <span class="badge" style="background:var(--synapse-cyan); border:none; color:#000; font-size:0.7rem;">PRO</span>
                    </div>
                    <h3 style="margin-bottom: 10px;">Market Momentum</h3>
                    <p style="font-size: 0.9rem; color: var(--secondary-color); margin-bottom: 20px;">Predict the next narrative shift (AI vs RWA vs DePIN) with cluster data.</p>
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        <span style="font-size:0.7rem; padding:4px 8px; background:rgba(255,255,255,0.05); border-radius:6px; color:var(--secondary-color);">Narrative Engine</span>
                    </div>
                </div>

                <!-- Alpha Intelligence -->
                <div class="tool-card-v2 report-card-v2 clickable" onclick="navigateTo('tool-alpha')" style="cursor:pointer; border:1px solid rgba(112, 0, 255, 0.3); background:rgba(112, 0, 255, 0.05);">
                    <div style="margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center;">
                        <div style="width:50px; height:50px; background:rgba(112, 0, 255, 0.2); border:1px solid rgba(112, 0, 255, 0.4); border-radius:12px; display:flex; align-items:center; justify-content:center;">
                            <i class="fa-solid fa-crown" style="color:var(--synapse-purple); font-size:1.5rem;"></i>
                        </div>
                        <span class="badge" style="background:var(--synapse-purple); border:none; color:#fff; font-size:0.7rem;">ORACLE</span>
                    </div>
                    <h3 style="margin-bottom: 10px;">Alpha Intelligence</h3>
                    <p style="font-size: 0.9rem; color: var(--secondary-color); margin-bottom: 20px;">Converged AI sentiment, momentum & whale activity synthesis.</p>
                    <div style="display:flex; gap:8px; flex-wrap:wrap;">
                        <span style="font-size:0.7rem; padding:4px 8px; background:rgba(112, 0, 255, 0.1); border-radius:6px; color:var(--synapse-purple);">God-Mode Access</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    dashboard: () => `
        <div class="dashboard-v2" style="padding: 40px 24px;">
            <div style="margin-bottom: 40px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Alpha Command Center</h1>
                    <p style="color: var(--secondary-color);">Real-time on-chain velocity and moonshot detection matrix.</p>
                </div>
                <div class="badge" style="background:rgba(0, 242, 255, 0.1); color:var(--accent-vibrant); border:1px solid rgba(0, 242, 255, 0.3);">LIVE ALPHA FEED</div>
            </div>

            <div class="report-grid-v2" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <!-- Alpha Velocity Widget -->
                <div class="report-card-v2">
                    <h4 style="color:var(--secondary-color); font-size:0.7rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px;">Alpha Velocity Matrix</h4>
                    <div style="display:flex; align-items:flex-end; gap:10px;">
                        <div style="font-size:2.5rem; font-weight:900; color:var(--risk-low);">HIGH</div>
                        <div style="margin-bottom:8px; color:var(--risk-low); font-size:0.8rem;"><i class="fa-solid fa-caret-up"></i> +12% Intelligence</div>
                    </div>
                    <p style="font-size:0.8rem; opacity:0.6; margin-top:10px;">Whale accumulation has increased by 40% in AI-narrative tokens over the last 4h.</p>
                </div>

                <!-- Top Opportunities Feed -->
                <div class="report-card-v2" style="grid-column: span 2;">
                    <h4 style="color:var(--secondary-color); font-size:0.7rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px;">Top Moonshot Opportunities (AI Curated)</h4>
                    <div style="display:flex; flex-direction:column; gap:12px;" id="trending-scans-feed">
                        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.05);">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <div style="color:var(--accent-vibrant);"><i class="fa-solid fa-bolt"></i></div>
                                <div>
                                    <div style="font-size:0.9rem; font-family:var(--font-mono); font-weight:700;">$NEURAL (AI Agent)</div>
                                    <div style="font-size:0.7rem; color:var(--secondary-color);">Alpha Score: 94% | Whale Target</div>
                                </div>
                            </div>
                            <div class="badge-v2" style="background:var(--risk-low); color:#000; padding:4px 8px; border-radius:4px; font-weight:700; font-size:0.7rem;">BUY SIGNAL</div>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.05);">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <div style="color:var(--synapse-purple);"><i class="fa-solid fa-brain"></i></div>
                                <div>
                                    <div style="font-size:0.9rem; font-family:var(--font-mono); font-weight:700;">$QUANT (DePIN)</div>
                                    <div style="font-size:0.7rem; color:var(--secondary-color);">Alpha Score: 88% | Breakout Zone</div>
                                </div>
                            </div>
                            <div class="badge-v2" style="background:var(--risk-low); color:#000; padding:4px 8px; border-radius:4px; font-weight:700; font-size:0.7rem;">BUY SIGNAL</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
            <div class="container pricing-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
                
                <div class="pricing-card">
                    <div class="plan-name">Basic Plan</div>
                    <div class="plan-price">$7<span>/mo</span></div>
                    <p class="plan-desc">For casual crypto users protecting a simple portfolio.</p>
                    <ul class="plan-features">
                        <li><i class="fa-solid fa-check"></i> Unlimited manual scans</li>
                        <li><i class="fa-solid fa-check"></i> Basic risk score</li>
                        <li><i class="fa-solid fa-check"></i> Access to security blog</li>
                        <li class="disabled"><i class="fa-solid fa-xmark"></i> Real-time scam alerts</li>
                        <li class="disabled"><i class="fa-solid fa-xmark"></i> Advanced tracking tools</li>
                    </ul>
                    <div id="paypal-button-container-basic" class="paypal-container"></div>
                    <button class="btn btn-outline full-width payment-trigger" data-plan="basic">Start Basic</button>
                    <p style="text-align:center;font-size:0.8rem;color:var(--secondary-color);margin-top:10px;">Or play safe with Free (3 scans/day)</p>
                </div>

                <div class="pricing-card pro active pricing-highlight">
                    <div class="badge plan-badge" style="background:#f59e0b;color:#000;">7-Day Free Trial</div>
                    <div class="plan-name">Pro Plan</div>
                    <div class="plan-price">$19<span>/mo</span></div>
                    <p class="plan-desc">For active traders and investors who need constant vigilance.</p>
                    <ul class="plan-features">
                        <li><i class="fa-solid fa-check"></i> <strong>Unlimited</strong> AI scans</li>
                        <li><i class="fa-solid fa-check"></i> Smart Money Tracker</li>
                        <li><i class="fa-solid fa-check"></i> Arbitrage Command Center</li>
                        <li><i class="fa-solid fa-check"></i> Real-time scam alerts (SMS/Email)</li>
                        <li><i class="fa-solid fa-check"></i> LP Scanner Access</li>
                    </ul>
                    <div id="paypal-button-container-pro" class="paypal-container"></div>
                    <button class="btn btn-primary full-width payment-trigger" data-plan="pro">Upgrade to Pro</button>
                    <p style="text-align:center;font-size:0.8rem;color:var(--accent-vibrant);margin-top:10px;">Recommended</p>
                </div>

                <div class="pricing-card elite">
                    <div class="plan-name">Elite Plan</div>
                    <div class="plan-price">$39<span>/mo</span></div>
                    <p class="plan-desc">Enterprise-grade protection for institutions and whales.</p>
                    <ul class="plan-features">
                        <li><i class="fa-solid fa-check"></i> Everything in Pro</li>
                        <li><i class="fa-solid fa-check"></i> <strong>Honeypot Exploit Sim</strong></li>
                        <li><i class="fa-solid fa-check"></i> Alpha Intelligence Center</li>
                        <li><i class="fa-solid fa-check"></i> Priority AI processing</li>
                        <li><i class="fa-solid fa-check"></i> 24/7 Dedicated Support</li>
                    </ul>
                    <div id="paypal-button-container-elite" class="paypal-container"></div>
                    <button class="btn btn-accent full-width payment-trigger" data-plan="elite">Get Elite Protection</button>
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
                        <i class="fa-solid fa-user"></i>
                        <input type="text" id="reg-user" placeholder="Username (for affiliate link)" style="width: 100%;">
                    </div>
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
    profile: () => {
        const email = localStorage.getItem('email') || 'User';
        const plan = localStorage.getItem('plan') || 'free';
        const isPro = plan === 'pro' || plan === 'elite';
        
        return `
        <div class="profile-v2" style="padding: 40px 24px;">
            <div style="margin-bottom: 40px;">
                <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Hunter Profile</h1>
                <p style="color: var(--secondary-color);">Manage your neural link and hunter rank.</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px;">
                <!-- Identity Card -->
                <div class="report-card-v2" style="height: fit-content;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <div style="width: 100px; height: 100px; background: rgba(14, 165, 233, 0.1); border: 2px solid var(--accent-vibrant); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 3rem; color: var(--accent-vibrant);">
                            <i class="fa-solid fa-user-astronaut"></i>
                        </div>
                        <h2 style="font-size: 1.5rem; margin-bottom: 5px;">${email}</h2>
                        <span class="badge" style="background: ${isPro ? 'var(--accent-vibrant)' : 'rgba(255,255,255,0.1)'}; color: ${isPro ? '#000' : '#fff'}; border:none;">${plan.toUpperCase()} RANK</span>
                    </div>

                    <div style="padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 15px;">
                        <button class="btn btn-outline full-width" onclick="navigateTo('leaderboard')" style="font-size:0.85rem;"><i class="fa-solid fa-trophy"></i> Global Leaderboard</button>
                        <button class="btn btn-outline full-width" id="btn-logout" style="font-size:0.85rem; color:var(--risk-high); border-color:rgba(239, 68, 68, 0.2);"><i class="fa-solid fa-power-off"></i> Terminate Session</button>
                    </div>
                </div>

                <!-- Stats & Activity -->
                <div style="display:flex; flex-direction:column; gap:24px;">
                    <!-- XP Progress -->
                    <div class="report-card-v2">
                        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:15px;">
                            <div>
                                <h4 style="color:var(--secondary-color); font-size:0.7rem; text-transform:uppercase; letter-spacing:1px;">Neural Growth</h4>
                                <div style="font-size:1.5rem; font-weight:900;" id="rank-name-display">LOADING RANK...</div>
                            </div>
                            <div style="text-align:right;">
                                <div style="font-size:0.85rem; color:var(--accent-vibrant);" id="xp-display">0 XP</div>
                                <div style="font-size:0.75rem; color:var(--secondary-color);" id="xp-next-label">Next Rank in -- XP</div>
                            </div>
                        </div>
                        <div style="height:10px; background:rgba(0,0,0,0.4); border-radius:5px; overflow:hidden;">
                            <div id="xp-progress-bar" style="height:100%; width:0%; background:linear-gradient(90deg, var(--accent-vibrant), #1e40af); box-shadow: 0 0 15px rgba(14, 165, 233, 0.5); transition: width 1s ease;"></div>
                        </div>
                    </div>

                    <!-- Recent Activity -->
                    <div class="report-card-v2">
                         <h4 style="color:var(--secondary-color); font-size:0.7rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:20px;">Recent Operations</h4>
                         <div id="profile-history-body" style="display:flex; flex-direction:column; gap:12px;">
                            <div style="text-align:center; padding:20px; color:var(--secondary-color); font-size:0.9rem;">
                                <i class="fa-solid fa-spinner fa-spin"></i> Retrieving data...
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    },

    leaderboard: () => `
        <div class="leaderboard-v2" style="padding: 40px 24px;">
            <div style="margin-bottom: 40px;">
                <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Global Leaderboard</h1>
                <p style="color: var(--secondary-color);">The top 100 hunters ranked by AI scan accuracy and platform contribution.</p>
            </div>

            <div class="report-card-v2" style="padding:0; overflow:hidden;">
                <table style="width:100%; border-collapse:collapse;">
                    <thead>
                        <tr style="background:rgba(255,255,255,0.02); border-bottom:1px solid rgba(255,255,255,0.05);">
                            <th style="padding:20px; text-align:left; font-size:0.7rem; color:var(--secondary-color); text-transform:uppercase; letter-spacing:1px;">Rank</th>
                            <th style="padding:20px; text-align:left; font-size:0.7rem; color:var(--secondary-color); text-transform:uppercase; letter-spacing:1px;">Hunter</th>
                            <th style="padding:20px; text-align:right; font-size:0.7rem; color:var(--secondary-color); text-transform:uppercase; letter-spacing:1px;">XP Total</th>
                        </tr>
                    </thead>
                    <tbody id="leaderboard-body">
                        <tr>
                            <td colspan="3" style="padding:40px; text-align:center; color:var(--secondary-color);">
                                <i class="fa-solid fa-spinner fa-spin"></i> Synchronizing ranks...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,

    auth: () => `
        <div class="auth-v2" style="min-height:90vh; display:flex; align-items:center; justify-content:center; padding:24px;">
            <div class="report-card-v2" style="max-width:440px; width:100%; padding:40px;">
                <div style="text-align:center; margin-bottom:40px;">
                    <div style="width:60px; height:60px; background:rgba(14, 165, 233, 0.1); border-radius:15px; display:flex; align-items:center; justify-content:center; margin:0 auto 20px;">
                        <i class="fa-solid fa-shield-halved" style="font-size:2rem; color:var(--accent-vibrant);"></i>
                    </div>
                    <h2 style="font-size:2rem; margin-bottom:10px;" id="auth-title">Welcome, Hunter</h2>
                    <p style="color:var(--secondary-color); font-size:0.9rem;" id="auth-subtitle">Initialize your session to access global intelligence.</p>
                </div>

                <div style="display:flex; background:rgba(0,0,0,0.3); border-radius:12px; padding:4px; margin-bottom:30px;">
                    <button class="btn btn-ghost active" id="tab-login" style="flex:1; border-radius:10px;">Login</button>
                    <button class="btn btn-ghost" id="tab-register" style="flex:1; border-radius:10px;">Register</button>
                </div>

                <div id="login-form">
                    <div class="input-v2" style="margin-bottom:20px;">
                        <input type="email" id="login-email" placeholder="Neural ID (Email)" style="width:100%; padding:15px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:#fff; outline:none; transition: border-color 0.3s;" onfocus="this.style.borderColor='var(--accent-vibrant)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
                    </div>
                    <div class="input-v2" style="margin-bottom:30px;">
                        <input type="password" id="login-pass" placeholder="Access Key" style="width:100%; padding:15px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:#fff; outline:none; transition: border-color 0.3s;" onfocus="this.style.borderColor='var(--accent-vibrant)'" onblur="this.style.borderColor='rgba(255,255,255,0.1)'">
                    </div>
                    <button class="btn btn-primary full-width" id="btn-login" style="padding:18px; font-weight:800; font-size:1rem;">ESTABLISH LINK</button>
                    <p id="login-error" style="color:var(--risk-high); font-size:0.8rem; text-align:center; margin-top:15px; display:none;"></p>
                </div>

                <div id="register-form" style="display:none;">
                    <div class="input-v2" style="margin-bottom:15px;">
                        <input type="text" id="reg-user" placeholder="Hunter Name (Affiliate ID)" style="width:100%; padding:15px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:#fff; outline:none;">
                    </div>
                    <div class="input-v2" style="margin-bottom:15px;">
                        <input type="email" id="reg-email" placeholder="Neural ID (Email)" style="width:100%; padding:15px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:#fff; outline:none;">
                    </div>
                    <div class="input-v2" style="margin-bottom:25px;">
                        <input type="password" id="reg-pass" placeholder="Establish Access Key" style="width:100%; padding:15px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:#fff; outline:none;">
                    </div>
                    <button class="btn btn-primary full-width" id="btn-register" style="padding:18px; font-weight:800; font-size:1rem;">ENROLL IN PROGRAM</button>
                    <p id="reg-error" style="color:var(--risk-high); font-size:0.8rem; text-align:center; margin-top:15px; display:none;"></p>
                </div>
            </div>
        </div>
    `,

    affiliate: () => `
        <div class="affiliate-v2" style="padding: 40px 24px;">
            <div style="margin-bottom: 40px; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 10px;">Hunter's Referral</h1>
                    <p style="color: var(--secondary-color);">Earn 20% on every premium referral — Forever.</p>
                </div>
                <div class="badge" style="background:rgba(16, 185, 129, 0.1); color:#10b981; border:1px solid rgba(16, 185, 129, 0.3);">ACTIVE PROGRAM</div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom:30px;">
                <div class="report-card-v2">
                    <h4 style="color:var(--secondary-color); font-size:0.7rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Unique Clicks</h4>
                    <div style="font-size:2rem; font-weight:900;" id="aff-clicks">—</div>
                </div>
                <div class="report-card-v2">
                    <h4 style="color:var(--secondary-color); font-size:0.7rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Referrals</h4>
                    <div style="font-size:2rem; font-weight:900;" id="aff-referrals">—</div>
                </div>
                <div class="report-card-v2" style="border-right: 2px solid #10b981;">
                    <h4 style="color:var(--secondary-color); font-size:0.7rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Total Earnings</h4>
                    <div style="font-size:2rem; font-weight:900; color:#10b981;" id="aff-earnings">$—</div>
                </div>
            </div>

            <div class="report-card-v2">
                <h3 style="margin-bottom: 15px;">Your Referral Asset</h3>
                <p style="color: var(--secondary-color); margin-bottom: 25px;">Distribute this link to enroll others in the program.</p>
                <div style="display:flex; gap:12px;">
                    <input type="text" id="aff-link-input" readonly value="Loading..." style="flex:1; padding:15px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); border-radius:12px; color:#fff; font-family:var(--font-mono); font-size:0.9rem;">
                    <button class="btn btn-primary" id="btn-copy-aff" style="padding:0 25px;">COPY</button>
                </div>
            </div>
        </div>
    `
};
