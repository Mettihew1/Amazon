import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_URL}/auth/logout`, { 
          withCredentials: true 
        });
      } finally {
        navigate('/login');
      }
    };
    
    logout();
  }, [navigate]);

  return <div>Logging out...</div>;
}