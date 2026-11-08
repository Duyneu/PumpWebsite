interface Env {
  BACKEND_API_URL?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const backendBaseUrl = env.BACKEND_API_URL || 'http://localhost:3001';

  const pathParts = params.path;
  const path = Array.isArray(pathParts) ? pathParts.join('/') : pathParts || '';
  const url = new URL(request.url);
  const targetUrl = `${backendBaseUrl.replace(/\/+$/, '')}/api/${path}${url.search}`;

  try {
    const forwardHeaders = new Headers(request.headers);
    forwardHeaders.set('X-Forwarded-Host', url.host);
    forwardHeaders.set('X-Forwarded-Proto', url.protocol.replace(':', ''));

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: forwardHeaders,
      body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.blob(),
      redirect: 'follow',
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: `Cloudflare Edge: Không thể kết nối tới backend API tại ${backendBaseUrl}`,
        detail: error?.message || 'Network error',
      }),
      {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};
