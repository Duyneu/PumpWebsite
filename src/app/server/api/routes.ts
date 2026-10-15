/**
 * API ROUTES - RESTful endpoints cho database
 */

import { db } from '../data/database';

export async function handleApiRequest(path: string, method: string, body?: any) {
  console.log(`[API] ${method} ${path}`);

  // ==================== USERS ====================
  
  if (path === '/api/users' && method === 'GET') {
    const users = await db.users.getAll();
    return { success: true, data: users };
  }

  if (path.startsWith('/api/users/') && method === 'GET') {
    const id = path.split('/').pop()!;
    const user = await db.users.getById(id);
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    return { success: true, data: user };
  }

  if (path === '/api/users' && method === 'POST') {
    // Create new user
    const user = await db.users.create(body);
    return { success: true, data: user };
  }

  if (path.startsWith('/api/users/') && method === 'PUT') {
    const id = path.split('/').pop()!;
    const user = await db.users.update(id, body);
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    return { success: true, data: user };
  }

  if (path.startsWith('/api/users/') && method === 'DELETE') {
    const id = path.split('/').pop()!;
    const deleted = await db.users.delete(id);
    return { success: deleted };
  }

  // ==================== AUTH ====================
  
  if (path === '/api/auth/login' && method === 'POST') {
    const { email, password } = body;
    const user = await db.users.getByEmail(email);
    
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    // TODO: Verify password hash
    // For now, just return user (demo mode)
    return { 
      success: true, 
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        token: 'demo_token_' + Date.now(),
      }
    };
  }

  if (path === '/api/auth/register' && method === 'POST') {
    const { name, email, password } = body;
    
    // Check if user exists
    const existingUser = await db.users.getByEmail(email);
    if (existingUser) {
      return { success: false, error: 'Email already exists' };
    }

    // Create user
    const user = await db.users.create({
      name,
      email,
      password, // TODO: Hash password
      provider: 'email',
    });

    return { 
      success: true, 
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token: 'demo_token_' + Date.now(),
      }
    };
  }

  // ==================== REVIEWS ====================
  
  if (path === '/api/reviews' && method === 'GET') {
    // Query param: ?productId=sp-001
    const reviews = await db.reviews.getAll();
    return { success: true, data: reviews };
  }

  if (path === '/api/reviews' && method === 'POST') {
    const review = await db.reviews.create(body);
    return { success: true, data: review };
  }

  if (path.startsWith('/api/reviews/') && method === 'DELETE') {
    const id = path.split('/').pop()!;
    const deleted = await db.reviews.delete(id);
    return { success: deleted };
  }

  // ==================== ORDERS ====================
  
  if (path === '/api/orders' && method === 'GET') {
    const orders = await db.orders.getAll();
    return { success: true, data: orders };
  }

  if (path === '/api/orders' && method === 'POST') {
    const order = await db.orders.create(body);
    return { success: true, data: order };
  }

  if (path.startsWith('/api/orders/') && method === 'PUT') {
    const id = path.split('/').pop()!;
    const { status } = body;
    const order = await db.orders.updateStatus(id, status);
    if (!order) {
      return { success: false, error: 'Order not found' };
    }
    return { success: true, data: order };
  }

  // ==================== CONTACT MESSAGES ====================
  
  if (path === '/api/messages' && method === 'GET') {
    const messages = await db.messages.getAll();
    return { success: true, data: messages };
  }

  if (path === '/api/messages' && method === 'POST') {
    const message = await db.messages.create(body);
    return { success: true, data: message };
  }

  if (path.startsWith('/api/messages/') && method === 'PUT') {
    const id = path.split('/').pop()!;
    const { status } = body;
    const message = await db.messages.updateStatus(id, status);
    if (!message) {
      return { success: false, error: 'Message not found' };
    }
    return { success: true, data: message };
  }

  // ==================== STATS ====================
  
  if (path === '/api/stats' && method === 'GET') {
    const stats = await db.stats();
    return { success: true, data: stats };
  }

  // 404 - Route not found
  return { success: false, error: 'Route not found' };
}

// Helper để gọi API từ client
export async function apiCall<T = any>(path: string, method: string = 'GET', body?: any): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const response = await handleApiRequest(path, method, body);
    return response as any;
  } catch (error) {
    console.error('[API Error]', error);
    return { success: false, error: 'Internal server error' };
  }
}
