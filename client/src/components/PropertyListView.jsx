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
];

export default function PropertyListView({ properties, favorites, onSave, onBookVisit, onCallNow, searchQuery, city }) {
  const [activeFilters, setActiveFilters] = useState([]);

  const allProps = useMemo(() => {
    const props = (properties && properties.length > 0)
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
        }))
      : SAMPLE_LISTINGS.map(p => ({ ...p, priceValue: p.price }));
    return props;
  }, [properties]);

  const handleFilterChange = (filter) => {
    if (filter === 'all') {
      setActiveFilters([]);
      return;
    }
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const filtered = useMemo(() => {
    let result = allProps;

    // Search Query
    if (searchQuery) {
      result = result.filter(p =>
        (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.location || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filters
    if (activeFilters.length > 0) {
      activeFilters.forEach(filter => {
        if (filter === 'Verified Only') {
          result = result.filter(p => p.verified);
        }
        if (filter === 'BHK Type') {
          // Just a sample: only show 3 BHK and above for this filter
          result = result.filter(p => {
            const bhkNum = parseInt(p.bhk);
            return bhkNum >= 3;
          });
        }
        if (filter === 'Price Range') {
          // Just a sample: show properties above 1 Cr
          result = result.filter(p => p.priceValue >= 10000000);
        }
        if (filter === 'Property Type') {
          result = result.filter(p => p.propertyType === 'Apartment' || p.propertyType === 'Penthouse');
        }
      });
    }

    return result;
  }, [allProps, searchQuery, activeFilters]);

  return (
    <div>
      <StickyFilterBar activeFilters={activeFilters} onFilterChange={handleFilterChange} />

      {/* Results header */}
      <div className="listings-header">
        <p className="results-label">Found {filtered.length.toLocaleString('en-IN')} properties</p>
        <div className="sort-row">
          <h2 className="results-title">
            {activeFilters.length > 0 ? 'Filtered Results' : 'Premium Listings'}
          </h2>
          <button className="btn-sort">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
            Sort by: Popularity
          </button>
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
