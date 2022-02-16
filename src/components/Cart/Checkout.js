import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const hasFiveChars = (value) => value.trim().length === 5;

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const city = cityInputRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street) && hasFiveChars(street);
    const cityIsValid = !isEmpty(city);

    setFormInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
    });

    const formIsValid = nameIsValid && streetIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name,
      street,
      city,
    });
  };

  const inputClasses = (type) => {
    return `${classes.control} ${
      formInputValidity[type] ? "" : classes.invalid
    }`;
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={inputClasses("name")}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
      </div>
      {!formInputValidity.name && <p>Your name is required</p>}
      <div className={inputClasses("street")}>
        <label htmlFor="street">Street Number</label>
        <input type="text" id="street" ref={streetInputRef}></input>
      </div>
      {!formInputValidity.street && (
        <p>Your street number must be of 5 characters</p>
      )}
      <div className={inputClasses("city")}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
      </div>
      {!formInputValidity.city && <p>Your city is required</p>}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
