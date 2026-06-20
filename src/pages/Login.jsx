// src/pages/Login.jsx
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function Login({ setPage }) {
  return (
    <div className="login-page" style={{ padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <Authenticator>
        {({ signOut, user }) => (
          <div style={{ textAlign: 'center' }}>
            <h1>Welcome back, {user.username}!</h1>
            <p>You are now logged in to Chonky Cat.</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
              <button onClick={() => setPage('home')} className="btn-primary">
                Back to Shop
              </button>
              <button onClick={signOut} className="btn-outline">
                Sign Out
              </button>
            </div>
          </div>
        )}
      </Authenticator>
    </div>
  );
}