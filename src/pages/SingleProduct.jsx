import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function SingleProduct() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/products/product?id=${id}`)
      .then(res => setProduct(res.data));
  }, [id]);

  const addToCart = async (productId) => {
    try {
      if (isLoggedIn) {
        await axios.post('/cart', { productId });
      } else {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (!cart.includes(productId)) {
          localStorage.setItem('cart', JSON.stringify([...cart, productId]));
        }
      }
      alert('Added to cart!');
    } catch {
      alert('Failed to add!');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <img src={product.images[0]} alt={product.name} width="399px" />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product._id)}>Add to Cart</button>
    </div>
  );
}