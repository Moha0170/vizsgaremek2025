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
  const [orszag, setOrszag] = useState("");
  const [iranyitoszam, setIranyitoszam] = useState("");
  const [varos, setVaros] = useState("");
  const [kozterulet, setKozterulet] = useState("");
  const [kozteruletJellege, setKozteruletJellege] = useState("");
  const [hazszam, setHazszam] = useState("");
  const [kupon, setKupon] = useState("");
  const [message, setMessage] = useState("");
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
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/cart/${id}`);
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
 
  const validateCoupon = async () => {
    if (!kupon) return;
 
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URI}/coupon/${kupon}`);
      if (response.status === 200) {
        const discount = response.data[0].ertek;
        switch (discount) {
          case "10":
            setMessage("10% kedvezményre feljogosító kuponkód!");
            break;
          case "20":
            setMessage("20% kedvezményre feljogosító kuponkód!");
            break;
          case "50":
            setMessage("50% kedvezményre feljogosító kuponkód!");
            break;
          case "1000":
            setMessage("1000Ft kedvezményre feljogosító kuponkód!");
            break;
          case "ingyen":
            setMessage("Ingyenes szállításra feljogosító kuponkód!");
            break;
          default:
            setMessage("Ismeretlen kuponkód!");
            break;
        }
      } else {
        setMessage("Érvénytelen kuponkód!");
      }
    } catch (error) {
      setMessage("Hiba történt a kupon ellenőrzésekor!");
    }
  };
 
  const clearCart = async () => {
    if (!userId) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URI}/cart/${userId}`);
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error("Hiba a kosár törlésekor:", error);
    }
  };
 
  const completePurchase = async () => {
    if (!userId || cartItems.length === 0) {
      setMessage("A kosár üres vagy nincs bejelentkezve!");
      return;
    }
 
    if (!orszag || !iranyitoszam || !varos || !kozterulet || !kozteruletJellege || !hazszam) {
      setMessage("Minden mező kitöltése kötelező!");
      return;
    }
 
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/orders/createOrderFromCart/${userId}`,
        {
          orszag,
          iranyitoszam,
          varos,
          kozterulet,
          kozterulet_jellege: kozteruletJellege,
          hazszam,
          kupon,
        }
      );
 
      if (response.status === 200) {
        localStorage.removeItem("cartItems");
        clearCart();
        navigate("/orders");
        setMessage("Rendelés sikeresen leadva!");
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      console.error("Hiba a vásárlás során:", error);
      setMessage("Hiba történt a rendelés során!");
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
          <div className="btn-wrapper">
            <input type="text" placeholder="Ország" value={orszag} onChange={(e) => setOrszag(e.target.value)} />
            <input type="text" placeholder="Irányítószám" value={iranyitoszam} onChange={(e) => setIranyitoszam(e.target.value)} />
            <input type="text" placeholder="Város" value={varos} onChange={(e) => setVaros(e.target.value)} />
            <input type="text" placeholder="Közterület" value={kozterulet} onChange={(e) => setKozterulet(e.target.value)} />
            <input type="text" placeholder="Közterület jellege" value={kozteruletJellege} onChange={(e) => setKozteruletJellege(e.target.value)} />
            <input type="text" placeholder="Házszám" value={hazszam} onChange={(e) => setHazszam(e.target.value)} />
          </div>
          <input type="text" className="coupon-inp" placeholder="Kuponkód (opcionális)" value={kupon} onChange={(e) => setKupon(e.target.value)} />
          <button onClick={validateCoupon} className="coupon-check">Kupon ellenőrzése</button>
          <button onClick={completePurchase} className="complete-btn">Vásárlás befejezése</button>
          <Link to="/orders" className="orders-link">Korábbi rendeléseim</Link>
        </>
      ) : (
        <p>Nincsenek termékek a vásárláshoz.</p>
      )}
 
      {message && <p>{message}</p>}
    </div>
  );
};
 
export default Transaction;
 