import { useNavigate } from 'react-router-dom';
import { Cart } from '../components/Cart';
import { useCart } from '../contexts/CartContext';

export function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <Cart
      items={cartItems}
      onUpdateQuantity={updateQuantity}
      onRemove={removeFromCart}
      onClearCart={clearCart}
      onContinueShopping={() => navigate('/products')}
    />
  );
}
