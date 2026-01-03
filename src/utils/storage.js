const KEY = "products";
const CART_KEY = "cart";

// --- PRODUCT FUNCTIONS ---
export const getProducts = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProducts = (products) => {
  localStorage.setItem(KEY, JSON.stringify(products));
};

// --- CART FUNCTIONS (The ones causing the error) ---
export const getCart = () => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};