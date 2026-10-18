import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Edit, Trash2, Eye, ChevronLeft, ChevronRight, RefreshCw, Package } from 'lucide-react'
import api from '../api/client'
import toast from 'react-hot-toast'

interface Product {
  id: number
  name: string
  slug: string
  sku: string
  price: number
  stock: number
  category_name: string
  brand: string
  is_featured: boolean
  is_bestseller: boolean
  is_new: boolean
  image: string
  is_active: boolean
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export function ProductsPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 15, total: 0, totalPages: 0 })
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deleteName, setDeleteName] = useState('')

  const fetchProducts = useCallback(async (page = 1, searchQuery = search) => {
    setLoading(true)
    try {
      const params: Record<string, string | number> = { page, limit: 15 }
      if (searchQuery) params.search = searchQuery
      const res = await api.get('/api/products', { params })
      setProducts(res.data.data.products)
      setPagination(res.data.data.pagination)
    } catch {
      toast.error('Không thể tải danh sách sản phẩm')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchProducts(1)
  }, [search])

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 300)
    return () => clearTimeout(t)
  }, [searchInput])

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await api.delete(`/api/products/${deleteId}`)
      toast.success(`Đã xóa sản phẩm "${deleteName}"`)
      setDeleteConfirmOpen(false)
      fetchProducts(pagination.page)
    } catch {
      toast.error('Không thể xóa sản phẩm')
    }
  }

  const formatPrice = (price: number) =>
    price.toLocaleString('vi-VN') + ' ₫'

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <p className="text-gray-500 mt-1">Tổng {pagination.total} sản phẩm</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => fetchProducts(pagination.page)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('/products/new')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border shadow-sm p-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm theo tên, SKU, thương hiệu..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-3">Đang tải...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Không tìm thấy sản phẩm nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Kho</th>
                  <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || 'https://via.placeholder.com/48x48?text=No+Image'}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg border"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x48?text=No+Image' }}
                        />
                        <div>
                          <p className="font-medium text-sm text-gray-900 line-clamp-1 max-w-xs">{product.name}</p>
                          <p className="text-xs text-gray-400">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{product.sku}</code>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.category_name || '—'}</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-center flex-wrap">
                        {product.is_featured && <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">⭐</span>}
                        {product.is_bestseller && <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">🔥</span>}
                        {product.is_new && <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">✨</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => window.open(`http://localhost:5173/products/${product.slug}`, '_blank')}
                          className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                          title="Xem trên web"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/products/edit/${product.id}`)}
                          className="p-1.5 rounded hover:bg-blue-50 text-gray-500 hover:text-blue-600"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(product.id)
                            setDeleteName(product.name)
                            setDeleteConfirmOpen(true)
                          }}
                          className="p-1.5 rounded hover:bg-red-50 text-gray-500 hover:text-red-600"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
            <p className="text-sm text-gray-500">
              Trang {pagination.page}/{pagination.totalPages} • {pagination.total} sản phẩm
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => fetchProducts(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="p-1.5 rounded border hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => fetchProducts(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="p-1.5 rounded border hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc muốn xóa sản phẩm <strong>"{deleteName}"</strong>? Sản phẩm sẽ bị ẩn khỏi web.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
              >
                Xóa sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
