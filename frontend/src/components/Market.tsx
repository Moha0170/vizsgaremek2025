import { useEffect, useState } from "react";
import "../index.css";

interface Product {
  id: number;
  neve: string;
  ara: number;
  kat: string;
  gyarto_beszallito: string;
}

function Market() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/market/allProducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error("Hiba a termékek lekérésekor:", err));
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

  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, "<span class='highlight'>$1</span>");
  };

  return (
    <div className="market-container">
      <h1>Webshop</h1>
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
            <div key={product.id} className="product-card">
              <h2 dangerouslySetInnerHTML={{ __html: highlightText(product.neve) }}></h2>
              <p>Ár: {product.ara} Ft</p>
              <p>Kategória: <span dangerouslySetInnerHTML={{ __html: highlightText(product.kat) }}></span></p>
              <p>Gyártó: <span dangerouslySetInnerHTML={{ __html: highlightText(product.gyarto_beszallito) }}></span></p>
            </div>
          ))
        ) : (
          <p>Nincs találat.</p>
        )}
      </div>
    </div>
  );
}

export default Market;
