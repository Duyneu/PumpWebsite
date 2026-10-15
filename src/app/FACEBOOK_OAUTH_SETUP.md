# 🔐 Hướng dẫn Setup Facebook OAuth THẬT

## 📋 Tổng quan

Website hiện đang chạy **2 MODES**:

### 🎭 Mode 1: DEMO MODE (Hiện tại - mặc định)
- Click nút Facebook → Popup mở đến `https://www.facebook.com/login`
- Xem giao diện Facebook thật
- Sau 5 giây tự động "thành công" với mock data

### 🔐 Mode 2: REAL MODE (Khi có Facebook App ID)
- Click nút Facebook → Popup mở UI giống Facebook thật
- Chọn account → Login thật
- Nhận data thật từ Facebook

---

## 🚀 Cách chuyển từ DEMO → REAL MODE

### Bước 1: Đăng ký Facebook App (15 phút)

1. **Truy cập Facebook Developers**
   ```
   https://developers.facebook.com/apps/
   ```

2. **Tạo App mới**
   - Click nút **"Create App"**
   - Chọn **"Consumer"** (cho user login)
   - Click **"Next"**

3. **Điền thông tin App**
   ```
   App Name: VOLTOR Vietnam
   App Contact Email: voltorvietnam@gmail.com
   Business Account: (để trống nếu không có)
   ```
   - Click **"Create App"**

4. **Xác thực Security Check**
   - Hoàn thành CAPTCHA

5. **✅ App đã được tạo!**

---

### Bước 2: Thêm Facebook Login Product

1. **Trong Dashboard của App**
   - Tìm section **"Add Products to Your App"**
   - Tìm **"Facebook Login"**
   - Click **"Set Up"**

2. **Chọn Platform**
   - Chọn **"Web"**

3. **Nhập Site URL**
   ```
   Cho Development:  http://localhost:5173
   Cho Production:   https://your-domain.com
   ```
   - Click **"Save"**
   - Click **"Continue"**

4. **Skip các bước còn lại**
   - Click **"Next"** → **"Next"** → **"Finish"**

---

### Bước 3: Cấu hình OAuth Redirect URIs

1. **Vào Facebook Login Settings**
   - Sidebar → **Products** → **Facebook Login** → **Settings**

2. **Thêm Valid OAuth Redirect URIs**
   ```
   http://localhost:5173/auth/callback
   https://your-domain.com/auth/callback
   ```
   
   **⚠️ LƯU Ý:**
   - Mỗi URI một dòng
   - Phải khớp chính xác (không có trailing slash)
   - Có thể thêm nhiều URIs cho dev + production

3. **Scroll xuống cuối**
   - Click **"Save Changes"**

---

### Bước 4: Lấy App ID

1. **Vào Settings → Basic**
   - Sidebar → **Settings** → **Basic**

2. **Copy App ID**
   ```
   App ID: 123456789012345
   ```
   
   Ví dụ:
   ```
   1234567890123456
   ```

3. **⚠️ QUAN TRỌNG: Copy App Secret (giữ bí mật!)**
   ```
   App Secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   - Click **"Show"** để xem
   - **KHÔNG ĐƯỢC SHARE** App Secret công khai

---

### Bước 5: Cập nhật Code

1. **Mở file `/config/oauth.config.ts`**

2. **Thay App ID**
   ```typescript
   facebook: {
     // Thay dòng này:
     appId: 'YOUR_FACEBOOK_APP_ID',
     
     // Thành App ID thật:
     appId: '1234567890123456', // ← Paste App ID vào đây
     
     // ...
   }
   ```

3. **Save file**
   ```bash
   Ctrl+S (Windows/Linux)
   Cmd+S (Mac)
   ```

4. **Refresh browser**
   ```bash
   F5 hoặc Ctrl+R
   ```

---

### Bước 6: Test OAuth

1. **Khởi động dev server**
   ```bash
   npm run dev
   ```

2. **Mở browser**
   ```
   http://localhost:5173
   ```

3. **Vào trang Login**
   - Click **"Đăng nhập"**

4. **Click nút Facebook**
   - ✅ Nếu đúng: Popup mở với UI giống Facebook
   - ✅ Thấy danh sách accounts mock
   - ✅ Click account → Login thành công
   - ✅ Navigate đến /profile-setup

5. **Check Console**
   ```
   🔐 Using REAL facebook OAuth  ← Thành công!
   ```
   
   Hoặc:
   ```
   🎭 Using DEMO facebook OAuth  ← Vẫn còn demo mode
   ```

---

## 🐛 Troubleshooting

### ❌ Vẫn thấy "DEMO mode"

**Nguyên nhân:** App ID chưa được cập nhật đúng

**Giải pháp:**
1. Check file `/config/oauth.config.ts`
2. Đảm bảo `appId` không còn là `'YOUR_FACEBOOK_APP_ID'`
3. Đảm bảo App ID là một chuỗi số (15-16 ký tự)
4. Save file và refresh browser

---

### ❌ Popup bị chặn

**Nguyên nhân:** Browser block popups

**Giải pháp:**
1. Click vào icon popup bị chặn (address bar)
2. Allow popups cho domain này
3. Hoặc Settings → Privacy → Allow popups

---

### ❌ "URL Blocked: This redirect failed"

**Nguyên nhân:** Redirect URI không được whitelist

**Giải pháp:**
1. Vào Facebook App → Facebook Login → Settings
2. Check **Valid OAuth Redirect URIs**
3. Đảm bảo có:
   ```
   http://localhost:5173/auth/callback
   ```
4. Save Changes
5. Đợi 2-3 phút để Facebook sync
6. Try lại

---

### ❌ "App Not Setup: This app is still in development mode"

**Nguyên nhân:** App chưa public

**Giải pháp:**
1. **Development mode** (Test)
   - Add test users trong Settings → Roles
   - Chỉ test users mới login được
   
2. **Production mode** (Public)
   - Vào Settings → Basic
   - Scroll xuống **"App Mode"**
   - Click **"Switch to Live"**
   - Hoàn thành App Review nếu cần

---

### ❌ "Invalid Scopes"

**Nguyên nhân:** App chưa có quyền đọc email/profile

**Giải pháp:**
1. Scopes `email,public_profile` là basic permissions
2. Không cần review
3. Nếu vẫn lỗi, check Facebook Login → Permissions
4. Đảm bảo có `email` và `public_profile`

---

## 📱 Test với Facebook Account thật

### Option 1: Development Mode (Recommended for testing)

1. **Thêm Test Users**
   - Vào **Roles** → **Test Users**
   - Click **"Add"** → Create test account
   - Get email/password

2. **Login với Test User**
   - Click Facebook login button
   - Nhập test account
   - ✅ Thành công!

### Option 2: Live Mode (Production)

1. **Switch to Live**
   - Settings → Basic → App Mode → **Live**

2. **Bất kỳ Facebook user nào cũng login được**

---

## 🔒 Security Best Practices

### ✅ Nên làm:

1. **Giữ App Secret bí mật**
   ```typescript
   // ❌ ĐỪNG làm:
   const appSecret = 'xxx'; // Trong frontend code
   
   // ✅ NÊN làm:
   // Lưu App Secret ở backend, dùng env variables
   ```

2. **Verify State parameter**
   ```typescript
   // Đã implement sẵn trong oauth.ts
   sessionStorage.setItem('oauth_state', state);
   // Check state khi callback
   ```

3. **HTTPS trong Production**
   ```
   ❌ http://your-domain.com/auth/callback
   ✅ https://your-domain.com/auth/callback
   ```

4. **Whitelist chính xác Redirect URIs**
   ```
   ❌ https://your-domain.com/*
   ✅ https://your-domain.com/auth/callback
   ```

### ❌ Không nên làm:

1. **Commit App Secret vào Git**
   ```bash
   # Add to .gitignore
   .env
   .env.local
   ```

2. **Dùng App ID/Secret cùng lúc dev + prod**
   - Tạo 2 apps riêng: Dev App và Prod App

3. **Skip SSL certificate validation**

---

## 📊 Current Status

### ✅ Đã có (Sẵn sàng)
- [x] OAuth config structure
- [x] Popup window implementation
- [x] Mock OAuth UI (giống thật)
- [x] Auto-detect DEMO/REAL mode
- [x] Message passing parent ↔ popup
- [x] Session management
- [x] ProfileSetup flow

### 📝 Cần làm (Để hoàn chỉnh)
- [ ] Lấy Facebook App ID (15 phút)
- [ ] Cập nhật vào `/config/oauth.config.ts`
- [ ] Test với test users
- [ ] (Optional) Switch to Live mode

---

## 🔄 Migration Path

### Phase 1: DEMO MODE ✅ (Hiện tại)
```
Click Facebook
→ Popup mở https://www.facebook.com/login
→ Xem UI thật
→ 5s auto-close
→ Mock data
```

### Phase 2: REAL MODE (Sau khi có App ID)
```
Click Facebook
→ Popup mở /mock-oauth?provider=facebook
→ UI giống Facebook thật
→ User chọn account
→ Login thành công
→ Real data (hoặc mock realistic)
```

### Phase 3: PRODUCTION (Sau khi có Backend)
```
Click Facebook
→ Popup mở Facebook OAuth thật
→ User login với Facebook
→ Callback về /auth/callback
→ Backend exchange code → token
→ Get real user data từ Facebook API
→ Save vào database
→ Login thành công
```

---

## 🌐 URLs Reference

| Environment | Site URL | Redirect URI |
|-------------|----------|--------------|
| Local Dev   | http://localhost:5173 | http://localhost:5173/auth/callback |
| Staging     | https://staging.voltor.com | https://staging.voltor.com/auth/callback |
| Production  | https://voltor.com | https://voltor.com/auth/callback |

---

## 📞 Support

Nếu gặp vấn đề:

1. **Check Console Log**
   ```
   F12 → Console tab
   Xem messages từ oauth.ts
   ```

2. **Facebook Error Messages**
   - Copy error message
   - Google: "facebook oauth [error message]"
   - Hoặc check: https://developers.facebook.com/docs/facebook-login/web

3. **Contact**
   - Email: voltorvietnam@gmail.com
   - Phone: (+84) 898 296 336

---

## ✅ Quick Checklist

```
□ Đã tạo Facebook App
□ Đã thêm Facebook Login product
□ Đã cấu hình Redirect URIs
□ Đã copy App ID
□ Đã paste vào /config/oauth.config.ts
□ Đã save file
□ Đã refresh browser
□ Test login → thấy "🔐 Using REAL facebook OAuth"
□ Popup mở /mock-oauth (không phải facebook.com)
□ Login thành công
```

---

**🎉 Done! Giờ Facebook OAuth đã hoạt động với Mock UI realistic!**

**📌 Lưu ý:** Đây vẫn chưa phải là OAuth 100% thật (vẫn dùng mock data), nhưng UI/UX giống hệt thật và sẵn sàng để integrate backend API sau này!
