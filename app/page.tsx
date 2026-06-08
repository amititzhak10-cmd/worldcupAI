export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>
          <span className="font-bold text-lg tracking-tight">WorldCup AI</span>
        </div>
        <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
          FIFA 2026
        </span>
      </header>

      {/* Hero */}
      <section className="px-4 py-6 text-center">
        <h1 className="text-3xl font-bold mb-1">מונדיאל 2026</h1>
        <p className="text-gray-400 text-sm">נתונים אמיתיים · ניתוח ספורטיבי</p>
      </section>

      {/* Coming Soon Card */}
      <section className="px-4">
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-xl font-bold mb-2">האתר בבנייה</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            בקרוב תוכל לעקוב אחרי כל משחקי המונדיאל,
            לצפות בנתונים אמיתיים ובניתוח ספורטיבי מבוסס נתונים.
          </p>
        </div>
      </section>

      {/* Placeholder Cards */}
      <section className="px-4 mt-6">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          משחקים קרובים
        </h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full" />
                  <div className="w-20 h-4 bg-gray-700 rounded" />
                </div>
                <div className="w-12 h-6 bg-gray-800 rounded-lg" />
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-8 h-8 bg-gray-700 rounded-full" />
                  <div className="w-20 h-4 bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 px-4 py-6 text-center text-xs text-gray-600">
        נתונים מבוססים על API רשמי · אין המלצות הימורים
      </footer>
    </main>
  );
}