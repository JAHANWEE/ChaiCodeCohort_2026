import { useState, useEffect, useCallback } from 'react'

const BASE = 'https://api.freeapi.app/api/v1/users'

function authHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export function useAuth() {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [flash, setFlash]     = useState(null)   // { type: 'success'|'error', text }
  const [view, setView]       = useState('login') // 'login' | 'register' | 'profile'

  // Flash auto-dismiss
  function showFlash(type, text) {
    setFlash({ type, text })
    setTimeout(() => setFlash(null), 4500)
  }

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    fetch(`${BASE}/current-user`, { headers: authHeaders() })
      .then(r => r.json())
      .then(d => {
        if (d.data) { setUser(d.data); setView('profile') }
        else { localStorage.removeItem('token') }
      })
      .catch(() => localStorage.removeItem('token'))
  }, [])

  const login = useCallback(async ({ username, password }) => {
    setLoading(true)
    try {
      const res  = await fetch(`${BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
      localStorage.setItem('token', data.data.accessToken)
      setUser(data.data.user)
      setView('profile')
    } catch (err) {
      showFlash('error', err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async ({ username, email, password }) => {
    setLoading(true)
    try {
      const res  = await fetch(`${BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role: 'USER' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Registration failed')
      showFlash('success', 'Account created! You can now sign in.')
      setView('login')
    } catch (err) {
      showFlash('error', err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await fetch(`${BASE}/logout`, { method: 'POST', headers: authHeaders() })
    } finally {
      localStorage.removeItem('token')
      setUser(null)
      setView('login')
      setLoading(false)
    }
  }, [])

  return { user, loading, flash, view, setView, login, register, logout }
}
