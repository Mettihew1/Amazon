import BurgerMenu from "./BurgerMenu";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import axios from 'axios'

export default function Header() {
  const [user, setUser] = useState([])

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

   useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/auth/check`, { withCredentials: true })
      .then(res => {
        setUser(res.data.user)
      })
      .catch(console.log);
  }, []);


  return (
    <div style={{ display: "flex" }}>
      <BurgerMenu />
      <SearchBar />
      <a href="/" style={{color: 'green'}}>Phone </a>
      <a href="/test" >test </a>
      <a href="/products" style={{color:'yellow'}}>products </a>
       {user ? 
       <a href="/dashboard" style={{color: 'purple', padding:'0px 10px'}}>{user.username}</a>
        : 
       <a href="/login" style={{padding:'0px 10px'}}>Login</a>
        } 
      <a href="/cart" style={{color:'white'}}>{cart && cart.length}</a>
    </div>
  );
}
