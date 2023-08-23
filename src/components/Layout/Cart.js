import React, { useContext } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import styles from "./Cart.module.css";
import CartContext from "../../store/cartcontext";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const cartTotal = `$${ctx.total.toFixed(2)}`;

  const addToCartHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const deleteFromCartHandler = (id) => {
    ctx.deleteItem(id);
  };

  return (
    <Modal onClose={props.onClose}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th colSpan={2}>
              <h4> Your Cart </h4>
            </th>
          </tr>
        </thead>
        <tbody>
          {ctx.items.map((item) => {
            return (
              <CartItem
                key={item.id}
                title={item.title}
                amount={item.amount}
                cost={item.cost}
                id={item.id}
                onDelete={deleteFromCartHandler.bind(null, item.id)}
                onAdd={addToCartHandler.bind(null, item)}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <h5> Total : {cartTotal} </h5>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button className="close" onClick={props.onClose}>
                Close
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </Modal>
  );
};

export default Cart;
