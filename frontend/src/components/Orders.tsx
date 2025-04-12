import { useEffect, useState } from "react";
import axios from "axios";
import "../style/orders.css";

interface Order {
  id: number;
  vasarlas_osszeg: number;
  rendeles_datum: string;
  kezbesitett: boolean;
}

interface OrderProduct {
  termek_id: number;
  mennyiseg: number;
  neve: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);
  const [orderProducts, setOrderProducts] = useState<{ [key: number]: OrderProduct[] }>({});

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchOrders(storedUserId);
    }
  }, []);

  const fetchOrders = async (id: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/orders/getOrders/${id}`);
      setOrders(response.data);
      setError(null);
    } catch (error) {
      setError("Hiba történt a rendelések lekérésekor.");
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = async (orderId: number) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter((id) => id !== orderId));
    } else {
      if (!orderProducts[orderId]) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URI}/orders/getProductsFromOrder/${orderId}`);
          setOrderProducts({ ...orderProducts, [orderId]: response.data });
        } catch (error) {
          console.error("Nem sikerült lekérni a termékeket.");
        }
      }
      setExpandedOrders([...expandedOrders, orderId]);
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
              <div className="order-summary">
                <span><strong>Rendelési azonosító:</strong> {order.id}</span>
                <span><strong>Státusz:</strong> {order.kezbesitett ? "Kézbesítve" : "Folyamatban"}</span>
                <span><strong>Összeg:</strong> {order.vasarlas_osszeg} Ft</span>
                <span><strong>Dátum:</strong> {new Date(new Date(order.rendeles_datum).getTime() + new Date().getTimezoneOffset() * 60000).toLocaleString()}</span>
                <button onClick={() => toggleOrderDetails(order.id)}>
                  {expandedOrders.includes(order.id) ? "Bezárás" : "Termékek megtekintése"}
                </button>
              </div>
              {expandedOrders.includes(order.id) && orderProducts[order.id] && (
                <ul className="product-list">
                  {orderProducts[order.id].map((product, index) => (
                    <li key={index}>
                      {product.neve} - {product.mennyiseg} db
                    </li>
                  ))}
                </ul>
              )}
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
