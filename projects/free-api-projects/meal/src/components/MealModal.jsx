import { useEffect } from 'react'
import { parseIngredients, parseTags } from '../hooks/useMealDetail'
import './MealModal.css'

const AREA_FLAG = {
  American: '🇺🇸', British: '🇬🇧', Canadian: '🇨🇦', Chinese: '🇨🇳',
  Croatian: '🇭🇷', Dutch: '🇳🇱', Egyptian: '🇪🇬', Filipino: '🇵🇭',
  French: '🇫🇷', Greek: '🇬🇷', Indian: '🇮🇳', Irish: '🇮🇪',
  Italian: '🇮🇹', Jamaican: '🇯🇲', Japanese: '🇯🇵', Kenyan: '🇰🇪',
  Malaysian: '🇲🇾', Mexican: '🇲🇽', Moroccan: '🇲🇦', Polish: '🇵🇱',
  Portuguese: '🇵🇹', Russian: '🇷🇺', Spanish: '🇪🇸', Thai: '🇹🇭',
  Tunisian: '🇹🇳', Turkish: '🇹🇷', Ukrainian: '🇺🇦', Vietnamese: '🇻🇳',
}

export default function MealModal({ meal, onClose }) {
  const ingredients = parseIngredients(meal)
  const tags        = parseTags(meal)
  const flag        = AREA_FLAG[meal.strArea] || '🌍'

  // parse instructions into steps
  const steps = meal.strInstructions
    ? meal.strInstructions
        .split(/\r\n|\n/)
        .map(s => s.trim())
        .filter(s => s.length > 10)
    : []

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="mm__backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={meal.strMeal}>
      <div className="mm__panel" onClick={e => e.stopPropagation()}>

        {/* Hero image */}
        <div className="mm__hero">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="mm__hero-img" />
          <div className="mm__hero-vignette" />
          <button className="mm__close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <div className="mm__hero-info">
            <h2 className="mm__title">{meal.strMeal}</h2>
            <div className="mm__badges">
              <span className="mm__badge mm__badge--cat">{meal.strCategory}</span>
              <span className="mm__badge mm__badge--area">{flag} {meal.strArea || 'World'}</span>
              {tags.map(t => (
                <span key={t} className="mm__badge mm__badge--tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mm__body">
          {/* Action buttons */}
          <div className="mm__actions">
            {meal.strYoutube && (
              <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="mm__action-btn mm__action-btn--yt">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Watch on YouTube
              </a>
            )}
            {meal.strSource && (
              <a href={meal.strSource} target="_blank" rel="noopener noreferrer" className="mm__action-btn mm__action-btn--src">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                Original Source
              </a>
            )}
          </div>

          <div className="mm__cols">
            {/* Ingredients */}
            <section className="mm__section mm__section--ingredients">
              <h3 className="mm__section-title">
                <span>🧂</span> Ingredients
                <span className="mm__count">{ingredients.length}</span>
              </h3>
              <ul className="mm__ingredients">
                {ingredients.map((ing, i) => (
                  <li key={i} className="mm__ingredient">
                    <span className="mm__ing-dot" aria-hidden="true" />
                    <span className="mm__ing-name">{ing.name}</span>
                    {ing.measure && (
                      <span className="mm__ing-measure">{ing.measure}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions */}
            <section className="mm__section mm__section--steps">
              <h3 className="mm__section-title"><span>👨‍🍳</span> Instructions</h3>
              <ol className="mm__steps">
                {steps.map((step, i) => (
                  <li key={i} className="mm__step">
                    <span className="mm__step-num">{i + 1}</span>
                    <p className="mm__step-text">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
