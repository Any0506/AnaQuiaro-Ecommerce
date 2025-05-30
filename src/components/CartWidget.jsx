import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./CartWidget.css";

const CartWidget = () => {
  const { getTotalQuantity } = useContext(CartContext);

  return (
    <div className="cart-widget">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="cart-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.3a1 1 0 001 1.2h12a1 1 0 001-1.2L17 13M7 13H3"
        />
      </svg>
      {getTotalQuantity() > 0 && (
        <span className="cart-count">{getTotalQuantity()}</span>
      )}
    </div>
  );
};

export default CartWidget;
