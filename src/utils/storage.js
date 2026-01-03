// --- Products Management ---

// 1. Saare products get karna
export const getProducts = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

// 2. Product save karna (Add)
export const saveProduct = (product) => {
  const products = getProducts();
  products.push({ ...product, id: Date.now() });
  localStorage.setItem('products', JSON.stringify(products));
};

// 3. Product DELETE karna (Yahi missing tha!)
export const deleteProduct = (id) => {
  const products = getProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(filteredProducts));
};

// 4. Product update karna
export const updateProduct = (updatedProduct) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === Number(updatedProduct.id));
  if (index !== -1) {
    products[index] = updatedProduct;
    localStorage.setItem('products', JSON.stringify(products));
  }
};


// --- Cart Management ---

export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
};