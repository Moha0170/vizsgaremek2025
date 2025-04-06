import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const adminStatus = localStorage.getItem("isAdmin") === "true";
      const storedUsername = localStorage.getItem("username") || "";
      setIsLoggedIn(loggedIn);
      setIsAdmin(adminStatus);
      setUsername(storedUsername);
    };

    const intervalId = setInterval(handleStorageChange, 200);
    handleStorageChange();

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUsername("");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Kezdőlap</Link>

        <DarkModeToggle />

        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX className="icon" /> : <FiMenu className="icon" />}
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/products" className="nav-links" onClick={() => setIsOpen(false)}>
              Termékek
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className="nav-item profile-menu">
                <div className="nav-links" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                  {username} ▼
                </div>
                {showProfileMenu && (
                  <ul className="profile-dropdown">
                    <li>
                      <Link to="/profile" onClick={() => setShowProfileMenu(false)}>
                        Profil
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout}>Kijelentkezés</button>
                    </li>
                  </ul>
                )}
              </li>

              <li className="nav-item">
                <Link to="/cart" className="nav-links" onClick={() => setIsOpen(false)}>
                  Kosár
                </Link>
              </li>

              {isAdmin && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-links" onClick={() => setIsOpen(false)}>
                    Admin
                  </Link>
                </li>
              )}
            </>
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
