import CartComponents from "./CartComponents";


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
    }
  ];

  


const CartList = () => {

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedCartProducts = cartProducts.map((product) => {
            if (product.id === productId) {
                return {
                    ...product,
                    quantity: newQuantity
                };
            }
            return product;
    });

};
    
      
    return (
      <div className="text-xl">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox border-4 border-buttons-color" />
                </label>
              </th>
              <th className="text-xl">Nazwa</th>
              <th className="text-xl">Cena</th>
              <th type="number" className="text-xl">Ilość</th>
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
                quantity={product.quantity}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center mx-auto mt-20">
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-main-color hover:bg-buttons-color hover:text-white mb-20">
            Zamów i zapłać przy kasie
          </button>
        </div>
      </div>
    );
  };
  
  export default CartList;