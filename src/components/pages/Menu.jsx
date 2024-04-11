import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import { Modal } from "./Modal";
import  AddToCartModal  from "./AddToCartModal";

import Alert from "./Alert";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [productIdToDelete, setProductIdToDelete] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

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
  };
 
  
  const handleAddToCartModal = async (productId) => {
    console.log({productId});
    setSelectedProductId(productId);
    document.getElementById("add_to_cart_modal").showModal();
  };

  return (
    <div className="grid justify-items-start">
      <AddToCartModal
        id="add_to_cart_modal"
        addToCartModal={() => handleAddToCartModal()}
        selectedProductId={selectedProductId}
        resetSelectedProduct={() => setSelectedProductId(null)}
        products={products}
      />
      <Alert showAlert={showAlert} id="alert" />
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
          handleAddToCart={handleAddToCartModal}
        />
      </div>
      <p className="text-4xl font-bold ml-4 mt-6">Przekąski:</p>
      <div className="flex justify-center items-center">
        <Product
          products={products.filter((product) => product.category_id === 2)}
          onDelete={handleDelete}
          handleAddToCart={handleAddToCartModal}
        />
      </div>
    </div>
  );
};

export default Menu;
