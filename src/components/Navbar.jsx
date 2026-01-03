import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCart } from '../utils/storage';

const Navbar = ({ toggleTheme, theme }) => {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(totalItems);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">🚀 ProductAdmin</Link>
      </div>
      
      <div className="nav-links">
        {/* THEME TOGGLE BUTTON */}
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>

        <Link to="/">Home</Link>
        <Link to="/weather">☁️ Weather</Link>
        <Link to="/add">Add Product</Link>
        <Link to="/cart" className="nav-cart">
          🛒 Cart 
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;