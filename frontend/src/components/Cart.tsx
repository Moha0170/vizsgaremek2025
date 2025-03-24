import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/cart.css";

interface CartItem {
  termek_id: number;
  mennyiseg: number;
  neve: string;
  ara: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [userId, setUserId] = useState<string | null>(null);
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
      const items = response.data.filter((item: any) => item.termek_id !== undefined);
      const total = response.data.find((item: any) => item.osszeg !== undefined)?.osszeg || 0;
      setCartItems(items);
      setTotalPrice(total);
    } catch (error) {
      console.error("Hiba a kosár lekérésekor:", error);
      setCartItems([]);
      setTotalPrice(0);
    }
  };

  const updateQuantity = async (itemId: number, amount: number) => {
    if (!userId) return;

    const item = cartItems.find((item) => item.termek_id === itemId);
    if (!item) return;

    const newQuantity = item.mennyiseg + amount;
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    try {
      await axios.post(`http://localhost:5000/cart/${userId}/${itemId}/${amount}`);
      fetchCartItems(userId);
    } catch (error) {
      console.error("Hiba a mennyiség frissítésekor:", error);
    }
  };

  const removeFromCart = async (itemId: number) => {
    if (!userId) return;
    try {
      await axios.delete(`http://localhost:5000/cart/${userId}/${itemId}`);
      fetchCartItems(userId);
    } catch (error) {
      console.error("Hiba a termék eltávolításakor:", error);
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

  const proceedToTransaction = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    navigate("/transaction");
  };

  const goToOrders = () => {
    navigate("/orders");
  };

  return (
    <div className="cart-container">
      <h2>Kosarad</h2>

      {cartItems.length > 0 ? (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.termek_id} className="cart-item">
                <span className="product-name">{item.neve}</span>
                <span className="product-price">{item.ara} Ft</span>

                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.termek_id, -1)}>-</button>
                  <span>{item.mennyiseg}</span>
                  <button onClick={() => updateQuantity(item.termek_id, 1)}>+</button>
                </div>

                <button onClick={() => removeFromCart(item.termek_id)} className="remove-button">
                  🗑️
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <strong>Összeg: {totalPrice} Ft</strong>
          </div>
        </>
      ) : (
        <p>A kosarad üres.</p>
      )}

      <div className="cart-actions">
        {cartItems.length > 0 && (
          <>
            <button onClick={clearCart} className="clear-cart-btn">
              Kosár ürítése
            </button>
            <button onClick={proceedToTransaction} className="checkout-btn">
              Tovább a fizetéshez
            </button>
          </>
        )}
        <button onClick={goToOrders} className="orders-btn">
          Megnézem a rendeléseimet
        </button>
      </div>
    </div>
  );
};

export default Cart;
