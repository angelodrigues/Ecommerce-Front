import { useEffect, useState } from 'react';
import './user.css';
import { getAuthToken } from '../../authCheck/tokenUtils';

export default function User() {
  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editedAddress, setEditedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const token = getAuthToken();

  useEffect(() => {
    if (!token) return;

    fetch('http://52.67.254.235:8090/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : Promise.reject('Erro ao buscar perfil'))
      .then(data => {
        setUserData(data);
        setEditedData(data);
      })
      .catch(err => console.error(err));

    fetch('http://52.67.254.235:8090/user/addresses', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : Promise.reject('Erro ao buscar endereços'))
      .then(data => {
        setAddresses(data);
        const defaultAddr = data.find(a => a.defaultAddress) || data[0];
        setSelectedAddressId(defaultAddr?.id || null);
        setEditedAddress(defaultAddr || {});
      })
      .catch(err => console.error(err));
  }, [token]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const resProfile = await fetch('http://52.67.254.235:8090/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedData),
      });
      const updatedProfile = await resProfile.json();
      setUserData(updatedProfile);
      setEditedData(updatedProfile);

      if (editedAddress?.id) {
        await fetch(`http://52.67.254.235:8090/user/addresses/${editedAddress.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedAddress),
        });
      } else {
        await fetch(`http://52.67.254.235:8090/user/addresses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedAddress),
        });
      }

      if (editedAddress?.defaultAddress) {
        await fetch(`http://52.67.254.235:8090/user/profile/default-address/${editedAddress.id}`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const resAddr = await fetch('http://52.67.254.235:8090/user/addresses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const freshAddresses = await resAddr.json();
      setAddresses(freshAddresses);
      const freshDefault = freshAddresses.find(a => a.defaultAddress) || freshAddresses[0];
      setSelectedAddressId(freshDefault.id);
      setEditedAddress(freshDefault);
      setIsEditing(false);

    } catch (err) {
      console.error('Erro ao salvar dados:', err);
    }
  };

  if (!userData) return <div className="text-white p-4">Carregando perfil...</div>;

  return (
    <div className="user-section">
      <div className="user-card">
        <div className="user-header">
          <h2 className="text-4xl text-white font-inter capitalize p-4">My Profile</h2>
          <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
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
                  onChange={handleProfileChange}
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
                  onChange={handleProfileChange}
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
                  onChange={handleProfileChange}
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
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Phone</label>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="section-title">Address Information</h3>
            {addresses.length > 0 && (
            <div className="select-wrapper">
            <label htmlFor="address-select" className="select-label-text">Select address: </label>
            <select
              id="address-select"
              className="select-input"
              value={selectedAddressId || ''}
              onChange={(e) => {
                const selected = addresses.find(a => a.id === parseInt(e.target.value));
                setSelectedAddressId(selected.id);
                setEditedAddress(selected);
              }}
              disabled={!isEditing}
            >
              {addresses.map(a => (
                <option key={a.id} value={a.id}>
                  {a.street}, {a.number} {a.defaultAddress ? '(Padrão)' : ''}
                </option>
              ))}
            </select>
          </div>
            )}

            <div className="form-grid">
              <div className="floating-label">
                <input
                  type="text"
                  name="street"
                  value={editedAddress?.street || ''}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Street</label>
              </div>
              <div className="floating-label half">
                <input
                  type="text"
                  name="number"
                  value={editedAddress?.number || ''}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Number</label>
              </div>
              <div className="floating-label half">
                <input
                  type="text"
                  name="complement"
                  value={editedAddress?.complement || ''}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Complement</label>
              </div>
              <div className="floating-label">
                <input
                  type="text"
                  name="neighborhood"
                  value={editedAddress?.neighborhood || ''}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>Neighborhood</label>
              </div>
              <div className="floating-label half">
                <input
                  type="text"
                  name="city"
                  value={editedAddress?.city || ''}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>City</label>
              </div>
              <div className="floating-label quarter">
                <input
                  type="text"
                  name="state"
                  value={editedAddress?.state || ''}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>State</label>
              </div>
              <div className="floating-label quarter">
                <input
                  type="text"
                  name="zipCode"
                  value={editedAddress?.zipCode || ''}
                  onChange={handleAddressChange}
                  disabled={!isEditing}
                  placeholder=" "
                />
                <label>ZIP Code</label>
              </div>
            </div>

            {isEditing && (
              <div className="form-group switch-group">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={editedAddress?.defaultAddress || false}
                    onChange={(e) => setEditedAddress(prev => ({ ...prev, defaultAddress: e.target.checked }))}
                  />
                  <span className="slider round"></span>
                </label>
                <label className="switch-label">Definir como endereço padrão</label>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="save-section">
              <button className="save-button" onClick={handleSave}>Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
