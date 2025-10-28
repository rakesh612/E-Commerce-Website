# Vibe Commerce - Full Stack E-Commerce Cart Application

A complete full-stack shopping cart application built with React, Node.js, Express, and MongoDB. This project demonstrates modern web development practices with a clean, responsive UI and robust backend API.

## 🚀 Features

### Backend Features
- **RESTful API** with Express.js
- **MongoDB** integration for data persistence
- **Product Management** - CRUD operations for products
- **Shopping Cart** - Add, remove, and manage cart items
- **Checkout System** - Process orders with customer information
- **Receipt Generation** - Generate order receipts with timestamps

### Frontend Features
- **React 18** with Vite for fast development
- **Tailwind CSS** for responsive, modern styling
- **Product Grid** - Display products with add to cart functionality
- **Shopping Cart Modal** - View and manage cart items
- **Checkout Form** - Customer information collection
- **Receipt Modal** - Order confirmation and receipt display
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios (HTTP client)
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- CORS
- Dotenv

## 📁 Project Structure

```
E-Commerce-Website/
├── backend/
│   ├── server.js          # Express server and API routes
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── CheckoutModal.jsx
│   │   │   └── ReceiptModal.jsx
│   │   ├── services/
│   │   │   └── api.js     # API service functions
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind configuration
│   └── postcss.config.js  # PostCSS configuration
├── screenshots/           # PNG/JPG screenshots referenced by README
└── README.md
```

## 🖼️ Screenshots

Add the following images to the `screenshots/` folder in the project root and they will render automatically on GitHub:

```text
screenshots/
├── home.png        # Products grid
├── cart.png        # Cart modal with items
├── checkout.png    # Checkout form
├── receipt.png     # Receipt modal
└── mobile.png      # Mobile responsive view
```

Example renders:

![Home](./screenshots/home.png)
![Home](./screenshots/home2.png)
![Cart](./screenshots/cart.png)
![Checkout](./screenshots/checkout.png)
![Receipt](./screenshots/receipt.png)
![Mobile](./screenshots/mobile.png)

### How to capture
- Start backend (`npm run dev` in `backend/`) and frontend (`npm run dev` in `frontend/`).
- Open `http://localhost:3000`.
- Take screenshots (PNG/JPG), save them with the exact filenames above into `./screenshots/`.
- Commit and push — GitHub will display them in this README.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd E-Commerce-Website
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   ```
   
   **For MongoDB Atlas (Cloud):**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   ```

4. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will start on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 📚 API Endpoints

### Products
- `GET /api/products` - Get all products

### Cart
- `GET /api/cart` - Get cart items with total
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout and create order

## 🎯 Usage

1. **Browse Products**: View the product grid on the homepage
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart button in the header
4. **Manage Items**: Remove items or adjust quantities in the cart
5. **Checkout**: Click "Proceed to Checkout" and fill in your details
6. **Order Confirmation**: View your receipt and order details

## 🎨 Features in Detail

### Product Management
- 8 pre-loaded sample products
- Product images, names, descriptions, and prices
- Category-based organization
- Quantity selection for cart addition

### Shopping Cart
- Real-time cart updates
- Item quantity management
- Remove items functionality
- Total calculation
- Empty cart state handling

### Checkout Process
- Customer information form validation
- Order processing with receipt generation
- Order ID and timestamp tracking
- Print receipt functionality

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface elements
- Optimized for all device sizes

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite development server with hot reload
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## 🗄️ Database Schema

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String
}
```

### Cart Collection
```javascript
{
  _id: ObjectId,
  productId: ObjectId (ref: Product),
  quantity: Number
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  customerName: String,
  customerEmail: String,
  items: [CartItem],
  total: Number,
  timestamp: Date
}
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use a cloud MongoDB service
2. Update the `MONGODB_URI` in your environment variables
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to platforms like Vercel, Netlify, or GitHub Pages
3. Update API endpoints to point to your deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created as part of Vibe Commerce screening assignment.

## 🎯 Future Enhancements

- User authentication and accounts
- Product search and filtering
- Payment integration (Stripe, PayPal)
- Order history and tracking
- Product reviews and ratings
- Admin dashboard for product management
- Real-time notifications
- Wishlist functionality
- Product recommendations

---

**Note**: This is a demo application for screening purposes. No real payments are processed during checkout.
