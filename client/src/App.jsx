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

  const [page, setPage]                     = useState('home');  // 'home' | 'listings' | 'login'
  const [activeTab, setActiveTab]           = useState('home');
  const [searchQuery, setSearchQuery]       = useState('');
  const [searchCity, setSearchCity]         = useState('Mumbai');
  const [favorites, setFavorites]           = useState(new Set());
  const [isSidebarOpen, setIsSidebarOpen]   = useState(false);

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
    console.log("🌐 Fetching properties from https://my-property-app.onrender.com/api/properties");
    
    // We start with isLoading false and show what we have (or empty)
    // to avoid being stuck on a loading screen
    setIsLoading(false); 
    setError(null);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); 

    fetch('https://my-property-app.onrender.com/api/properties', { signal: controller.signal })
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

  /* ─── HANDLERS ─── */
  const handleSearch = (q, filter) => {
    setSearchQuery(q);
    setPage('listings');
    setActiveTab('explore');
  };

  const handleCityClick = (city) => {
    setSearchCity(city === 'all' ? 'India' : city);
    setPage('listings');
    setActiveTab('explore');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') setPage('home');
    else if (tab === 'explore') setPage('listings');
    else if (tab === 'saved') setPage('listings'); // We'll filter for saved in listings page or a new view
    else if (tab === 'account') setPage('login');
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
    }
  };

  const handleGoogleLogin = async () => {
    if (!supabase) return alert("Auth not configured");
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) {
      console.error("Google login error:", error.message);
      alert(error.message);
    }
    setAuthLoading(false);
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
        onBack={() => setPage('home')}
        onSignIn={() => setPage('login')}
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
            setPage('login');
          } else if (target === 'buy' || target === 'rent' || target === 'plots' || target === 'projects') {
            setPage('listings');
            setActiveTab('explore');
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
            <Hero onSearch={handleSearch} onNavigateListings={() => { setPage('listings'); setActiveTab('explore'); }} />
            <PromotionSlider />
            <PopularCities onCityClick={handleCityClick} />
            <FeaturedProperties
              properties={properties}
              favorites={favorites}
              onSave={toggleFav}
              onBookVisit={p => setVisitProp(p)}
              onCallNow={handleCallNow}
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
            onCallNow={handleCallNow}
            searchQuery={searchQuery}
            city={searchCity}
            activeTab={activeTab}
          />
        )}

        {page === 'login' && (
          <div className="login-page-container">
            <div className="auth-modal-container full-page">
              {/* Left Column: Scenic Image (Visible on Desktop) */}
              <div className="auth-modal-left">
                <img 
                  src="/image/login.png" 
                  alt="Dream Home" 
                  className="auth-image-bg"
                />
                <div className="auth-image-overlay">
                  <p className="auth-scene-text" style={{ fontSize: '16px', fontWeight: '600' }}>
                  </p>
                </div>
              </div>

              {/* Right Column: Perfected Form */}
              <div className="auth-modal-right">
                {authView === 'login' ? (
                  <>
                    <div className="auth-welcome-v6">
                      <h2>Hello!<strong>Welcome Back</strong></h2>
                    </div>

                    <div className="auth-form-v6" style={{ width: '100%', maxWidth: '320px' }}>
                      <div className="input-group-v6">
                        <label>Phone Number</label>
                        <input 
                          type="tel" 
                          required 
                          value={phoneNumber} 
                          onChange={e => setPhoneNumber(e.target.value)} 
                          placeholder="Enter your phone number" 
                          disabled={authLoading || otpSent}
                        />
                      </div>

                      {!otpSent ? (
                        <button type="button" className="btn-send-otp-v6" onClick={handleSendOtp} disabled={authLoading}>
                          {authLoading ? 'Sending...' : 'Send OTP'}
                        </button>
                      ) : (
                        <>
                          <div className="input-group-v6">
                            <label>OTP</label>
                            <input 
                              type="text" 
                              required 
                              value={otp} 
                              onChange={e => setOtp(e.target.value)} 
                              placeholder="Enter OTP" 
                              disabled={authLoading}
                            />
                          </div>
                          <button type="button" className="btn-verify-otp-v6" onClick={handleVerifyOtp} disabled={authLoading}>
                            {authLoading ? 'Verifying...' : 'Verify OTP'}
                          </button>
                        </>
                      )}
                    </div>

                    <div className="auth-divider-v6">
                      <span>OR</span>
                    </div>

                    <div className="auth-social-v6">
                      <button className="btn-google-v6" onClick={handleGoogleLogin} disabled={authLoading}>
                        <svg width="20" height="20" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span>{authLoading ? 'Please wait...' : 'Continue with Google'}</span>
                      </button>
                    </div>

                    <div className="auth-create-v6">
                      <span>New to Narayana?</span>
                      <button onClick={() => setAuthView('register')}>Quick Sign Up</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="auth-welcome-v6">
                      <h2>Join Us!<strong>Create Account</strong></h2>
                    </div>
                    <form className="auth-form-v6" onSubmit={handleRegister}>
                      <div className="input-group-v6">
                        <label>Full Name</label>
                        <input type="text" required value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter your name" disabled={authLoading} />
                      </div>

                      <div className="input-group-v6">
                        <label>Phone Number</label>
                        <input 
                          type="tel" 
                          required 
                          value={phoneNumber} 
                          onChange={e => setPhoneNumber(e.target.value)} 
                          placeholder="Enter your phone number" 
                          disabled={authLoading}
                        />
                      </div>

                      <button type="submit" className="btn-login-v6" disabled={authLoading}>
                        {authLoading ? 'Creating account...' : 'Register'}
                      </button>
                    </form>

                    <div className="auth-create-v6">
                      <span>Already have an account?</span>
                      <button onClick={() => setAuthView('login')}>Login</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />

      {/* ─── BOTTOM NAV (mobile) ─── */}
      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />

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