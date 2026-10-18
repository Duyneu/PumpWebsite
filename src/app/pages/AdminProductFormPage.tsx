import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

export function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    category_id: '',
    price: '',
    original_price: '',
    discount_percent: '0',
    short_description: '',
    description: '',
    brand: '',
    model: '',
    origin: '',
    warranty: '',
    image: '',
    stock: '',
    is_featured: false,
    is_bestseller: false,
    is_new: false,
    // Specifications
    power_hp: '',
    power_kw: '',
    voltage: '',
    outlet_diameter: '',
    flow_rate: '',
    head_max: '',
    material: '',
    series: '',
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [id, isEdit]);

  const fetchProduct = async () => {
    try {
      // TODO: Replace with real API call
      const mockProduct = {
        name: 'Máy bơm chìm nước thải VOLTOR WSD9-8-0.37E',
        slug: 'may-bom-chim-nuoc-thai-voltor-wsd9-8-0-37e',
        sku: 'WSD9-8-0.37E',
        category_id: '5',
        price: '1550000',
        original_price: '',
        discount_percent: '0',
        short_description: 'Máy bơm chìm nước thải 0.5HP, lưu lượng 12m³/6m, hồng xả Ø42mm',
        description: 'Máy bơm chìm nước thải VOLTOR WSD9-8-0.37E công suất 0.5HP...',
        brand: 'VOLTOR',
        model: 'WSD9-8-0.37E',
        origin: 'Việt Nam',
        warranty: '12 tháng',
        image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800',
        stock: '30',
        is_featured: false,
        is_bestseller: false,
        is_new: true,
        power_hp: '0.5HP',
        power_kw: '0.37KW',
        voltage: '220V',
        outlet_diameter: 'Ø42mm',
        flow_rate: '12m³/6m, 8m³/9m, 6m³/10m',
        head_max: '10m',
        material: 'Gang đúc + Inox',
        series: 'WS Series',
      };
      setFormData(mockProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Không thể tải thông tin sản phẩm');
    }
  };

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
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(isEdit ? 'Cập nhật sản phẩm thành công!' : 'Thêm sản phẩm thành công!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Không thể lưu sản phẩm');
    } finally {
      setSaving(false);
    }
  };

  // Auth checks removed for direct access

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin/products')}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl">
                  {isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isEdit ? 'Cập nhật thông tin sản phẩm' : 'Nhập thông tin sản phẩm'}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/products')}
              >
                <X className="w-4 h-4 mr-2" />
                Hủy
              </Button>
              <Button onClick={handleSubmit} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Đang lưu...' : 'Lưu sản phẩm'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>Tên, mô tả, giá cả sản phẩm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name">Tên sản phẩm *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Máy bơm chìm..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="sku">Mã SKU *</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="WSD9-8-0.37E"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="may-bom-chim..."
                  />
                </div>

                <div>
                  <Label htmlFor="brand">Thương hiệu *</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="VOLTOR, DONGYIN..."
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="WSD9-8-0.37E"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Danh mục *</Label>
                  <Select value={formData.category_id} onValueChange={(v) => setFormData({ ...formData, category_id: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Máy Bơm Chìm</SelectItem>
                      <SelectItem value="7">Máy Bơm Chìm 3 Pha</SelectItem>
                      <SelectItem value="8">Điện Công Nghiệp</SelectItem>
                      <SelectItem value="9">Động Cơ Điện</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="origin">Xuất xứ</Label>
                  <Input
                    id="origin"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="Việt Nam, Trung Quốc..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="short_description">Mô tả ngắn</Label>
                <Textarea
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Mô tả ngắn gọn về sản phẩm..."
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="description">Mô tả chi tiết</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả chi tiết về sản phẩm..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Stock */}
          <Card>
            <CardHeader>
              <CardTitle>Giá & Kho hàng</CardTitle>
              <CardDescription>Giá bán, giảm giá, số lượng tồn kho</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Giá bán *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="1550000"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="original_price">Giá gốc</Label>
                  <Input
                    id="original_price"
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    placeholder="2000000"
                  />
                </div>

                <div>
                  <Label htmlFor="discount_percent">% Giảm giá</Label>
                  <Input
                    id="discount_percent"
                    type="number"
                    value={formData.discount_percent}
                    onChange={(e) => setFormData({ ...formData, discount_percent: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="stock">Số lượng tồn kho *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="30"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="warranty">Bảo hành</Label>
                  <Input
                    id="warranty"
                    value={formData.warranty}
                    onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    placeholder="12 tháng"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Thông số kỹ thuật</CardTitle>
              <CardDescription>Công suất, lưu lượng, cột áp...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="power_hp">Công suất (HP)</Label>
                  <Input
                    id="power_hp"
                    value={formData.power_hp}
                    onChange={(e) => setFormData({ ...formData, power_hp: e.target.value })}
                    placeholder="0.5HP"
                  />
                </div>

                <div>
                  <Label htmlFor="power_kw">Công suất (KW)</Label>
                  <Input
                    id="power_kw"
                    value={formData.power_kw}
                    onChange={(e) => setFormData({ ...formData, power_kw: e.target.value })}
                    placeholder="0.37KW"
                  />
                </div>

                <div>
                  <Label htmlFor="voltage">Điện áp</Label>
                  <Input
                    id="voltage"
                    value={formData.voltage}
                    onChange={(e) => setFormData({ ...formData, voltage: e.target.value })}
                    placeholder="220V"
                  />
                </div>

                <div>
                  <Label htmlFor="outlet_diameter">Đường kính hồng xả</Label>
                  <Input
                    id="outlet_diameter"
                    value={formData.outlet_diameter}
                    onChange={(e) => setFormData({ ...formData, outlet_diameter: e.target.value })}
                    placeholder="Ø42mm"
                  />
                </div>

                <div>
                  <Label htmlFor="flow_rate">Lưu lượng</Label>
                  <Input
                    id="flow_rate"
                    value={formData.flow_rate}
                    onChange={(e) => setFormData({ ...formData, flow_rate: e.target.value })}
                    placeholder="12m³/6m, 8m³/9m"
                  />
                </div>

                <div>
                  <Label htmlFor="head_max">Cột áp tối đa</Label>
                  <Input
                    id="head_max"
                    value={formData.head_max}
                    onChange={(e) => setFormData({ ...formData, head_max: e.target.value })}
                    placeholder="10m"
                  />
                </div>

                <div>
                  <Label htmlFor="material">Chất liệu</Label>
                  <Input
                    id="material"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="Gang đúc + Inox"
                  />
                </div>

                <div>
                  <Label htmlFor="series">Series</Label>
                  <Input
                    id="series"
                    value={formData.series}
                    onChange={(e) => setFormData({ ...formData, series: e.target.value })}
                    placeholder="WS Series, SD Series..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images & Status */}
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh & Trạng thái</CardTitle>
              <CardDescription>Ảnh sản phẩm và các tags đặc biệt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="image">URL hình ảnh chính</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://... hoặc figma:asset/..."
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="is_featured">Sản phẩm nổi bật (Featured)</Label>
                    <p className="text-sm text-gray-500">Hiển thị ở trang chủ</p>
                  </div>
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(v) => setFormData({ ...formData, is_featured: v })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="is_bestseller">Sản phẩm bán chạy (Bestseller)</Label>
                    <p className="text-sm text-gray-500">Badge "Bán chạy"</p>
                  </div>
                  <Switch
                    id="is_bestseller"
                    checked={formData.is_bestseller}
                    onCheckedChange={(v) => setFormData({ ...formData, is_bestseller: v })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="is_new">Sản phẩm mới (New)</Label>
                    <p className="text-sm text-gray-500">Badge "Mới"</p>
                  </div>
                  <Switch
                    id="is_new"
                    checked={formData.is_new}
                    onCheckedChange={(v) => setFormData({ ...formData, is_new: v })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/products')}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Đang lưu...' : 'Lưu sản phẩm'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
