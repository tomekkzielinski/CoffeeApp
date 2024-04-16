import React, { useState, useEffect } from "react";
import axios from "axios";
import CartComponents from "./CartComponents";
import { Link, NavLink } from "react-router-dom";

const CartList = () => {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [amount, setAmount] = useState(0);

  // Funkcja do pobierania wartości pliku cookie po nazwie
  function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) == " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }

  function cartNotEmpty(amount) {
    // Sprawdzamy, czy wartość amount (całkowita cena zamówienia) jest większa od zera
    if (amount > 0) {
      return true; // Zwracamy true, jeśli koszyk nie jest pusty
    } else {
      return false; // Zwracamy false, jeśli koszyk jest pusty
    }
  }

  function handleOrderSubmission() {
    const session_id = getCookie("sessionId"); // Pobierz session_id z ciasteczka
    console.log("sesje", session_id)
    console.log("cena w dupe jeza", amount)
    const orderData = {
      session_id: session_id,
      amount: amount
    };

    console.log("dsadad", orderData)
    if (cartNotEmpty(amount)) {
      // Wysyłamy żądanie POST tylko jeśli koszyk nie jest pusty
      axios
        .post("http://localhost:5000/orders", orderData)
        .then((response) => {
          console.log("Zamówienie zostało dodane:", response.data);
          // Dodatkowy kod, który wykonasz po pomyślnym dodaniu zamówienia
          // ...
  
        })
        .catch((error) => {
          console.error("Błąd podczas dodawania zamówienia:", error);
          // Dodatkowy kod, który wykonasz w przypadku błędu
          // ...
        });
    } else {
      alert("Koszyk jest pusty. Proszę dodać produkty przed złożeniem zamówienia.");
    }
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/cart");
        setProducts(response.data);
        setCartProducts(response.data); // Ustawienie stanu cartProducts na podstawie danych pobranych z serwera
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
        return total + product.product_price * product.quantity;
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
      <div
        
        className="flex justify-end font-bold items-center mx-auto mt-20"
      >
        Suma: {amount}
      </div>
      <div className="flex justify-center items-center mx-auto mt-20">
      <Link to="/services" className="title">
        <button onClick={handleOrderSubmission} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-main-color hover:bg-buttons-color hover:text-white mb-20">
          Zamów i zapłać przy kasie
        </button>
      </Link>
      </div>
    </div>
  );
};

export default CartList;
