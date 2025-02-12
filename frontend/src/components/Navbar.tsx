import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true"; 

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Webshop</Link>

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item"><Link to="/" className="nav-links">Kezdőlap</Link></li>
          <li className="nav-item"><Link to="/" className="nav-links">Termékek</Link></li>
          <li className="nav-item"><Link to="/contact" className="nav-links">Kapcsolat</Link></li>
          {isAdmin && (
          <li className="nav-item">
            <Link to="/admin" className="nav-links" onClick={() => setIsOpen(false)}>
              Admin
            </Link>
          </li>
        )}
          {isLoggedIn ? (
            <li className="nav-item"><Link to="/profile" className="nav-links">Profil</Link></li>
          ) : (
            <li className="nav-item"><Link to="/profile" className="nav-links">Bejelentkezés</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
