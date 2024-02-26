import React from "react";
import Product from "./Product";

const Menu = () => {
  return (
    <div>
      <p className=" text-4xl font-bold ml-4 mt-6">Kawa:</p>
      <div className="flex justify-center items-center">
        <Product />
      </div>
    </div>
  );
};

export default Menu;
