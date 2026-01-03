import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCart } from '../utils/storage';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  // Jab bhi page change ho (location change), cart ka count update karein
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
        <Link to="/">Home</Link>
        
        {/* Naya Weather Link yahan hai */}
        <Link to="/weather" style={{ color: '#bb86fc', fontWeight: 'bold' }}>
          ☁️ Weather
        </Link>
        
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