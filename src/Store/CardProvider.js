import React, { useReducer } from "react";
import CardContext from "./Cart-Context";
const DefaultCardState = {
  item: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updateTotal =
      state.totalAmount + action.item.price * action.item.amount;
    const existingItemOnindex = state.item.findIndex(
      (index) => index.id === action.item.id
    );
    const existingCartItem = state.item[existingItemOnindex];
    let updateItem;
    if (existingCartItem) {
      const upDateItems = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updateItem = [...state.item];
      updateItem[existingItemOnindex] = upDateItems;
    } else {
      updateItem = state.item.concat(action.item);
    }

    return {
      item: updateItem,
      totalAmount: updateTotal,
    };
  }
  if (action.type === "REMOVE") {
    const ExisistingCartItemIndex = state.item.findIndex(
      (index) => index.id === action.id
    );
    const ExisistingcartIndex = state.item[ExisistingCartItemIndex];
    const UpdatedtotalAmount = state.totalAmount - ExisistingcartIndex.price;
    let UpdateItem;
    if (ExisistingcartIndex.amount === 1) {
      UpdateItem = state.item.filter((index) => index.id !== action.id);
    } else {
      const UpdatedItems = {
        ...ExisistingcartIndex,
        amount: ExisistingcartIndex.amount - 1,
      };
      UpdateItem = [...state.item];
      UpdateItem[ExisistingCartItemIndex] = UpdatedItems;
    }
    if (action.type === "CLEAR") {
      return {
        DefaultCardState,
      };
    }
    return {
      item: UpdateItem,
      totalAmount: UpdatedtotalAmount,
    };
  }
  return DefaultCardState;
};

const CardProvider = (props) => {
  const [cartState, dispatchCardState] = useReducer(
    cartReducer,
    DefaultCardState
  );
  const addItemCardHandler = (item) => {
    dispatchCardState({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCardState({ type: "REMOVE", id: id });
  };
  const clearCardhandler = () => {
    dispatchCardState({ type: "CLEAR" });
  };
  const cartContext = {
    item: cartState.item,
    totalAmount: cartState.totalAmount,
    addItem: addItemCardHandler,
    removeItem: removeItemHandler,
    clearCard: clearCardhandler,
  };
  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CardProvider;
