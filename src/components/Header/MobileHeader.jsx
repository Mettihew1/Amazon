import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, ShoppingCart, Person, AccountCircle } from '@mui/icons-material';
import { IconButton, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import { FiSearch } from "react-icons/fi";


export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const basketCount = useSelector(state => state.basket?.items?.length || 0);
  const user = useSelector(state => state.auth?.user);

  return (
   <div className='grid'>


    <div style={{
      // position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1100,
      padding: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white' // Added for better visibility
    }}>
      {/* Left side - Burger menu */}
      <IconButton 
        onClick={() => setIsMenuOpen(true)}
        sx={{ color: 'black' }}
      >
        <Menu />
      </IconButton>

      {/* Center - Logo */}
      <Link to="/" style={{ 
        textDecoration: 'none', 
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1.5rem'
      }}>
        eesy
      </Link>

      {/* Right side - Icons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {/* User icon */}
        <IconButton 
          component={Link}
          to={user ? '/profile' : '/login'}
          sx={{ color: 'black' }}
        >
          {user ? (
            <AccountCircle sx={{ color: 'green', fontSize: 30 }} />
          ) : (
            <Person sx={{ color: 'gray', fontSize: 30 }} />
          )}
        </IconButton>

        {/* Cart icon */}
        <IconButton 
          component={Link}
          to="/cart"
          sx={{ color: 'black' }}
        >
          <Badge badgeContent={basketCount || null} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </div>

      {/* Burger menu drawer */}
      <BurgerMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </div>


       {/* LINE TWO / SEARCH BAR  */}
   <input />
   <button>
    <FiSearch />
   </button>
   </div>

  );
}