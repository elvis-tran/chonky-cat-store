import React from 'react';
import ProductCard from '../components/ProductCard';

export default function Home({ setPage, goToProduct, addToCart }) {
  
  // We define the products here so we can pass the full object to functions
  const featured = [
    { id: 1, name: 'Salmon Surprise', category: 'Dry Food', price: '$24.99', icon: '🐟', badge: 'BEST SELLER', badgeColor: 'gold', stars: '★★★★★', reviews: '128' },
    { id: 2, name: 'Chicken Pillows', category: 'Treats', price: '$12.50', icon: '🍗', stars: '★★★★★', reviews: '85' }
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>For the Cat Who Has Everything, <br />Except a Smaller Waistline.</h1>
          <p>Premium, vet-approved, and absolutely delicious kibble for your fluffiest family members.</p>
          <button className="cta-btn" onClick={() => setPage('shop')}>Shop the Chonky Collection</button>
        </div>
      </section>

      <section className="featured">
        <div className="container">
          <h2>Featured Delicacies</h2>
          <div className="product-grid">
            {featured.map((item) => (
              <ProductCard 
                key={item.id} 
                {...item} 
                // Navigate to details page
                onClick={() => goToProduct(item)}
                // Trigger add to cart
                onAddToCart={() => addToCart(item, 1)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}