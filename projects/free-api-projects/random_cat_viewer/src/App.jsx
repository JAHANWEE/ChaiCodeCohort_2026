import { useEffect, useState, useCallback } from "react";

export default function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCat = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.freeapi.app/api/v1/public/cats/cat/random"
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      setCat(json.data); 
    } catch (err) {
      setError(err.message || "Failed to fetch cat. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCat();
  }, [fetchCat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col items-center justify-center p-6 font-sans">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-amber-600 tracking-tight drop-shadow-sm">
          🐱 Random Cat Viewer
        </h1>
        <p className="mt-2 text-amber-500 text-sm font-medium tracking-wide uppercase">
          A new cat every click
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-sm transition-all duration-300">
        {/* Image area */}
        <div className="relative w-full h-72 bg-amber-100 flex items-center justify-center">
          {/* Spinner only while the API fetch is in progress */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-amber-50 z-10">
              <div className="w-12 h-12 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
            </div>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center gap-2 px-6 text-center">
              <span className="text-4xl">😿</span>
              <p className="text-red-500 text-sm font-medium">{error}</p>
            </div>
          )}

          {cat && !error && (
            <img
              key={cat.id}
              src={cat.image}
              alt={cat.name || "Random cat"}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Info */}
        <div className="px-5 py-4 border-t border-amber-100">
          {cat && !error ? (
            <div className="space-y-1">
              {cat.name && (
                <p className="text-base font-bold text-gray-700">{cat.name}</p>
              )}
              {cat.origin && (
                <p className="text-xs text-gray-400">
                  Origin: <span className="text-gray-600 font-medium">{cat.origin}</span>
                </p>
              )}
              {cat.temperament && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {cat.temperament.split(", ").map((t) => (
                    <span
                      key={t}
                      className="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {cat.life_span && (
                <p className="text-xs text-gray-400 pt-1">
                  Lifespan: <span className="text-gray-600 font-medium">{cat.life_span} years</span>
                </p>
              )}
            </div>
          ) : (
            !error && (
              <div className="h-8 bg-amber-50 rounded animate-pulse" />
            )
          )}
        </div>

        {/* Button */}
        <div className="px-5 pb-5">
          <button
            onClick={fetchCat}
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-base tracking-wide shadow-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Fetching…
              </>
            ) : (
              <>🐾 New Cat</>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-amber-400">
        Powered by{" "}
        <a
          href="https://freeapi.app"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-amber-600"
        >
          freeapi.app
        </a>
      </p>
    </div>
  );
}
