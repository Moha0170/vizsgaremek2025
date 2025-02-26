import { useEffect, useState } from "react";
import axios from "axios";
import "../cart.css";

interface CartItem {
  termek_id: number;
  mennyiseg: number;
  neve: string;
  ar: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Bejelentkezett felhasználó azonosítása
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchCartItems(storedUserId);
    }
  }, []);

  // Kosár lekérése a szerverről
  const fetchCartItems = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${id}`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Hiba a kosár lekérésekor:", error);
    }
  };

  // Mennyiség növelése vagy csökkentése
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

  // Termék törlése a kosárból
  const removeFromCart = async (itemId: number) => {
    if (!userId) return;
    try {
      await axios.delete(`http://localhost:5000/cart/${userId}/${itemId}`);
      fetchCartItems(userId);
    } catch (error) {
      console.error("Hiba a termék eltávolításakor:", error);
    }
  };

  // Kosár teljes ürítése
  const clearCart = async () => {
    if (!userId) return;
    try {
      await axios.delete(`http://localhost:5000/cart/${userId}`);
      setCartItems([]); // Kiürítjük a frontend oldalon is
    } catch (error) {
      console.error("Hiba a kosár törlésekor:", error);
    }
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
                <span className="product-price">{item.ar} Ft</span>

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
          <button onClick={clearCart} className="clear-cart-btn">Kosár ürítése</button>
        </>
      ) : (
        <p>A kosarad üres.</p>
      )}
    </div>
  );
};

export default Cart;
