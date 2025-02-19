import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Market from "./components/Market";
import Contacts from "./components/Contacts";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Admin from "./components/Admin";

import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Market />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/kezdooldal" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
