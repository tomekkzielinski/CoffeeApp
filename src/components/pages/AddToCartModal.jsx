// Komponent AddToCartModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "./Alert";

const AddToCartModal = ({ selectedProductId, resetSelectedProduct }) => {
  const [quantity, setQuantity] = useState(0);
  const [showAlert, setShowAlert] = useState(false); // Dodanie stanu dla alertu
  const [products, setProducts] = useState([]);

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
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  function getSessionId() {
    // Spróbuj przeczytać cookie o nazwie 'session_id'
    const sessionIdCookie = document.cookie.split('; ').find(row => row.startsWith('session_id='));
  
    if (sessionIdCookie) {
      return sessionIdCookie.split('=')[1];
    } else {
      // Jeśli nie ma cookie, generujemy nowe ID sesji
      const newSessionId = generateSessionId();
      // Zapisz cookie z ID sesji, ustaw ważność na 7 dni
      document.cookie = `session_id=${newSessionId};max-age=${7 * 24 * 60 * 60};path=/`;
      return newSessionId;
    }
  }
  
  function generateSessionId() {
    // Prosta funkcja do generowania pseudo-losowego ID sesji
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      return r.toString(16);
    });
  }
  
  const addToCart = async () => {
    console.log({ selectedProductId });
    if (!selectedProductId) return;
    const session_id = getSessionId();
    try {
      await axios.post("http://localhost:5000/cart", {
        product_id: selectedProductId,
        quantity: quantity,
        session_id: session_id,
      });
      console.log(session_id)
      onClose(); // Zamknij modal
      setShowAlert(true); // Pokaż alert
    } catch (error) {
      console.error("Błąd przy dodawaniu produktu do koszyka:", error);
    }
  };

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
