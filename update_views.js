const fs = require('fs');
let content = fs.readFileSync('views.js', 'utf8');

const regex = /home: \(\) => `[\s\S]*?`,\n\n    tools:/;

const newHome = `home: () => \`
        <!-- NEW HIGH-CONVERTING LANDING PAGE -->
        <section class="hero landing-hero center" style="min-height: 80vh;">
            <div class="background-grid"></div>
            <div class="particles" id="particles-container"></div>
            <div class="container hero-container" style="max-width: 800px; display: block; margin: 0 auto; text-align: center;">
                <h1 style="font-size: 4rem; line-height: 1.1; margin-bottom: 20px; font-weight: 800; letter-spacing: -2px;">
                    One wrong click can <br><span style="color: var(--risk-high); text-shadow: 0 0 20px rgba(239, 68, 68, 0.4);">drain your wallet</span>
                </h1>
                <p class="hero-sub" style="font-size: 1.3rem; color: var(--secondary-color); margin-bottom: 40px;">
                    Check any crypto link before it's too late
                </p>
                
                <div class="check-link-wrapper" style="position: relative; max-width: 600px; margin: 0 auto;">
                    <div class="input-group" style="background: rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 12px 20px; margin-bottom: 20px; display: flex;">
                        <i class="fa-solid fa-link" style="color: var(--secondary-color); font-size: 1.5rem; margin-right: 15px;"></i>
                        <input type="text" id="landing-link-input" placeholder="Paste a link here..." style="width: 100%; border: none; background: transparent; color: #fff; font-size: 1.2rem; outline: none; font-family: var(--font-mono);">
                    </div>
                    <button id="landing-check-btn" class="btn btn-primary full-width btn-danger-glow" style="padding: 20px; font-size: 1.3rem; border-radius: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                        Check link now
                    </button>
                    <p style="margin-top: 15px; font-size: 0.95rem; color: var(--secondary-color);">No signup required &bull; Instant result</p>
                </div>
                
                <!-- INSTANT RESULT -->
                <div id="landing-result-area" style="display: none; margin-top: 40px; padding: 30px; border-radius: 16px; position: relative; border: 2px solid transparent;">
                    <div id="landing-result-content" style="position: relative; z-index: 2;"></div>
                </div>
            </div>
        </section>

        <!-- SOCIAL PROOF -->
        <section class="social-proof center" style="padding: 40px 24px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(0,0,0,0.3);">
            <div class="container">
                <p style="font-size: 1.1rem; color: var(--secondary-color); margin-bottom: 8px;">Used by crypto users to avoid phishing and fake airdrops</p>
                <div style="font-size: 0.95rem; color: var(--risk-low); font-family: var(--font-mono); opacity: 0.8;">
                    <i class="fa-solid fa-shield-check"></i> Thousands of links checked daily
                </div>
            </div>
        </section>

        <!-- URGENCY BLOCK -->
        <section class="urgency-block center" style="padding: 80px 24px; border-top: 1px solid rgba(255,255,255,0.05);">
            <div class="container" style="max-width: 700px;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: var(--risk-medium); margin-bottom: 20px;"></i>
                <h2 style="font-size: 2.5rem; margin-bottom: 20px;">New scam links appear every day</h2>
                <p style="font-size: 1.3rem; color: var(--secondary-color);">Most look identical to real ones.</p>
            </div>
        </section>

        <!-- MONETIZATION -->
        <section class="pricing-section center" style="padding: 100px 24px; border-top: 1px solid var(--border-color); position: relative; overflow: hidden;">
            <div style="position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 800px; height: 300px; background: var(--accent-vibrant); filter: blur(150px); opacity: 0.1;"></div>
            <div class="container">
                <h2 style="font-size: 3rem; margin-bottom: 60px;">Stay protected before you click</h2>
                
                <div class="pricing-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; align-items: stretch; max-width: 1000px; margin: 0 auto;">
                    <!-- $7 Plan -->
                    <div class="pricing-card" style="padding: 40px 30px; background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="font-size: 1.2rem; margin-bottom: 15px; color: var(--secondary-color);">Basic Protection</div>
                            <div style="font-size: 3.5rem; font-weight: 800; margin-bottom: 10px;">$7<span style="font-size: 1rem; color: var(--secondary-color);">/mo</span></div>
                        </div>
                        <button class="btn btn-outline full-width signup-trigger" style="padding: 15px; margin-top: 20px;">Get Basic</button>
                    </div>

                    <!-- $19 Plan -->
                    <div class="pricing-card pricing-highlight" style="padding: 50px 30px; background: rgba(15,23,42,0.9); border: 2px solid var(--accent-vibrant); border-radius: 24px; position: relative; box-shadow: 0 0 40px rgba(14, 165, 233, 0.2); display: flex; flex-direction: column; justify-content: space-between; transform: scale(1.05); z-index: 10;">
                        <div class="badge" style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: var(--accent-vibrant); color: #fff; border: none; padding: 6px 15px; white-space: nowrap;">RECOMMENDED</div>
                        <div>
                            <div style="font-size: 1.2rem; margin-bottom: 15px; color: var(--accent-color);">Pro Protection</div>
                            <div style="font-size: 4rem; font-weight: 800; margin-bottom: 10px;">$19<span style="font-size: 1rem; color: var(--secondary-color);">/mo</span></div>
                            <div style="color: var(--risk-low); font-size: 0.9rem; margin-bottom: 20px;"><i class="fa-solid fa-gift"></i> 7-day free trial</div>
                        </div>
                        <button class="btn btn-primary full-width signup-trigger" style="padding: 18px; font-size: 1.1rem; box-shadow: 0 0 20px rgba(255,255,255,0.2);">Unlock full protection</button>
                    </div>

                    <!-- $39 Plan -->
                    <div class="pricing-card" style="padding: 40px 30px; background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="font-size: 1.2rem; margin-bottom: 15px; color: var(--secondary-color);">Elite Protection</div>
                            <div style="font-size: 3.5rem; font-weight: 800; margin-bottom: 10px;">$39<span style="font-size: 1rem; color: var(--secondary-color);">/mo</span></div>
                        </div>
                        <button class="btn btn-outline full-width signup-trigger" style="padding: 15px; margin-top: 20px;">Get Elite</button>
                    </div>
                </div>
            </div>
        </section>
\`,

    tools:`;

content = content.replace(regex, newHome);
fs.writeFileSync('views.js', content, 'utf8');
console.log('Successfully updated views.js');
