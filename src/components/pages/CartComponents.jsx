import React from "react";

const cartProducts = [
  {
    id: 1,
    image: "../../espresso.jpg",
    name: "Espresso",
    price: 29.99,
    description: "Kozacka kawka przygotowana z pasją",
  },
  {
    id: 2,
    image: "../../americano.jpg",
    name: "Produkt 2",
    price: 49.99,
    description: "Trochę gorsza kawka ale też spoko",
  },
  {
    id: 3,
    image: "../../latte.jpg",
    name: "Produkt 3",
    price: 39.99,
    description: "Da się wypić",
  },
];

const CartComponents = ({ id, name, price, description, image }) => {
  return (
    <tr>
      <th>
        <label>
          <input  type="checkbox" className="checkbox  border-4" />
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
      <td className="text-lg">{id}</td>
      <th>
        <button className="btn btn-ghost">Usuń z koszyka</button>
      </th>
    </tr>
  );
};

const CartList = () => {
  return (
    <div className="text-xl">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox border-4" />
              </label>
            </th>
            <th className="text-xl">Nazwa</th>
            <th className="text-xl">Cena</th>
            <th className="text-xl">Ilość</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product) => (
            <CartComponents
              id={product.id}
              key={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartList;
