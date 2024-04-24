
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderFinished = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [amount, setAmount] = useState(0);
  const location = useLocation();
  const finalAmount = location.state?.amount ?? '0'; // użyj wartości z przekazanego stanu lub domyślnej wartości '0'

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
  };
  const session_id = getCookie("sessionId"); // Pobierz session_id z ciasteczka
  console.log("tomekz", session_id)
    // Funkcja do ustawiania ciasteczka
    function setCookie(name, value, days = 1) {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };
    function generateNewSessionId() {
      // Tutaj możesz wygenerować nowe ID sesji, np. losując unikalny identyfikator
      return Math.floor(Math.random() * 1000) + 1;
    };

    function resetSessionId() { 
      const newSessionId  = generateNewSessionId();
      setCookie("sessionId", newSessionId);
    };

  async function fetchOrdersFromBackend() {
    const url = 'http://localhost:5000/orders'; // Zmień adres na odpowiedni
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const ordersData = await response.json();
        return ordersData;
      } else {
        console.error(`Nie udało się pobrać danych. Kod statusu: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error(`Wystąpił błąd podczas wysyłania żądania: ${error}`);
      return null;
    }
  }
  
  // Przykładowe użycie
  fetchOrdersFromBackend()
    .then((orders) => {
      if (orders) {
        orders.forEach((order) => {

        });
      }
    })
    .catch((error) => {
      console.error(`Wystąpił błąd: ${error}`);
    });
  
    fetchOrdersFromBackend()

  const redirect= () => {
    resetSessionId()
      navigate('/menu');
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
      console.log(totalPrice)
    } else {
      setAmount(amount);
    }
  }, [cartProducts]);

  
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="https://previews.123rf.com/images/alfianiqbal/alfianiqbal2008/alfianiqbal200800261/153929384-coffee-cup-icon-vector-design-illustration-cup-of-coffee-icon-vector-isolated-on-white-background.jpg" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Dziękujemy za złożenie zamówienia!</h1>
      <p className="py-6 text-3xl ">Numer zamówienia: {session_id}</p>
      <p className="py-6 text-3xl ">Prosimy o podejście do kasy i opłacenie zamówienia</p>
      <p className="py-6 text-3xl ">Do zapłaty: {finalAmount}</p>
      <button onClick={() => redirect('/menu')} className="text-white btn h-20 w-100 bg-buttons-color">Powrót do MENU</button>
    </div>
  </div>
</div>
  )
}

export default OrderFinished;