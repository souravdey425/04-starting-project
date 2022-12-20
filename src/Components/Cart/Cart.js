import React, { useContext, useState } from "react";
import CardContext from "../../Store/Cart-Context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItemLength from "./CartItemLength";
import Checkout from "./Checkout";

const Cart = (props) => {
  const Cardctx = useContext(CardContext);
  const [onStatechange, setOnStateChange] = useState(false);
  const [beforeSubmit, setBeforeSubmit] = useState(false);
  const [onSubmiChange, setOnSubmitChange] = useState(false);
  const onChangeRemove = (id) => {
    Cardctx.removeItem(id);
  };
  const onchangeAdd = (item) => {
    Cardctx.addItem({ ...item, amount: 1 });
  };
  const CartItem = (
    <ul className={classes["cart-items"]}>
      {Cardctx.item.map((item) => (
        <CartItemLength
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={onChangeRemove.bind(null, item.id)}
          onAdd={onchangeAdd.bind(null, item)}
        />
      ))}
    </ul>
  );
  const onSubmitHandler = async (data) => {
    setBeforeSubmit(true);
    await fetch(
      "https://food-order-5772a-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: data,
          order: Cardctx.item,
        }),
      }
    );
    setBeforeSubmit(false);
    setOnSubmitChange(true);
    Cardctx.clearCard();
  };
  const orderHandler = () => {
    setOnStateChange(true);
  };
  const CardTotal = `$${Cardctx.totalAmount.toFixed(2)}`;
  const Showbutton = Cardctx.item.length > 0;

  const totalJsx = (
    <React.Fragment>
      {CartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{CardTotal}</span>
      </div>
      {onStatechange && (
        <Checkout onConfirm={onSubmitHandler} onCancel={props.onRemove} />
      )}
      {!onStatechange && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onRemove}>
            Close
          </button>
          {Showbutton && (
            <button className={classes.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  return (
    <Modal onReRemove={props.onRemove}>
      {!beforeSubmit && !onSubmiChange && totalJsx}
      {beforeSubmit && <p>Submiting...</p>}

      {onSubmiChange && (
        <div>
          <p>Submited Sucessfully</p>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onRemove}>
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
