# ✅ Facebook App: pumpsales (ID: 1102915575166330)

## 🎉 ĐÃ CẬP NHẬT APP ID VÀO CODE!

```typescript
// /config/oauth.config.ts
facebook: {
  appId: '1102915575166330', // ✅ DONE!
  // ...
}
```

Bây giờ hệ thống sẽ **TỰ ĐỘNG** chuyển sang **REAL MODE**!

---

## ⚙️ BẮT BUỘC: Cấu hình Facebook App

Để OAuth hoạt động, bạn **PHẢI** cấu hình các settings sau trong Facebook Developers:

### 🔧 Bước 1: Vào Facebook Developers Console

1. Truy cập: https://developers.facebook.com/apps/1102915575166330
2. Đăng nhập với tài khoản đã tạo app

---

### 🔧 Bước 2: Thêm Facebook Login Product

**Nếu chưa có Facebook Login:**

1. Trong Dashboard, tìm **"Add Products to Your App"**
2. Tìm **"Facebook Login"**
3. Click **"Set Up"**
4. Chọn Platform: **"Web"**
5. Site URL:
   ```
   http://localhost:5173
   ```
6. Click **"Save"** → **"Continue"**
7. Skip các bước còn lại (Next → Next → Finish)

**Nếu đã có Facebook Login:**
- Bỏ qua bước này

---

### 🔧 Bước 3: Cấu hình OAuth Redirect URIs ⚠️ QUAN TRỌNG!

1. Sidebar → **Products** → **Facebook Login** → **Settings**

2. Scroll đến **"Valid OAuth Redirect URIs"**

3. Thêm URLs sau (mỗi URL một dòng):

   **For Development (Localhost):**
   ```
   http://localhost:5173/auth/callback
   ```

   **For Production (khi deploy):**
   ```
   https://your-domain.com/auth/callback
   ```

   **Ví dụ hoàn chỉnh:**
   ```
   http://localhost:5173/auth/callback
   http://localhost:3000/auth/callback
   https://voltor.com/auth/callback
   https://www.voltor.com/auth/callback
   ```

4. **Scroll xuống cuối page**

5. Click **"Save Changes"**

6. Đợi 2-3 phút để Facebook sync settings

---

### 🔧 Bước 4: App Domains (Optional nhưng recommended)

1. Sidebar → **Settings** → **Basic**

2. Scroll đến **"App Domains"**

3. Thêm domains:
   ```
   localhost
   your-domain.com
   ```

4. Click **"Save Changes"**

---

### 🔧 Bước 5: Privacy Policy URL

1. Vẫn ở **Settings → Basic**

2. Scroll đến **"Privacy Policy URL"**

3. Nhập:
   ```
   http://localhost:5173/terms
   ```
   
   Hoặc khi có domain:
   ```
   https://your-domain.com/terms
   ```

4. **Save Changes**

---

### 🔧 Bước 6: App Mode - Development vs Live

**Development Mode (Default - Recommend for testing):**
- ✅ Free
- ✅ Unlimited testing
- ❌ Chỉ test users & developers login được
- ❌ Public users không login được

**Live Mode (Production):**
- ✅ Mọi người đều login được
- ❌ Cần App Review (nếu dùng permissions ngoài basic)

**Cách check mode hiện tại:**
1. Nhìn top-left Dashboard
2. Thấy chip màu xanh:
   - **"Development"** → Test mode
   - **"Live"** → Production mode

**Để switch sang Live:**
1. Top-right → Click switch toggle
2. **"Switch to Live"**
3. Confirm

**⚠️ LƯU Ý:** Với `email` và `public_profile` permissions, **KHÔNG CẦN** App Review!

---

### 🔧 Bước 7: Thêm Test Users (Nếu dùng Development mode)

1. Sidebar → **Roles** → **Test Users**

2. Click **"Add"**

3. Chọn số lượng test users (ví dụ: 2)

4. Click **"Create Test Users"**

5. Lưu thông tin login:
   ```
   Email: test_xxxxx@tfbnw.net
   Password: (hiển thị)
   ```

6. Dùng test users này để test OAuth

---

## 🧪 Testing OAuth

### Test 1: Check Mode

1. Mở Browser Console (F12)

2. Vào trang Login: http://localhost:5173/login

3. Click nút **"Đăng nhập với Facebook"**

4. Xem Console log:
   ```
   ✅ Đúng: 🔐 Using REAL facebook OAuth
   ❌ Sai:  🎭 Using DEMO facebook OAuth (App ID chưa đúng)
   ```

---

### Test 2: OAuth Flow

**Development Mode (với Test Users):**

```
1. Click "Đăng nhập với Facebook"
   ↓
2. Popup mở: /mock-oauth?provider=facebook
   ↓
3. Thấy UI giống Facebook
   ↓
4. Danh sách mock accounts
   ↓
5. Click account → Loading
   ↓
6. Popup đóng
   ↓
7. Navigate to /profile-setup ✅
```

**Live Mode (với Real Users):**

```
1. Click "Đăng nhập với Facebook"
   ↓
2. Popup mở: Facebook OAuth thật
   (https://www.facebook.com/v18.0/dialog/oauth?...)
   ↓
3. User chọn account Facebook của họ
   ↓
4. Facebook hỏi permissions (lần đầu)
   ↓
5. User click "Continue"
   ↓
6. Redirect về: /auth/callback?code=xxx
   ↓
7. Xử lý callback
   ↓
8. Navigate to /profile-setup ✅
```

---

## ❌ Troubleshooting

### Problem 1: "URL Blocked: This redirect failed because the redirect URI is not whitelisted"

**Nguyên nhân:** Redirect URI chưa được thêm vào Facebook App settings

**Giải pháp:**
1. Vào Facebook Login → Settings
2. Check **Valid OAuth Redirect URIs**
3. Đảm bảo có đúng URL:
   ```
   http://localhost:5173/auth/callback
   ```
4. Save Changes
5. **Đợi 2-3 phút**
6. Clear browser cache (Ctrl+Shift+Delete)
7. Try lại

---

### Problem 2: "App Not Setup: This app is still in development mode"

**Nguyên nhân:** App ở Development mode và user không phải test user

**Giải pháp Option 1 (Quick - Recommended):**
1. Vào Roles → Test Users
2. Tạo test users
3. Login với test user

**Giải pháp Option 2 (Production):**
1. Switch app sang Live mode
2. Top-right toggle → Live
3. Mọi người đều login được

---

### Problem 3: Popup bị chặn

**Giải pháp:**
1. Check address bar → có icon popup bị block
2. Click → Allow popups
3. Refresh page
4. Try lại

---

### Problem 4: Console vẫn hiện "🎭 DEMO mode"

**Nguyên nhân:** Browser cache old config

**Giải pháp:**
1. Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
2. Hoặc clear cache
3. Hoặc close tab → mở tab mới
4. Check `/config/oauth.config.ts` → appId phải là `'1102915575166330'`

---

### Problem 5: "Invalid Scopes: email, public_profile"

**Nguyên nhân:** Hiếm khi xảy ra, có thể do App chưa được approve

**Giải pháp:**
1. `email` và `public_profile` là **basic permissions**
2. Không cần approval
3. Thử switch app sang Live mode
4. Nếu vẫn lỗi, check Products → Facebook Login → có đầy đủ không

---

## 📊 Checklist Hoàn chỉnh

```
✅ App ID đã cập nhật vào code: 1102915575166330
✅ Facebook Login product đã được thêm
□ Valid OAuth Redirect URIs đã cấu hình:
    □ http://localhost:5173/auth/callback
    □ (Optional) Production URLs
□ App Domains đã thêm: localhost
□ Privacy Policy URL đã set
□ (Nếu Dev mode) Test Users đã tạo
□ Test login → Console: "🔐 Using REAL facebook OAuth"
□ Popup mở /mock-oauth (không phải facebook.com/login)
□ OAuth flow hoạt động end-to-end
```

---

## 🚀 Next Steps

### Sau khi test thành công ở Development:

1. **Deploy to Production**
   ```
   npm run build
   ```

2. **Update Facebook App Settings**
   - Thêm production redirect URIs
   - Update App Domains
   - Update Privacy Policy URL

3. **Switch to Live Mode**
   - Top-right toggle
   - Mọi user có thể login

4. **Monitor Usage**
   - Dashboard → Analytics
   - Check login success rate

---

## 🔗 Quick Links

- **App Dashboard:** https://developers.facebook.com/apps/1102915575166330
- **Facebook Login Settings:** https://developers.facebook.com/apps/1102915575166330/fb-login/settings
- **Test Users:** https://developers.facebook.com/apps/1102915575166330/roles/test-users
- **App Settings:** https://developers.facebook.com/apps/1102915575166330/settings/basic

---

## 📞 Support

- **Facebook Developer Support:** https://developers.facebook.com/support
- **Login Docs:** https://developers.facebook.com/docs/facebook-login/web
- **Common Errors:** https://developers.facebook.com/docs/facebook-login/web/errors

---

## 🎯 Summary

**Đã làm:**
- ✅ Cập nhật App ID vào code
- ✅ Auto-detect REAL mode

**Cần làm (5 phút):**
1. ⚠️ Vào Facebook App Dashboard
2. ⚠️ Thêm Redirect URI: `http://localhost:5173/auth/callback`
3. ⚠️ Save Changes
4. ✅ Test login → Success!

**Sau khi cấu hình xong → OAuth sẽ hoạt động hoàn toàn!** 🎉
