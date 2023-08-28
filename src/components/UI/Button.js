import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      id={props.id}
      onClick={props.onClick}
      className={props.className + " " + styles.btn}
      type={props.type || "button"}
    >
      {props.children}
    </button>
  );
};

export default Button;
