import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveProduct } from '../utils/storage';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics'); // Default category
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { id: Date.now(), name, price, category };
    saveProduct(newProduct);
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <input 
          type="text" placeholder="Product Name" required 
          value={name} onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="number" placeholder="Price" required 
          value={price} onChange={(e) => setPrice(e.target.value)}
        />
        
        {/* Category Dropdown */}
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="search-input" /* Same styling as search */
          style={{marginBottom: '1rem'}}
        >
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Grocery">Grocery</option>
          <option value="Books">Books</option>
        </select>

        <button type="submit">Save Product</button>
      </form>
    </div>
  );
};

export default AddProduct;