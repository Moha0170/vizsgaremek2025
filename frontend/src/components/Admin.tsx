import { useEffect, useState } from "react";
import "../style/index.css";

interface Product {
  id: number;
  neve: string;
  ara: number;
  kat: string;
  gyarto_beszallito: string;
}

function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    neve: "",
    ara: 0,
    kat: "",
    gyarto_beszallito: "",
  });
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/market/allProducts");
    const data = await res.json();
    setProducts(data);
  };

  const handleDeleteProduct = async (id: number) => {
    await fetch(`http://localhost:5000/admin/product/delete/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  const handleCreateProduct = async () => {
    await fetch("http://localhost:5000/admin/product/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({ id: 0, neve: "", ara: 0, kat: "", gyarto_beszallito: "" });
    fetchProducts();
  };

  const handleEditProduct = async () => {
    if (editProduct) {
      await fetch(`http://localhost:5000/admin/product/update/${editProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduct),
      });
      setEditProduct(null);
      fetchProducts();
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>

      <h3>Termékek</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Név</th>
            <th>Ár</th>
            <th>Kategória</th>
            <th>Gyártó</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.neve}</td>
              <td>{product.ara} Ft</td>
              <td>{product.kat}</td>
              <td>{product.gyarto_beszallito}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Törlés
                </button>
                <button
                  className="edit-button"
                  onClick={() => setEditProduct(product)}
                >
                  Szerkesztés
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Új termék hozzáadása</h3>
      <div className="product-form">
        <input
          type="text"
          placeholder="Név"
          value={newProduct.neve}
          onChange={(e) => setNewProduct({ ...newProduct, neve: e.target.value })}
        />
        <input
          type="number"
          placeholder="Ár"
          value={newProduct.ara}
          onChange={(e) => setNewProduct({ ...newProduct, ara: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Kategória"
          value={newProduct.kat}
          onChange={(e) => setNewProduct({ ...newProduct, kat: e.target.value })}
        />
        <input
          type="text"
          placeholder="Gyártó"
          value={newProduct.gyarto_beszallito}
          onChange={(e) => setNewProduct({ ...newProduct, gyarto_beszallito: e.target.value })}
        />
        <button onClick={handleCreateProduct}>Hozzáadás</button>
      </div>

      {editProduct && (
        <>
          <h3>Termék szerkesztése</h3>
          <div className="product-form">
            <input
              type="text"
              value={editProduct.neve}
              onChange={(e) => setEditProduct({ ...editProduct, neve: e.target.value })}
            />
            <input
              type="number"
              value={editProduct.ara}
              onChange={(e) => setEditProduct({ ...editProduct, ara: Number(e.target.value) })}
            />
            <input
              type="text"
              value={editProduct.kat}
              onChange={(e) => setEditProduct({ ...editProduct, kat: e.target.value })}
            />
            <input
              type="text"
              value={editProduct.gyarto_beszallito}
              onChange={(e) => setEditProduct({ ...editProduct, gyarto_beszallito: e.target.value })}
            />
            <button onClick={handleEditProduct}>Mentés</button>
            <button onClick={() => setEditProduct(null)}>Mégse</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Admin;
