const categories = [
  {
    id: 1,
    title: 'Apartments',
    subtitle: '30,000+ Listings',
    color: '#ECFDF5',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <path d="M9 9v.01" />
        <path d="M9 12v.01" />
        <path d="M9 15v.01" />
        <path d="M9 18v.01" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Villas',
    subtitle: '8,500+ Listings',
    color: '#FFF7ED',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Plots',
    subtitle: '25,000+ Listings',
    color: '#FEF3C7',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Commercial',
    subtitle: '12,000+ Listings',
    color: '#EFF6FF',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M9 22V12h6v10" />
        <path d="M3 9h18" />
      </svg>
    )
  },
  {
    id: 5,
    title: 'PG / Co-living',
    subtitle: '15,000+ Listings',
    color: '#FAF5FF',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
];

export default function CategoryBar() {
  return (
    <section className="category-bar-section">
      <div className="category-bar-container">
        {categories.map((category) => (
          <div key={category.id} className="category-bar-item">
            <div
              className="category-bar-icon"
              style={{ backgroundColor: category.color, color: 'var(--primary)' }}
            >
              {category.icon}
            </div>
            <div className="category-bar-text">
              <h4 className="category-bar-title">{category.title}</h4>
              <p className="category-bar-subtitle">{category.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
