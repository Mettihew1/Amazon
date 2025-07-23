import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Set axios defaults once in your app
axios.defaults.withCredentials = true;

export default function SingleProduct() {
  const [product, setProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { id } = useParams();

  const [rating, setRating] = useState(0);
const [comment, setComment] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/auth/check`, 
          { withCredentials: true }
        );
        setIsLoggedIn(response.data.authenticated);
      } catch (err) {
        setIsLoggedIn(false);
        console.error("Auth check failed:", err.response?.data);
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
      { productId, rating, comment },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    alert('Review submitted!');
    setRating(0);  // Reset form
    setComment('');
  } catch (err) {
    alert(err.response?.data?.error || 'Review failed');
  }
};
  const addToCart = async (productId) => {
    try {
      if (isLoggedIn) {
        await axios.post(
          `${import.meta.env.VITE_URL}/cart/add`, 
          { productId },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          }
        );
        alert('Added to cart!');
      } else {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (!cart.includes(productId)) {
          localStorage.setItem('cart', JSON.stringify([...cart, productId]));
          alert('Added to guest cart!');
        } else {
          alert('Product already in cart');
        }
      }
    } catch (err) {
      console.error('Add to cart error:', err);
      if (err.response?.status === 401) {
        alert('Please login first!');
        window.location.href = '/login';
      } else {
        alert(err.response?.data?.message || 'Failed to add to cart');
      }
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <img src={product.images[0]} alt={product.name} width="399px" />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product._id)}>
        {isLoggedIn ? 'Add to Cart' : 'Add to Guest Cart'}
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