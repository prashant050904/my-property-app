import React from 'react';

const PROMOTIONS = [
  {
    id: 1,
    title: "Dream Home Deals",
    subtitle: "Up to 20% off on premium luxury apartments in Bangalore & Mumbai.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    color: "#005FAF", // Prime Blue
    tag: "ADVERTISEMENT"
  },
  {
    id: 2,
    title: "Zero Brokerage",
    subtitle: "Direct deals from owners. Rent or buy without paying any middleman fees.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    color: "#151C22", // Slate Dark
    tag: "PROMOTED"
  },
  {
    id: 3,
    title: "Smart Investment",
    subtitle: "High-yield commercial properties in upcoming business hubs. ROI up to 12%.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    color: "#000619", // Deep Navy
    tag: "SPONSORED"
  }
];

export default function PromotionSlider() {
  return (
    <section className="promo-section">
      <div className="section-header">
        <div>
          <p className="section-label" style={{ color: 'var(--blue)', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>Exclusive Offers</p>
          <h2 className="section-h2" style={{ fontSize: '32px', fontWeight: '800', color: 'var(--navy)' }}>Promotions & Ads</h2>
        </div>
      </div>
      
      <div className="promo-container">
        {PROMOTIONS.map((promo) => (
          <div 
            key={promo.id} 
            className="promo-card" 
            style={{ '--card-color': promo.color, backgroundColor: promo.color }}
          >
            <div className="promo-content">
              <span className="promo-tag">{promo.tag}</span>
              <h2 className="promo-title">{promo.title}</h2>
              <p className="promo-subtitle">{promo.subtitle}</p>
              <button className="promo-btn">Check Offer</button>
            </div>
            <div className="promo-image">
              <img src={promo.image} alt={promo.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
