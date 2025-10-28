const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String }
});

const Product = mongoose.model('Product', productSchema);

// Cart Schema
const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 }
});

const Cart = mongoose.model('Cart', cartItemSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [cartItemSchema],
  total: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Initialize products if empty
const initializeProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    const products = [
      { name: 'Wireless Headphones', price: 99.99, description: 'High-quality wireless headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&auto=format', category: 'Electronics' },
      { name: 'Smart Watch', price: 199.99, description: 'Feature-rich smartwatch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&auto=format', category: 'Electronics' },
      { name: 'Coffee Maker', price: 79.99, description: 'Automatic coffee maker', image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=300&h=200&fit=crop&auto=format', category: 'Appliances' },
      { name: 'Running Shoes', price: 129.99, description: 'Comfortable running shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop&auto=format', category: 'Sports' },
      { name: 'Laptop Stand', price: 49.99, description: 'Adjustable laptop stand', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop&auto=format', category: 'Accessories' },
      { name: 'Bluetooth Speaker', price: 89.99, description: 'Portable bluetooth speaker', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop&auto=format', category: 'Electronics' },
      { name: 'Desk Lamp', price: 39.99, description: 'LED desk lamp with adjustable brightness', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop&auto=format', category: 'Furniture' },
      { name: 'Water Bottle', price: 24.99, description: 'Insulated water bottle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop&auto=format', category: 'Sports' }
    ];
    await Product.insertMany(products);
    console.log('Products initialized');
  }
};

// API Routes

// GET /api/products - Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /api/cart - Add item to cart
app.post('/api/cart', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if item already exists in cart
    const existingItem = await Cart.findOne({ productId });
    
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      res.json({ message: 'Item quantity updated in cart', item: existingItem });
    } else {
      const cartItem = new Cart({ productId, quantity });
      await cartItem.save();
      res.json({ message: 'Item added to cart', item: cartItem });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// GET /api/cart - Get cart with total
app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find().populate('productId');
    
    let total = 0;
    const items = cartItems.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      total += itemTotal;
      return {
        _id: item._id,
        product: item.productId,
        quantity: item.quantity,
        itemTotal: itemTotal
      };
    });

    res.json({ items, total: total.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// DELETE /api/cart/:id - Remove item from cart
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// POST /api/reinit - Reinitialize products (for development)
app.post('/api/reinit', async (req, res) => {
  try {
    await Product.deleteMany({});
    await initializeProducts();
    res.json({ message: 'Products reinitialized successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reinitialize products' });
  }
});

// POST /api/checkout - Process checkout
app.post('/api/checkout', async (req, res) => {
  try {
    const { customerName, customerEmail } = req.body;
    
    if (!customerName || !customerEmail) {
      return res.status(400).json({ error: 'Customer name and email are required' });
    }

    // Get current cart
    const cartItems = await Cart.find().populate('productId');
    
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total
    let total = 0;
    const items = cartItems.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      total += itemTotal;
      return {
        productId: item.productId._id,
        quantity: item.quantity,
        itemTotal: itemTotal
      };
    });

    // Create order
    const order = new Order({
      customerName,
      customerEmail,
      items: cartItems.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      total: total.toFixed(2)
    });

    await order.save();

    // Clear cart
    await Cart.deleteMany({});

    // Generate receipt
    const receipt = {
      orderId: order._id,
      customerName,
      customerEmail,
      items: items.map(item => ({
        product: cartItems.find(cartItem => cartItem.productId._id.toString() === item.productId.toString()).productId,
        quantity: item.quantity,
        itemTotal: item.itemTotal
      })),
      total: total.toFixed(2),
      timestamp: order.timestamp
    };

    res.json({ message: 'Order placed successfully', receipt });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process checkout' });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initializeProducts();
});
