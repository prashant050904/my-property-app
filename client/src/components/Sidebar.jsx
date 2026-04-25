import React from 'react';

export default function Sidebar({ isOpen, onClose, currentUser, onLogout, onNavigate }) {
  const navItems = [
    { label: 'Buy', icon: '🏠', id: 'buy' },
    { label: 'Rent', icon: '🔑', id: 'rent' },
    { label: 'New Launch', icon: '✨', id: 'new-launch' },
    { label: 'Commercial', icon: '🏢', id: 'commercial' },
    { label: 'Plots/Land', icon: '🏞️', id: 'plots' },
    { label: 'Projects', icon: '🏗️', id: 'projects' },
    { label: 'Insights', icon: '📊', id: 'insights' },
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
                <span className="sidebar-icon">{item.icon}</span>
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
