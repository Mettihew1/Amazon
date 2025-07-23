import React, { useState } from 'react';
import { FaSearch, FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';
import './Test.css'; // Create this CSS file for styling

const Test = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="header__logo">

           {/* Mobile menu toggle */}
        <button 
          className="header__mobile-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars />
        </button>
          <a href="/">Eesy</a>

        </div>

        {/* Search bar - hidden on mobile in this example */}
        <div className={`header__search ${isMobileMenuOpen ? 'mobile-visible' : ''}`}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="header__search-button">
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Navigation links - hidden on mobile in this example */}
        <nav className={`header__nav ${isMobileMenuOpen ? 'mobile-visible' : ''}`}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/deals">Deals</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>

        {/* User actions */}
        <div className="header__actions">
          <div className="header__action">
            <a href="/login">
              <FaUser />
              <span>Login</span>
            </a>
          </div>
          <div className="header__action">
            <a href="/cart">
              <FaShoppingCart />
              <span>Cart (0)</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Test;