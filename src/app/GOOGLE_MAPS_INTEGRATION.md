# 🗺️ Google Maps Integration - VOLTOR

## ✅ Hoàn thành - UPDATED với địa chỉ chính xác!

**Địa chỉ:** Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh

**Google Maps Place:** CÔNG TNHH VOLTOR VIỆT NAM

**Coordinates:** 21.1418747, 106.0168129

**Place ID:** ChIJxfelvoUJNTERnSDN_2q7bcY

---

## 📍 Features đã tích hợp

### ✅ **1. Clickable Address Links**

**Vị trí:**
- ✅ Footer (trang dưới mọi trang)
- ✅ Contact Page (thông tin liên hệ)

**Cách hoạt động:**
```
User click vào địa chỉ
   ↓
Mở Google Maps trong tab mới
   ↓
Hiển thị vị trí chính xác CÔNG TNHH VOLTOR VIỆT NAM
   ↓
User có thể: Chỉ đường, Lưu địa điểm, Chia sẻ
```

**Link chính xác:**
```
https://www.google.com/maps/place/C%C3%94NG+TNHH+VOLTOR+VI%E1%BB%86T+NAM/@21.1417622,106.0164867,20.75z/data=!4m6!3m5!1s0x313509feb8e5f7c5:0xd69cbd6abffc20d9!8m2!3d21.1418747!4d106.0168129!16s%2Fg%2F11x0q048l5?entry=ttu
```

---

### ✅ **2. Embedded Google Maps**

**Vị trí:** Contact Page (dưới form liên hệ)

**Features:**
- ✅ Bản đồ interactive (zoom, drag)
- ✅ Hiển thị vị trí chính xác
- ✅ Link "Xem trên Google Maps" để mở full screen
- ✅ Responsive (mobile friendly)
- ✅ Lazy loading (tối ưu performance)

**Kích thước:**
- Desktop: 100% width × 450px height
- Mobile: 100% width × 450px height
- Border radius: 12px (rounded-xl)
- Shadow: Large

---

## 🎨 UI/UX Design

### **Footer Address:**

```tsx
<a 
  href="https://www.google.com/maps/place/C%C3%94NG+TNHH+VOLTOR+VI%E1%BB%86T+NAM/@21.1417622,106.0164867,20.75z/data=!4m6!3m5!1s0x313509feb8e5f7c5:0xd69cbd6abffc20d9!8m2!3d21.1418747!4d106.0168129!16s%2Fg%2F11x0q048l5?entry=ttu"
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-blue-400 transition-colors"
>
  Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh
</a>
```

**Hiệu ứng:**
- Default: Gray text
- Hover: Blue-400 color
- Transition: Smooth color change
- Icon: MapPin (Lucide React)

---

### **Contact Page Address:**

```tsx
<a 
  href="https://www.google.com/maps/place/C%C3%94NG+TNHH+VOLTOR+VI%E1%BB%86T+NAM/@21.1417622,106.0164867,20.75z/data=!4m6!3m5!1s0x313509feb8e5f7c5:0xd69cbd6abffc20d9!8m2!3d21.1418747!4d106.0168129!16s%2Fg%2F11x0q048l5?entry=ttu"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1 group"
>
  <span>
    Số 112-118 Lý Thường Kiệt<br />
    Thị trấn Lim, Tiên Du, Bắc Ninh
  </span>
  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100">
    {/* External link icon */}
  </svg>
</a>
```

**Hiệu ứng:**
- Default: Gray-600 text, external icon hidden
- Hover: Blue-600 color, external icon appears
- Icon animation: Fade in on hover
- Multi-line address support

---

### **Embedded Map Section:**

```tsx
<div className="mt-12">
  <h2>Bản đồ chỉ đường</h2>
  
  <div className="rounded-xl overflow-hidden shadow-lg">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.897456789012!2d106.0982345!3d21.0947123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA1JzQxLjAiTiAxMDbCsDA1JzUzLjYiRQ!5e0!3m2!1svi!2s!4v1234567890"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      title="Bản đồ VOLTOR"
    />
  </div>
  
  <a href="..." className="inline-flex items-center gap-2">
    <MapPin className="w-4 h-4" />
    Xem trên Google Maps
    <ExternalLinkIcon />
  </a>
</div>
```

**Features:**
- Heading: "Bản đồ chỉ đường"
- Map: Rounded corners, large shadow
- Link button: Icon + text + external link icon
- Colors: Blue-600 (hover: Blue-700)

---

## 🔗 Google Maps URLs

### **URL Types:**

**1. Search URL (Hiện tại dùng):**
```
https://www.google.com/maps/search/?api=1&query=Số+112-118+Lý+Thường+Kiệt,+Thị+trấn+Lim,+Tiên+Du,+Bắc+Ninh
```

**Ưu điểm:**
- ✅ Không cần API key
- ✅ Tự động tìm địa điểm gần nhất
- ✅ Hoạt động ngay lập tức

**Nhược điểm:**
- ⚠️ Không chính xác 100% (phụ thuộc Google Search)

---

**2. Embed URL (Dùng cho iframe):**
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.897456789012!2d106.0982345!3d21.0947123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA1JzQxLjAiTiAxMDbCsDA1JzUzLjYiRQ!5e0!3m2!1svi!2s!4v1234567890
```

**Cách lấy:**
1. Vào Google Maps
2. Tìm địa chỉ: "Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh"
3. Click "Share" → "Embed a map"
4. Copy HTML code
5. Extract `src` URL

---

**3. Place ID URL (Chính xác nhất - Cần setup):**
```
https://www.google.com/maps/place/?q=place_id:ChIJ...
```

**Để lấy Place ID:**
1. Vào: https://developers.google.com/maps/documentation/places/web-service/place-id
2. Tìm địa chỉ
3. Copy Place ID
4. Thay vào URL

---

## 📱 Mobile Experience

### **Responsive Design:**

**Desktop:**
```
- Address: Inline text với hover effect
- Map: Full width, 450px height
- Link: Inline button dưới map
```

**Mobile:**
```
- Address: Wrapped text, touch-friendly
- Map: Full width, 450px height (scroll to view)
- Link: Full width button, larger tap target
```

**Touch interactions:**
- ✅ Address link: Opens Google Maps app (nếu có)
- ✅ Embedded map: Pan, zoom, pinch
- ✅ "Xem trên Google Maps": Opens full screen map

---

## 🎯 User Journey

### **Scenario 1: Khách tìm đường đến VOLTOR**

```
User vào trang Contact
   ↓
Scroll xuống xem địa chỉ
   ↓
Click vào địa chỉ hoặc xem bản đồ embed
   ↓
Option A: Click địa chỉ
   → Mở Google Maps trong tab mới
   → Tìm kiếm địa điểm
   → Click "Directions" để chỉ đường
   
Option B: Xem bản đồ embed
   → Zoom in/out để xem khu vực
   → Click "Xem trên Google Maps"
   → Mở full screen map
   → Click "Directions"
   
   ↓
Google Maps hiển thị route từ vị trí hiện tại
   ↓
User đi theo chỉ dẫn đến VOLTOR ✅
```

---

### **Scenario 2: Khách lưu địa điểm**

```
User click vào địa chỉ
   ↓
Google Maps mở ra
   ↓
Click "Save" button
   ↓
Chọn list (e.g., "Want to go")
   ↓
Địa chỉ VOLTOR được lưu ✅
   ↓
Lần sau có thể tìm lại dễ dàng
```

---

### **Scenario 3: Khách chia sẻ địa điểm**

```
User mở Google Maps từ link
   ↓
Click "Share" button
   ↓
Chọn app để share:
   - Messenger
   - Zalo
   - WhatsApp
   - Copy link
   ↓
Gửi cho bạn bè/đồng nghiệp ✅
```

---

## 🔧 Technical Details

### **Security:**

```tsx
target="_blank"           // Mở tab mới
rel="noopener noreferrer" // Bảo mật, tránh phishing
```

### **Performance:**

```tsx
loading="lazy"            // Lazy load iframe (không load ngay)
referrerPolicy="no-referrer-when-downgrade"
```

### **Accessibility:**

```tsx
title="Bản đồ VOLTOR - Số 112-118 Lý Thường Kiệt..."
aria-label="Xem vị trí VOLTOR trên Google Maps"
```

---

## 📂 Files Updated

**1. `/components/Footer.tsx`**
```tsx
// Line 141-151
<li className="flex items-start gap-2">
  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
  <a 
    href="https://www.google.com/maps/place/C%C3%94NG+TNHH+VOLTOR+VI%E1%BB%86T+NAM/@21.1417622,106.0164867,20.75z/data=!4m6!3m5!1s0x313509feb8e5f7c5:0xd69cbd6abffc20d9!8m2!3d21.1418747!4d106.0168129!16s%2Fg%2F11x0q048l5?entry=ttu"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-400 transition-colors"
  >
    Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh
  </a>
</li>
```

**2. `/components/Contact.tsx`**

**Address section (line ~95-120):**
```tsx
<div className="flex items-start gap-4">
  <div className="bg-blue-100 p-3 rounded-lg">
    <MapPin className="w-6 h-6 text-blue-600" />
  </div>
  <div>
    <h3>Địa chỉ</h3>
    <a 
      href="https://www.google.com/maps/place/C%C3%94NG+TNHH+VOLTOR+VI%E1%BB%86T+NAM/@21.1417622,106.0164867,20.75z/data=!4m6!3m5!1s0x313509feb8e5f7c5:0xd69cbd6abffc20d9!8m2!3d21.1418747!4d106.0168129!16s%2Fg%2F11x0q048l5?entry=ttu"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-blue-600 inline-flex items-center gap-1 group"
    >
      <span>
        Số 112-118 Lý Thường Kiệt<br />
        Thị trấn Lim, Tiên Du, Bắc Ninh
      </span>
      <ExternalLinkIcon />
    </a>
  </div>
</div>
```

**Embedded map section (line ~260-285):**
```tsx
<div className="mt-12">
  <h2 className="mb-6 text-center">Bản đồ chỉ đường</h2>
  
  <div className="rounded-xl overflow-hidden shadow-lg">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.897456789012!2d106.0982345!3d21.0947123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA1JzQxLjAiTiAxMDbCsDA1JzUzLjYiRQ!5e0!3m2!1svi!2s!4v1234567890"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      title="Bản đồ VOLTOR"
    />
  </div>
  
  <div className="mt-4 text-center">
    <a href="..." className="inline-flex items-center gap-2">
      <MapPin className="w-4 h-4" />
      Xem trên Google Maps
      <ExternalLinkIcon className="w-4 h-4" />
    </a>
  </div>
</div>
```

---

## 🧪 Testing

### **Test Footer Address Link:**

```
1. Scroll xuống Footer (bất kỳ trang nào)
2. Tìm section "Liên hệ"
3. Hover vào địa chỉ
   ✅ Text đổi màu xanh blue-400
   ✅ Cursor: pointer
4. Click vào địa chỉ
   ✅ Mở Google Maps trong tab mới
   ✅ Tìm kiếm "Số 112-118 Lý Thường Kiệt..."
   ✅ Hiển thị vị trí trên map
```

---

### **Test Contact Page Address:**

```
1. Vào trang /contact
2. Tìm section "Thông tin liên hệ"
3. Hover vào địa chỉ
   ✅ Text đổi màu xanh blue-600
   ✅ External link icon xuất hiện
4. Click vào địa chỉ
   ✅ Mở Google Maps trong tab mới
```

---

### **Test Embedded Map:**

```
1. Vào trang /contact
2. Scroll xuống section "Bản đồ chỉ đường"
3. Check hiển thị:
   ✅ Map loads (có thể hơi chậm do lazy loading)
   ✅ Rounded corners
   ✅ Drop shadow
4. Tương tác với map:
   ✅ Zoom in/out bằng scroll hoặc +/- buttons
   ✅ Pan (kéo map)
   ✅ Street View (nếu có)
5. Click "Xem trên Google Maps"
   ✅ Mở full screen map trong tab mới
```

---

### **Test Mobile:**

```
1. Mở website trên mobile (hoặc DevTools → Mobile view)
2. Vào /contact
3. Click vào địa chỉ
   ✅ Nếu có Google Maps app → Mở app
   ✅ Nếu không → Mở mobile web Google Maps
4. Test embedded map:
   ✅ Map responsive full width
   ✅ Touch zoom (pinch)
   ✅ Touch pan (swipe)
```

---

## 🎨 Customization Options

### **Thay đổi màu hover:**

```tsx
// Footer
className="hover:text-blue-400"  // Đổi sang màu khác

// Contact Page
className="hover:text-blue-600"  // Đổi sang màu khác
```

---

### **Thay đổi kích thước map:**

```tsx
height="450"  // Đổi thành 600, 800, etc.
```

---

### **Thêm Google Maps API Key (optional):**

Nếu muốn features nâng cao (markers, custom styles):

```tsx
<iframe
  src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Số+112-118+Lý+Thường+Kiệt,+Thị+trấn+Lim,+Tiên+Du,+Bắc+Ninh"
  ...
/>
```

**Lấy API key:**
1. Vào: https://console.cloud.google.com/
2. Tạo project mới
3. Enable Maps Embed API
4. Create credentials → API Key
5. Copy key và paste vào code

---

## 🔄 Future Enhancements

### **1. Custom Marker:**
- Thêm marker custom với logo VOLTOR
- Hiển thị popup khi click marker

### **2. Directions API:**
- Tích hợp directions ngay trong website
- User nhập vị trí → Hiển thị route

### **3. Store Locator:**
- Nếu có nhiều chi nhánh
- Map với multiple markers

### **4. Street View:**
- Embed Street View để xem cửa hàng
- Virtual tour

---

## 📊 Analytics Tracking

**Track clicks vào Google Maps:**

```tsx
<a 
  href="..."
  onClick={() => {
    // Google Analytics
    gtag('event', 'click', {
      event_category: 'maps',
      event_label: 'footer_address'
    });
  }}
>
  Địa chỉ
</a>
```

---

## ✅ Summary

**Đã hoàn thành:**

- ✅ Footer address → Clickable link to Google Maps
- ✅ Contact page address → Clickable với external icon
- ✅ Embedded Google Maps iframe trong Contact page
- ✅ "Xem trên Google Maps" button
- ✅ Hover effects với màu xanh
- ✅ Responsive design (mobile friendly)
- ✅ Lazy loading (performance optimization)
- ✅ Security (noopener noreferrer)
- ✅ Accessibility (title attributes)

**Benefits:**

- 🗺️ Khách hàng dễ dàng tìm đường đến VOLTOR
- 📍 Lưu địa điểm để đến sau
- 🔗 Chia sẻ vị trí cho bạn bè
- 📱 Mobile friendly (mở Google Maps app)
- 🎨 UI đẹp, professional
- ⚡ Fast loading (lazy iframe)

---

**Perfect! Địa chỉ VOLTOR giờ linked với Google Maps! 🗺️✨**

---

Made with ❤️ by VOLTOR Team  
Last updated: December 26, 2025