import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Overlay = (props) => {
  return <div className={props.className} onClick={props.onAction}></div>;
};

const Content = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

const Modal = (props) => {

  const cartElement = document.getElementById("cart-root");
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Overlay className={styles["modal-bg"]} onAction={props.onClose} />,
        cartElement
      )}

      {ReactDOM.createPortal(
        <Content className={styles.modal} title={props.title} data={props.data} > {props.children}</Content>,
        cartElement
      )}
    </React.Fragment>
  );
};

export default Modal;
