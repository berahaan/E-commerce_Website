// EmailContext.js
import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext();
export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState("");
  const AddOrderId = (orderId) => {
    setOrder((prevCart) => [...prevCart, orderId]);
    console.log("OrderId is here in context:: ", orderId);
  };

  return (
    <OrderContext.Provider value={{ order, AddOrderId }}>
      {children}
    </OrderContext.Provider>
  );
};
