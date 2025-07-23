import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState(undefined);
  const [cartIds, setCartIds] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication by verifying cookie exists
    const checkAuth = () => {
      // This checks if any cookie exists (you might want to check for specific JWT cookie)
      const hasToken = document.cookie.includes("token"); // Replace "jwt" with your actual cookie name
      setIsAuthenticated(hasToken);
      
      if (!hasToken) {
        navigate("/login"); // Redirect to login if not authenticated
        return;
      }
    };

    checkAuth();

    async function fetchCartItems() {
      try {
        const ids = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartIds(ids);

        if (ids.length === 0) {
          setProducts([]);
          return;
        }

        // Make sure to include credentials for cookies
        const response = await axios.post(`${import.meta.env.VITE_URL}/cart`, 
          { cId: ids },
          { withCredentials: true } // 👈 This sends cookies with the request
        );
        
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error:", error);
        if (error.response?.status === 401) {
          // Token expired or invalid
          navigate("/login");
        }
        setProducts([]);
      }
    }

    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null; // Or loading spinner while redirecting
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