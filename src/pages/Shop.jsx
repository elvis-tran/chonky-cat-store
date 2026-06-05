import ProductCard from '../components/ProductCard';

// src/pages/Shop.jsx
export default function Shop({ products, goToProduct }) {
  return (
    <div className="shop-page">
      <div className="container">
        <h1>Chonky Collection</h1>
        <div className="product-grid">
          {products.map((item) => (
            <ProductCard 
              key={item.id} 
              {...item} 
              onClick={() => goToProduct(item)} // Pass the specific object up to App.jsx
            />
          ))}
        </div>
      </div>
    </div>
  );
}