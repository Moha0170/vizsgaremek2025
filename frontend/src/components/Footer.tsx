import { Link } from "react-router-dom";
import "../index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Webáruház. Minden jog fenntartva.</p>
        <nav>
          <Link to="/contact">Kapcsolat</Link> |  
          <Link to="/about"> Rólunk</Link> |  
          <Link to="/terms"> Általános szerződési feltételek</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
