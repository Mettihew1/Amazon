import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function test() {
      const products = await axios.get(`${import.meta.env.VITE_URL}/products/featured`);
      setProducts(products.data);
    }
    test();
  }, []);

  console.log(products);
  

  const productMap = products?.map((ev) => {
    return (
      <div key={ev._id} style={{ padding: "40px" }}>
        <h1>Home</h1>
        <a
          href={`/products/${encodeURIComponent(ev.name)}/${
            ev._id
          }?source=featured`}
        >
          <img src={ev.images[0].url} alt={ev.images.alt} width={"100px"} />
        </a>

        <p>{ev.name}</p>
      </div>
    );
  });

  return <div>{productMap}</div>;
}
