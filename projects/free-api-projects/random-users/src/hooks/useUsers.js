import { useState, useEffect, useCallback } from 'react'

const API = 'https://api.freeapi.app/api/v1/public/randomusers'

export function useUsers(page, limit = 12) {
  const [users, setUsers]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const fetch_ = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch(`${API}?page=${page}&limit=${limit}`)
      const json = await res.json()
      setUsers(json.data.data)
      setTotalPages(json.data.totalPages)
      setTotalItems(json.data.totalItems)
    } catch {
      setError('Failed to load users. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  useEffect(() => { fetch_() }, [fetch_])

  return { users, loading, error, totalPages, totalItems, retry: fetch_ }
}
