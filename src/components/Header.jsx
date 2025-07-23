import  { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiShoppingCart, FiMenu } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import axios from 'axios'

const Header = () => {
  const [user, setUser] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const navigate  = useNavigate()
const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL}/auth/check`, {
        withCredentials: true
      });
      setUser(response.data.user)
      setIsLoggedIn(response.data.authenticated);
    } catch (err) {
      console.error("Auth check failed:", err.response?.data || err.message);
      setIsLoggedIn(false);
    }
  };
  
  checkAuth(); 
  
  const cart = []
  setCartCount(cart.length);
}, []);

  const handleSearch = (e) => {
    e.preventDefault();
      if (searchQuery.trim()) {
      setShowMobileSearch(false)
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="temu-header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">

          <div style={{display: 'flex'}}>

            <button 
  className="menu-button"
  onClick={() => setShowCategories(!showCategories)}
>
  <FiMenu size={20} />
</button>

          {/* <button className="menu-button"> */}
            {/* <FiMenu size={20} /> */}
          {/* </button> */}
          <a href='/'>Eesy</a>

          </div>

          
          
          <div className="user-actions">
            {isLoggedIn ? (
              <button className="user-button">
                <a href='/login'>{user.username}</a>
                <IoIosArrowDown size={14} />
              </button>
            ) : (
              <a href='/login' className="login-button">Sign In</a>
            )}
            
            {/* Moved search toggle here to be inline with cart */}
           
            
            {/* <button className="cart-button"> */}
              <a href='/cart'>
              <FiShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </a>
            {/* </button> */}


             <button 
              className="mobile-search-toggle"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <FiSearch size={20} />
            </button>

          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className={`search-bar ${showMobileSearch ? 'mobile-visible' : ''}`}>
        <div className="container">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* <button type="submit" className="search-button">Search</button> */}


  <div>
    <button onClick={() => setIsOpen(!isOpen)}>All categories 
   <FiChevronDown className="text-sm" />
    </button>
    {isOpen && (
      <div className="absolute top-full left-0 bg-white shadow-lg">
        <div className="p-2 hover:bg-gray-100">Option 1</div>
        <div className="p-2 hover:bg-gray-100">Option 2</div>
      </div>
    )}
  </div>





            </div>
          </form>
        </div>
      </div>




      
      
      {/* Category Navigation */}
      {/* <nav className="category-nav"> */}
        <nav className={`category-nav ${showCategories ? 'mobile-visible' : ''}`}>
        <div className="container">
          <ul>

            <li><a href="/test">test</a></li>
            <li><a href="/products">products</a></li>
            <li><a href="/cart">cart</a></li>
            <li><a href="/">home</a></li>


            <li><a href="#">Women's Fashion</a></li>
            <li><a href="#">Men's Fashion</a></li>
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Home & Garden</a></li>
            <li><a href="#">Beauty</a></li>
            <li><a href="#">Toys</a></li>
          </ul>
        </div>
      </nav>

    </header>
  );
};

export default Header;