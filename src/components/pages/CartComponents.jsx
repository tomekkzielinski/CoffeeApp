import React, { useState } from "react";

const CartComponents = ({
  id,
  name,
  price,
  description,
  image,
  quantity,
  onQuantityChange,
}) => {
  const [inputQuantity, setInputQuantity] = useState(quantity);

  const handleInputChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setInputQuantity(newQuantity);
    }
  };

  const handleBlur = () => {
    onQuantityChange(id, parseInt(inputQuantity));
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
      <td className="text-lg">
        <input
          min="1"
          type="number"
          value={inputQuantity}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-16 p-1 border rounded-md"
        />
      </td>
      <th>
        <button className="btn btn-ghost">Usuń z koszyka</button>
      </th>
    </tr>
  );
};

export default CartComponents;
