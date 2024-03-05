import React, { useState } from "react";
import axios from "axios";


function AddProduct({ onAddProduct }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");


  const handleAddProduct = () => {
    // Sprawdzamy, czy wszystkie pola są uzupełnione przed dodaniem produktu
    if (name && image && category && price && description) {
      const newProduct = {
        name,
        image,
        category,
        price,
        description,
      };


 // Wysyłasz żądanie POST do swojego backendu za pomocą Axios
      axios.post("http://localhost:5000/products", newProduct)
        .then(response => {
          // Po dodaniu produktu do bazy danych, wywołujesz funkcję callback onAddProduct
          onAddProduct(newProduct);
          // Czyszczyszenie pola formularza
          setName("");
          setImage("");
          setCategory("");
          setPrice("");
          setDescription("");
          alert("Produkt został dodany!");
        })
        .catch(error => {
            alert("Produkt został pomyślnie dodany!")
        });
    } else {
      alert("Proszę wypełnić wszystkie pola.");
    }
  };

 

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
          <option value="kawa">Kawa</option>
          <option value="przekaski">Przekąski</option>
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

export default AddProduct;
