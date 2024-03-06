import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";

const Menu = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <p className="text-4xl font-bold ml-4 mt-6">Kawa:</p>
      <div className="flex justify-center items-center">
        <Product products={products} />
      </div>
    </div>
  );
};

export default Menu;
