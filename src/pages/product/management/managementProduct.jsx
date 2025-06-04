import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useDropzone } from 'react-dropzone';
import './managementProduct.css';

// Mock suppliers (replace with API fetch later)
const mockSuppliers = [
  { id: 1, name: 'Supplier A' },
  { id: 2, name: 'Supplier B' },
  { id: 3, name: 'Supplier C' },
];

// Mocked stock data for demonstration
const mockedStocks = [
  { location: 'Warehouse A', productName: 'Product X', quantity: 100, minimumQuantity: 10 },
  { location: 'Warehouse B', productName: 'Product Y', quantity: 50, minimumQuantity: 5 }
];

function SupplierModal({ open, onClose, onAddSupplier }) {
  const [supplier, setSupplier] = useState({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSupplier(supplier);
    setSupplier({ name: '', cnpj: '', email: '', phone: '', address: '' });
    onClose();
  };

  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="management-subtitle">New Supplier</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Name</label><input type="text" name="name" value={supplier.name} onChange={handleChange} required /></div>
          <div className="form-group"><label>CNPJ</label><input type="text" name="cnpj" value={supplier.cnpj} onChange={handleChange} required maxLength={18} placeholder="00.000.000/0000-00" /></div>
          <div className="form-group"><label>Email</label><input type="email" name="email" value={supplier.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>Phone</label><input type="text" name="phone" value={supplier.phone} onChange={handleChange} required placeholder="(99) 99999-9999" /></div>
          <div className="form-group"><label>Address</label><input type="text" name="address" value={supplier.address} onChange={handleChange} required /></div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" className="btn-fornecedor" style={{ background: '#666' }} onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-fornecedor">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StockModal({ open, onClose, onAddStock, productName }) {
  const [stock, setStock] = useState({
    productName: productName || '',
    quantity: '',
    minimumQuantity: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStock(stock);
    setStock({ productName: productName || '', quantity: '', minimumQuantity: '', location: '' });
    onClose();
  };

  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="management-subtitle">Stock Management</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Product Name</label><input type="text" name="productName" value={stock.productName} onChange={handleChange} required /></div>
          <div className="form-group"><label>Quantity</label><input type="number" name="quantity" value={stock.quantity} onChange={handleChange} required min={0} /></div>
          <div className="form-group"><label>Minimum Quantity</label><input type="number" name="minimumQuantity" value={stock.minimumQuantity} onChange={handleChange} required min={0} /></div>
          <div className="form-group"><label>Location</label><input type="text" name="location" value={stock.location} onChange={handleChange} required /></div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" className="btn-fornecedor" style={{ background: '#666' }} onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-fornecedor">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ManagementProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    supplierId: ''
  });
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [stockData, setStockData] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement registration logic, including imageFile upload
    console.log('Product data:', product, imageFile);
  };

  const handleAddSupplier = (newSupplier) => {
    setSuppliers(prev => [...prev, { ...newSupplier, id: prev.length + 1 }]);
  };

  const handleAddStock = (newStock) => {
    setStockData(newStock);
  };

  return (
    <div className="user-section">
      <div className="user-card">
        <div className="user-header">
          <h2 className="text-4xl text-white font-inter capitalize p-4">Product Management</h2>
        </div>
        <div className="user-content">
          <div className="profile-section">
            <h3 className="section-title">Register New Product</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Supplier</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <select
                    className="custom-combobox"
                    name="supplierId"
                    value={product.supplierId}
                    onChange={handleChange}
                    required
                    style={{ flex: 1 }}
                  >
                    <option value="">Select a supplier</option>
                    {suppliers.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn-fornecedor"
                    style={{ flex: 1 }}
                    onClick={() => setModalOpen(true)}
                  >
                    + Supplier
                  </button>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%' }}
                  />
                </div>
                <div className="form-group" style={{ flex: 1, marginLeft: 8 }}>
                  <label>Price</label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: '#dc7e27', marginRight: 4 }}>$</span>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      required
                      step="0.01"
                      min="0"
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="styled-textarea"
                />
              </div>
              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Stock</label>
                  <select
                    className="custom-combobox"
                    value={stockData ? stockData.location : ''}
                    disabled={false}
                    style={{ width: '100%' }}
                  >
                    <option value="">Select a stock</option>
                    {mockedStocks.map((s, idx) => (
                      <option key={idx} value={s.location}>
                        {s.location} - {s.productName} (Qty: {s.quantity})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end', marginLeft: 8 }}>
                  <button
                    type="button"
                    className="btn-fornecedor"
                    onClick={() => setStockModalOpen(true)}
                    style={{ width: '100%' }}
                  >
                    + Stock
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Product Image</label>
                <div {...getRootProps()} className="dropzone" style={{
                  border: '2px dashed #dc7e27',
                  borderRadius: 8,
                  padding: 16,
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.03)',
                  color: '#fff',
                  cursor: 'pointer',
                  marginBottom: 12
                }}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the image here ...</p>
                  ) : (
                    <p>Drag an image or click to select</p>
                  )}
                  {imagePreview && (
                    <div style={{ marginTop: 12 }}>
                      <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 180, borderRadius: 8, boxShadow: '0 2px 8px #0006' }} />
                    </div>
                  )}
                </div>
              </div>
              <button type="submit" className="btn-fornecedor" style={{ marginTop: 24 }}>
                Register Product
              </button>
            </form>
          </div>
        </div>
      </div>
      <SupplierModal open={modalOpen} onClose={() => setModalOpen(false)} onAddSupplier={handleAddSupplier} />
      <StockModal open={stockModalOpen} onClose={() => setStockModalOpen(false)} onAddStock={handleAddStock} productName={product.name} />
    </div>
  );
}