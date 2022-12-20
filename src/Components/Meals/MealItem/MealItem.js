import React, { useContext } from "react";
import CardContext from "../../../Store/Cart-Context";
import classes from "./MealItem.module.css";
import MealItemFrom from "./MealItemFrom";

const MealItem = (props) => {
  const Cardctx = useContext(CardContext);
  const onChangeCart = (amount) => {
    Cardctx.addItem({
      id: props.id,
      name: props.Name,
      amount: amount,
      price: props.price,
    });
  };
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li>
      <div className={classes.meal}>
        <h3>{props.Name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
        <div className={classes.add}></div>
      </div>
      <div className={classes.add}>
        <MealItemFrom onAddcart={onChangeCart} />
      </div>
    </li>
  );
};

export default MealItem;
