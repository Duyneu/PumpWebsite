import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import api from '../api/client'
import toast from 'react-hot-toast'

interface Category {
  id: number
  name: string
  slug: string
}

interface SpecEntry {
  key: string
  value: string
}

interface FormData {
  name: string
  slug: string
  sku: string
  brand: string
  model: string
  origin: string
  warranty: string
  category_id: string
  price: string
  original_price: string
  discount_percent: string
  short_description: string
  description: string
  image: string
  stock: string
  is_featured: boolean
  is_bestseller: boolean
  is_new: boolean
  is_active: boolean
}

const defaultForm: FormData = {
  name: '', slug: '', sku: '', brand: '', model: '',
  origin: '', warranty: '', category_id: '',
  price: '', original_price: '', discount_percent: '0',
  short_description: '', description: '',
  image: '', stock: '0',
  is_featured: false, is_bestseller: false, is_new: true, is_active: true
}

function toSlug(str: string) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-')
}

export function ProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const [form, setForm] = useState<FormData>(defaultForm)
  const [specs, setSpecs] = useState<SpecEntry[]>([{ key: '', value: '' }])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(isEdit)

  // Load categories
  useEffect(() => {
    api.get('/api/categories').then(res => {
      const flat = res.data.data?.flat || []
      setCategories(flat)
    }).catch(() => {})
  }, [])

  // Load product if edit mode
  useEffect(() => {
    if (!isEdit || !id) return
    const loadProduct = async () => {
      try {
        // Load all products and find by ID
        const res = await api.get('/api/products', { params: { page: 1, limit: 1000 } })
        const product = res.data.data.products.find((p: { id: number }) => p.id === parseInt(id))
        if (!product) {
          toast.error('Không tìm thấy sản phẩm')
          navigate('/products')
          return
        }
        setForm({
          name: product.name || '',
          slug: product.slug || '',
          sku: product.sku || '',
          brand: product.brand || '',
          model: product.model || '',
          origin: product.origin || '',
          warranty: product.warranty || '',
          category_id: product.category_id?.toString() || '',
          price: product.price?.toString() || '',
          original_price: product.original_price?.toString() || '',
          discount_percent: product.discount_percent?.toString() || '0',
          short_description: product.short_description || '',
          description: product.description || '',
          image: product.image || '',
          stock: product.stock?.toString() || '0',
          is_featured: Boolean(product.is_featured),
          is_bestseller: Boolean(product.is_bestseller),
          is_new: Boolean(product.is_new),
          is_active: Boolean(product.is_active ?? true)
        })
        // Load specs
        const specsObj = product.specifications || {}
        const specsArr = Object.entries(specsObj).map(([key, value]) => ({ key, value: String(value) }))
        setSpecs(specsArr.length > 0 ? specsArr : [{ key: '', value: '' }])
      } catch {
        toast.error('Lỗi khi tải dữ liệu sản phẩm')
      } finally {
        setInitialLoading(false)
      }
    }
    loadProduct()
  }, [id, isEdit, navigate])

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value }
      // Auto slug from name
      if (field === 'name' && typeof value === 'string') {
        updated.slug = toSlug(value)
      }
      // Auto discount_percent
      if ((field === 'price' || field === 'original_price') && updated.price && updated.original_price) {
        const price = parseFloat(updated.price)
        const orig = parseFloat(updated.original_price)
        if (orig > price && orig > 0) {
          updated.discount_percent = Math.round((1 - price / orig) * 100).toString()
        }
      }
      return updated
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.sku || !form.price) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc (Tên, SKU, Giá)')
      return
    }
    setLoading(true)
    try {
      // Build specs object
      const specifications: Record<string, string> = {}
      specs.forEach(({ key, value }) => { if (key.trim()) specifications[key.trim()] = value })

      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        original_price: form.original_price ? parseFloat(form.original_price) : null,
        discount_percent: parseInt(form.discount_percent) || 0,
        stock: parseInt(form.stock) || 0,
        category_id: form.category_id ? parseInt(form.category_id) : null,
        specifications,
        images: form.image ? [form.image] : []
      }

      if (isEdit && id) {
        await api.put(`/api/products/${id}`, payload)
        toast.success('Cập nhật sản phẩm thành công!')
      } else {
        await api.post('/api/products', payload)
        toast.success('Thêm sản phẩm thành công!')
      }
      navigate('/products')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message || 'Có lỗi xảy ra'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"

  return (
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? `Chỉnh sửa sản phẩm` : 'Thêm sản phẩm mới'}
          </h1>
          {isEdit && <p className="text-gray-500 text-sm">{form.name}</p>}
        </div>
        <div className="ml-auto flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Đang lưu...' : (isEdit ? 'Cập nhật' : 'Thêm sản phẩm')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Thông tin cơ bản</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={labelClass}>Tên sản phẩm <span className="text-red-500">*</span></label>
                <input type="text" className={inputClass} value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Nhập tên sản phẩm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Slug (URL)</label>
                  <input type="text" className={inputClass} value={form.slug} onChange={e => handleChange('slug', e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>SKU <span className="text-red-500">*</span></label>
                  <input type="text" className={inputClass} value={form.sku} onChange={e => handleChange('sku', e.target.value)} placeholder="VD: WSD9-8-0.37E" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Thương hiệu</label>
                  <input type="text" className={inputClass} value={form.brand} onChange={e => handleChange('brand', e.target.value)} placeholder="VOLTOR, DONGYIN..." />
                </div>
                <div>
                  <label className={labelClass}>Model</label>
                  <input type="text" className={inputClass} value={form.model} onChange={e => handleChange('model', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Xuất xứ</label>
                  <input type="text" className={inputClass} value={form.origin} onChange={e => handleChange('origin', e.target.value)} placeholder="Trung Quốc, Việt Nam..." />
                </div>
                <div>
                  <label className={labelClass}>Bảo hành</label>
                  <input type="text" className={inputClass} value={form.warranty} onChange={e => handleChange('warranty', e.target.value)} placeholder="12 tháng" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Danh mục</label>
                <select className={inputClass} value={form.category_id} onChange={e => handleChange('category_id', e.target.value)}>
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Giá</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Giá bán (₫) <span className="text-red-500">*</span></label>
                <input type="number" className={inputClass} value={form.price} onChange={e => handleChange('price', e.target.value)} min="0" />
              </div>
              <div>
                <label className={labelClass}>Giá gốc (₫)</label>
                <input type="number" className={inputClass} value={form.original_price} onChange={e => handleChange('original_price', e.target.value)} min="0" />
              </div>
              <div>
                <label className={labelClass}>Giảm giá (%)</label>
                <input type="number" className={inputClass} value={form.discount_percent} onChange={e => handleChange('discount_percent', e.target.value)} min="0" max="100" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Mô tả</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Mô tả ngắn</label>
                <textarea rows={3} className={inputClass} value={form.short_description} onChange={e => handleChange('short_description', e.target.value)} placeholder="Mô tả ngắn gọn về sản phẩm" />
              </div>
              <div>
                <label className={labelClass}>Mô tả chi tiết</label>
                <textarea rows={6} className={inputClass} value={form.description} onChange={e => handleChange('description', e.target.value)} placeholder="Mô tả đầy đủ về sản phẩm, tính năng, thông số..." />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Thông số kỹ thuật</h2>
              <button
                type="button"
                onClick={() => setSpecs([...specs, { key: '', value: '' }])}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" /> Thêm thông số
              </button>
            </div>
            <div className="space-y-2">
              {specs.map((spec, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Tên thông số (VD: Công suất)"
                    className={`${inputClass} flex-1`}
                    value={spec.key}
                    onChange={e => {
                      const updated = [...specs]
                      updated[i] = { ...updated[i], key: e.target.value }
                      setSpecs(updated)
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Giá trị (VD: 0.37kW)"
                    className={`${inputClass} flex-1`}
                    value={spec.value}
                    onChange={e => {
                      const updated = [...specs]
                      updated[i] = { ...updated[i], value: e.target.value }
                      setSpecs(updated)
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setSpecs(specs.filter((_, idx) => idx !== i))}
                    className="p-2 text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Trạng thái</h2>
            <div className="space-y-3">
              {([
                ['is_active', 'Hiển thị (Active)'],
                ['is_featured', '⭐ Nổi bật (Featured)'],
                ['is_bestseller', '🔥 Bán chạy (Bestseller)'],
                ['is_new', '✨ Mới (New)']
              ] as [keyof FormData, string][]).map(([field, label]) => (
                <label key={field} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(form[field])}
                    onChange={e => handleChange(field, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Hình ảnh chính</h2>
            <div>
              <input
                type="text"
                className={inputClass}
                value={form.image}
                onChange={e => handleChange('image', e.target.value)}
                placeholder="https://... (URL ảnh)"
              />
              {form.image && (
                <div className="mt-3">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg border"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Stock */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Kho hàng</h2>
            <div>
              <label className={labelClass}>Số lượng tồn kho</label>
              <input
                type="number"
                className={inputClass}
                value={form.stock}
                onChange={e => handleChange('stock', e.target.value)}
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
