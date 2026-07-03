export default function TopAppBar({ page, onBack, onLogoClick, city, onSignIn, isAdmin, currentUser, onLogout, onMenuToggle }) {
  const handleLogoClick = onLogoClick || onBack;

  return (
    <>
      {/* Desktop */}
      <nav className="desktop-nav-99">
        <div className="nav-left">
          {page !== 'home' && (
            <button className="icon-btn back-btn" onClick={onBack} aria-label="Go back" style={{ marginRight: '12px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
          )}
          <div className="logo-99" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src="/image/Narayana.png" alt="Logo" />
          </div>
        </div>



        <div className="nav-right">
          <div className="nav-icons">
            <button className="icon-btn" aria-label="Help">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81 19.79 19.79 0 0 1 .1 1.18 2 2 0 0 1 2.11 0h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z"/></svg>
            </button>
            <button className="icon-btn profile" onClick={isAdmin || currentUser ? onLogout : onSignIn}>
              <div className="avatar-mini">
                {currentUser ? currentUser[0].toUpperCase() : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              </div>
              <span className="arrow">⌄</span>
            </button>
            <button className="icon-btn menu" onClick={onMenuToggle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile */}
      <div className="mobile-topbar">
        <div className="topbar-left">
          {page !== 'home' && (
            <button className="topbar-back" onClick={onBack} aria-label="Go back">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
          )}
          <div className="logo-mobile" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src="/image/Narayana.png" alt="Logo" />
          </div>
        </div>
        <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="topbar-avatar" onClick={isAdmin || currentUser ? onLogout : onSignIn} style={{ cursor: 'pointer' }}>
            <span className="topbar-avatar-placeholder">
              {currentUser ? currentUser[0].toUpperCase() : '👤'}
            </span>
          </div>
          <button className="icon-btn menu mobile-only-menu" onClick={onMenuToggle} style={{ color: 'var(--white)', padding: '4px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
