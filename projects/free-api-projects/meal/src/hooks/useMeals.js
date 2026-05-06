import { useState, useEffect, useCallback } from 'react'

const API = 'https://api.freeapi.app/api/v1/public/meals'

export function useMeals(page, limit = 12) {
  const [meals, setMeals]           = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch(`${API}?page=${page}&limit=${limit}`)
      const json = await res.json()
      setMeals(json.data.data)
      setTotalPages(json.data.totalPages)
      setTotalItems(json.data.totalItems)
    } catch {
      setError('Could not load meals. Check your connection.')
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  useEffect(() => { load() }, [load])

  return { meals, loading, error, totalPages, totalItems, retry: load }
}
