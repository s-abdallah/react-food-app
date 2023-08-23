import React from "react";
import styles from "./Input.module.css";

const Input = React.forwardRef((props, ref) => (
  <fieldset className={styles[props.className]}>
    <label htmlFor={props.input.id}> {props.children} </label>
    <input ref={ref} {...props.input} />
  </fieldset>
));

export default Input;
