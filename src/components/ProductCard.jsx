import { Link } from 'react-router-dom';
import { getCart, saveCart } from '../utils/storage';

const ProductCard = ({ product, onDelete }) => {
  
  const addToCart = () => {
    const cart = getCart();
    // Check if item is already in cart to avoid duplicates (optional)
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      alert("Item already in cart!");
      return;
    }
    saveCart([...cart, product]);
    alert(`${product.name} added to cart!`);
    // Note: To make the navbar counter update instantly, we'd usually use Context, 
    // but for now, a page refresh or navigating to cart will show it.
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <div className="card-buttons">
        <button onClick={addToCart} style={{background: '#03dac6', color: '#000'}}>Add to Cart</button>
        <Link to={`/edit/${product.id}`} className="edit-btn">Edit</Link>
        <button onClick={() => onDelete(product.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;