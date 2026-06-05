import React from 'react';

export default function Cart({ cart }) {
  // Calculate a simple total (assuming price is a string like "$24.99")
  const total = cart.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace('$', ''));
    return sum + (priceNum * item.cartQuantity);
  }, 0);

  return (
    <div className="page visible">
      <div className="container">
        <h1>Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <p>Your cart is empty. Go back to the <a href="#" onClick={() => window.location.reload()}>Shop</a> to find some treats!</p>
        ) : (
          <div className="cart-list">
            {cart.map((item, index) => (
              <div key={index} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
                <span>{item.icon} {item.name}</span>
                <span>{item.price} x {item.cartQuantity}</span>
              </div>
            ))}
            <div className="cart-total" style={{ marginTop: '20px', fontWeight: 'bold' }}>
              Total: ${total.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}