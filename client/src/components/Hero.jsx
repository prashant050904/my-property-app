import { useState, useEffect, useRef } from 'react';

const slides = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1800&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1800&q=80'
];

const SEARCH_TABS = ['Buy', 'Rent', 'Commercial', 'Projects'];

function AnimatedCounter({ end, duration = 2000, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted.current) {
            hasStarted.current = true;
            const startTime = performance.now();
            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(easeOut * end));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const ChevronLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const HomeTypeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const RupeeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3h12M6 8h12M6 13l9 8M12 3a5 5 0 0 1 0 10H6" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
);

const MicIcon = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill={active ? 'currentColor' : 'none'} />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const SparkleBadge = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }} aria-hidden="true">
    <path d="M12 2l1.6 4.5L18 8l-4.4 1.5L12 14l-1.6-4.5L6 8l4.4-1.5z" />
    <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z" />
  </svg>
);

export default function Hero({
  onSearch,
  onNavigateListings,
  // Controlled search state (shared with sticky bar at App level)
  query, setQuery,
  location, setLocation,
  propertyType, setPropertyType,
  budget, setBudget,
  activeTab, setActiveTab,
  onOpenMap
}) {
  const [isListening, setIsListening] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    const combined = [query, location, propertyType].filter(Boolean).join(' ');
    onSearch && onSearch(combined.trim() || query);
    onNavigateListings && onNavigateListings();
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice search is not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setTimeout(() => {
        onSearch && onSearch(transcript);
        onNavigateListings && onNavigateListings();
      }, 450);
    };
    recognition.start();
  };

  const handleOpenMap = onOpenMap || (() => {
    const searchQuery = query || location || 'Properties and Plots in India';
    const url = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
    window.open(url, '_blank');
  });

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="hero-premium">
      {/* Background Slideshow */}
      <div className="hero-premium-bg" aria-hidden="true">
        {slides.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt=""
            className={`hero-premium-bg-img ${idx === currentSlide ? 'active' : ''}`}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="hero-premium-overlay" />
        <div className="hero-premium-gradient" />
      </div>

      {/* Slider Arrows */}
      <button className="hero-arrow hero-arrow-left" onClick={prevSlide} aria-label="Previous slide">
        <ChevronLeft />
      </button>
      <button className="hero-arrow hero-arrow-right" onClick={nextSlide} aria-label="Next slide">
        <ChevronRight />
      </button>

      {/* Slide Indicators */}
      <div className="hero-premium-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`hero-premium-dot ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Hero Content Wrapper */}
      <div className="hero-premium-inner">
        <div className="hero-premium-content">
          {/* Left Content */}
          <div className="hero-premium-left">
            <span className="hero-premium-badge">
              <SparkleBadge />
              Narayana Real Estate
            </span>
            <h1 className="hero-premium-heading">
              Discover Your <span className="hero-premium-accent">Dream Home</span> In Premium Locations
            </h1>
            <p className="hero-premium-subtitle">
              Explore handpicked apartments, villas, plots, and commercial spaces across India's
              most sought-after neighbourhoods. Begin your journey to exceptional living today.
            </p>
            <div className="hero-premium-cta-row">
              <button
                className="hero-btn-primary"
                onClick={() => { onNavigateListings && onNavigateListings(); }}
              >
                Browse Properties
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }} aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="hero-btn-secondary" onClick={handleOpenMap}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }} aria-hidden="true">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                View on Map
              </button>
            </div>

            {/* Floating Stats Glass Card */}
            <div className="hero-stats-premium">
              <div className="hero-stat-premium">
                <div className="hero-stat-number-premium">
                  <AnimatedCounter end={10000} suffix="+" />
                </div>
                <div className="hero-stat-label-premium">Properties Listed</div>
              </div>
              <div className="hero-stat-divider-premium" aria-hidden="true" />
              <div className="hero-stat-premium">
                <div className="hero-stat-number-premium">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <div className="hero-stat-label-premium">Verified Agents</div>
              </div>
              <div className="hero-stat-divider-premium" aria-hidden="true" />
              <div className="hero-stat-premium">
                <div className="hero-stat-number-premium">
                  <AnimatedCounter end={250} suffix="+" />
                </div>
                <div className="hero-stat-label-premium">Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlapping Search Card */}
      <div className="search-premium-wrapper">
        <div className="search-premium-card">
          {/* Tabs */}
          <div className="search-premium-tabs" role="tablist">
            {SEARCH_TABS.map((t, idx) => (
              <button
                key={t}
                role="tab"
                aria-selected={activeTab === idx}
                className={`search-premium-tab ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                {t}
                {idx === 2 && <span className="search-tab-dot" aria-hidden="true" />}
              </button>
            ))}
          </div>

          {/* Search Row */}
          <form className="search-premium-row" onSubmit={handleSearch}>
            {/* Location */}
            <div className="search-field">
              <div className="search-field-icon" aria-hidden="true">
                <PinIcon />
              </div>
              <div className="search-field-body">
                <label className="search-field-label" htmlFor="sp-location">Location</label>
                <input
                  id="sp-location"
                  className="search-field-input"
                  type="text"
                  placeholder="City, area, or project"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="search-premium-divider" aria-hidden="true" />

            {/* Property Type */}
            <div className="search-field selectable">
              <div className="search-field-icon" aria-hidden="true">
                <HomeTypeIcon />
              </div>
              <div className="search-field-body">
                <label className="search-field-label" htmlFor="sp-type">Property Type</label>
                <select
                  id="sp-type"
                  className="search-field-input"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option>All Residential</option>
                  <option>Apartment / Flat</option>
                  <option>Villa / House</option>
                  <option>Plot / Land</option>
                  <option>Builder Floor</option>
                  <option>Commercial Office</option>
                  <option>Retail / Shop</option>
                  <option>PG / Co-living</option>
                </select>
                <span className="select-chevron" aria-hidden="true"><ChevronDown /></span>
              </div>
            </div>

            <div className="search-premium-divider" aria-hidden="true" />

            {/* Budget */}
            <div className="search-field selectable">
              <div className="search-field-icon" aria-hidden="true">
                <RupeeIcon />
              </div>
              <div className="search-field-body">
                <label className="search-field-label" htmlFor="sp-budget">Budget</label>
                <select
                  id="sp-budget"
                  className="search-field-input"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option>Any Budget</option>
                  <option>Under 20 Lac</option>
                  <option>20 Lac - 50 Lac</option>
                  <option>50 Lac - 1 Cr</option>
                  <option>1 Cr - 2 Cr</option>
                  <option>2 Cr - 5 Cr</option>
                  <option>5 Cr - 10 Cr</option>
                  <option>Above 10 Cr</option>
                </select>
                <span className="select-chevron" aria-hidden="true"><ChevronDown /></span>
              </div>
            </div>

            <div className="search-premium-divider" aria-hidden="true" />

            {/* Query (compact) */}
            <div className="search-field query-field">
              <div className="search-field-icon" aria-hidden="true">
                <SearchIcon />
              </div>
              <div className="search-field-body">
                <label className="search-field-label" htmlFor="sp-query">Keyword</label>
                <input
                  id="sp-query"
                  className="search-field-input"
                  type="text"
                  placeholder="Search by name..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="search-premium-actions">
              <button
                type="button"
                aria-label="View all on map"
                onClick={handleOpenMap}
                className="search-premium-util"
                title="View all on map"
              >
                <MapIcon />
              </button>
              <button
                type="button"
                aria-label="Voice search"
                onClick={handleVoiceSearch}
                className={`search-premium-util ${isListening ? 'listening' : ''}`}
                title="Voice search"
              >
                <MicIcon active={isListening} />
              </button>
              <button type="submit" className="search-premium-btn">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
