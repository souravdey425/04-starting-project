import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CardContext from "../../Store/Cart-Context";
const HeaderCartButton = (props) => {
  const [btnHighlighted, setBtnHighlighted] = useState(false);
  const cardCTX = useContext(CardContext);

  const { item } = cardCTX;

  const numberOfCartItem = item.reduce((curNumber, index) => {
    return curNumber + index.amount;
  }, 0);
  const btnClass = `${classes.button}${btnHighlighted ? classes.bump : ""}`;
  useEffect(() => {
    if (item.length === 0) {
      return;
    }
    setBtnHighlighted(true);
    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [item]);
  return (
    <button className={btnClass} onClick={props.onUseAddedCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
