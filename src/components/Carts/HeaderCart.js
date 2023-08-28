import React, { useState, useContext, useEffect } from "react";
import CartIcon from "../UI/CartIcon";
import Cart from "./Cart";
import CartContext from "../../store/cartcontext";

const HeaderCart = (props) => {
  const ctx = useContext(CartContext);
  const { items } = ctx;

  const [animated, setAnimated] = useState(false);
  const [showCart, setShowCart] = useState(null);

  useEffect( ()=> {
    if ( items.length === 0 ) {
      setAnimated(false);
      return;
    }
    setAnimated(true);
    const timer = setTimeout( ()=>{
      setAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }

  }, [items] );
  const modalHandler = (event) => {
    event.preventDefault();
    setShowCart(true);
  };
  const closeHandler = (event) => {
    event.preventDefault();
    setShowCart(false);
  };

  const initialValue = 0;
  const sumWithInitial = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, initialValue);

  const buttonClass = `${ animated ? 'animated' : '' }`;

  return (
    <React.Fragment>
      <button className={buttonClass} onClick={modalHandler}>
        <span>
          <CartIcon></CartIcon>
        </span>
        <span> Your Cart </span>
        <span> {sumWithInitial} </span>
      </button>
      {showCart && <Cart total={ctx.cost} onClose={closeHandler} />}
    </React.Fragment>
  );
};

export default HeaderCart;
