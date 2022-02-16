import React from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
// import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  return (
    <CartProvider>
      <Header></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
