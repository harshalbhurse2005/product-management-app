import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';
import Weather from './pages/Weather';
import './App.css';

function App() {
  // 1. Check if theme exists in localStorage, otherwise default to 'dark'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // 2. Function to toggle between dark and light
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save choice for next visit
  };

  return (
    /* 3. Wrap everything in a div that changes class based on theme */
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'} style={{ minHeight: '100vh' }}>
      
      {/* 4. Pass theme and toggle function to Navbar */}
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;