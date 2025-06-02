import { useCart } from '../../service/CartContext';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import './cart.css';

export default function Cart() {
  const { cart, setCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((sum, item) => sum + item.price * item.quantity, 0));
  }, [cart]);

  const increase = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };
  const decrease = (id) => {
    setCart(cart.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };
  const remove = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="cart-section">
      <h2 className="cart-title">My Cart</h2>
      <div className="cart-grid">
        <div className="cart-header">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Total</span>
          <span>Actions</span>
        </div>
        {cart.length === 0 ? (
          <div className="cart-empty">Seu carrinho está vazio.</div>
        ) : (
          cart.map(item => (
            <div className="cart-row" key={item.id}>
              <div className="cart-product">
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
              <span>R$ {item.price.toFixed(2)}</span>
              <div className="cart-qty">
                <button onClick={() => decrease(item.id)} disabled={item.quantity === 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increase(item.id)}>+</button>
              </div>
              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              <button className="cart-remove" onClick={() => remove(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <span>Total:</span>
        <span className="cart-total">
          R$ {total.toFixed(2)}
        </span>
        <button className="cart-continue" onClick={() => navigate('/checkout')} disabled={cart.length === 0}>Checkout</button>
      </div>
    </div>
  );
} 