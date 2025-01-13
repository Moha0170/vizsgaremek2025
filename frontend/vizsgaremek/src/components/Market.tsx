import { useState } from "react";

function Market(){
    const fruits = [
        {
          id: 1,
          name: "Alma",
          price: 300,
          image: "https://via.placeholder.com/150?text=Alma",
        },
        {
          id: 2,
          name: "Banán",
          price: 250,
          image: "https://via.placeholder.com/150?text=Banán",
        },
        {
          id: 3,
          name: "Körte",
          price: 350,
          image: "https://via.placeholder.com/150?text=Körte",
        },
        {
          id: 4,
          name: "Szőlő",
          price: 450,
          image: "https://via.placeholder.com/150?text=Szőlő",
        },
      ];
      
      const vegetables = [
        {
          id: 5,
          name: "Paradicsom",
          price: 200,
          image: "https://via.placeholder.com/150?text=Paradicsom",
        },
        {
          id: 6,
          name: "Uborka",
          price: 150,
          image: "https://via.placeholder.com/150?text=Uborka",
        },
        {
          id: 7,
          name: "Paprika",
          price: 300,
          image: "https://via.placeholder.com/150?text=Paprika",
        },
        {
          id: 8,
          name: "Cukkini",
          price: 400,
          image: "https://via.placeholder.com/150?text=Cukkini",
        },
      ];
      
      const dairy = [
        {
          id: 9,
          name: "Tej",
          price: 150,
          image: "https://via.placeholder.com/150?text=Tej",
        },
        {
          id: 10,
          name: "Sajt",
          price: 500,
          image: "https://via.placeholder.com/150?text=Sajt",
        },
        {
          id: 11,
          name: "Joghurt",
          price: 120,
          image: "https://via.placeholder.com/150?text=Joghurt",
        },
        {
          id: 12,
          name: "Tejföl",
          price: 250,
          image: "https://via.placeholder.com/150?text=Tejföl",
        },
      ];
      
        const [cart, setCart] = useState<{ id: number; quantity: number }[]>([]);
      
        const addToCart = (productId: number) => {
          setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === productId);
            if (existingProduct) {
              return prevCart.map((item) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            }
            return [...prevCart, { id: productId, quantity: 1 }];
          });
        };
      
        const removeFromCart = (productId: number) => {
          setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        };
      
        const calculateTotal = () => {
          return cart.reduce((total, item) => {
            const product = [...fruits, ...vegetables, ...dairy].find(
              (p) => p.id === item.id
            );
            return total + (product ? product.price * item.quantity : 0);
          }, 0);
        };

        return (
          <div className="market">
            <header className="header">
              <h1>Szupermarket Webshop</h1>
            </header>
            <main className="main-content">
              <div className="section">
                <h2>Gyümölcsök</h2>
                <div className="products">
                  {fruits.map((product) => (
                    <div key={product.id} className="product">
                      <img src={product.image} alt={product.name} />
                      <h3>{product.name}</h3>
                      <p>{product.price} Ft</p>
                      <button onClick={() => addToCart(product.id)}>Kosárba</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="section">
                <h2>Zöldségek</h2>
                <div className="products">
                  {vegetables.map((product) => (
                    <div key={product.id} className="product">
                      <img src={product.image} alt={product.name} />
                      <h3>{product.name}</h3>
                      <p>{product.price} Ft</p>
                      <button onClick={() => addToCart(product.id)}>Kosárba</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="section">
                <h2>Tejtermékek</h2>
                <div className="products">
                  {dairy.map((product) => (
                    <div key={product.id} className="product">
                      <img src={product.image} alt={product.name} />
                      <h3>{product.name}</h3>
                      <p>{product.price} Ft</p>
                      <button onClick={() => addToCart(product.id)}>Kosárba</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cart">
                <h2>Kosár</h2>
                {cart.length === 0 ? (
                  <p>A kosár üres</p>
                ) : (
                  <ul>
                    {cart.map((item) => {
                      const product = [...fruits, ...vegetables, ...dairy].find(
                        (p) => p.id === item.id
                      );
                      return product ? (
                        <li key={item.id}>
                          {product.name} x{item.quantity}
                          <button onClick={() => removeFromCart(item.id)}>
                            Eltávolítás
                          </button>
                        </li>
                      ) : null;
                    })}
                  </ul>
                )}
                <div className="total">
                  <strong>Összesen: {calculateTotal()} Ft</strong>
                </div>
              </div>
            </main>
          </div>
        );
      

}



export default Market;
