import React, { useState, useEffect } from 'react';

//AWS Amplify
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

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

  // Fetch products from AWS API Gateway
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = 'https://jvf4xoz10l.execute-api.us-east-1.amazonaws.com/Prod/products';
        const response = await fetch(API_URL, {
          method: 'GET' 
        });

        if (!response.ok) {
          throw new Error(`AWS API returned status: ${response.status}`);
        }

        const rawData = await response.json();
        console.log('1. Raw API Gateway Response:', rawData);

        let parsedData = rawData;

        // Step 1: Unwrap Lambda Proxy Integration (if present)
        if (rawData.body) {
            parsedData = typeof rawData.body === 'string' 
                ? JSON.parse(rawData.body) 
                : rawData.body;
            console.log('2. Unwrapped Lambda Body:', parsedData);
        }

        // Step 2: Extract the actual array for React
        let finalProductsArray = [];

        if (Array.isArray(parsedData)) {
            // It's already a flat array
            finalProductsArray = parsedData;
        } else if (parsedData && Array.isArray(parsedData.Items)) {
            // Standard AWS DynamoDB response structure
            finalProductsArray = parsedData.Items;
        } else if (parsedData && Array.isArray(parsedData.products)) {
            // Common custom JSON wrapper
            finalProductsArray = parsedData.products;
        } else if (parsedData && Array.isArray(parsedData.data)) {
            // Another common custom wrapper
            finalProductsArray = parsedData.data;
        } else {
            console.warn('3. Could not locate an array in the response payload.', parsedData);
        }

        console.log('4. Final Array passed to React State:', finalProductsArray);
        setProducts(finalProductsArray);

      } catch (err) {
        console.error('Failed to fetch products from AWS:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Helper to "go to a product"
const goToProduct = (product) => {
  // Normalize the product so ProductDetails gets the 'imageKey' ready to go
  const normalizedProduct = {
    ...product,
    imageKey: product.image_url ? product.image_url.replace('img/', '') : null
  };
  
  setSelectedProduct(normalizedProduct);
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
      case 'home': return <Home products={products} setPage={setPage} setSelectedCategory={setSelectedCategory} goToProduct={goToProduct} addToCart={addToCart} />;
      case 'products': return <Shop products={displayProducts} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} goToProduct={goToProduct} addToCart={addToCart} />;
      case 'product': return <ProductDetails product={selectedProduct} addToCart={addToCart} setPage={setPage} />;
      case 'about': return <About />;
      case 'cart': return <Cart cart={cart} setPage={setPage} updateCartQuantity={updateCartQuantity} removeFromCart={removeFromCart} />
      //case 'login': return; for login page
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