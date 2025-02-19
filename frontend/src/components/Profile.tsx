import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/profile/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    });
  
    const data = await response.json();
  
    if (response.status === 200) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", data.isAdmin ? "true" : "false");
      navigate("/");
    } else {
      setMessage(data.message);
    }
  };
  

  return (
    <div className="profile-container">
      <h2>Bejelentkezés</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Felhasználónév" value={user} onChange={(e) => setUser(e.target.value)} required />
        <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Bejelentkezés</button>
      </form>
      {message && <p>{message}</p>}
      <p>Még nincs fiókod? <a href="/register">Regisztrálj itt</a></p>
    </div>
  );
}

export default Profile;
