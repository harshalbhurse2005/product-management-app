import { useState, useEffect } from 'react';
import { getProducts, saveProducts } from '../utils/storage';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
    }
  };

  // Logic: Filter products based on what user types
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Product Dashboard</h1>

      {/* SEARCH BAR */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by name or category..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products match your search. <Link to="/add">Add a new one?</Link></p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;