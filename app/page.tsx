'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/fixtures').then(r => r.json()).then(setData);
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">⚽ מונדיאל 2026</h1>
      
      {!data ? <p>טוען...</p> : (
        <>
          <h2 className="text-xl font-bold text-red-400 mt-6 mb-3">🔴 משחקים חיים:</h2>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(data.live, null, 2)}
          </pre>
          
          <h2 className="text-xl font-bold text-blue-400 mt-6 mb-3">📅 משחקים קרובים:</h2>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(data.upcoming, null, 2)}
          </pre>
        </>
      )}
    </main>
  );
}
