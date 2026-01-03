import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, saveProducts } from '../utils/storage';

const AddProduct = () => {
  // 1. Setup the "Form Memory"
  const [form, setForm] = useState({ name: '', price: '', category: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page from refreshing
    
    const currentProducts = getProducts();
    const newProduct = { 
      ...form, 
      id: Date.now() // Unique ID for each product
    };

    saveProducts([...currentProducts, newProduct]); // Save to LocalStorage
    navigate('/'); // Redirect to Home Page
  };

  return (
    <div className="container">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} className="product-form">
        <input 
          placeholder="Product Name" 
          value={form.name}
          onChange={e => setForm({...form, name: e.target.value})} 
          required 
        />
        <input 
          placeholder="Price" 
          type="number" 
          value={form.price}
          onChange={e => setForm({...form, price: e.target.value})} 
          required 
        />
        <input 
          placeholder="Category" 
          value={form.category}
          onChange={e => setForm({...form, category: e.target.value})} 
          required 
        />
        <button type="submit">Save Product</button>
      </form>
    </div>
  );
};

export default AddProduct;