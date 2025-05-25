import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Inicialize com alguns itens para simulação
  const [cart, setCart] = useState([
    { id: 1, name: 'Cadeira Gamer', price: 499.90, quantity: 1, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80' },
    { id: 2, name: 'Poltrona Moderna', price: 299.90, quantity: 2, image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=200&q=80' },
    { id: 3, name: 'Mesa Escritório', price: 399.90, quantity: 1, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80' },
    { id: 4, name: 'Estante', price: 199.90, quantity: 1, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80' },
    { id: 5, name: 'Banco Alto', price: 129.90, quantity: 1, image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=200&q=80' }
  ]);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
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