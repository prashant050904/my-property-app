import { useState, useMemo } from 'react';
import PropertyCard from './PropertyCard';
import StickyFilterBar from './StickyFilterBar';
import ConciergeSection from './ConciergeSection';

const SAMPLE_LISTINGS = [
  {
    id: 'l1', name: 'Skyline Residences', location: 'Andheri West, Mumbai',
    price: 14500000, sqft: '1,450 SQFT', bhk: '3 BHK',
    propertyType: 'Apartment', verified: true, isNew: true,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
  },
  {
    id: 'l2', name: 'Oceanic Vista', location: 'Borivali East, Mumbai',
    price: 8500000, sqft: '980 SQFT', bhk: '2 BHK',
    propertyType: 'Apartment', verified: false,
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80'
  },
  {
    id: 'l3', name: 'The Marquee Heights', location: 'Worli, Mumbai',
    price: 21000000, sqft: '1,800 SQFT', bhk: '4 BHK',
    propertyType: 'Apartment', verified: true,
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'
  },
  {
    id: 'l4', name: 'Heritage Acres', location: 'Nelamangala, Bangalore',
    price: 3500000, sqft: '1,200 SQFT', bhk: '',
    propertyType: 'Plot', verified: true,
    img: '/image/plot3.png'
  },
  {
    id: 'l5', name: 'Green Field Valley', location: 'Hosur, Tamil Nadu',
    price: 1800000, sqft: '2,000 SQFT', bhk: '',
    propertyType: 'Plot', verified: true,
    img: '/image/plot4.png'
  },
];

export default function PropertyListView({ properties, favorites, onSave, onBookVisit, onCallNow, searchQuery, city, activeTab }) {
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState('Popularity'); // 'Popularity' | 'Price: Low to High' | 'Price: High to Low' | 'Newest'
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const allProps = useMemo(() => {
    let props = (properties && properties.length > 0)
      ? properties.map((p, i) => ({
          ...p,
          id: p._id || p.id || `p-${i}`,
          name: p.name || p.address,
          location: p.location || p.postal,
          sqft: p.sqft || (p.size ? `${p.size} SQFT` : ''),
          bhk: p.bhk || p.type,
          priceValue: Number(p.price) || 0,
          propertyType: p.propertyType || p.type || 'Property',
          verified: p.verified || p.isEye || false,
          possession: p.possession || 'Ready to Move',
          createdAt: p.createdAt || new Date().toISOString(),
        }))
      : SAMPLE_LISTINGS.map(p => ({ ...p, priceValue: p.price, possession: p.possession || 'Ready to Move', createdAt: new Date().toISOString() }));

    if (activeTab === 'saved') {
      props = props.filter(p => favorites && favorites.has(p.id));
    }
    return props;
  }, [properties, activeTab, favorites]);

  const handleFilterChange = (filter, option) => {
    if (filter === 'all') {
      setActiveFilters({});
      return;
    }
    setActiveFilters(prev => {
      const next = { ...prev };
      if (option === false || option === null || next[filter] === option) {
        delete next[filter];
      } else {
        next[filter] = option;
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = [...allProps];

    // Search Query
    if (searchQuery) {
      result = result.filter(p =>
        (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.location || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filters
    Object.entries(activeFilters).forEach(([filter, value]) => {
      if (filter === 'Verified Only' && value) {
        result = result.filter(p => p.verified);
      }
      if (filter === 'BHK Type') {
        result = result.filter(p => {
          if (value === '5+ BHK') return parseInt(p.bhk) >= 5;
          const targetBhk = value.split(' ')[0];
          return (p.bhk || '').includes(targetBhk);
        });
      }
      if (filter === 'Price Range') {
        result = result.filter(p => {
          if (value === 'Under 20 Lac') return p.priceValue < 2000000;
          if (value === '20 Lac - 50 Lac') return p.priceValue >= 2000000 && p.priceValue < 5000000;
          if (value === '50 Lac - 1 Cr') return p.priceValue >= 5000000 && p.priceValue < 10000000;
          if (value === '1 Cr - 2 Cr') return p.priceValue >= 10000000 && p.priceValue < 20000000;
          if (value === '2 Cr - 5 Cr') return p.priceValue >= 20000000 && p.priceValue < 50000000;
          if (value === 'Above 5 Cr') return p.priceValue >= 50000000;
          return true;
        });
      }
      if (filter === 'Property Type') {
        result = result.filter(p => (p.propertyType || '').toLowerCase().includes(value.toLowerCase()));
      }
      if (filter === 'Possession') {
        result = result.filter(p => (p.possession || '').toLowerCase().includes(value.toLowerCase().replace('within ', '')));
      }
    });

    // Sorting
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [allProps, searchQuery, activeFilters, sortBy]);

  const sortOptions = ['Popularity', 'Price: Low to High', 'Price: High to Low', 'Newest'];

  return (
    <div>
      <StickyFilterBar activeFilters={activeFilters} onFilterChange={handleFilterChange} />

      {/* Results header */}
      <div className="listings-header">
        <p className="results-label">Found {filtered.length.toLocaleString('en-IN')} properties</p>
        <div className="sort-row">
          <h2 className="results-title">
            {activeTab === 'saved' ? 'Your Favorites' : (Object.keys(activeFilters).length > 0 ? 'Filtered Results' : 'Premium Listings')}
          </h2>
          
          <div className="sort-container" style={{ position: 'relative' }}>
            <button className="btn-sort" onClick={() => setShowSortDropdown(!showSortDropdown)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
              </svg>
              Sort by: {sortBy}
            </button>
            
            {showSortDropdown && (
              <div className="filter-dropdown-menu" style={{ right: 0, left: 'auto', minWidth: '200px' }}>
                {sortOptions.map(opt => (
                  <div 
                    key={opt} 
                    className={`filter-dropdown-item ${sortBy === opt ? 'selected' : ''}`}
                    onClick={() => {
                      setSortBy(opt);
                      setShowSortDropdown(false);
                    }}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property List */}
      {filtered.length === 0 ? (
        <div className="no-results">
          <h3>No properties found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="listings-list">
          {filtered.map(p => (
            <PropertyCard
              key={p.id}
              property={p}
              variant="list"
              saved={favorites && favorites.has(p.id)}
              onSave={onSave}
              onBookVisit={onBookVisit}
              onCallNow={onCallNow}
            />
          ))}
        </div>
      )}

      {/* Concierge Section */}
      <ConciergeSection />
    </div>
  );
}
