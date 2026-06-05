import React from 'react';
import ProductCard from '../components/ProductCard';

export default function Home({ setPage }) {
  return (
    <div className="home-page">
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>For the Cat Who Has Everything, <br />Except a Smaller Waistline.</h1>
          <p>Premium, vet-approved, and absolutely delicious kibble for your fluffiest family members.</p>
          <button className="cta-btn" onClick={() => setPage('shop')}>Shop the Chonky Collection</button>
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section className="featured">
        <div className="container">
          <h2>Featured Delicacies</h2>
          <div className="product-grid">
            <ProductCard 
              badge="BEST SELLER" 
              badgeColor="gold"
              icon="🐟"
              category="Dry Food"
              name="Salmon Surprise"
              tagline="High-protein bliss for the picky eater."
              stars="★★★★★"
              reviews="128"
              price="$24.99"
              onClick={() => setPage('product')}
            />
            <ProductCard 
              icon="🍗"
              category="Treats"
              name="Chicken Pillows"
              tagline="Crunchy outside, gooey inside."
              stars="★★★★★"
              reviews="85"
              price="$12.50"
              onClick={() => setPage('product')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}