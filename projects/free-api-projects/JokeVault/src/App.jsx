import { useState, useCallback } from 'react';
import './App.css';

export default function App() {
  const [joke, setJoke]       = useState('Hit the button to get your first joke 😄');
  const [loading, setLoading] = useState(false);

  const fetchJoke = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch('https://api.freeapi.app/api/v1/public/randomjokes/joke/random');
      const json = await res.json();
      setJoke(json.data.content);
    } catch {
      setJoke('😅 Could not fetch a joke. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="page">
      <div className="card">
        <div className="card-top">
          <span className="emoji">🃏</span>
          <h1 className="title">JokeVault</h1>
        </div>

        <p className="joke">{loading ? '...' : joke}</p>

        <button className="btn" onClick={fetchJoke} disabled={loading}>
          {loading ? 'Loading…' : '🎲 New Joke'}
        </button>
      </div>
    </div>
  );
}
