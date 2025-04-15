import "../style/index.css";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Felhasználási feltételek</h1>
      <p>Üdvözöljük a Hypercharge Market webshopban! Kérjük, olvassa el figyelmesen az alábbi feltételeket.</p>
      
      <h2>1. Általános információk</h2>
      <p>A Hypercharge Market online áruház, ahol különböző termékeket vásárolhat.</p>

      <h2>2. Vásárlási feltételek</h2>
      <p>A rendelés leadásával elfogadja az alábbi feltételeket:</p>
      <ul>
        <li>A megrendelés fizetési kötelezettséggel jár.</li>
        <li>A szállítási idő a termék elérhetőségétől függ.</li>
        <li>A rendelés csak a teljes ár beérkezése után kerül feldolgozásra.</li>
        <li>Fizetés kizárólag utánvéttel történhet a futárnál történő átvételkor.</li>
        <li>
          Amennyiben a megrendelés a vevő hibájából nem jön létre (pl. hibás adatok, sikertelen átvétel),
          a sikertelen kiszállítás költsége, azaz a futár díja, a vevőt terheli.
        </li>
      </ul>

      <h2>3. Visszatérítési szabályzat</h2>
      <p>
        A vásárlók 14 napon belül visszaküldhetik a termékeket, amennyiben azok sértetlenek és eredeti csomagolásban vannak.
      </p>

      <h2>4. Kapcsolat</h2>
      <p>Ha bármilyen kérdése van, lépjen kapcsolatba velünk az ügyfélszolgálatunkon keresztül.</p>

      <button className="home-button" onClick={() => navigate("/")}>
        Vissza a kezdőlapra
      </button>
    </div>
  );
};

export default Terms;