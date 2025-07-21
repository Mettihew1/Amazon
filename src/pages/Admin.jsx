import axios from "axios";
import { useEffect, useState } from "react";

export default function Admin() {
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

  const feautreHandler = (ev) => {
    axios.put(`${import.meta.env.VITE_URL}/admin/${ev}/featured`, { id: ev })
        .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Failed to update product:", error);
        setError(error.message);
      });
  };

  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Loading...</div>;

const map = product?.results?.map(ev => {
  return (
    <div key={ev._id} style={{ display:'flex', alignItems:'center'}}>
       <img src={ev.images[0]} alt="product" width={"99px"} />
      <p style={{maxWidth:'150px', padding:'5px'}}>{ev.name}</p>
      <p>Price: ${ev.price}</p>
     <button onClick={() => feautreHandler(ev._id)}> {ev.featured ? <p style={{color:'red'}}>Unfeature</p> : <p style={{color:'green'}}>featured</p> } </button>
    </div>
  )
})


  return (
    <div>
     {map}
    </div>
  );
}