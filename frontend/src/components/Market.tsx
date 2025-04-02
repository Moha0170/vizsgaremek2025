import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function Market() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URI}/market/allProducts`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error("Hiba a termékek lekérésekor:", err));
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");

    if (storedUserId && storedUsername) {
      const userId = parseInt(storedUserId);
      if (!isNaN(userId)) {
        setUser({ id: userId, neve: storedUsername });
      }
    }
  }, []);

  useEffect(() => {
    let filtered = allProducts.filter((product) =>
      product.kat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.neve.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.gyarto_beszallito.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "priceAsc") {
      filtered.sort((a, b) => a.ara - b.ara);
    } else if (sortOption === "priceDesc") {
      filtered.sort((a, b) => b.ara - a.ara);
    } else if (sortOption === "nameAsc") {
      filtered.sort((a, b) => a.neve.localeCompare(b.neve));
    } else if (sortOption === "nameDesc") {
      filtered.sort((a, b) => b.neve.localeCompare(a.neve));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, sortOption, allProducts]);

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

  return (
    <div className="market-container">
      <h1>Market</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Szűrés név, kategória vagy gyártó alapján"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Nincs rendezés</option>
          <option value="priceAsc">Ár szerint növekvő</option>
          <option value="priceDesc">Ár szerint csökkenő</option>
          <option value="nameAsc">Név szerint A-Z</option>
          <option value="nameDesc">Név szerint Z-A</option>
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card" onClick={() => navigateToProductDetail(product.id)}>
              <h2>{product.neve}</h2>
              <p>Ár: {product.ara} Ft</p>
              <p>Kategória: {product.kat}</p>
              <p>Gyártó: {product.gyarto_beszallito}</p>
              <button onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}>
                Kosárba rakás
              </button>
            </div>
          ))
        ) : (
          <p>Nincs találat.</p>
        )}
      </div>

      {}
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
}

export default Market;
