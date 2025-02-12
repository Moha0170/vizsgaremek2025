import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/profile/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    });

    if (response.status === 200) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } else {
      setMessage("Hibás felhasználónév vagy jelszó");
    }
  };

  return (
    <div className="profile-container">
      <h2>Bejelentkezés</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Felhasználónév"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Bejelentkezés</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;
