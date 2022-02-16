import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input/Input";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const amount = amountInputRef.current.value;
    const amountInNum = +amount;

    if (amount.trim().length === 0 || amountInNum < 1 || amountInNum > 5) {
      setAmountIsValid(false);
      return;
    } else {
      setAmountIsValid(true);
    }

    props.onAddToCart(amountInNum);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        input={{
          id: Math.random().toString(),
          type: "number",
          min: 1,
          max: 5,
          step: 1,
        }}
        label="Amount"
        amountInputRef={amountInputRef}
      ></Input>
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please Enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
