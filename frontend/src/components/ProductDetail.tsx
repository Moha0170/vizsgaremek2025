import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/product.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  neve: string;
  ara: number;
  kat: string;
  gyarto_beszallito: string;
  kep: string;
}

interface User {
  id: number;
  neve: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URI}/market/getProduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
        window.scrollTo(0, 0); // Ugrás az oldal tetejére
      })
      .catch((err) => {
        console.error("Hiba a termék lekérésekor:", err);
        setLoading(false);
      });

    fetch(`${import.meta.env.VITE_API_URI}/market/allProducts`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => {
        console.error("Hiba a termékek lekérésekor:", err);
      });

    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");

    if (storedUserId && storedUsername) {
      const userId = parseInt(storedUserId);
      if (!isNaN(userId)) {
        setUser({ id: userId, neve: storedUsername });
      }
    }
  }, [id]);

  const addToCart = async (productId: number) => {
    if (!user) {
      toast.error("Előbb be kell jelentkezned, hogy terméket adhass a kosárhoz!");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URI}/cart/${user.id}/${productId}/1`);
      toast.success("Termék sikeresen hozzáadva a kosárhoz!");
    } catch (error) {
      console.error("Hiba a kosárhoz adáskor:", error);
      toast.error("Hiba történt a kosárhoz adás során.");
    }
  };

  const navigateToProductDetail = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (loading) return <p>Betöltés...</p>;
  if (!product) return <p>Termék nem található.</p>;

  const imageUrl = `${import.meta.env.VITE_API_URI}/images/getImg/${product.kep}`;
  const shuffledProducts = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <div className="product-detail">
      <h1>{product.neve}</h1>
      <img src={imageUrl} alt={product.neve} />
      <h2>Termék részletei</h2>
      <p>Ár: {product.ara} Ft</p>
      <p>Kategória: {product.kat}</p>
      <p>Gyártó: {product.gyarto_beszallito}</p>
      <br />
      <br />
      <br />
      <br />
      <button onClick={() => addToCart(product.id)}>Kosárba rakás</button>

      <br></br>
      <br></br>
      <section className="ajanlatok">
        <h2>További ajánlatok</h2>
        <div className="product-list">
          {shuffledProducts.map((product) => {
            const imageUrl = `${import.meta.env.VITE_API_URI}/images/getImg/${product.kep}`;

            return (
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigateToProductDetail(product.id)}
              >
                <h2>{product.neve}</h2>
                <p>Ár: {product.ara} Ft</p>
                <p>Kategória: {product.kat}</p>
                <p>Gyártó: {product.gyarto_beszallito}</p>
                <img src={imageUrl} alt={product.neve} className="product-image" />
              </div>
            );
          })}
        </div>
      </section>

      <div style={{ marginTop: "30px" }}>
        <button onClick={() => navigate("/")}>Vissza a kezdőlapra</button>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover={true}
        pauseOnFocusLoss={true}
        aria-label="toast notifications"
      />
    </div>
  );
};

export default ProductDetail;
