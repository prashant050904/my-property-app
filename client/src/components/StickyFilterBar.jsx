export default function StickyFilterBar({ activeFilters, onFilterChange }) {
  const filters = ['Price Range', 'BHK Type', 'Property Type', 'Possession', 'Verified Only'];

  return (
    <div className="filter-bar">
      {/* Primary Filters button */}
      <button className="filter-pill primary" onClick={() => onFilterChange && onFilterChange('all')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
        </svg>
        Filters
      </button>

      {/* Outline filter pills */}
      {filters.map(f => (
        <button
          key={f}
          className={`filter-pill outline ${activeFilters && activeFilters.includes(f) ? 'active' : ''}`}
          onClick={() => onFilterChange && onFilterChange(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
