import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts, saveProducts } from '../utils/storage';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', category: '' });

  useEffect(() => {
    const products = getProducts();
    const productToEdit = products.find(p => p.id === parseInt(id));
    if (productToEdit) setForm(productToEdit);
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const products = getProducts();
    const updatedProducts = products.map(p => 
      p.id === parseInt(id) ? { ...form, id: parseInt(id) } : p
    );
    saveProducts(updatedProducts);
    navigate('/');
  };

  return (
    <div className="container">
      <h1>Edit Product</h1>
      <form onSubmit={handleUpdate} className="product-form">
        <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;