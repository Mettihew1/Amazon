import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function test() {
      const products = await axios.get(`${import.meta.env.VITE_URL}/products`);
      setProducts(products.data);
    }
    test();
  }, []);

  const productMap = products?.results?.map((ev) => {
    return (
      <div key={ev._id} style={{ padding: "40px" }}>
        <a
          href={`/product/${encodeURIComponent(ev.name)}/${
            ev._id
          }?source=featured`}
        >
          <img src={ev.images[0]} alt="product" width={"100px"} />
        </a>

        <p>{ev.name}</p>
      </div>
    );
  });

  return <div>{productMap}</div>;
}
