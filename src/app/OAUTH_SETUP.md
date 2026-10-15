# 🔐 Hướng dẫn thiết lập OAuth cho VOLTOR Website

## 📋 Tổng quan

Website hiện đang chạy ở **DEMO MODE** - khi click vào nút Facebook/Google/LinkedIn, sẽ mở popup đến trang login thật của provider đó, nhưng sau 5 giây sẽ tự động "thành công" với mock data.

Để sử dụng OAuth **THẬT** trong production, bạn cần:
1. Đăng ký ứng dụng trên từng platform
2. Lấy Client ID
3. Cập nhật vào code
4. Deploy callback endpoint

---

## 🔵 1. Facebook Login Setup

### Bước 1: Tạo Facebook App

1. Truy cập: https://developers.facebook.com/
2. Click **"My Apps"** → **"Create App"**
3. Chọn **"Consumer"** → **Next**
4. Nhập thông tin:
   - **App Name**: VOLTOR Vietnam
   - **App Contact Email**: voltorvietnam@gmail.com
   - **Business Account**: (tùy chọn)
5. Click **"Create App"**

### Bước 2: Cấu hình Facebook Login

1. Trong Dashboard, click **"Add Product"**
2. Chọn **"Facebook Login"** → **Set Up**
3. Chọn **"Web"**
4. Nhập **Site URL**: `https://your-domain.com`
5. Click **Save**

### Bước 3: Cấu hình OAuth Redirect URIs

1. Vào **Facebook Login** → **Settings**
2. Thêm vào **Valid OAuth Redirect URIs**:
   ```
   https://your-domain.com/auth/callback
   http://localhost:5173/auth/callback
   ```
3. **Save Changes**

### Bước 4: Lấy App ID

1. Vào **Settings** → **Basic**
2. Copy **App ID** và **App Secret**
3. Cập nhật vào `/utils/oauth.ts`:

```typescript
facebook: {
  clientId: 'YOUR_FACEBOOK_APP_ID', // ← Paste App ID vào đây
  // ...
}
```

### Bước 5: Publish App (sau khi test)

1. Click **"App Mode"** → **Switch to Live**
2. Hoàn thành **App Review** nếu cần

---

## 🔴 2. Google Login Setup

### Bước 1: Tạo Google Cloud Project

1. Truy cập: https://console.cloud.google.com/
2. Click **"Select a Project"** → **"New Project"**
3. Nhập:
   - **Project Name**: VOLTOR Vietnam
   - **Organization**: (tùy chọn)
4. Click **"Create"**

### Bước 2: Enable Google+ API

1. Vào **APIs & Services** → **Library**
2. Tìm **"Google+ API"**
3. Click **"Enable"**

### Bước 3: Tạo OAuth Credentials

1. Vào **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"OAuth Client ID"**
3. Nếu chưa có, tạo **OAuth Consent Screen**:
   - User Type: **External**
   - App Name: **VOLTOR Vietnam**
   - User Support Email: **voltorvietnam@gmail.com**
   - Authorized Domains: **your-domain.com**
4. Chọn **Application Type**: **Web application**
5. Nhập:
   - **Name**: VOLTOR Web Client
   - **Authorized JavaScript origins**:
     ```
     https://your-domain.com
     http://localhost:5173
     ```
   - **Authorized redirect URIs**:
     ```
     https://your-domain.com/auth/callback
     http://localhost:5173/auth/callback
     ```
6. Click **"Create"**

### Bước 4: Lấy Client ID

1. Copy **Client ID** và **Client Secret**
2. Cập nhật vào `/utils/oauth.ts`:

```typescript
google: {
  clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // ← Paste vào đây
  // ...
}
```

---

## 🔵 3. LinkedIn Login Setup

### Bước 1: Tạo LinkedIn App

1. Truy cập: https://www.linkedin.com/developers/apps
2. Click **"Create App"**
3. Nhập thông tin:
   - **App Name**: VOLTOR Vietnam
   - **LinkedIn Page**: (chọn company page của bạn)
   - **Privacy Policy URL**: https://your-domain.com/privacy
   - **App Logo**: (upload logo)
4. Click **"Create App"**

### Bước 2: Request Access

1. Trong App Dashboard, vào tab **"Products"**
2. Request access cho **"Sign In with LinkedIn"**
3. Đợi approval (thường instant)

### Bước 3: Cấu hình OAuth Settings

1. Vào tab **"Auth"**
2. Thêm vào **Authorized Redirect URLs**:
   ```
   https://your-domain.com/auth/callback
   http://localhost:5173/auth/callback
   ```
3. Click **"Update"**

### Bước 4: Lấy Client ID

1. Trong tab **"Auth"**, copy:
   - **Client ID**
   - **Client Secret**
2. Cập nhật vào `/utils/oauth.ts`:

```typescript
linkedin: {
  clientId: 'YOUR_LINKEDIN_CLIENT_ID', // ← Paste vào đây
  // ...
}
```

---

## ⚙️ 4. Cập nhật Code

### File: `/utils/oauth.ts`

Sau khi có đủ Client IDs, thay đổi function gọi từ `loginWithProvider` sang các functions riêng:

#### Cách 1: Đơn giản - Thay đổi trong Login/Register components

Trong `/components/Login.tsx` và `/components/Register.tsx`:

```typescript
// Thay đổi từ:
await loginWithProvider(provider);

// Thành:
if (provider === 'facebook') {
  await loginWithFacebook();
} else if (provider === 'google') {
  await loginWithGoogle();
} else if (provider === 'linkedin') {
  await loginWithLinkedIn();
}
```

#### Cách 2: Auto-detect - Update loginWithProvider

Trong `/utils/oauth.ts`:

```typescript
export async function loginWithProvider(provider: 'facebook' | 'google' | 'linkedin'): Promise<void> {
  // Check if we have real client IDs
  const config = OAUTH_CONFIG[provider];
  const hasRealClientID = !config.clientId.startsWith('YOUR_');
  
  if (hasRealClientID) {
    // Use REAL OAuth
    if (provider === 'facebook') return loginWithFacebook();
    if (provider === 'google') return loginWithGoogle();
    if (provider === 'linkedin') return loginWithLinkedIn();
  }
  
  // Otherwise use DEMO MODE (current code)
  // ...
}
```

---

## 🔧 5. Tạo Callback Handler

Tạo file `/pages/AuthCallbackPage.tsx`:

```typescript
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      // OAuth failed
      window.opener?.postMessage({
        type: 'oauth-error',
        error: error
      }, window.location.origin);
      window.close();
      return;
    }

    if (code && state) {
      // TODO: Exchange code for access token
      // Send to your backend API
      fetch('/api/auth/oauth/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, state })
      })
      .then(res => res.json())
      .then(data => {
        // Send success message to parent window
        window.opener?.postMessage({
          type: 'oauth-success',
          user: data.user
        }, window.location.origin);
        window.close();
      })
      .catch(err => {
        window.opener?.postMessage({
          type: 'oauth-error',
          error: err.message
        }, window.location.origin);
        window.close();
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}
```

Thêm route trong `/App.tsx`:

```typescript
<Route path="/auth/callback" element={<AuthCallbackPage />} />
```

---

## 🚀 6. Backend API (Required)

Bạn cần tạo backend endpoint để xử lý OAuth callback:

### Endpoint: `POST /api/auth/oauth/callback`

**Request:**
```json
{
  "code": "authorization_code_from_oauth",
  "state": "random_state_string"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "Nguyễn Văn A",
    "avatar": "https://...",
    "provider": "google"
  }
}
```

**Flow:**
1. Verify `state` matches stored value
2. Exchange `code` for `access_token` với provider
3. Get user info từ provider API
4. Tạo user trong database (nếu chưa có)
5. Generate JWT token cho app
6. Return user data

**Example (Node.js/Express):**

```javascript
app.post('/api/auth/oauth/callback', async (req, res) => {
  const { code, state } = req.body;
  
  // 1. Verify state
  // ...
  
  // 2. Exchange code for token (example with Google)
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'https://your-domain.com/auth/callback',
      grant_type: 'authorization_code'
    })
  });
  
  const { access_token } = await tokenResponse.json();
  
  // 3. Get user info
  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  
  const userData = await userResponse.json();
  
  // 4. Create/update user in database
  const user = await db.users.upsert({
    email: userData.email,
    name: userData.name,
    avatar: userData.picture,
    provider: 'google'
  });
  
  // 5. Generate JWT
  const jwt = generateJWT(user);
  
  // 6. Return
  res.json({ user, token: jwt });
});
```

---

## 🧪 7. Testing

### Demo Mode (Hiện tại)
```bash
npm run dev
# Click vào Facebook/Google/LinkedIn
# → Popup mở đến trang login thật
# → Sau 5s tự động đóng và "thành công"
# → Chuyển sang /profile-setup
```

### Production Mode (Sau khi setup)
```bash
# 1. Cập nhật Client IDs trong /utils/oauth.ts
# 2. Deploy backend API
# 3. Test
npm run build
npm run preview
# Click OAuth button
# → Mở popup đến OAuth provider
# → User đăng nhập thật
# → Redirect về /auth/callback
# → Exchange code for token
# → Callback handler gửi user data
# → Login thành công
```

---

## 📱 8. Mobile Considerations

Trên mobile, popup có thể không hoạt động tốt. Có 2 giải pháp:

### Option A: Redirect thay vì Popup
```typescript
// Detect mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  // Full page redirect
  window.location.href = authUrl;
} else {
  // Popup window
  const popup = window.open(authUrl, ...);
}
```

### Option B: Deep Links (App)
Sử dụng deep links nếu có native app.

---

## 🔒 9. Security Best Practices

1. **HTTPS Required**: OAuth chỉ work trên HTTPS (except localhost)
2. **Validate State**: Luôn verify state parameter
3. **Store Secrets Securely**: Dùng environment variables
4. **Short Token Lifetime**: Access tokens nên expire sau 1h
5. **CSRF Protection**: Implement CSRF tokens
6. **Rate Limiting**: Giới hạn số lần OAuth requests

---

## 📊 10. Current Status

### ✅ Đã có (Demo Mode)
- Popup window với UI đẹp
- URL redirect đến trang OAuth thật
- Auto-close popup sau 5s
- Mock user data
- Navigate đến ProfileSetup
- Session management

### ❌ Chưa có (Cần setup)
- Real Client IDs
- OAuth callback handler
- Backend API
- Token exchange
- Real user data từ providers
- Error handling production

---

## 🆘 Support

Nếu cần hỗ trợ, liên hệ:
- **Email**: voltorvietnam@gmail.com
- **Phone**: (+84) 898 296 336
- **Địa chỉ**: Số 112-118 Lý Thường Kiệt, Thị trấn Lim, Tiên Du, Bắc Ninh

---

## 📚 Resources

- [Facebook OAuth Docs](https://developers.facebook.com/docs/facebook-login/web)
- [Google OAuth Docs](https://developers.google.com/identity/protocols/oauth2)
- [LinkedIn OAuth Docs](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authentication)

---

**Good luck! 🚀**
