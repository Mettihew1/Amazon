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
  

  const productMap = products?.map((ev) => (
      <div key={ev._id} style={{ padding: "40px" }}>

        <a
          href={`/products/${encodeURIComponent(ev.name)}/${ev._id}?source=featured`}>
          <img src={ev.images[0].url} alt={ev.images.alt} width={"100px"} />
        </a>

        <p>{ev.name}</p>
      </div>
  )
);

  return <div>
        <h1>Home</h1>

    {productMap}


             <div style={{ display:'flex', overflow:'scroll'}}>
        <img src="/images/shoes/shoe1.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe1.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe1.jpg" width={"100px"}/>
         <img src="/images/shoes/shoe1.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe1.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe1.jpg" width={"100px"}/>
        </div>
        <img src="https://m.media-amazon.com/images/I/71a2BsiBrVL._AC_UL480_QL65_.jpg" width={"300px"}/>

             <div style={{ display:'flex', overflow:'scroll'}}>
        <img src="/images/shoes/shoe2.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe2.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe2.jpg" width={"100px"}/>
         <img src="/images/shoes/shoe2.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe2.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe2.jpg" width={"100px"}/>
        </div>
        <img src="https://m.media-amazon.com/images/I/61mqUGLXB3L._AC_UL480_QL65_.jpg" width={"300px"}/>

        <div style={{ display:'flex', overflow:'scroll'}}>
        <img src="/images/shoes/shoe3.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe3.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe3.jpg" width={"100px"}/>
         <img src="/images/shoes/shoe3.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe3.jpg" width={"100px"}/>
        <img src="/images/shoes/shoe3.jpg" width={"100px"}/>
        </div>
        <img src="https://m.media-amazon.com/images/I/51t1G+upZML._AC_UL480_QL65_.jpg" width={"300px"}/>


  </div>;
}
