import React from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpeg";
import CartButton from "./CartButton";
import { useState } from "react/cjs/react.development";
import Cart from "../Cart/Cart";

const Header = (props) => {
  const [isCart, setIsCart] = useState();

  const clickHandler = () => {
    setIsCart(true);
  };

  const closeHandler = () => {
    setIsCart(false);
  };

  return (
    <React.Fragment>
      {isCart && <Cart onClose={closeHandler}></Cart>}
      <header className={classes.header}>
        <h1>React Meals</h1>
        <CartButton onClick={clickHandler}></CartButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of food"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
