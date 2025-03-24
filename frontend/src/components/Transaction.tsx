import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style/transaction.css";

interface CartItem {
  termek_id: number;
  mennyiseg: number;
  neve: string;
  ara: number;
}

const Transaction = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
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
      const data = response.data;
      if (data.length > 0) {
        const items = data.filter((item: any) => item.osszeg === undefined);
        const total = data.find((item: any) => item.osszeg !== undefined)?.osszeg || 0;
        setCartItems(items);
        setTotalPrice(total);
      } else {
        setCartItems([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.error("Hiba a kosár lekérésekor:", error);
      setCartItems([]);
      setTotalPrice(0);
    }
  };

  const clearCart = async () => {
    if (!userId) return;
    try {
      await axios.delete(`http://localhost:5000/cart/${userId}`);
      setCartItems([]);
      setTotalPrice(0);
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
          <div className="transaction-list">
            {cartItems.map((item) => (
              <div key={item.termek_id} className="transaction-item">
                <span className="item-name">{item.neve}</span>
                <span className="item-price">{item.ara} Ft</span>
                <span className="item-quantity">Mennyiség: {item.mennyiseg}</span>
              </div>
            ))}
          </div>
          <div className="total-price">Összesen: {totalPrice} Ft</div>
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
