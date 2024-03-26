import React, {useState} from "react";
import AddToCartModal from "./AddToCartModal";


const Product = ({ products, onDelete }) => {

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [id, setId] = useState("add_to_cart_modal");


  const handleAddToCartModal = async (productId) => {
    setSelectedProductId(productId);
    document.getElementById("add_to_cart_modal").showModal();
  };

  return (
    <div className="gap-4 m-5 flex flex-wrap">
      <AddToCartModal
        id="add_to_cart_modal"
        addToCartModal={() => handleAddToCartModal()}
        selectedProductId={selectedProductId}
        resetSelectedProduct={() => setSelectedProductId(null)}

      />
      {products.map((product) => (
        <div key={product.id} className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={product.image} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-xl font-bold">{product.name}</h2>
            <p className="text-lg">{product.description}</p>
            <p className="font-bold text-lg">{product.price} zł</p>
            <div className="card-actions justify-end">
              <button
                className="btn bg-main-color"
                onClick={() => handleAddToCartModal(product.id)}
              >
                Kup teraz!
              </button>
              <button
                className="btn bg-main-color"
                onClick={() => onDelete(product.id)}
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
