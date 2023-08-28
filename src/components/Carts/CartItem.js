import React from "react";
import Button from "../UI/Button";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (event) => {
    event.preventDefault();
    props.onAdd();
  };

  const removeFromCartHandler = (event) => {
    event.preventDefault();
    props.onDelete(props.id);
  };

  return (
    <tr>
      <td>
        <h4> {props.title} </h4>
        <h5>
          {price} <span> x {props.amount} </span>
        </h5>
      </td>
      <td>
        <Button className="btn-cart" onClick={removeFromCartHandler}>
          -
        </Button>
        <Button className="btn-cart" onClick={addToCartHandler}>
          +
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
