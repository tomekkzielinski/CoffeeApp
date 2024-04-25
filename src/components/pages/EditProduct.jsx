import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleUpdateProduct = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/products/${product.id}`,
        product
      );
      navigate("/menu"); // lub gdziekolwiek chcesz przekierować po edycji
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Formularz edycji
  return (
    <div>
      <div className="flex justify-center items-center bg-main-color  m-20 max-w-4xl mx-auto p-4 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">
            Edytuj produkt: <b>{product.name}</b>
          </h2>

          <input
            type="text"
            placeholder="Nazwa produktu"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full mb-2 p-2 rounded-md border border-gray-300"
          />
          <input
            type="text"
            placeholder="Zdjęcie URL  "
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            className="w-full mb-2 p-2 rounded-md border border-gray-300"
          />
          <input
            type="number"
            placeholder="Cena"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="w-full mb-2 p-2 rounded-md border border-gray-300"
          />
          <textarea
            placeholder="Opis"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
            rows={10}
          />
          <div className="flex justify-center">
            <button
              onClick={handleUpdateProduct}
              
              className="w-150 text-white p-2 rounded-md bg-buttons-color transition duration-300"
            >
              Zapisz zmiany
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
