import './SearchBar.css'

const GENDERS = [
  { value: 'all',    label: 'All' },
  { value: 'male',   label: '♂ Male' },
  { value: 'female', label: '♀ Female' },
]

const VIEW_ICONS = {
  grid: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  ),
}

export default function SearchBar({ value, onChange, gender, onGender, viewMode, onViewMode }) {
  return (
    <div className="sb">
      {/* Search input */}
      <div className="sb__search-wrap">
        <svg className="sb__icon" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
          <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          type="text"
          className="sb__input"
          placeholder="Search by name, email or country…"
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label="Search users"
        />
        {value && (
          <button className="sb__clear" onClick={() => onChange('')} aria-label="Clear">✕</button>
        )}
      </div>

      <div className="sb__right">
        {/* Gender filter */}
        <div className="sb__gender" role="group" aria-label="Filter by gender">
          {GENDERS.map(g => (
            <button
              key={g.value}
              className={`sb__gender-btn${gender === g.value ? ' active' : ''}`}
              onClick={() => onGender(g.value)}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="sb__view" role="group" aria-label="View mode">
          {['grid', 'list'].map(mode => (
            <button
              key={mode}
              className={`sb__view-btn${viewMode === mode ? ' active' : ''}`}
              onClick={() => onViewMode(mode)}
              aria-label={`${mode} view`}
              title={`${mode} view`}
            >
              {VIEW_ICONS[mode]}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
