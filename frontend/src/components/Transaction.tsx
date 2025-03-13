import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style/transaction.css";

interface CartItem {
  termek_id: number;
  mennyiseg: number;
  neve: string;
  ara: number;
}

const Transaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (location.state && location.state.cartItems) {
      setCartItems(location.state.cartItems);
    }
  }, [location.state]);

  const completeOrder = async () => {
    if (!userId || cartItems.length === 0) return;
    setLoading(true);
    try {
      const orderData = {
        userId,
        items: cartItems.map(({ termek_id, mennyiseg }) => ({ termek_id, mennyiseg })),
      };
      await axios.post("http://localhost:5000/orders", orderData);
      navigate("/orders");
    } catch (error) {
      console.error("Hiba a rendelés leadásakor:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-container">
      <h2>Rendelés áttekintése</h2>
      {cartItems.length > 0 ? (
        <ul className="transaction-list">
          {cartItems.map((item) => (
            <li key={item.termek_id} className="transaction-item">
              <span className="product-name">{item.neve}</span>
              <span className="product-quantity">Mennyiség: {item.mennyiseg}</span>
              <span className="product-price">{item.ara} Ft</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nincsenek termékek a rendeléshez.</p>
      )}
      <button onClick={completeOrder} disabled={loading} className="complete-order-btn">
        {loading ? "Rendelés feldolgozása..." : "Rendelés leadása"}
      </button>
    </div>
  );
};

export default Transaction;
