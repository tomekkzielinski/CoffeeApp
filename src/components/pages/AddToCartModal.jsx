// Komponent AddToCartModal.js
import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";

const AddToCartModal = () => {
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false); // Dodanie stanu dla alertu
  const [id, setId] = useState(""); 

  // Zaktualizowana funkcja onClose, która teraz czeka na ukrycie alertu
  const onClose = () => {
    setShowAlert(true); // Najpierw pokazujemy alert

    // Używamy setTimeout, aby opóźnić zamknięcie modala
    setTimeout(() => {
      document.getElementById("add_to_cart_modal").close();
      setShowAlert(false); // Ukrywamy alert po zamknięciu modala
    }, 900); // 900ms to czas trwania animacji zamykania modala
  };

  
  const addToCart = async () => {
    try {
      console.log("Dodaję produkt do koszyka:", id);
      await axios.post(
        "http://localhost:5000/cart",
        { product_id: id, quantity: quantity },
        { headers: { "Content-Type": "application/json" } }
      );
      
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
          <label htmlFor="quantity" className="block mb-2 font-bold">Ilość:</label>
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
        <Alert show={showAlert} onHide={() => setShowAlert(false)} /> {/* Dodanie Alertu */}
          <button onClick={addToCart} className="btn bg-main-color">
            Dodaj do koszyka
          </button>
          {/* Inne przyciski */}
          
        </div>
      </div>
    </dialog>
  );
};

export default AddToCartModal;
