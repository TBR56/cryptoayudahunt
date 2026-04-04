const fs = require('fs');

const cssAdditions = `
/* --- Landing Page New Additions --- */
.btn-danger-glow {
    background: #ef4444 !important;
    color: #fff !important;
    border: none !important;
    box-shadow: 0 0 25px rgba(239, 68, 68, 0.4);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-danger-glow:hover {
    box-shadow: 0 0 40px rgba(239, 68, 68, 0.8), inset 0 0 10px rgba(255,255,255,0.3);
    transform: translateY(-2px) scale(1.02);
    background: #dc2626 !important;
}

.result-unsafe {
    background: rgba(239, 68, 68, 0.1) !important;
    border-color: rgba(239, 68, 68, 0.5) !important;
    box-shadow: 0 0 30px rgba(239, 68, 68, 0.2) inset, 0 0 20px rgba(239, 68, 68, 0.2);
}

.glitch-anim {
    animation: glitch 0.2s cubic-bezier(.25, .46, .45, .94) alternate 5;
}

@keyframes glitch {
  0% { transform: translate(0) }
  25% { transform: translate(-3px, 2px) }
  50% { transform: translate(3px, -2px) }
  75% { transform: translate(-3px, -2px) }
  100% { transform: translate(3px, 2px) }
}

.result-safe {
    background: rgba(16, 185, 129, 0.1) !important;
    border-color: rgba(16, 185, 129, 0.5) !important;
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.2) inset, 0 0 20px rgba(16, 185, 129, 0.2);
}

.success-anim {
    animation: pulse-success 2s infinite;
}

@keyframes pulse-success {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
    70% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.pricing-highlight {
    animation: pulse-pro-glow 3s infinite alternate;
}

@keyframes pulse-pro-glow {
    from { box-shadow: 0 0 30px rgba(14, 165, 233, 0.2); }
    to { box-shadow: 0 0 60px rgba(14, 165, 233, 0.5); }
}
`;

fs.appendFileSync('style.css', cssAdditions);
console.log('Appended to style.css');
