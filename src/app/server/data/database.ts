/**
 * JSON DATABASE SYSTEM
 * Thay thế Supabase bằng JSON files
 */

// Database structure
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  provider?: 'email' | 'facebook' | 'google' | 'linkedin';
  avatar?: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userPhone?: string;
  userEmail?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}

// In-memory database (giống như JSON files)
class Database {
  private users: User[] = [];
  private reviews: Review[] = [];
  private orders: Order[] = [];
  private contactMessages: ContactMessage[] = [];

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    // Load users từ users.json (mock data)
    this.users = [
      {
        id: '1766504708779',
        name: 'Nguyễn Hữu Duy',
        email: 'huuduy0811@gmail.com',
        password: '$2a$10$RfjDmkQvsTvgXvbUFf7pMe3NGAufnGtxcZy7hsh/z.HXZJfTsd.i',
        createdAt: '2025-12-23T15:45:08.779Z',
        provider: 'email',
      },
    ];

    // Load reviews từ reviews.json (mock data)
    this.reviews = [
      {
        id: 'review_001',
        productId: 'sp-001',
        userId: '1766504708779',
        userName: 'Nguyễn Hữu Duy',
        rating: 5,
        comment: 'Máy bơm chạy rất tốt, êm ái và mạnh mẽ. Tôi rất hài lòng với sản phẩm này!',
        createdAt: '2025-12-20T10:30:00.000Z',
      },
      {
        id: 'review_002',
        productId: 'sp-001',
        userId: 'user_002',
        userName: 'Trần Văn A',
        rating: 4,
        comment: 'Sản phẩm tốt, giao hàng nhanh. Giá cả hợp lý.',
        createdAt: '2025-12-21T14:20:00.000Z',
      },
      {
        id: 'review_003',
        productId: 'sp-001',
        userId: 'user_003',
        userName: 'Lê Thị B',
        rating: 5,
        comment: 'Chất lượng tuyệt vời! Shop tư vấn nhiệt tình. Sẽ quay lại mua thêm.',
        createdAt: '2025-12-22T09:15:00.000Z',
      },
      {
        id: 'review_004',
        productId: 'sp-002',
        userId: 'user_004',
        userName: 'Phạm Văn C',
        rating: 5,
        comment: 'Máy bơm chạy êm, hiệu suất cao. Rất đáng tiền!',
        createdAt: '2025-12-19T16:45:00.000Z',
      },
      {
        id: 'review_005',
        productId: 'sp-003',
        userId: 'user_005',
        userName: 'Hoàng Thị D',
        rating: 4,
        comment: 'Sản phẩm tốt, đúng như mô tả. Giao hàng hơi lâu nhưng chấp nhận được.',
        createdAt: '2025-12-18T11:30:00.000Z',
      },
      {
        id: 'review_006',
        productId: 'sp-003',
        userId: 'user_006',
        userName: 'Vũ Văn E',
        rating: 5,
        comment: 'Tuyệt vời! Máy bơm công suất lớn, phù hợp cho công trình của tôi.',
        createdAt: '2025-12-17T13:20:00.000Z',
      },
    ];

    try {
      const stored = localStorage.getItem('voltor_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.reviews = parsed;
        }
      }
    } catch (e) {
      // ignore
    }
  }

  // ==================== USERS ====================
  
  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      ...user,
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    console.log('[DB] User created:', newUser.email);
    return newUser;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    this.users[index] = { ...this.users[index], ...updates };
    console.log('[DB] User updated:', this.users[index].email);
    return this.users[index];
  }

  async deleteUser(id: string): Promise<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    console.log('[DB] User deleted:', id);
    return true;
  }

  // ==================== REVIEWS ====================
  
  async getReviews(productId?: string): Promise<Review[]> {
    if (productId) {
      return this.reviews.filter(r => r.productId === productId);
    }
    return this.reviews;
  }

  async createReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    const newReview: Review = {
      id: 'review_' + Date.now(),
      ...review,
      createdAt: new Date().toISOString(),
    };
    this.reviews.unshift(newReview);
    try {
      localStorage.setItem('voltor_reviews', JSON.stringify(this.reviews));
    } catch (e) {
      // ignore
    }
    console.log('[DB] Review created for product:', review.productId);
    return newReview;
  }

  async deleteReview(id: string): Promise<boolean> {
    const index = this.reviews.findIndex(r => r.id === id);
    if (index === -1) return false;
    
    this.reviews.splice(index, 1);
    try {
      localStorage.setItem('voltor_reviews', JSON.stringify(this.reviews));
    } catch (e) {
      // ignore
    }
    console.log('[DB] Review deleted:', id);
    return true;
  }

  // ==================== ORDERS ====================
  
  async getOrders(userId?: string): Promise<Order[]> {
    if (userId) {
      return this.orders.filter(o => o.userId === userId);
    }
    return this.orders;
  }

  async createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const newOrder: Order = {
      id: 'order_' + Date.now(),
      ...order,
      createdAt: new Date().toISOString(),
    };
    this.orders.push(newOrder);
    console.log('[DB] Order created:', newOrder.id);
    return newOrder;
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order | null> {
    const index = this.orders.findIndex(o => o.id === id);
    if (index === -1) return null;
    
    this.orders[index].status = status;
    console.log('[DB] Order updated:', id, '→', status);
    return this.orders[index];
  }

  // ==================== CONTACT MESSAGES ====================
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return this.contactMessages;
  }

  async createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      id: 'msg_' + Date.now(),
      ...message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    this.contactMessages.push(newMessage);
    console.log('[DB] Contact message created:', newMessage.email);
    return newMessage;
  }

  async updateMessageStatus(id: string, status: ContactMessage['status']): Promise<ContactMessage | null> {
    const index = this.contactMessages.findIndex(m => m.id === id);
    if (index === -1) return null;
    
    this.contactMessages[index].status = status;
    console.log('[DB] Message updated:', id, '→', status);
    return this.contactMessages[index];
  }

  // ==================== STATS ====================
  
  async getStats() {
    return {
      totalUsers: this.users.length,
      totalReviews: this.reviews.length,
      totalOrders: this.orders.length,
      totalMessages: this.contactMessages.length,
      pendingOrders: this.orders.filter(o => o.status === 'pending').length,
      newMessages: this.contactMessages.filter(m => m.status === 'new').length,
    };
  }
}

// Singleton instance
export const database = new Database();

// Export helpers
export const db = {
  users: {
    getAll: () => database.getUsers(),
    getById: (id: string) => database.getUserById(id),
    getByEmail: (email: string) => database.getUserByEmail(email),
    create: (user: Omit<User, 'id' | 'createdAt'>) => database.createUser(user),
    update: (id: string, updates: Partial<User>) => database.updateUser(id, updates),
    delete: (id: string) => database.deleteUser(id),
  },
  reviews: {
    getAll: (productId?: string) => database.getReviews(productId),
    create: (review: Omit<Review, 'id' | 'createdAt'>) => database.createReview(review),
    delete: (id: string) => database.deleteReview(id),
  },
  orders: {
    getAll: (userId?: string) => database.getOrders(userId),
    create: (order: Omit<Order, 'id' | 'createdAt'>) => database.createOrder(order),
    updateStatus: (id: string, status: Order['status']) => database.updateOrderStatus(id, status),
  },
  messages: {
    getAll: () => database.getContactMessages(),
    create: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => database.createContactMessage(message),
    updateStatus: (id: string, status: ContactMessage['status']) => database.updateMessageStatus(id, status),
  },
  stats: () => database.getStats(),
};