export default function TopAppBar({ page, onBack, onLogoClick, city, onSignIn, isAdmin, currentUser, onLogout, onMenuToggle, onContactClick, favorites, isScrolled }) {
  const handleLogoClick = onLogoClick || onBack;
  const favoriteCount = favorites?.length || 0;
  const isOnHero = page === 'home' && !isScrolled;

  return (
    <>
      {/* Desktop */}
      <nav className={`desktop-nav-99 ${isScrolled ? 'scrolled' : ''} ${isOnHero ? 'hero-overlay' : ''}`}>
        <div className="nav-left">
          {page !== 'home' && (
            <button className="icon-btn back-btn" onClick={onBack} aria-label="Go back" style={{ marginRight: '12px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
          )}
          <div className="logo-99" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src="/image/Narayana.png" alt="Logo" className="logo-dark" />
            <img src="/image/Narayana.png" alt="Logo" className="logo-white" />
          </div>
        </div>
        <div className="nav-center">
          <a href="#" className="nav-link active">Buy</a>
          <a href="#" className="nav-link">Rent</a>
          <a href="#" className="nav-link">Sell</a>
          <a href="#" className="nav-link">Projects</a>
          <a href="#" className="nav-link">Commercial</a>
          <a href="#" className="nav-link">Plots</a>
          <a href="#" className="nav-link">Villas</a>
        </div>
        <div className="nav-right">
          <button className="btn-post-property">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <path d="M12 5v14M5 12h14" />
            </svg>
            Post Property
          </button>
          <button className="icon-btn" aria-label="Favorites">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {favoriteCount > 0 && <span className="fav-badge">{favoriteCount}</span>}
          </button>
          <button className="icon-btn" onClick={onContactClick} aria-label="Help">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v3"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v3"/></svg>
          </button>
          <button className="icon-btn" onClick={isAdmin || currentUser ? onLogout : onSignIn} aria-label="Login">
            <div className="avatar-mini">
              {currentUser ? currentUser[0].toUpperCase() : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
            </div>
          </button>
          <button className="icon-btn menu" onClick={onMenuToggle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>

      {/* Mobile */}
      <div className={`mobile-topbar ${isScrolled ? 'scrolled' : ''} ${isOnHero ? 'hero-overlay' : ''}`}>
        <div className="topbar-left">
          {page !== 'home' && (
            <button className="topbar-back" onClick={onBack} aria-label="Go back">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
            </button>
          )}
          <div className="logo-mobile" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <img src="/image/Narayana.png" alt="Logo" className="logo-dark" />
            <img src="/image/Narayana.png" alt="Logo" className="logo-white" />
          </div>
        </div>
        <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="icon-btn" aria-label="Favorites" style={{ padding: '4px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Help" style={{ padding: '4px' }} onClick={onContactClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v3"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v3"/></svg>
          </button>
          <div className="topbar-avatar" onClick={isAdmin || currentUser ? onLogout : onSignIn} style={{ cursor: 'pointer' }}>
            <span className="topbar-avatar-placeholder">
              {currentUser ? currentUser[0].toUpperCase() : '👤'}
            </span>
          </div>
          <button className="icon-btn menu mobile-only-menu" onClick={onMenuToggle} style={{ padding: '4px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
