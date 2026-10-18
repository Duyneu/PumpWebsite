import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { products, mainCategories } from '../data/products';

export function AdminDashboard() {
  const navigate = useNavigate();

  // Load custom products from localStorage if any
  const [totalCustom, setTotalCustom] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('custom_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        setTotalCustom(Array.isArray(parsed) ? parsed.length : 0);
      }
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
            <div className="flex items-center gap-3">
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
      </div>
    </div>
  );
}
