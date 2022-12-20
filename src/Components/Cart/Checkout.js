import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const invalidInput = (value) => value.trim() !== "";
  const numberLength = (value) => value.trim().length === 6;

  const nameInputref = useRef();
  const streetInputref = useRef();
  const postalInputref = useRef();
  const cityInputref = useRef();
  const [fromInputValid, setFormInputValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputref.current.value;
    const enteredstreet = streetInputref.current.value;
    const enteredPostal = postalInputref.current.value;
    const enteredCity = cityInputref.current.value;
    props.onConfirm({
      name: enteredName,
      street: enteredstreet,
      postal: enteredPostal,
      city: enteredCity,
    });

    const enteredNameValidate = invalidInput(enteredName);
    const enteredStreetValidate = invalidInput(enteredstreet);
    const enteredCityValidate = invalidInput(enteredCity);
    const enteredPostalValidate = numberLength(enteredPostal);

    setFormInputValid({
      name: enteredNameValidate,
      street: enteredStreetValidate,
      postal: enteredPostalValidate,
      city: enteredCityValidate,
    });
    const formIsValid =
      enteredNameValidate &&
      enteredStreetValidate &&
      enteredCityValidate &&
      enteredPostalValidate;
    if (!formIsValid) {
      return;
    }
  };

  const nameClasses = `${classes.control} ${
    fromInputValid.name ? "" : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    fromInputValid.street ? "" : classes.invalid
  }`;
  const postalClasses = `${classes.control} ${
    fromInputValid.postal ? "" : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    fromInputValid.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputref} />
      </div>
      {!fromInputValid.name && <p>Entered a Valid Input</p>}
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputref} />
      </div>
      {!fromInputValid.street && <p>Entered a Valid Street</p>}
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputref} />
      </div>
      {!fromInputValid.postal && <p>Entered a Valid Postal</p>}
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputref} />
      </div>
      {!fromInputValid.city && <p>Entered a Valid City</p>}
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
