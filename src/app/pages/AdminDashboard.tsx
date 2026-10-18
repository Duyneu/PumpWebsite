import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  ExternalLink,
  Layers,
  ArrowRight,
  History,
  Trash2,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { products, mainCategories } from '../data/products';
import { getAuditLogs, clearAuditLogs, AuditLogItem } from '../utils/auditLog';
import { AdminAccountModal } from '../components/AdminAccountModal';
import { getCurrentAdmin } from '../utils/adminAuth';

export function AdminDashboard() {
  const navigate = useNavigate();

  // Load custom products from localStorage if any
  const [totalCustom, setTotalCustom] = useState(0);
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const currentAdmin = getCurrentAdmin();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('custom_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        setTotalCustom(Array.isArray(parsed) ? parsed.length : 0);
      }
      setLogs(getAuditLogs());
    } catch (e) {
      console.error(e);
    }
  }, []);

  const totalProductsCount = products.length + totalCustom;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Trung tâm quản trị
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Quản Trị VOLTOR</h1>
              <p className="text-gray-500 text-sm mt-0.5">Quản lý trực tiếp danh mục & sản phẩm trên website</p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <Button
                variant="outline"
                onClick={() => setIsAccountModalOpen(true)}
                className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Tài khoản & Mật khẩu
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('/', '_blank')}
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Xem web ngoài
              </Button>
              <Button
                onClick={() => navigate('/admin/products/new')}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Thêm sản phẩm mới
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-blue-100 bg-gradient-to-br from-white to-blue-50/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-blue-900">
                Tổng sản phẩm đang bán
              </CardTitle>
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                <Package className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-blue-950">{totalProductsCount}</div>
              <p className="text-xs text-gray-500 mt-1">
                Bao gồm máy bơm hỏa tiễn, chìm, trục ngang & phụ kiện
              </p>
            </CardContent>
          </Card>

          <Card className="border-indigo-100 bg-gradient-to-br from-white to-indigo-50/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-indigo-900">
                Nhóm ngành & Danh mục
              </CardTitle>
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                <Layers className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-indigo-950">{mainCategories.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                Các danh mục lớn phân loại kỹ thuật
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-emerald-900">
                Trạng thái hệ thống
              </CardTitle>
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-emerald-700 mt-1">Hoạt động bình thường</div>
              <p className="text-xs text-gray-500 mt-1">
                Cập nhật tức thời lên giao diện người dùng
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Primary Action Card */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Chức năng quản lý</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              onClick={() => navigate('/admin/products')}
              className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Danh sách & Điều chỉnh sản phẩm
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Xem toàn bộ 143+ sản phẩm trong kho. Tìm kiếm theo tên, SKU hoặc lọc theo từng loại máy bơm để chỉnh sửa giá, thông số kỹ thuật hoặc xóa bỏ.
                </p>
              </div>
              <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                Vào trang quản lý sản phẩm <ArrowRight className="w-4 h-4 ml-1.5" />
              </div>
            </div>

            <div 
              onClick={() => navigate('/admin/products/new')}
              className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  Thêm sản phẩm mới vào web
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Đăng sản phẩm mới lên website với biểu mẫu tối ưu trực quan: tự động tạo đường dẫn slug, xem trước ảnh ngay khi nhập, điền công suất, lưu lượng, cột áp.
                </p>
              </div>
              <div className="flex items-center text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                Mở biểu mẫu thêm sản phẩm <ArrowRight className="w-4 h-4 ml-1.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Audit Log Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Nhật ký thay đổi (Audit Log)</h3>
                <p className="text-xs text-gray-500">Ghi lại toàn bộ hành động thêm, sửa, xóa sản phẩm</p>
              </div>
            </div>
            {logs.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc muốn xóa lịch sử nhật ký này không?')) {
                    clearAuditLogs();
                    setLogs([]);
                  }
                }}
                className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Xóa nhật ký
              </button>
            )}
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <History className="w-10 h-10 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Chưa có lịch sử thay đổi nào được ghi lại.</p>
              <p className="text-xs mt-1 text-gray-400">Khi bạn thêm, chỉnh sửa hoặc xóa sản phẩm, thông tin sẽ được lưu tự động tại đây.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => {
                const badgeColor = 
                  log.action === 'CREATE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  log.action === 'UPDATE' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-red-50 text-red-700 border-red-200';

                const label = 
                  log.action === 'CREATE' ? 'Thêm mới' :
                  log.action === 'UPDATE' ? 'Chỉnh sửa' :
                  'Đã xóa';

                return (
                  <div key={log.id} className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border flex-shrink-0 mt-0.5 ${badgeColor}`}>
                        {label}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{log.title}</div>
                        {log.detail && (
                          <div className="text-xs text-gray-500 mt-0.5">{log.detail}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 sm:text-right flex-shrink-0">
                      {log.timestamp}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Account & Password Management Modal */}
      <AdminAccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />
    </div>
  );
}
