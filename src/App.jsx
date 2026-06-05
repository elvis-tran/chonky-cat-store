import React, { useState } from 'react';

// Components
import Announcement from './components/Announcement';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Cart from './pages/Cart';

export default function App() {
  // 1. GLOBAL STATE: The source of truth for the app
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Your product database (This could eventually come from an API)
  const products = [
    { id: 1, name: 'Salmon Surprise', category: 'Dry Food', price: '$24.99', icon: '🐟', badge: 'BEST SELLER', badgeColor: 'gold', stars: '★★★★★', reviews: '128' },
    { id: 2, name: 'Chicken Pillows', category: 'Treats', price: '$12.50', icon: '🍗', stars: '★★★★★', reviews: '85' },
    // ... add others here
  ];

  // Helper to "go to a product"
  const goToProduct = (product) => {
    setSelectedProduct(product);
    setPage('product');
  };

  const addToCart = (product, quantity) => {
  // Create a new item object
  const newItem = { ...product, cartQuantity: quantity };
  // Update the cart state by spreading the existing cart + the new item
  setCart([...cart, newItem]);
  alert(`${product.name} added to cart!`);
  };

  // 2. RENDER LOGIC: Pass specific data to specific pages
/*   const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home setPage={setPage} />;
      case 'shop':
        return <Shop products={products} goToProduct={goToProduct} />;
      case 'product':
        // We pass the specific product object to the details page
        return <ProductDetails product={selectedProduct} cart={cart} setCart={setCart} />;
      case 'about':
        return <About />;
      default:
        return <Home setPage={setPage} />;
    }
  }; */

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home setPage={setPage} />;
      case 'shop': return <Shop products={products} goToProduct={goToProduct} />;
      case 'product': return <ProductDetails product={selectedProduct} addToCart={addToCart} setPage={setPage} />;
      case 'about': return <About />;
      case 'cart': return <Cart cart={cart} />
      default: return <Home setPage={setPage} />;
    }
  };

  return (
    <>
      <Announcement />
      <Header currentPage={page} setPage={setPage} cartCount={cart.length} />
      <main>{renderPage()}</main>
      <Footer />
    </>
  );
}