import React from 'react';

export default function Sidebar({ isOpen, onClose, currentUser, onLogout, onNavigate }) {
  const navItems = [
    { label: 'Home',  id: 'home' },
    { label: 'Saved Properties',   id: 'saved' },
    { label: 'My Bookings',   id: 'bookings' },
    { label: 'Profile',   id: 'profile' },
    { label: 'Help & Support',   id: 'help' },
  ];

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href="#" 
                className="sidebar-nav-item"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                  onClose();
                }}
              >
                <span style={{ marginRight: '12px', fontSize: '18px' }}>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          {currentUser ? (
            <button className="btn-sidebar-logout" onClick={() => { onLogout(); onClose(); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
              Logout
            </button>
          ) : (
            <button className="btn-main-search-v13" style={{ width: '100%' }} onClick={() => { onNavigate('login'); onClose(); }}>
              Sign In
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
