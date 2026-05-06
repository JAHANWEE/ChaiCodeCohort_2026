import './FilterBar.css'

// Fixed set of 4 filters — always visible, no overflow
const FIXED_TAGS = ['All', 'Inspirational', 'Motivational', 'Wisdom']

function FilterBar({ search, onSearch, tags, activeTag, onTag }) {
  // Use fixed tags but fall back to dynamic ones if none of the fixed tags exist in data
  const hasDynamic = tags.some(t => FIXED_TAGS.slice(1).includes(t))
  const displayTags = hasDynamic ? FIXED_TAGS : ['All', ...tags.slice(1, 4)]

  return (
    <div className="fb">
      {/* Search */}
      <div className="fb__search-wrap">
        <svg className="fb__search-icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          type="text"
          className="fb__search"
          placeholder="Search quotes or authors…"
          value={search}
          onChange={e => onSearch(e.target.value)}
          aria-label="Search quotes"
        />
        {search && (
          <button className="fb__clear" onClick={() => onSearch('')} aria-label="Clear search">✕</button>
        )}
      </div>

      {/* Tag pills — max 4 */}
      <div className="fb__tags" role="list" aria-label="Filter by tag">
        {displayTags.map(tag => (
          <button
            key={tag}
            role="listitem"
            className={`fb__tag${tag === activeTag ? ' active' : ''}`}
            onClick={() => onTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar
