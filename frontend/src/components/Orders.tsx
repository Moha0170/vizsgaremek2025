import { useEffect, useState } from "react";
import axios from "axios";
import "../style/index.css";

interface Order {
  id: number;
  vasarlas_osszeg: number;
  rendeles_datum: string;
  kezbesitett: boolean;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchOrders(storedUserId);
    }
  }, []);

  const fetchOrders = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/getOrders/${id}`);
      console.log("Kapott rendelések:", response.data);
      setOrders(response.data);
      setError(null);
    } catch (error) {
      console.error("Hiba a rendelések lekérésekor:", error);
      setError("Hiba történt a rendelések lekérésekor.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
};

export default Orders;
