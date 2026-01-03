import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';
import Weather from './pages/Weather'; // Import Weather Page
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </>
  );
}

export default App;