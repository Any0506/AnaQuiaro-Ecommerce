import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product, quantityToAdd) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantityToAdd;

        if (newQuantity > product.stock) {
          alert(`No hay suficiente stock disponible. Máximo: ${product.stock}`);
          return prevCart;
        }

        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        if (quantityToAdd > product.stock) {
          alert(`No hay suficiente stock disponible. Máximo: ${product.stock}`);
          return prevCart;
        }

        return [...prevCart, { ...product, quantity: quantityToAdd }];
      }
    });
  };

  const getTotalQuantity = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // ✅ Este return debe estar **dentro del componente**
  return (
    <CartContext.Provider
      value={{ cartItems, addItem, getTotalQuantity, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};