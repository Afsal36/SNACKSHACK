import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./OrderStatus.css";

function OrderStatus() {
  const { latestOrder, food_list } = useContext(StoreContext);
  const [orderStatus, setOrderStatus] = useState("Order Placed");

  // Simulate status updates
  useEffect(() => {
    const timer1 = setTimeout(() => setOrderStatus("Packing"), 2000);
    const timer2 = setTimeout(() => setOrderStatus("Out for Delivery"), 4000);
    const timer3 = setTimeout(() => setOrderStatus("Delivered"), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const orderItems = Object.keys(latestOrder || {});

  const getOrderTotal = () => {
    let total = 0;
    orderItems.forEach((itemId) => {
      const item = food_list.find((f) => f._id === itemId);
      if (item) total += item.price * latestOrder[itemId];
    });
    return total;
  };

  return (
    <div className="order-status-page">
      <h2>🧾 Your Ordered Products</h2>

      {orderItems.length === 0 ? (
        <p>No items found in your order.</p>
      ) : (
        <div className="order-items">
          {orderItems.map((itemId) => {
            const item = food_list.find((f) => f._id === itemId);
            const quantity = latestOrder[itemId];
            if (!item) return null;

            return (
              <div key={itemId} className="order-item">
                <div className="order-item-info">
                  <img src={item.image} alt={item.name} className="order-item-img" />
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-qty">Quantity: {quantity}</p>
                  </div>
                </div>
                <p className="item-price">₹{item.price * quantity}</p>
              </div>
            );
          })}
          <hr />
          <div className="order-total">
            <b>Total Amount:</b> ₹{getOrderTotal()}
          </div>
        </div>
      )}

      <div className="order-status">
        <h3>Current Status: {orderStatus}</h3>
        {orderStatus === "Delivered" && (
          <p className="delivered-text">✅ Order Delivered Successfully!</p>
        )}
      </div>
    </div>
  );
}

export default OrderStatus;
