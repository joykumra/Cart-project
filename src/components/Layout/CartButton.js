import React, { useContext, useEffect, useState } from "react";
import classes from "./CartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const CartButton = (props) => {
  const [isBtnAnimated, setIsButtonAnimated] = useState(false);
  // the header cart button component will be a re evaluated by react whenever the context changes.
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((prevNum, item) => {
    return prevNum + item.amount;
  }, 0);

  const buttonClasses = `${classes.button}  ${isBtnAnimated && classes.bump}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsButtonAnimated(true);

    const timer = setTimeout(() => {
      setIsButtonAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
