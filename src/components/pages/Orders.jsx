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
        console.log(response.data)
      } catch (error) {
        console.error("Błąd podczas pobierania zamówień:", error);
      }
    };

    fetchOrders();
  }, []);

  // Funkcja do grupowania zamówień po session_id
  const groupOrdersBySessionId = (orders) => {
    const groupedOrders = {};
    orders.forEach((order) => {
      const sessionId = order.session_id;
      if (!groupedOrders[sessionId]) {
        groupedOrders[sessionId] = {
          products: [],
          totalPrice: 0,
        };
      }
      groupedOrders[sessionId].products.push({
        name: order.product_name,
        quantity: order.quantity,
        milk: order.milk,
        sugar: order.sugar
      });
      groupedOrders[sessionId].totalPrice += order.total_price;
    });
    return groupedOrders;
  };
  
  const handleDelete = (session_id) => {
    console.log("Session ID to delete:", session_id); // Dodaj logowanie, aby sprawdzić przekazywaną wartość

    // Sprawdź, czy session_id jest poprawnie przekazywane i jest stringiem
    if (typeof session_id === "string") {
      axios
        .delete(`http://localhost:5000/orders/${session_id}`)
        .then((response) => {
          console.log("Response:", response.data);
          const updatedOrders = { ...groupedOrders };
          delete updatedOrders[session_id];
          setGroupedOrders(updatedOrders);
        })
        .catch((error) => {
          console.error("Error deleting orders:", error);
        });
    } else {
      console.error("Invalid session_id type:", typeof session_id);
    }
  };

  return (
    <div className="m-10 flex flex-row flex-wrap">
      {Object.entries(groupedOrders).map(
        ([sessionId, { products, totalPrice }]) => (
          <div
            key={sessionId}
            className=" m-5 card w-96 bg-main-color text-font-color"
          >
            <div className="card-body">
              <h2 className="card-title text-xl justify-center mb-10 font-bold">
                Numer zamówienia: {sessionId}
              </h2>
              {products.map((product, index) => (
                <div key={index}>
                  <p className="font-bold">
                    {product.name} x {product.quantity}
                  </p>
                  <p>
                  Mleko roślinne: {product.milk ? "Tak" : "Nie" }
                  <br/>
                  Słodzik: {product.sugar ? "Tak" : "Nie"}
                </p>
                </div>
              ))}
              <p className="text-2xl font-bold mt-5">
                Kwota zam.: {totalPrice.toFixed(2)} PLN 
              </p>
              <div className="grid justify-items-end">
                <button
                  className="btn bg-buttons-color text-white"
                  onClick={() => handleDelete(sessionId)}
                  disabled={deleted}
                >
                  {deleted ? "Zrealizowano" : "Usuń zamówienia"}
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Orders;
