import React from "react";
const CartContext = React.createContext({
  items: [],
  total: 0,
  addItem: (item) => {},
  deleteItem: (id) => {},
  clearItems: () => {},
});

export default CartContext;
