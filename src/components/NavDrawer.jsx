export default function NavDrawer({ currentPage, setPage, cartCount, onClose }) {
  const handleNavClick = (page) => {
    setPage(page);
    onClose();
  };

  return (
    <nav className="mobile-nav open" style={{ display: 'flex' }}>
      <button className="mobile-nav-close" onClick={onClose}>
        ✕ Close
      </button>
      <ul>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('products'); }}>Shop</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>Reviews</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>FAQ</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>Contact</a></li>
      </ul>
      <div className="mobile-nav-search">
        <svg width="16" height="16" fill="none" stroke="#8A7B6E" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input type="text" placeholder="Search chonky foods…" />
      </div>
    </nav>
  );
}