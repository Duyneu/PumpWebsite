import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Plus,
  Settings,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    // Redirect if not admin
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/');
      return;
    }

    // Fetch admin stats
    if (user && user.role === 'admin') {
      fetchAdminStats();
    }
  }, [user, loading, navigate]);

  const fetchAdminStats = async () => {
    try {
      // TODO: Replace with real API calls
      setStats({
        totalProducts: 100,
        totalUsers: 245,
        totalOrders: 89,
        revenue: 125000000
      });
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Quản lý hệ thống VOLTOR</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Cài đặt
              </Button>
              <Button
                onClick={() => navigate('/admin/products/new')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm sản phẩm
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Alert */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Chào mừng <strong>{user.name || user.email}</strong> đến Admin Dashboard. 
            Bạn có toàn quyền quản lý sản phẩm, đơn hàng và người dùng.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tổng sản phẩm
              </CardTitle>
              <Package className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-gray-500 mt-1">
                +12 sản phẩm mới
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Người dùng
              </CardTitle>
              <Users className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-gray-500 mt-1">
                +23 người dùng mới
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Đơn hàng
              </CardTitle>
              <ShoppingCart className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-gray-500 mt-1">
                +5 đơn hàng mới
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Doanh thu
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.revenue.toLocaleString('vi-VN')} đ
              </div>
              <p className="text-xs text-gray-500 mt-1">
                +15% so với tháng trước
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/products')}>
            <CardHeader>
              <Package className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Quản lý sản phẩm</CardTitle>
              <CardDescription>
                Thêm, sửa, xóa sản phẩm. Quản lý giá cả, kho hàng, danh mục.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Xem tất cả sản phẩm
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/orders')}>
            <CardHeader>
              <ShoppingCart className="w-8 h-8 text-green-600 mb-2" />
              <CardTitle>Quản lý đơn hàng</CardTitle>
              <CardDescription>
                Xem, xử lý đơn hàng. Cập nhật trạng thái giao hàng.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Xem đơn hàng
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/users')}>
            <CardHeader>
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <CardTitle>Quản lý người dùng</CardTitle>
              <CardDescription>
                Xem danh sách người dùng, phân quyền, quản lý tài khoản.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Xem người dùng
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/categories')}>
            <CardHeader>
              <BarChart3 className="w-8 h-8 text-orange-600 mb-2" />
              <CardTitle>Danh mục sản phẩm</CardTitle>
              <CardDescription>
                Quản lý danh mục, phân loại sản phẩm 3 cấp.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Quản lý danh mục
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/analytics')}>
            <CardHeader>
              <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
              <CardTitle>Báo cáo & Thống kê</CardTitle>
              <CardDescription>
                Xem báo cáo doanh thu, sản phẩm bán chạy, xu hướng.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Xem báo cáo
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/admin/reviews')}>
            <CardHeader>
              <Settings className="w-8 h-8 text-gray-600 mb-2" />
              <CardTitle>Quản lý đánh giá</CardTitle>
              <CardDescription>
                Duyệt, ẩn/hiện đánh giá sản phẩm từ khách hàng.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Xem đánh giá
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
