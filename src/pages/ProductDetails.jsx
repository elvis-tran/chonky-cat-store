import React, { useState } from 'react';

// Make sure you include 'addToCart' in the function signature props
export default function ProductDetails({ product, addToCart, setPage }) {
  // 1. Initialize State Hooks inside the component
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);

  // 2. Helper function to change quantity safely
  const handleQtyChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };
  // Update this to add a "Back" button
  if (!product) return (
    <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
      <h2>No product selected!</h2>
      <button onClick={() => setPage('shop')} className="btn-primary">
        Return to Shop
      </button>
    </div>
  );
  return (
    <div className="page visible">
      <div className="container pdp-section">
        <div className="pdp-grid">
          
          {/* GALLERY */}
          <div>
            <div className="pdp-gallery-main">{product.icon}</div>
          </div>

          {/* INFO */}
          <div>
            <div className="pdp-breadcrumb">Shop / {product.category} / <span>{product.name}</span></div>
            <h1 className="pdp-title">{product.name}</h1>
            <div className="pdp-price">{product.price}</div>
            <p className="pdp-desc">
                High-quality {product.category} for your feline. {product.name} is a favorite!
            </p>

            <div className="pdp-qty-label">Quantity</div>
            <div className="pdp-qty">
              {/* Correctly using the 'setQuantity' logic here */}
              <button className="qty-btn" onClick={() => handleQtyChange(-1)}>−</button>
              <input className="qty-num" type="number" value={quantity} readOnly />
              <button className="qty-btn" onClick={() => handleQtyChange(1)}>+</button>
            </div>

            {/* Calling addToCart passed down from App.jsx */}
            <button 
                className="btn-primary pdp-atc" 
                onClick={() => addToCart(product, quantity)}
            >
                🛒 Add to Cart
            </button>

            {/* TABS */}
            <div className="pdp-tabs">
              <div className="tab-btns">
                <button 
                  className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('ingredients')}
                >
                  Ingredients
                </button>
              </div>
              
              <div className="tab-content">
                {activeTab === 'description' && <p>{product.name} is perfect for your cat's dietary needs.</p>}
                {activeTab === 'ingredients' && <p>Premium ingredients sourced sustainably.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}