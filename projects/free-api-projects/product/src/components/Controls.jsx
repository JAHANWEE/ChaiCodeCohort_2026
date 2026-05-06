import { useState } from 'react';
import './Controls.css';

export default function Controls({ products, onFilter, onSort, onSearch, view, onViewChange }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [category, setCategory] = useState('all');

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    onSort(e.target.value);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    onFilter(cat);
  };

  return (
    <div className="controls">
      <div className="controls-top">
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            className="search-input"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
            aria-label="Search products"
          />
        </div>

        <div className="controls-right">
          <select className="sort-select" value={sort} onChange={handleSort} aria-label="Sort products">
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating-desc">Top Rated</option>
            <option value="discount-desc">Best Deals</option>
          </select>

          <div className="view-toggle" role="group" aria-label="View mode">
            <button
              className={`view-btn ${view === 'grid' ? 'active' : ''}`}
              onClick={() => onViewChange('grid')}
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              className={`view-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => onViewChange('list')}
              aria-label="List view"
              aria-pressed={view === 'list'}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="4" width="18" height="3" rx="1" />
                <rect x="3" y="10.5" width="18" height="3" rx="1" />
                <rect x="3" y="17" width="18" height="3" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {categories.length > 1 && (
        <div className="category-tabs" role="tablist" aria-label="Filter by category">
          {categories.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={category === cat}
              className={`cat-tab ${category === cat ? 'active' : ''}`}
              onClick={() => handleCategory(cat)}
            >
              {cat === 'all' ? '✦ All' : cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
