// src/components/Header.jsx
import { Link } from "react-router-dom";
import { useProductsContext } from "../context/ProductsContext.jsx";
import { useState, useEffect } from "react";
import "./Header.css";

function Header() {
  const { cart } = useProductsContext();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu if window resizes above 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <Link to="/" className="logo">
          8-Bit Retro
        </Link>

        <nav className="desktop-links">
          <Link to="/shop">Shop</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </div>

      <div className="header-right">
        <Link to="/cart" className="cart">
          🛒 {cart.length}
        </Link>
      </div>

      {menuOpen && (
        <nav className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
