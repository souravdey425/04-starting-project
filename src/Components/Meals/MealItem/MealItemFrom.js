import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemFrom.module.css";
const MealItemFrom = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const Consumer = useRef();
  const FormSubmit = (event) => {
    event.preventDefault();
    const enteredAmount = Consumer.current.value;
    const EnteredAmount = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      EnteredAmount < 1 ||
      EnteredAmount > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddcart(EnteredAmount);
  };
  return (
    <form className={classes.form} onSubmit={FormSubmit}>
      <Input
        ref={Consumer}
        label={"Amount"}
        input={{
          id: "amount_" + props.id,
          type: "Number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please Entered a Valid Amount (1-5).</p>}
    </form>
  );
};

export default MealItemFrom;
