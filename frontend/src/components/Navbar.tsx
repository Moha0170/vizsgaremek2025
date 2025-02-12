import { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { FiMenu, FiX } from "react-icons/fi"; // Menü ikonok

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Webshop
        </Link>
        
        {/* Menü ikon (mobil nézethez) */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
        </div>

        {/* Menü elemek */}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>
              Kezdőoldal
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-links" onClick={() => setIsOpen(false)}>
              Termékek
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links" onClick={() => setIsOpen(false)}>
              Kapcsolat
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;