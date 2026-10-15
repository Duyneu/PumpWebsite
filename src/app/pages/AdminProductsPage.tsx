import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Upload,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
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

interface Product {
  id: number;
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
  const { user, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      navigate('/');
      return;
    }

    if (user && user.role === 'admin') {
      fetchProducts();
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with real API call
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Máy bơm chìm nước thải VOLTOR WSD9-8-0.37E',
          sku: 'WSD9-8-0.37E',
          price: 1550000,
          stock: 30,
          category: 'Máy Bơm Chìm',
          brand: 'VOLTOR',
          is_featured: false,
          is_bestseller: false,
          is_new: true,
          image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800'
        },
        {
          id: 2,
          name: 'Máy bơm chìm hóa tiến DONGYIN 2SDM-0.7/32',
          sku: '2SDM-0.7/32',
          price: 2000000,
          stock: 15,
          category: 'Máy Bơm Chìm',
          brand: 'DONGYIN',
          is_featured: false,
          is_bestseller: false,
          is_new: true,
          image: 'figma:asset/58e358fd89af2fe881e55e4ecdebcb54e2ef425c.png'
        },
        {
          id: 3,
          name: 'Tủ điện bơm nước VOLTOR 2.0TD-0.50HP',
          sku: '2.0TD-0.50HP',
          price: 190000,
          stock: 50,
          category: 'Điện Công Nghiệp',
          brand: 'VOLTOR',
          is_featured: true,
          is_bestseller: true,
          is_new: false,
          image: 'figma:asset/10d62a1b66fbeef6e4488d6b3639891e271b7d31.png'
        }
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Không thể tải danh sách sản phẩm');
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setProducts(products.filter((p) => p.id !== productToDelete.id));
      toast.success(`Đã xóa sản phẩm "${productToDelete.name}"`);
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

  if (loading || isLoading) {
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
              <div className="flex items-center gap-3 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin')}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <h1 className="text-3xl">Quản lý sản phẩm</h1>
              </div>
              <p className="text-gray-600">
                Tổng {filteredProducts.length} sản phẩm
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button onClick={() => navigate('/admin/products/new')}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm sản phẩm
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
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
                <SelectTrigger className="w-[200px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  <SelectItem value="Máy Bơm Chìm">Máy Bơm Chìm</SelectItem>
                  <SelectItem value="Điện Công Nghiệp">Điện Công Nghiệp</SelectItem>
                  <SelectItem value="Động Cơ Điện">Động Cơ Điện</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Ảnh</TableHead>
                <TableHead>Tên sản phẩm</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Thương hiệu</TableHead>
                <TableHead className="text-right">Giá</TableHead>
                <TableHead className="text-center">Kho</TableHead>
                <TableHead className="text-center">Tags</TableHead>
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
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium line-clamp-2">{product.name}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {product.sku}
                      </code>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell className="text-right font-medium">
                      {product.price.toLocaleString('vi-VN')} ₫
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={product.stock > 10 ? 'default' : 'destructive'}>
                        {product.stock}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 justify-center flex-wrap">
                        {product.is_featured && (
                          <Badge variant="secondary" className="text-xs">
                            ⭐ Featured
                          </Badge>
                        )}
                        {product.is_bestseller && (
                          <Badge variant="secondary" className="text-xs">
                            🔥 Hot
                          </Badge>
                        )}
                        {product.is_new && (
                          <Badge variant="secondary" className="text-xs">
                            ✨ New
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewProduct(product)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setProductToDelete(product);
                            setDeleteDialogOpen(true);
                          }}
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

      {/* Delete Confirmation Dialog */}
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
