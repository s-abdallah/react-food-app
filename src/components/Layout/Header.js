import React from "react";
import HeaderCart from "../Carts/HeaderCart";
const Header = (props) => {
  return (
    <React.Fragment>
      <header>
        <div>
          <div>
            <h1> {props.title} </h1>
          </div>

          <div>
            <HeaderCart />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
