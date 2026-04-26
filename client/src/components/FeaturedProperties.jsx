import PropertyCard from './PropertyCard';

const FEATURED_FALLBACK = [
  {
    id: 'f1', name: 'Premium Villa Plots', location: 'Devenahalli, Bangalore',
    price: '₹1.2 Cr', sqft: '2,400 SQFT', bhk: '',
    propertyType: 'Residential Plot', verified: true, isNew: true,
    possession: 'Ready to Move', amenitiesCount: 15, highlights: 'Near Highway',
    img: '/image/plot1.png'
  },
  {
    id: 'f2', name: 'The Sky Atrium', location: 'gurumitkal, Yadgir',
    price: '₹8.5 Cr', sqft: '3,200 SQFT', bhk: '4 BHK',
    propertyType: 'Penthouse', verified: true,
    possession: 'Ready in 2026', amenitiesCount: 25, highlights: 'Near Highway',
    img: '/image/plot2.png'
  },
  {
    id: 'f3', name: 'Green Valley Acres', location: 'gurumitkal, Yadgir-585201',
    price: '₹45 Lac', sqft: '5,000 SQFT', bhk: '',
    propertyType: 'Agricultural Land', verified: true,
    possession: 'Immediate Possession', amenitiesCount: 8, highlights: 'Near Highway',
    img: '/image/plot3.png'
  },
];

export default function FeaturedProperties({ properties, favorites, onSave, onBookVisit, onCallNow, onViewAll }) {
  const items = (properties && properties.length >= 3)
    ? properties.slice(0, 3).map(p => ({ ...p, verified: true }))
    : FEATURED_FALLBACK;

  return (
    <section className="section featured-bg">
      <div className="section-header">
        <div>
          <p className="section-label">Curated Selection</p>
          <h2 className="section-h2">Featured<br />Collections</h2>
        </div>
        <button className="btn-view-all" onClick={onViewAll}>
          View All
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div className="featured-grid">
        {items.map(p => (
          <PropertyCard
            key={p.id || p._id}
            property={p}
            variant="featured"
            saved={favorites && favorites.has(p.id || p._id)}
            onSave={onSave}
            onBookVisit={onBookVisit}
            onCallNow={onCallNow}
          />
        ))}
      </div>
    </section>
  );
}
