import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './index.css';

import TopAppBar        from './components/TopAppBar';
import Sidebar          from './components/Sidebar';
import BottomNavBar     from './components/BottomNavBar';
import Hero             from './components/Hero';
import PromotionSlider  from './components/PromotionSlider';
import PopularCities    from './components/PopularCities';
import FeaturedProperties from './components/FeaturedProperties';
import PropertyListView from './components/PropertyListView';
import Footer           from './components/Footer';

// Initialize Supabase client safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || "";
let supabase;

try {
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  } else {
    console.warn("⚠️ Supabase credentials missing. Auth will not work.");
  }
} catch (err) {
  console.error("❌ Supabase initialization failed:", err);
}

/* ─── MODAL ─── */
function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay open" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        {title && <h2 className="modal-title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

const inputCss = {
  width: '100%', padding: '14px 16px', borderRadius: '12px',
  border: '1.5px solid var(--border)', outline: 'none',
  fontFamily: 'Inter, sans-serif', fontSize: '14px',
  color: 'var(--dark)', background: 'var(--off-white)',
  transition: 'all 0.2s ease',
};

export default function App() {
  /* ─── STATE ─── */
  const [properties, setProperties]         = useState([]);
  const [isLoading, setIsLoading]           = useState(true);
  const [error, setError]                   = useState(null);

  const [page, setPage]                     = useState('home');
  const [activeTab, setActiveTab]           = useState('home');
  const [searchQuery, setSearchQuery]       = useState('');
  const [searchCity, setSearchCity]         = useState('Mumbai');
  const [favorites, setFavorites]           = useState(new Set());
  const [isSidebarOpen, setIsSidebarOpen]   = useState(false);
  const [navHistory, setNavHistory]         = useState([]);

  // Auth
  const [isAdmin, setIsAdmin]               = useState(false);
  const [currentUser, setCurrentUser]       = useState(null);
  const [authView, setAuthView]             = useState('login'); // 'login' | 'register'
  const [userName, setUserName]             = useState('');
  const [userEmail, setUserEmail]           = useState('');
  const [userPass, setUserPass]             = useState('');
  const [showPass, setShowPass]             = useState(false);
  const [phoneNumber, setPhoneNumber]       = useState('');
  const [otp, setOtp]                       = useState('');
  const [otpSent, setOtpSent]               = useState(false);
  const [authLoading, setAuthLoading]       = useState(false);

  // Book visit modal
  const [visitProp, setVisitProp]           = useState(null);

  /* ─── AUTH SESSION ─── */
  useEffect(() => {
    if (!supabase) return;

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user.user_metadata?.full_name || session.user.email || session.user.phone);
      }
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentUser(session.user.user_metadata?.full_name || session.user.email || session.user.phone);
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /* ─── FETCH ─── */
  useEffect(() => {
    let isMounted = true;
    console.log("🌐 App Initialized. Environment:", import.meta.env.MODE);
    console.log("🌐 Fetching properties from http://localhost:5001/api/properties");
    
    // We start with isLoading false and show what we have (or empty)
    // to avoid being stuck on a loading screen
    setIsLoading(false); 
    setError(null);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); 

    fetch('http://localhost:5001/api/properties', { signal: controller.signal })
      .then(r => {
        clearTimeout(timeoutId);
        if (!r.ok) return r.json().then(d => { throw new Error(d.error || 'Server Error') });
        return r.json();
      })
      .then(data => { 
        if (!isMounted) return;
        console.log("✅ Data received:", data);
        if (Array.isArray(data) && data.length > 0) {
          setProperties(data);
        }
      })
      .catch((err) => { 
        if (!isMounted) return;
        clearTimeout(timeoutId);
        console.warn("⚠️ Backend fetch failed, using local fallback data:", err.message);
        // We don't set a fatal error anymore, just log it
      });

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  /* ─── NAVIGATION ─── */
  const navigateTo = (p, t) => {
    if (p === page && (!t || t === activeTab)) return;
    setNavHistory(prev => [...prev, { page, activeTab }]);
    setPage(p);
    if (t) setActiveTab(t);
  };

  const handleBack = () => {
    if (navHistory.length > 0) {
      const last = navHistory[navHistory.length - 1];
      setNavHistory(prev => prev.slice(0, -1));
      setPage(last.page);
      setActiveTab(last.activeTab);
    } else {
      setPage('home');
      setActiveTab('home');
    }
  };

  /* ─── HANDLERS ─── */
  const handleSearch = (q, filter) => {
    setSearchQuery(q);
    navigateTo('listings', 'explore');
  };

  const handleCityClick = (city) => {
    setSearchCity(city === 'all' ? 'India' : city);
    navigateTo('listings', 'explore');
  };

  const handleTabChange = (tab) => {
    if (tab === 'home') navigateTo('home', 'home');
    else if (tab === 'explore') navigateTo('listings', 'explore');
    else if (tab === 'saved') navigateTo('listings', 'saved');
    else if (tab === 'account') navigateTo('login', 'account');
  };

  const toggleFav = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCallNow = (property) => {
    const phone = property.phone || "+91 99000 00000";
    window.open(`tel:${phone}`);
  };

  const handleLogout = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error logging out:", error.message);
    else {
      setIsAdmin(false);
      setCurrentUser(null);
      setPage('home');
      setActiveTab('home');
      setNavHistory([]);
    }
  };

  const handleGoogleLogin = async () => {
    if (!supabase) return alert("Auth not configured");
    setAuthLoading(true);
    
    // Use the production URL if available, otherwise fallback to current origin
    const redirectURL = import.meta.env.PROD 
      ? 'https://my-property-app.onrender.com' 
      : window.location.origin;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: redirectURL,
        queryParams: {
          client_id: '677049830188-kd60t5igeu2dp62bgth6v1b5adbfadd0.apps.googleusercontent.com',
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });
    if (error) {
      console.error("Google login error:", error.message);
      alert(error.message);
    }
    setAuthLoading(false);
  };

  const handleFacebookLogin = async () => {
    if (!supabase) return alert("Auth not configured");
    setAuthLoading(true);
    
    const redirectURL = import.meta.env.PROD 
      ? 'https://my-property-app.onrender.com' 
      : window.location.origin;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: { 
        redirectTo: redirectURL,
      }
    });
    if (error) {
      console.error("Facebook login error:", error.message);
      alert(error.message);
    }
    setAuthLoading(false);
  };

  const handlePhoneLogin = async () => {
    await handleSendOtp();
  };

  const handleSendOtp = async () => {
    if (!supabase) return alert("Auth not configured");
    if (!phoneNumber) return alert("Please enter your phone number");
    setAuthLoading(true);
    
    // Format phone to E.164 if needed (+91 for India)
    let formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    
    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
    });
    
    if (error) {
      console.error("OTP send error:", error.message);
      alert(error.message);
    } else {
      setOtpSent(true);
      alert("OTP sent to your phone!");
    }
    setAuthLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!supabase) return alert("Auth not configured");
    if (!otp) return alert("Please enter the OTP");
    setAuthLoading(true);
    
    let formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
    
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      console.error("OTP verify error:", error.message);
      alert(error.message);
    } else {
      console.log("OTP login success:", data);
      setPage('home');
      setActiveTab('home');
      setNavHistory([]);
    }
    setAuthLoading(false);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!supabase) return alert("Auth not configured");
    setAuthLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: userPass,
    });
    if (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    } else {
      console.log("Login success:", data);
      setPage('home');
      setActiveTab('home');
    }
    setAuthLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!supabase) return alert("Auth not configured");
    setAuthLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPass,
      options: {
        data: { full_name: userName }
      }
    });
    if (error) {
      console.error("Registration error:", error.message);
      alert(error.message);
    } else {
      console.log("Registration success:", data);
      alert("Registration successful! Check your email for verification.");
      setAuthView('login');
    }
    setAuthLoading(false);
  };

  /* ─── LOADING & ERROR ─── */
  // We handle loading states within components now to avoid blank screens
  if (error && properties.length === 0) {
    return (
      <div className="loading-screen" style={{ color: 'var(--accent)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ marginBottom: '8px' }}>Oops! Something went wrong</h2>
        <p style={{ marginBottom: '24px', opacity: 0.8 }}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{ 
            padding: '12px 24px', 
            borderRadius: '12px', 
            background: 'var(--navy)', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="page-wrapper">

      {/* ─── TOP BAR ─── */}
      <TopAppBar
        page={page}
        city={searchCity}
        onBack={handleBack}
        onLogoClick={() => {
          setPage('home');
          setActiveTab('home');
          setNavHistory([]);
        }}
        onSignIn={() => navigateTo('login', 'account')}
        isAdmin={isAdmin}
        currentUser={currentUser}
        onLogout={handleLogout}
        onMenuToggle={() => setIsSidebarOpen(true)}
      />

      {/* ─── SIDEBAR ─── */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={(target) => {
          if (target === 'login') {
            navigateTo('login', 'account');
          } else if (target === 'buy' || target === 'rent' || target === 'plots' || target === 'projects') {
            navigateTo('listings', 'explore');
            if (target === 'plots') setSearchQuery('Plot');
            else setSearchQuery('');
          } else if (target === 'insights') {
            alert('Insights feature coming soon!');
          }
        }}
      />

      {/* ─── PAGES ─── */}
      <main className="mobile-page-content">

        {page === 'home' && (
          <>
            <Hero onSearch={handleSearch} onNavigateListings={() => navigateTo('listings', 'explore')} />
            <PromotionSlider />
            <PopularCities onCityClick={handleCityClick} />
            <FeaturedProperties
              properties={properties}
              favorites={favorites}
              onSave={toggleFav}
              onBookVisit={p => setVisitProp(p)}
              onCallNow={() => {}}
              onViewAll={() => { setPage('listings'); setActiveTab('explore'); }}
            />
          </>
        )}

        {page === 'listings' && (
          <PropertyListView
            properties={properties}
            favorites={favorites}
            onSave={toggleFav}
            onBookVisit={p => setVisitProp(p)}
            onCallNow={() => {}}
            searchQuery={searchQuery}
            city={searchCity}
            activeTab={activeTab}
          />
        )}

        {page === 'login' && (
          <div className="login-page-container">
            <div className="auth-modal-container full-page">
              {/* Left Column: Form */}
              <div className="auth-modal-left-v2">
                <div className="auth-form-wrapper-v2">
                  <h1 className="auth-title-v2">{authView === 'login' ? 'Log in' : 'Create Account'}</h1>
                  
                  {authView === 'login' ? (
                    <>
                      <div className="auth-social-v2">
                        <button className="btn-social-v2 google" onClick={handleGoogleLogin}>
                          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
                          Continue with Google
                        </button>
                        <div className="social-row-v2">
                          <button className="btn-social-v2 small" onClick={() => setOtpSent(false)}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81 19.79 19.79 0 0 1 .1 1.18 2 2 0 0 1 2.11 0h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z"/></svg>
                            Phone
                          </button>
                          <button className="btn-social-v2 small" onClick={handleFacebookLogin}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            Facebook
                          </button>
                        </div>
                      </div>

                      <div className="auth-divider-v2">
                        <span>or</span>
                      </div>

                      <div className="auth-form-v2">
                        {!otpSent ? (
                          <>
                            <div className="input-group-v2">
                              <label>Email Address / Phone</label>
                              <input 
                                type="text" 
                                placeholder="Email or Phone (e.g. +91...)"
                                value={userEmail.includes('@') ? userEmail : phoneNumber}
                                onChange={e => {
                                  const val = e.target.value;
                                  if (val.includes('@')) {
                                    setUserEmail(val);
                                    setPhoneNumber('');
                                  } else {
                                    setPhoneNumber(val);
                                    setUserEmail('');
                                  }
                                }}
                              />
                            </div>
                            
                            {userEmail.includes('@') && (
                              <div className="input-group-v2">
                                <label>Password</label>
                                <div className="password-wrapper-v2">
                                  <input 
                                    type="password" 
                                    placeholder="Enter your password"
                                    value={userPass}
                                    onChange={e => setUserPass(e.target.value)}
                                  />
                                  <button className="btn-show-pass">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                  </button>
                                </div>
                              </div>
                            )}

                            <div className="auth-options-v2">
                              <label className="checkbox-label-v2">
                                <input type="checkbox" />
                                <span>Keep me logged in</span>
                              </label>
                              {userEmail.includes('@') && <button className="btn-forgot-v2">Forgot password?</button>}
                            </div>

                            <button className="btn-submit-v2" onClick={userEmail.includes('@') ? handleEmailLogin : handlePhoneLogin}>
                              {userEmail.includes('@') ? 'Log in' : 'Send OTP'}
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="input-group-v2">
                              <label>Verify OTP</label>
                              <input 
                                type="text" 
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                              />
                            </div>
                            <button className="btn-submit-v2" onClick={handleVerifyOtp}>
                              Verify & Login
                            </button>
                            <button className="btn-forgot-v2" style={{ marginTop: '12px' }} onClick={() => setOtpSent(false)}>
                              Back to Login
                            </button>
                          </>
                        )}

                        <p className="auth-footer-v2">
                          Our <a href="#">privacy policy</a> applies.
                        </p>

                        <div className="auth-switch-v2">
                          New to Narayana? <button onClick={() => setAuthView('register')}>Create Account</button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="auth-form-v2">
                      <div className="input-group-v2">
                        <label>Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Your Name"
                          value={userName}
                          onChange={e => setUserName(e.target.value)}
                        />
                      </div>
                      <div className="input-group-v2">
                        <label>Email Address</label>
                        <input 
                          type="email" 
                          placeholder="name@example.com"
                          value={userEmail}
                          onChange={e => setUserEmail(e.target.value)}
                        />
                      </div>
                      <div className="input-group-v2">
                        <label>Password</label>
                        <input 
                          type="password" 
                          placeholder="Minimum 6 characters"
                          value={userPass}
                          onChange={e => setUserPass(e.target.value)}
                        />
                      </div>

                      <button className="btn-submit-v2" onClick={handleRegister}>
                        Create Account
                      </button>

                      <div className="auth-switch-v2">
                        Already have an account? <button onClick={() => setAuthView('login')}>Log in</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Features */}
              <div className="auth-modal-right-v2">
                <div className="auth-illustration-v2">
                  <img src="/image/login.png" alt="Welcome" />
                </div>
                <div className="auth-features-v2">
                  <div className="feature-item-v2">
                    <div className="feature-icon-v2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p>Personal dashboard with <strong>monthly value check</strong> for your home</p>
                  </div>
                  <div className="feature-item-v2">
                    <div className="feature-icon-v2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p>Save your favorite homes and receive updates</p>
                  </div>
                  <div className="feature-item-v2">
                    <div className="feature-icon-v2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p>Always the latest houses in your inbox with saved searches</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />

      {/* ─── PROPERTY COUNT FAB (mobile) ─── */}
      {page === 'home' && properties.length > 0 && (
        <button className="prop-count-fab" onClick={() => navigateTo('listings', 'explore')}>
          <div className="prop-count-info">
            <span className="prop-count-num">{properties.length}</span>
            <span className="prop-count-label">Properties</span>
          </div>
          <div className="prop-count-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </button>
      )}

      {/* ─── BOTTOM NAV (mobile) ─── */}
      {page !== 'login' && <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />}

      {/* ─────────── MODALS ─────────── */}

      {/* Book Visit Modal */}
      {visitProp && (
        <Modal title="Book a Site Visit" onClose={() => setVisitProp(null)}>
          <div style={{ marginBottom: '24px' }}>
            <p style={{ color: 'var(--navy)', fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>
              {visitProp.name || visitProp.address}
            </p>
            <p style={{ color: 'var(--slate)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {visitProp.location || visitProp.postal}
            </p>
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            onSubmit={e => { e.preventDefault(); alert('Visit booked! We\'ll contact you shortly.'); setVisitProp(null); }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Full Name</label>
              <input required placeholder="Enter your name" style={inputCss} />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Phone Number</label>
              <input required type="tel" placeholder="+91 00000 00000" style={inputCss} />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Preferred Date</label>
              <input required type="date" style={inputCss} min={new Date().toISOString().split('T')[0]} />
            </div>
            <button type="submit" className="btn-confirm-booking">
              Confirm Booking
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}