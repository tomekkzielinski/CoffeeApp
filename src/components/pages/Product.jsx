import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";  

const Product = ({ products, onDelete, handleAddToCart, isLoggedIn }) => {

  const navigate = useNavigate();

  const handleEditClick = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        // Przekazanie danych produktu do formularza edycji oraz przekierowanie z danymi produktu
        navigate('/edit-product', { state: { product: response.data } });
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};
  return (
    <div className="gap-4 m-5 flex flex-wrap">
      {products.map((product) => (
        <div key={product.id} className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={product.image} alt="Produkt" className="max-h-96 w-max" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl font-bold">{product.name}</h2>
            <p className="text-lg">{product.description}</p>
            <p className="font-bold text-lg">{product.price} zł</p>
            <div className="card-actions justify-end">
              <button
                className="btn bg-main-color"
                onClick={() => handleAddToCart(product.id, product.category_id)}
              >
                Kup teraz!
              </button>

              {isLoggedIn && (
                <button
                  className="btn bg-main-color"
                  onClick={() => onDelete(product.id)}
                >
                  Usuń
                </button>
                
                
              )}
                {isLoggedIn && (
                <button
                  className="btn bg-main-color"
                  onClick={() => handleEditClick(product.id)}
                  
                >
                  Edytuj
                </button>
                
                
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
