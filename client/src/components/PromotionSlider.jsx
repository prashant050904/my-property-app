import React from 'react';

const PROMOTIONS = [
  {
    id: 1,
    title: "Luxury Villas in Goa",
    subtitle: "Experience beachfront living with exclusive 15% discount on booking.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    color: "#2563EB", // Bright Blue
    tag: "HOT OFFER"
  },
  {
    id: 2,
    title: "Affordable Flats in Delhi",
    subtitle: "2 & 3 BHK flats starting from ₹45 Lakhs. No hidden charges!",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    color: "#059669", // Green
    tag: "NEW LAUNCH"
  },
  {
    id: 3,
    title: "Commercial Spaces in Pune",
    subtitle: "Prime office spaces with 2 years free maintenance.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    color: "#DC2626", // Red
    tag: "LIMITED TIME"
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
