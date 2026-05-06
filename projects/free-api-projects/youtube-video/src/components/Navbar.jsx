import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List']

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      {/* Left: logo + nav links */}
      <div className="navbar__left">
        {/* Netflix-style wordmark in red */}
        <a href="/" className="navbar__logo" aria-label="ViewTube home">
          <svg viewBox="0 0 111 30" className="navbar__logo-svg" aria-hidden="true">
            <path
              fill="var(--nf-red)"
              d="M105.06 0l-8.4 24.28L88.26 0H79.2l12.6 30-12.6 30h9.06l8.4-24.28L104.66 60h9.06L101.12 30 113.72 0h-8.66zM66.06 0v60h8.4V0h-8.4zM0 0v60h8.4V34.8L24.48 60h10.08L18.48 34.8 34.56 0H24.48L8.4 25.2V0H0zM44.52 0v60h22.68v-7.8H52.92V0h-8.4z"
            />
          </svg>
        </a>

        <nav className="navbar__nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="/"
              className={`navbar__nav-link${link === 'Home' ? ' active' : ''}`}
              onClick={(e) => e.preventDefault()}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      {/* Right: search + bell + avatar */}
      <div className="navbar__right">
        {/* search */}
        <div className="navbar__search-wrap">
          <button className="navbar__icon-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </div>

        {/* bell */}
        <button className="navbar__icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
        </button>

        {/* avatar */}
        <div className="navbar__profile">
          <div className="navbar__avatar" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" className="navbar__caret">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>
    </header>
  )
}

export default Navbar
