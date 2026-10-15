# 📚 API Documentation - VOLTOR Backend System

## 🌐 Base URL
```
https://${projectId}.supabase.co/functions/v1/make-server-4fdd321a
```

## 🔐 Authentication Header
```javascript
Authorization: Bearer ${publicAnonKey}
```

---

## 👤 USER ROUTES

### 1. Register New User
**POST** `/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "Nguyễn Văn A"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "Nguyễn Văn A",
    "createdAt": "2025-01-15T10:00:00Z"
  },
  "message": "Đăng ký thành công"
}
```

---

### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "name": "Nguyễn Văn A",
    "createdAt": "2025-01-15T10:00:00Z"
  },
  "message": "Đăng nhập thành công"
}
```

---

## ⭐ REVIEW ROUTES

### 3. Get All Reviews for a Product
**GET** `/reviews/:productId`

**Example:** `/reviews/pump-001`

**Response:**
```json
{
  "success": true,
  "reviews": [
    {
      "id": "uuid-here",
      "productId": "pump-001",
      "userEmail": "user@example.com",
      "userName": "Nguyễn Văn A",
      "rating": 5,
      "comment": "Sản phẩm rất tốt!",
      "helpful": 12,
      "verified": false,
      "createdAt": "2025-01-15T10:00:00Z"
    }
  ]
}
```

---

### 4. Create New Review
**POST** `/reviews`

**Request Body:**
```json
{
  "productId": "pump-001",
  "userEmail": "user@example.com",
  "userName": "Nguyễn Văn A",
  "rating": 5,
  "comment": "Máy bơm hoạt động rất tốt, tôi rất hài lòng!"
}
```

**Response:**
```json
{
  "success": true,
  "review": {
    "id": "uuid-here",
    "productId": "pump-001",
    "userEmail": "user@example.com",
    "userName": "Nguyễn Văn A",
    "rating": 5,
    "comment": "Máy bơm hoạt động rất tốt, tôi rất hài lòng!",
    "helpful": 0,
    "verified": false,
    "createdAt": "2025-01-15T10:00:00Z"
  },
  "message": "Đánh giá đã được gửi thành công"
}
```

---

### 5. Mark Review as Helpful
**POST** `/reviews/:productId/:reviewId/helpful`

**Example:** `/reviews/pump-001/uuid-here/helpful`

**Response:**
```json
{
  "success": true,
  "review": {
    "id": "uuid-here",
    "helpful": 13,
    ...
  }
}
```

---

### 6. Delete Review
**DELETE** `/reviews/:productId/:reviewId`

**Request Body:**
```json
{
  "userEmail": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Đã xóa đánh giá"
}
```

---

## 🏥 Health Check
**GET** `/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-15T10:00:00Z"
}
```

---

## 💾 Database Structure

### Users
Key format: `user:{email}`
```javascript
{
  id: string,
  email: string,
  password: string, // ⚠️ WARNING: In production, use bcrypt!
  name: string,
  createdAt: ISO8601 string
}
```

### Reviews
Key format: `review:{productId}:{reviewId}`
```javascript
{
  id: string,
  productId: string,
  userEmail: string,
  userName: string,
  rating: number (1-5),
  comment: string,
  helpful: number,
  verified: boolean,
  createdAt: ISO8601 string
}
```

---

## 🔧 Frontend Integration Example

```javascript
import { projectId, publicAnonKey } from './utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-4fdd321a`;

// Register user
async function registerUser(email, password, name) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify({ email, password, name })
  });
  
  const data = await response.json();
  console.log('Register result:', data);
  return data;
}

// Login user
async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  console.log('Login result:', data);
  return data;
}

// Get product reviews
async function getReviews(productId) {
  const response = await fetch(`${BASE_URL}/reviews/${productId}`, {
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`
    }
  });
  
  const data = await response.json();
  console.log('Reviews:', data);
  return data;
}

// Create review
async function createReview(productId, userEmail, userName, rating, comment) {
  const response = await fetch(`${BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`
    },
    body: JSON.stringify({
      productId,
      userEmail,
      userName,
      rating,
      comment
    })
  });
  
  const data = await response.json();
  console.log('Review created:', data);
  return data;
}
```

---

## ⚠️ Important Notes

1. **Password Security**: Mật khẩu hiện tại được lưu dạng plain text. Trong production, bạn PHẢI sử dụng bcrypt hoặc tương tự để hash password!

2. **Authorization**: Tất cả requests cần có header Authorization với publicAnonKey

3. **Error Handling**: Server trả về error messages chi tiết trong console logs. Nhớ xử lý errors trong frontend!

4. **Data Persistence**: Dữ liệu được lưu trong Supabase KV Store và sẽ tồn tại ngay cả khi reload trang

5. **Testing**: Bạn có thể test các API endpoints bằng Postman hoặc curl

---

## 📞 Contact Information

- **Phone**: (+84) 836 389 488
- **Email**: voltorvietnam@gmail.com
- **Address**: Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh
- **Zalo**: https://zalo.me/84836389488
- **Facebook**: https://www.facebook.com/profile.php?id=61576883068377

---

Made with ❤️ by VOLTOR Team
