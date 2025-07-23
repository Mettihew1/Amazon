import React, { useState, useEffect } from 'react';
import { FiSearch, FiUser, FiShoppingCart, FiMenu } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate  = useNavigate()

  useEffect(() => {
    // const cart = JSON.parse(localStorage.getItem('cart') || []);
    const cart = []
    setCartCount(cart.length);
    // const token = localStorage.getItem('token');
    const token = ''
    setIsLoggedIn(!!token);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
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

          <button className="menu-button">
            <FiMenu size={20} />
          </button>
          <p>Eesy</p>

          </div>

          
          
          <div className="user-actions">
            {isLoggedIn ? (
              <button className="user-button">
                <span>Account</span>
                <IoIosArrowDown size={14} />
              </button>
            ) : (
              <button className="login-button">Sign In</button>
            )}
            
            {/* Moved search toggle here to be inline with cart */}
           
            
            <button className="cart-button">
              <FiShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>


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
              <button type="submit" className="search-button">Search</button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Category Navigation */}
      <nav className="category-nav">
        <div className="container">
          <ul>
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