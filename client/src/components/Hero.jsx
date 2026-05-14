import { useState } from 'react';

export default function Hero({ onSearch, onNavigateListings }) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Buy');
  const [isListening, setIsListening] = useState(false);
  const tabs = ['Buy', 'Rent', 'New Launch', 'Commercial', 'Plots/Land', 'Projects'];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch && onSearch(query, activeTab);
    onNavigateListings && onNavigateListings();
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

      <div className="hero-container-v9">
        {/* Hero Content */}
        <div className="hero-content-v9">
          <span className="hero-tag-v9">Premier Real Estate Platform</span>
          <h1 className="hero-title-v9">
            Discover Your<br />Perfect Sanctuary
          </h1>
          <p className="hero-subtitle-v9">
            Explore the finest selection of premium properties across India's most prestigious locations.
          </p>
        </div>

        {/* Fully Featured Search Bar V13 */}
        <div className="search-wrapper-v13">
          <form className="search-container-v13" onSubmit={handleSearch}>
            {/* Top Bar: Categories Integrated */}
            <div className="search-header-v13">
              <div className="tabs-row-v13">
                {tabs.map(tab => (
                  <button
                    key={tab}
                    type="button"
                    className={`tab-link-v13 ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                    {tab === 'New Launch' && <span className="dot-v13" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Bar: Search Inputs */}
            <div className="search-body-v13">
              {/* Segment 2: Search Input */}
              <div className="search-segment-v13 segment-input">
                <label>Location / Project</label>
                <div className="input-with-icon-v13">
                  <svg className="input-icon-v13" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <input
                    type="text"
                    placeholder={activeTab === 'Plots/Land' ? 'Search "Plots in North Bangalore"' : 'Search "Bungalow in South Mumbai"'}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="segment-divider-v13" />

              {/* Segment 3: Actions & Search */}
              <div className="search-segment-v13 segment-actions">
                <button type="submit" className="btn-main-search-v13">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
