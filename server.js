require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const paypal = require('@paypal/checkout-server-sdk');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'cryptoayuda_super_secret_key_123';

// === PayPal Configuration ===
// We use hardcoded sandbox credentials for this testing environment.
const clientId = "AWn_Xn6_0m5-3wM31kC3lE71x3t1U883yH5D94D6K9-2B3484h-l4B1sD7M_m0W1-v609Z_b18E1h9s5"; // Replace with real one in production
const clientSecret = "EDH8g2B_v8r57Z2c3F9Z8v47l3T3k208O4u4m7i8n8W5X3S1N6m4b2U2j4O9W3V4A0h8s9B8h1_2X3E";
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// === Database Setup ===
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error("Database connection error:", err.message);
    else console.log("Connected to the SQLite database.");
});

// Create tables
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    plan TEXT DEFAULT 'free',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// === Auth Middleware ===
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Access Denied. Please Login." });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid Token. Please log in again." });
        req.user = user;
        next();
    });
}

// === Auth Routes ===

app.post('/api/auth/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: "Server error hashing password" });
        db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, hash], function(err) {
            if (err) {
                if (err.message.includes('UNIQUE')) return res.status(400).json({ error: "Email already exists" });
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "User registered successfully", id: this.lastID });
        });
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ error: "User not found" });

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

            const token = jwt.sign({ id: user.id, email: user.email, plan: user.plan }, JWT_SECRET, { expiresIn: '24h' });
            res.json({ token, plan: user.plan, email: user.email });
        });
    });
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
    db.get(`SELECT id, email, plan FROM users WHERE id = ?`, [req.user.id], (err, user) => {
        if (err || !user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    });
});

// === PayPal Payment Routes ===

app.post('/api/orders', authenticateToken, async (req, res) => {
    const { planType } = req.body; // 'pro' or 'elite'
    let price = '0.00';
    if(planType === 'pro') price = '9.99';
    if(planType === 'elite') price = '49.99';

    if(price === '0.00') return res.status(400).json({error: "Invalid plan"});

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: { currency_code: 'USD', value: price },
            description: `CryptoAyuda AI Guardian - ${planType.toUpperCase()} Plan`,
            payee: {
                email_address: 'tbrcarabelli@gmail.com'
            }
        }]
    });

    try {
        const order = await paypalClient.execute(request);
        res.status(200).json({ id: order.result.id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

app.post('/api/orders/capture', authenticateToken, async (req, res) => {
    const { orderID, planType } = req.body;
    try {
        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({});
        const capture = await paypalClient.execute(request);
        
        if(capture.result.status === 'COMPLETED') {
            // Upgrade user plan in SQLite
            db.run(`UPDATE users SET plan = ? WHERE id = ?`, [planType, req.user.id], function(err) {
                if(err) return res.status(500).json({error: "Database error upgrading plan."});
                res.status(200).json({ message: "Plan upgraded successfully", plan: planType });
            });
        } else {
            res.status(400).json({ error: "Payment not completed" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

/**
 * 1. AI Token Analysis / Rug Pull Predictor
 * Uses GoPlus Security API to check contract risks.
 * Protected: Requires Auth
 */
app.get('/api/analyze/token', authenticateToken, async (req, res) => {
    try {
        const { address, chain_id = '1' } = req.query; // Default to Ethereum
        
        if (!address) {
            return res.status(400).json({ error: 'Token address is required' });
        }

        const response = await axios.get(`https://api.gopluslabs.io/api/v1/token_security/${chain_id}?contract_addresses=${address}`);
        const data = response.data.result[address.toLowerCase()];
        
        if (!data) {
            return res.json({
                found: false,
                message: "No security data found for this contract address."
            });
        }

        let riskScore = 0;
        let riskFlags = [];
        let positiveSignals = [];

        // Critical Risks
        if (data.is_honeypot === "1") { riskScore += 90; riskFlags.push("CRITICAL: Token is a Honeypot (cannot be sold)."); }
        if (data.is_blacklisted === "1") { riskScore += 90; riskFlags.push("CRITICAL: Token has a blacklist function."); }
        
        // High Risks
        if (data.is_open_source === "0") { riskScore += 50; riskFlags.push("HIGH: Contract is not open source / verified."); }
        if (data.is_proxy === "1") { riskScore += 30; riskFlags.push("HIGH: Contract uses a proxy (can change rules)."); }
        if (data.can_take_back_ownership === "1") { riskScore += 40; riskFlags.push("HIGH: Creator can regain ownership."); }

        // Tax Risks
        const buyTax = parseFloat(data.buy_tax) || 0;
        const sellTax = parseFloat(data.sell_tax) || 0;
        if (buyTax > 0.1 || sellTax > 0.1) {
            riskScore += 30;
            riskFlags.push(`MEDIUM: High Trading Tax (Buy: ${(buyTax*100).toFixed(1)}%, Sell: ${(sellTax*100).toFixed(1)}%)`);
        }

        // Feature Risks
        if (data.is_mintable === "1") { riskScore += 20; riskFlags.push("MEDIUM: Creator can mint more tokens (Dilution)."); }
        if (data.trading_cooldown === "1") { riskFlags.push("INFO: Has trading cooldown mechanism."); }
        if (data.hidden_owner === "1") { riskScore += 20; riskFlags.push("MEDIUM: Contract has a hidden owner."); }

        // Positive Signals
        if (data.is_open_source === "1") positiveSignals.push("Contract is verified and open source.");
        if (data.is_honeypot === "0" && sellTax < 0.05) positiveSignals.push("Can be sold normally with low tax.");
        if (data.is_mintable === "0") positiveSignals.push("Supply is fixed (Cannot mint more).");

        riskScore = Math.min(riskScore, 100);

        let riskLevel = 'Low';
        if(riskScore > 30) riskLevel = 'Medium';
        if(riskScore > 70) riskLevel = 'High';

        res.json({
            found: true,
            riskScore,
            riskLevel,
            riskFlags: riskFlags.length > 0 ? riskFlags : ["None Detected"],
            positiveSignals,
            raw: {
                name: data.token_name || "Unknown",
                symbol: data.token_symbol || "Unknown",
                creator: data.creator_address || "Unknown",
                buyTax: (buyTax * 100).toFixed(2) + "%",
                sellTax: (sellTax * 100).toFixed(2) + "%",
                holders: data.holder_count || "Unknown",
                dex: data.dex ? data.dex.map(d => d.name).slice(0, 3).join(', ') + (data.dex.length > 3 ? '...' : '') : "None"
            }
        });

    } catch (error) {
        console.error("Token Analysis API Error:", error.message);
        res.status(500).json({ error: 'Failed to analyze token' });
    }
});

/**
 * 2. AI Wallet Guardian
 * Queries GoPlus Address Security API for malicious flags.
 * Protected: Requires Auth
 */
app.get('/api/analyze/wallet', authenticateToken, async (req, res) => {
    try {
        const { address } = req.query;
        if (!address) {
            return res.status(400).json({ error: 'Wallet address is required' });
        }
        
        const response = await axios.get(`https://api.gopluslabs.io/api/v1/address_security/${address}`);
        const data = response.data.result;
        
        let riskScore = 0;
        let riskFlags = [];
        let tags = [];

        if (data) {
            if (data.phishing_activities === "1") { riskScore += 90; riskFlags.push("CRITICAL: Associated with phishing activities."); }
            if (data.cybercrime === "1") { riskScore += 90; riskFlags.push("CRITICAL: Reported for cybercrime involvement."); }
            if (data.money_laundering === "1") { riskScore += 80; riskFlags.push("HIGH: Involved in money laundering."); }
            if (data.financial_crime === "1") { riskScore += 80; riskFlags.push("HIGH: Involved in financial crime."); }
            if (data.darkweb_transactions === "1") { riskScore += 70; riskFlags.push("HIGH: Interacted with darkweb entities."); }
            if (data.mixer === "1") { riskScore += 40; riskFlags.push("MEDIUM: Interacted with coin mixers (e.g., Tornado Cash)."); }
            if (data.sanctioned === "1") { riskScore += 100; riskFlags.push("CRITICAL: Wallet is sanctioned by governments (OFAC, etc)."); }
            if (data.malicious_mining_activities === "1") { riskScore += 30; riskFlags.push("MEDIUM: Malicious mining activities."); }
            if (data.spam_tokens === "1") { riskFlags.push("INFO: Holds known spam tokens."); tags.push("Spam Target"); }
            if (data.contract_address === "1") { tags.push("Smart Contract"); } else { tags.push("EOA (User Wallet)"); }
        }

        riskScore = Math.min(riskScore, 100);
        let riskLevel = 'Low';
        if(riskScore > 30) riskLevel = 'Medium';
        if(riskScore > 70) riskLevel = 'High';

        res.json({
            address,
            riskScore,
            riskLevel,
            tags,
            riskFlags: riskFlags.length > 0 ? riskFlags : ["No malicious history found"],
            summary: riskScore > 50 ? "AI Summary: High likelihood of malicious activity. DO NOT interact." : "AI Summary: This wallet has a clean history on our security registries."
        });

    } catch (error) {
        console.error("Wallet Analysis API Error:", error.message);
        res.status(500).json({ error: 'Failed to analyze wallet' });
    }
});


/**
 * 3. AI Phishing Detector
 * Queries GoPlus Phishing API
 * Protected: Requires Auth
 */
app.get('/api/analyze/phishing', authenticateToken, async (req, res) => {
    try {
        let { url } = req.query;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // Clean the URL for GoPlus
        const cleanUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

        const response = await axios.get(`https://api.gopluslabs.io/api/v1/phishing_site?url=${cleanUrl}`);
        const data = response.data.result;

        let riskScore = 0;
        let riskFlags = [];

        if(data && Object.keys(data).length > 0) {
            if(data.phishing_site === 1) {
                riskScore = 100;
                riskFlags.push("CRITICAL: Verified Phishing Website.");
            }
            if(data.website_contract_security && data.website_contract_security.includes("risk")) {
                riskScore += 60;
                riskFlags.push("HIGH: Associated smart contracts have vulnerabilities or malicious code.");
            }
        } else {
             riskFlags.push("Notice: Domain is not flagged in our malicious registry.");
             // Add artificial low risk for unknown sites as heuristic baseline
             riskScore = 15;
        }

        riskScore = Math.min(riskScore, 100);
        let riskLevel = 'Low';
        if(riskScore > 30) riskLevel = 'Medium';
        if(riskScore > 70) riskLevel = 'High';

        res.json({
            url,
            cleanUrl,
            riskScore,
            riskLevel,
            riskFlags,
            isMalicious: riskScore > 50,
            summary: riskScore > 50 ? "AI Summary: This site is classified as a phishing threat. DO NOT connect your wallet." : "AI Summary: URL seems benign based on current registry checks."
        });

    } catch (error) {
        console.error("Phishing Analysis API Error:", error.message);
        res.status(500).json({ error: 'Failed to analyze URL' });
    }
});

// Restart the server implementation (Wait until next tool for PayPal)
app.listen(PORT, () => {
    console.log(`CryptoAyuda Backend Server running on http://localhost:${PORT}`);
});
