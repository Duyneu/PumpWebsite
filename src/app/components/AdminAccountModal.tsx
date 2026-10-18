import React, { useState } from 'react';
import { KeyRound, UserPlus, Users, Trash2, Shield, Check, X, ShieldAlert } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { 
  getAdminAccounts, 
  getCurrentAdmin, 
  addAdminAccount, 
  changeAdminPassword, 
  deleteAdminAccount,
  AdminAccount 
} from '../utils/adminAuth';
import { addAuditLog } from '../utils/auditLog';

interface AdminAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminAccountModal({ isOpen, onClose }: AdminAccountModalProps) {
  const currentAdmin = getCurrentAdmin();
  const [accounts, setAccounts] = useState<AdminAccount[]>(() => getAdminAccounts());

  // Tab: 'password' | 'accounts'
  const [activeTab, setActiveTab] = useState<'password' | 'accounts'>('password');

  // Form Đổi mật khẩu
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPass, setChangingPass] = useState(false);

  // Form Thêm tài khoản mới
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newAccPassword, setNewAccPassword] = useState('');
  const [addingAcc, setAddingAcc] = useState(false);

  if (!isOpen) return null;

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAdmin) return;
    if (newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    setChangingPass(true);
    const res = changeAdminPassword(currentAdmin.email, oldPassword, newPassword);
    setChangingPass(false);

    if (res.success) {
      toast.success(res.message);
      addAuditLog('UPDATE', `Đổi mật khẩu tài khoản Admin: ${currentAdmin.email}`, 'Mật khẩu đã được cập nhật thành công');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose();
    } else {
      toast.error(res.message);
    }
  };

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim() || !newAccPassword) {
      toast.error('Vui lòng nhập Email và Mật khẩu!');
      return;
    }
    if (newAccPassword.length < 6) {
      toast.error('Mật khẩu phải từ 6 ký tự trở lên!');
      return;
    }

    setAddingAcc(true);
    const res = addAdminAccount(newEmail, newName, newAccPassword);
    setAddingAcc(false);

    if (res.success) {
      toast.success(res.message);
      addAuditLog('CREATE', `Thêm Quản trị viên mới: ${newEmail}`, `Tên: ${newName || newEmail}`);
      setAccounts(getAdminAccounts());
      setNewEmail('');
      setNewName('');
      setNewAccPassword('');
    } else {
      toast.error(res.message);
    }
  };

  const handleDeleteAccount = (email: string) => {
    if (confirm(`Bạn có chắc muốn xóa quyền quản trị của ${email}?`)) {
      const res = deleteAdminAccount(email);
      if (res.success) {
        toast.success(res.message);
        addAuditLog('DELETE', `Xóa quyền quản trị của tài khoản: ${email}`, 'Tài khoản đã bị hủy quyền truy cập');
        setAccounts(getAdminAccounts());
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Quản lý Tài Khoản & Mật Khẩu Admin</h2>
              <p className="text-xs text-gray-500">Đang đăng nhập với: <strong>{currentAdmin?.email}</strong></p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 bg-gray-50/30 px-6 pt-2">
          <button
            onClick={() => setActiveTab('password')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'password'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <KeyRound className="w-4 h-4" /> Đổi mật khẩu
          </button>
          <button
            onClick={() => setActiveTab('accounts')}
            className={`pb-3 px-4 text-sm font-semibold border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'accounts'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="w-4 h-4" /> Danh sách Admin ({accounts.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'password' ? (
            <form onSubmit={handleChangePassword} className="space-y-4 max-w-md mx-auto py-2">
              <div>
                <Label htmlFor="old_pass" className="text-xs font-semibold text-gray-700">Mật khẩu hiện tại</Label>
                <Input
                  id="old_pass"
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại..."
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="new_pass" className="text-xs font-semibold text-gray-700">Mật khẩu mới</Label>
                <Input
                  id="new_pass"
                  type="password"
                  placeholder="Tối thiểu 6 ký tự..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirm_pass" className="text-xs font-semibold text-gray-700">Xác nhận mật khẩu mới</Label>
                <Input
                  id="confirm_pass"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={changingPass}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  {changingPass ? 'Đang cập nhật...' : 'Cập nhật mật khẩu mới'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Add Admin Form */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5 mb-3">
                  <UserPlus className="w-4 h-4 text-blue-600" /> Thêm Quản trị viên mới
                </h4>
                <form onSubmit={handleAddAccount} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email quản trị..."
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      placeholder="Họ và tên..."
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Mật khẩu tạo..."
                      value={newAccPassword}
                      onChange={(e) => setNewAccPassword(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>
                  <div className="sm:col-span-3 flex justify-end">
                    <Button
                      type="submit"
                      size="sm"
                      disabled={addingAcc}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                    >
                      {addingAcc ? 'Đang tạo...' : '+ Cấp quyền Quản trị'}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Accounts List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Tài khoản đang có quyền truy cập
                </h4>
                {accounts.map((acc) => (
                  <div
                    key={acc.id}
                    className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 flex items-center justify-between gap-3 bg-white transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900">{acc.name}</span>
                        {acc.isSuperAdmin && (
                          <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Root Admin
                          </span>
                        )}
                        {acc.email.toLowerCase() === currentAdmin?.email.toLowerCase() && (
                          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Bạn
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{acc.email} • Tạo ngày: {acc.createdAt}</p>
                    </div>

                    {!acc.isSuperAdmin && acc.email.toLowerCase() !== currentAdmin?.email.toLowerCase() && (
                      <button
                        onClick={() => handleDeleteAccount(acc.email)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa quyền quản trị"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
