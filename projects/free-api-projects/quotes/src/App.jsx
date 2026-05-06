import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import QuoteOfDay from './components/QuoteOfDay'
import FilterBar from './components/FilterBar'
import QuoteGrid from './components/QuoteGrid'
import Pagination from './components/Pagination'
import './App.css'

const API = 'https://api.freeapi.app/api/v1/public/quotes'

function App() {
  const [quotes, setQuotes]         = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [page, setPage]             = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch]         = useState('')
  const [activeTag, setActiveTag]   = useState('All')

  // hero quote — independent state so it can be refreshed without reloading the grid
  const [heroQuote, setHeroQuote]         = useState(null)
  const [heroLoading, setHeroLoading]     = useState(false)

  const [liked, setLiked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('liked') || '[]') }
    catch { return [] }
  })
  const [copied, setCopied] = useState(null)

  // ── fetch grid page ──
  const fetchQuotes = useCallback(async (pageNum) => {
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch(`${API}?page=${pageNum}&limit=20`)
      const json = await res.json()
      const data = json.data.data
      setQuotes(data)
      setTotalPages(json.data.totalPages)
      // seed hero with middle quote on first load only
      if (!heroQuote) {
        setHeroQuote(data[Math.floor(data.length / 2)])
      }
    } catch {
      setError('Could not load quotes. Check your connection.')
    } finally {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchQuotes(page) }, [page, fetchQuotes])

  // persist likes
  useEffect(() => {
    localStorage.setItem('liked', JSON.stringify(liked))
  }, [liked])

  // ── fetch a fresh random quote for the hero card ──
  const fetchNewHeroQuote = async () => {
    setHeroLoading(true)
    try {
      const randomPage = Math.floor(Math.random() * 30) + 1
      const res  = await fetch(`${API}?page=${randomPage}&limit=10`)
      const json = await res.json()
      const items = json.data.data
      setHeroQuote(items[Math.floor(Math.random() * items.length)])
    } catch {
      // silently fail — hero stays as-is
    } finally {
      setHeroLoading(false)
    }
  }

  const toggleLike = (id) =>
    setLiked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const copyQuote = (quote) => {
    navigator.clipboard.writeText(`"${quote.content}" — ${quote.author}`)
    setCopied(quote.id)
    setTimeout(() => setCopied(null), 2000)
  }

  const allTags = ['All', ...new Set(quotes.flatMap(q => q.tags).filter(Boolean))]

  const filtered = quotes.filter(q => {
    const matchSearch = search === '' ||
      q.content.toLowerCase().includes(search.toLowerCase()) ||
      q.author.toLowerCase().includes(search.toLowerCase())
    const matchTag = activeTag === 'All' || q.tags.includes(activeTag)
    return matchSearch && matchTag
  })

  const handlePageChange = (p) => {
    setPage(p)
    setActiveTag('All')
    setSearch('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Header />

      <main className="app__main">

        {/* Quote of the day — with its own New Quote button */}
        {heroQuote && (
          <QuoteOfDay
            quote={heroQuote}
            liked={liked.includes(heroQuote.id)}
            onLike={() => toggleLike(heroQuote.id)}
            onCopy={() => copyQuote(heroQuote)}
            copied={copied === heroQuote.id}
            onNewQuote={fetchNewHeroQuote}
            newQuoteLoading={heroLoading}
          />
        )}

        {/* Filter bar */}
        <FilterBar
          search={search}
          onSearch={setSearch}
          tags={allTags}
          activeTag={activeTag}
          onTag={setActiveTag}
        />

        {/* Grid */}
        <QuoteGrid
          quotes={filtered}
          loading={loading}
          error={error}
          liked={liked}
          copied={copied}
          onLike={toggleLike}
          onCopy={copyQuote}
          onRetry={() => fetchQuotes(page)}
        />

        {/* Pagination */}
        {!loading && !error && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </main>
    </div>
  )
}

export default App
