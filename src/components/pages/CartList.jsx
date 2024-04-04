import React, { useState, useEffect } from "react";
import axios from "axios";
import CartComponents from "./CartComponents";

const CartList = () => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartProducts = async (cartProducts) => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setProducts(response.data);
        setCartProducts(response.data); // Ustawienie stanu cartProducts na podstawie danych pobranych z serwera
        var cartProducts = response.data;
        console.log(cartProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartProducts();
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCartProducts = cartProducts.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          quantity: newQuantity,
        };
      }
      return product;
    });
    setCartProducts(updatedCartProducts); // Zaktualizuj stan cartProducts po zmianie ilości produktu
  };

  return (
    <div className="text-xl">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox border-4 border-buttons-color"
                />
              </label>
            </th>
            <th className="text-xl">Nazwa</th>
            <th className="text-xl">Cena</th>
            <th type="number" className="text-xl">
              Ilość
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product, index) => (
            <CartComponents
              id={product.id} // Poprawione przekazywanie id produktu
              key={`${product.id}-${index}`}
              name={product.name} // Poprawione przekazywanie nazwy produktu
              price={product.price}
              description={product.description}
              image={product.image}
              quantity={product.quantity}
              
            />
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mx-auto mt-20">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-main-color hover:bg-buttons-color hover:text-white mb-20">
          Zamów i zapłać przy kasie
        </button>
      </div>
    </div>
  );
};

export default CartList;
