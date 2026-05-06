import './Navbar.css'

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__brand">
          <div className="nav__logo" aria-hidden="true">
            <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
              <rect width="36" height="36" rx="10" fill="var(--blue)" />
              <circle cx="18" cy="14" r="5" fill="white" />
              <path d="M8 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <span className="nav__title">PeopleHub</span>
            <span className="nav__sub">Random Users Explorer</span>
          </div>
        </div>

        <div className="nav__badge">
          <span className="nav__badge-dot" aria-hidden="true" />
          Live Data
        </div>
      </div>
    </header>
  )
}
