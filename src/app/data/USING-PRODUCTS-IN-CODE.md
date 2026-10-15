# SỬ DỤNG PRODUCTS TRỰC TIẾP TRONG CODE

## ✅ Có! Hoàn Toàn Được!

Bạn **KHÔNG CẦN MySQL database** để sử dụng products. Có 2 cách:

### Cách 1: JSON Data (Đơn giản nhất)
### Cách 2: TypeScript Data (Type-safe, recommended)

---

## 🚀 Cách 1: JSON Data

### Bước 1: Tạo file JSON
Tạo file `/data/dongyin-products.json`:

```json
[
  {
    "id": "qs-001",
    "name": "Bơm Điện Chìm QSD6-15-0.37 (1/2HP 0.37KW 220V)",
    "sku": "QSD6-15-0.37",
    "category": "Máy Bơm Chìm QS Series",
    "price": 2000000,
    "brand": "DONGYIN",
    "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
    "specs": {
      "power_hp": "1/2HP",
      "power_kw": "0.37KW",
      "voltage": "220V",
      "max_flow": "9 m³/h",
      "max_head": "17m"
    },
    "stock": 15,
    "featured": true
  }
]
```

### Bước 2: Import và sử dụng
```typescript
// ProductsPage.tsx
import productsData from '../data/dongyin-products.json';

function ProductsPage() {
  const [products, setProducts] = useState(productsData);
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 🎯 Cách 2: TypeScript Data (Recommended)

### Đã tạo sẵn: `/data/dongyin-products.ts`

### Sử dụng:

```typescript
// Import toàn bộ
import { dongyinProducts } from '../data/dongyin-products';

// Hoặc import helper functions
import { 
  getProductsByCategory,
  getProductsBySeries,
  getFeaturedProducts,
  searchProducts
} from '../data/dongyin-products';

// ProductsPage.tsx
function ProductsPage() {
  const [products, setProducts] = useState(dongyinProducts);
  
  // Filter by category
  const qsProducts = getProductsByCategory('Máy Bơm Chìm QS Series');
  
  // Get featured
  const featured = getFeaturedProducts();
  
  // Search
  const results = searchProducts('QS');
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 💾 LocalStorage (Lưu trữ local)

### Lưu và Load từ LocalStorage:

```typescript
// utils/storage.ts
export const saveProducts = (products: Product[]) => {
  localStorage.setItem('dongyin_products', JSON.stringify(products));
};

export const loadProducts = (): Product[] => {
  const data = localStorage.getItem('dongyin_products');
  return data ? JSON.parse(data) : dongyinProducts; // fallback to default
};

// Trong component
function ProductsPage() {
  const [products, setProducts] = useState(() => loadProducts());
  
  useEffect(() => {
    saveProducts(products);
  }, [products]);
}
```

---

## 🔄 State Management (Context API)

### Tạo Products Context:

```typescript
// contexts/ProductsContext.tsx
import { createContext, useContext, useState } from 'react';
import { dongyinProducts } from '../data/dongyin-products';

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(dongyinProducts);
  
  const addProduct = (product) => {
    setProducts([...products, product]);
  };
  
  const updateProduct = (id, updates) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, ...updates } : p
    ));
  };
  
  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };
  
  return (
    <ProductsContext.Provider value={{ 
      products, 
      addProduct, 
      updateProduct, 
      deleteProduct 
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
```

### Sử dụng Context:

```typescript
// App.tsx
import { ProductsProvider } from './contexts/ProductsContext';

function App() {
  return (
    <ProductsProvider>
      <Router>
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Router>
    </ProductsProvider>
  );
}

// ProductsPage.tsx
import { useProducts } from '../contexts/ProductsContext';

function ProductsPage() {
  const { products } = useProducts();
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 🛠️ Tạo Data Generator Tool

Tôi có thể tạo tool để convert SQL -> JSON/TypeScript:

```bash
# Chạy tool (nếu có Node.js)
node tools/sql-to-json.js database/seed-products-dongyin-complete.sql > data/products.json
```

---

## 📊 So Sánh Các Cách

| Cách | Ưu Điểm | Nhược Điểm |
|------|---------|-----------|
| **JSON File** | ✅ Đơn giản nhất<br>✅ Dễ edit<br>✅ Không cần setup | ❌ Không có type safety<br>❌ File có thể lớn |
| **TypeScript** | ✅ Type safety<br>✅ Autocomplete<br>✅ Helper functions | ❌ Cần compile<br>❌ File lớn hơn |
| **LocalStorage** | ✅ Persist data<br>✅ Không cần server | ❌ Giới hạn 5-10MB<br>❌ Chỉ trên 1 browser |
| **Context API** | ✅ Global state<br>✅ Dễ update | ❌ Re-render nhiều nếu không tối ưu |
| **MySQL + API** | ✅ Scalable<br>✅ Multi-user<br>✅ Secure | ❌ Cần backend<br>❌ Phức tạp hơn |

---

## 🎁 File Mẫu Hoàn Chỉnh

Tôi đã tạo file `/data/dongyin-products.ts` với:

✅ TypeScript interfaces
✅ 4 products mẫu (QS Series)
✅ Helper functions:
- `getProductsByCategory()`
- `getProductsBySeries()`
- `getProductsByVoltage()`
- `getProductBySlug()`
- `getFeaturedProducts()`
- `searchProducts()`

---

## 📝 Bạn Cần Gì Tiếp?

### Option 1: File JSON đầy đủ 120 sản phẩm
Tôi sẽ generate file `dongyin-products.json` với tất cả 120 sản phẩm

### Option 2: TypeScript file đầy đủ
Mở rộng `/data/dongyin-products.ts` với 120 sản phẩm

### Option 3: Converter Tool
Tạo tool tự động convert SQL -> JSON/TS

### Option 4: Hybrid (Recommended)
- Dùng JSON cho data (dễ quản lý)
- Dùng TypeScript cho logic
- Context API cho state management

---

## ⚡ Quick Example - Hoàn Chỉnh

```typescript
// 1. Import data
import { dongyinProducts, searchProducts } from '../data/dongyin-products';

// 2. Tạo component
function ProductsPage() {
  const [products, setProducts] = useState(dongyinProducts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  
  // Filter
  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (search) {
      result = searchProducts(search);
    }
    
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    
    return result;
  }, [products, search, category]);
  
  return (
    <div className="p-8">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm kiếm sản phẩm..."
        className="mb-4 p-2 border rounded"
      />
      
      {/* Category Filter */}
      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="all">Tất cả</option>
        <option value="Máy Bơm Chìm QS Series">QS Series</option>
        <option value="Máy Bơm Chìm WS Series">WS Series</option>
      </select>
      
      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <img src={product.image} alt={product.name} />
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-xl text-blue-600">
              {product.price.toLocaleString('vi-VN')} VND
            </p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
              Mua ngay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
```

---

## 🎯 Bạn Muốn Cách Nào?

Cho tôi biết và tôi sẽ:
1. ✅ Tạo file JSON đầy đủ 120 sản phẩm
2. ✅ Hoàn thiện TypeScript file
3. ✅ Tạo example components
4. ✅ Setup Context API
5. ✅ Tạo converter tool

**Chỉ cần nói: "Tạo file JSON đầy đủ" hoặc "Tôi muốn dùng TypeScript" là xong!** 🚀
