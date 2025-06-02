import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Inicialize o carrinho vazio
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart((prev) => {
    const found = prev.find(p => p.id === item.id);
    if (found) {
      return prev.map(p =>
        p.id === item.id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      );
    } else {
      return [...prev, item];
    }
  });
  const removeFromCart = (id) => setCart((prev) => prev.filter(item => item.id !== id));
  const updateCart = (newCart) => setCart(newCart);

  // Quantidade total de itens (soma das quantidades)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 