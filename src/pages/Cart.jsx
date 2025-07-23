import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/cart`,
          { withCredentials: true } // Send cookies (auth token)
        );

        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching cart:", error);

        if (error.response?.status === 401) {
          // Not logged in or token invalid
          navigate("/login");
        } else {
          setProducts([]);
        }
      }
    }

    fetchCartItems();
  }, [navigate]);

  if (products === undefined) return <p>Loading...</p>;
  if (products.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <a href={`/product/${product.name}/${product._id}`}>
            <img src={product.images?.[0]?.url} alt={product.name} width="99px" />
          </a>
          <h2>{product.name}</h2>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}
