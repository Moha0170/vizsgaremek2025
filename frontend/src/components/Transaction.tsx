import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CartItem {
  termek_id: number;
  mennyiseg: number;
  neve: string;
  ara: number;
}

const Transaction = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedCart = localStorage.getItem("cartItems");

    if (storedUserId && storedCart) {
      setUserId(storedUserId);
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const completePurchase = async () => {
    if (!userId || cartItems.length === 0) return;

    try {
      await axios.post("http://localhost:5000/orders", {
        userId,
        items: cartItems,
        total: cartItems.reduce((sum, item) => sum + item.ara * item.mennyiseg, 0),
      });

      localStorage.removeItem("cartItems");
      navigate("/orders");
    } catch (error) {
      console.error("Hiba a vásárlás során:", error);
    }
  };

  return (
    <div className="transaction-container">
      <h2>Vásárlás befejezése</h2>

      {cartItems.length > 0 ? (
        <>
          <ul className="transaction-list">
            {cartItems.map((item) => (
              <li key={item.termek_id} className="transaction-item">
                <span>{item.neve}</span>
                <span>{item.ara} Ft</span>
                <span>Mennyiség: {item.mennyiseg}</span>
              </li>
            ))}
          </ul>
          <button onClick={completePurchase} className="complete-btn">
            Vásárlás befejezése
          </button>
        </>
      ) : (
        <p>Nincsenek termékek a vásárláshoz.</p>
      )}
    </div>
  );
};

export default Transaction;
