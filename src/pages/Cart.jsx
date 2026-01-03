import { useState, useEffect } from 'react';
import { getCart, saveCart } from '../utils/storage';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // When loading, ensure every item has a quantity of at least 1
    const items = getCart().map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCartItems(items);
  }, []);

  const updateQuantity = (id, amount) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + amount); // Minimum quantity is 1
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
    saveCart(updated);
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    saveCart(updated);
  };

  // Calculate Total: Sum of (Price * Quantity)
  const total = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

  return (
    <div className="container">
      <h1>🛒 Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty. <Link to="/">Go Shopping</Link></p>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="product-grid">
            {cartItems.map(item => (
              <div key={item.id} className="product-card">
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>
                
                <div className="quantity-controls" style={{margin: '15px 0', display: 'flex', alignItems: 'center', gap: '15px'}}>
                  <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn">-</button>
                  <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn">+</button>
                </div>

                <p><strong>Subtotal: ${(item.price * item.quantity).toFixed(2)}</strong></p>
                <button onClick={() => removeFromCart(item.id)} className="delete-btn">Remove</button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary" style={{marginTop: '40px', padding: '30px', background: '#111', borderRadius: '15px', border: '1px solid #333'}}>
            <h2>Total Amount: <span style={{color: '#bb86fc'}}>${total.toFixed(2)}</span></h2>
            <button className="edit-btn" style={{padding: '15px 40px', fontSize: '1.1rem'}}>Proceed to Checkout</button>
            <button onClick={() => {saveCart([]); setCartItems([]);}} className="delete-btn" style={{marginLeft: '10px'}}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;