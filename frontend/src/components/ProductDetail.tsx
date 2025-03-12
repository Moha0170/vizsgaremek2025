import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  neve: string;
  ara: number;
  kat: string;
  gyarto_beszallito: string;
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
    fetch(`http://localhost:5000/market/getProduct/${id}`)
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
      await axios.post(`http://localhost:5000/cart/${user.id}/${product?.id}/1`);
      alert("Termék sikeresen hozzáadva a kosárhoz!");
    } catch (error) {
      console.error("Hiba a kosárhoz adáskor:", error);
      alert("Hiba történt a kosárhoz adás során.");
    }
  };

  if (loading) return <p>Betöltés...</p>;
  if (!product) return <p>Termék nem található.</p>;

  return (
    <div className="product-detail">
      <h1>{product.neve}</h1>
      <p>Ár: {product.ara} Ft</p>
      <p>Kategória: {product.kat}</p>
      <p>Gyártó: {product.gyarto_beszallito}</p>
      <button onClick={addToCart}>Kosárba rakás</button>
    </div>
  );
};

export default ProductDetail;
