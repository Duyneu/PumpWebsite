export interface AdminAccount {
  id: string;
  email: string;
  name: string;
  passwordHash: string; // Plaintext or hash in localStorage for client-side administration
  createdAt: string;
  isSuperAdmin?: boolean;
}

const STORAGE_KEY = 'voltor_admin_accounts';
const SESSION_KEY = 'voltor_current_admin';

// Tài khoản mặc định ban đầu
const DEFAULT_ADMINS: AdminAccount[] = [
  {
    id: 'admin_voltor',
    email: 'voltorvietnam@gmail.com',
    name: 'VOLTOR Quản Trị',
    passwordHash: 'password123',
    createdAt: '29/10/2026',
    isSuperAdmin: true,
  },
  {
    id: 'admin_voltor_alt',
    email: 'admin@voltor.com',
    name: 'Admin VOLTOR',
    passwordHash: 'password123',
    createdAt: '29/10/2026',
    isSuperAdmin: true,
  },
  {
    id: 'admin_root',
    email: 'huuduy0811@gmail.com',
    name: 'Nguyễn Hữu Duy',
    passwordHash: 'Huuduy0911@',
    createdAt: '18/10/2026',
    isSuperAdmin: true,
  },
];

export function getAdminAccounts(): AdminAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ADMINS));
      return DEFAULT_ADMINS;
    }
    const accounts: AdminAccount[] = JSON.parse(raw);
    let updated = false;
    for (const def of DEFAULT_ADMINS) {
      if (!accounts.some(a => a.email.toLowerCase() === def.email.toLowerCase())) {
        accounts.push(def);
        updated = true;
      }
    }
    if (updated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
    }
    return accounts;
  } catch {
    return DEFAULT_ADMINS;
  }
}

export function getCurrentAdmin(): AdminAccount | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentAdmin(admin: AdminAccount | null) {
  if (admin) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(admin));
    sessionStorage.setItem('voltor_admin_auth', 'true');
  } else {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('voltor_admin_auth');
  }
}

export async function verifyAdminLogin(email: string, pass: string): Promise<AdminAccount | null> {
  const trimmedEmail = email.trim().toLowerCase();

  // 1. Try PostgreSQL Backend API if available
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmedEmail, password: pass }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();

      if (res.ok && data.success && data.data?.user) {
        const user = data.data.user;
        if (user.role !== 'admin') {
          throw new Error('Tài khoản này không có quyền quản trị viên!');
        }

        const adminUser: AdminAccount = {
          id: String(user.id),
          email: user.email,
          name: user.name || user.email,
          passwordHash: '',
          createdAt: new Date().toLocaleDateString('vi-VN'),
          isSuperAdmin: true,
        };

        if (data.data.token) {
          localStorage.setItem('auth_token', data.data.token);
        }
        setCurrentAdmin(adminUser);
        return adminUser;
      }

      if (res.status === 400 || res.status === 401) {
        const accounts = getAdminAccounts();
        const localMatch = accounts.find(a => a.email.toLowerCase() === trimmedEmail && a.passwordHash === pass);
        if (!localMatch) {
          throw new Error(data.error?.message || data.message || 'Email hoặc mật khẩu không chính xác!');
        }
      }
    }
  } catch (err: any) {
    if (err.message && (
      err.message.includes('không có quyền') ||
      err.message.includes('không chính xác')
    )) {
      throw err;
    }
    // Network / proxy / empty response: fallback to local accounts
  }

  // 2. Local fallback
  const accounts = getAdminAccounts();
  const found = accounts.find(a => a.email.toLowerCase() === trimmedEmail && a.passwordHash === pass);
  if (found) {
    setCurrentAdmin(found);
    return found;
  }
  return null;
}

export function addAdminAccount(email: string, name: string, pass: string): { success: boolean; message: string } {
  const accounts = getAdminAccounts();
  const trimmedEmail = email.trim().toLowerCase();
  if (accounts.some(a => a.email.toLowerCase() === trimmedEmail)) {
    return { success: false, message: 'Email này đã tồn tại trong danh sách quản trị viên!' };
  }
  const newAccount: AdminAccount = {
    id: 'admin_' + Date.now(),
    email: trimmedEmail,
    name: name.trim() || trimmedEmail.split('@')[0],
    passwordHash: pass,
    createdAt: new Date().toLocaleDateString('vi-VN'),
  };
  const updated = [...accounts, newAccount];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return { success: true, message: 'Đã thêm quản trị viên mới thành công!' };
}

export function changeAdminPassword(email: string, oldPass: string, newPass: string): { success: boolean; message: string } {
  const accounts = getAdminAccounts();
  const trimmedEmail = email.trim().toLowerCase();
  const index = accounts.findIndex(a => a.email.toLowerCase() === trimmedEmail);
  if (index === -1) {
    return { success: false, message: 'Không tìm thấy tài khoản!' };
  }
  if (accounts[index].passwordHash !== oldPass) {
    return { success: false, message: 'Mật khẩu hiện tại không chính xác!' };
  }
  accounts[index].passwordHash = newPass;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  // Update current session if matching
  const current = getCurrentAdmin();
  if (current && current.email.toLowerCase() === trimmedEmail) {
    setCurrentAdmin(accounts[index]);
  }
  return { success: true, message: 'Đổi mật khẩu thành công!' };
}

export function deleteAdminAccount(email: string): { success: boolean; message: string } {
  const trimmedEmail = email.trim().toLowerCase();
  if (DEFAULT_ADMINS.some(d => d.email.toLowerCase() === trimmedEmail)) {
    return { success: false, message: 'Không thể xóa tài khoản Quản trị viên gốc!' };
  }
  const accounts = getAdminAccounts();
  const filtered = accounts.filter(a => a.email.toLowerCase() !== trimmedEmail);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return { success: true, message: 'Đã xóa tài khoản quản trị viên!' };
}
