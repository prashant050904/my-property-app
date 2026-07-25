import { useEffect, useRef } from 'react';
import PropertyCard from './PropertyCard';

const FEATURED_FALLBACK = [
  {
    id: 'f1', name: 'Lakeside Villa, Whitefield', location: 'Whitefield, Bangalore',
    price: 48000000, size: 4200, beds: 5, baths: 6, area: '4,200 sq ft',
    propertyType: 'Villa', verified: true, isNew: true,
    possession: 'Ready to Move', amenitiesCount: 32, highlights: 'Lake View',
    img: '/image/plot1.png',
  },
  {
    id: 'f2', name: 'Skyline Penthouse', location: 'Indiranagar, Bangalore',
    price: 92000000, size: 5600, beds: 4, baths: 5, area: '5,600 sq ft',
    propertyType: 'Penthouse', verified: true,
    possession: 'Ready in 2026', amenitiesCount: 40, highlights: 'Terrace Pool',
    img: '/image/plot2.png',
  },
  {
    id: 'f3', name: 'Green Valley Plots', location: 'Devanahalli, Bangalore',
    price: 8500000, size: 2400, beds: 0, baths: 0, area: '2,400 sq ft',
    propertyType: 'Residential Plot', verified: true,
    possession: 'Immediate Possession', amenitiesCount: 12, highlights: 'Near Airport',
    img: '/image/plot3.png',
  },
  {
    id: 'f4', name: 'Oceanfront Apartment', location: 'Marine Drive, Mumbai',
    price: 65000000, size: 3100, beds: 3, baths: 4, area: '3,100 sq ft',
    propertyType: 'Apartment', verified: true, isNew: true,
    possession: 'Ready to Move', amenitiesCount: 28, highlights: 'Sea Facing',
    img: '/image/plot4.png',
  },
];

export default function FeaturedProperties({ properties, favorites, onSave, onBookVisit, onCallNow, onViewAll }) {
  const items = (properties && properties.length >= 4)
    ? properties.slice(0, 4).map((p) => ({ ...p, verified: true }))
    : FEATURED_FALLBACK;

  const swipeRef = useRef(null);

  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e) => {
      isDown = true;
      el.classList.add('is-dragging');
      startX = (e.pageX ?? e.touches?.[0]?.pageX ?? 0) - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onEnd = () => { isDown = false; el.classList.remove('is-dragging'); };
    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = (e.pageX ?? e.touches?.[0]?.pageX ?? 0) - el.offsetLeft;
      const walk = (x - startX) * 1.15;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseleave', onEnd);
    el.addEventListener('mouseup', onEnd);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchend', onEnd);
    el.addEventListener('touchmove', onMove, { passive: false });
    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseleave', onEnd);
      el.removeEventListener('mouseup', onEnd);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchend', onEnd);
      el.removeEventListener('touchmove', onMove);
    };
  }, []);

  return (
    <section className="featured-premium-section section">
      <div className="featured-premium-header">
        <div>
          <span className="section-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }} aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Premium Listings
          </span>
          <h2 className="featured-premium-title">Featured Properties</h2>
          <p className="featured-premium-subtitle">
            Handpicked homes and investments for the discerning buyer.
          </p>
        </div>
        <button type="button" className="btn-view-all-premium" onClick={onViewAll}>
          View All
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Desktop / Tablet: Grid */}
      <div className="featured-premium-grid" role="list">
        {items.map((p) => (
          <div key={p.id || p._id} role="listitem">
            <PropertyCard
              property={p}
              variant="premium"
              saved={!!(favorites && favorites.has(p.id || p._id))}
              onSave={onSave}
              onBookVisit={onBookVisit}
              onCallNow={onCallNow}
            />
          </div>
        ))}
      </div>

      {/* Mobile: Swipeable rail */}
      <div className="featured-premium-swiper" ref={swipeRef} aria-hidden="false">
        {items.map((p) => (
          <div className="featured-premium-swiper-slide" key={`m-${p.id || p._id}`}>
            <PropertyCard
              property={p}
              variant="premium"
              saved={!!(favorites && favorites.has(p.id || p._id))}
              onSave={onSave}
              onBookVisit={onBookVisit}
              onCallNow={onCallNow}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
