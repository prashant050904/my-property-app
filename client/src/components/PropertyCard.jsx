import { useState } from 'react';

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="10" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const MapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const BedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#ef4444' : 'none'} stroke={filled ? '#ef4444' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

export default function PropertyCard({ property, variant = 'list', saved, onSave, onBookVisit, onCallNow }) {
  const isFeatured = variant === 'featured';
  const [showFullDetails, setShowFullDetails] = useState(false);

  const formatPrice = (price) => {
    if (!price) return '₹N/A';
    if (typeof price === 'string' && price.includes('₹')) return price;
    const num = Number(price);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(0)} Lac`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const formatSqft = (size) => {
    if (!size) return '';
    if (typeof size === 'string' && size.includes('SQFT')) return size;
    return `${Number(size).toLocaleString('en-IN')} SQFT`;
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave && onSave(property.id || property._id);
  };

  const defaultImg = `https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80`;

  const handleOpenMap = (e) => {
    e.stopPropagation();
    const { lat, lng, name, address, location, postal } = property;
    const query = name || address || location || postal || 'Real Estate';
    const url = (lat && lng) 
      ? `https://www.google.com/maps?q=${lat},${lng}`
      : `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`prop-card ${isFeatured ? 'featured' : ''}`}>
      {/* Image */}
      <div className={`card-img-wrap ${isFeatured ? '' : 'sm'}`}>
        <img
          src={property.img || property.image || defaultImg}
          alt={property.name || property.address || 'Property'}
          loading="lazy"
          onError={e => { e.target.src = defaultImg; }}
        />
        {/* Verified badge */}
        {property.verified && (
          <div className="badge-verified">
            <ShieldIcon />
            Verified
          </div>
        )}
        {/* New Launch badge */}
        {property.isNew && (
          <div className="badge-new">New Launch</div>
        )}
        {/* Heart */}
        <button className={`heart-btn ${saved ? 'saved' : ''}`} onClick={handleSave} aria-label="Save property">
          <HeartIcon filled={saved} />
        </button>
      </div>

      {showFullDetails && (
        <div className="card-details-overlay" onClick={() => setShowFullDetails(false)}>
          <div className="details-content" onClick={e => e.stopPropagation()}>
            <div className="details-header">
              <h4>Property Details</h4>
              <button className="close-details" onClick={() => setShowFullDetails(false)}>×</button>
            </div>
            <ul className="details-list">
              <li><span>Owner Name:</span> <strong>{property.ownerName || 'Narayana Reddy'}</strong></li>
              <li><span>Price:</span> <strong>{formatPrice(property.price)}</strong></li>
              <li><span>Area:</span> <strong>{formatSqft(property.size || property.sqft)}</strong></li>
              <li><span>Location:</span> <strong>{property.location || property.postal || 'Gurumitkal'}</strong></li>
              {property.bhk && <li><span>BHK:</span> <strong>{property.bhk}</strong></li>}
              {property.possession && <li><span>Status:</span> <strong>{property.possession}</strong></li>}
              {property.amenitiesCount > 0 && <li><span>Amenities:</span> <strong>{property.amenitiesCount}+</strong></li>}
            </ul>

            <div className="details-about">
              <h5>About Gurumitkal</h5>
              <p>
                Gurumitkal is a developing town in the Yadgir district of Karnataka, 
                known for its peaceful environment, affordable living, and growing local infrastructure. 
                It offers a calm, community-focused lifestyle with access to essential amenities, 
                making it suitable for families and long-term residential investment.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="card-body">
        <div className="card-price-row">
          <div className="card-price">{formatPrice(property.price)}</div>
          <div className="card-sqft">{formatSqft(property.size || property.sqft)}</div>
        </div>

        <div className="card-name">{property.name || property.address}</div>

        <div className="card-extra-info">
          {property.possession && (
            <span className="extra-info-item">
              <CalendarIcon />
              {property.possession}
            </span>
          )}
          {property.amenitiesCount > 0 && (
            <span className="extra-info-item">
              <span style={{ fontSize: '10px' }}></span>
              {property.amenitiesCount}+ Amenities
            </span>
          )}
          {property.highlights && (
            <span className="extra-info-item highlight">
              <ZapIcon />
              {property.highlights}
            </span>
          )}
        </div>

        <div className="card-location" onClick={handleOpenMap} title="View on Map" style={{ cursor: 'pointer' }}>
          <LocationIcon />
          {property.location || property.postal || 'Location N/A'}
        </div>

        {/* BHK Chips */}
        <div className="card-chips">
          {property.bhk && (
            <span className="chip">
              <BedIcon />
              {property.bhk}
            </span>
          )}
          {property.propertyType && (
            <span className="chip">
              {property.propertyType.includes('Plot') || property.propertyType.includes('Land') ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ) : null}
              {property.propertyType}
            </span>
          )}
          {property.isEye && <span className="chip">★ Featured</span>}
        </div>

        {/* Actions */}
        <div className="card-actions">
          <button
            className="btn-book"
            onClick={(e) => { e.stopPropagation(); onBookVisit && onBookVisit(property); }}
          >
            Book Site Visit
          </button>
          <button
            className="btn-info"
            onClick={(e) => { e.stopPropagation(); setShowFullDetails(true); }}
            aria-label="View Details"
            title="View Details"
          >
            <InfoIcon />
          </button>
          <button
            className="btn-map"
            onClick={handleOpenMap}
            aria-label="View on Map"
            title="View on Map"
          >
            <MapIcon />
          </button>
          <button
            className="btn-call"
            onClick={(e) => { e.stopPropagation(); onCallNow && onCallNow(property); }}
            aria-label="Call now"
          >
            <PhoneIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
