import React from 'react';

export default function Cart({ cart, setPage, updateCartQuantity, removeFromCart }) {
  // Calculate a simple total (assuming price is a string like "$24.99")
  const total = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace('$', ''));
    return sum + (priceNum * item.cartQuantity);
  }, 0);

  return (
    <div className="page visible">
      {/* CART HERO */}
      <section className="cart-hero">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Checkout</span>
            <h1 className="cart-title">Your Shopping <em>Cart</em></h1>
            <div className="section-rule"></div>
          </div>
        </div>
      </section>

      {/* CART CONTENT */}
      <section className="cart-section">
        <div className="container">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Time to treat your chonky friend! Explore our premium selection of cat foods and treats.</p>
              <button className="btn-primary" onClick={() => setPage('products')}>Continue Shopping</button>
            </div>
          ) : (
            <div className="cart-layout">
              {/* CART ITEMS */}
              <div className="cart-items-column">
                <div className="items-header">
                  <h2>{cart.length} {cart.length === 1 ? 'Item' : 'Items'} in Cart</h2>
                </div>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div key={index} className="cart-item-card">
                      <div className="item-image">{item.icon}</div>
                      <div className="item-details">
                        <div className="item-name">{item.name}</div>
                        <div className="item-category">{item.category}</div>
                      </div>
                      <div className="item-quantity">
                        <div className="qty-controls">
                          <button className="qty-btn" onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}>−</button>
                          <input type="number" className="qty-input" value={item.cartQuantity} onChange={(e) => updateCartQuantity(item.id, parseInt(e.target.value) || 1)} min="1" />
                          <button className="qty-btn" onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}>+</button>
                        </div>
                      </div>
                      <div className="item-price">
                        <div className="price-each">{item.price}</div>
                        <div className="price-total">${(parseFloat(item.price.replace('$', '')) * item.cartQuantity).toFixed(2)}</div>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CART SUMMARY */}
              <div className="cart-summary">
                <div className="summary-card">
                  <h3>Order Summary</h3>
                  
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span className="shipping-free">FREE</span>
                  </div>
                  <div className="summary-row summary-tax">
                    <span>Tax</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div className="summary-total">
                    <span>Total</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                  </div>

                  <button className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>Proceed to Checkout</button>
                  <button className="btn-outline" style={{ width: '100%', marginTop: '10px', color: 'var(--text)', borderColor: 'var(--border)' }} onClick={() => setPage('products')}>Continue Shopping</button>
                  
                  <div className="summary-note">
                    ✓ Free shipping on all orders<br/>
                    ✓ 30-day satisfaction guarantee<br/>
                    ✓ Premium chonk approved
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}