import { useEffect, useState } from "react";
import "../style/index.css";

interface Product {
  id: number;
  neve: string;
  ara: number;
  kat: string;
  gyarto_beszallito: string;
  kep?: File;
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
    kep: undefined,
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
    const formData = new FormData();
    formData.append("id", newProduct.id ? newProduct.id.toString() : "0");
    formData.append("neve", newProduct.neve.trim());
    formData.append("ara", newProduct.ara > 0 ? newProduct.ara.toString() : "0");
    formData.append("kat", newProduct.kat.trim());
    formData.append("gyarto_beszallito", newProduct.gyarto_beszallito.trim());

    if (newProduct.kep) {
      formData.append("file", newProduct.kep);
    }

    await fetch(`${import.meta.env.VITE_API_URI}/admin/product/create/`, {
      method: "POST",
      headers: { "Authorization": localStorage.getItem("token") || "" },
      body: formData,
    });
    setNewProduct({ id: 0, neve: "", ara: 0, kat: "", gyarto_beszallito: "", kep: undefined });
    fetchProducts();
  };

  const handleEditProduct = async () => {
    if (editProduct) {
      const formData = new FormData();
      formData.append("id", editProduct.id.toString());
      formData.append("neve", editProduct.neve);
      formData.append("ara", editProduct.ara.toString());
      formData.append("kat", editProduct.kat);
      formData.append("gyarto_beszallito", editProduct.gyarto_beszallito);

      if (editProduct.kep) {
        formData.append("file", editProduct.kep);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URI}/admin/product/update/${editProduct.id}`, {
        method: "PATCH",
        headers: { "Authorization": localStorage.getItem("token") || "" },
        body: formData,
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

  const handleUploadImage = async () => {
    if (newProduct.kep) {
      const formData = new FormData();
      formData.append("file", newProduct.kep);

      const response = await fetch(`${import.meta.env.VITE_API_URI}/images/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Failed to upload image:", errorData);
      }
    } else if (editProduct?.kep) {
      const formData = new FormData();
      formData.append("file", editProduct.kep);

      const response = await fetch(`${import.meta.env.VITE_API_URI}/images/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Failed to upload image:", errorData);
      }
    } else {
      console.error("No kep selected for upload");
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setEditProduct({ ...editProduct, kep: file });
                  }
                  }}
                />
                <button onClick={() => { handleEditProduct(); handleUploadImage(); }}>Mentés</button>
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
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setNewProduct({ ...newProduct, kep: file });
              }
              }}
            />
            <button onClick={() => { handleCreateProduct(); handleUploadImage(); }}>Hozzáadás</button>
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
                      Szerkeszt
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
