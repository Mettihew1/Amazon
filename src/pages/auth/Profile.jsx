import { useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_URL}/auth/profile`, formData, {
        withCredentials: true
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="profile">
      <h1>Account Settings</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Shipping Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit">Save Changes</button>
        {message && <p className="message">{message}</p>}
      </form>

      <div className="account-actions">
        <button className="change-password">
          Change Password
        </button>
        <button className="delete-account">
          Delete Account
        </button>
      </div>
    </div>
  );
}