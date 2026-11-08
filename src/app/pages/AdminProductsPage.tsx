import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Upload,
  ArrowLeft,
  Edit3,
  CheckSquare,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { addAuditLog } from '../utils/auditLog';
import { deleteProduct, batchUpdateProducts, batchDeleteProducts } from '../utils/productStorage';
import { useProducts, invalidateProductsCache } from '../hooks/useProducts';

interface Product {
  id: string | number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  image: string;
}

export function AdminProductsPage() {
  const navigate = useNavigate();
  const rawProducts = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Bulk Edit & Bulk Delete State
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());
  const [bulkEditOpen, setBulkEditOpen] = useState(false);
  const [bulkField, setBulkField] = useState<'brand' | 'category' | 'price' | 'warranty' | 'origin' | 'stock'>('brand');
  const [bulkValue, setBulkValue] = useState('VOLTOR');
  const [bulkApplying, setBulkApplying] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkConfirmOpen, setBulkConfirmOpen] = useState(false);

  const fieldLabelMap: Record<string, string> = {
    brand: 'Thương hiệu',
    category: 'Danh mục',
    price: 'Giá bán',
    warranty: 'Thời hạn bảo hành',
    origin: 'Xuất xứ',
    stock: 'Tình trạng kho',
  };

  const products: Product[] = useMemo(() => {
    return rawProducts.map((p) => ({
      id: p.id,
      name: p.name,
      sku: p.sku || String(p.id),
      price: p.price || 0,
      stock: p.inStock ? 25 : 0,
      category: p.category || 'Máy bơm',
      brand: p.brand || (p.name.includes('DONGYIN') ? 'DONGYIN' : 'VOLTOR'),
      is_featured: false,
      is_bestseller: false,
      is_new: false,
      image: p.image || '/dongyin-images/sd_pump_4sdm.jpg',
    }));
  }, [rawProducts]);

  const categoriesList = useMemo(() => {
    return Array.from(new Set(rawProducts.map(p => p.category).filter(Boolean)));
  }, [rawProducts]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    return filtered;
  }, [searchQuery, selectedCategory, products]);

  const isAllSelected = filteredProducts.length > 0 && filteredProducts.every(p => selectedIds.has(p.id));

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(filteredProducts.map(p => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelectProduct = (id: string | number, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) {
      next.add(id);
    } else {
      next.delete(id);
    }
    setSelectedIds(next);
  };

  const handleApplyBulkEdit = async () => {
    if (selectedIds.size === 0 || !bulkValue.trim()) return;

    setBulkApplying(true);
    try {
      const updates: any = {};
      if (bulkField === 'brand') updates.brand = bulkValue.trim();
      else if (bulkField === 'category') updates.category = bulkValue.trim();
      else if (bulkField === 'price') updates.price = parseFloat(bulkValue) || 0;
      else if (bulkField === 'warranty') updates.warranty = bulkValue.trim();
      else if (bulkField === 'origin') updates.origin = bulkValue.trim();
      else if (bulkField === 'stock') updates.inStock = bulkValue === 'in_stock';

      batchUpdateProducts(Array.from(selectedIds), updates);
      invalidateProductsCache();

      addAuditLog(
        'UPDATE',
        `Sửa hàng loạt cột [${fieldLabelMap[bulkField] || bulkField}] cho ${selectedIds.size} sản phẩm`,
        `Giá trị mới: ${bulkValue}`
      );

      toast.success(`Đã cập nhật cột "${fieldLabelMap[bulkField] || bulkField}" cho ${selectedIds.size} sản phẩm!`);
      setSelectedIds(new Set());
      setBulkConfirmOpen(false);
      setBulkEditOpen(false);
    } catch (err) {
      toast.error('Có lỗi xảy ra khi cập nhật hàng loạt!');
    } finally {
      setBulkApplying(false);
    }
  };

  const handleApplyBulkDelete = async () => {
    if (selectedIds.size === 0) return;

    try {
      const count = selectedIds.size;
      await batchDeleteProducts(Array.from(selectedIds));
      invalidateProductsCache();

      addAuditLog('DELETE', `Xóa hàng loạt: ${count} sản phẩm`, 'Đã xóa vĩnh viễn khỏi hệ thống');
      toast.success(`Đã xóa thành công ${count} sản phẩm!`);
      setSelectedIds(new Set());
      setBulkDeleteOpen(false);
    } catch (err) {
      toast.error('Lỗi khi xóa hàng loạt sản phẩm!');
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      deleteProduct(productToDelete.id);
      invalidateProductsCache();
      addAuditLog(
        'DELETE',
        `Xóa sản phẩm: ${productToDelete.name}`,
        `SKU: ${productToDelete.sku} | Giá: ${productToDelete.price}đ`
      );
      toast.success(`Đã xóa vĩnh viễn sản phẩm "${productToDelete.name}"`);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Không thể xóa sản phẩm');
    }
  };

  const handleEditProduct = (product: Product) => {
    navigate(`/admin/products/edit/${product.id}`);
  };

  const handleViewProduct = (product: Product) => {
    window.open(`/products/${product.id}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin')}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
              </div>
              <p className="text-gray-600 text-sm">
                Tổng cộng <strong>{filteredProducts.length}</strong> sản phẩm {selectedCategory !== 'all' ? `(Lọc theo ${selectedCategory})` : ''}
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigate('/admin/products/new')} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Thêm sản phẩm
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo tên, SKU, thương hiệu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[220px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục ({products.length})</SelectItem>
                  {categoriesList.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/70">
                <TableHead className="w-[48px] text-center">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) => toggleSelectAll(Boolean(checked))}
                    aria-label="Chọn tất cả"
                  />
                </TableHead>
                <TableHead className="w-[80px]">Ảnh</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Thương hiệu</TableHead>
                <TableHead className="text-right">Giá</TableHead>
                <TableHead className="text-center">Kho</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12 text-gray-500">
                    Không tìm thấy sản phẩm nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow 
                    key={product.id}
                    className={selectedIds.has(product.id) ? 'bg-blue-50/40' : undefined}
                  >
                    <TableCell className="text-center">
                      <Checkbox
                        checked={selectedIds.has(product.id)}
                        onCheckedChange={(checked) => toggleSelectProduct(product.id, Boolean(checked))}
                        aria-label={`Chọn ${product.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-contain bg-gray-50 p-1 rounded-md border"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/dongyin-images/sd_pump_4sdm.jpg'; }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-semibold text-gray-900 line-clamp-2 text-sm">{product.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-[11px] font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {product.sku}
                      </code>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-gray-600 bg-gray-50 border px-2 py-1 rounded-md font-medium">
                        {product.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-bold text-xs bg-slate-50 text-slate-800 border-slate-300">
                        {product.brand}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-sm text-gray-900 tabular-nums">
                      {product.price.toLocaleString('vi-VN')} ₫
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={product.stock > 10 ? 'default' : 'destructive'} className="text-[11px]">
                        {product.stock > 0 ? `Còn hàng (${product.stock})` : 'Hết hàng'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-1 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewProduct(product)}
                          title="Xem sản phẩm"
                        >
                          <Eye className="w-4 h-4 text-gray-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                          title="Sửa sản phẩm"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setProductToDelete(product);
                            setDeleteDialogOpen(true);
                          }}
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              {selectedIds.size}
            </span>
            <span>Đã chọn {selectedIds.size} sản phẩm</span>
          </div>
          <div className="h-4 w-px bg-slate-700 mx-1"></div>
          <Button
            size="sm"
            onClick={() => {
              setBulkField('brand');
              setBulkValue('VOLTOR');
              setBulkEditOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5 shadow-sm"
          >
            <Edit3 className="w-3.5 h-3.5" /> Sửa hàng loạt (Full cột)
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setBulkDeleteOpen(true)}
            className="text-xs font-semibold gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" /> Xóa đã chọn
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedIds(new Set())}
            className="text-xs text-gray-400 hover:text-white"
          >
            Bỏ chọn
          </Button>
        </div>
      )}

      {/* Bulk Edit Modal Dialog */}
      <Dialog open={bulkEditOpen} onOpenChange={setBulkEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">
              Sửa hàng loạt ({selectedIds.size} sản phẩm)
            </DialogTitle>
            <DialogDescription>
              Chọn cột cần sửa và nhập giá trị mới để áp dụng đồng loạt cho {selectedIds.size} sản phẩm đang được chọn.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div>
              <Label className="text-xs font-bold text-gray-700 uppercase mb-1.5 block">
                1. Chọn cột muốn sửa đổi
              </Label>
              <Select value={bulkField} onValueChange={(val: any) => {
                setBulkField(val);
                if (val === 'brand') setBulkValue('VOLTOR');
                else if (val === 'warranty') setBulkValue('12 tháng');
                else if (val === 'origin') setBulkValue('Việt Nam');
                else if (val === 'stock') setBulkValue('in_stock');
                else if (val === 'category') setBulkValue(categoriesList[0] || 'Máy bơm hỏa tiễn');
                else setBulkValue('');
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brand">Thương hiệu</SelectItem>
                  <SelectItem value="category">Danh mục</SelectItem>
                  <SelectItem value="price">Giá bán</SelectItem>
                  <SelectItem value="warranty">Thời hạn bảo hành</SelectItem>
                  <SelectItem value="origin">Xuất xứ</SelectItem>
                  <SelectItem value="stock">Tình trạng kho</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-bold text-gray-700 uppercase mb-1.5 block">
                2. Giá trị mới áp dụng
              </Label>

              {bulkField === 'brand' && (
                <div className="space-y-2">
                  <Input
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                    placeholder="Nhập tên thương hiệu (VD: VOLTOR, DONGYIN...)"
                  />
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="text-xs text-gray-400 self-center">Chọn nhanh:</span>
                    {['VOLTOR', 'DONGYIN', 'PENTAX', 'EBARA', 'SHIMGE'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBulkValue(b)}
                        className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 px-2 py-1 rounded text-gray-700 transition-colors font-medium"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bulkField === 'category' && (
                <Select value={bulkValue} onValueChange={setBulkValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesList.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {bulkField === 'price' && (
                <Input
                  type="number"
                  value={bulkValue}
                  onChange={(e) => setBulkValue(e.target.value)}
                  placeholder="Nhập giá mới (VNĐ)..."
                />
              )}

              {bulkField === 'warranty' && (
                <div className="space-y-2">
                  <Input
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                    placeholder="Nhập thời gian bảo hành..."
                  />
                  <div className="flex gap-1.5 flex-wrap">
                    {['12 tháng', '24 tháng', '36 tháng', '6 tháng'].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setBulkValue(w)}
                        className="text-xs bg-gray-100 hover:bg-blue-100 px-2 py-1 rounded text-gray-700 font-medium"
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bulkField === 'origin' && (
                <div className="space-y-2">
                  <Input
                    value={bulkValue}
                    onChange={(e) => setBulkValue(e.target.value)}
                    placeholder="Nhập xuất xứ..."
                  />
                  <div className="flex gap-1.5 flex-wrap">
                    {['Việt Nam', 'Trung Quốc', 'Ý', 'Đài Loan', 'Nhật Bản'].map((o) => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => setBulkValue(o)}
                        className="text-xs bg-gray-100 hover:bg-blue-100 px-2 py-1 rounded text-gray-700 font-medium"
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bulkField === 'stock' && (
                <Select value={bulkValue} onValueChange={setBulkValue}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_stock">Còn hàng (Stock: 25)</SelectItem>
                    <SelectItem value="out_of_stock">Hết hàng (Stock: 0)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900">
              Sẽ cập nhật cột <strong>{fieldLabelMap[bulkField] || bulkField}</strong> thành <strong>"{bulkField === 'stock' ? (bulkValue === 'in_stock' ? 'Còn hàng' : 'Hết hàng') : (bulkValue || '(trống)')}"</strong> cho tất cả <strong>{selectedIds.size} sản phẩm</strong> đã chọn và tự động đồng bộ lên Cloudflare D1.
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkEditOpen(false)}>Hủy</Button>
            <Button
              onClick={() => {
                if (!bulkValue && bulkField !== 'brand') {
                  toast.error('Vui lòng nhập hoặc chọn giá trị');
                  return;
                }
                setBulkConfirmOpen(true);
              }}
              disabled={bulkApplying || !bulkValue}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Edit Confirmation Dialog */}
      <AlertDialog open={bulkConfirmOpen} onOpenChange={setBulkConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận sửa hàng loạt</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2 text-sm text-gray-600">
              <span className="block">
                Bạn có chắc chắn muốn sửa cột <strong>{fieldLabelMap[bulkField] || bulkField}</strong> thành <strong>"{bulkField === 'stock' ? (bulkValue === 'in_stock' ? 'Còn hàng' : 'Hết hàng') : (bulkValue || '(trống)')}"</strong> cho <strong>{selectedIds.size} sản phẩm</strong> đã chọn?
              </span>
              <span className="block text-xs text-amber-700 font-medium">
                Dữ liệu sẽ được cập nhật đồng loạt trên hệ thống và đồng bộ lên Cloudflare D1.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={bulkApplying}>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleApplyBulkEdit();
              }}
              disabled={bulkApplying}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              {bulkApplying ? 'Đang cập nhật...' : 'Chắc chắn sửa'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa hàng loạt</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa vĩnh viễn <strong>{selectedIds.size} sản phẩm</strong> đã chọn? Dữ liệu sẽ được xóa khỏi cả bộ nhớ và Cloudflare D1.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApplyBulkDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa {selectedIds.size} sản phẩm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Single Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa sản phẩm</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm{' '}
              <strong>{productToDelete?.name}</strong>? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="bg-red-600 hover:bg-red-700"
            >
              Xóa sản phẩm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
