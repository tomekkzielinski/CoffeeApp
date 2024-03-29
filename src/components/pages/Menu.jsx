import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import { Modal } from "./Modal";

import Alert from "./Alert";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [productIdToDelete, setProductIdToDelete] = useState([]);


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

  const handleDelete = async (productId) => {
    document.getElementById("delete_product_modal").showModal();
    setProductIdToDelete(productId);
  };
  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:5000/products/${productIdToDelete}`);
      setProducts(
        products.filter((product) => product.id !== productIdToDelete)
      );
      document.getElementById("delete_product_modal").close();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const showAlert = () => {
    document.getElementById("alert").showModal();
  }


  return (
    <div>
        <Alert showAlert={showAlert} id="alert"/>
      <Modal
        id="delete_product_modal"
        title="Czy na pewno chcesz usunąć ten produkt?"
        description=""
        onConfirm={() => deleteProduct()}
      />
      <p className="text-4xl font-bold ml-4 mt-6">Kawa:</p>
      <div className="flex justify-center items-center">
        <Product
          products={products.filter((product) => product.category_id === 1)}
          onDelete={handleDelete}
        />
      </div>
      <p className="text-4xl font-bold ml-4 mt-6">Przekąski:</p>
      <div className="flex justify-center items-center">
        <Product
          products={products.filter((product) => product.category_id === 2)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Menu;
