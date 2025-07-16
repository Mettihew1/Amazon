import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/validate-auth`, { 
      withCredentials: true 
    })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}