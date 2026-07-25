export default function SellCTASection() {
  return (
    <section className="sell-cta-section">
      <div className="sell-cta-container">
        <div className="sell-cta-left">
          <span className="sell-cta-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20" />
            </svg>
            List For Free
          </span>
          <h2 className="sell-cta-title">
            Want to Sell or Rent <br />
            <span className="sell-cta-accent">Your Property?</span>
          </h2>
          <p className="sell-cta-subtitle">
            Post your property in minutes and reach thousands of serious buyers and tenants.
            No hidden fees, premium support included.
          </p>
          <div className="sell-cta-benefits">
            <div className="sell-cta-benefit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>10,000+ Active Buyers</span>
            </div>
            <div className="sell-cta-benefit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Verified Leads Only</span>
            </div>
            <div className="sell-cta-benefit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Dedicated Support</span>
            </div>
          </div>
          <div className="sell-cta-actions">
            <button className="sell-cta-primary">
              Post Property Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="sell-cta-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Talk to Expert
            </button>
          </div>
        </div>

        <div className="sell-cta-right">
          <div className="sell-cta-illustration">
            <svg viewBox="0 0 400 340" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="grad-house" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#d1fae5" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="grad-roof" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0f6d38" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <linearGradient id="grad-sun" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fde68a" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="grad-cloud" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ecfdf5" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>

              <circle cx="320" cy="70" r="38" fill="url(#grad-sun)" opacity="0.9" />
              <circle cx="325" cy="65" r="32" fill="#fff7d6" opacity="0.6" />

              <path d="M60 120 Q90 80 140 100 Q190 70 240 110 Q290 85 340 120 L340 150 L60 150 Z" fill="url(#grad-cloud)" opacity="0.8" />
              <path d="M260 60 Q285 35 320 55 Q355 35 380 65 L380 90 L260 90 Z" fill="url(#grad-cloud)" opacity="0.75" />

              <path d="M110 180 L200 100 L290 180 Z" fill="url(#grad-roof)" />
              <path d="M95 178 L200 85 L305 178 L290 180 L200 102 L110 180 Z" fill="#065f46" opacity="0.35" />

              <rect x="120" y="180" width="160" height="120" rx="6" fill="url(#grad-house)" stroke="#bbf7d0" strokeWidth="2" />
              <rect x="128" y="188" width="144" height="104" rx="4" fill="none" stroke="#a7f3d0" strokeWidth="1.5" opacity="0.7" />

              <rect x="145" y="205" width="38" height="38" rx="4" fill="#0f6d38" opacity="0.85" />
              <line x1="164" y1="205" x2="164" y2="243" stroke="#86efac" strokeWidth="2" />
              <line x1="145" y1="224" x2="183" y2="224" stroke="#86efac" strokeWidth="2" />

              <rect x="217" y="205" width="38" height="38" rx="4" fill="#0f6d38" opacity="0.85" />
              <line x1="236" y1="205" x2="236" y2="243" stroke="#86efac" strokeWidth="2" />
              <line x1="217" y1="224" x2="255" y2="224" stroke="#86efac" strokeWidth="2" />

              <rect x="180" y="250" width="40" height="50" rx="4" fill="#064e3b" />
              <circle cx="212" cy="276" r="2.5" fill="#86efac" />

              <rect x="80" y="290" width="240" height="12" rx="4" fill="#0f6d38" opacity="0.75" />
              <rect x="60" y="296" width="280" height="14" rx="5" fill="#064e3b" opacity="0.5" />

              <g transform="translate(60, 256)">
                <rect x="0" y="20" width="3" height="24" fill="#713f12" />
                <circle cx="1.5" cy="12" r="14" fill="#22c55e" opacity="0.9" />
                <circle cx="1.5" cy="8" r="11" fill="#4ade80" opacity="0.8" />
              </g>
              <g transform="translate(330, 252)">
                <rect x="0" y="24" width="3" height="28" fill="#713f12" />
                <circle cx="1.5" cy="14" r="16" fill="#16a34a" opacity="0.9" />
                <circle cx="1.5" cy="10" r="12" fill="#4ade80" opacity="0.85" />
              </g>

              <g transform="translate(140, 156)">
                <rect x="-6" y="2" width="3" height="22" fill="#713f12" />
                <circle cx="-4.5" cy="-2" r="12" fill="#22c55e" opacity="0.92" />
              </g>
              <g transform="translate(260, 156)">
                <rect x="-6" y="2" width="3" height="22" fill="#713f12" />
                <circle cx="-4.5" cy="-2" r="12" fill="#16a34a" opacity="0.92" />
              </g>

              <path d="M50 310 C100 298 150 318 200 306 C250 294 300 314 360 300" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55" />
            </svg>
          </div>
          <div className="sell-cta-floating-card">
            <div className="sell-cta-floating-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div>
              <p className="sell-cta-floating-title">Get Maximum Value</p>
              <p className="sell-cta-floating-sub">Avg. 18% higher returns</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
