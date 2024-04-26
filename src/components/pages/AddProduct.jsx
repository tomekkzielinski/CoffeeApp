// Import React i useState z biblioteki react oraz axios do obsługi żądań HTTP
import React, { useState } from "react";
import axios from "axios";

// Komponent AddProduct służy do dodawania nowych produktów
function AddProduct({ onAddProduct }) {
  // Definicja stanów lokalnych dla nazwy, zdjęcia, kategorii, ceny i opisu produktu
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Funkcja obsługująca dodawanie produktu
  const handleAddProduct = () => {
    // Sprawdzamy, czy wszystkie pola formularza są wypełnione przed dodaniem produktu
    if (name && image && category && price && description) {
      // Tworzymy obiekt nowego produktu na podstawie wprowadzonych danych
      const newProduct = {
        name,
        image,
        category_id: category,
        price,
        description,
      };

      // Wysyłamy żądanie POST dodające nowy produkt do bazy danych
      axios
        .post("http://localhost:5000/products", newProduct)
        .then((response) => {
          // Po dodaniu produktu do bazy danych, wywołujemy funkcję callback onAddProduct
          onAddProduct(newProduct);
          // Czyszczenie pól formularza za pomocą funkcji useState
          setName("");
          setImage("");
          setCategory("");
          setPrice("");
          setDescription("");
          // Wyświetlamy alert informujący o dodaniu produktu
          alert("Produkt został dodany!");
        })
        .catch((error) => {
          // W przypadku wystąpienia błędu wyświetlamy alert z informacją
          alert("Wystąpił błąd podczas dodawania produktu!");
        });
    } else {
      // Jeśli nie wszystkie pola są wypełnione, wyświetlamy alert z prośbą o uzupełnienie wszystkich pól
      alert("Proszę wypełnić wszystkie pola.");
    }
  };

  // Renderowanie interfejsu użytkownika
  return (
    <div className="flex justify-center items-center bg-main-color  m-20 max-w-4xl mx-auto p-4 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Dodaj nowy produkt</h2>

        <input
          type="text"
          placeholder="Nazwa produktu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 rounded-md border border-gray-300"
        />
        <input
          type="text"
          placeholder="Zdjęcie URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full mb-2 p-2 rounded-md border border-gray-300"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-2 p-2 rounded-md border border-gray-300"
        >
          <option value="">Wybierz kategorię</option>
          <option value="1">Kawa</option>
          <option value="2">Przekąski</option>
        </select>
        <input
          type="number"
          placeholder="Cena"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full mb-2 p-2 rounded-md border border-gray-300"
        />
        <textarea
          placeholder="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 rounded-md border border-gray-300"
          rows={10}
        />
        <div className="flex justify-center">
          <button
            onClick={handleAddProduct}
            className="w-150 text-white p-2 rounded-md bg-buttons-color transition duration-300"
          >
            Dodaj produkt
          </button>
        </div>
      </div>
    </div>
  );
}

// Eksportowanie komponentu AddProduct
export default AddProduct;
