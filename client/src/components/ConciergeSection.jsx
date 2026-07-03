import { useState, useRef, useEffect } from 'react';

export default function ConciergeSection() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="concierge-section">
      <div style={{ flex: 1 }}>
        <p className="concierge-label">Personalized Concierge</p>
        <h2 className="concierge-h2">
          Can't find your<br />sanctuary? Let<br />us curate for<br />you.
        </h2>
        <p className="concierge-body" style={{ marginTop: '16px' }}>
          Our premium advisors will find the perfect match based on your lifestyle preferences.
        </p>
      </div>
      <div ref={dropdownRef} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <button 
          className="btn-connect"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Connect Now
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ marginLeft: '8px', transition: 'transform 0.2s', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="connect-dropdown">
            <div className="connect-dropdown-header">
              CONTACT US
            </div>
            
            <a href="tel:18004199099" className="connect-dropdown-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="connect-dropdown-icon">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <div className="connect-dropdown-content">
                <div className="connect-dropdown-subtitle">
                  Toll Free | 9:30 AM to 6:30 PM (Mon-Sun)
                </div>
                <div className="connect-dropdown-title">
                  1800-41-99099
                </div>
              </div>
            </a>

            <a href="tel:+911206637501" className="connect-dropdown-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="connect-dropdown-icon">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <div className="connect-dropdown-content">
                <div className="connect-dropdown-subtitle">
                  For International Users
                </div>
                <div className="connect-dropdown-title">
                  +91-120-6637501
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', color: '#64748b' }}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </a>

            <button 
              className="connect-dropdown-callback-btn"
              onClick={() => { alert('We will call you back shortly!'); setIsDropdownOpen(false); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px' }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Request a Call Back
            </button>

            <div className="connect-dropdown-footer">
              To check all the FAQ <a href="#" onClick={(e) => { e.preventDefault(); alert('FAQ page coming soon!'); }}>click here</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
