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
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem("isAdmin") === "true";
  });
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
    const res = await fetch(`${import.meta.env.VITE_API_URI}/market/allProducts`);
    const data = await res.json();
    setProducts(data);
  };

  const handleDeleteProduct = async (id: number) => {
    await fetch(`${import.meta.env.VITE_API_URI}/admin/product/delete/${id}`, {
      method: "DELETE",
      headers: { "Authorization": localStorage.getItem("token") || "" },
    });
    fetchProducts();
  };

  const handleCreateProduct = async () => {
    await fetch(`${import.meta.env.VITE_API_URI}/admin/product/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("token") || "" },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({ id: 0, neve: "", ara: 0, kat: "", gyarto_beszallito: "" });
    fetchProducts();
  };

  const handleEditProduct = async () => {
    if (editProduct) {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/admin/product/update/${editProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": localStorage.getItem("token") || "" },
        body: JSON.stringify(editProduct),
      });

      if (response.status === 401) {
        const message = await response.json();
        console.log(message);
      } else {
        setEditProduct(null);
        fetchProducts();
      }
    }
  };

  const handleEditClick = (product: Product) => {
    setEditProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="admin-container">
      {isAdmin ? (
        <>
          <h2>Admin Panel</h2>
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
                      onClick={() => handleEditClick(product)}
                    >
                      Szerkesztés
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <h2>Nincs jogosultságod az adminisztrációs felülethez</h2>
      )}
    </div>
  );
}

export default Admin;
