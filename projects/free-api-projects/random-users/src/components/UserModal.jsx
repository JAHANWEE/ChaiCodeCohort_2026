import { useEffect } from 'react'
import './UserModal.css'

const NAT_FLAG = (nat) => `https://flagcdn.com/32x24/${nat.toLowerCase()}.png`

function InfoRow({ icon, label, value }) {
  return (
    <div className="um__row">
      <span className="um__row-icon" aria-hidden="true">{icon}</span>
      <div className="um__row-body">
        <span className="um__row-label">{label}</span>
        <span className="um__row-value">{value}</span>
      </div>
    </div>
  )
}

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

export default function UserModal({ user, onClose }) {
  const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`
  const cover    = COVER_COLORS[user.id % COVER_COLORS.length]
  const dob      = new Date(user.dob.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const registered = new Date(user.registered.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  const address  = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country} ${user.location.postcode}`

  // close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="um__backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Profile of ${fullName}`}>
      <div className="um__panel" onClick={e => e.stopPropagation()}>

        {/* Cover */}
        <div className="um__cover" style={{ background: cover }}>
          <button className="um__close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Avatar + name */}
        <div className="um__hero">
          <div className="um__avatar-wrap">
            <img src={user.picture.large} alt={fullName} className="um__avatar" />
            <span className={`um__gender-dot um__gender-dot--${user.gender}`} />
          </div>
          <div className="um__hero-text">
            <h2 className="um__name">{fullName}</h2>
            <p className="um__username">@{user.login.username}</p>
            <div className="um__badges">
              <span className={`um__badge um__badge--${user.gender}`}>{user.gender}</span>
              <span className="um__badge um__badge--nat">
                <img src={NAT_FLAG(user.nat)} alt={user.nat} className="um__flag"
                  onError={e => { e.target.style.display = 'none' }} />
                {user.nat}
              </span>
              <span className="um__badge um__badge--age">{user.dob.age} years old</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="um__sections">
          <section className="um__section">
            <h3 className="um__section-title">Contact</h3>
            <InfoRow icon="✉️" label="Email"  value={user.email} />
            <InfoRow icon="📞" label="Phone"  value={user.phone} />
            <InfoRow icon="📱" label="Cell"   value={user.cell} />
          </section>

          <section className="um__section">
            <h3 className="um__section-title">Location</h3>
            <InfoRow icon="🏠" label="Address"  value={address} />
            <InfoRow icon="🕐" label="Timezone" value={`${user.location.timezone.offset} — ${user.location.timezone.description}`} />
            <InfoRow icon="🗺️" label="Coordinates" value={`${user.location.coordinates.latitude}, ${user.location.coordinates.longitude}`} />
          </section>

          <section className="um__section">
            <h3 className="um__section-title">Account</h3>
            <InfoRow icon="👤" label="Username"   value={user.login.username} />
            <InfoRow icon="🎂" label="Birthday"   value={`${dob} (age ${user.dob.age})`} />
            <InfoRow icon="📅" label="Registered" value={`${registered} (${user.registered.age} years ago)`} />
          </section>
        </div>

      </div>
    </div>
  )
}
