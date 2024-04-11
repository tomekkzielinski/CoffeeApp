import React, { useState, useEffect } from "react";
import axios from "axios";
import CartComponents from "./CartComponents";

const CartList = () => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [amount, setAmount] = useState(0);


  useEffect(() => {

    const fetchCartProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setProducts(response.data);
        setCartProducts(response.data); // Ustawienie stanu cartProducts na podstawie danych pobranych z serwera
        var cartProducts = response.data;
        console.log("dupa1", cartProducts.product_price)
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartProducts();
  }, []);


  useEffect(() => {
    // Obliczanie sumy cen produktów w koszyku po każdej zmianie cartProducts
    if (cartProducts.length > 0) {
      const totalPrice = cartProducts.reduce((total, product) => {
        return total + (product.product_price * product.quantity);
      }, 0);
      setAmount(totalPrice.toFixed(2)); // Zaokrąglenie do dwóch miejsc po przecinku
    } else {
      setAmount(0);
    }
  }, [cartProducts]);

 
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
              cartId={product.cart_id}
              id={product.product_id} // Poprawione przekazywanie id produktu
              key={`${product.id}-${index}`}
              name={product.product_name} // Poprawione przekazywanie nazwy produktu
              price={product.product_price}
              description={product.description}
              image={product.product_image}
              quantity={product.quantity}
              
            />
          ))}
        </tbody>
      </table>
      <div class="total" className="flex justify-end font-bold items-center mx-auto mt-20">Suma: {amount}</div>
      <div className="flex justify-center items-center mx-auto mt-20">
        
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-main-color hover:bg-buttons-color hover:text-white mb-20">
          Zamów i zapłać przy kasie
        </button>
        
      </div>
      


    </div>
  );
};

export default CartList;
