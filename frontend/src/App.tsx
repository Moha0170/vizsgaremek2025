import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Market from "./components/Market";
import Contacts from "./components/Contacts";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Admin from "./components/Admin";
import Kezdooldal from "./components/kezdooldal";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail"; 
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";

import "./style/index.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Kezdooldal />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/products" element={<Market />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} /> 
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
