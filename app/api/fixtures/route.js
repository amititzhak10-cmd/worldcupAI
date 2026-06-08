export async function GET() {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!apiKey) {
    return Response.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      'https://free-api-live-football-data.p.rapidapi.com/football-current-live',
      {
        headers: {
          'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch data from football API' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);

  } catch (error) {
    return Response.json(
      { error: 'No data available at this time' },
      { status: 503 }
    );
  }
}
