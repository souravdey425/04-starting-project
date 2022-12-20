import React from "react";

const CardContext = React.createContext({
  item: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCard: () => {},
});

export default CardContext;
