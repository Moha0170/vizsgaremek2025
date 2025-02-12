import { BrowserRouter as Router } from "react-router-dom";
import Market from "./components/Market";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Market />
    </Router>
  );
}

export default App;
