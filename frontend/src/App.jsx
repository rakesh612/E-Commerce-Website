import React, { useState, useEffect } from 'react';
import { getProducts, getCart, addToCart, removeFromCart, checkout } from './services/api';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Load products and cart on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsResponse, cartResponse] = await Promise.all([
        getProducts(),
        getCart()
      ]);
      console.log('Products loaded:', productsResponse.data);
      setProducts(productsResponse.data);
      setCart(cartResponse.data);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      await addToCart(productId, quantity);
      // Reload cart after adding item
      const cartResponse = await getCart();
      setCart(cartResponse.data);
    } catch (err) {
      setError('Failed to add item to cart');
      console.error('Error adding to cart:', err);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCart(itemId);
      // Reload cart after removing item
      const cartResponse = await getCart();
      setCart(cartResponse.data);
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error('Error removing from cart:', err);
    }
  };

  const handleCheckout = async (customerName, customerEmail) => {
    try {
      const response = await checkout(customerName, customerEmail);
      setReceipt(response.data.receipt);
      setShowCheckout(false);
      setShowCart(false);
      // Reload cart (should be empty after checkout)
      const cartResponse = await getCart();
      setCart(cartResponse.data);
    } catch (err) {
      setError('Failed to process checkout');
      console.error('Error during checkout:', err);
    }
  };

  const closeReceipt = () => {
    setReceipt(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Vibe Commerce</h1>
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Cart ({cart.items.length})
            </button>
          </div>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 mt-4">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h2>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      {/* Cart Modal */}
      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          onClose={() => setShowCheckout(false)}
          onCheckout={handleCheckout}
        />
      )}

      {/* Receipt Modal */}
      {receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={closeReceipt}
        />
      )}
    </div>
  );
}

export default App;
