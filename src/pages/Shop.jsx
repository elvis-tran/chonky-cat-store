import ProductCard from '../components/ProductCard';

// src/pages/Shop.jsx
export default function Shop({ products, goToProduct, addToCart }) {
  return (
    <div className="shop-page">
      <div className="container">
        <h1>Chonky Collection</h1>
        <div className="product-grid">
          {products.map((item) => (
            <ProductCard 
              key={item.id} 
              {...item} 
              // 1. Existing navigation
              onClick={() => goToProduct(item)}
              // 2. New: Pass the addToCart function to the card
              // We pass '1' as the default quantity for a quick-add
              onAddToCart={() => addToCart(item, 1)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}