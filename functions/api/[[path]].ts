interface Env {
  BACKEND_API_URL?: string;
  DB?: D1Database;
}

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;

  // 1. Xử lý CORS preflight request tại Edge
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const pathParts = params.path;
  const path = Array.isArray(pathParts) ? pathParts.join('/') : pathParts || '';
  const url = new URL(request.url);
  const method = request.method.toUpperCase();

  // 2. Nếu có Cloudflare D1 Database binding, phục vụ trực tiếp tại Edge
  if (env.DB) {
    try {
      const db = env.DB;

      // ==================== PRODUCTS ====================
      if (path === 'products' && method === 'GET') {
        const { results } = await db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
        const formatted = (results || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          category: p.category || 'Máy Bơm Nước',
          price: p.price,
          image: p.image_url,
          description: p.description,
          specs: p.specifications ? JSON.parse(p.specifications) : {},
          inStock: p.stock_quantity > 0,
        }));
        return jsonResponse({ success: true, data: formatted });
      }

      if (path.startsWith('products/') && method === 'GET') {
        const id = path.split('/')[1];
        const product: any = await db.prepare('SELECT * FROM products WHERE id = ? OR slug = ?').bind(id, id).first();
        if (!product) return jsonResponse({ success: false, error: 'Product not found' }, 404);
        return jsonResponse({
          success: true,
          data: {
            id: product.id,
            name: product.name,
            category: product.category || 'Máy Bơm Nước',
            price: product.price,
            image: product.image_url,
            description: product.description,
            specs: product.specifications ? JSON.parse(product.specifications) : {},
            inStock: product.stock_quantity > 0,
          },
        });
      }

      if (path === 'products' && method === 'POST') {
        const body: any = await request.json();
        const id = String(body.id || 'sp_' + Date.now());
        const name = body.name || 'Sản phẩm mới';
        const slug = body.slug || id;
        const sku = body.sku || `SKU-${id}`;
        const category = body.category || 'Máy Bơm Nước';
        const price = Number(body.price) || 0;
        const originalPrice = body.original_price ? Number(body.original_price) : null;
        const brand = body.brand || 'VOLTOR';
        const model = body.model || body.name || '';
        const origin = body.origin || 'Việt Nam / Trung Quốc';
        const warranty = body.warranty || '12 tháng';
        const status = body.status || (body.inStock !== false ? 'active' : 'inactive');
        const stock = body.inStock !== false ? 100 : 0;
        const image = body.image || body.image_url || '';
        const description = body.description || '';
        const specs = body.specs ? JSON.stringify(body.specs) : null;

        await db.prepare(`
          INSERT OR REPLACE INTO products (
            id, name, slug, sku, category, price, original_price, brand, model, origin, warranty, status, stock_quantity, image_url, description, specifications
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          id, name, slug, sku, category, price, originalPrice, brand, model, origin, warranty, status, stock, image, description, specs
        ).run();

        return jsonResponse({
          success: true,
          data: { id, name, category, price, image, description, specs: body.specs, inStock: stock > 0 },
        });
      }

      if (path.startsWith('products/') && (method === 'PUT' || method === 'PATCH')) {
        const id = path.split('/')[1];
        const body: any = await request.json();
        const existing: any = await db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first();

        if (!existing) {
          return jsonResponse({ success: false, error: 'Product not found' }, 404);
        }

        const updatedName = body.name ?? existing.name;
        const updatedCat = body.category ?? existing.category;
        const updatedPrice = body.price !== undefined ? Number(body.price) : existing.price;
        const updatedImg = (body.image || body.image_url) ?? existing.image_url;
        const updatedDesc = body.description ?? existing.description;
        const updatedSpecs = body.specs ? JSON.stringify(body.specs) : existing.specifications;
        const updatedStock = body.inStock !== undefined ? (body.inStock ? 100 : 0) : existing.stock_quantity;

        await db.prepare(`
          UPDATE products SET
            name = ?, category = ?, price = ?, image_url = ?, description = ?, specifications = ?, stock_quantity = ?
          WHERE id = ?
        `).bind(updatedName, updatedCat, updatedPrice, updatedImg, updatedDesc, updatedSpecs, updatedStock, id).run();

        return jsonResponse({
          success: true,
          data: { id, name: updatedName, category: updatedCat, price: updatedPrice, image: updatedImg, description: updatedDesc, inStock: updatedStock > 0 },
        });
      }

      if (path.startsWith('products/') && method === 'DELETE') {
        const id = path.split('/')[1];
        await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
        return jsonResponse({ success: true, message: `Deleted product ${id}` });
      }

      // ==================== REVIEWS ====================
      if (path === 'reviews' && method === 'GET') {
        const productId = url.searchParams.get('product_id') || url.searchParams.get('productId');
        let query = 'SELECT * FROM reviews';
        let stmt = productId
          ? db.prepare('SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC').bind(productId)
          : db.prepare('SELECT * FROM reviews ORDER BY created_at DESC');
        const { results } = await stmt.all();
        const formatted = (results || []).map((r: any) => ({
          id: r.id,
          productId: r.product_id,
          userId: r.user_id,
          userName: r.user_name,
          rating: r.rating,
          comment: r.comment,
          createdAt: r.created_at,
        }));
        return jsonResponse({ success: true, data: formatted });
      }

      if (path === 'reviews' && method === 'POST') {
        const body: any = await request.json();
        const id = 'review_' + Date.now();
        const createdAt = new Date().toISOString();
        await db.prepare(
          'INSERT INTO reviews (id, product_id, user_id, user_name, rating, comment, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).bind(id, body.productId, body.userId || null, body.userName, body.rating, body.comment, createdAt).run();
        return jsonResponse({
          success: true,
          data: { id, productId: body.productId, userId: body.userId, userName: body.userName, rating: body.rating, comment: body.comment, createdAt },
        });
      }

      // ==================== ORDERS ====================
      if (path === 'orders' && method === 'GET') {
        const userId = url.searchParams.get('user_id') || url.searchParams.get('userId');
        const stmt = userId
          ? db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').bind(userId)
          : db.prepare('SELECT * FROM orders ORDER BY created_at DESC');
        const { results } = await stmt.all();
        const formatted = (results || []).map((o: any) => ({
          ...o,
          items: o.items ? JSON.parse(o.items) : [],
        }));
        return jsonResponse({ success: true, data: formatted });
      }

      if (path === 'orders' && method === 'POST') {
        const body: any = await request.json();
        const id = 'order_' + Date.now();
        const createdAt = new Date().toISOString();
        await db.prepare(
          'INSERT INTO orders (id, user_id, customer_name, customer_email, customer_phone, customer_address, payment_method, shipping_method, subtotal, shipping_fee, total, status, payment_status, items, note, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(
          id,
          body.userId || null,
          body.customerName,
          body.customerEmail,
          body.customerPhone,
          body.customerAddress,
          body.paymentMethod || 'cod',
          body.shippingMethod || 'standard',
          body.subtotal || 0,
          body.shippingFee || 0,
          body.total || 0,
          body.status || 'pending',
          body.paymentStatus || 'unpaid',
          JSON.stringify(body.items || []),
          body.note || null,
          createdAt
        ).run();
        return jsonResponse({ success: true, data: { id, ...body, createdAt } });
      }

      // ==================== AUTH ====================
      if (path === 'auth/login' && method === 'POST') {
        const { email, password }: any = await request.json();
        const user: any = await db.prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)').bind(email.trim()).first();
        if (!user || user.password !== password) {
          return jsonResponse({ success: false, error: 'Email hoặc mật khẩu không chính xác' }, 401);
        }
        return jsonResponse({
          success: true,
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token: 'd1_token_' + Date.now(),
          },
        });
      }

      // ==================== STATS ====================
      if (path === 'stats' && method === 'GET') {
        const usersCount: any = await db.prepare('SELECT count(*) as count FROM users').first();
        const productsCount: any = await db.prepare('SELECT count(*) as count FROM products').first();
        const reviewsCount: any = await db.prepare('SELECT count(*) as count FROM reviews').first();
        const ordersCount: any = await db.prepare('SELECT count(*) as count FROM orders').first();
        const messagesCount: any = await db.prepare('SELECT count(*) as count FROM contact_messages').first();

        return jsonResponse({
          success: true,
          data: {
            totalUsers: usersCount?.count || 0,
            totalProducts: productsCount?.count || 0,
            totalReviews: reviewsCount?.count || 0,
            totalOrders: ordersCount?.count || 0,
            totalMessages: messagesCount?.count || 0,
          },
        });
      }
    } catch (d1Err: any) {
      console.error('[Cloudflare D1 Error]', d1Err);
      // Nếu có lỗi D1, có thể rơi xuống reverse proxy dự phòng bên dưới
    }
  }

  // 3. Fallback: Reverse Proxy tới backend truyền thống (nếu có cấu hình)
  const backendBaseUrl = env.BACKEND_API_URL || 'http://localhost:3001';
  const targetUrl = `${backendBaseUrl.replace(/\/+$/, '')}/api/${path}${url.search}`;

  try {
    const forwardHeaders = new Headers(request.headers);
    forwardHeaders.delete('host');
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
    return jsonResponse(
      {
        success: false,
        error: `Cloudflare Edge: Không thể kết nối tới backend API tại ${backendBaseUrl}`,
        detail: error?.message || 'Network error',
      },
      502
    );
  }
};
