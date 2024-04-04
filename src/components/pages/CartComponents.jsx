import React, {} from "react";
import axios from "axios";

const CartComponents = ({
  cartId, // Zmieniłem 'id' na 'cartId' dla większej jasności
  name,
  price,
  description,
  image,
  quantity
}) => {
  const removeFromCart = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/cart/${cartId}`);
      console.log(response.data); // Tutaj możesz odświeżyć stan koszyka, jeśli potrzebujesz
      window.location.reload(); // Przeładowuje całą stronę
      
    } catch (error) {
      console.error("There was an error removing the cart item!", error);
    }
  };



  return (
    <tr>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox border-4 border-buttons-color focus:buttons-color"
          />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={image} alt="Product" />
            </div>
          </div>
          <div>
            <div className="font-bold text-lg ">{name}</div>
            <div className="text-lg">{description}</div>
          </div>
        </div>
      </td>
      <td className="text-lg">{price}</td>
      <td className="text-lg">{quantity}</td>
      <th>
                <button onClick={removeFromCart} className="btn btn-ghost">Usuń z koszyka</button>

      </th>
    </tr>
  );
};

export default CartComponents;
