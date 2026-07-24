import { useState } from 'react';

export default function Hero({ onSearch, onNavigateListings }) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch && onSearch(query);
    onNavigateListings && onNavigateListings();
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
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
      // Auto-search after a short delay to let user see the text
      setTimeout(() => {
        onSearch && onSearch(transcript);
        onNavigateListings && onNavigateListings();
      }, 500);
    };

    recognition.start();
  };

  const handleOpenMap = () => {
    // Open Google Maps search for properties/plots based on current query or general real estate
    const searchQuery = query || "Properties and Plots in India";
    const url = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="hero-v9">
      {/* Dynamic Background */}
      <div className="hero-bg-v9">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" 
          alt="Premium Real Estate" 
          className="hero-bg-img"
        />
        <div className="hero-overlay-v9" />
      </div>

      {/* Fully Featured Search Bar like 99acres */}
      <div className="search-wrapper-v13">
        {/* Tabs */}
        <div className="search-tabs-v13">
          <button className="search-tab-v13 active">Buy</button>
          <button className="search-tab-v13">Rent</button>
          <button className="search-tab-v13">New Launch<span className="tab-dot"></span></button>
          <button className="search-tab-v13">Commercial</button>
          <button className="search-tab-v13">Plots/Land</button>
          <button className="search-tab-v13">Projects</button>
          <div className="search-tabs-divider"></div>
          <button className="search-tab-v13 post-property">
            Post Property <span className="tab-free">FREE</span>
          </button>
        </div>
        {/* Search Container */}
        <form className="search-container-v13" onSubmit={handleSearch}>
          <div className="search-body-v13">
            {/* Dropdown */}
            <div className="search-dropdown-v13">
              <button type="button" className="dropdown-btn-v13">
                <span>All Residential</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
            </div>
            <div className="search-input-divider"></div>
            {/* Search Input */}
            <div className="search-input-wrapper-v13">
              <svg className="input-icon-v13" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                type="text"
                placeholder='Search "PG in sector 74 noida"'
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            {/* Icons & Button */}
            <div className="search-actions-v13">
              <button 
                type="button" 
                className="util-btn-v13" 
                aria-label="Location"
                onClick={handleOpenMap}
                title="View all on map"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3m10-10h-3M5 12H2"/></svg>
              </button>
              <button 
                type="button" 
                className={`util-btn-v13 ${isListening ? 'listening' : ''}`} 
                aria-label="Voice"
                onClick={handleVoiceSearch}
                title="Voice search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isListening ? (
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="var(--blue)" />
                  ) : (
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  )}
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </button>
              <button type="submit" className="btn-main-search-v13">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
