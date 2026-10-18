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
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  Truck
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { products, mainCategories } from '../data/products';
import { getEffectiveProducts } from '../utils/productStorage';
import { getAuditLogs, clearAuditLogs, AuditLogItem } from '../utils/auditLog';
import { AdminAccountModal } from '../components/AdminAccountModal';
import { getCurrentAdmin } from '../utils/adminAuth';
import { 
  getOrders, 
  updateOrderStatus, 
  deleteOrder, 
  getStatusText, 
  getStatusColor, 
  Order, 
  OrderStatus 
} from '../utils/orders';

export function AdminDashboard() {
  const navigate = useNavigate();

  const [totalProductsCount, setTotalProductsCount] = useState(() => getEffectiveProducts().length);
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const currentAdmin = getCurrentAdmin();

  const reloadData = () => {
    try {
      setTotalProductsCount(getEffectiveProducts().length);
      setLogs(getAuditLogs());
      setOrders(getOrders());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    reloadData();

    const handleProductsChange = () => {
      setTotalProductsCount(getEffectiveProducts().length);
    };
    window.addEventListener('voltor_products_changed', handleProductsChange);
    return () => {
      window.removeEventListener('voltor_products_changed', handleProductsChange);
    };
  }, []);

  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    reloadData();
  };

  const handleDeleteOrder = (orderId: string, customerName: string) => {
    if (confirm(`Bạn có chắc muốn xóa đơn hàng #${orderId} của khách hàng "${customerName}" không?`)) {
      deleteOrder(orderId);
      reloadData();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const query = orderSearch.trim().toLowerCase();
    const matchesSearch = !query || 
      o.id.toLowerCase().includes(query) ||
      o.customerName.toLowerCase().includes(query) ||
      o.phone.toLowerCase().includes(query) ||
      o.email.toLowerCase().includes(query) ||
      o.address.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
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
                {currentAdmin && (
                  <span className="text-xs text-gray-500 font-medium">
                    • Xin chào, <strong>{currentAdmin.name}</strong>
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">Quản Trị VOLTOR</h1>
              <p className="text-gray-500 text-sm mt-0.5">Quản lý trực tiếp danh mục, sản phẩm và đơn đặt hàng khách hàng</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Orders */}
          <Card className="border-amber-200 bg-gradient-to-br from-white to-amber-50/50 shadow-sm relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-semibold text-amber-900">
                Đơn đặt hàng
              </CardTitle>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-extrabold text-amber-950">{orders.length}</div>
                {pendingOrdersCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold border border-amber-300">
                    {pendingOrdersCount} chờ xác nhận
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Khách đặt mua qua giỏ hàng trên web
              </p>
            </CardContent>
          </Card>

          {/* Card Products */}
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
                Bao gồm máy bơm hỏa tiễn, chìm, trục ngang
              </p>
            </CardContent>
          </Card>

          {/* Card Categories */}
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

          {/* Card Status */}
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
                Đồng bộ trực tiếp trên client & Vercel
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
                  Đăng sản phẩm mới lên website với biểu mẫu tối ưu trực quan: tự động tạo đường dẫn slug, tải ảnh trực tiếp không cần URL, điền công suất, lưu lượng, cột áp.
                </p>
              </div>
              <div className="flex items-center text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                Mở biểu mẫu thêm sản phẩm <ArrowRight className="w-4 h-4 ml-1.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Orders Management Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-100 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900">Danh Sách Đơn Đặt Hàng Của Khách Hàng</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                    {orders.length} đơn
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Tự động ghi nhận khi khách hàng điền thông tin và bấm đặt hàng trên website
                </p>
              </div>
            </div>

            {/* Quick status filters */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { key: 'all', label: 'Tất cả' },
                { key: 'pending', label: 'Chờ xác nhận' },
                { key: 'confirmed', label: 'Đã xác nhận' },
                { key: 'shipping', label: 'Đang giao' },
                { key: 'completed', label: 'Hoàn thành' },
                { key: 'cancelled', label: 'Đã hủy' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setStatusFilter(tab.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === tab.key
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                  {tab.key === 'pending' && pendingOrdersCount > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-amber-400 text-amber-950 rounded-full text-[10px]">
                      {pendingOrdersCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Tìm kiếm theo mã đơn (#VLT-...), tên khách, số điện thoại, email hoặc địa chỉ giao hàng..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Orders Cards List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-400 border border-dashed rounded-xl bg-gray-50/50">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-base font-semibold text-gray-700">Chưa có đơn đặt hàng nào</p>
              <p className="text-xs mt-1 text-gray-500 max-w-md mx-auto">
                Khi khách hàng chọn sản phẩm vào giỏ hàng, điền thông tin và bấm <strong>"Tiến hành đặt hàng"</strong>, đơn hàng sẽ lập tức hiển thị tại đây.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const statusStyle = getStatusColor(order.status);
                return (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white"
                  >
                    {/* Order Item Header */}
                    <div className="bg-gray-50/80 px-4 sm:px-6 py-3 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-sm font-bold text-gray-900 bg-white px-2.5 py-1 rounded-md border border-gray-200 font-mono shadow-2xs">
                          #{order.id}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{order.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Status selector */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-500 font-medium">Trạng thái:</span>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer outline-none ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                          >
                            <option value="pending">Chờ xác nhận</option>
                            <option value="confirmed">Đã xác nhận</option>
                            <option value="shipping">Đang giao hàng</option>
                            <option value="completed">Đã hoàn thành</option>
                            <option value="cancelled">Đã hủy đơn</option>
                          </select>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDeleteOrder(order.id, order.customerName)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa đơn hàng"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Order Details Body */}
                    <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Customer Info (5 cols) */}
                      <div className="lg:col-span-5 space-y-2.5 text-sm border-b lg:border-b-0 lg:border-r border-gray-100 pb-4 lg:pb-0 lg:pr-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                          Thông tin người nhận
                        </div>

                        <div className="font-bold text-gray-900 text-base">
                          {order.customerName}
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <a
                            href={`tel:${order.phone}`}
                            className="font-semibold text-blue-600 hover:underline"
                          >
                            {order.phone}
                          </a>
                          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium border border-emerald-200">
                            Gọi ngay
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 text-xs">
                          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <a href={`mailto:${order.email}`} className="hover:text-blue-600 hover:underline">
                            {order.email}
                          </a>
                        </div>

                        <div className="flex items-start gap-2 text-gray-600 text-xs">
                          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>{order.address}</span>
                        </div>

                        {order.notes && (
                          <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-2.5 text-xs text-amber-900 mt-2">
                            <strong>Ghi chú:</strong> {order.notes}
                          </div>
                        )}
                      </div>

                      {/* Products List & Total (7 cols) */}
                      <div className="lg:col-span-7 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                            Sản phẩm đã đặt ({order.items.reduce((s, it) => s + it.quantity, 0)})
                          </div>

                          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                            {order.items.map((it, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs p-2 rounded-lg bg-gray-50 border border-gray-100"
                              >
                                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                  {it.image && (
                                    <img
                                      src={it.image}
                                      alt={it.name}
                                      className="w-9 h-9 object-cover rounded border bg-white flex-shrink-0"
                                      onError={(e) => {
                                        (e.target as HTMLElement).style.display = 'none';
                                      }}
                                    />
                                  )}
                                  <div className="min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">{it.name}</p>
                                    <p className="text-gray-500">
                                      {formatPrice(it.price)} × <span className="font-bold text-gray-800">{it.quantity}</span>
                                    </p>
                                  </div>
                                </div>
                                <div className="font-bold text-gray-900 flex-shrink-0">
                                  {formatPrice(it.price * it.quantity)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Pricing Summary */}
                        <div className="pt-3 border-t border-gray-100 mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="text-gray-500">
                            Tạm tính: <strong className="text-gray-800">{formatPrice(order.subtotal)}</strong> | Phí VC: {order.shipping === 0 ? 'Miễn phí' : formatPrice(order.shipping)}
                          </div>
                          <div className="text-sm font-bold text-gray-900">
                            Tổng thanh toán: <span className="text-blue-600 text-base">{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
                <p className="text-xs text-gray-500">Ghi lại toàn bộ hành động thêm sản phẩm, xóa và đặt đơn hàng</p>
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
              <p className="text-xs mt-1 text-gray-400">Khi có đơn hàng mới hoặc sản phẩm được điều chỉnh, thông tin sẽ được lưu tự động tại đây.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => {
                const badgeColor = 
                  log.action === 'CREATE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  log.action === 'UPDATE' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-red-50 text-red-700 border-red-200';

                const label = 
                  log.action === 'CREATE' ? 'Thêm mới / Đơn hàng' :
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
