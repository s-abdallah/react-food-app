import React, {useContext} from "react";
import MealAdd from "./MealAdd";
import CartContext from "../../store/cartcontext";

const MealList = (props) => {

  const ctx = useContext(CartContext);

  const cost = `$${props.cost.toFixed(2)}`;

  const onAddToCart = amount => {
    ctx.addItem({
      id:props.id,
      title:props.title,
      cost:props.cost,
      amount: amount
    })
  }

  return (
    <li>
      <ul>
        <li>
          <h3> {props.title} </h3>
          <p> {props.excerpt} </p>
          <strong> {cost} </strong>
        </li>
        <li>
          <MealAdd id={props.id} onAddToCart={onAddToCart} />
        </li>
      </ul>
    </li>
  );
};

export default MealList;
