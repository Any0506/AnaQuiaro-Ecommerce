import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  doc,
  runTransaction,
} from "firebase/firestore";

const CheckoutForm = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "" });
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const db = getFirestore();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Solo permitir números en teléfono
    if (name === "telefono" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Tu carrito está vacío. Agrega productos antes de comprar.");
      return;
    }

    if (!formData.nombre || !formData.email || !formData.telefono) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (!/^\d+$/.test(formData.telefono)) {
      setError("El teléfono solo debe contener números.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Transacción para validar y actualizar stock
      await runTransaction(db, async (transaction) => {
        for (const item of cartItems) {
          const itemRef = doc(db, "products", item.id);
          const itemDoc = await transaction.get(itemRef);

          if (!itemDoc.exists()) {
            throw new Error(`El producto "${item.name}" no existe.`);
          }

          const stockActual = itemDoc.data().stock;

          if (stockActual < item.quantity) {
            throw new Error(`No hay suficiente stock de "${item.name}". Solo quedan ${stockActual}.`);
          }

          transaction.update(itemRef, {
            stock: stockActual - item.quantity,
          });
        }

        // Crear la orden
        const order = {
          buyer: formData,
          items: cartItems.map((item) => ({
            id: item.id,
            title: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          date: serverTimestamp(),
          total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        };

        const ordersCollection = collection(db, "orders");
        const docRef = await addDoc(ordersCollection, order);
        setOrderId(docRef.id);
        setCartItems([]);
      });
    } catch (error) {
      console.error("Error en la transacción:", error);
      setError(error.message || "Hubo un error al procesar tu compra.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div>
        <h2>¡Gracias por tu compra! 🥳</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
      </div>
    );
  }

  return (
    <div>
      <h2>Finalizar compra</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Generando orden...</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Tu teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>Confirmar compra</button>
      </form>
    </div>
  );
};

export default CheckoutForm;