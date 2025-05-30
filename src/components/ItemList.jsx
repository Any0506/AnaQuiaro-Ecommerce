import React from "react";
import Item from "./Item";
import "./ItemList.css";  // Importamos estilos

const ItemList = ({ productos }) => {
  return (
    <div className="item-list-grid">
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  );
};

export default ItemList;