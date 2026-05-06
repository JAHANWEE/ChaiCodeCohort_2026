import { useAuth } from './hooks/useAuth'
import FlashMessage from './components/FlashMessage'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ProfileView from './components/ProfileView'
import './App.css'

export default function App() {
  const { user, loading, flash, view, setView, login, register, logout } = useAuth()

  return (
    <div className="page">
      <div className="card">
        <p className="wordmark">auth.</p>

        <FlashMessage flash={flash} />

        {view === 'profile' ? (
          <ProfileView user={user} onLogout={logout} loading={loading} />
        ) : (
          <>
            <div className="tabs" role="tablist">
              <button
                role="tab"
                aria-selected={view === 'login'}
                className={`tab ${view === 'login' ? 'active' : ''}`}
                onClick={() => setView('login')}
              >
                Sign in
              </button>
              <button
                role="tab"
                aria-selected={view === 'register'}
                className={`tab ${view === 'register' ? 'active' : ''}`}
                onClick={() => setView('register')}
              >
                Register
              </button>
            </div>

            {view === 'login' && (
              <LoginForm onSubmit={login} loading={loading} onSwitch={() => setView('register')} />
            )}
            {view === 'register' && (
              <RegisterForm onSubmit={register} loading={loading} onSwitch={() => setView('login')} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
