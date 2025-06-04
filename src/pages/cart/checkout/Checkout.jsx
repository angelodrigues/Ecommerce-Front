import { useCart } from '../../../service/CartContext';
import { useEffect, useState } from 'react';
import './checkout.css';
import CreditCardPreview from '../../../components/creditCard/CreditCardPreview';
import { getAuthToken } from '../../../authCheck/tokenUtils';
import { useNavigate } from 'react-router';

export default function Checkout() {
  const { cart, removeFromCart, setCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const token = getAuthToken();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Carrinho, 2: Endereço, 3: Pagamento
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    zipCode: '', street: '', number: '', complement: '',
    neighborhood: '', city: '', state: '', defaultAddress: false
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [loading, setLoading] = useState(false);

  const isCardValid = cardData.number.length === 16 && cardData.name && cardData.expiry.length === 5 && cardData.cvv.length === 3;
  const canFinish = selectedAddress && paymentMethod && (paymentMethod !== 'card' || isCardValid);

  useEffect(() => {
    if (!token) return;
    fetch('http://52.67.254.235:8090/user/addresses', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject('Erro ao buscar endereços'))
      .then(data => {
        setAddresses(data);
        const defaultAddr = data.find(a => a.defaultAddress) || data[0];
        if (defaultAddr) setSelectedAddress(defaultAddr);
      })
      .catch(err => console.error(err));
  }, [token]);

  const handleCepSearch = async (cep) => {
    if (cep.length !== 8) return;
    setLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setNewAddress(prev => ({
          ...prev,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf
        }));
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleAddAddress = async () => {
    if (!newAddress.zipCode || !newAddress.street || !newAddress.number) return;
    try {
      const res = await fetch('http://52.67.254.235:8090/user/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newAddress)
      });
      if (!res.ok) throw new Error('Erro ao adicionar');
      const created = await res.json();

      if (newAddress.defaultAddress) {
        await fetch(`http://52.67.254.235:8090/user/profile/default-address/${created.id}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      const fresh = await fetch('http://52.67.254.235:8090/user/addresses', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json());

      setAddresses(fresh);
      setSelectedAddress(fresh.find(a => a.id === created.id));
    } catch (err) {
      console.error(err);
    }

    setNewAddress({ zipCode: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '', defaultAddress: false });
  };

  const handleCompletePurchase = async () => {
    if (!selectedAddress || !paymentMethod || cart.length === 0) return;
    // Simula criação da ordem (apenas visual)
    setCart([]); // Limpa carrinho
    navigate('/auth/user/orders');
  };

  return (
    <div className="checkout-section">
      <h2 className="checkout-title">Purchase Confirmation</h2>

      {step === 1 && (
        <div className="checkout-summary">
          <h3 className="checkout-subtitle">Order Summary</h3>
          <ul className="checkout-list">
            {cart.map(item => (
              <li key={item.id} className="checkout-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button style={{marginLeft: 16, background: '#dc7e27', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', cursor: 'pointer'}} onClick={() => removeFromCart(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Total:</span>
            <span className="cart-total">${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="checkout-address">
          <h3 className="checkout-subtitle">Delivery Address</h3>
          {addresses.length > 0 ? (
            <>
              <div className="address-list">
                {addresses.map(addr => (
                  <div 
                    key={addr.id} 
                    className={`address-item ${selectedAddress?.id === addr.id ? 'selected' : ''}`} 
                    onClick={() => setSelectedAddress(addr)}
                  >
                    <div className="address-header">
                      <span className="address-title">
                        {addr.street}, {addr.number}
                        {addr.defaultAddress && <span className="default-badge">Default</span>}
                      </span>
                    </div>
                    <p className="address-details">
                      {addr.complement && `${addr.complement} - `}
                      {addr.neighborhood}, {addr.city} - {addr.state}
                    </p>
                  </div>
                ))}
              </div>
              <div className="address-separator">
                <span>Or add a new address</span>
              </div>
            </>
          ) : (
            <div className="no-addresses-message">
              <p>You don't have any saved addresses. Please add a new address below.</p>
            </div>
          )}

          <div className="new-address-form">
            <h4 className="form-title">Add New Address</h4>
            <div className="form-group"><label>ZIP Code</label><input value={newAddress.zipCode} onChange={(e) => { const cep = e.target.value.replace(/\D/g, ''); setNewAddress(p => ({ ...p, zipCode: cep })); if (cep.length === 8) handleCepSearch(cep); }} /></div>
            <div className="form-row">
              <div className="form-group"><label>Street</label><input value={newAddress.street} onChange={e => setNewAddress(p => ({ ...p, street: e.target.value }))} /></div>
              <div className="form-group"><label>Number</label><input value={newAddress.number} onChange={e => setNewAddress(p => ({ ...p, number: e.target.value }))} /></div>
            </div>
            <div className="form-group"><label>Complement</label><input value={newAddress.complement} onChange={e => setNewAddress(p => ({ ...p, complement: e.target.value }))} /></div>
            <div className="form-row">
              <div className="form-group"><label>Neighborhood</label><input value={newAddress.neighborhood} onChange={e => setNewAddress(p => ({ ...p, neighborhood: e.target.value }))} /></div>
              <div className="form-group"><label>City</label><input value={newAddress.city} onChange={e => setNewAddress(p => ({ ...p, city: e.target.value }))} /></div>
              <div className="form-group"><label>State</label><input value={newAddress.state} onChange={e => setNewAddress(p => ({ ...p, state: e.target.value }))} maxLength={2} /></div>
            </div>
            <div className="form-group switch-group">
              <label className="switch">
                <input type="checkbox" checked={newAddress.defaultAddress} onChange={e => setNewAddress(p => ({ ...p, defaultAddress: e.target.checked }))} />
                <span className="slider round"></span>
              </label>
              <label className="switch-label">Set as default address</label>
            </div>
            <button className="add-address-btn" onClick={handleAddAddress}>Add Address</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="checkout-payment">
          <h3 className="checkout-subtitle">Forma de Pagamento</h3>
          <div className="payment-options">
            {['card', 'pix', 'boleto'].map(opt => (
              <label key={opt} className={`payment-option ${paymentMethod === opt ? 'selected' : ''}`}>
                <input type="radio" name="payment" value={opt} checked={paymentMethod === opt} onChange={() => setPaymentMethod(opt)} />
                {opt === 'card' ? 'Cartão de Crédito' : opt === 'pix' ? 'Pix' : 'Boleto Bancário'}
              </label>
            ))}
          </div>

          {paymentMethod === 'card' && (
            <div className="card-form-preview-wrapper">
              <div className="card-form">
                <div className="form-group"><label>Número do Cartão</label><input maxLength={16} value={cardData.number} onChange={e => setCardData(p => ({ ...p, number: e.target.value.replace(/\D/g, '') }))} /></div>
                <div className="form-group"><label>Nome impresso</label><input value={cardData.name} onChange={e => setCardData(p => ({ ...p, name: e.target.value }))} /></div>
                <div className="form-row">
                  <div className="form-group"><label>Validade</label><input maxLength={5} value={cardData.expiry} onChange={e => setCardData(p => ({ ...p, expiry: e.target.value.replace(/[^0-9\/]/g, '') }))} /></div>
                  <div className="form-group"><label>CVV</label><input maxLength={3} value={cardData.cvv} onChange={e => setCardData(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '') }))} /></div>
                </div>
              </div>
              <CreditCardPreview number={cardData.number} name={cardData.name} expiry={cardData.expiry} cvc={cardData.cvv} />
            </div>
          )}
          {paymentMethod === 'pix' && <div className="payment-info">Chave Pix será exibida após finalizar a compra.</div>}
          {paymentMethod === 'boleto' && <div className="payment-info">O boleto será gerado após finalizar a compra.</div>}
        </div>
      )}

      <div className="checkout-actions">
        {step > 1 && (
          <button className="cart-continue" onClick={() => setStep(step - 1)} style={{ marginRight: 12 }}>
            Back
          </button>
        )}
        {step < 3 && (
          <button className="cart-continue" onClick={() => setStep(step + 1)}>
            Next
          </button>
        )}
        {step === 3 && (
          <button className="cart-continue" disabled={!canFinish} onClick={handleCompletePurchase}>
            Complete Purchase
          </button>
        )}
      </div>
    </div>
  );
}
