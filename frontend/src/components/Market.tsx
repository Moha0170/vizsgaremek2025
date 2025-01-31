import { useEffect, useState } from "react";

interface Product {
  id: number;
  neve: string;
  ara: number;
  kat: string;
  gyarto_beszallito: string;
}

function Market() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/market/allProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Hiba a termékek lekérésekor:", err));
  }, []);

  const filterByCategory = () => {
    if (!category) return;
    fetch(`http://localhost:5000/market/getProduct/${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Hiba a szűrésnél:", err));
  };

  return (
    <div className="market-container">
      <h1>Webshop</h1>
      <div>
        <input
          type="text"
          placeholder="Kategória szűrés"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={filterByCategory}>Szűrés</button>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.neve}</h2>
            <p>Ár: {product.ara} Ft</p>
            <p>Kategória: {product.kat}</p>
            <p>Gyártó: {product.gyarto_beszallito}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Market;
