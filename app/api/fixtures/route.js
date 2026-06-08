export async function GET() {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    // משחקים חיים
    const liveRes = await fetch(
      'https://free-api-live-football-data.p.rapidapi.com/football-current-live',
      {
        headers: {
          'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
        cache: 'no-store',
      }
    );

    // משחקים קרובים של היום
    const today = new Date().toISOString().split('T')[0];
    const upcomingRes = await fetch(
      `https://free-api-live-football-data.p.rapidapi.com/football-get-matches-by-date?date=${today}`,
      {
        headers: {
          'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
        cache: 'no-store',
      }
    );

    const liveData = liveRes.ok ? await liveRes.json() : { response: [] };
    const upcomingData = upcomingRes.ok ? await upcomingRes.json() : { response: [] };

    return Response.json({
      live: liveData.response || [],
      upcoming: upcomingData.response || upcomingData.matches || [],
    });

  } catch (error) {
    return Response.json(
      { error: 'No data available at this time' },
      { status: 503 }
    );
  }
}
