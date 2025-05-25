import { useState } from 'react';
import './user.css';

export default function User() {
  const [userData, setUserData] = useState({
    firstName: 'Angelo',
    lastName: 'Silva',
    email: 'angelo@gmail.com',
    phone: '(85) 99999-9999',
    address: {
      street: 'Rua Example',
      number: '123',
      complement: 'Apto 101',
      neighborhood: 'Centro',
      city: 'Fortaleza',
      state: 'CE',
      zipCode: '60000-000'
    },
    orders: [
      {
        id: '1',
        date: '2024-03-20',
        status: 'Delivered',
        total: 'R$ 299,90'
      },
      {
        id: '2',
        date: '2024-03-15',
        status: 'Processing',
        total: 'R$ 159,90'
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEditedData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  return (
    <div className="user-section">
      <div className="user-card">
        <div className="user-header">
          <h2 className="text-4xl text-white font-inter capitalize p-4">My Profile</h2>
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="user-content">
          <div className="profile-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="floating-label half">
                <input
                  type="text"
                  name="firstName"
                  value={isEditing ? editedData.firstName : userData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>First Name</label>
              </div>
              <div className="floating-label half">
                <input
                  type="text"
                  name="lastName"
                  value={isEditing ? editedData.lastName : userData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Last Name</label>
              </div>
              <div className="floating-label">
                <input
                  type="email"
                  name="email"
                  value={isEditing ? editedData.email : userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Email</label>
              </div>
              <div className="floating-label">
                <input
                  type="tel"
                  name="phone"
                  value={isEditing ? editedData.phone : userData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Phone</label>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="section-title">Address Information</h3>
            <div className="form-grid">
              <div className="floating-label">
                <input
                  type="text"
                  name="address.street"
                  value={isEditing ? editedData.address.street : userData.address.street}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Street</label>
              </div>
              <div className="floating-label half">
                <input
                  type="text"
                  name="address.number"
                  value={isEditing ? editedData.address.number : userData.address.number}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Number</label>
              </div>
              <div className="floating-label half">
                <input
                  type="text"
                  name="address.complement"
                  value={isEditing ? editedData.address.complement : userData.address.complement}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Complement</label>
              </div>
              <div className="floating-label">
                <input
                  type="text"
                  name="address.neighborhood"
                  value={isEditing ? editedData.address.neighborhood : userData.address.neighborhood}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Neighborhood</label>
              </div>
              <div className="floating-label half">
                <input
                  type="text"
                  name="address.city"
                  value={isEditing ? editedData.address.city : userData.address.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>City</label>
              </div>
              <div className="floating-label quarter">
                <input
                  type="text"
                  name="address.state"
                  value={isEditing ? editedData.address.state : userData.address.state}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>State</label>
              </div>
              <div className="floating-label quarter">
                <input
                  type="text"
                  name="address.zipCode"
                  value={isEditing ? editedData.address.zipCode : userData.address.zipCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>ZIP Code</label>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="section-title">Recent Orders</h3>
            <div className="orders-list">
              {userData.orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <span className="order-id">Order #{order.id}</span>
                    <span className="order-date">{order.date}</span>
                    <span className="order-status">{order.status}</span>
                    <span className="order-total">{order.total}</span>
                  </div>
                  <button className="view-order-button">View Details</button>
                </div>
              ))}
            </div>
          </div>

          {isEditing && (
            <div className="save-section">
              <button className="save-button" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 