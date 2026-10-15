# 🔐 OAuth Login Setup Guide

## 📋 Tổng quan

Website VOLTOR hiện đã tích hợp đăng nhập qua:
- 🔵 **Facebook** - Popup window OAuth
- 🔴 **Google** - Popup window OAuth  
- 🔵 **LinkedIn** - Popup window OAuth

## 🎮 Demo Mode (Hiện tại)

Hiện tại hệ thống đang chạy ở **DEMO MODE**:
- ✅ Click vào nút Facebook/Google/LinkedIn
- ✅ Popup window mở ra với animation loading
- ✅ Sau 2 giây tự động đăng nhập thành công
- ✅ Lưu user info vào `localStorage`
- ✅ Không cần Client ID/Secret

**Mock User Data:**
```javascript
Facebook User:
  - name: "Nguyễn Văn A (Facebook)"
  - email: "facebook.user@example.com"
  - avatar: Auto-generated avatar

Google User:
  - name: "Trần Thị B (Google)"
  - email: "google.user@example.com"
  - avatar: Auto-generated avatar

LinkedIn User:
  - name: "Lê Văn C (LinkedIn)"
  - email: "linkedin.user@example.com"
  - avatar: Auto-generated avatar
```

---

## 🚀 Cách bật Production OAuth (Real Login)

Nếu bạn muốn sử dụng OAuth thật, làm theo các bước sau:

### 1️⃣ **Facebook Login Setup**

**Bước 1:** Tạo Facebook App
- Truy cập: https://developers.facebook.com/apps/
- Click **Create App** → Chọn **Consumer**
- Điền App Name: "VOLTOR Login"
- Click **Create App**

**Bước 2:** Cấu hình Facebook Login
- Vào **Products** → Add **Facebook Login**
- Chọn **Web** platform
- Nhập **Site URL**: `https://yourdomain.com`
- Vào **Settings** → **Basic**
  - Copy **App ID**
  - Copy **App Secret**

**Bước 3:** Cấu hình OAuth Redirect URIs
- Vào **Facebook Login** → **Settings**
- **Valid OAuth Redirect URIs**: 
  ```
  https://yourdomain.com/auth/callback
  http://localhost:3000/auth/callback (cho dev)
  ```
- Click **Save Changes**

**Bước 4:** Cập nhật code
```typescript
// File: /utils/oauth.ts
const OAUTH_CONFIG = {
  facebook: {
    clientId: '123456789012345', // Thay bằng App ID của bạn
    redirectUri: 'https://yourdomain.com/auth/callback',
    scope: 'email,public_profile',
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
  },
  // ...
};
```

---

### 2️⃣ **Google Login Setup**

**Bước 1:** Tạo Google Cloud Project
- Truy cập: https://console.cloud.google.com/
- Click **Select a project** → **NEW PROJECT**
- Project name: "VOLTOR Login"
- Click **Create**

**Bước 2:** Enable Google+ API
- Vào **APIs & Services** → **Library**
- Search "Google+ API"
- Click **Enable**

**Bước 3:** Tạo OAuth Credentials
- Vào **APIs & Services** → **Credentials**
- Click **CREATE CREDENTIALS** → **OAuth client ID**
- Application type: **Web application**
- Name: "VOLTOR Web Client"
- **Authorized JavaScript origins**:
  ```
  https://yourdomain.com
  http://localhost:3000
  ```
- **Authorized redirect URIs**:
  ```
  https://yourdomain.com/auth/callback
  http://localhost:3000/auth/callback
  ```
- Click **Create**
- Copy **Client ID**

**Bước 4:** Cập nhật code
```typescript
// File: /utils/oauth.ts
const OAUTH_CONFIG = {
  google: {
    clientId: '123456789-abcdefg.apps.googleusercontent.com', // Thay bằng Client ID của bạn
    redirectUri: 'https://yourdomain.com/auth/callback',
    scope: 'email profile',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  },
  // ...
};
```

---

### 3️⃣ **LinkedIn Login Setup**

**Bước 1:** Tạo LinkedIn App
- Truy cập: https://www.linkedin.com/developers/apps
- Click **Create app**
- Điền thông tin:
  - App name: "VOLTOR Login"
  - LinkedIn Page: (Chọn company page của bạn)
  - App logo: Upload logo VOLTOR
- Click **Create app**

**Bước 2:** Request Access
- Vào tab **Products**
- Request access cho **Sign In with LinkedIn**

**Bước 3:** Cấu hình OAuth Settings
- Vào tab **Auth**
- Copy **Client ID**
- Copy **Client Secret**
- **Authorized redirect URLs**:
  ```
  https://yourdomain.com/auth/callback
  http://localhost:3000/auth/callback
  ```
- Click **Update**

**Bước 4:** Cập nhật code
```typescript
// File: /utils/oauth.ts
const OAUTH_CONFIG = {
  linkedin: {
    clientId: 'abcdefghijklmn', // Thay bằng Client ID của bạn
    redirectUri: 'https://yourdomain.com/auth/callback',
    scope: 'r_liteprofile r_emailaddress',
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
  },
  // ...
};
```

---

## 🔄 Callback Handler (Cần tạo)

Sau khi user đăng nhập thành công từ Facebook/Google/LinkedIn, họ sẽ được redirect về `/auth/callback`.

Bạn cần tạo component để handle callback này:

```tsx
// File: /components/OAuthCallback.tsx
import { useEffect } from 'react';

export function OAuthCallback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    if (error) {
      // Gửi error về parent window
      if (window.opener) {
        window.opener.postMessage({
          type: 'oauth-error',
          error: error,
        }, window.location.origin);
      }
      return;
    }

    if (code && state) {
      // TODO: Gửi code về backend để exchange token
      // Backend sẽ call API Facebook/Google/LinkedIn để lấy access token
      // Sau đó lấy user info và tạo session
      
      // Giả lập thành công
      const user = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: 'OAuth User',
        email: 'oauth@example.com',
      };

      // Gửi kết quả về parent window
      if (window.opener) {
        window.opener.postMessage({
          type: 'oauth-success',
          user: user,
        }, window.location.origin);
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}
```

Thêm route trong App.tsx:
```tsx
// Trong App.tsx
if (currentPage === 'oauth-callback') {
  return <OAuthCallback />;
}
```

---

## 🔒 Security Best Practices

### 1. **State Parameter**
- Luôn verify `state` parameter để chống CSRF attacks
- Lưu state vào `sessionStorage` trước khi redirect
- So sánh state khi callback về

### 2. **HTTPS Only**
- Trong production, BẮT BUỘC dùng HTTPS
- Facebook/Google/LinkedIn yêu cầu HTTPS cho redirect URIs

### 3. **Token Storage**
- Không lưu access token trong `localStorage` (dễ bị XSS)
- Lưu trong `httpOnly` cookies (cần backend)
- Hoặc dùng in-memory storage (mất khi refresh)

### 4. **Backend API**
- Không expose Client Secret trong frontend
- Tất cả token exchange phải qua backend
- Backend verify token với Facebook/Google/LinkedIn API

---

## 📊 Flow Diagram

```
User clicks Facebook button
         ↓
Frontend generates state & opens popup
         ↓
Popup redirects to Facebook OAuth
         ↓
User logs in on Facebook
         ↓
Facebook redirects to /auth/callback?code=xxx&state=xxx
         ↓
Callback page sends code to backend
         ↓
Backend exchanges code for access token
         ↓
Backend gets user info from Facebook API
         ↓
Backend creates session & sends user data
         ↓
Frontend receives user data via postMessage
         ↓
Popup closes, main window updates state
         ↓
User logged in! 🎉
```

---

## 🐛 Troubleshooting

### **Popup bị chặn**
```javascript
// Đảm bảo mở popup ngay khi user click (synchronous)
// ĐÚNG:
button.onclick = () => {
  const popup = window.open(url); // Mở ngay
}

// SAI:
button.onclick = async () => {
  await someAsyncFunction(); // Async delay
  const popup = window.open(url); // Bị chặn!
}
```

### **CORS Errors**
- Kiểm tra redirect URIs trong Facebook/Google/LinkedIn console
- Đảm bảo domain match chính xác (http vs https)

### **Invalid Client ID**
- Kiểm tra lại Client ID đã copy đúng chưa
- Kiểm tra app có ở chế độ Development hay Production
- Facebook: Cần thêm test users nếu app chưa public

---

## 📞 Contact & Support

Nếu cần hỗ trợ setup OAuth:
- **Phone**: (+84) 836 389 488
- **Email**: voltorvietnam@gmail.com
- **Zalo**: https://zalo.me/84836389488

---

Made with ❤️ by VOLTOR Team
