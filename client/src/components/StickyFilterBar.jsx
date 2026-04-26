import { useState } from 'react';

export default function StickyFilterBar({ activeFilters, onFilterChange }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const filterOptions = {
    'Price Range': [
      'Under 20 Lac', 
      '20 Lac - 50 Lac', 
      '50 Lac - 1 Cr', 
      '1 Cr - 2 Cr', 
      '2 Cr - 5 Cr', 
      'Above 5 Cr'
    ],
    'BHK Type': ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'],
    'Property Type': [
      'Apartment', 
      'Independent House', 
      'Villa', 
      'Residential Plot', 
      'Agricultural Land', 
      'Commercial Space'
    ],
    'Possession': ['Ready to Move', 'Within 1 Year', 'Within 2 Years', '3+ Years'],
  };

  const toggleDropdown = (filter) => {
    if (openDropdown === filter) setOpenDropdown(null);
    else setOpenDropdown(filter);
  };

  const handleOptionClick = (filter, option) => {
    onFilterChange && onFilterChange(filter, option);
    setOpenDropdown(null);
  };

  return (
    <div className="filter-bar">
      <button className="filter-pill primary" onClick={() => onFilterChange && onFilterChange('all')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
        </svg>
        Reset
      </button>

      {Object.keys(filterOptions).map(f => (
        <div key={f} className="filter-dropdown-container">
          <button
            className={`filter-pill outline ${activeFilters && activeFilters[f] ? 'active' : ''}`}
            onClick={() => toggleDropdown(f)}
          >
            {activeFilters && activeFilters[f] ? activeFilters[f] : f}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px', transform: openDropdown === f ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          
          {openDropdown === f && (
            <div className="filter-dropdown-menu">
              {filterOptions[f].map(opt => (
                <div 
                  key={opt} 
                  className={`filter-dropdown-item ${activeFilters && activeFilters[f] === opt ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(f, opt)}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        className={`filter-pill outline ${activeFilters && activeFilters['Verified Only'] ? 'active' : ''}`}
        onClick={() => onFilterChange && onFilterChange('Verified Only', !activeFilters['Verified Only'])}
      >
        Verified Only
      </button>
    </div>
  );
}

