import { useState, useMemo } from 'react'
import { useUsers } from './hooks/useUsers'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import StatsBar from './components/StatsBar'
import UserGrid from './components/UserGrid'
import UserModal from './components/UserModal'
import Pagination from './components/Pagination'
import './App.css'

export default function App() {
  const [page, setPage]           = useState(1)
  const [search, setSearch]       = useState('')
  const [genderFilter, setGender] = useState('all')
  const [selectedUser, setSelected] = useState(null)
  const [viewMode, setViewMode]   = useState('grid') // 'grid' | 'list'

  const { users, loading, error, totalPages, totalItems, retry } = useUsers(page, 12)

  // client-side filter on current page
  const filtered = useMemo(() => {
    return users.filter(u => {
      const fullName = `${u.name.first} ${u.name.last}`.toLowerCase()
      const matchSearch = search === '' ||
        fullName.includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.location.country.toLowerCase().includes(search.toLowerCase())
      const matchGender = genderFilter === 'all' || u.gender === genderFilter
      return matchSearch && matchGender
    })
  }, [users, search, genderFilter])

  const handlePageChange = (p) => {
    setPage(p)
    setSearch('')
    setGender('all')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Navbar />

      <main className="app__main">
        <div className="app__top">
          <SearchBar
            value={search}
            onChange={setSearch}
            gender={genderFilter}
            onGender={setGender}
            viewMode={viewMode}
            onViewMode={setViewMode}
          />
          <StatsBar
            total={totalItems}
            showing={filtered.length}
            page={page}
            totalPages={totalPages}
            loading={loading}
          />
        </div>

        <UserGrid
          users={filtered}
          loading={loading}
          error={error}
          viewMode={viewMode}
          onSelect={setSelected}
          onRetry={retry}
        />

        {!loading && !error && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </main>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
