import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `auth/${mode}`;
      const data = mode === 'login' ? formData : 
                  mode === 'register' ? formData : 
                  { email: formData.email };
      
      const res = await axios.post(`${import.meta.env.VITE_URL}/${url}`, data, { withCredentials: true });
      
      if (mode === 'login') {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h1>{mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : 'Reset Password'}</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />

        {mode !== 'forgot' && (
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        )}

        {mode === 'register' && (
          <input
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? '...' : mode === 'login' ? 'Login' : mode === 'register' ? 'Register' : 'Reset'}
        </button>
      </form>

      <div className="auth-links">
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </div>
    </div>
  );
}