export async function GET() {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }

    const [liveRes, ...upcomingResponses] = await Promise.all([
      fetch('https://free-api-live-football-data.p.rapidapi.com/football-current-live', {
        headers: {
          'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
        cache: 'no-store',
      }),
      ...dates.map(date =>
        fetch(`https://free-api-live-football-data.p.rapidapi.com/football-get-matches-by-date?date=${date}`, {
          headers: {
            'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
            'x-rapidapi-key': apiKey,
          },
          cache: 'no-store',
        })
      ),
    ]);

    const liveData = liveRes.ok ? await liveRes.json() : { response: [] };

    const allUpcoming = [];
    for (const res of upcomingResponses) {
      if (res.ok) {
        const data = await res.json();
        const matches = data.response || data.matches || [];
        allUpcoming.push(...matches);
      }
    }

    // סנן רק משחקי FIFA World Cup
    const worldcupMatches = allUpcoming.filter(m =>
      m.league?.name?.toLowerCase().includes('world cup') ||
      m.league?.name?.toLowerCase().includes('fifa')
    );

    return Response.json({
      live: liveData.response || [],
      upcoming: worldcupMatches.length > 0 ? worldcupMatches : allUpcoming.slice(0, 20),
    });

  } catch (error) {
    return Response.json(
      { error: 'No data available at this time' },
      { status: 503 }
    );
  }
}
