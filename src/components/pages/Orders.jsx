import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [groupedOrders, setGroupedOrders] = useState([]);

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
        groupedOrders[sessionId] = [];
      }
      groupedOrders[sessionId].push(order.product_id);
    });
    return groupedOrders;
  };

  return (
    <div className="mt-5">
      {Object.entries(groupedOrders).map(([sessionId, productIds]) => (
        <div key={sessionId} className="card w-96 bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">Session ID: {sessionId}</h2>
            <p>Product IDs: {productIds.join(", ")}</p>
            <div className="card-actions justify-end">
              <button className="btn">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
