import { useState } from "react";

const useInput = (validation) => {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = validation(value);
  const isInValid = touched && !isValid;

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  const blurHandler = (event) => {
    setTouched(true);
  };

  const resetHandler = () => {
    setValue("");
    setTouched(false);
  };

  return {
    value,
    isValid,
    isInValid,
    changeHandler,
    blurHandler,
    resetHandler,
  };
};

export default useInput;
