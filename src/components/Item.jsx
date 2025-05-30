import React from "react";
import { Link } from "react-router-dom";

const Item = ({ producto }) => {
  return (
    <div className="item-card">
      <img src={producto.image} alt={producto.name} />
      <h3>{producto.name}</h3>
      <p>${producto.price}</p>
      <Link to={`/producto/${producto.id}`}>Ver detalle</Link>
    </div>
  );
};

export default Item;