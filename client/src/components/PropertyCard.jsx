import { useState } from 'react';

const defaultImg = '/image/plot1.png';

const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#ef4444' : 'none'} stroke={filled ? '#ef4444' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const BedIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" />
  </svg>
);

const BathIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5H4" /><line x1="10" y1="5" x2="8" y2="5" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="7" y1="19" x2="7" y2="21" /><line x1="17" y1="19" x2="17" y2="21" />
  </svg>
);

const AreaIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function PropertyCard({ property, variant = 'list', saved, onSave, onBookVisit, onCallNow }) {
  const isPremium = variant === 'premium';
  const [imgLoaded, setImgLoaded] = useState(false);

  const formatPrice = (price) => {
    if (!price) return '₹N/A';
    if (typeof price === 'string' && price.includes('₹')) return price;
    const num = Number(price);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(0)} Lac`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const formatSqft = (size) => {
    if (!size) return '';
    if (typeof size === 'string' && (size.includes('SQFT') || size.includes('sq'))) return size;
    return `${Number(size).toLocaleString('en-IN')} sq ft`;
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onSave && onSave(property.id || property._id);
  };

  const handleBook = (e) => {
    e.stopPropagation();
    onBookVisit && onBookVisit(property);
  };

  const handleCall = (e) => {
    e.stopPropagation();
    onCallNow && onCallNow(property);
  };

  const beds = property.beds ?? (property.bhk ? parseInt(property.bhk) : null);
  const baths = property.baths ?? (beds ? Math.max(1, beds - 1) : null);
  const area = property.area || formatSqft(property.size || property.sqft);
  const statusBadge = property.isNew ? 'New' : property.possession?.includes('Ready') ? 'Ready' : property.propertyType;
  const imgSrc = property.img || property.image || defaultImg;

  return (
    <article
      className={`p-card ${isPremium ? 'premium' : ''} ${imgLoaded ? 'img-ready' : ''}`}
      tabIndex={0}
    >
      {/* Image */}
      <div className="p-card-image-wrap">
        {!imgLoaded && <div className="p-card-skeleton" aria-hidden="true" />}
        <img
          src={imgSrc}
          alt={property.name || property.address || 'Property'}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={(e) => { e.currentTarget.src = defaultImg; setImgLoaded(true); }}
          className="p-card-image"
        />

        {/* Top Row: Badges + Wishlist */}
        <div className="p-card-top-row" aria-hidden="false">
          <div className="p-card-badges">
            {statusBadge && (
              <span className={`p-card-badge ${property.isNew ? 'accent' : 'primary'}`}>
                {statusBadge}
              </span>
            )}
            {property.verified && (
              <span className="p-card-badge verified">
                <ShieldIcon />
                Verified
              </span>
            )}
          </div>
          <button
            className={`p-card-wishlist ${saved ? 'saved' : ''}`}
            onClick={handleSave}
            aria-label={saved ? 'Remove from saved' : 'Save property'}
          >
            <HeartIcon filled={saved} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-card-body">
        <div className="p-card-price-row">
          <div className="p-card-price">{formatPrice(property.price)}</div>
          {property.price && typeof property.price !== 'string' && (
            <div className="p-card-sqft">{formatSqft(property.size || property.sqft)}</div>
          )}
        </div>

        <h3 className="p-card-title" title={property.name || property.address}>
          {property.name || property.address}
        </h3>

        <div className="p-card-location" title="View on Map">
          <LocationIcon />
          <span className="p-card-location-text">
            {property.location || property.postal || 'Location N/A'}
          </span>
        </div>

        {/* Specs Row */}
        <div className="p-card-specs" role="list">
          {beds > 0 && (
            <div className="p-card-spec" role="listitem">
              <BedIcon />
              <span>{beds} Beds</span>
            </div>
          )}
          {baths > 0 && (
            <div className="p-card-spec" role="listitem">
              <BathIcon />
              <span>{baths} Baths</span>
            </div>
          )}
          {area && (
            <div className="p-card-spec" role="listitem">
              <AreaIcon />
              <span>{area}</span>
            </div>
          )}
        </div>

        {/* Extra Info */}
        {(property.possession || property.highlights) && (
          <div className="p-card-extras">
            {property.possession && (
              <span className="p-card-chip">
                <CalendarIcon />
                {property.possession}
              </span>
            )}
            {property.highlights && (
              <span className="p-card-chip highlight">
                ⚡ {property.highlights}
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="p-card-divider" aria-hidden="true" />

        {/* Actions */}
        <div className="p-card-actions">
          <button className="p-card-btn-primary" onClick={handleBook}>
            Book Visit
          </button>
          <button className="p-card-btn-secondary" onClick={handleCall} aria-label="Call agent" title="Call now">
            <PhoneIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
