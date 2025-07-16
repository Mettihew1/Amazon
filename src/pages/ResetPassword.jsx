import { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/reset-password', { token, password });
      setMessage('Password updated! Redirecting...');
      setTimeout(() => navigate('/auth'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Reset Password</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="password"
        placeholder="New Password"
        required
        minLength="8"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}