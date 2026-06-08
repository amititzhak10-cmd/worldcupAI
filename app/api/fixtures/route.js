export async function GET() {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const [liveRes, todayRes, worldcupRes] = await Promise.all([
      fetch('https://free-api-live-football-data.p.rapidapi.com/football-current-live', {
        headers: {
          'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
        cache: 'no-store',
      }),
      fetch(`https://free-api-live-football-data.p.rapidapi.com/football-get-matches-by-date?date=${new Date().toISOString().split('T')[0]}`, {
        headers: {
          'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
        cache: 'no-store',
      }),
      fetch('https://free-api-live-football-data.p.rapidapi.com/football-get-all-leagues', {
        headers: {
          'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
        cache: 'no-store',
      }),
    ]);

    const liveData = liveRes.ok ? await liveRes.json() : { response: [] };
    const todayData = todayRes.ok ? await todayRes.json() : { response: [] };
    const leagueData = worldcupRes.ok ? await worldcupRes.json() : { response: [] };

    return Response.json({
      live: liveData.response || [],
      upcoming: todayData.response || todayData.matches || [],
      leagues: leagueData.response || leagueData.leagues || [],
    });

  } catch (error) {
    return Response.json(
      { error: 'No data available at this time' },
      { status: 503 }
    );
  }
}
