// --- Products Management ---

// 1. Saare products list lena
export const getProducts = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

// 2. Naya Single Product save karna (AddProduct ke liye)
export const saveProduct = (product) => {
  const products = getProducts();
  products.push({ ...product, id: Date.now() });
  localStorage.setItem('products', JSON.stringify(products));
};

// 3. Poori list ko ek saath save karna (EditProduct ke liye)
export const saveProducts = (allProducts) => {
  localStorage.setItem('products', JSON.stringify(allProducts));
};

// 4. Product DELETE karna
export const deleteProduct = (id) => {
  const products = getProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  saveProducts(filteredProducts); // Re-using saveProducts
};

// 5. Product update karna (Individual update)
export const updateProduct = (updatedProduct) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === Number(updatedProduct.id));
  if (index !== -1) {
    products[index] = updatedProduct;
    saveProducts(products);
  }
};


// --- Cart Management ---

// 6. Cart ka data lena
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// 7. Poora Cart save karna (YAHI MISSING THA!)
export const saveCart = (cartData) => {
  localStorage.setItem('cart', JSON.stringify(cartData));
};

// 8. Cart mein naya item add karna
export const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart); // Use saveCart to store
};