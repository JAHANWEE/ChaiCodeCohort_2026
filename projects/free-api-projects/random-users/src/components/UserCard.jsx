import './UserCard.css'

const NAT_FLAG = (nat) => `https://flagcdn.com/24x18/${nat.toLowerCase()}.png`

const COVER_COLORS = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #fccb90, #d57eeb)',
  'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
]

function coverColor(id) {
  return COVER_COLORS[id % COVER_COLORS.length]
}

export default function UserCard({ user, onSelect }) {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`
  const age      = user.dob.age
  const city     = user.location.city
  const country  = user.location.country
  const email    = user.email
  const phone    = user.phone
  const username = user.login.username

  return (
    <article className="uc" onClick={() => onSelect(user)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(user)}
      aria-label={`View profile of ${fullName}`}
    >
      {/* Cover strip */}
      <div className="uc__cover" style={{ background: coverColor(user.id) }}>
        <div className="uc__cover-pattern" aria-hidden="true" />
      </div>

      {/* Avatar */}
      <div className="uc__avatar-wrap">
        <img
          src={user.picture.large}
          alt={fullName}
          className="uc__avatar"
          loading="lazy"
        />
        <span className={`uc__gender-dot uc__gender-dot--${user.gender}`} aria-label={user.gender} />
      </div>

      {/* Body */}
      <div className="uc__body">
        <h3 className="uc__name">{fullName}</h3>
        <p className="uc__username">@{username}</p>

        <div className="uc__chips">
          <span className="uc__chip uc__chip--age">{age} yrs</span>
          <span className="uc__chip uc__chip--nat">
            <img
              src={NAT_FLAG(user.nat)}
              alt={user.nat}
              className="uc__flag"
              onError={e => { e.target.style.display = 'none' }}
            />
            {user.nat}
          </span>
        </div>

        <div className="uc__info">
          <div className="uc__info-row">
            <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" className="uc__info-icon">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <span className="uc__info-text">{email}</span>
          </div>
          <div className="uc__info-row">
            <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" className="uc__info-icon">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <span className="uc__info-text">{phone}</span>
          </div>
          <div className="uc__info-row">
            <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13" className="uc__info-icon">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span className="uc__info-text">{city}, {country}</span>
          </div>
        </div>

        <button className="uc__cta" tabIndex={-1} aria-hidden="true">
          View Profile →
        </button>
      </div>
    </article>
  )
}
