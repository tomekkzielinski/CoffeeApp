import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [groupedOrders, setGroupedOrders] = useState([]);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders");
        // Grupowanie zamówień po session_id
        const groupedOrders = groupOrdersBySessionId(response.data);
        setGroupedOrders(groupedOrders);
      } catch (error) {
        console.error("Błąd podczas pobierania zamówień:", error);
      }
    };

    fetchOrders();
  }, []);

  // Funkcja do grupowania zamówień po session_id
  const groupOrdersBySessionId = orders => {
    const groupedOrders = {};
    orders.forEach(order => {
      const sessionId = order.session_id;
      if (!groupedOrders[sessionId]) {
        groupedOrders[sessionId] = {
          products: [],
          totalPrice: 0
        };
      }
      groupedOrders[sessionId].products.push({
        name: order.product_name,
        quantity: order.quantity
      });
      groupedOrders[sessionId].totalPrice += order.total_price;
    });
    return groupedOrders;
  };


console.log()
  const handleDelete = (session_id) => {

    axios.delete(`http://localhost:5000/orders/${session_id}`)
      .then(response => {
        console.log(response.data);
        setDeleted(true);
      })
      .catch(error => {
        console.error('Error deleting orders:', error);
      });
  };
  

  return (
    <div className="m-10 flex flex-row flex-wrap">
      {Object.entries(groupedOrders).map(([sessionId, { products, totalPrice }]) => (
        <div key={sessionId} className=" m-5 card w-96 bg-main-color text-font-color">
          <div className="card-body">
            <h2 className="card-title text-lg justify-center mb-10 font-bold">Numer zamówienia: {sessionId}</h2>
            {products.map((product, index) => (
              <div key={index}>
                <p>
                  Product Name: {product.name} x {product.quantity}
                </p>
              </div>
            ))}
            <p className="text-2xl font-bold mt-5">Total Price: ${totalPrice}</p>
            <div className="grid justify-items-end">
            <button className="btn bg-buttons-color text-white" onClick={handleDelete} disabled={deleted}>
      {deleted ? 'Zrealizowano' : 'Usuń zamówienia'}
    </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
