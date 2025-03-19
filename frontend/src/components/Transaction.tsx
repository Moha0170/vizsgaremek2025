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
  const [cim, setCim] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchCartItems(storedUserId);
    }
  }, []);

  const fetchCartItems = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${id}`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Hiba a kosár lekérésekor:", error);
      setCartItems([]);
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    try {
      await axios.delete(`http://localhost:5000/cart/${userId}`);
      setCartItems([]);
    } catch (error) {
      console.error("Hiba a kosár törlésekor:", error);
    }
  };

  const completePurchase = async () => {
    if (!userId || cartItems.length === 0) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/orders/createOrderFromCart/${userId}`,
        { cim }
      );
      
      if (response.status === 200) {
        localStorage.removeItem("cartItems");
        clearCart();
        navigate("/orders");
      }
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
          <input
            type="text"
            placeholder="Szállítási cím"
            value={cim}
            onChange={(e) => setCim(e.target.value)}
            className="address-input"
          />
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
