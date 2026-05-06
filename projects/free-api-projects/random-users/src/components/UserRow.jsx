import './UserRow.css'

const NAT_FLAG = (nat) => `https://flagcdn.com/24x18/${nat.toLowerCase()}.png`

export default function UserRow({ user, onSelect }) {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`

  return (
    <article
      className="ur"
      onClick={() => onSelect(user)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onSelect(user)}
      aria-label={`View profile of ${fullName}`}
    >
      <img src={user.picture.medium} alt={fullName} className="ur__avatar" loading="lazy" />

      <div className="ur__main">
        <div className="ur__top">
          <h3 className="ur__name">{fullName}</h3>
          <span className={`ur__gender ur__gender--${user.gender}`}>{user.gender}</span>
        </div>
        <p className="ur__sub">@{user.login.username} · {user.dob.age} yrs</p>
      </div>

      <div className="ur__detail ur__detail--email">
        <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
        {user.email}
      </div>

      <div className="ur__detail ur__detail--loc">
        <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
        </svg>
        {user.location.city}, {user.location.country}
        <img
          src={NAT_FLAG(user.nat)}
          alt={user.nat}
          className="ur__flag"
          onError={e => { e.target.style.display = 'none' }}
        />
      </div>

      <svg className="ur__arrow" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
      </svg>
    </article>
  )
}
