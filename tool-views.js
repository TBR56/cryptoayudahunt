/**
 * CryptoAyuda — Enterprise Tool Views
 * Each tool has its own full-page, multi-panel interface
 */

// ─── TOOL 1: TOKEN SECURITY PRO ─────────────────────────────────────────────
window.views['tool-token'] = () => `
<div class="tool-page-layout">
  <div class="tool-page-header">
    <div class="container">
      <div class="tool-breadcrumb"><a href="#" data-route="tools">AI Arsenal</a> <i class="fa-solid fa-chevron-right"></i> Token Security Analyzer</div>
      <div class="tool-page-title-row">
        <div>
          <h1 class="tool-page-title"><i class="fa-solid fa-coins" style="color:#38bdf8;"></i> Token Security Pro</h1>
          <p class="tool-page-sub">Deep smart contract auditing — honeypot detection, tax analysis, holder distribution & more</p>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="xp-pill">+10–25 XP per scan</span>
          <span class="plan-pill-free">FREE</span>
        </div>
      </div>
      <!-- Scan Input Bar -->
      <div class="scan-bar-wrapper">
        <div class="scan-bar">
          <i class="fa-solid fa-magnifying-glass" style="color:var(--accent-vibrant);font-size:1.1rem;"></i>
          <input id="tt-address" type="text" class="scan-bar-input" placeholder="Paste token contract address (0x...) or try: 0xdac17f958d2ee523a2206206994597c13d831ec7" autocomplete="off"/>
          <select id="tt-chain" class="scan-bar-select">
            <option value="1">Ethereum</option>
            <option value="56">BNB Chain</option>
            <option value="137">Polygon</option>
            <option value="42161">Arbitrum</option>
          </select>
          <button id="tt-scan-btn" class="btn btn-primary scan-bar-btn"><i class="fa-solid fa-shield-halved"></i> Analyze</button>
        </div>
        <div class="scan-bar-examples">
          <span style="color:var(--secondary-color);font-size:0.75rem;margin-right:8px;">Quick examples:</span>
          <button class="example-pill" data-addr="0xdac17f958d2ee523a2206206994597c13d831ec7" data-chain="1">USDT</button>
          <button class="example-pill" data-addr="0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" data-chain="1">USDC</button>
          <button class="example-pill" data-addr="0x2170ed0880ac9a755fd29b2688956bd959f933f8" data-chain="56">ETH (BSC)</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Results area -->
  <div class="container tool-results-container">
    <div id="tt-results" class="tool-results-placeholder">
      <div class="placeholder-content">
        <div class="placeholder-icon-ring"><i class="fa-solid fa-coins" style="color:#38bdf8;font-size:2rem;"></i></div>
        <h3>Enter a token contract to begin</h3>
        <p style="color:var(--secondary-color);">We'll run an institutional-grade security audit in under 5 seconds</p>
        <div class="feature-chips">
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Honeypot Detection</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Tax Analysis</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Holder Distribution</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> DEX Liquidity</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Ownership Risks</span>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// ─── TOOL 2: WALLET INTELLIGENCE ────────────────────────────────────────────
window.views['tool-wallet'] = () => `
<div class="tool-page-layout">
  <div class="tool-page-header" style="--tool-color:#a855f7;">
    <div class="container">
      <div class="tool-breadcrumb"><a href="#" data-route="tools">AI Arsenal</a> <i class="fa-solid fa-chevron-right"></i> Wallet Intelligence</div>
      <div class="tool-page-title-row">
        <div>
          <h1 class="tool-page-title"><i class="fa-solid fa-wallet" style="color:#a855f7;"></i> Wallet Intelligence</h1>
          <p class="tool-page-sub">Chainalysis-grade wallet profiling — threat detection, on-chain history & activity scoring</p>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="xp-pill">+15 XP per scan</span>
          <span class="plan-pill-free">FREE</span>
        </div>
      </div>
      <div class="scan-bar-wrapper">
        <div class="scan-bar">
          <i class="fa-solid fa-magnifying-glass" style="color:#a855f7;font-size:1.1rem;"></i>
          <input id="tw-address" type="text" class="scan-bar-input" placeholder="Paste wallet address (0x...)" autocomplete="off"/>
          <select id="tw-chain" class="scan-bar-select">
            <option value="eth">Ethereum</option>
            <option value="bsc">BNB Chain</option>
            <option value="polygon">Polygon</option>
          </select>
          <button id="tw-scan-btn" class="btn btn-primary scan-bar-btn" style="background:linear-gradient(135deg,#a855f7,#7c3aed);"><i class="fa-solid fa-crosshairs"></i> Profile Wallet</button>
        </div>
        <div class="scan-bar-examples">
          <span style="color:var(--secondary-color);font-size:0.75rem;margin-right:8px;">Quick examples:</span>
          <button class="example-pill" data-addr="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" data-chain="eth">Vitalik.eth</button>
          <button class="example-pill" data-addr="0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8" data-chain="eth">Binance Cold</button>
        </div>
      </div>
    </div>
  </div>
  <div class="container tool-results-container">
    <div id="tw-results" class="tool-results-placeholder">
      <div class="placeholder-content">
        <div class="placeholder-icon-ring" style="border-color:rgba(168,85,247,0.5);background:rgba(168,85,247,0.05);"><i class="fa-solid fa-wallet" style="color:#a855f7;font-size:2rem;"></i></div>
        <h3>Enter a wallet address to profile</h3>
        <p style="color:var(--secondary-color);">Our AI cross-references 15+ security registries instantly</p>
        <div class="feature-chips">
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Phishing History</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Mixer Detection</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Sanction Check</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> On-Chain Balance</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Activity Score</span>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// ─── TOOL 3: PHISHING & URL SCANNER ─────────────────────────────────────────
window.views['tool-phishing'] = () => `
<div class="tool-page-layout">
  <div class="tool-page-header" style="--tool-color:#ef4444;">
    <div class="container">
      <div class="tool-breadcrumb"><a href="#" data-route="tools">AI Arsenal</a> <i class="fa-solid fa-chevron-right"></i> Phishing & URL Scanner</div>
      <div class="tool-page-title-row">
        <div>
          <h1 class="tool-page-title"><i class="fa-solid fa-spider" style="color:#ef4444;"></i> Phishing & URL Scanner</h1>
          <p class="tool-page-sub">VirusTotal-grade URL analysis — malicious domain registry, SSL check & contract association</p>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="xp-pill">+10 XP per scan</span>
          <span class="plan-pill-free">FREE</span>
        </div>
      </div>
      <div class="scan-bar-wrapper">
        <div class="scan-bar">
          <i class="fa-solid fa-link" style="color:#ef4444;font-size:1.1rem;"></i>
          <input id="tp-url" type="text" class="scan-bar-input" placeholder="https://suspicious-metamask-login.io or any URL..." autocomplete="off"/>
          <button id="tp-scan-btn" class="btn btn-primary scan-bar-btn" style="background:linear-gradient(135deg,#ef4444,#b91c1c);"><i class="fa-solid fa-shield-virus"></i> Scan URL</button>
        </div>
        <div class="scan-bar-examples">
          <span style="color:var(--secondary-color);font-size:0.75rem;margin-right:8px;">Try:</span>
          <button class="example-pill" data-url="uniswap.org">uniswap.org</button>
          <button class="example-pill" data-url="opensea.io">opensea.io</button>
          <button class="example-pill" data-url="metamask.io">metamask.io</button>
        </div>
      </div>
    </div>
  </div>
  <div class="container tool-results-container">
    <div id="tp-results" class="tool-results-placeholder">
      <div class="placeholder-content">
        <div class="placeholder-icon-ring" style="border-color:rgba(239,68,68,0.5);background:rgba(239,68,68,0.05);"><i class="fa-solid fa-spider" style="color:#ef4444;font-size:2rem;"></i></div>
        <h3>Enter a URL or domain to scan</h3>
        <p style="color:var(--secondary-color);">We check against 200+ malicious domain registries and blockchain threat intel</p>
        <div class="feature-chips">
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Phishing Registry</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> SSL Validation</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> WHOIS Data</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Contract Links</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Redirect Chain</span>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// ─── TOOL 4: SMART MONEY TRACKER PRO ────────────────────────────────────────
window.views['tool-smart-money'] = () => `
<div class="tool-page-layout">
  <div class="tool-page-header" style="--tool-color:#f59e0b;">
    <div class="container">
      <div class="tool-breadcrumb"><a href="#" data-route="tools">AI Arsenal</a> <i class="fa-solid fa-chevron-right"></i> Smart Money Tracker</div>
      <div class="tool-page-title-row">
        <div>
          <h1 class="tool-page-title"><i class="fa-solid fa-fish-fins" style="color:#f59e0b;"></i> Smart Money Tracker Pro</h1>
          <p class="tool-page-sub">Profiler institucional de wallets — clasificación whale, señales de acumulación/distribución en tiempo real</p>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="xp-pill">+30 XP per scan</span>
          <span class="plan-pill-pro">PRO+</span>
        </div>
      </div>
      <div class="scan-bar-wrapper">
        <div class="scan-bar">
          <i class="fa-solid fa-magnifying-glass" style="color:#f59e0b;font-size:1.1rem;"></i>
          <input id="tsm-address" type="text" class="scan-bar-input" placeholder="Wallet address to track (0x...)" autocomplete="off"/>
          <button id="tsm-scan-btn" class="btn btn-primary scan-bar-btn" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#000;"><i class="fa-solid fa-wave-square"></i> Track Whale</button>
        </div>
        <div class="scan-bar-examples">
          <span style="color:var(--secondary-color);font-size:0.75rem;margin-right:8px;">Try:</span>
          <button class="example-pill" data-addr="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" data-tool="sm">Vitalik.eth</button>
          <button class="example-pill" data-addr="0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8" data-tool="sm">Binance</button>
        </div>
      </div>
    </div>
  </div>
  <div class="container tool-results-container">
    <div id="tsm-results" class="tool-results-placeholder">
      <div class="placeholder-content">
        <div class="placeholder-icon-ring" style="border-color:rgba(245,158,11,0.5);background:rgba(245,158,11,0.05);"><i class="fa-solid fa-fish-fins" style="color:#f59e0b;font-size:2rem;"></i></div>
        <h3>Track institutional whale activity</h3>
        <p style="color:var(--secondary-color);">Real on-chain data combined with AI pattern recognition to detect accumulation and distribution</p>
        <div class="feature-chips">
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Whale Classification</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> ETH Flow Analysis</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Behavior Patterns</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Sentiment Score</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Activity Velocity</span>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// ─── TOOL 5: ARBITRAGE COMMAND CENTER ───────────────────────────────────────
window.views['tool-arbitrage'] = () => `
<div class="tool-page-layout">
  <div class="tool-page-header" style="--tool-color:#10b981;">
    <div class="container">
      <div class="tool-breadcrumb"><a href="#" data-route="tools">AI Arsenal</a> <i class="fa-solid fa-chevron-right"></i> Arbitrage Command Center</div>
      <div class="tool-page-title-row">
        <div>
          <h1 class="tool-page-title"><i class="fa-solid fa-arrows-left-right" style="color:#10b981;"></i> Arbitrage Command Center</h1>
          <p class="tool-page-sub">Escanea 5 DEXes simultáneamente — detecta ventanas de profit, calcula spread y optimiza rutas</p>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="xp-pill">+20 XP per scan</span>
          <span class="plan-pill-pro">PRO+</span>
        </div>
      </div>
      <div class="scan-bar-wrapper">
        <div class="scan-bar">
          <i class="fa-solid fa-magnifying-glass" style="color:#10b981;font-size:1.1rem;"></i>
          <input id="ta-address" type="text" class="scan-bar-input" placeholder="Token contract to find arbitrage (0x...)" autocomplete="off"/>
          <input id="ta-amount" type="number" class="scan-bar-input" placeholder="Amount (ETH)" style="max-width:120px;" value="1" min="0.01" step="0.1"/>
          <button id="ta-scan-btn" class="btn btn-primary scan-bar-btn" style="background:linear-gradient(135deg,#10b981,#059669);"><i class="fa-solid fa-bolt"></i> Scan Arbitrage</button>
        </div>
        <div class="scan-bar-examples">
          <span style="color:var(--secondary-color);font-size:0.75rem;margin-right:8px;">Try:</span>
          <button class="example-pill" data-addr="0xdac17f958d2ee523a2206206994597c13d831ec7" data-tool="arb">USDT</button>
          <button class="example-pill" data-addr="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" data-tool="arb">WETH</button>
        </div>
      </div>
    </div>
  </div>
  <div class="container tool-results-container">
    <div id="ta-results" class="tool-results-placeholder">
      <div class="placeholder-content">
        <div class="placeholder-icon-ring" style="border-color:rgba(16,185,129,0.5);background:rgba(16,185,129,0.05);"><i class="fa-solid fa-arrows-left-right" style="color:#10b981;font-size:2rem;"></i></div>
        <h3>Discover cross-DEX arbitrage windows</h3>
        <p style="color:var(--secondary-color);">We compare prices across Uniswap V3, SushiSwap, PancakeSwap, Curve & 1inch simultaneously</p>
        <div class="feature-chips">
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> 5 DEX Matrix</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Profit Calculator</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Gas Estimator</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Best Route Display</span>
          <span class="feature-chip"><i class="fa-solid fa-check" style="color:var(--risk-low)"></i> Slippage Analysis</span>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// ─── TOOL 6: AI ALPHA INTELLIGENCE CENTER ───────────────────────────────────
window.views['tool-alpha'] = () => `
<div class="tool-page-layout">
  <div class="tool-page-header" style="--tool-color:#a855f7;background:linear-gradient(135deg,rgba(168,85,247,0.15),rgba(2,6,23,0.95));">
    <div class="container">
      <div class="tool-breadcrumb"><a href="#" data-route="tools">AI Arsenal</a> <i class="fa-solid fa-chevron-right"></i> AI Alpha Intelligence</div>
      <div class="tool-page-title-row">
        <div>
          <h1 class="tool-page-title"><i class="fa-solid fa-brain" style="color:#a855f7;"></i> AI Alpha Intelligence Center <span style="font-size:1.2rem;">👑</span></h1>
          <p class="tool-page-sub">5 modelos de IA combinados — whale sentiment, liquidez, momentum on-chain, velocidad social & riesgo de contrato</p>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="xp-pill" style="background:rgba(168,85,247,0.2);border-color:rgba(168,85,247,0.4);color:#a855f7;">+50 XP per scan</span>
          <span class="plan-pill-elite">ELITE 👑</span>
        </div>
      </div>
      <div class="scan-bar-wrapper">
        <div class="scan-bar" style="border-color:rgba(168,85,247,0.4);">
          <i class="fa-solid fa-satellite-dish" style="color:#a855f7;font-size:1.1rem;"></i>
          <input id="tal-address" type="text" class="scan-bar-input" placeholder="Token or wallet address (0x...) — our AI will analyze everything" autocomplete="off"/>
          <button id="tal-scan-btn" class="btn btn-primary scan-bar-btn" style="background:linear-gradient(135deg,#a855f7,#7c3aed);box-shadow:0 0 20px rgba(168,85,247,0.4);"><i class="fa-solid fa-rocket"></i> Run Alpha AI</button>
        </div>
        <div class="scan-bar-examples">
          <span style="color:#a855f7;font-size:0.75rem;margin-right:8px;opacity:0.8;">Neural scan examples:</span>
          <button class="example-pill" style="border-color:rgba(168,85,247,0.3);color:#a855f7;" data-addr="0xdac17f958d2ee523a2206206994597c13d831ec7" data-tool="alpha">USDT</button>
          <button class="example-pill" style="border-color:rgba(168,85,247,0.3);color:#a855f7;" data-addr="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" data-tool="alpha">Vitalik</button>
        </div>
      </div>
    </div>
  </div>
  <div class="container tool-results-container">
    <div id="tal-results" class="tool-results-placeholder">
      <div class="placeholder-content">
        <div class="placeholder-icon-ring" style="border-color:rgba(168,85,247,0.6);background:rgba(168,85,247,0.08);animation:pulse 2s ease-in-out infinite;">
          <i class="fa-solid fa-brain" style="color:#a855f7;font-size:2rem;"></i>
        </div>
        <h3 style="color:#a855f7;">Elite AI Analysis Engine Ready</h3>
        <p style="color:var(--secondary-color);">5 independent AI models will converge their signals into a single unified alpha score</p>
        <div class="feature-chips">
          <span class="feature-chip" style="border-color:rgba(168,85,247,0.3);color:#a855f7;"><i class="fa-solid fa-fish-fins"></i> Whale Accumulation</span>
          <span class="feature-chip" style="border-color:rgba(168,85,247,0.3);color:#a855f7;"><i class="fa-solid fa-droplet"></i> DEX Liquidity</span>
          <span class="feature-chip" style="border-color:rgba(168,85,247,0.3);color:#a855f7;"><i class="fa-brands fa-twitter"></i> Social Velocity</span>
          <span class="feature-chip" style="border-color:rgba(168,85,247,0.3);color:#a855f7;"><i class="fa-solid fa-chart-line"></i> On-Chain Momentum</span>
          <span class="feature-chip" style="border-color:rgba(168,85,247,0.3);color:#a855f7;"><i class="fa-solid fa-shield-halved"></i> Contract Risk</span>
        </div>
      </div>
    </div>
  </div>
</div>
`;


// ─── TOOL 7: LP SCANNER ───────────────────────────────────
window.views['tool-lp'] = () => `
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
`;

// ─── TOOL 8: EXPLOIT SIMULATOR ───────────────────────────────────
window.views['tool-exploit'] = () => `
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
`;
