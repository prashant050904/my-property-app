import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section main-info">
          <div className="footer-logo">
            <img src="/image/Narayana.png" alt="PrimeEstate Logo" />
          </div>
          <p className="footer-desc">
            PrimeEstate is your trusted partner in finding the perfect sanctuary. 
            We offer a curated selection of premium properties across India.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Properties</a></li>
            <li><a href="#">Agents</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-title">Contact Us</h3>
          <div className="contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81 19.79 19.79 0 0 1 .1 1.18 2 2 0 0 1 2.11 0h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z"/></svg>
            <span>+91 98765 43210</span>
          </div>
          <div className="contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>contact@primeestate.com</span>
          </div>
          <div className="contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>bangalore, Mumbai, Maharashtra, India</span>
          </div>
        </div>

        {/* App Stores */}
        <div className="footer-section app-stores">
          <h3 className="footer-title">Download App</h3>
          <div className="store-buttons">
            <a href="#" className="store-btn">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play Store" />
            </a>
            <a href="#" className="store-btn">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Apple App Store" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 PrimeEstate. All rights reserved.</p>
      </div>
    </footer>
  );
}
