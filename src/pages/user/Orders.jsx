import { useEffect, useState } from 'react';
import { getAuthToken } from '../../authCheck/tokenUtils';
import { getAllProducts } from '../../service/productService';
import './user.css';

function generateFakeOrders(products) {
  // Gera até 3 pedidos fake, cada um com 1-3 produtos aleatórios
  const fakeStatuses = ['Processing', 'Shipped', 'Delivered'];
  const fakePayments = ['Credit Card', 'Pix', 'Boleto'];
  const orders = Array.from({ length: 3 }).map((_, i) => {
    const items = products.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
    const total = items.reduce((sum, p) => sum + Number(p.price), 0);
    return {
      id: 1000 + i,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      status: fakeStatuses[i % fakeStatuses.length],
      paymentMethod: fakePayments[i % fakePayments.length],
      total,
      items
    };
  });
  return orders;
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getAuthToken();

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch('http://52.67.254.235:8090/order/user', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Erro ao buscar pedidos'))
      .then(async data => {
        if (Array.isArray(data) && data.length > 0) {
          setOrders(data);
        } else {
          // Se não houver pedidos reais, gera fake
          const products = await getAllProducts();
          setOrders(generateFakeOrders(products));
        }
        setLoading(false);
      })
      .catch(async err => {
        // Em caso de erro, também gera fake
        try {
          const products = await getAllProducts();
          setOrders(generateFakeOrders(products));
        } catch {
          setError('Erro ao buscar pedidos e produtos');
        }
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="user-section">
      <div className="user-card">
        <h2 className="text-3xl text-white font-inter capitalize p-4">My Orders</h2>
        {loading ? (
          <div className="text-white p-4">Loading orders...</div>
        ) : error ? (
          <div className="text-red-500 p-4">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-white p-4">No orders found.</div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div className="order-item" key={order.id}>
                <div className="order-info">
                  <span className="order-id">Order #{order.id}</span>
                  <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  <span className="order-status">{order.status}</span>
                  <span>Total: R$ {Number(order.total).toFixed(2)}</span>
                  <span style={{ color: '#dc7e27', fontWeight: 500 }}>Payment: {order.paymentMethod || 'N/A'}</span>
                </div>
                {/* Exemplo: mostrar produtos do pedido fake */}
                {order.items && (
                  <ul style={{ color: '#bdbdbd', fontSize: '0.95rem', marginTop: 8 }}>
                    {order.items.map(item => (
                      <li key={item.id}>- {item.name} (R$ {Number(item.price).toFixed(2)})</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 