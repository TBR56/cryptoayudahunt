const fs = require('fs');
const path = require('path');

const viewsPath = path.join(__dirname, 'views.js');
const toolViewsPath = path.join(__dirname, 'tool-views.js');
const scriptPath = path.join(__dirname, 'script.js');
const serverPath = path.join(__dirname, 'server.js');

try {
    // 1. UPDATE VIEWS.JS (ADD TO HUB & UPDATE PRICING)
    let viewsData = fs.readFileSync(viewsPath, 'utf8');
    
    const hubCardsStr = `
                        <!-- Impermanent Loss & LP Scanner -->
                        <div class="hub-tool-card" onclick="navigateTo('tool-lp')" style="--card-color:#3b82f6;background:linear-gradient(135deg,rgba(59,130,246,0.05),rgba(2,6,23,0.95));">
                            <div class="hub-tool-card-header">
                                <div class="hub-tool-icon" style="background:rgba(59,130,246,0.15);border-color:rgba(59,130,246,0.4);"><i class="fa-solid fa-droplet" style="color:#3b82f6;"></i></div>
                                <span class="plan-pill-pro">PRO+</span>
                            </div>
                            <h3>Impermanent Loss & LP Scanner</h3>
                            <p>Analyze DEX liquidity pools for manipulation, impermanent loss risk, and locked liquidity depth.</p>
                            <div class="hub-tool-tags" style="--tag-color:rgba(59,130,246,0.2);--tag-border:rgba(59,130,246,0.4);--tag-text:#3b82f6;">
                                <span>LP Analysis</span><span>Drain Risk</span><span>Token Ratio</span><span>+20 XP</span>
                            </div>
                            <div class="hub-tool-launch" style="color:#3b82f6;"><span>Launch Tool</span><i class="fa-solid fa-arrow-right"></i></div>
                        </div>

                        <!-- Honeypot Exploit Simulator -->
                        <div class="hub-tool-card" onclick="navigateTo('tool-exploit')" style="--card-color:#ef4444;background:linear-gradient(135deg,rgba(239,68,68,0.05),rgba(2,6,23,0.95));">
                            <div class="hub-tool-card-header">
                                <div class="hub-tool-icon" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.4);"><i class="fa-solid fa-bug" style="color:#ef4444;"></i></div>
                                <span class="plan-pill-elite">ELITE 👑</span>
                            </div>
                            <h3>Honeypot Exploit Simulator</h3>
                            <p>Bypass static checks by executing contracts in a sandbox to catch deeply hidden honeypots and drainers.</p>
                            <div class="hub-tool-tags" style="--tag-color:rgba(239,68,68,0.2);--tag-border:rgba(239,68,68,0.4);--tag-text:#ef4444;">
                                <span>Execution Run</span><span>Buy/Sell Test</span><span>Code Sim</span><span>+40 XP</span>
                            </div>
                            <div class="hub-tool-launch" style="color:#ef4444;"><span>Launch Tool</span><i class="fa-solid fa-arrow-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>`;

    // Replace the end of the Hub view
    viewsData = viewsData.replace(/<\/div>\s*<\/div>\s*<\/section>\s*`,\s*blog: \(\) => `/g, hubCardsStr + "\n        </section>\n    `,\n\n    blog: () => `");
    
    // Replace pricing view block
    const pricingRegex = /pricing: \(\) => `[\s\S]*?(?=auth: \(\) => `)/m;
    const newPricing = `pricing: () => \`
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
    \`,
    `;
    viewsData = viewsData.replace(pricingRegex, newPricing);
    fs.writeFileSync(viewsPath, viewsData, 'utf8');
    console.log('[+] views.js updated');

    // 2. UPDATE TOOL-VIEWS.JS
    let toolViewsData = fs.readFileSync(toolViewsPath, 'utf8');
    
    // Check if Already appended
    if(!toolViewsData.includes("tool-lp")) {
        const newToolViews = `

// ─── TOOL 7: LP SCANNER ───────────────────────────────────
window.views['tool-lp'] = () => \`
<div class="tool-page-layout">
  <div class="tool-page-header" style="--tool-color:#3b82f6;">
    <div class="container">
      <div class="tool-breadcrumb"><a href="#" data-route="tools">AI Arsenal</a> <i class="fa-solid fa-chevron-right"></i> LP Scanner</div>
      <div class="tool-page-title-row">
        <div>
          <h1 class="tool-page-title"><i class="fa-solid fa-droplet" style="color:#3b82f6;"></i> Impermanent Loss & LP Scanner</h1>
          <p class="tool-page-sub">Analyze DEX liquidity pools for manipulation, impermanent loss risk, and lock data.</p>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="xp-pill" style="background:rgba(59,130,246,0.2);color:#3b82f6;">+20 XP per scan</span>
          <span class="plan-pill-pro">PRO+</span>
        </div>
      </div>
      <div class="scan-bar-wrapper">
        <div class="scan-bar" style="border-color:rgba(59,130,246,0.4);">
          <i class="fa-solid fa-magnifying-glass" style="color:#3b82f6;font-size:1.1rem;"></i>
          <input id="tl-address" type="text" class="scan-bar-input" placeholder="LP Pair Address (e.g. Uniswap V2/V3 pool)..." autocomplete="off"/>
          <button id="tl-scan-btn" class="btn btn-primary scan-bar-btn" style="background:linear-gradient(135deg,#3b82f6,#2563eb);"><i class="fa-solid fa-water"></i> Scan Pool</button>
        </div>
      </div>
    </div>
  </div>
  <div class="container tool-results-container">
    <div id="tl-results" class="tool-results-placeholder">
      <div class="placeholder-content">
        <div class="placeholder-icon-ring" style="border-color:rgba(59,130,246,0.5);"><i class="fa-solid fa-droplet" style="color:#3b82f6;font-size:2rem;"></i></div>
        <h3>Enter a Liquidity Pool address</h3>
      </div>
    </div>
  </div>
</div>
\`;

// ─── TOOL 8: EXPLOIT SIMULATOR ───────────────────────────────────
window.views['tool-exploit'] = () => \`
<div class="tool-page-layout">
  <div class="tool-page-header" style="--tool-color:#ef4444;">
    <div class="container">
      <div class="tool-breadcrumb"><a href="#" data-route="tools">AI Arsenal</a> <i class="fa-solid fa-chevron-right"></i> Exploit Simulator</div>
      <div class="tool-page-title-row">
        <div>
          <h1 class="tool-page-title"><i class="fa-solid fa-bug" style="color:#ef4444;"></i> Honeypot Exploit Sim</h1>
          <p class="tool-page-sub">Trace contract execution in a controlled sandbox to catch advanced threats.</p>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="xp-pill" style="background:rgba(239,68,68,0.2);color:#ef4444;">+40 XP per scan</span>
          <span class="plan-pill-elite">ELITE 👑</span>
        </div>
      </div>
      <div class="scan-bar-wrapper">
        <div class="scan-bar" style="border-color:rgba(239,68,68,0.4);">
          <i class="fa-solid fa-magnifying-glass" style="color:#ef4444;font-size:1.1rem;"></i>
          <input id="te-address" type="text" class="scan-bar-input" placeholder="Token contract address..." autocomplete="off"/>
          <button id="te-scan-btn" class="btn btn-primary scan-bar-btn" style="background:linear-gradient(135deg,#ef4444,#b91c1c);"><i class="fa-solid fa-play"></i> Simulate Trade</button>
        </div>
      </div>
    </div>
  </div>
  <div class="container tool-results-container">
    <div id="te-results" class="tool-results-placeholder">
      <div class="placeholder-content">
        <div class="placeholder-icon-ring" style="border-color:rgba(239,68,68,0.5);"><i class="fa-solid fa-bug" style="color:#ef4444;font-size:2rem;"></i></div>
        <h3>Simulate execution paths</h3>
      </div>
    </div>
  </div>
</div>
\`;
`;
        fs.appendFileSync(toolViewsPath, newToolViews, 'utf8');
        console.log('[+] tool-views.js appended');
    }

    // 3. UPDATE SCRIPT.JS (BINDINGS AND RENDERS)
    let scriptData = fs.readFileSync(scriptPath, 'utf8');
    
    // a) Add to bindToolEvents
    scriptData = scriptData.replace(
        "else if (toolType === 'alpha') inputId = 'tal-address';",
        "else if (toolType === 'alpha') inputId = 'tal-address';\n            else if (toolType === 'lp') inputId = 'tl-address';\n            else if (toolType === 'exploit') inputId = 'te-address';"
    );
    scriptData = scriptData.replace(
        "toolType === 'arbitrage' ? 'ta-address' : 'tal-address';",
        "toolType === 'arbitrage' ? 'ta-address' : toolType === 'lp' ? 'tl-address' : toolType === 'exploit' ? 'te-address' : 'tal-address';"
    );

    // b) Add to runToolScan
    scriptData = scriptData.replace(
        "const prefix = type === 'token' ? 'tt' : type === 'wallet' ? 'tw' : type === 'phishing' ? 'tp' : type === 'smart-money' ? 'tsm' : type === 'arbitrage' ? 'ta' : 'tal';",
        "const prefix = type === 'token' ? 'tt' : type === 'wallet' ? 'tw' : type === 'phishing' ? 'tp' : type === 'smart-money' ? 'tsm' : type === 'arbitrage' ? 'ta' : type === 'lp' ? 'tl' : type === 'exploit' ? 'te' : 'tal';"
    );
    scriptData = scriptData.replace(
        "else if (type === 'alpha') renderAlphaResult(data, resultsContainer);",
        "else if (type === 'alpha') renderAlphaResult(data, resultsContainer);\n        else if (type === 'lp') renderLpResult(data, resultsContainer);\n        else if (type === 'exploit') renderExploitResult(data, resultsContainer);"
    );

    // c) Add render functions
    if(!scriptData.includes("function renderLpResult")) {
        const rendersStr = `
function renderLpResult(data, container) {
    const riskColor = data.riskScore > 50 ? '#ef4444' : '#10b981';
    container.innerHTML = \`
        <div class="tool-result-card fade-in" style="border:1px solid \${riskColor}44;">
            <div style="padding:25px; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h2 style="margin:0; font-weight:900;"><i class="fa-solid fa-droplet" style="color:#3b82f6;"></i> Liquidity Pool Analysis</h2>
                    <p style="margin:5px 0 0; color:var(--secondary-color); font-family:var(--font-mono); font-size:0.8rem;">Pool: \${data.address}</p>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:1.5rem; font-weight:900; color:\${riskColor};">\${data.riskStatus}</div>
                    <div style="font-size:0.6rem; color:var(--secondary-color); letter-spacing:2px;">LP HEALTH</div>
                </div>
            </div>
            
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:25px; padding:25px;">
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:16px; border:1px solid rgba(255,255,255,0.05);">
                    <div style="font-size:0.65rem; color:var(--secondary-color);">TOTAL LIQUIDITY</div>
                    <div style="font-size:1.2rem; font-weight:900; color:white; margin-top:5px;">\${data.totalLiquidity}</div>
                </div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:16px; border:1px solid rgba(255,255,255,0.05);">
                    <div style="font-size:0.65rem; color:var(--secondary-color);">LOCKED %</div>
                    <div style="font-size:1.2rem; font-weight:900; color:#10b981; margin-top:5px;">\${data.lockedPct}</div>
                </div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:16px; border:1px solid rgba(255,255,255,0.05);">
                    <div style="font-size:0.65rem; color:var(--secondary-color);">RESERVE RATIO</div>
                    <div style="font-size:1rem; font-weight:700; color:white; margin-top:5px;">\${data.ratio}</div>
                </div>
                <div style="background:rgba(255,255,255,0.03); padding:20px; border-radius:16px; border:1px solid rgba(255,255,255,0.05);">
                    <div style="font-size:0.65rem; color:var(--secondary-color);">IMPERMANENT LOSS RISK</div>
                    <div style="font-size:1rem; font-weight:700; color:\${riskColor}; margin-top:5px;">\${data.ilRisk}</div>
                </div>
            </div>
            <div style="padding:20px 25px; background:rgba(0,0,0,0.2); border-top:1px solid rgba(255,255,255,0.05);">
                <p style="margin:0; font-size:0.85rem; color:var(--secondary-color);">🤖 <strong>AI Conclusion:</strong> \${data.summary}</p>
            </div>
        </div>
    \`;
}

function renderExploitResult(data, container) {
    const riskColor = data.isHoneypot ? '#ef4444' : '#10b981';
    container.innerHTML = \`
        <div class="tool-result-card fade-in" style="background:rgba(15,23,42,0.8); border:1px solid \${riskColor}44;">
            <div style="padding:25px; background:rgba(239,68,68,0.05); border-bottom:1px solid rgba(0,0,0,0.2); display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h2 style="margin:0; font-weight:900;"><i class="fa-solid fa-code-compare" style="color:#ef4444;"></i> Zero-Knowledge VM Sandbox</h2>
                    <p style="margin:5px 0 0; color:var(--secondary-color); font-family:var(--font-mono); font-size:0.8rem;">Target: \${data.address}</p>
                </div>
            </div>
            
            <div style="padding:30px; text-align:center;">
                <div style="width:70px; height:70px; border-radius:50%; background:\${riskColor}22; border:2px solid \${riskColor}; display:flex; align-items:center; justify-content:center; margin:0 auto 15px;">
                    <i class="fa-solid \${data.isHoneypot ? 'fa-triangle-exclamation' : 'fa-check'}" style="color:\${riskColor}; font-size:2rem;"></i>
                </div>
                <h3 style="color:\${riskColor}; margin-bottom:10px;">\${data.simulationResult}</h3>
                <p style="color:var(--secondary-color);">Simulated Buy: <strong>\${data.buySim}</strong> | Simulated Sell: <strong style="color:\${riskColor};">\${data.sellSim}</strong></p>
                
                <div style="text-align:left; max-width:600px; margin:20px auto 0; padding:20px; background:rgba(0,0,0,0.3); border-radius:12px; font-family:var(--font-mono); font-size:0.75rem;">
                    <p style="color:#ef4444; margin-bottom:10px;">EXECUTION TRACE LOGS:</p>
                    \${data.traces.map(t => \`<div style="color:#94a3b8; margin-bottom:5px;">> \${t}</div>\`).join('')}
                </div>
            </div>
        </div>
    \`;
}
`;
        scriptData = scriptData + rendersStr;
        fs.writeFileSync(scriptPath, scriptData, 'utf8');
        console.log('[+] script.js updated');
    }

    // 4. UPDATE SERVER.JS (MOCK ENDPOINTS)
    let serverData = fs.readFileSync(serverPath, 'utf8');
    
    if(!serverData.includes("/api/trading/lp")) {
        const newApiStr = `
// Fast mock for LP Scanner
app.get('/api/trading/lp', authenticateToken, async (req, res) => {
    try {
        const { address } = req.query;
        const isPro = req.user.plan === 'pro' || req.user.plan === 'elite' || req.user.role === 'admin';
        if (!isPro) return res.status(403).json({ error: 'Pro or Elite plan required.', planGate: true });

        const liq = (Math.random() * 500000 + 50000).toFixed(0);
        const locked = (Math.random() * 30 + 70).toFixed(1);
        const risk = locked > 90 ? 'LOW' : 'HIGH';
        
        res.json({
            success: true, address,
            totalLiquidity: '$' + parseInt(liq).toLocaleString(),
            lockedPct: locked + '%',
            ratio: '1 ETH : 4.4M TKN',
            ilRisk: risk,
            riskScore: risk === 'HIGH' ? 80 : 10,
            riskStatus: risk === 'HIGH' ? 'DANGER' : 'SECURE',
            summary: locked > 90 ? 'Most liquidity is locked by reputable lockers. Dump risk is low.' : 'Warning: Liquidity is mostly unlocked. Creator can remove pooled funds instantly.'
        });
    } catch(e) { res.status(500).json({ error: e.message }); }
});

// Fast mock for Exploit Simulator
app.get('/api/trading/exploit', authenticateToken, async (req, res) => {
    try {
        const { address } = req.query;
        const isElite = req.user.plan === 'elite' || req.user.role === 'admin';
        if (!isElite) return res.status(403).json({ error: 'Elite plan required.', planGate: true });

        const isHoney = Math.random() > 0.5;
        
        res.json({
            success: true, address,
            isHoneypot: isHoney,
            simulationResult: isHoney ? 'TRAP DETECTED: UNABLE TO SELL' : 'SIMULATION PASSED',
            buySim: 'SUCCESS (Gas: 0.04m)',
            sellSim: isHoney ? 'REVERTED (Error: Transfer_Failed)' : 'SUCCESS (Gas: 0.05m)',
            traces: [
                'Initializing isolated EVM Sandbox...',
                'Mocking 1.0 ETH liquidity environment...',
                '[Call] router.swapExactETHForTokens(1.0 ETH)',
                'Buy transaction simulated successfully.',
                '[Call] token.approve(router, max_uint)',
                '[Call] router.swapExactTokensForETH(all)',
                isHoney ? 'FATAL: Revert reason: "Not whitelisted"' : 'Sell transaction completed.',
                'Sandbox environment tearing down.'
            ]
        });
    } catch(e) { res.status(500).json({ error: e.message }); }
});
`;
        serverData = serverData.replace(
            "// Store scan in history (helper)",
            newApiStr + "\n// Store scan in history (helper)"
        );
        fs.writeFileSync(serverPath, serverData, 'utf8');
        console.log('[+] server.js updated');
    }

} catch(err) {
    console.error(err);
}
