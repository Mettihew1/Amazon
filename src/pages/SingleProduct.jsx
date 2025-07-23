import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

export default function SingleProduct() {
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/auth/check`);
        setIsLoggedIn(response.data.authenticated);
      } catch {
        setIsLoggedIn(false);
      }
    };

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/products/product?id=${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Product fetch error:', err);
      }
    };

    checkAuth();
    fetchProduct();
  }, [id]);

  const reviewHandler = async (productId, ev) => {
    ev.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_URL}/products/review`,
        { productId, rating, comment }
      );
      alert('Review submitted!');
      setRating(0);
      setComment('');
    } catch (err) {
      alert(err.response?.data?.error || 'Review failed');
    }
  };

  const addToCart = async (productId) => {
    if (!isLoggedIn) {
      alert('Please log in to add products to your cart.');
      return navigate('/login');
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_URL}/cart/add`,
        // change quantity later
        { productId, quantity: 1 }
      );
      alert('Added to cart!');
    } catch (err) {
      console.error('Add to cart error:', err);
      alert(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <img src={product.images[0]} alt={product.name} width="399px" />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>

      <button onClick={() => addToCart(product._id)}>
        Add to Cart
      </button>

      <p>Status: {isLoggedIn ? 'Logged In' : 'Not Logged In'}</p>

      <form onSubmit={(ev) => reviewHandler(product._id, ev)}>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          placeholder="Your review..."
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
