import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style/transaction.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
        let messageText = "";
        switch (discount) {
          case "10":
            messageText = "10% kedvezményre feljogosító kuponkód!";
            break;
          case "20":
            messageText = "20% kedvezményre feljogosító kuponkód!";
            break;
          case "50":
            messageText = "50% kedvezményre feljogosító kuponkód!";
            break;
          case "1000":
            messageText = "1000Ft kedvezményre feljogosító kuponkód!";
            break;
          case "ingyen":
            messageText = "Ingyenes szállításra feljogosító kuponkód!";
            break;
          default:
            messageText = "Ismeretlen kuponkód!";
        }
        toast.success(messageText);
      } else {
        toast.error("Érvénytelen kuponkód!");
      }
    } catch (error) {
      toast.error("Hiba történt a kupon ellenőrzésekor!");
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

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!/^[A-Za-zÁ-űáéíóöőúüű\s]+$/.test(orszag)) newErrors.orszag = "Az ország csak betűket tartalmazhat!";
    if (!/^\d+$/.test(iranyitoszam)) newErrors.iranyitoszam = "Az irányítószám csak számokat tartalmazhat!";
    if (!/^[A-Za-zÁ-űáéíóöőúüű\s]+$/.test(varos)) newErrors.varos = "A város csak betűket tartalmazhat!";
    if (!/^[A-Za-zÁ-űáéíóöőúüű\s]+$/.test(kozterulet)) newErrors.kozterulet = "A közterület csak betűket tartalmazhat!";
    if (!/^[A-Za-zÁ-űáéíóöőúüű\s]+$/.test(kozteruletJellege)) newErrors.kozteruletJellege = "A közterület jellege csak betűket tartalmazhat!";
    if (!/^\d+$/.test(hazszam)) newErrors.hazszam = "A házszám csak számokat tartalmazhat!";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const completePurchase = async () => {
    if (!userId || cartItems.length === 0) {
      toast.error("A kosár üres vagy nincs bejelentkezve!");
      return;
    }

    if (!validateInputs()) {
      toast.error("Kérlek javítsd a hibákat a mezőkben!");
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
        toast.success("Rendelés sikeresen leadva!");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.error("Hiba a vásárlás során:", error);
      toast.error("Hiba történt a rendelés során!");
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
            <div>Az áraink 1999 Forint szállítási díjat tartalmaznak.</div>
          </div>
          <div className="total-price">Összesen: {totalPrice} Ft</div>
          <div className="btn-wrapper">
            <div>
              <p>Oszág:</p>
              <input type="text" placeholder="Ország" value={orszag} onChange={(e) => setOrszag(e.target.value)} />
              {errors.orszag && <p className="error-message">{errors.orszag}</p>}
            </div>
    
            <div>
            <p>Irányítószám:</p>
              <input type="text" placeholder="Irányítószám" value={iranyitoszam} onChange={(e) => setIranyitoszam(e.target.value)} />
              {errors.iranyitoszam && <p className="error-message">{errors.iranyitoszam}</p>}
            </div>
    
            <div>
            <p>Város:</p>
              <input type="text" placeholder="Város" value={varos} onChange={(e) => setVaros(e.target.value)} />
              {errors.varos && <p className="error-message">{errors.varos}</p>}
            </div>

            <div>
            <p>Közterület:</p>
              <input type="text" placeholder="Közterület" value={kozterulet} onChange={(e) => setKozterulet(e.target.value)} />
              {errors.kozterulet && <p className="error-message">{errors.kozterulet}</p>}
            </div>

            <div>
            <p>Közterület jellege:</p>
              <input type="text" placeholder="Közterület jellege" value={kozteruletJellege} onChange={(e) => setKozteruletJellege(e.target.value)} />
              {errors.kozteruletJellege && <p className="error-message">{errors.kozteruletJellege}</p>}
            </div>
      
            <div>
            <p>Házszám:</p>
              <input type="text" placeholder="Házszám" value={hazszam} onChange={(e) => setHazszam(e.target.value)} />
              {errors.hazszam && <p className="error-message">{errors.hazszam}</p>}
            </div>

            <div>
            <p>Fizetési mód:</p>
            <input type="text" value="Utánvét: készépnz vagy bankkártya" disabled className="form-input" />
            </div>
          <br></br>
          </div>
          <input type="text" className="coupon-inp" placeholder="Kuponkód (opcionális)" value={kupon} onChange={(e) => setKupon(e.target.value)} />
          <button onClick={validateCoupon} className="coupon-check">Kupon ellenőrzése</button>
          <button onClick={completePurchase} className="complete-btn">Vásárlás befejezése</button>
          <Link to="/orders" className="orders-link">Korábbi rendeléseim</Link>
        </>
      ) : (
        <p>Nincsenek termékek a vásárláshoz.</p>
      )}

    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={true}
        pauseOnFocusLoss={true}
        aria-label="toast notifications"
        theme="colored"
      />
    </div>
  );
};

export default Transaction;
