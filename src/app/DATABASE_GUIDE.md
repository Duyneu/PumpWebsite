# 🗄️ JSON Database System - Thay thế Supabase

## ✅ Hoàn thành!

**Database JSON trong code** đã thay thế hoàn toàn Supabase! Tất cả data được lưu trong memory với cấu trúc giống như database thật.

---

## 🎯 Tổng quan

### **Trước (Supabase):**
```typescript
// Cần Supabase setup phức tạp
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);
await supabase.from('users').select('*');
```

❌ Cần setup Supabase project  
❌ Cần API keys  
❌ Cần internet connection  
❌ Phức tạp cho beginners  

---

### **Sau (JSON Database):**
```typescript
// Đơn giản, chỉ cần import
import { db } from './server/data/database';

const users = await db.users.getAll();
```

✅ Không cần setup gì  
✅ Không cần API keys  
✅ Offline hoạt động  
✅ Dễ dàng cho beginners  
✅ Code đơn giản, rõ ràng  

---

## 📂 Cấu trúc mới

```
/server
├── data/
│   └── database.ts         ← Database engine (in-memory)
└── api/
    └── routes.ts           ← RESTful API endpoints

/hooks
└── useDatabase.ts          ← React hooks để dùng database

/pages
└── [All pages use database via hooks]
```

---

## 🗃️ Database Schema

### **1. Users:**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  provider?: 'email' | 'facebook' | 'google' | 'linkedin';
  avatar?: string;
}
```

**Example:**
```json
{
  "id": "1766504708779",
  "name": "Nguyễn Hữu Duy",
  "email": "huuduy0811@gmail.com",
  "password": "$2a$10$...",
  "createdAt": "2025-12-23T15:45:08.779Z",
  "provider": "email"
}
```

---

### **2. Reviews:**
```typescript
interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
```

**Example:**
```json
{
  "id": "review_001",
  "productId": "sp-001",
  "userId": "1766504708779",
  "userName": "Nguyễn Hữu Duy",
  "rating": 5,
  "comment": "Máy bơm chạy rất tốt!",
  "createdAt": "2025-12-20T10:30:00.000Z"
}
```

---

### **3. Orders:**
```typescript
interface Order {
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
```

**Example:**
```json
{
  "id": "order_1234567890",
  "userId": "1766504708779",
  "items": [
    {
      "productId": "sp-001",
      "quantity": 2,
      "price": 5500000
    }
  ],
  "total": 11000000,
  "status": "pending",
  "createdAt": "2025-12-25T10:00:00.000Z"
}
```

---

### **4. Contact Messages:**
```typescript
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}
```

**Example:**
```json
{
  "id": "msg_1234567890",
  "name": "Nguyễn Văn A",
  "email": "customer@example.com",
  "phone": "0901234567",
  "subject": "Tư vấn máy bơm",
  "message": "Tôi muốn mua máy bơm...",
  "status": "new",
  "createdAt": "2025-12-25T11:00:00.000Z"
}
```

---

## 🔧 Database API

### **Direct Usage (Server-side):**

```typescript
import { db } from './server/data/database';

// ==================== USERS ====================

// Get all users
const users = await db.users.getAll();

// Get user by ID
const user = await db.users.getById('1766504708779');

// Get user by email
const user = await db.users.getByEmail('test@example.com');

// Create new user
const newUser = await db.users.create({
  name: 'Nguyễn Văn A',
  email: 'test@example.com',
  password: 'hashed_password',
  provider: 'email',
});

// Update user
const updated = await db.users.update('1766504708779', {
  name: 'New Name',
});

// Delete user
await db.users.delete('1766504708779');

// ==================== REVIEWS ====================

// Get all reviews
const reviews = await db.reviews.getAll();

// Get reviews for specific product
const productReviews = await db.reviews.getAll('sp-001');

// Create review
const newReview = await db.reviews.create({
  productId: 'sp-001',
  userId: '1766504708779',
  userName: 'Nguyễn Văn A',
  rating: 5,
  comment: 'Tuyệt vời!',
});

// Delete review
await db.reviews.delete('review_001');

// ==================== ORDERS ====================

// Get all orders
const orders = await db.orders.getAll();

// Get orders for specific user
const userOrders = await db.orders.getAll('1766504708779');

// Create order
const newOrder = await db.orders.create({
  userId: '1766504708779',
  items: [
    { productId: 'sp-001', quantity: 2, price: 5500000 }
  ],
  total: 11000000,
  status: 'pending',
});

// Update order status
await db.orders.updateStatus('order_123', 'completed');

// ==================== MESSAGES ====================

// Get all messages
const messages = await db.messages.getAll();

// Create message
const newMessage = await db.messages.create({
  name: 'Nguyễn Văn A',
  email: 'test@example.com',
  phone: '0901234567',
  subject: 'Tư vấn',
  message: 'Tôi muốn...',
});

// Update message status
await db.messages.updateStatus('msg_123', 'read');

// ==================== STATS ====================

// Get stats
const stats = await db.stats();
// Returns:
// {
//   totalUsers: 10,
//   totalReviews: 50,
//   totalOrders: 30,
//   totalMessages: 15,
//   pendingOrders: 5,
//   newMessages: 3,
// }
```

---

## 🎣 React Hooks Usage

### **1. useUsers() - Quản lý users:**

```tsx
import { useUsers } from '../hooks/useDatabase';

function AdminUserList() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
      
      <button onClick={() => createUser({
        name: 'New User',
        email: 'new@example.com',
        provider: 'email',
      })}>
        Add User
      </button>
    </div>
  );
}
```

---

### **2. useReviews() - Quản lý reviews:**

```tsx
import { useReviews } from '../hooks/useDatabase';

function ProductReviews({ productId }: { productId: string }) {
  const { reviews, loading, createReview } = useReviews(productId);

  const handleSubmitReview = async (rating: number, comment: string) => {
    await createReview({
      productId,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      comment,
    });
  };

  return (
    <div>
      <h2>Reviews ({reviews.length})</h2>
      {reviews.map(review => (
        <div key={review.id}>
          <p>⭐ {review.rating}/5</p>
          <p>{review.comment}</p>
          <p>- {review.userName}</p>
        </div>
      ))}
    </div>
  );
}
```

---

### **3. useOrders() - Quản lý orders:**

```tsx
import { useOrders } from '../hooks/useDatabase';

function UserOrders({ userId }: { userId: string }) {
  const { orders, loading, createOrder, updateOrderStatus } = useOrders(userId);

  const handleCheckout = async (cartItems: any[]) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    await createOrder({
      userId,
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      status: 'pending',
    });
  };

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(order => (
        <div key={order.id}>
          <p>Order #{order.id}</p>
          <p>Total: {order.total.toLocaleString()}đ</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}
```

---

### **4. useMessages() - Quản lý contact messages:**

```tsx
import { useMessages } from '../hooks/useDatabase';

function AdminMessages() {
  const { messages, loading, updateMessageStatus } = useMessages();

  const markAsRead = async (id: string) => {
    await updateMessageStatus(id, 'read');
  };

  return (
    <div>
      <h2>Contact Messages</h2>
      {messages.map(msg => (
        <div key={msg.id}>
          <h3>{msg.subject}</h3>
          <p>{msg.message}</p>
          <p>From: {msg.name} ({msg.email})</p>
          <p>Status: {msg.status}</p>
          {msg.status === 'new' && (
            <button onClick={() => markAsRead(msg.id)}>Mark as Read</button>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

### **5. useStats() - Dashboard stats:**

```tsx
import { useStats } from '../hooks/useDatabase';

function Dashboard() {
  const { stats, loading } = useStats();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Orders</h3>
          <p>{stats.pendingOrders}</p>
        </div>
        <div className="stat-card">
          <h3>New Messages</h3>
          <p>{stats.newMessages}</p>
        </div>
      </div>
    </div>
  );
}
```

---

## 🌐 API Routes (RESTful)

### **Endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/:id` | Get user by ID |
| `POST` | `/api/users` | Create new user |
| `PUT` | `/api/users/:id` | Update user |
| `DELETE` | `/api/users/:id` | Delete user |
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/auth/register` | Register |
| `GET` | `/api/reviews` | Get all reviews |
| `POST` | `/api/reviews` | Create review |
| `DELETE` | `/api/reviews/:id` | Delete review |
| `GET` | `/api/orders` | Get all orders |
| `POST` | `/api/orders` | Create order |
| `PUT` | `/api/orders/:id` | Update order status |
| `GET` | `/api/messages` | Get all messages |
| `POST` | `/api/messages` | Create message |
| `PUT` | `/api/messages/:id` | Update message status |
| `GET` | `/api/stats` | Get stats |

---

### **Usage:**

```typescript
import { apiCall } from './server/api/routes';

// Get all users
const result = await apiCall('/api/users', 'GET');
if (result.success) {
  console.log(result.data);
}

// Create user
const result = await apiCall('/api/users', 'POST', {
  name: 'Test User',
  email: 'test@example.com',
  provider: 'email',
});

// Update user
const result = await apiCall('/api/users/123', 'PUT', {
  name: 'Updated Name',
});

// Delete user
const result = await apiCall('/api/users/123', 'DELETE');
```

---

## 💡 Examples

### **Example 1: Contact Form với Database:**

```tsx
import { useMessages } from '../hooks/useDatabase';

function ContactForm() {
  const { createMessage } = useMessages();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createMessage(formData);
      alert('Message sent successfully!');
      // Reset form
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      alert('Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Your Name"
        required
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Your Email"
        required
      />
      <input
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="Phone"
      />
      <input
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        placeholder="Subject"
        required
      />
      <textarea
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        placeholder="Your Message"
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
}
```

---

### **Example 2: Product Reviews với Database:**

```tsx
import { useReviews } from '../hooks/useDatabase';
import { useAuth } from '../contexts/AuthContext';

function ProductReviewsSection({ productId }: { productId: string }) {
  const { reviews, loading, createReview } = useReviews(productId);
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please login to submit review');
      return;
    }

    try {
      await createReview({
        productId,
        userId: user.id,
        userName: user.name,
        rating,
        comment,
      });
      
      alert('Review submitted!');
      setRating(5);
      setComment('');
    } catch (error) {
      alert('Failed to submit review');
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div>
      <h2>Customer Reviews ({reviews.length})</h2>
      
      {/* Review Form */}
      <form onSubmit={handleSubmitReview}>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
          <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
          <option value={3}>⭐⭐⭐ (3 stars)</option>
          <option value={2}>⭐⭐ (2 stars)</option>
          <option value={1}>⭐ (1 star)</option>
        </select>
        
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          required
        />
        
        <button type="submit">Submit Review</button>
      </form>

      {/* Review List */}
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <strong>{review.userName}</strong>
              <span>{'⭐'.repeat(review.rating)}</span>
            </div>
            <p>{review.comment}</p>
            <small>{new Date(review.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🎯 Benefits

### **1. Đơn giản:**
✅ Không cần setup phức tạp  
✅ Không cần API keys  
✅ Code dễ đọc, dễ maintain  

### **2. Nhanh:**
✅ In-memory database = super fast  
✅ Không cần network requests  
✅ Instant response  

### **3. Linh hoạt:**
✅ Dễ dàng thêm/sửa schema  
✅ TypeScript types đầy đủ  
✅ RESTful API chuẩn  

### **4. Developer-friendly:**
✅ React hooks sẵn sàng  
✅ Auto-refresh sau CRUD  
✅ Error handling built-in  

---

## 🚀 Future Enhancements

**Có thể thêm:**

1. **Persistence (Save to file):**
   ```typescript
   // Save database to JSON file
   fs.writeFileSync('database.json', JSON.stringify(database));
   ```

2. **Local Storage Sync:**
   ```typescript
   // Sync với localStorage
   localStorage.setItem('db', JSON.stringify(database));
   ```

3. **Search & Filter:**
   ```typescript
   db.users.search({ name: 'Nguyen' });
   db.products.filter({ category: 'pump', price: { min: 1000000 } });
   ```

4. **Pagination:**
   ```typescript
   db.users.getAll({ page: 1, limit: 10 });
   ```

5. **Relationships:**
   ```typescript
   const user = await db.users.getById('123');
   const userOrders = await user.getOrders();
   ```

---

## 📝 Summary

**Đã tạo:**
✅ `/server/data/database.ts` - Database engine  
✅ `/server/api/routes.ts` - RESTful API  
✅ `/hooks/useDatabase.ts` - React hooks  
✅ Full CRUD operations  
✅ TypeScript types  
✅ Auto-refresh  
✅ Error handling  

**Website VOLTOR giờ có database chuyên nghiệp 100% trong code, không cần Supabase! 🚀**

---

Made with ❤️ by VOLTOR Team  
Last updated: December 25, 2025
