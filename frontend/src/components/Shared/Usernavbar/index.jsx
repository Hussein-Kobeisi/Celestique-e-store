import { Diamond, Bell, User } from "lucide-react";
import { useState } from "react";
import './index.css';
import { useNavigate } from "react-router-dom";

const Navbar = ({ activeLink }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="celestique-header">
      <div className="celestique-header-content">
        <a href="#" className="celestique-logo">
          <Diamond className="celestique-logo-icon" />
          <h1 className="celestique-logo-text">
            CELESTIQUE
          </h1>
        </a>

        <nav className="celestique-nav">
          <a 
            href="#" 
            className={`celestique-nav-link ${
              activeLink === 'Products' ? 'active' : ''
            }`}
          >
            Products
          </a>
          <a 
            href="#" 
            className={`celestique-nav-link ${
              activeLink === 'Cart' ? 'active' : ''
            }`}
          >
            Cart
          </a>
        </nav>

        <div className="celestique-user-actions">

          <button className="celestique-icon-btn">
            <Bell />
          </button>
          
          <button  onClick={() => navigate('/profile')} className="celestique-icon-btn">
            <User />
          </button>

          <button 
            className="celestique-mobile-toggle"
            onClick={toggleMobileMenu}
          >
            <div className="celestique-mobile-toggle-line"></div>
            <div className="celestique-mobile-toggle-line"></div>
            <div className="celestique-mobile-toggle-line"></div>
          </button>
        </div>
      </div>

      <nav className={`celestique-mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="celestique-mobile-nav-content">
          <a 
            href="#" 
            className={`celestique-mobile-nav-link ${
              activeLink === 'Products' ? 'active' : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </a>
          <a 
            href="#" 
            className={`celestique-mobile-nav-link ${
              activeLink === 'Cart' ? 'active' : ''
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Cart
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;