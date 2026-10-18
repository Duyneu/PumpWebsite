import { addAuditLog } from './auditLog';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

const ORDERS_STORAGE_KEY = 'voltor_customer_orders';

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to get orders', e);
    return [];
  }
}

export function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save orders', e);
  }
}

export function createOrder(data: {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}): Order {
  const current = getOrders();
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const newOrder: Order = {
    id: `VLT-${randomSuffix}`,
    customerName: data.customerName.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    address: data.address.trim(),
    notes: data.notes?.trim() || '',
    items: data.items,
    subtotal: data.subtotal,
    shipping: data.shipping,
    total: data.total,
    status: 'pending',
    createdAt: new Date().toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }),
  };

  const updated = [newOrder, ...current];
  saveOrders(updated);

  // Notify audit log
  const formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(newOrder.total);
  addAuditLog(
    'CREATE',
    `Đơn đặt hàng mới #${newOrder.id} (${newOrder.customerName})`,
    `ĐT: ${newOrder.phone} | ${newOrder.items.length} món | Tổng: ${formattedTotal} | Địa chỉ: ${newOrder.address}`
  );

  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = getOrders();
  const updated = orders.map((order) => {
    if (order.id === orderId) {
      return { ...order, status };
    }
    return order;
  });
  saveOrders(updated);

  addAuditLog(
    'UPDATE',
    `Cập nhật trạng thái đơn #${orderId}`,
    `Trạng thái mới: ${getStatusText(status)}`
  );
}

export function deleteOrder(orderId: string): void {
  const orders = getOrders();
  const target = orders.find(o => o.id === orderId);
  const updated = orders.filter((order) => order.id !== orderId);
  saveOrders(updated);

  if (target) {
    addAuditLog(
      'DELETE',
      `Đã xóa đơn đặt hàng #${orderId}`,
      `Khách hàng: ${target.customerName} - ĐT: ${target.phone}`
    );
  }
}

export function getStatusText(status: OrderStatus): string {
  switch (status) {
    case 'pending':
      return 'Chờ xác nhận';
    case 'confirmed':
      return 'Đã xác nhận';
    case 'shipping':
      return 'Đang giao hàng';
    case 'completed':
      return 'Đã hoàn thành';
    case 'cancelled':
      return 'Đã hủy';
    default:
      return status;
  }
}

export function getStatusColor(status: OrderStatus): { bg: string; text: string; border: string } {
  switch (status) {
    case 'pending':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    case 'confirmed':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
    case 'shipping':
      return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
    case 'completed':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'cancelled':
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
    default:
      return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
  }
}
