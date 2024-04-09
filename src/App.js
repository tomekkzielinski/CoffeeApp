import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { About } from "./components/pages/About";
import Menu from "./components/pages/Menu";
import Login from "./components/pages/Login";
import Cart from "./components/pages/Cart";
import AddProduct from "./components/pages/AddProduct";
import Footer from "./components/pages/Footer";

function App() {
  // Funkcja do ustawiania wartości pliku cookie
function setCookie(cookieName, cookieValue, expirationDays) {
  var d = new Date();
  d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// Funkcja do pobierania wartości pliku cookie po nazwie
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ') {
          cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
          return cookie.substring(name.length, cookie.length);
      }
  }
  return "";
}

// Sprawdzenie czy istnieje plik cookie z identyfikatorem sesji użytkownika
var sessionId = getCookie("sessionId");

// Jeśli nie istnieje, wygeneruj nowy identyfikator sesji i ustaw plik cookie na 30 dni
if (sessionId == "") {
  sessionId = Math.random().toString(36).substr(2, 10); // Przykładowe generowanie identyfikatora sesji
  setCookie("sessionId", sessionId, 30); // Ustawienie pliku cookie na 30 dni
};
  return (
    <div className="App">
      <Navbar />
      <div className="container mx-auto ">
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
       <Route path="/add-product" element={<AddProduct />}></Route>
      
      </Routes>
      
      </div>
      <Footer/>
    </div>
  );
}

export default App;
