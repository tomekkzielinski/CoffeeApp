// Komponent AddToCartModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "./Alert";

const AddToCartModal = ({ selectedProductId, resetSelectedProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false); // Dodanie stanu dla alertu
  const [products, setProducts] = useState([]);
  const [answerMilk, setAnswerMilk] = useState(undefined);
  const [answerSugar, setAnswerSugar] = useState(false);

  // Zaktualizowana funkcja onClose, która teraz czeka na ukrycie alertu
  const onClose = () => {
    setShowAlert(true); // Najpierw pokazujemy alert
    resetSelectedProduct();
    // Używamy setTimeout, aby opóźnić zamknięcie modala
    setTimeout(() => {
      document.getElementById("add_to_cart_modal").close();
      setShowAlert(false); // Ukrywamy alert po zamknięciu modala
    }, 900); // 900ms to czas trwania animacji zamykania modala
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
        console.log("produkty z dupy", products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

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

  const addToCart = async () => {
    if (!selectedProductId) return;
    var sessionId = getCookie("sessionId"); // Pobierz wartość identyfikatora sesji z pliku cookie

    try {
      await axios.post("http://localhost:5000/cart", {
        product_id: selectedProductId,
        quantity: quantity,
        session_id: sessionId, // Dodaj identyfikator sesji do danych przesyłanych w zapytaniu POST
      });
      onClose(); // Zamknij modal
      setShowAlert(true); // Pokaż alert
    } catch (error) {
      console.error("Błąd przy dodawaniu produktu do koszyka:", error);
    }
  };

  function handleTheAnswerChangeMilk(e) {
    const value = e.target.value === "true"; // Konwertuj wartość na boolean
    console.log("milk", value);

    setAnswerMilk(value);
  }
  function handleTheAnswerChangeSugar(e) {
    const value = e.target.value === "true"; // Konwertuj wartość na boolean
    console.log("sugar", value);
    setAnswerSugar(value);
  }
  return (
    <dialog id="add_to_cart_modal" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Dodaj produkt do koszyka</h3>

        <div className="py-4 flex flex-col items-center">
          <label htmlFor="quantity" className="block mb-2 font-bold">
            Ilość:
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="input input-bordered w-full max-w-xs"
          />

          {products.some((product) => product.category_id !== 1) && (
            <div>
              <div>
                <label className="block mt-5 mb-3 font-bold">Mleko</label>
                <div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="no-milk"
                      value={false}
                      name="answerMilk"
                      onChange={handleTheAnswerChangeMilk}
                      className="radio-md font-bold mr-4 mb-2"
                      checked={answerMilk === false}
                    />
                    <label htmlFor="no-milk" className="text-lg">
                      NIE
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="yes-milk"
                      name="answerMilk"
                      value={true}
                      onChange={handleTheAnswerChangeMilk}
                      checked={answerMilk === true}
                      className="radio-md font-bold mr-4"
                    />
                    <label htmlFor="yes-milk" className="text-lg">
                      TAK
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mt-5 mb-3 font-bold">Cukier</label>
                <div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="no-sugar"
                      value={false}
                      name="answerSugar"
                      onChange={handleTheAnswerChangeSugar}
                      className="radio-md font-bold mr-4 mb-2"
                      checked={answerSugar === false}
                    />
                    <label htmlFor="no-sugar" className="text-lg">
                      NIE
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="yes-sugar"
                      name="answerSugar"
                      value={true}
                      onChange={handleTheAnswerChangeSugar}
                      checked={answerSugar === true}
                      className="radio-md font-bold mr-4"
                    />
                    <label htmlFor="yes-sugar" className="text-lg">
                      TAK
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reszta kodu */}
        <div className="modal-action">
          <Alert show={showAlert} onHide={() => setShowAlert(false)} />{" "}
          {/* Dodanie Alertu */}
          <button onClick={addToCart} className="btn bg-main-color">
            Dodaj do koszyka
          </button>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddToCartModal;
