import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ShoppingCart, Users, TrendingUp, Plus } from 'lucide-react'
import api from '../api/client'
import { useAuth } from '../contexts/AuthContext'

export function DashboardPage() {
  const { user } = useAuth()
  const [productCount, setProductCount] = useState<number | null>(null)

  useEffect(() => {
    api.get('/api/products?page=1&limit=1').then(res => {
      setProductCount(res.data.data?.pagination?.total ?? 0)
    }).catch(() => {})
  }, [])

  const stats = [
    { label: 'Sản phẩm', value: productCount !== null ? productCount : '...', icon: Package, color: 'bg-blue-500', link: '/products' },
    { label: 'Đơn hàng', value: '—', icon: ShoppingCart, color: 'bg-green-500', link: '#' },
    { label: 'Khách hàng', value: '—', icon: Users, color: 'bg-purple-500', link: '#' },
    { label: 'Doanh thu', value: '—', icon: TrendingUp, color: 'bg-orange-500', link: '#' },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Chào mừng, {user?.name}!</h1>
        <p className="text-gray-500 mt-1">Tổng quan hệ thống VOLTOR</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, icon: Icon, color, link }) => (
          <Link key={label} to={link} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
              </div>
              <div className={`${color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/products/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Thêm sản phẩm mới
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Package className="w-4 h-4" />
            Xem danh sách sản phẩm
          </Link>
        </div>
      </div>
    </div>
  )
}
