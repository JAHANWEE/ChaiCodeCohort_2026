import './HeroStrip.css';

export default function HeroStrip() {
  return (
    <section className="hero-strip">
      <div className="hero-glow hero-glow-left" />
      <div className="hero-glow hero-glow-right" />
      <div className="hero-content">
        <p className="hero-eyebrow">✦ Curated Collection</p>
        <h1 className="hero-title">
          Discover <span className="hero-gradient">Amazing</span> Products
        </h1>
        <p className="hero-sub">
          Browse our handpicked selection of top-rated items across every category.
        </p>
        <div className="hero-chips">
          <span className="chip">📱 Smartphones</span>
          <span className="chip">💻 Laptops</span>
          <span className="chip">💄 Beauty</span>
          <span className="chip">👗 Fashion</span>
          <span className="chip">🏠 Home</span>
        </div>
      </div>
    </section>
  );
}
