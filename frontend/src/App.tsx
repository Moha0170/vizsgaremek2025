import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Market from "./components/Market";
import Contacts from "./components/Contacts";
import Profile from "./components/Profile";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/termekek" element={<Market />} />
        <Route path="/kapcsolat" element={<Contacts />} />
        <Route path="/profile" element={<Profile />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
