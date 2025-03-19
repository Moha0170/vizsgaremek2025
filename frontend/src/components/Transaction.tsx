import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style/orders.css";


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
      <h2>Vásárlás befejezése</h2> <br></br>

      {cartItems.length > 0 ? (
        <>
          <div className="transaction-list">
            {cartItems.map((item) => (
              <div key={item.termek_id} className="transaction-item">
                <span className="item-name">{item.neve}</span>
                <span className="item-price">{item.ara} Ft</span>
                <span className="item-quantity">Mennyiség: {item.mennyiseg}</span>
              </div>
            ))}
          </div>
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
          <Link to="/orders" className="orders-link">Korábbi rendeléseim</Link>
        </>
      ) : (
        <p>Nincsenek termékek a vásárláshoz.</p>
      )}
    </div>
  );
};

export default Transaction;
