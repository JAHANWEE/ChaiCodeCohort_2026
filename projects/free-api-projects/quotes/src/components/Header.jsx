import './Header.css'

function Header() {
  return (
    <header className="hdr">
      <div className="hdr__inner">
        <div className="hdr__logo">
          <span className="hdr__logo-mark">"</span>
          <span className="hdr__logo-text">Quotable</span>
        </div>
        <p className="hdr__tagline">Words that move the world</p>
      </div>

      <div className="hdr__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
            fill="var(--cream)"
          />
        </svg>
      </div>
    </header>
  )
}

export default Header
