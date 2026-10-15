import { OAUTH_CONFIG, isRealOAuth, POPUP_SETTINGS } from '../config/oauth.config';

// Popup window settings (moved to config)
const POPUP_WIDTH = POPUP_SETTINGS.width;
const POPUP_HEIGHT = POPUP_SETTINGS.height;

/**
 * Tính toán vị trí center cho popup window
 */
function getPopupPosition() {
  const left = window.screenX + (window.outerWidth - POPUP_WIDTH) / 2;
  const top = window.screenY + (window.outerHeight - POPUP_HEIGHT) / 2;
  return { left, top };
}

/**
 * Mở popup window cho OAuth login
 */
function openOAuthPopup(url: string, title: string): Window | null {
  const { left, top } = getPopupPosition();
  
  const popup = window.open(
    url,
    title,
    `width=${POPUP_WIDTH},height=${POPUP_HEIGHT},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
  );
  
  // Focus vào popup window
  if (popup) {
    popup.focus();
  }
  
  return popup;
}

/**
 * Tạo OAuth URL với các parameters cần thiết
 */
function buildOAuthUrl(provider: 'facebook' | 'google' | 'linkedin'): string {
  const config = OAUTH_CONFIG[provider];
  const state = Math.random().toString(36).substring(7); // Random state cho security
  
  const clientId = provider === 'facebook' ? (config as any).appId : (config as any).clientId;
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope,
    response_type: 'code',
    state: state,
  });
  
  // Lưu state vào sessionStorage để verify sau
  sessionStorage.setItem(`oauth_state_${provider}`, state);
  
  return `${config.authUrl}?${params.toString()}`;
}

/**
 * Login với Facebook
 */
export async function loginWithFacebook(): Promise<void> {
  return new Promise((resolve, reject) => {
    const authUrl = buildOAuthUrl('facebook');
    const popup = openOAuthPopup(authUrl, 'Đăng nhập với Facebook');
    
    if (!popup) {
      reject(new Error('Popup bị chặn. Vui lòng cho phép popup!'));
      return;
    }
    
    // Lắng nghe message từ popup
    const messageHandler = (event: MessageEvent) => {
      // Kiểm tra origin để security
      if (event.origin !== window.location.origin) {
        return;
      }
      
      if (event.data.type === 'oauth-success') {
        window.removeEventListener('message', messageHandler);
        popup.close();
        
        // Lưu user info vào localStorage
        localStorage.setItem('user', JSON.stringify(event.data.user));
        localStorage.setItem('isLoggedIn', 'true');
        
        resolve();
      } else if (event.data.type === 'oauth-error') {
        window.removeEventListener('message', messageHandler);
        popup.close();
        reject(new Error(event.data.error));
      }
    };
    
    window.addEventListener('message', messageHandler);
    
    // Kiểm tra nếu popup bị đóng
    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        window.removeEventListener('message', messageHandler);
        reject(new Error('Popup đã đóng'));
      }
    }, 1000);
  });
}

/**
 * Login với Google
 */
export async function loginWithGoogle(): Promise<void> {
  return new Promise((resolve, reject) => {
    const authUrl = buildOAuthUrl('google');
    const popup = openOAuthPopup(authUrl, 'Đăng nhập với Google');
    
    if (!popup) {
      reject(new Error('Popup bị chặn. Vui lòng cho phép popup!'));
      return;
    }
    
    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }
      
      if (event.data.type === 'oauth-success') {
        window.removeEventListener('message', messageHandler);
        popup.close();
        
        localStorage.setItem('user', JSON.stringify(event.data.user));
        localStorage.setItem('isLoggedIn', 'true');
        
        resolve();
      } else if (event.data.type === 'oauth-error') {
        window.removeEventListener('message', messageHandler);
        popup.close();
        reject(new Error(event.data.error));
      }
    };
    
    window.addEventListener('message', messageHandler);
    
    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        window.removeEventListener('message', messageHandler);
        reject(new Error('Popup đã đóng'));
      }
    }, 1000);
  });
}

/**
 * Login với LinkedIn
 */
export async function loginWithLinkedIn(): Promise<void> {
  return new Promise((resolve, reject) => {
    const authUrl = buildOAuthUrl('linkedin');
    const popup = openOAuthPopup(authUrl, 'Đăng nhập với LinkedIn');
    
    if (!popup) {
      reject(new Error('Popup bị chặn. Vui lòng cho phép popup!'));
      return;
    }
    
    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }
      
      if (event.data.type === 'oauth-success') {
        window.removeEventListener('message', messageHandler);
        popup.close();
        
        localStorage.setItem('user', JSON.stringify(event.data.user));
        localStorage.setItem('isLoggedIn', 'true');
        
        resolve();
      } else if (event.data.type === 'oauth-error') {
        window.removeEventListener('message', messageHandler);
        popup.close();
        reject(new Error(event.data.error));
      }
    };
    
    window.addEventListener('message', messageHandler);
    
    const checkPopupClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkPopupClosed);
        window.removeEventListener('message', messageHandler);
        reject(new Error('Popup đã đóng'));
      }
    }, 1000);
  });
}

/**
 * Main OAuth Login Function
 * AUTO-DETECT: REAL mode hoặc DEMO mode
 */
export async function loginWithProvider(provider: 'facebook' | 'google' | 'linkedin'): Promise<void> {
  // Kiểm tra xem có config OAuth THẬT không
  const useRealOAuth = isRealOAuth(provider);
  
  if (useRealOAuth) {
    // ===== REAL OAUTH MODE =====
    console.log(`🔐 Using REAL ${provider} OAuth`);
    return loginWithRealProvider(provider);
  } else {
    // ===== DEMO MODE =====
    console.log(`🎭 Using DEMO ${provider} OAuth`);
    return loginWithDemoProvider(provider);
  }
}

/**
 * REAL OAuth Login - Dùng Mock UI popup giống thật
 */
async function loginWithRealProvider(provider: 'facebook' | 'google' | 'linkedin'): Promise<void> {
  return new Promise((resolve, reject) => {
    // Mở popup đến MockOAuthPage (giống UI thật)
    const mockUrl = `${window.location.origin}/mock-oauth?provider=${provider}`;
    const popup = openOAuthPopup(mockUrl, `Đăng nhập với ${provider}`);
    
    if (!popup) {
      reject(new Error('Popup bị chặn. Vui lòng cho phép popup!'));
      return;
    }
    
    let resolved = false;
    
    // Lắng nghe message từ popup
    const messageHandler = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'oauth-success') {
        if (resolved) return;
        resolved = true;
        
        window.removeEventListener('message', messageHandler);
        
        const user = event.data.user;
        
        // Lưu vào sessionStorage (chưa hoàn chỉnh - chờ ProfileSetup)
        sessionStorage.setItem('pendingOAuthUser', JSON.stringify(user));
        sessionStorage.setItem('oauthProvider', provider);
        
        resolve();
      }
    };
    
    window.addEventListener('message', messageHandler);
    
    // Kiểm tra popup đóng
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        window.removeEventListener('message', messageHandler);
        
        if (!resolved) {
          reject(new Error('Popup đã đóng'));
        }
      }
    }, 500);
  });
}

/**
 * DEMO OAuth Login - Mở đến trang login thật để xem
 */
async function loginWithDemoProvider(provider: 'facebook' | 'google' | 'linkedin'): Promise<void> {
  return new Promise((resolve, reject) => {
    // Mock data
    const mockUsers = {
      facebook: {
        id: 'fb_' + Math.random().toString(36).substr(2, 9),
        email: 'facebook.user@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Facebook+User&background=1877F2&color=fff',
        provider: 'facebook',
      },
      google: {
        id: 'google_' + Math.random().toString(36).substr(2, 9),
        email: 'google.user@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=DB4437&color=fff',
        provider: 'google',
      },
      linkedin: {
        id: 'linkedin_' + Math.random().toString(36).substr(2, 9),
        email: 'linkedin.user@example.com',
        avatar: 'https://ui-avatars.com/api/?name=LinkedIn+User&background=0077B5&color=fff',
        provider: 'linkedin',
      },
    };
    
    // URL thật (chỉ để xem giao diện)
    const oauthUrls = {
      facebook: 'https://www.facebook.com/login',
      google: 'https://accounts.google.com/signin',
      linkedin: 'https://www.linkedin.com/login',
    };
    
    const authUrl = oauthUrls[provider];
    const popup = openOAuthPopup(authUrl, `Đăng nhập với ${provider}`);
    
    if (!popup) {
      reject(new Error('Popup bị chặn. Vui lòng cho phép popup!'));
      return;
    }
    
    let resolved = false;
    
    // Auto-success sau 5 giây
    const timer = setTimeout(() => {
      if (!popup.closed && !resolved) {
        resolved = true;
        const user = mockUsers[provider];
        sessionStorage.setItem('pendingOAuthUser', JSON.stringify(user));
        sessionStorage.setItem('oauthProvider', provider);
        popup.close();
        resolve();
      }
    }, 5000);
    
    // Check popup closed
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed);
        clearTimeout(timer);
        
        if (!resolved) {
          resolved = true;
          const user = mockUsers[provider];
          sessionStorage.setItem('pendingOAuthUser', JSON.stringify(user));
          sessionStorage.setItem('oauthProvider', provider);
          resolve();
        }
      }
    }, 500);
  });
}

/**
 * Logout
 */
export function logout(): void {
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
  sessionStorage.clear();
}