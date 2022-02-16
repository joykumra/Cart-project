import { useState } from "react";

const useInput = (validateInput) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validInput = validateInput(enteredInput);
  const invalidInput = !validInput && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const blurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
    setEnteredInput("");
  };

  return {
    enteredInput,
    validInput,
    invalidInput,
    inputChangeHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
