const CITIES = [
  { name: 'Mumbai',    img: '/image/Mumbai.png' },
  { name: 'Delhi',     img: '/image/Delhi.png' },
  { name: 'Bangalore', img: '/image/Bengaluru.png' },
  { name: 'Hyderabad', img: '/image/Hyderabad.png' },
  { name: 'Chennai',   img: '/image/Chennai.png' },
];

export default function PopularCities({ onCityClick }) {
  return (
    <section className="section">
      <div className="section-header">
        <div>
          <p className="section-label">Location Excellence</p>
          <h2 className="section-h2">Popular<br />Cities</h2>
        </div>
        <button className="btn-view-all" onClick={() => onCityClick && onCityClick('all')}>
          View All
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <div className="cities-scroll">
        {CITIES.map(city => (
          <div
            key={city.name}
            className="city-item"
            onClick={() => onCityClick && onCityClick(city.name)}
          >
            <div className="city-img">
              <img src={city.img} alt={city.name} loading="lazy" />
            </div>
            <span className="city-name">{city.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
