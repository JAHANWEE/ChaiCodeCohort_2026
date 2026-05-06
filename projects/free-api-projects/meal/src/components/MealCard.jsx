import { parseTags } from '../hooks/useMealDetail'
import './MealCard.css'

const AREA_FLAG = {
  American: '🇺🇸', British: '🇬🇧', Canadian: '🇨🇦', Chinese: '🇨🇳',
  Croatian: '🇭🇷', Dutch: '🇳🇱', Egyptian: '🇪🇬', Filipino: '🇵🇭',
  French: '🇫🇷', Greek: '🇬🇷', Indian: '🇮🇳', Irish: '🇮🇪',
  Italian: '🇮🇹', Jamaican: '🇯🇲', Japanese: '🇯🇵', Kenyan: '🇰🇪',
  Malaysian: '🇲🇾', Mexican: '🇲🇽', Moroccan: '🇲🇦', Polish: '🇵🇱',
  Portuguese: '🇵🇹', Russian: '🇷🇺', Spanish: '🇪🇸', Thai: '🇹🇭',
  Tunisian: '🇹🇳', Turkish: '🇹🇷', Ukrainian: '🇺🇦', Vietnamese: '🇻🇳',
}

const CAT_COLOR = {
  Beef: '#ef4444', Chicken: '#f97316', Dessert: '#ec4899',
  Lamb: '#a855f7', Miscellaneous: '#6366f1', Pasta: '#eab308',
  Pork: '#f43f5e', Seafood: '#06b6d4', Side: '#84cc16',
  Starter: '#14b8a6', Vegan: '#22c55e', Vegetarian: '#10b981',
  Breakfast: '#f59e0b', Goat: '#8b5cf6',
}

export default function MealCard({ meal, onSelect }) {
  const tags  = parseTags(meal)
  const flag  = AREA_FLAG[meal.strArea] || '🌍'
  const color = CAT_COLOR[meal.strCategory] || '#ff6b2b'

  return (
    <article
      className="mc"
      onClick={() => onSelect(meal)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(meal)}
      aria-label={`View recipe for ${meal.strMeal}`}
      style={{ '--cat-color': color }}
    >
      {/* Thumbnail */}
      <div className="mc__thumb-wrap">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="mc__thumb"
          loading="lazy"
        />
        {/* hover overlay */}
        <div className="mc__overlay">
          <span className="mc__overlay-text">View Recipe</span>
        </div>
        {/* category badge */}
        <span className="mc__cat-badge">{meal.strCategory}</span>
      </div>

      {/* Body */}
      <div className="mc__body">
        <div className="mc__meta">
          <span className="mc__area">{flag} {meal.strArea || 'World'}</span>
          {tags.slice(0, 2).map(t => (
            <span key={t} className="mc__tag">{t}</span>
          ))}
        </div>

        <h3 className="mc__name">{meal.strMeal}</h3>

        {meal.strInstructions && (
          <p className="mc__desc">
            {meal.strInstructions.replace(/\r\n/g, ' ').slice(0, 90)}…
          </p>
        )}

        <div className="mc__footer">
          <button className="mc__btn" tabIndex={-1} aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.396 0 2.7.37 3.8 1.016A7.968 7.968 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.969 7.969 0 0014.5 4c-1.396 0-2.7.37-3.8 1.016A7.968 7.968 0 009 4.804z"/>
            </svg>
            See Recipe
          </button>
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="mc__yt"
              onClick={e => e.stopPropagation()}
              aria-label="Watch on YouTube"
              title="Watch on YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
