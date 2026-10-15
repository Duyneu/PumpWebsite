# 🛣️ URL Routing System - React Router

## ✅ Hoàn thành!

Website VOLTOR giờ có **URL routing thật** với React Router! Mỗi trang có URL riêng, có thể bookmark, share link, và browser back/forward hoạt động hoàn hảo.

---

## 🎯 Tổng quan

### **Trước (State-based):**
```
URL: https://domain.com/  (không đổi)
Trang chủ  → State: currentPage = 'home'
Sản phẩm   → State: currentPage = 'products'
Liên hệ    → State: currentPage = 'contact'
```

❌ Không có URL riêng  
❌ Không bookmark được  
❌ Không share link được  
❌ Back button không hoạt động đúng  

---

### **Sau (URL-based với React Router):**
```
Trang chủ       → https://domain.com/
Giới thiệu      → https://domain.com/about
Sản phẩm        → https://domain.com/products
Chi tiết SP     → https://domain.com/products/sp-001
Giỏ hàng        → https://domain.com/cart
Liên hệ         → https://domain.com/contact
Đăng nhập       → https://domain.com/login
Setup Profile   → https://domain.com/profile-setup
```

✅ Mỗi trang có URL riêng  
✅ Có thể bookmark  
✅ Có thể share link  
✅ Back/Forward hoạt động hoàn hảo  
✅ SEO friendly  

---

## 📂 Cấu trúc mới

### **Architecture:**

```
/src
├── App.tsx                    ← Root với BrowserRouter
├── contexts/
│   ├── AuthContext.tsx        ← Quản lý authentication
│   └── CartContext.tsx        ← Quản lý shopping cart
├── pages/                     ← Page components (NEW!)
│   ├── HomePage.tsx           ← /
│   ├── AboutPage.tsx          ← /about
│   ├── ProductsPage.tsx       ← /products
│   ├── ProductDetailPage.tsx  ← /products/:productId
│   ├── CartPage.tsx           ← /cart
│   ├── ContactPage.tsx        ← /contact
│   ├── LoginPage.tsx          ← /login
│   └── ProfileSetupPage.tsx   ← /profile-setup
├── components/
│   ├── Layout.tsx             ← Wrapper (Header + Footer + Chatbot)
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
└── data/
    └── products.ts
```

---

## 🗺️ Routes Map

### **Public Routes (có Layout):**

| URL | Component | Mô tả |
|-----|-----------|-------|
| `/` | HomePage | Trang chủ với Hero + Featured Products |
| `/about` | AboutPage | Giới thiệu công ty |
| `/products` | ProductsPage | Danh sách tất cả sản phẩm |
| `/products/:id` | ProductDetailPage | Chi tiết 1 sản phẩm |
| `/cart` | CartPage | Giỏ hàng |
| `/contact` | ContactPage | Form liên hệ |

### **Auth Routes (không có Layout):**

| URL | Component | Mô tả |
|-----|-----------|-------|
| `/login` | LoginPage | Đăng nhập Email/OAuth |
| `/profile-setup` | ProfileSetupPage | Hỏi tên sau OAuth |

### **Special:**

| URL | Action |
|-----|--------|
| `/*` (404) | Redirect → `/` |

---

## 🔧 Implementation Details

### **1. App.tsx - Root Router:**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Layout routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              {/* ... */}
            </Route>

            {/* Standalone routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile-setup" element={<ProfileSetupPage />} />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

---

### **2. Layout.tsx - Wrapper Component:**

**Trách nhiệm:**
- ✅ Render Header + Footer + Chatbot
- ✅ Wrap `<Outlet />` cho child routes
- ✅ Quản lý navigation logic
- ✅ Access AuthContext & CartContext

```tsx
<div className="min-h-screen">
  <Header {...} />
  
  <main>
    <PageTransition>
      <Outlet /> {/* Child routes render here */}
    </PageTransition>
  </main>
  
  <Footer {...} />
  <Chatbot />
</div>
```

---

### **3. Context API:**

#### **AuthContext:**
```tsx
const { 
  user,           // Current user object
  isLoggedIn,     // Boolean
  login(),        // Email/password login
  logout(),       // Clear user
  handleOAuthSuccess(),  // OAuth callback
  completeProfile()      // Sau khi setup tên
} = useAuth();
```

#### **CartContext:**
```tsx
const {
  cartItems,      // Array<CartItem>
  totalItems,     // Number
  addToCart(),    // Thêm SP
  updateQuantity(),  // Update số lượng
  removeFromCart(),  // Xóa SP
  clearCart()     // Clear all
} = useCart();
```

---

### **4. Navigation:**

#### **Trong Components:**
```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate to route
navigate('/products');

// Navigate with state
navigate(`/products/${product.id}`, { 
  state: { product } 
});

// Replace (không add history)
navigate('/login', { replace: true });

// Go back
navigate(-1);
```

#### **Trong Links:**
```tsx
import { Link } from 'react-router-dom';

<Link to="/products">Sản phẩm</Link>
<Link to={`/products/${id}`}>Chi tiết</Link>
```

---

## 🎯 User Flows

### **Flow 1: OAuth Login → Profile Setup → Home**

```
1. User vào website → URL: /

2. Click "Đăng nhập" → Navigate: /login
   ✅ URL thay đổi: /login
   ✅ Header/Footer ẩn (no Layout)

3. Click "Đăng nhập với Facebook"
   → Popup OAuth loading...
   → Popup đóng
   
4. Navigate: /profile-setup
   ✅ URL: /profile-setup
   ✅ Trang hỏi tên hiển thị

5. Nhập tên → Click "Tiếp tục"
   → completeProfile("Minh Võ")
   → Navigate: / (replace)
   
6. ✅ Về trang chủ
   ✅ URL: /
   ✅ Đã đăng nhập
   ✅ Tên: "Minh Võ"
```

---

### **Flow 2: Browse Products → Detail → Cart**

```
1. Trang chủ → URL: /

2. Click "Xem tất cả" → Navigate: /products
   ✅ URL: /products
   ✅ Tất cả sản phẩm hiển thị

3. Click sản phẩm "Máy bơm ABC"
   → Navigate: /products/sp-001
   ✅ URL: /products/sp-001
   ✅ Chi tiết sản phẩm

4. Click "Thêm vào giỏ hàng"
   → addToCart(product)
   ✅ Cart count +1 ở Header

5. Click icon giỏ hàng ở Header
   → Navigate: /cart
   ✅ URL: /cart
   ✅ Giỏ hàng hiển thị

6. Click "Tiếp tục mua hàng"
   → Navigate: /products
   ✅ URL: /products
```

---

### **Flow 3: Direct URL Access**

```
User nhận link: https://domain.com/products/sp-001

1. Open link
   ✅ Website load
   ✅ Header/Footer hiển thị
   ✅ Chi tiết sản phẩm sp-001 hiển thị
   ✅ URL: /products/sp-001

User có thể:
   - Bookmark page này
   - Share link với người khác
   - Reload page → Vẫn ở đúng trang
```

---

## 🔒 Protected Routes (Future)

**Có thể thêm:**

```tsx
// ProtectedRoute.tsx
function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Usage in App.tsx
<Route path="/profile" element={
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
} />
```

---

## 🧪 Testing Routes

### **Manual Test:**

**1. Navigate via Menu:**
```
Click "Trang chủ" → Check URL: /
Click "Sản phẩm" → Check URL: /products
Click "Liên hệ" → Check URL: /contact
```

**2. Navigate via Product:**
```
Home → Click product → Check URL: /products/{id}
```

**3. Direct URL:**
```
Type: /about → Enter → About page hiển thị
Type: /cart → Enter → Cart page hiển thị
Type: /random → Enter → Redirect về /
```

**4. Browser Navigation:**
```
Click product → Click Back button → Về trang trước
Click Forward → Về trang product
```

**5. OAuth Flow:**
```
URL: / 
→ Click "Đăng nhập" 
→ URL: /login
→ Click Facebook
→ URL: /profile-setup
→ Nhập tên
→ URL: / (đã login)
```

---

## 🎨 Benefits

### **1. Better UX:**
✅ URL phản ánh đúng trang hiện tại  
✅ Back/Forward button hoạt động đúng  
✅ Có thể bookmark bất kỳ trang nào  
✅ Share link chính xác  

### **2. SEO:**
✅ Mỗi page có URL unique  
✅ Google có thể index từng trang  
✅ Better search visibility  

### **3. Development:**
✅ Code dễ maintain hơn  
✅ Separation of concerns (pages vs components)  
✅ Reusable Layout component  
✅ Context API cho global state  

### **4. Analytics:**
✅ Track page views chính xác  
✅ User journey rõ ràng  
✅ Conversion tracking dễ dàng  

---

## 📊 Before vs After

| Feature | Before (State) | After (Router) |
|---------|---------------|----------------|
| **URL changes** | ❌ No | ✅ Yes |
| **Bookmark page** | ❌ No | ✅ Yes |
| **Share link** | ❌ Only homepage | ✅ Any page |
| **Back button** | ⚠️ Sometimes | ✅ Always works |
| **SEO** | ⚠️ Single page | ✅ Multiple pages |
| **Code structure** | ⚠️ Monolithic | ✅ Modular |
| **Browser history** | ❌ No | ✅ Yes |
| **Deep linking** | ❌ No | ✅ Yes |

---

## 🚀 Future Enhancements

**Có thể thêm:**

1. **Lazy Loading:**
   ```tsx
   const ProductsPage = lazy(() => import('./pages/ProductsPage'));
   ```

2. **Route Transitions:**
   - Animate khi chuyển trang
   - Loading skeleton

3. **Protected Routes:**
   - Kiểm tra auth trước khi vào trang
   - Redirect về login nếu chưa đăng nhập

4. **Query Parameters:**
   ```
   /products?category=pump&sort=price
   ```

5. **Breadcrumbs:**
   ```
   Home > Sản phẩm > Máy bơm ly tâm > Chi tiết
   ```

6. **404 Page:**
   - Custom 404 page thay vì redirect
   - Suggestions cho user

---

## 📝 Migration Notes

### **Key Changes:**

**1. Removed from App.tsx:**
- ❌ `currentPage` state
- ❌ `handleNavigate()` function
- ❌ Manual page rendering logic
- ❌ Conditional rendering

**2. Added:**
- ✅ React Router setup
- ✅ Context providers (Auth, Cart)
- ✅ Page components in `/pages` folder
- ✅ Layout component
- ✅ Route configuration

**3. Updated Components:**
- Header: Use `useNavigate()` thay vì callback
- Footer: Use `useNavigate()` thay vì callback
- ProductGrid: Navigate với product ID
- All navigation buttons: Use router

---

## 💡 Tips

### **1. Debugging:**
```tsx
// Xem current route
import { useLocation } from 'react-router-dom';

const location = useLocation();
console.log('Current path:', location.pathname);
console.log('State:', location.state);
```

### **2. Scroll to Top:**
```tsx
// ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Usage in App.tsx
<ScrollToTop />
<Routes>...</Routes>
```

### **3. Active Link Styling:**
```tsx
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/products"
  className={({ isActive }) => 
    isActive ? 'text-blue-600' : 'text-gray-600'
  }
>
  Sản phẩm
</NavLink>
```

---

## 🎉 Summary

**Đã hoàn thành:**
✅ React Router setup  
✅ AuthContext & CartContext  
✅ 8 pages với routes riêng  
✅ Layout component  
✅ OAuth flow với routing  
✅ Product detail với dynamic route  
✅ 404 handling  
✅ Browser navigation hoạt động  

**Website VOLTOR giờ có hệ thống routing chuyên nghiệp như các website thật! 🚀**

---

Made with ❤️ by VOLTOR Team  
Last updated: December 25, 2025
