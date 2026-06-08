'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/fixtures')
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setMatches(data.response || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('לא ניתן לטעון נתונים כרגע');
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>
          <span className="font-bold text-lg">WorldCup AI</span>
        </div>
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">FIFA 2026</span>
      </header>

      <section className="px-4 py-6 text-center">
        <h1 className="text-3xl font-bold mb-1">מונדיאל 2026</h1>
        <p className="text-gray-400 text-sm">נתונים אמיתיים · ניתוח ספורטיבי</p>
      </section>

      <section className="px-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">משחקים חיים</h2>

        {loading && (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800 animate-pulse h-16" />
            ))}
          </div>
        )}

        {error && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
            <p className="text-gray-400">⚠️ {error}</p>
            <p className="text-gray-600 text-xs mt-2">אין מספיק מידע להצגה כרגע</p>
          </div>
        )}

        {!loading && !error && matches.length === 0 && (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
            <p className="text-gray-400">אין משחקים חיים כרגע</p>
          </div>
        )}

        {!loading && !error && matches.length > 0 && (
          <div className="space-y-3">
            {matches.map((match, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{match.teams?.home?.name || '—'}</span>
                  <span className="bg-gray-800 px-3 py-1 rounded-lg text-sm font-bold">
                    {match.goals?.home ?? '?'} - {match.goals?.away ?? '?'}
                  </span>
                  <span className="text-sm font-medium">{match.teams?.away?.name || '—'}</span>
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">{match.league?.name || ''}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="mt-10 px-4 py-6 text-center text-xs text-gray-600">
        נתונים מבוססים על API רשמי · אין המלצות הימורים
      </footer>
    </main>
  );
}
