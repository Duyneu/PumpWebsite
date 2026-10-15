/**
 * OAuth Configuration
 * 
 * =====================================================
 * HƯỚNG DẪN SETUP FACEBOOK OAUTH THẬT:
 * =====================================================
 * 
 * 1. Đăng ký Facebook App:
 *    - Vào: https://developers.facebook.com/apps/
 *    - Click "Create App" → Choose "Consumer" → Next
 *    - App Name: "VOLTOR Vietnam"
 *    - Contact Email: voltorvietnam@gmail.com
 *    - Click "Create App"
 * 
 * 2. Thêm Facebook Login:
 *    - Dashboard → Add Product → Facebook Login → Set Up
 *    - Choose "Web"
 *    - Site URL: https://your-domain.com (hoặc http://localhost:5173 để test)
 * 
 * 3. Cấu hình OAuth Redirect:
 *    - Facebook Login → Settings
 *    - Valid OAuth Redirect URIs:
 *      + http://localhost:5173/auth/callback
 *      + https://your-domain.com/auth/callback
 *    - Save Changes
 * 
 * 4. Lấy App ID:
 *    - Settings → Basic
 *    - Copy "App ID"
 *    - Paste vào FACEBOOK_APP_ID bên dưới
 * 
 * 5. Test Mode → Live Mode:
 *    - App Mode → Switch to Live (khi sẵn sàng)
 * 
 * =====================================================
 */

export const OAUTH_CONFIG = {
  // ===== FACEBOOK =====
  facebook: {
    // ✅ App Name: pumpsales
    // ✅ App ID: 1102915575166330
    appId: '1102915575166330',
    
    // Redirect URI - PHẢI KHỚP với setting trong Facebook App
    redirectUri: typeof window !== 'undefined' 
      ? `${window.location.origin}/auth/callback`
      : 'http://localhost:5173/auth/callback',
    
    // Permissions cần thiết
    scope: 'email,public_profile',
    
    // OAuth URL
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
  },

  // ===== GOOGLE =====
  google: {
    // Thay 'YOUR_GOOGLE_CLIENT_ID' bằng Client ID thật
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
    redirectUri: typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback`
      : 'http://localhost:5173/auth/callback',
    scope: 'email profile',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  },

  // ===== LINKEDIN =====
  linkedin: {
    // Thay 'YOUR_LINKEDIN_CLIENT_ID' bằng Client ID thật
    clientId: 'YOUR_LINKEDIN_CLIENT_ID',
    redirectUri: typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback`
      : 'http://localhost:5173/auth/callback',
    scope: 'r_liteprofile r_emailaddress',
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
  },
};

/**
 * Kiểm tra xem có sử dụng OAuth THẬT hay không
 */
export function isRealOAuth(provider: 'facebook' | 'google' | 'linkedin'): boolean {
  if (provider === 'facebook') {
    const config = OAUTH_CONFIG.facebook;
    return config.appId !== 'YOUR_FACEBOOK_APP_ID' && config.appId.length > 0;
  }
  
  const config = OAUTH_CONFIG[provider];
  return !config.clientId.startsWith('YOUR_') && config.clientId.length > 0;
}

/**
 * Popup window settings
 */
export const POPUP_SETTINGS = {
  width: 600,
  height: 700,
  
  getPosition() {
    const left = window.screenX + (window.outerWidth - this.width) / 2;
    const top = window.screenY + (window.outerHeight - this.height) / 2;
    return { left, top };
  },
  
  getFeatures() {
    const { left, top } = this.getPosition();
    return `width=${this.width},height=${this.height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`;
  },
};