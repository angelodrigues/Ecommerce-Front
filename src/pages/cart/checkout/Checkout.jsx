import { useCart } from '../../../service/CartContext';
import { useState } from 'react';
import './checkout.css';
import CreditCardPreview from '../../../components/creditCard/CreditCardPreview';

export default function Checkout() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    isDefault: false
  });
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const isCardValid = cardData.number.length === 16 && cardData.name && cardData.expiry.length === 5 && cardData.cvv.length === 3;
  const canFinish = selectedAddress && paymentMethod && (paymentMethod !== 'card' || isCardValid);

  const handleCepSearch = async (cep) => {
    if (cep.length !== 8) return;
    
    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setNewAddress(prev => ({
          ...prev,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
    setLoading(false);
  };

  const handleAddAddress = () => {
    if (!newAddress.cep || !newAddress.street || !newAddress.number) return;
    
    const newAddressWithId = {
      ...newAddress,
      id: Date.now()
    };
    
    setAddresses(prev => {
      const updated = [...prev, newAddressWithId];
      if (newAddress.isDefault) {
        return updated.map(addr => ({
          ...addr,
          isDefault: addr.id === newAddressWithId.id
        }));
      }
      return updated;
    });
    
    setNewAddress({
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      isDefault: false
    });
  };

  return (
    <div className="checkout-section">
      <h2 className="checkout-title">Confirmação de Compra</h2>
      <div className="checkout-content">
        <div className="checkout-address">
          <h3 className="checkout-subtitle">Endereço de Entrega</h3>
          
          {addresses.length > 0 && (
            <div className="address-list">
              {addresses.map(address => (
                <div 
                  key={address.id} 
                  className={`address-item ${selectedAddress?.id === address.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAddress(address)}
                >
                  <div className="address-header">
                    <span className="address-title">
                      {address.street}, {address.number}
                      {address.isDefault && <span className="default-badge">Padrão</span>}
                    </span>
                  </div>
                  <p className="address-details">
                    {address.complement && `${address.complement} - `}
                    {address.neighborhood}, {address.city} - {address.state}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="new-address-form">
            <h4 className="form-title">Adicionar Novo Endereço</h4>
            <div className="form-group">
              <label>CEP</label>
              <input
                type="text"
                value={newAddress.cep}
                onChange={(e) => {
                  const cep = e.target.value.replace(/\D/g, '');
                  setNewAddress(prev => ({ ...prev, cep }));
                  if (cep.length === 8) handleCepSearch(cep);
                }}
                placeholder="00000-000"
                maxLength={8}
              />
              {loading && <span className="loading">Buscando...</span>}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Rua</label>
                <input
                  type="text"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                  placeholder="Rua"
                />
              </div>
              <div className="form-group">
                <label>Número</label>
                <input
                  type="text"
                  value={newAddress.number}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, number: e.target.value }))}
                  placeholder="Número"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Complemento</label>
              <input
                type="text"
                value={newAddress.complement}
                onChange={(e) => setNewAddress(prev => ({ ...prev, complement: e.target.value }))}
                placeholder="Complemento (opcional)"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Bairro</label>
                <input
                  type="text"
                  value={newAddress.neighborhood}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, neighborhood: e.target.value }))}
                  placeholder="Bairro"
                />
              </div>
              <div className="form-group">
                <label>Cidade</label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Cidade"
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <input
                  type="text"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="UF"
                  maxLength={2}
                />
              </div>
            </div>

            <div className="form-group switch-group">
              <label className="switch">
                <input
                  type="checkbox"
                  id="defaultAddress"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                />
                <span className="slider round"></span>
              </label>
              <label htmlFor="defaultAddress" className="switch-label">Definir como endereço padrão</label>
            </div>

            <button className="add-address-btn" onClick={handleAddAddress}>
              Adicionar Endereço
            </button>
          </div>
        </div>
        <div className="checkout-summary">
          <h3 className="checkout-subtitle">Resumo do Pedido</h3>
          <ul className="checkout-list">
            {cart.map(item => (
              <li key={item.id} className="checkout-item">
                <span>{item.name} x{item.quantity}</span>
                <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Total:</span>
            <span className="cart-total">R$ {total.toFixed(2)}</span>
          </div>
        </div>
        <div className="checkout-payment">
          <h3 className="checkout-subtitle">Forma de Pagamento</h3>
          <div className="payment-options">
            <label className={`payment-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              Cartão de Crédito
            </label>
            <label className={`payment-option ${paymentMethod === 'pix' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="pix"
                checked={paymentMethod === 'pix'}
                onChange={() => setPaymentMethod('pix')}
              />
              Pix
            </label>
            <label className={`payment-option ${paymentMethod === 'boleto' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="boleto"
                checked={paymentMethod === 'boleto'}
                onChange={() => setPaymentMethod('boleto')}
              />
              Boleto Bancário
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="card-form-preview-wrapper">
              <div className="card-form">
                <div className="form-group">
                  <label>Número do Cartão</label>
                  <input
                    type="text"
                    maxLength={16}
                    value={cardData.number}
                    onChange={e => setCardData({ ...cardData, number: e.target.value.replace(/\D/g, '') })}
                    placeholder="Somente números"
                  />
                </div>
                <div className="form-group">
                  <label>Nome impresso no Cartão</label>
                  <input
                    type="text"
                    value={cardData.name}
                    onChange={e => setCardData({ ...cardData, name: e.target.value })}
                    placeholder="Nome completo"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Validade</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={cardData.expiry}
                      onChange={e => setCardData({ ...cardData, expiry: e.target.value.replace(/[^0-9\/]/g, '') })}
                      placeholder="MM/AA"
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      maxLength={3}
                      value={cardData.cvv}
                      onChange={e => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                      placeholder="CVV"
                    />
                  </div>
                </div>
              </div>
              <CreditCardPreview
                number={cardData.number}
                name={cardData.name}
                expiry={cardData.expiry}
                cvc={cardData.cvv}
              />
            </div>
          )}
          {paymentMethod === 'pix' && (
            <div className="payment-info">Chave Pix será exibida após finalizar a compra.</div>
          )}
          {paymentMethod === 'boleto' && (
            <div className="payment-info">O boleto será gerado após finalizar a compra.</div>
          )}
        </div>
      </div>

      <div className="checkout-actions">
        <button 
          className="cart-continue" 
          style={{marginLeft: 0}}
          disabled={!canFinish}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
} 