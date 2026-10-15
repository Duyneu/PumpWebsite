export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

const API_URL = import.meta.env.VITE_API_URL || '/api/auth';

// Lưu token vào localStorage
export const setToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

// Lấy token từ localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Xóa token khỏi localStorage
export const removeToken = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

// Lưu thông tin user
export const setUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Lấy thông tin user
export const getUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Đăng ký tài khoản mới
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Đăng ký thất bại');
    }

    // Lưu token và user vào localStorage
    setToken(result.token);
    setUser(result.user);

    return result;
  } catch (error) {
    throw error;
  }
};

// Đăng nhập
export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Đăng nhập thất bại');
    }

    // Lưu token và user vào localStorage
    setToken(result.token);
    setUser(result.user);

    return result;
  } catch (error) {
    throw error;
  }
};

// Lấy thông tin user hiện tại (từ token)
export const getCurrentUser = async (): Promise<User> => {
  try {
    const token = getToken();
    
    if (!token) {
      throw new Error('Không tìm thấy token');
    }

    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Không thể lấy thông tin user');
    }

    return result.user;
  } catch (error) {
    // Nếu token không hợp lệ, xóa token
    removeToken();
    throw error;
  }
};

// Đăng xuất
export const logout = () => {
  removeToken();
};
