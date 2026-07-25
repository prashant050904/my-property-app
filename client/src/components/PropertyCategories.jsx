
import { useRef } from 'react';

// Let's use the existing images we have in /image/ folder for categories
const categories = [
  {
    id: 1,
    name: 'Residential Apartment',
    count: '30,000+ Properties',
    color: '#FFF8E6', // Light Cream
    image: '/image/plot1.png'
  },
  {
    id: 2,
    name: 'Builder Floor',
    count: '15,000+ Properties',
    color: '#E6F3FF', // Light Blue
    image: '/image/plot2.png'
  },
  {
    id: 3,
    name: 'Residential Land',
    count: '20,000+ Properties',
    color: '#E8F5E9', // Light Green
    image: '/image/plot3.png'
  },
  {
    id: 4,
    name: 'Villa',
    count: '8,000+ Properties',
    color: '#FFF0E6', // Light Peach
    image: '/image/plot4.png'
  },
  {
    id: 5,
    name: 'Commercial Office',
    count: '12,000+ Properties',
    color: '#F5F5F5', // Light Grey
    image: '/image/plot5.png'
  },
  {
    id: 6,
    name: 'Plots',
    count: '25,000+ Properties',
    color: '#F0F4FF', // Light Lavender
    image: '/image/plot6.png'
  }
];

export default function PropertyCategories() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 700;
      if (direction === 'left') {
        scrollContainerRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollContainerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <section className="property-categories-section">
      <div className="property-categories-container">
        <div className="property-categories-header">
          <h2 className="property-categories-title">
            Apartments, Villas and more
          </h2>
          <p className="property-categories-subtitle">
            Explore properties by category
          </p>
        </div>

        <div className="property-categories-carousel-wrapper">
          <button
            className="carousel-nav-btn carousel-nav-left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="property-categories-carousel"
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                style={{ backgroundColor: category.color }}
              >
                <div className="category-card-content">
                  <h3 className="category-card-title">{category.name}</h3>
                  <p className="category-card-count">{category.count}</p>
                </div>
                <div className="category-card-image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-card-image"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-nav-btn carousel-nav-right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
