'use client';
import { useEffect, useState } from 'react';

interface Match {
  teams?: { home?: { name?: string }; away?: { name?: string } };
  goals?: { home?: number | null; away?: number | null };
  league?: { name?: string };
  fixture?: { date?: string; status?: { short?: string } };
}

export default function Home() {
  const [live, setLive] = useState<Match[]>([]);
  const [upcoming, setUpcoming] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/fixtures')
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setLive(data.live || []);
          setUpcoming(data.upcoming || []);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('שגיאה בטעינת נתונים');
        setLoading(false);
      });
  }, []);

  const MatchCard = ({ match, isLive }: { match: Match; isLive: boolean }) => (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
      {isLive && (
        <div className="flex items-center gap-1 mb-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-400 text-xs font-semibold">🔴 חי</span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-right flex-1">{match.teams?.home?.name || '—'}</span>
        <span className="bg-gray-800 px-3 py-1 rounded-lg text-sm font-bold mx-3">
          {isLive
            ? `${match.goals?.home ?? '0'} - ${match.goals?.away ?? '0'}`
            : match.fixture?.date
            ? new Date(match.fixture.date).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
            : 'vs'}
        </span>
        <span className="text-sm font-medium text-left flex-1">{match.teams?.away?.name || '—'}</span>
      </div>
      <p className="text-center text-xs text-gray-500 mt-2">{match.league?.name || ''}</p>
    </div>
  );

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

      {loading && (
        <div className="px-4 space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800 animate-pulse h-16" />
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="px-4">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
            <p className="text-gray-400">⚠️ {error}</p>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="px-4 space-y-6">
          {live.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">🔴 משחקים חיים</h2>
              <div className="space-y-3">
                {live.map((match, i) => <MatchCard key={i} match={match} isLive={true} />)}
              </div>
            </section>
          )}

          {upcoming.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">📅 משחקים קרובים</h2>
              <div className="space-y-3">
                {upcoming.slice(0, 15).map((match, i) => <MatchCard key={i} match={match} isLive={false} />)}
              </div>
            </section>
          )}

          {live.length === 0 && upcoming.length === 0 && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
              <p className="text-gray-400">אין משחקים כרגע</p>
              <p className="text-gray-600 text-xs mt-1">בדוק שוב בעוד כמה דקות</p>
            </div>
          )}
        </div>
      )}

      <footer className="mt-10 px-4 py-6 text-center text-xs text-gray-600">
        נתונים מבוססים על API רשמי · אין המלצות הימורים
      </footer>
    </main>
  );
}
