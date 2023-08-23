import React, { useReducer } from "react";
import CartContext from "./cartcontext";

const reducerCart = (state, action) => {
  switch (action.type) {
    case "ADD":
      let newitems = [];
      const newTotal = state.total + action.item.cost * action.item.amount;

      // get the existing item index.
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingItem = state.items[existingIndex];
      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount + action.item.amount,
        };
        newitems = [...state.items];
        newitems[existingIndex] = updatedItem;
      } else {
        newitems = state.items.concat(action.item);
      }

      return { items: newitems, total: newTotal };

    case "DELETE":
        // get index of the delete item.. 
        let deletedItems = [];
        const removedIndex = state.items.findIndex( item => item.id === action.id );
        const removedItem = state.items[removedIndex];
        const newTotal2 = state.total - removedItem.cost;
        if ( removedItem.amount === 1 ) {
            deletedItems = [...state.items];
            deletedItems.splice(removedIndex, 1);
        } else {
           const removedUpdatedItem = { ...removedItem, amount: removedItem.amount - 1 };
           deletedItems = [...state.items];
           deletedItems[removedIndex] = removedUpdatedItem;
        }

      return { items: deletedItems, total: newTotal2 }
    default:
      return { items: [], total: 0 };
  }
};
const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(reducerCart, {
    items: [],
    total: 0,
  });

  const addItemHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const deleteItemHandler = (id) => {
    dispatchCart({ type: "DELETE", id: id });
  };

  const cartValue = {
    items: cartState.items,
    total: cartState.total,
    addItem: addItemHandler,
    deleteItem: deleteItemHandler,
  };
  return (
    <CartContext.Provider value={cartValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
