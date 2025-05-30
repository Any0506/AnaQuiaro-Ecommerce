import React, { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span style={{ margin: "0 10px" }}>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={() => onAdd(count)} disabled={stock === 0}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;