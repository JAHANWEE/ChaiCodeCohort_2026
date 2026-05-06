import './HeroStrip.css'

export default function HeroStrip({ total }) {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__text">
          <h1 className="hero__title">
            What are we <span className="hero__accent">cooking</span> today?
          </h1>
          <p className="hero__sub">
            Browse {total > 0 ? total.toLocaleString() : '293'} recipes from every corner of the globe.
            Find your next favourite meal.
          </p>
        </div>

        {/* decorative food emojis */}
        <div className="hero__emojis" aria-hidden="true">
          {['🍜','🥘','🍕','🍣','🥗','🍛','🌮','🍝'].map((e, i) => (
            <span key={i} className="hero__emoji" style={{ '--i': i }}>{e}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
