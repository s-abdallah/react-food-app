import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import styles from "./Cart.module.css";
import CartContext from "../../store/cartcontext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useFetch from "../../hooks/use-fetch";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const cartTotal = `$${ctx.total.toFixed(2)}`;
  const [checkout, setCheckout] = useState(false);

  const addToCartHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const deleteFromCartHandler = (id) => {
    ctx.deleteItem(id);
  };

  const cartItem = ctx.items.map((item) => {
    return (
      <CartItem
        key={item.id}
        title={item.title}
        amount={item.amount}
        price={item.price}
        id={item.id}
        onDelete={deleteFromCartHandler.bind(null, item.id)}
        onAdd={addToCartHandler.bind(null, item)}
      />
    );
  });

  const checkoutHandler = (event) => {
    event.preventDefault();
    setCheckout(true);
  };

  const cancelCheckout = (event) => {
    setCheckout(false);
  };

  let cartAction = "";
  cartAction = (
    <React.Fragment>
      <tr>
        <td colSpan={2}>
          <Button className="close" onClick={props.onClose}>
            Close
          </Button>
          {ctx.items.length !== 0 && (
            <Button className="checkout" onClick={checkoutHandler}>
              Checkout
            </Button>
          )}
        </td>
      </tr>
    </React.Fragment>
  );

  const { loading, error, connectHTTP: orderHTTP } = useFetch();

  const orderHandler = (user) => {
    const order = ctx.items.map(
      (item) =>
        " && (" +
        item.amount +
        "): " +
        item.title +
        " --- price each: $" +
        item.price +
        " && "
    );

    const newOrder = {
      ...user,
      order: order,
      total: cartTotal,
    };

    const orderCallback = (x, obj) => {
      if (obj.name) {
        ctx.clearItems();
        x();
      }
    };

    orderHTTP(
      {
        url: "??",
        method: "POST",
        body: newOrder,
        headers: { "Content-Type": "application/json" },
      },
      orderCallback.bind(null, props.onClose)
    );
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
        <tbody>{cartItem}</tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
              <h5> Total : {cartTotal} </h5>
            </td>
          </tr>

          {(!checkout || ctx.items.length === 0) && cartAction}
        </tfoot>
      </table>

      {checkout && ctx.items.length !== 0 && (
        <Checkout onCancel={cancelCheckout} onOrder={orderHandler} />
      )}

      {loading && <p className="loading">Checkout...</p>}
      {error && <p className="error">{error}</p>}
    </Modal>
  );
};

export default Cart;
