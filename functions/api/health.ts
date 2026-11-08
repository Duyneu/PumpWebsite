export const onRequestGet: PagesFunction = async () => {
  return new Response(
    JSON.stringify({
      status: 'OK',
      edge: 'Cloudflare Pages Functions',
      service: 'VOLTOR Vietnam API',
      timestamp: new Date().toISOString(),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  );
};
