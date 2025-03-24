import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/index.css";
import "../style/kezdooldal.css";
import axios from "axios";

interface Product {
  id: number;
  neve: string;
  ara: number;
  kat: string;
  gyarto_beszallito: string;
}

const Kezdooldal = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/market/allProducts")
      .then((response) => {
        setAllProducts(response.data);
        const shuffled = [...response.data].sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 4));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hiba a termékek lekérésekor:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Betöltés...</p>;

  return (
    <div className="kezdooldal-container">
      <h1>Üdvözlünk a webáruházunkban!</h1>

      <section className="ajanlatok">
        <h2>🎉 Időszakos ajánlataink</h2>
        <div className="product-list">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.neve}</h3>
              <p>Ár: {product.ara} Ft</p>
              <Link to={`/products/${product.id}`}>
                <button>Megnézem</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="termekek">
        <h2>🛍️ Böngéssz termékeink között</h2>
        <div className="product-list">
          {allProducts.slice(0, 6).map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.neve}</h3>
              <p>Ár: {product.ara} Ft</p>
              <Link to={`/products/${product.id}`}>
                <button>Megnézem</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {}
      <section className="info-section">
        <h2>📢 Tudj meg többet rólunk!</h2>
        <p>Vásárlási feltételek, kapcsolatfelvétel és további információk:</p>
        <div className="info-links">
          <Link to="/contact">Kapcsolat</Link>
          <Link to="/about">Rólunk</Link>
          <Link to="/terms">Általános szerződési feltételek</Link>
        </div>
      </section>
    </div>
  );
};

export default Kezdooldal;
