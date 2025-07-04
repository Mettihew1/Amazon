import axios from 'axios';
import './Home.css';
import Product from '../Product/Product';
import { useState, useEffect } from 'react';
import Banner from './Banner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function Home() {
  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/prod`);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


 

   const map = products.map(ev => {
     return (
    <Product
            id={ev._id}
            key={ev._id}
            // title={ev.description}
            price={19.99}
            image={ev.images[0]}
            // rating={ev.rating}
            rating={4}
          />
  )})
  


  return (
    <div className="home">

      {/* BANNER  */}
      <Banner />

<div> 
<h1>Transform any room</h1>
<p>These fresh finds can reinvent every corner of your home.</p>
<a href='/' >Shopping home decor</a>
</div>

       <div className='d-flex p-2 overflow-scroll'>
        {products.map(ev => {
     return (
      <div className='p-2' key={ev._id}>
      <img src={ev.images[0]} alt='off' className='off_image'/>
      </div>)}
  )})
      </div>



  <div className='some_images'>
        <img src='https://dkstatics-public.digikala.com/digikala-adservice-banners/e83ce25c466538b1aa8792551f93a80e37d16d22_1747985318.jpg?x-oss-process=image/quality,q_95/format,webp' alt='im1' width={"50%"}/>
        <img src='https://dkstatics-public.digikala.com/digikala-adservice-banners/51bf6c3bf9b01e10314838efc96cef51810e08f1_1747820855.jpg?x-oss-process=image/quality,q_95/format,webp' alt='im2' width={"50%"}/>
        <img src='https://dkstatics-public.digikala.com/digikala-adservice-banners/38ca84c40de526a55cbc4130a5a15f4e44b0544f_1748076441.jpg?x-oss-process=image/quality,q_95/format,webp' alt='im3' width={"50%"} />
        <img src='https://dkstatics-public.digikala.com/digikala-adservice-banners/1b7fb90b507d7ca4b1efc5ddbfbdd399479db715_1748336434.jpg?x-oss-process=image/quality,q_95/format,webp' alt='im4' width={"50%"} />
      </div>


<div className='some_images2 overflow-scroll'>
      <img src='https://dkstatics-public.digikala.com/digikala-mega-menu/d825f64f509cd5067a9022528c465e8ca705f60d_1740299511.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80' alt='some_images2' width={"100px"} />
      <img src='https://dkstatics-public.digikala.com/digikala-mega-menu/d825f64f509cd5067a9022528c465e8ca705f60d_1740299511.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80' alt='some_images2' width={"100px"} />
      <img src='https://dkstatics-public.digikala.com/digikala-mega-menu/d825f64f509cd5067a9022528c465e8ca705f60d_1740299511.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80' alt='some_images2' width={"100px"} />
      <img src='https://dkstatics-public.digikala.com/digikala-mega-menu/d825f64f509cd5067a9022528c465e8ca705f60d_1740299511.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80' alt='some_images2' width={"100px"} />
      <img src='https://dkstatics-public.digikala.com/digikala-mega-menu/d825f64f509cd5067a9022528c465e8ca705f60d_1740299511.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80' alt='some_images2' width={"100px"} />
</div>

<div className='some_images2 py-3 overflow-scroll'>
      <img src='https://dkstatics-public.digikala.com/digikala-mega-menu/d825f64f509cd5067a9022528c465e8ca705f60d_1740299511.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80' alt='some_images2' width={"100px"} />
      <img src='https://dkstatics-public.digikala.com/digikala-mega-menu/d825f64f509cd5067a9022528c465e8ca705f60d_1740299511.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80' alt='some_images2' width={"100px"} />
      <img src='https://dkstatics-public.digikala.com/digikala-mega-menu/d825f64f509cd5067a9022528c465e8ca705f60d_1740299511.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80' alt='some_images2' width={"100px"} />
      <img src='https://dkstatics-public.digikala.com/digikala-mega-menu/d825f64f509cd5067a9022528c465e8ca705f60d_1740299511.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80' alt='some_images2' width={"100px"} />
      <img src='https://dkstatics-public.digikala.com/digikala-mega-menu/d825f64f509cd5067a9022528c465e8ca705f60d_1740299511.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80' alt='some_images2' width={"100px"} />
</div>

{products.length > 0 &&
<>
      <h5 className='mt-4 mb-0'>The Best Product in Huawai</h5>
      <div className='home__row overflow-scroll'>
        {map}
      </div>

       <h5 className='mt-4 mb-0 overflow-scroll'>The Best ones in New Zeland</h5>
      <div className='home__row'>
        {map}
      </div>
</>
}


    </div>
  );
}

export default Home;