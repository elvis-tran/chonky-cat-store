import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

export default function Profile({ setPage }) {
  // Grab the current user details and the global signOut method from Amplify
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  const userEmail = user?.signInDetails?.loginId || user?.username || 'Chonky Cat Fan';

  const handleSignOut = () => {
    signOut();
    setPage('home'); // Safely redirect to the storefront after logging out
  };

  return (
    <section className="profile-page container" style={{ padding: '80px 20px', minHeight: '60vh' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="section-eyebrow">Your Account</span>
        <h2 className="section-title">Chonky <em>Profile</em></h2>
        <div className="section-rule" style={{ margin: '15px auto' }}></div>
      </div>

      <div className="profile-card" style={{
        backgroundColor: '#1c1917',
        border: '1px solid #332f2b',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '500px',
        margin: '0 auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        <div className="profile-avatar" style={{
          fontSize: '4rem',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #2e2a24, #12100e)',
          width: '100px',
          height: '100px',
          lineHeight: '100px',
          borderRadius: '50%',
          margin: '0 auto 20px auto',
          border: '2px solid #e0a93c'
        }}>
          😻
        </div>

        <h3 style={{ color: '#FFF', fontSize: '1.5rem', marginBottom: '8px' }}>Welcome Back!</h3>
        <p style={{ color: '#a1a1a6', fontSize: '1rem', marginBottom: '30px', wordBreak: 'break-all' }}>
          {userEmail}
        </p>

        <div className="profile-details" style={{
          textAlign: 'left',
          borderTop: '1px solid #2e2a24',
          borderBottom: '1px solid #2e2a24',
          padding: '20px 0',
          marginBottom: '30px',
          fontSize: '0.95rem',
          color: '#e4e4e7'
        }}>
          <div style={{ display: 'flex', justifyContent: 'between', marginBottom: '10px' }}>
            <span style={{ color: '#a1a1a6' }}>Membership Tier:</span>
            <span style={{ marginLeft: 'auto', color: '#e0a93c', fontWeight: '600' }}>👑 Elite Chonk VIP</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'between' }}>
            <span style={{ color: '#a1a1a6' }}>Account Status:</span>
            <span style={{ marginLeft: 'auto', color: '#4ade80' }}>● Confirmed Live</span>
          </div>
        </div>

        <div className="profile-actions" style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            className="btn-outline" 
            onClick={() => setPage('products')}
            style={{ padding: '10px 20px', fontSize: '0.9rem' }}
          >
            Continue Shopping
          </button>
          <button 
            className="btn-primary" 
            onClick={handleSignOut}
            style={{ 
              padding: '10px 20px', 
              fontSize: '0.9rem',
              backgroundColor: '#e0a93c',
              color: '#12100e',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </section>
  );
}