import React, { useState } from "react";
import axios from "axios"; // Zaimportuj axios, jeśli jeszcze tego nie zrobiłeś

const AddToCartModal = ({ productName, price, onClose, addToCartModal }) => {
  const [quantity, setQuantity] = useState(1); // Ustawienie domyślnej ilości 
  const [id, setId] = useState("");

  const addToCart = async () => {
    try {
      console.log("Dodaję produkt do koszyka:", id)
      await axios.post('http://localhost:5000/cart', {
        product_id: id,
        quantity: quantity
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      alert("Produkt dodany do koszyka");
      onClose(); // Zamknięcie modala po dodaniu produktu
    } catch (error) {
      console.error("Błąd przy dodawaniu produktu do koszyka:", error);
    }
  };



  return (
    <dialog id="add_to_cart_modal"   className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Dodaj produkt do koszyka</h3>
        <p className="py-4">Produkt: {productName}</p>
        <p className="py-4">Cena: {price} zł</p>
        <div className="py-4">
          <label htmlFor="quantity" className="block mb-2">Ilość:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="modal-action">
          <button onClick={addToCart} className="btn bg-main-color">
            Dodaj do koszyka
          </button>
          <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn  bg-main-color" >Zamknij</button>
      </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddToCartModal;