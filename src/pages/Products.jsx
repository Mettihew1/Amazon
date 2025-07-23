
import axios from "axios";
import { useEffect, useState } from "react";

export default function Products() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL}/products`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError(error.message);
      }
    };

    fetchProduct();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;
  
const map = product?.results?.map(ev => {
  return (
    <div key={ev._id} style={{width:'250px'}}>
      <p>{ev.name}</p>
      <a href={`/products/${ev.slug}/${ev._id}`}>
       <img src={ev.images[0].url} alt="product" width={"199px"} />
       </a>
      <h2>{ev.name}</h2>
      <p>Price: ${ev.price}</p>
      <p>{ev.description}</p>
    </div>
  )
})


  return (
    <div style={{display:'flex', flexWrap:'wrap'}}>
     {map}
    </div>
  );
}