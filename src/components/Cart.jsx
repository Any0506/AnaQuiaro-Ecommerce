import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const removeItem = (id) => {
    const confirm = window.confirm("¿Eliminar este producto del carrito?");
    if (confirm) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateQuantity = (id, newQuantity, stock) => {
    if (newQuantity < 1) return;
    if (newQuantity > stock) {
      alert(`No hay suficiente stock. Máximo disponible: ${stock}`);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2>Tu carrito está vacío 🛒</h2>;
  }

  return (
    <div>
      <h2>Tu carrito</h2>
      {cartItems.map(item => (
        <div key={item.id} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
          <h3>{item.name}</h3>
          <img src={item.image} alt={item.name} width="100" />
          <p>Precio: ${item.price}</p>
          <p>Stock disponible: {item.stock}</p>
          <input
            type="number"
            value={item.quantity}
            min="1"
            max={item.stock}
            onChange={(e) =>
              updateQuantity(item.id, Number(e.target.value), item.stock)
            }
          />
          <p>Subtotal: ${item.price * item.quantity}</p>
          <button onClick={() => removeItem(item.id)}>Eliminar</button>
        </div>
      ))}
      <h3>Total: ${total}</h3>

      <Link to="/checkout" style={{ textDecoration: "none" }}>
        <button
          style={{
            marginTop: "20px",
            backgroundColor: "#264653",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            fontWeight: "600",
            fontSize: "16px",
            transition: "background-color 0.3s ease"
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#2a9d8f"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#264653"}
        >
          Ir a pagar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "20px", height: "20px", marginLeft: "10px" }}
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default Cart;