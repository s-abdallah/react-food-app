import Button from "../UI/Button";
import Input from "../UI/Input";
import useInput from "../../hooks/use-input";
import { useRef } from "react";

const isEmpty = (value) => value.trim() !== "";
const isZip = (value) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value);

const Checkout = (props) => {
  // check validation of entered name by users.. return the value & input is valid or not.
  const nameRef = useRef();
  const {
    value: name,
    isValid: nameIsValid,
    isInValid: nameInValid,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    resetHandler: nameReset,
  } = useInput(isEmpty);

  // check validation of entered address by users.. return the value & input is valid or not.
  const addressRef = useRef();
  const {
    value: address,
    isValid: addressIsValid,
    isInValid: addressInValid,
    changeHandler: addressChangeHandler,
    blurHandler: addressBlurHandler,
    resetHandler: addressReset,
  } = useInput(isEmpty);

  // check validation of entered postal code by users.. return the value & input is valid or not.
  const zipRef = useRef();
  const {
    value: zipcode,
    isValid: zipcodeIsValid,
    isInValid: zipcodeInValid,
    changeHandler: zipcodeChangeHandler,
    blurHandler: zipcodeBlurHandler,
    resetHandler: zipcodeReset,
  } = useInput(isZip);

  // check if the inputs are valid or not.
  let checkoutValid = false;
  if (nameIsValid && addressIsValid && zipcodeIsValid) {
    checkoutValid = true;
  }

  // assign classes to the fieldset.
  const nameClasses = nameInValid ? "invalid" : "valid";
  const addressClasses = addressInValid ? "invalid" : "valid";
  const zipClasses = zipcodeInValid ? "invalid" : "valid";

  const checkoutHandler = (event) => {
    event.preventDefault();

    //  validation check on the inputs. If any of the inputs are found to be invalid, kindly halt the submission process and direct the focus towards correcting the inputs.
    if (!checkoutValid) {
      if (!nameIsValid) {
        nameRef.current.focus();
      } else if (!addressIsValid) {
        addressRef.current.focus();
      } else if (!zipcodeIsValid) {
        zipRef.current.focus();
      }
      return;
    }

    // an object that encapsulates all the information provided by the user.
    const user = {
      name: name,
      address: address,
      zipcode: zipcode,
    };

    props.onOrder(user);

    // Reset form's data...
    nameReset();
    addressReset();
    zipcodeReset();

    props.onCancel();
  };
  return (
    <div>
      <form className="checkout" onSubmit={checkoutHandler}>
        <Input
          className={nameClasses}
          input={{
            type: "text",
            id: "Fullname",
            value: name,
            ref: nameRef,
            onChange: nameChangeHandler,
            onBlur: nameBlurHandler,
            // ref: inpAmountRef,
          }}
        >
          Fullname
          {nameInValid && <p className="required"> is required</p>}
        </Input>

        <Input
          className={addressClasses}
          input={{
            type: "text",
            id: "Address",
            value: address,
            ref: addressRef,
            onChange: addressChangeHandler,
            onBlur: addressBlurHandler,
            // ref: inpAmountRef,
          }}
        >
          Address
          {addressInValid && <p className="required"> is required</p>}
        </Input>

        <Input
          className={zipClasses}
          input={{
            type: "number",
            id: "zipcode",
            pattern: "[0-9]{5}",
            value: zipcode,
            ref: zipRef,
            onChange: zipcodeChangeHandler,
            onBlur: zipcodeBlurHandler,
            // ref: inpAmountRef,
          }}
        >
          Zip Code
          {zipcodeInValid && (
            <p className="required">
              {" "}
              Zip Code must be in the format of '#####'
            </p>
          )}
        </Input>

        <fieldset className="btn-group">
          <Button className="close" onClick={props.onCancel}>
            Close
          </Button>

          <Button type="submit" className="submit">
            Checkout
          </Button>
        </fieldset>
      </form>
    </div>
  );
};

export default Checkout;
