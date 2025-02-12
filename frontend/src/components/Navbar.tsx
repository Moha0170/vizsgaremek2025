import { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Webshop
        </Link>
        
        {}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
        </div>

        {}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>
              Kezdőoldal
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/termekek" className="nav-links" onClick={() => setIsOpen(false)}>
              Termékek
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/kapcsolat" className="nav-links" onClick={() => setIsOpen(false)}>
              Kapcsolat
            </Link>
          </li>
          {isLoggedIn ? (
            <li className="nav-item">
              <Link to="/profile" className="nav-links" onClick={() => setIsOpen(false)}>
                Profil
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/profile" className="nav-links" onClick={() => setIsOpen(false)}>
                Bejelentkezés
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;