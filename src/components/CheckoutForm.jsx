import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CheckoutForm({ setPage }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your actual production URL later!
        return_url: "http://localhost:5173/payment-success",
      },
      // Note: If you want to handle the result entirely on this page without redirecting, 
      // you can change this to redirect: 'if_required' 
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred while processing your payment.");
      }
    } 

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button 
          disabled={isLoading || !stripe || !elements} 
          id="submit" 
          className="btn-primary"
          style={{ 
            width: '100%', 
            opacity: (isLoading || !stripe || !elements) ? 0.7 : 1,
            cursor: (isLoading || !stripe || !elements) ? 'not-allowed' : 'pointer'
          }}
        >
          <span id="button-text">
            {isLoading ? "Processing..." : "Pay Now"}
          </span>
        </button>
        
        <button 
          type="button" 
          className="btn-outline" 
          onClick={() => setPage('cart')}
          disabled={isLoading}
          style={{ width: '100%', borderColor: 'var(--border)' }}
        >
          Back to Cart
        </button>
      </div>

      {message && (
        <div id="payment-message" style={{ marginTop: '15px', color: '#ff6b6b', fontSize: '0.9rem', textAlign: 'center' }}>
          {message}
        </div>
      )}
    </form>
  );
}