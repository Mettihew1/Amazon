import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Logout from './Logout'

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/orders`, {
          withCredentials: true
        });
        setOrders(res.data.slice(0, 5)); // Show last 5 orders
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Your Dashboard</h1>
      
      <section className="quick-actions">
        <Link to="/products" className="action-card">
          <h3>Continue Shopping</h3>
          <p>Browse our latest products</p>
        </Link>
        <Link to="/profile" className="action-card">
          <h3>Account Settings</h3>
          <p>Update your information</p>
        </Link>
      </section>

      <section className="recent-orders">
        <h2>Recent Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length > 0 ? (
          <ul>
            {orders.map(order => (
              <li key={order._id}>
                <Link to={`/orders/${order._id}`}>
                  #{order.orderNumber} - {order.status} - ${order.total}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders yet. <Link to="/products">Start shopping!</Link></p>
        )}
      </section>
    </div>
  );
}