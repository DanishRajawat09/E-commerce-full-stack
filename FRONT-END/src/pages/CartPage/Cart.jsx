import React from "react";
import "./cartStyle.css";
import CartCard from "./cartCompo/cartCard/CartCard";
import CartCalc from "./cartCompo/cartCalculater/CartCalc";
const Cart = () => {
  return (
    <main className="cartPage">
      <div className="container">
        <h1 className="cartHeading">YOUR CART</h1>
        <div className="cartContainer grid">
          <div className="cartProducts flexContainer">
            <CartCard />
          </div>
          <CartCalc />
        </div>
      </div>
    </main>
  );
};

export default Cart;
