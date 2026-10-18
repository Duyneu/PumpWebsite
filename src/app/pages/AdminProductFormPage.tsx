import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  X, 
  ImageIcon, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  DollarSign, 
  Layers, 
  FileText,
  Upload,
  FolderOpen
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { products, mainCategories } from '../data/products';
import { addAuditLog } from '../utils/auditLog';

export function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    category: 'Máy bơm hỏa tiễn',
    price: '',
    original_price: '',
    discount_percent: '0',
    short_description: '',
    description: '',
    brand: 'VOLTOR',
    model: '',
    origin: 'Việt Nam',
    warranty: '12 tháng',
    image: '',
    stock: '20',
    is_featured: false,
    is_bestseller: false,
    is_new: true,
    // Specifications
    power_hp: '',
    power_kw: '',
    voltage: '220V',
    outlet_diameter: '',
    flow_rate: '',
    head_max: '',
    material: 'Inox 304',
    series: '',
  });

  const [saving, setSaving] = useState(false);

  // Danh mục phẳng lấy từ mainCategories
  const allSubcategories = mainCategories.flatMap(c => c.subcategories || [c.name]);

  useEffect(() => {
    if (isEdit && id) {
      // Tìm sản phẩm trong products hiện tại
      const found = products.find(p => p.id === id);
      if (found) {
        setFormData({
          name: found.name || '',
          slug: found.name ? generateSlug(found.name) : '',
          sku: id,
          category: found.category || 'Máy bơm hỏa tiễn',
          price: found.price ? String(found.price) : '',
          original_price: '',
          discount_percent: '0',
          short_description: found.description || '',
          description: found.description || '',
          brand: 'VOLTOR',
          model: '',
          origin: 'Việt Nam',
          warranty: '12 tháng',
          image: found.image || '',
          stock: found.inStock ? '25' : '0',
          is_featured: false,
          is_bestseller: false,
          is_new: false,
          power_hp: found.specs?.power || '',
          power_kw: '',
          voltage: '220V',
          outlet_diameter: found.specs?.material || '',
          flow_rate: found.specs?.flow || '',
          head_max: found.specs?.head || '',
          material: found.specs?.material || 'Inox 304',
          series: '',
        });
      }
    }
  }, [id, isEdit]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  // Tự động tính phần trăm giảm giá khi nhập giá gốc
  const handleOriginalPriceChange = (val: string) => {
    setFormData(prev => {
      const orig = parseFloat(val) || 0;
      const current = parseFloat(prev.price) || 0;
      let discount = '0';
      if (orig > current && current > 0) {
        discount = Math.round(((orig - current) / orig) * 100).toString();
      }
      return { ...prev, original_price: val, discount_percent: discount };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      toast.error('Vui lòng nhập tên và giá sản phẩm!');
      return;
    }

    setSaving(true);
    try {
      // Lưu vào localStorage để hỗ trợ sản phẩm custom
      const newProduct = {
        id: id || 'custom_' + Date.now(),
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price) || 0,
        image: formData.image || '/dongyin-images/sd_pump_4sdm.jpg',
        description: formData.description || formData.short_description || formData.name,
        specs: {
          power: formData.power_hp || formData.power_kw || 'Tiêu chuẩn',
          flow: formData.flow_rate || 'Tiêu chuẩn',
          head: formData.head_max || 'Tiêu chuẩn',
          material: formData.material || 'Inox',
        },
        inStock: parseInt(formData.stock) > 0,
      };

      const existing = JSON.parse(localStorage.getItem('custom_products') || '[]');
      if (isEdit) {
        const updated = existing.map((p: any) => p.id === id ? newProduct : p);
        localStorage.setItem('custom_products', JSON.stringify(updated));
        addAuditLog('UPDATE', `Chỉnh sửa sản phẩm: ${formData.name}`, `Giá: ${formData.price}đ | Danh mục: ${formData.category}`);
      } else {
        existing.unshift(newProduct);
        localStorage.setItem('custom_products', JSON.stringify(existing));
        addAuditLog('CREATE', `Thêm sản phẩm mới: ${formData.name}`, `Giá: ${formData.price}đ | Danh mục: ${formData.category}`);
      }

      await new Promise(r => setTimeout(r, 600));
      toast.success(isEdit ? 'Đã cập nhật sản phẩm thành công!' : 'Đã thêm sản phẩm mới thành công!');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi lưu sản phẩm');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header Bar */}
      <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/products')}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại
              </Button>
              <div className="h-4 w-px bg-gray-200"></div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/products')}
              >
                <X className="w-4 h-4 mr-1" /> Hủy
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                size="sm"
              >
                <Save className="w-4 h-4 mr-1.5" />
                {saving ? 'Đang lưu...' : 'Lưu sản phẩm'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Card 1: Thông tin cơ bản */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100 text-blue-700 font-bold text-lg">
              <FileText className="w-5 h-5 text-blue-600" />
              Thông tin chung sản phẩm
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                  Tên sản phẩm <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Ví dụ: Máy bơm hỏa tiễn DONGYIN 3SDM-03/17"
                  className="mt-1.5 text-base py-2.5 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                    Danh mục phân loại <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white font-medium"
                  >
                    {allSubcategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="brand" className="text-sm font-semibold text-gray-700">Thương hiệu</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="VOLTOR, DONGYIN..."
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sku" className="text-sm font-semibold text-gray-700">Mã SKU / Model</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="WSD9-8-0.37E..."
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="slug" className="text-sm font-semibold text-gray-700">Đường dẫn tự động (Slug)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="may-bom-hoa-tien..."
                    className="mt-1.5 bg-gray-50 text-gray-600"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Mô tả sản phẩm</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả công dụng, đặc điểm nổi bật, ứng dụng trong gia đình hay công nghiệp..."
                  rows={3}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Giá cả & Kho hàng */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100 text-emerald-700 font-bold text-lg">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              Giá bán & Tồn kho
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                  Giá bán (VNĐ) <span className="text-red-500">*</span>
                </Label>
                <div className="relative mt-1.5">
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="2500000"
                    className="pr-10 font-bold text-blue-600 text-base"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">đ</span>
                </div>
              </div>

              <div>
                <Label htmlFor="original_price" className="text-sm font-semibold text-gray-700">Giá gốc niêm yết (nếu có)</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="original_price"
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => handleOriginalPriceChange(e.target.value)}
                    placeholder="3000000"
                    className="pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">đ</span>
                </div>
              </div>

              <div>
                <Label htmlFor="stock" className="text-sm font-semibold text-gray-700">Số lượng trong kho</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="20"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Thông số kỹ thuật nhanh */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100 text-orange-700 font-bold text-lg">
              <Zap className="w-5 h-5 text-orange-600" />
              Thông số kỹ thuật chính
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="power_hp" className="text-xs font-semibold text-gray-600 uppercase">Công suất (HP/KW)</Label>
                <Input
                  id="power_hp"
                  value={formData.power_hp}
                  onChange={(e) => setFormData({ ...formData, power_hp: e.target.value })}
                  placeholder="1.0HP (0.75KW)"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="flow_rate" className="text-xs font-semibold text-gray-600 uppercase">Lưu lượng nước</Label>
                <Input
                  id="flow_rate"
                  value={formData.flow_rate}
                  onChange={(e) => setFormData({ ...formData, flow_rate: e.target.value })}
                  placeholder="3.9 m³/h..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="head_max" className="text-xs font-semibold text-gray-600 uppercase">Cột áp tối đa</Label>
                <Input
                  id="head_max"
                  value={formData.head_max}
                  onChange={(e) => setFormData({ ...formData, head_max: e.target.value })}
                  placeholder="64m..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="outlet_diameter" className="text-xs font-semibold text-gray-600 uppercase">Ống xả / Giếng</Label>
                <Input
                  id="outlet_diameter"
                  value={formData.outlet_diameter}
                  onChange={(e) => setFormData({ ...formData, outlet_diameter: e.target.value })}
                  placeholder="Ø34mm..."
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Hình ảnh & Preview trực tiếp */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100 text-purple-700 font-bold text-lg">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              Hình ảnh sản phẩm
            </div>

            <div className="space-y-5">
              {/* File upload drag & drop box */}
              <div>
                <Label className="text-sm font-semibold text-gray-700 block mb-2">
                  Tải ảnh từ máy tính (Không cần URL)
                </Label>
                <div className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-gray-50/50 hover:bg-blue-50/30 transition-all cursor-pointer relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          toast.error('Kích thước ảnh tối đa là 5MB!');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const base64 = event.target?.result as string;
                          setFormData(prev => ({ ...prev, image: base64 }));
                          toast.success('Đã tải ảnh lên thành công!');
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      Bấm vào đây để chọn ảnh từ máy tính hoặc kéo thả ảnh vào
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Hỗ trợ JPG, PNG, WEBP tối đa 5MB</p>
                  </div>
                </div>
              </div>

              {/* Hoặc nhập URL / Catalog */}
              <div>
                <Label htmlFor="image" className="text-xs font-semibold text-gray-500 uppercase">
                  Hoặc chọn nhanh ảnh catalog có sẵn / dán link URL
                </Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/dongyin-images/... hoặc link web"
                    className="text-xs"
                  />
                  {formData.image && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="text-xs text-red-500 hover:bg-red-50"
                    >
                      Xóa ảnh
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-xs text-gray-400 self-center">Chọn nhanh:</span>
                  {[
                    ['Hỏa tiễn', '/dongyin-images/sd_pump_4sdm.jpg'],
                    ['Bơm chìm WS', '/dongyin-images/ws_pump.jpg'],
                    ['Cánh cắt WQ', '/dongyin-images/wq_pump.jpg'],
                    ['Trục ngang CP', '/dongyin-images/cpm_cp_pump.jpg'],
                    ['Tủ điện TD', '/dongyin-images/td_box.jpg']
                  ].map(([label, path]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: path }))}
                      className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-600 px-2 py-1 rounded transition-colors"
                    >
                      + {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview Box */}
              {formData.image && (
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-lg border overflow-hidden flex-shrink-0 shadow-sm">
                    <img
                      src={formData.image}
                      alt="Xem trước ảnh"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=Loi+Anh'; }}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Hình ảnh đã sẵn sàng lưu cùng sản phẩm
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate max-w-sm">
                      {formData.image.startsWith('data:') ? 'Ảnh trực tiếp tải từ máy tính (Base64)' : formData.image}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
              className="px-6"
            >
              Hủy bỏ
            </Button>
            <Button 
              type="submit" 
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 text-base font-semibold shadow-md"
            >
              <Save className="w-5 h-5 mr-2" />
              {saving ? 'Đang lưu sản phẩm...' : (isEdit ? 'Cập nhật sản phẩm' : 'Đăng bán sản phẩm')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
