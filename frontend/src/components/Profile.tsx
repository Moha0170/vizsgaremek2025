import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../style/index.css";

function Profile() {
  const [userData, setUserData] = useState<{ username: string; email: string; telefonszam: string; isAdmin: boolean; userId: number } | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserData({
          username: decoded.username,
          email: decoded.email,
          telefonszam: decoded.telefonszam,
          isAdmin: decoded.isAdmin,
          userId: decoded.userId,
        });
        fetchOrders(decoded.userId);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.clear();
        setUserData(null);
      }
    }
  }, []);

  const fetchOrders = async (userId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/orders/getOrders/${userId}`);
      setOrders(response.data);
    } catch (error) {
      setError("Hiba a rendelések lekérésekor.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await localStorage.clear();
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
            <button className="admin-interface"
              onClick={() => navigate("/admin")}>Admin felület</button>
          )}

          <div className="orders-container">
            <h2>Korábbi rendeléseid</h2>
            {loading ? (
              <p>Betöltés...</p>
            ) : error ? (
              <p>{error}</p>
            ) : orders.length > 0 ? (
              <ul className="orders-list">
                {orders.map((order) => (
                  <li key={order.id} className="order-item">
                    <span><strong>Rendelési azonosító:</strong> {order.id}</span>
                    <span><strong>Státusz:</strong> {order.kezbesitett ? "Kézbesítve" : "Folyamatban"}</span>
                    <span><strong>Összeg:</strong> {order.vasarlas_osszeg ? `${order.vasarlas_osszeg} Ft` : "N/A"}</span>
                    <span><strong>Dátum:</strong> {order.rendeles_datum ? new Date(order.rendeles_datum).toLocaleString() : "Ismeretlen"}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Még nincs leadott rendelésed.</p>
            )}
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Kijelentkezés
          </button>
        </>
      ) : (
        <>
          <h2>Bejelentkezés</h2>
          <LoginForm setUserData={setUserData} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            pauseOnHover={true}
            pauseOnFocusLoss={true}
            aria-label="toast notifications"
            theme="colored"
          />
        </>
      )}
    </div>
  );
}

function LoginForm({ setUserData }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URI}/profile/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password })
    });

    const data = await response.json();

    if (response.status === 200) {
      toast.success("Sikeres bejelentkezés!");
      localStorage.setItem("token", data.token);

      const decoded: any = jwtDecode(data.token);
      setUserData({
        username: decoded.username,
        email: decoded.email,
        telefonszam: decoded.telefonszam,
        isAdmin: decoded.isAdmin,
        userId: decoded.userId
      });

      localStorage.setItem("username", decoded.username);
      localStorage.setItem("email", decoded.email);
      localStorage.setItem("telefonszam", decoded.telefonszam);
      localStorage.setItem("isAdmin", decoded.isAdmin.toString());
      localStorage.setItem("userId", decoded.userId.toString());
      localStorage.setItem("isLoggedIn", "true");

      navigate("/");
    } else {
      toast.error(data.message || "Hibás bejelentkezés!");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Felhasználónév" value={user} onChange={(e) => setUser(e.target.value)} required />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "Elrejtés" : "Megjelenítés"}
        </button>

        <br /><br />
        <button type="submit" className="profile-login">Bejelentkezés</button>
        <p>Még nincs fiókod? <a href="/register">Regisztrálj itt</a></p>
      </form>
    </>
  );
}

export default Profile;
