import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../style/product.css";

interface Product {
  id: number;
  neve: string;
  ara: number;
  kat: string;
  gyarto_beszallito: string;
  kep: string; // Assuming the product data includes a kep for the image
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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URI}/market/getProduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hiba a termék lekérésekor:", err);
        setLoading(false);
      });

    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    
    if (storedUserId && storedUsername) {
      const userId = parseInt(storedUserId);
      if (!isNaN(userId)) {
        setUser({ id: userId, neve: storedUsername });
      } else {
        console.error("Érvénytelen userId:", storedUserId);
      }
    }
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      alert("Előbb be kell jelentkezned, hogy terméket adhass a kosárhoz!");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URI}/cart/${user.id}/${product?.id}/1`);
      alert("Termék sikeresen hozzáadva a kosárhoz!");
    } catch (error) {
      console.error("Hiba a kosárhoz adáskor:", error);
      alert("Hiba történt a kosárhoz adás során.");
    }
  };

  if (loading) return <p>Betöltés...</p>;
  if (!product) return <p>Termék nem található.</p>;

  // Construct the image URL using the kep
  const imageUrl = `${import.meta.env.VITE_API_URI}/images/getImg/${product.kep}`;

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
      <button onClick={addToCart}>Kosárba rakás</button>
    </div>
  );
};

export default ProductDetail;
