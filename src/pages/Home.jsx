import { useState, useEffect } from 'react';
import { getProducts, deleteProduct, addToCart } from '../utils/storage';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All'); // Filter state

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleDelete = (id) => {
    deleteProduct(id);
    setProducts(getProducts());
  };

  // Logic to Filter AND Search
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container">
      <h1>My Products</h1>
      
      <div className="search-container" style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
        <input 
          type="text" placeholder="Search products..." className="search-input"
          style={{flex: 2}}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        {/* Filter Dropdown */}
        <select 
          className="search-input" style={{flex: 1, minWidth: '150px'}}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Grocery">Grocery</option>
          <option value="Books">Books</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Price: <strong>₹{product.price}</strong></p>
            <p>Category: <span className="cart-badge" style={{position: 'static', background: 'var(--primary)'}}>{product.category}</span></p>
            
            <div className="card-buttons">       
              <button onClick={() => addToCart(product)} className="edit-btn" style={{background: '#10b981'}}>Add to Cart</button>
              <Link to={`/edit/${product.id}`} className="edit-btn" style={{background: '#333'}}>Edit</Link>
              <button onClick={() => handleDelete(product.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;