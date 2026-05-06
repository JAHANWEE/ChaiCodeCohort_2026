import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import VideoGrid from './components/VideoGrid'
import './App.css'

function App() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchVideos = async (pageNum) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `https://api.freeapi.app/api/v1/public/youtube/videos?page=${pageNum}&limit=18`
      )
      const json = await res.json()
      setVideos(json.data.data)
      setTotalPages(json.data.totalPages)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos(page)
  }, [page])

  // pick the first video as the hero feature
  const heroVideo = videos.length > 0 ? videos[0].items : null

  const handlePageChange = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <Navbar />

      {/* Hero — full bleed, sits behind the navbar */}
      <HeroBanner video={heroVideo} />

      {/* Video rows */}
      <main className="main-content">
        <VideoGrid
          videos={videos}
          loading={loading}
          error={error}
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  )
}

export default App
