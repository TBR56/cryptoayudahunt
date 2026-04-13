/**
 * Synapse AI — Enterprise Tool Views
 * Each tool has its own full-page, multi-panel interface
 */

// ─── TOOL 1: MOONSHOT DISCOVERY PROBE ─────────────────────────────────────────────
window.views['tool-token'] = () => `
<div class="tool-v2-container" style="padding: 40px 24px;">
    <div class="tool-v2-header" style="margin-bottom: 40px; display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px;">
        <div>
            <div style="font-size:0.8rem; color:var(--accent-color); font-family:var(--font-mono); margin-bottom:10px; text-transform:uppercase; letter-spacing:2px;">Early-Stage Liquidity Analysis</div>
            <h1 style="font-size:3rem; font-weight:900; margin:0; letter-spacing:-1px;">Moonshot Discovery <span style="font-size:1.5rem; vertical-align:middle; opacity:0.5;">v4.0</span></h1>
        </div>
        <div style="display:flex; gap:12px;">
            <div class="badge" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);">+25 XP</div>
            <div class="badge" style="background:var(--risk-low); border:none; color:#000;">NEURAL ACTIVE</div>
        </div>
    </div>

    <div class="scan-bar-v2" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:10px; display:flex; gap:10px; flex-wrap:wrap; margin-bottom:40px; box-shadow:var(--shadow-premium);">
        <div style="flex:1; display:flex; align-items:center; padding:10px 20px; min-width:300px;">
            <i class="fa-solid fa-coins" style="color:var(--accent-color); margin-right:15px; font-size:1.2rem;"></i>
            <input id="tt-address" type="text" placeholder="Paste Token Contract Address..." style="background:transparent; border:none; color:#fff; width:100%; font-size:1.1rem; outline:none; font-family:var(--font-mono);">
        </div>
        <select id="tt-chain" style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:14px; padding:0 20px; outline:none; cursor:pointer;">
            <option value="1">Ethereum</option>
            <option value="56">BNB Chain</option>
            <option value="137">Polygon</option>
            <option value="42161">Arbitrum</option>
        </select>
        <button id="tt-scan-btn" class="btn btn-primary" style="padding:0 30px; border-radius:16px; font-weight:800; font-size:1rem; min-height:55px;">ANALYZE DATA</button>
    </div>

    <div id="tt-results" style="min-height:400px; display:flex; align-items:center; justify-content:center; border:1px dashed rgba(255,255,255,0.1); border-radius:24px; background:rgba(255,255,255,0.01);">
        <div style="text-align:center; max-width:400px; opacity:0.6;">
            <div style="font-size:3rem; margin-bottom:20px;">🔍</div>
            <h3 style="margin-bottom:10px;">Awaiting Neural Probe</h3>
            <p style="font-size:0.9rem;">Paste a contract above. Our AI will analyze historical developer success, initial buyer quality, and moonshot probability in real-time.</p>
        </div>
    </div>
</div>
`;

// ─── TOOL 2: SMART MONEY TRACKER ────────────────────────────────────────────
window.views['tool-wallet'] = () => `
<div class="tool-v2-container" style="padding: 40px 24px;">
    <div class="tool-v2-header" style="margin-bottom: 40px; display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px;">
        <div>
            <div style="font-size:0.8rem; color:var(--synapse-purple); font-family:var(--font-mono); margin-bottom:10px; text-transform:uppercase; letter-spacing:2px;">Institutional Alpha Intelligence</div>
            <h1 style="font-size:3rem; font-weight:900; margin:0; letter-spacing:-1px;">Smart Money Hub <span style="font-size:1.5rem; vertical-align:middle; opacity:0.5;">v2.5</span></h1>
        </div>
        <div style="display:flex; gap:12px;">
            <div class="badge" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);">+15 XP</div>
            <div class="badge" style="background:var(--synapse-purple); border:none; color:#fff;">HUNTER RANK</div>
        </div>
    </div>
    <div class="scan-bar-v2" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:10px; display:flex; gap:10px; flex-wrap:wrap; margin-bottom:40px; box-shadow:var(--shadow-premium);">
        <div style="flex:1; display:flex; align-items:center; padding:10px 20px; min-width:300px;">
            <i class="fa-solid fa-wallet" style="color:#a855f7; margin-right:15px; font-size:1.2rem;"></i>
            <input id="tw-address" type="text" placeholder="Paste Wallet Address (0x...)" style="background:transparent; border:none; color:#fff; width:100%; font-size:1.1rem; outline:none; font-family:var(--font-mono);">
        </div>
        <button id="tw-scan-btn" class="btn btn-primary" style="padding:0 30px; border-radius:16px; font-weight:800; font-size:1rem; min-height:55px; background:linear-gradient(135deg, #a855f7, #6b21a8); border:none;">PROFILE TARGET</button>
    </div>
    <div id="tw-results" style="min-height:400px; display:flex; align-items:center; justify-content:center; border:1px dashed rgba(255,255,255,0.1); border-radius:24px; background:rgba(255,255,255,0.01);">
        <div style="text-align:center; max-width:400px; opacity:0.6;">
            <div style="font-size:3rem; margin-bottom:20px;">🕵️‍♂️</div>
            <h3 style="margin-bottom:10px;">Targeting Whales</h3>
            <p style="font-size:0.9rem;">Map out Smart Money clusters, identify whale entry points, and copy the moves of the on-chain elite.</p>
        </div>
    </div>
</div>
`;

// ─── TOOL 3: ALPHA MOMENTUM PREDICTOR ─────────────────────────────────────────
window.views['tool-phishing'] = () => `
<div class="tool-v2-container" style="padding: 40px 24px;">
    <div class="tool-v2-header" style="margin-bottom: 40px; display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px;">
        <div>
            <div style="font-size:0.8rem; color:var(--synapse-cyan); font-family:var(--font-mono); margin-bottom:10px; text-transform:uppercase; letter-spacing:2px;">Predictive Narrative Intelligence</div>
            <h1 style="font-size:3rem; font-weight:900; margin:0; letter-spacing:-1px;">Momentum Engine <span style="font-size:1.5rem; vertical-align:middle; opacity:0.5;">v3.0</span></h1>
        </div>
        <div style="display:flex; gap:12px;">
            <div class="badge" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);">+10 XP</div>
            <div class="badge" style="background:var(--synapse-cyan); border:none; color:#000;">HUNTER ACTIVE</div>
        </div>
    </div>
    <div class="scan-bar-v2" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:24px; padding:10px; display:flex; gap:10px; flex-wrap:wrap; margin-bottom:40px; box-shadow:var(--shadow-premium);">
        <div style="flex:1; display:flex; align-items:center; padding:10px 20px; min-width:300px;">
            <i class="fa-solid fa-link" style="color:var(--risk-high); margin-right:15px; font-size:1.2rem;"></i>
            <input id="tp-url" type="text" placeholder="Paste URL or Domain for Malware Check..." style="background:transparent; border:none; color:#fff; width:100%; font-size:1.1rem; outline:none; font-family:var(--font-mono);">
        </div>
        <button id="tp-scan-btn" class="btn btn-primary" style="padding:0 30px; border-radius:16px; font-weight:800; font-size:1rem; min-height:55px; background:linear-gradient(135deg, var(--risk-high), #7f1d1d); border:none;">SCAN THREAT</button>
    </div>
    <div id="tp-results" style="min-height:400px; display:flex; align-items:center; justify-content:center; border:1px dashed rgba(255,255,255,0.1); border-radius:24px; background:rgba(255,255,255,0.01);">
        <div style="text-align:center; max-width:400px; opacity:0.6;">
            <div style="font-size:3rem; margin-bottom:20px;">🕸️</div>
            <h3 style="margin-bottom:10px;">Predicting the Flow</h3>
            <p style="font-size:0.9rem;">Analyze volume divergence, social sentiment heat-maps, and cross-chain money flow to predict the next 100% breakout narrative.</p>
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
<div class="tool-v2-container" style="padding: 40px 24px;">
    <div class="tool-v2-header" style="margin-bottom: 40px; display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px;">
        <div>
            <div style="font-size:0.8rem; color:var(--risk-low); font-family:var(--font-mono); margin-bottom:10px; text-transform:uppercase; letter-spacing:2px;">Cross-DEX Spread Analysis</div>
            <h1 style="font-size:3rem; font-weight:900; margin:0; letter-spacing:-1px;">Arbitrage Command <span style="font-size:1.5rem; vertical-align:middle; opacity:0.5;">PRO</span></h1>
        </div>
        <div style="display:flex; gap:12px;">
            <div class="badge" style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); color:var(--risk-low);">+20 XP</div>
            <div class="badge" style="background:var(--risk-low); border:none; color:#000;">PROFIT ENGINE</div>
        </div>
    </div>
    
    <div style="background:rgba(2,6,23,0.8); border:1px solid rgba(255,255,255,0.05); border-radius:24px; padding:40px; text-align:center;">
        <i class="fa-solid fa-arrows-left-right" style="font-size:3rem; color:var(--risk-low); margin-bottom:20px;"></i>
        <h2 style="margin-bottom:15px;">Scanning Liquidity Pools...</h2>
        <p style="color:var(--secondary-color); max-width:500px; margin:0 auto 30px;">Deploying probes across Uniswap, Sushi, Pancake, and Curve to find mev-ready spread opportunities.</p>
        <button id="arb-start-btn" class="btn btn-primary" style="padding:15px 40px; border-radius:12px; background:var(--risk-low); border:none; color:#000; font-weight:900;">SCAN DEX MATRIX</button>
    </div>

    <div id="ta-results" style="margin-top:40px;"></div>
</div>
`;

// ─── TOOL 6: NEURAL ALPHA ENGINE ────────────────────────────────────────────
window.views['tool-alpha'] = () => `
<div class="tool-v2-container" style="padding: 40px 24px;">
    <div class="tool-v2-header" style="margin-bottom: 40px; display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px;">
        <div>
            <div style="font-size:0.8rem; color:var(--synapse-purple); font-family:var(--font-mono); margin-bottom:10px; text-transform:uppercase; letter-spacing:2px;">Neural Convergence Synthesis</div>
            <h1 style="font-size:3rem; font-weight:900; margin:0; letter-spacing:-1px;">Neural Alpha Engine <span style="font-size:1.5rem; vertical-align:middle; opacity:0.5;">ORACLE</span></h1>
        </div>
        <div style="display:flex; gap:12px;">
            <div class="badge" style="background:rgba(168,85,247,0.1); border:1px solid rgba(168,85,247,0.3); color:#a855f7;">+50 XP</div>
            <div class="badge" style="background:#a855f7; border:none; color:#fff;">MAX LEVEL AI</div>
        </div>
    </div>
    
    <div class="scan-bar-v2" style="background:rgba(168,85,247,0.05); border:1px solid rgba(168,85,247,0.2); border-radius:24px; padding:15px; display:flex; gap:15px; flex-wrap:wrap; margin-bottom:40px; box-shadow:0 0 40px rgba(168,85,247,0.1);">
        <div style="flex:1; display:flex; align-items:center; padding:10px 20px; min-width:300px;">
            <i class="fa-solid fa-brain" style="color:#a855f7; margin-right:15px; font-size:1.5rem;"></i>
            <input id="tal-address" type="text" placeholder="Target Address for Deep AI Synthesis..." style="background:transparent; border:none; color:#fff; width:100%; font-size:1.2rem; outline:none; font-family:var(--font-mono);">
        </div>
        <button id="tal-scan-btn" class="btn btn-primary" style="padding:0 40px; border-radius:16px; font-weight:900; font-size:1.1rem; min-height:60px; background:linear-gradient(135deg, #a855f7, #6b21a8); border:none; box-shadow:0 0 20px rgba(168,85,247,0.3);">ACTIVATE NEURAL SCAN</button>
    </div>

    <div id="tal-results"></div>
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
