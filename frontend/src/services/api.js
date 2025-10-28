import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = () => api.get('/products');

// Cart API
export const addToCart = (productId, quantity) => 
  api.post('/cart', { productId, quantity });

export const getCart = () => api.get('/cart');

export const removeFromCart = (itemId) => 
  api.delete(`/cart/${itemId}`);

// Checkout API
export const checkout = (customerName, customerEmail) => 
  api.post('/checkout', { customerName, customerEmail });

export default api;
