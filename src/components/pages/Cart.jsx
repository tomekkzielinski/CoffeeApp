//rafce
import React from "react";
import CartComponents from "./CartComponents";
import CartList from "./CartList";

const Cart = () => {
  return (
    <div className="m-10">
      <CartList />
      <CartComponents />
    </div>
  );
};

export default Cart;
