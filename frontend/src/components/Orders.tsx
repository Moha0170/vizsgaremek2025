import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: number;
  status: string;
  total: number;
  created_at: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("Be kell jelentkezned a rendelések megtekintéséhez.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/orders/getOrders/${userId}`);
        setOrders(response.data);
      } catch (err) {
        setError("Hiba történt a rendelések lekérésekor.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>Korábbi rendeléseid</h1>
      {loading ? (
        <p>Betöltés...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <p>Rendelés azonosító: {order.id}</p>
              <p>Státusz: {order.status}</p>
              <p>Összeg: {order.total} Ft</p>
              <p>Dátum: {new Date(order.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
