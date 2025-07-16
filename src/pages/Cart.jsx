import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
  const [products, setProducts] = useState(undefined); // undefined = loading
  const [cartIds, setCartIds] = useState([]); // Track cart IDs separately

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartIds(ids);
    
    async function fetchCartItems() {
      try {
        if (ids.length === 0) {
          setProducts([]); // Explicitly set empty array if no IDs
          return;
        }

        const response = await axios.post(`${import.meta.env.VITE_URL}/cart`, { 
          cId: ids 
        });
        
        // Handle both null and empty array responses
        setProducts(response.data || []); 
        
      } catch (error) {
        console.error("Error:", error);
        setProducts([]); // Fallback to empty array on error
      }
    }
    
    fetchCartItems();
  }, []);

  if (products === undefined) return <p>Loading...</p>;
  if (cartIds.length === 0) return <p>Your cart is empty</p>;
  if (products.length === 0) return <p>Products no longer available</p>;

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <a href={`/product/${product.name}/${product._id}`}>
          <img src={product.images[0]} alt={product.name} width="99px" />
          </a>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}