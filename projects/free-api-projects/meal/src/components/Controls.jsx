import './Controls.css'

export default function Controls({ search, onSearch, categories, category, onCategory, count, loading }) {
  return (
    <div className="ctrl">
      {/* Search */}
      <div className="ctrl__search-wrap">
        <svg className="ctrl__search-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          type="text"
          className="ctrl__search"
          placeholder="Search meals, cuisines, categories…"
          value={search}
          onChange={e => onSearch(e.target.value)}
          aria-label="Search meals"
        />
        {search && (
          <button className="ctrl__clear" onClick={() => onSearch('')} aria-label="Clear">✕</button>
        )}
      </div>

      {/* Category pills */}
      <div className="ctrl__cats" role="list" aria-label="Filter by category">
        {categories.map(cat => (
          <button
            key={cat}
            role="listitem"
            className={`ctrl__cat${cat === category ? ' active' : ''}`}
            onClick={() => onCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Result count */}
      {!loading && (
        <p className="ctrl__count">
          {count === 0 ? 'No meals found' : `${count} meal${count !== 1 ? 's' : ''}`}
        </p>
      )}
    </div>
  )
}
