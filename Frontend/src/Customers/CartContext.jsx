import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };
  const clearCart = () => {
    setCart([]);
  };
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      const priceAfterDiscount =
        product.price - product.price * (product.discount / 100);
      return total + priceAfterDiscount;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, calculateTotalPrice, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
