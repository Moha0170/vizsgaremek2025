import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userData, setUserData] = useState<{ username: string; email: string; telefonszam: string; isAdmin: boolean } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setUserData({
        username: localStorage.getItem("username") || "",
        email: localStorage.getItem("email") || "",
        telefonszam: localStorage.getItem("telefonszam") || "",
        isAdmin: localStorage.getItem("isAdmin") === "true"
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserData(null);
    navigate("/");
  };

  return (
    <div className="profile-container">
      {userData ? (
        <>
          <h2>Üdv, {userData.username}!</h2>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Telefonszám:</strong> {userData.telefonszam}</p>
          <p>{userData.isAdmin ? "Adminisztrátor vagy" : "Felhasználó vagy"}</p>
          {userData.isAdmin && (
            <button onClick={() => navigate("/admin")}>Admin felület</button>
          )}
          <button className="logout-button" onClick={handleLogout}>
            Kijelentkezés
          </button>
        </>
      ) : (
        <>
          <h2>Bejelentkezés</h2>
          <LoginForm setUserData={setUserData} />
        </>
      )}
    </div>
  );
}

function LoginForm({ setUserData }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/profile/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password })
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("telefonszam", data.telefonszam);
      localStorage.setItem("isAdmin", data.isAdmin ? "true" : "false");
      localStorage.setItem("userId", data.id);

      setUserData({ 
        username: data.username, 
        email: data.email, 
        telefonszam: data.telefonszam, 
        isAdmin: data.isAdmin,
        userId: data.id
      });

      navigate("/");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Felhasználónév" value={user} onChange={(e) => setUser(e.target.value)} required />
      <input type="password" placeholder="Jelszó" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Bejelentkezés</button>
      {message && <p>{message}</p>}
      <p>Még nincs fiókod? <a href="/register">Regisztrálj itt</a></p>
    </form>
  );
}

export default Profile;