import { useState, useMemo } from 'react'
import { useMeals } from './hooks/useMeals'
import Navbar from './components/Navbar'
import HeroStrip from './components/HeroStrip'
import Controls from './components/Controls'
import MealGrid from './components/MealGrid'
import MealModal from './components/MealModal'
import Pagination from './components/Pagination'
import './App.css'

export default function App() {
  const [page, setPage]         = useState(1)
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)

  const { meals, loading, error, totalPages, totalItems, retry } = useMeals(page, 12)

  // collect unique categories from current page
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(meals.map(m => m.strCategory).filter(Boolean))]
    return cats
  }, [meals])

  const filtered = useMemo(() => {
    return meals.filter(m => {
      const matchSearch = search === '' ||
        m.strMeal.toLowerCase().includes(search.toLowerCase()) ||
        (m.strArea || '').toLowerCase().includes(search.toLowerCase()) ||
        (m.strCategory || '').toLowerCase().includes(search.toLowerCase())
      const matchCat = category === 'All' || m.strCategory === category
      return matchSearch && matchCat
    })
  }, [meals, search, category])

  const handlePageChange = (p) => {
    setPage(p)
    setSearch('')
    setCategory('All')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Navbar />
      <HeroStrip total={totalItems} />

      <main className="app__main">
        <Controls
          search={search}
          onSearch={setSearch}
          categories={categories}
          category={category}
          onCategory={setCategory}
          count={filtered.length}
          loading={loading}
        />

        <MealGrid
          meals={filtered}
          loading={loading}
          error={error}
          onSelect={setSelected}
          onRetry={retry}
        />

        {!loading && !error && (
          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
        )}
      </main>

      {selected && (
        <MealModal meal={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
