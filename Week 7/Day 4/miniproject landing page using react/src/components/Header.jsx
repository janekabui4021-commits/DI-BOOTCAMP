import React, { useState } from 'react';

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="site-nav navbar navbar-expand-md" aria-label="Main navigation">
      <div className="container">
        <a className="navbar-brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">C</span>
          Company
        </a>
        <button
          className="navbar-toggler"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true" />
        </button>
        <div className={`collapse navbar-collapse${menuOpen ? ' show' : ''}`} id="primary-navigation">
          <ul className="navbar-nav ms-auto">
            {navigation.map((item) => (
              <li className="nav-item" key={item.label}>
                <a className="nav-link" href={item.href} onClick={closeMenu}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;