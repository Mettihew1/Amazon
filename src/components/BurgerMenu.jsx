
import { useState } from "react";
import "./BurgerMenu.css"; 

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="burger-menu-wrapper">
      {/* Burger Button */}
      <button 
        className={`burger-btn ${isOpen ? "open" : ""}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      {/* Menu Content */}
      <div className={`menu-content ${isOpen ? "show" : ""}`}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>
    </div>
  );
};

export default BurgerMenu;
