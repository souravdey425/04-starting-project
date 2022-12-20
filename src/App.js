import { useState } from "react";
import "./App.css";
import Cart from "./Components/Cart/Cart";

import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CardProvider from "./Store/CardProvider";

function App() {
  const [initial, setInitial] = useState(false);
  const UseAddCart = () => {
    setInitial(true);
  };
  const UseRemoveCart = () => {
    setInitial(false);
  };
  return (
    <CardProvider>
      {initial && <Cart onRemove={UseRemoveCart} />}
      <Header onAddCart={UseAddCart} />

      <main>
        <Meals />
      </main>
    </CardProvider>
  );
}

export default App;
