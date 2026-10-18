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
const DEFAULT_ADMIN: AdminAccount = {
  id: 'admin_root',
  email: 'huuduy0811@gmail.com',
  name: 'Nguyễn Hữu Duy',
  passwordHash: 'Huuduy0911@',
  createdAt: '18/10/2026',
  isSuperAdmin: true,
};

export function getAdminAccounts(): AdminAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Khởi tạo tài khoản mặc định nếu chưa có
      localStorage.setItem(STORAGE_KEY, JSON.stringify([DEFAULT_ADMIN]));
      return [DEFAULT_ADMIN];
    }
    const accounts: AdminAccount[] = JSON.parse(raw);
    // Luôn đảm bảo tài khoản huuduy0811@gmail.com có mặt
    if (!accounts.some(a => a.email.toLowerCase() === DEFAULT_ADMIN.email.toLowerCase())) {
      accounts.unshift(DEFAULT_ADMIN);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
    }
    return accounts;
  } catch {
    return [DEFAULT_ADMIN];
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

export function verifyAdminLogin(email: string, pass: string): AdminAccount | null {
  const accounts = getAdminAccounts();
  const trimmedEmail = email.trim().toLowerCase();
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
  if (trimmedEmail === DEFAULT_ADMIN.email.toLowerCase()) {
    return { success: false, message: 'Không thể xóa tài khoản Quản trị viên gốc!' };
  }
  const accounts = getAdminAccounts();
  const filtered = accounts.filter(a => a.email.toLowerCase() !== trimmedEmail);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return { success: true, message: 'Đã xóa tài khoản quản trị viên!' };
}
