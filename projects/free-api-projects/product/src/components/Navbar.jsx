import './Navbar.css';

export default function Navbar({ totalItems }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="brand-icon">🛍️</span>
          <span className="brand-name">ShopVerse</span>
          <span className="brand-badge">Dark Edition</span>
        </div>
        <div className="navbar-meta">
          {totalItems > 0 && (
            <span className="total-count">
              <span className="count-dot" />
              {totalItems} products
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
