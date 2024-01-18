import React from "react";

const products = [
  {
      id: 1,
      image: '../../espresso.jpg',
      name: 'Espresso',
      price: 29.99,
      description: 'Kozacka kawka przygotowana z pasją'
  },
  {
      id: 2,
      image: '../../americano.jpg',
      name: 'Produkt 2',
      price: 49.99,
      description: 'Opis produktu 2'
  },
  {
      id: 3,
      image: '../../latte.jpg',
      name: 'Produkt 3',
      price: 39.99,
      description: 'Opis produktu 3'
  },
  {
    id: 4,
    image: 'sciezka/do/zdjecia3.jpg',
    name: 'Produkt 3',
    price: 39.99,
    description: 'Opis produktu 3'
},
{
  id: 5,
  image: 'sciezka/do/zdjecia3.jpg',
  name: 'Produkt 3',
  price: 39.99,
  description: 'Opis produktu 3'
},
  // Dodaj inne produkty według potrzeb
];

const Product = ({ name, price, imageUrl }) => {


 

  return (
    <div className="grid grid-cols-3 gap-4 m-5">
            {products.map(product => (
                <div key={product.id} className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src={product.image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="font-bold">{product.price} zł</p>
                        <div className="card-actions justify-end">
                            <button className="btn bg-main-color">Kup teraz!</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
  );
};

export default Product;
