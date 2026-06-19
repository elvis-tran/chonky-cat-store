import { useState, useEffect } from 'react';
import NavDrawer from './NavDrawer';

export default function Header({ currentPage, setPage, cartCount }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  return (
    <>
      <header>
        <div className="nav-inner">
          {/* Brand Logo */}
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); setPage('home'); }}>
            <div className="logo-paw">🐾</div>
            <div className="logo-text">
              <div className="brand">Chonky Cat</div>
              <div className="tagline">Food For Fat Felines</div>
            </div>
          </a>

          {/* Storefront Navigation */}
          <nav>
            <ul>
              <li>
                <a href="#home" className={currentPage === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setPage('home'); }}>Home</a>
              </li>
              <li>
                <a href="#shop" className={currentPage === 'products' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setPage('products'); }}>Shop</a>
              </li>
              <li>
                <a href="#about" className={currentPage === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setPage('about'); }}>About</a>
              </li>
            </ul>
          </nav>

          {/* Search, Cart & Login Actions */}
          <div className="nav-actions">
            <div className="nav-search">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search chonky foods…" />
            </div>

            <button className="cart-btn" onClick={() => setPage('cart')}>
              🛒 <span className="cart-label">Cart</span> <span className="cart-count">{cartCount}</span>
            </button>

            {/* 🆕 Login button safely moved to the right of the Cart button */}
            <button 
              onClick={() => setPage('login')} 
              className={`login-btn ${currentPage === 'login' ? 'active' : ''}`}
            >
              Login
            </button>

            <button 
              className={`hamburger ${mobileNavOpen ? 'open' : ''}`}
              onClick={toggleMobileNav}
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <NavDrawer 
          currentPage={currentPage} 
          setPage={setPage} 
          cartCount={cartCount}
          onClose={closeMobileNav}
        />
      )}
    </>
  );
}