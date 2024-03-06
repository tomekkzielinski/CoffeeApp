import React from 'react';
import axios from 'axios';

const Product = ({ products, onDelete }) => { 
    const handleDelete = async (productId) => {
        try {
            console.log(products)
            await axios.delete(`http://localhost:5000/products/${productId}`);
            onDelete(productId); // Aktualizacja stanu po usunięciu produktu
        } catch (error) {
            console.error('Error deleting product:', error);
        }
        
    };
    
    return (
        <div className="gap-4 m-5 flex flex-wrap">
            {products.map((product, index) => (
                <div key={index} className="card w-96 bg-base-100 shadow-xl">
                    <figure><img src={product.image} alt="Coffee" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-xl font-bold">{product.name}</h2>
                        <p className="text-lg">{product.description}</p>
                        <p className="font-bold text-lg">{product.price} zł</p>
                        <div className="card-actions justify-end">
                            <button className="btn bg-main-color">Kup teraz!</button>
                            
                            <button className="btn bg-main-color" onClick={() => handleDelete(product.id)}>Usuń</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Product;
