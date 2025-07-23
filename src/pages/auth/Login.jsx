import { useEffect, useState} from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [user, setUser] = useState()

 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/auth/check`);
        setUser(response.data);
      } catch {
        setUser(false);
      }
    }
    checkAuth();
  }, [])

const handleLogout = async (e) => {
await axios.get(`${import.meta.env.VITE_URL}/auth/logout`, {
  withCredentials: true,
});
}


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${import.meta.env.VITE_URL}/auth/login`, formData, {
      withCredentials: true,
    });

    // ✅ Immediately fetch user info after login
    const { data } = await axios.get(`${import.meta.env.VITE_URL}/auth/check`, {
      withCredentials: true,
    });

    console.log("Logged in user:", data.user); // optional
    alert('logged in, please refresh the page')

  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};

console.log(user, '-----');


  return (
    <div className="auth-container">
{user ? 
      <h1>Welcome, {user.user.username}</h1>
      :
      <h1>login</h1>
    }
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="auth-links">
        <Link to="/register">Register</Link>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
      <button style={{color:'red'}} onClick={handleLogout}> logout</button>
    </div>
  );
}