import React, { useState, useRef } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

const MealAdd = (props) => {
  const inpAmountRef = useRef();

  const [isValid, setIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const currentAmount = inpAmountRef.current.value;
    const numAmount = +currentAmount;
    if (currentAmount.trim().length === 0 || numAmount > 5 || numAmount === 0) {
      setIsValid(false);
      return;
    }
    props.onAddToCart(numAmount);
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <Input
          className="amount"
          input={{
            type: "number",
            id: "Amount-" + props.id,
            className: "amount",
            step: 1,
            min: 1,
            max: 5,
            defaultValue: 1,
            ref: inpAmountRef,
          }}
        >
          Amount
        </Input>
        <Button type="submit" id={props.id} className="submit">
          + Add
        </Button>
        {!isValid && <p>enter amount in 1 to 5</p>}
      </form>
    </React.Fragment>
  );
};

export default MealAdd;
