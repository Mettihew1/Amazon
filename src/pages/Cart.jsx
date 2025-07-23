// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const [products, setProducts] = useState(undefined);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchCartItems() {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_URL}/cart`,
//           { withCredentials: true } // Send cookies (auth token)
//         );

//         setProducts(response.data || []);
//       } catch (error) {
//         console.error("Error fetching cart:", error);

//         if (error.response?.status === 401) {
//           // Not logged in or token invalid
//           navigate("/login");
//         } else {
//           setProducts([]);
//         }
//       }
//     }

//     fetchCartItems();
//   }, [navigate]);

//   if (products === undefined) return <p>Loading...</p>;
//   if (products.length === 0) return <p>Your cart is empty</p>;

//   return (
//     <div>
//       {products.map((product) => (
//         <div key={product._id}>
//           <a href={`/product/${product.name}/${product._id}`}>
//             <img src={product.images?.[0]?.url} alt={product.name} width="99px" />
//           </a>
//           <h2>{product.name}</h2>
//           <p>Price: ${product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCartItems() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/cart`,
          { withCredentials: true }
        );
        setProducts(response.data || []);
        console.log(response.data)
        
      } catch (error) {
        console.error("Error fetching cart:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          setProducts([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCartItems();
  }, [navigate]);

  console.log(products, 'here000000000000-');
  

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await axios.patch(
        `${import.meta.env.VITE_URL}/cart/${productId}`,
        { quantity: newQuantity },
        { withCredentials: true }
      );
      setProducts(products.map(p => 
        p._id === productId ? { ...p, quantity: newQuantity } : p
      ));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_URL}/cart/${productId}`,
        { withCredentials: true }
      );
      setProducts(products.filter(p => p._id !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + (product.price * (product.quantity || 1)),
      0
    ).toFixed(2);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!products || products.length === 0) return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Browse our products and find something you like!</p>
        <button 
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow divide-y">
            {products.map((product) => (
              <div key={product._id} className="p-4 flex flex-col sm:flex-row gap-4">
                <a 
                  href={`/product/${product.name}/${product._id}`}
                  className="flex-shrink-0"
                >
                  <img 
                    src={product.images?.[0]?.url || "/placeholder-product.jpg"} 
                    alt={product.name} 
                    className="w-32 h-32 object-contain rounded border"
                  />
                </a>
                
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <a 
                      href={`/product/${product.name}/${product._id}`}
                      className="text-lg font-medium hover:text-blue-600 line-clamp-2"
                    >
                      {product.name}
                    </a>
                    <button 
                      onClick={() => removeItem(product._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                  
                  <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
                  
                  <div className="flex items-center mt-4">
                    <span className="mr-4">Quantity:</span>
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => updateQuantity(product._id, (product.quantity || 1) - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                        disabled={(product.quantity || 1) <= 1}
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="px-4">{product.quantity || 1}</span>
                      <button 
                        onClick={() => updateQuantity(product._id, (product.quantity || 1) + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({products.length} items)</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
            
            <button
              className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-md font-medium transition-colors"
            >
              Proceed to Checkout
            </button>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              You won't be charged until the next step
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}