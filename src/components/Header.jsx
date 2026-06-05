import React from 'react';

export default function Header({ currentPage, setPage }) {
  return (
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
              <a href="#shop" className={currentPage === 'shop' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setPage('shop'); }}>Shop</a>
            </li>
            <li>
              <a href="#about" className={currentPage === 'about' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setPage('about'); }}>About</a>
            </li>
          </ul>
        </nav>

        {/* Search & Cart Actions */}
        <div className="nav-actions">
          <div className="nav-search">
            {/* Note: SVG attributes in React use camelCase, e.g., strokeWidth instead of stroke-width */}
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search chonky foods…" />
          </div>
          <button className="cart-btn">
            🛒 Cart <span className="cart-count">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}