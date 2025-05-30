import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useContext(CartContext);

  if (!product) return <p>Cargando producto...</p>;
  if (product.stock === 0) return <p>Producto sin stock</p>;

  const handleAddToCart = () => {
    if (quantity <= product.stock && quantity > 0) {
      addItem(product, quantity);
      alert(`${quantity} unidades añadidas al carrito`);
    } else {
      alert(`La cantidad debe estar entre 1 y ${product.stock}`);
    }
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value > product.stock) {
      setQuantity(product.stock);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width={200} />
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock disponible: {product.stock}</p>

      <input
        type="number"
        min="1"
        max={product.stock}
        value={quantity}
        onChange={handleQuantityChange}
      />
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
};

export default ItemDetail;