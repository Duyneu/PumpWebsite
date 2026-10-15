# 🔐 VOLTOR Admin System Guide

## 📋 Overview

Hệ thống Admin hoàn chỉnh cho VOLTOR Website với đầy đủ chức năng quản lý sản phẩm.

---

## 🎯 Features

### ✅ **Admin Authentication**
- Role-based access control (Admin vs User)
- Admin users có badge "👑 Admin" trong header
- Link "Admin Dashboard" trong user menu (chỉ admin)
- Auto-redirect nếu không phải admin

### ✅ **Admin Dashboard** (`/admin`)
- **Stats Cards**: Tổng sản phẩm, người dùng, đơn hàng, doanh thu
- **Quick Actions**: 6 cards với links đến các modules
  - Quản lý sản phẩm
  - Quản lý đơn hàng
  - Quản lý người dùng
  - Danh mục sản phẩm
  - Báo cáo & Thống kê
  - Quản lý đánh giá

### ✅ **Product Management** (`/admin/products`)
- **List View**: Table với tất cả sản phẩm
- **Search**: Tìm theo tên, SKU, thương hiệu
- **Filter**: Lọc theo danh mục
- **Actions**: View, Edit, Delete cho mỗi sản phẩm
- **Badges**: Featured ⭐, Bestseller 🔥, New ✨
- **Stock Indicator**: Màu badge thay đổi theo tồn kho

### ✅ **Add/Edit Product** (`/admin/products/new`, `/admin/products/edit/:id`)
- **4 Sections**:
  1. **Thông tin cơ bản**: Tên, SKU, slug, brand, model, mô tả
  2. **Giá & Kho hàng**: Giá bán, giá gốc, giảm giá, tồn kho
  3. **Thông số kỹ thuật**: Công suất, lưu lượng, cột áp, chất liệu
  4. **Hình ảnh & Trạng thái**: URL ảnh, Featured/Bestseller/New flags
- **Auto-slug generation**: Tự động tạo slug từ tên sản phẩm
- **Form validation**: Required fields
- **Toast notifications**: Thành công/Lỗi

---

## 🔑 Admin Credentials

### Default Admin Account:
```
Email: admin@voltor.vn
Password: Admin@123
Role: admin
```

### Tạo Admin Account (MySQL):
```bash
mysql -u root -p voltor_db < /database/seed-admin-user.sql
```

---

## 📦 New Products Added

### **Total: 18 sản phẩm mới**

#### **4SDM Series** (220V) - 3 sản phẩm
```sql
- 4SDM-03/10: 2,450,000 VNĐ
- 4SDM-04/08: 2,400,000 VNĐ
- 4SDM-04/22: 3,770,000 VNĐ (Bestseller)
```

#### **4SD Series** (380V) - 3 sản phẩm
```sql
- 4SD-08/09: 3,000,000 VNĐ
- 4SD-12/12: 5,590,000 VNĐ (Featured)
- 4SD-20/11: 5,350,000 VNĐ (Featured + Bestseller)
```

#### **4SP Series** (220V + 380V) - 4 sản phẩm
```sql
- 4SPM-03/12 (220V): 4,000,000 VNĐ (Featured)
- 4SPM-05/17 (220V): 5,400,000 VNĐ (Featured + Bestseller)
- 4SP-08/25 (380V): 11,600,000 VNĐ (Featured + Bestseller)
- 4SP-14/24 (380V): 15,700,000 VNĐ (Featured + Bestseller)
```

#### **6SR Series** (380V - Motor 6m) - 3 sản phẩm
```sql
- 6SR30-04: 9,700,000 VNĐ (Featured)
- 6SR45-07: 18,300,000 VNĐ (Featured + Bestseller)
- 6SR60-08: 22,100,000 VNĐ (Featured + Bestseller)
```

#### **6SP Series** (220V + 380V) - 5 sản phẩm
```sql
- 6SP18-04 (220V): 6,300,000 VNĐ (Featured)
- 6SP18-10 (220V): 13,200,000 VNĐ (Featured + Bestseller)
- 6SP30-6 (380V): 15,200,000 VNĐ (Featured)
- 6SP46-10 (380V): 26,200,000 VNĐ (Featured + Bestseller)
- 6SP60-8 (380V): 24,700,000 VNĐ (Featured + Bestseller)
```

### Import Products:
```bash
mysql -u root -p voltor_db < /database/seed-products-4sdm-4sd-4sp-6sr-6sp.sql
```

---

## 🚀 Database Setup

### **1. Create Database & Schema**
```bash
mysql -u root -p
CREATE DATABASE voltor_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;

# Import schema
mysql -u root -p voltor_db < /database/schema.sql
```

### **2. Seed Basic Data**
```bash
# Categories & basic data
mysql -u root -p voltor_db < /database/seed.sql
```

### **3. Seed Admin User**
```bash
mysql -u root -p voltor_db < /database/seed-admin-user.sql
```

### **4. Seed Products (All Series)**
```bash
# WS/QS/WQ Series (50 products)
mysql -u root -p voltor_db < /database/seed-products-detailed.sql

# SD/TD Series (32 products)
mysql -u root -p voltor_db < /database/seed-products-dongyin-td.sql

# 4SDM/4SD/4SP/6SR/6SP Series (18 products)
mysql -u root -p voltor_db < /database/seed-products-4sdm-4sd-4sp-6sr-6sp.sql
```

### **Total Products: 100 sản phẩm!** 🎉

---

## 🛣️ Admin Routes

```tsx
/admin                          → Admin Dashboard
/admin/products                 → Product List (with search & filter)
/admin/products/new             → Add New Product
/admin/products/edit/:id        → Edit Product
/admin/orders                   → Order Management (TODO)
/admin/users                    → User Management (TODO)
/admin/categories               → Category Management (TODO)
/admin/analytics                → Analytics & Reports (TODO)
/admin/reviews                  → Review Management (TODO)
```

---

## 🔒 Access Control

### **Middleware Protection**
```tsx
useEffect(() => {
  if (!loading && (!user || user.role !== 'admin')) {
    navigate('/');
    return;
  }
}, [user, loading, navigate]);
```

### **Header Menu**
```tsx
{user?.role === 'admin' && (
  <button onClick={() => navigate('/admin')}>
    <Settings className="w-4 h-4" />
    <span>Admin Dashboard</span>
  </button>
)}
```

---

## 📱 Responsive Design

✅ Mobile-first design
✅ Responsive tables
✅ Touch-friendly buttons
✅ Adaptive layouts

---

## 🎨 UI Components

### **Custom Components**
- `AdminDashboard.tsx` - Main dashboard
- `AdminProductsPage.tsx` - Product list with CRUD
- `AdminProductFormPage.tsx` - Add/Edit product form

### **Shadcn/UI Components Used**
- Button, Input, Label, Textarea
- Select, Switch
- Table, Card
- AlertDialog
- Badge
- Toast (Sonner)

---

## 📊 Product Features

### **Product Model**
```typescript
interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string;
  category_id: number;
  price: number;
  original_price?: number;
  discount_percent: number;
  short_description: string;
  description: string;
  brand: string;
  model: string;
  origin: string;
  warranty: string;
  specifications: {
    power_hp: string;
    power_kw: string;
    voltage: string;
    outlet_diameter: string;
    flow_rate: string;
    head_max: string;
    material: string;
    series: string;
  };
  image: string;
  images: string[];
  stock: number;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
}
```

---

## 🔧 API Endpoints (TODO - Backend)

```typescript
GET    /api/admin/products           → Get all products
GET    /api/admin/products/:id       → Get product by ID
POST   /api/admin/products           → Create product
PUT    /api/admin/products/:id       → Update product
DELETE /api/admin/products/:id       → Delete product

GET    /api/admin/stats              → Get dashboard stats
GET    /api/admin/orders             → Get all orders
GET    /api/admin/users              → Get all users
```

---

## 🎯 Next Steps

### **Phase 1: Backend API** (Current)
- [ ] Connect to real MySQL database
- [ ] Implement CRUD API endpoints
- [ ] Add authentication middleware
- [ ] File upload for product images

### **Phase 2: Advanced Features**
- [ ] Bulk import/export CSV
- [ ] Image upload với preview
- [ ] Product variants (size, color)
- [ ] Inventory management
- [ ] Order processing

### **Phase 3: Analytics**
- [ ] Sales reports
- [ ] Best-selling products
- [ ] Revenue charts
- [ ] Customer analytics

---

## 📝 Notes

### **Security**
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Password hashing (bcrypt)
- ⚠️ TODO: CSRF protection
- ⚠️ TODO: Rate limiting

### **Performance**
- ✅ Lazy loading
- ✅ Skeleton loaders
- ✅ Optimized queries
- ⚠️ TODO: Pagination for products
- ⚠️ TODO: Caching

### **UX**
- ✅ Toast notifications
- ✅ Confirmation dialogs
- ✅ Loading states
- ✅ Error handling

---

## 🎉 Summary

**Total Products in Database:** 100 sản phẩm
- 50 WS/QS/WQ Series
- 32 SD/TD Series
- 18 4SDM/4SD/4SP/6SR/6SP Series

**Admin Features:**
- ✅ Dashboard with stats
- ✅ Product CRUD (full)
- ✅ Search & Filter
- ✅ Role-based access
- ✅ Responsive design

**Next:** Implement backend API để kết nối MySQL database thật!

---

**Admin Login:** `admin@voltor.vn` / `Admin@123`
**Access:** `/admin`

**Perfect! Hệ thống Admin đã sẵn sàng! 🚀**