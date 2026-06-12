import React, { useState, useEffect } from 'react';

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch products from dummy API
  useEffect(() => {
    fetch('/api/products.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  // Helper to "go to a product"
  const goToProduct = (product) => {
    setSelectedProduct(product);
    setPage('product');
  };

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      // 1. Check if the product already exists in the cart
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingItemIndex !== -1) {
        // 2. If it exists, update the quantity of the existing item
        const newCart = [...prevCart];
        newCart[existingItemIndex].cartQuantity += quantity;
        return newCart;
      } else {
        // 3. If it's new, add it to the array
        return [...prevCart, { ...product, cartQuantity: quantity }];
      }
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, cartQuantity: newQuantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const renderPage = () => {
    if (loading && page === 'products') return <div style={{ padding: '60px 20px', textAlign: 'center' }}>Loading products...</div>;
    
    // Filter products by category if one is selected
    const displayProducts = selectedCategory 
      ? products.filter((p) => p.category === selectedCategory)
      : products;

    switch (page) {
      case 'home': return <Home setPage={setPage} setSelectedCategory={setSelectedCategory} goToProduct={goToProduct} addToCart={addToCart} />;
      case 'products': return <Shop products={displayProducts} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} goToProduct={goToProduct} addToCart={addToCart} />;
      case 'product': return <ProductDetails product={selectedProduct} addToCart={addToCart} setPage={setPage} />;
      case 'about': return <About />;
      case 'cart': return <Cart cart={cart} setPage={setPage} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} />
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