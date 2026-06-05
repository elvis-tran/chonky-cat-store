import React from 'react';

export default function ProductCard({ 
  badge, 
  badgeColor, 
  icon, 
  category, 
  name, 
  tagline, 
  stars, 
  reviews, 
  price,
  onClick,
  onAddToCart 
}) {
  const handleAddClick = (e) => {
    e.stopPropagation(); 
    onAddToCart();
  };
  return (
    <div className="product-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      
      {/* 1. Conditional Badge */}
      {badge && (
        <div className={`product-badge ${badgeColor === 'gold' ? 'gold' : ''}`}>
          {badge}
        </div>
      )}
      
      {/* 2. Product Image/Icon */}
      <div className="product-img">{icon}</div>
      
      {/* 3. Product Details */}
      <div className="product-info">
        <div className="product-category">{category}</div>
        <div className="product-name">{name}</div>
        
        {/* Some cards on the shop page don't have a tagline, so we make it optional */}
        {tagline && <div className="product-tagline">{tagline}</div>}
        
        <div className="product-stars">
          {stars} <span className="product-reviews">({reviews})</span>
        </div>
        
        <div className="product-footer">
          <div className="product-price">{price}</div>
        </div>
        
        {/* 4. Add to Cart Action */}
        <button 
          className="add-btn"
          onClick={handleAddClick} // Use our helper here
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}