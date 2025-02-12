import { useEffect, useState } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({ neve: "", ara: "", kat: "", gyarto_beszallito: "" });

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleDeleteProduct = async (id) => {
    await fetch(`http://localhost:5000/admin/product/delete/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleCreateProduct = async () => {
    await fetch("http://localhost:5000/admin/product/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({ neve: "", ara: "", kat: "", gyarto_beszallito: "" });
    fetchProducts();
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      
      <h3>Termékek</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.neve} - {product.ara} Ft
            <button onClick={() => handleDeleteProduct(product.id)}>Törlés</button>
          </li>
        ))}
      </ul>

      <h3>Új termék hozzáadása</h3>
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
        onChange={(e) => setNewProduct({ ...newProduct, ara: e.target.value })}
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

      <h3>Felhasználók</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.neve} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
