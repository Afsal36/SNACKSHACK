import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./OrderStatus.css";

function OrderStatus() {
  const { latestOrder, food_list } = useContext(StoreContext);
  const [orderStatus, setOrderStatus] = useState("Order Placed");

  useEffect(() => {
    const timer1 = setTimeout(() => setOrderStatus("Packing"), 1000);
    const timer2 = setTimeout(() => setOrderStatus("Out for Delivery"), 1000);
    const timer3 = setTimeout(() => setOrderStatus("Delivered"), 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const orderItems = Object.keys(latestOrder);

  return (
    <div className="order-status-page">
      <h2>Your Order</h2>
      {orderItems.length === 0 ? (
        <p>No items in your order.</p>
      ) : (
        <div className="order-items">
          {orderItems.map((itemId) => {
            const item = food_list.find((f) => f._id === itemId);
            const quantity = latestOrder[itemId];
            return (
              <div key={itemId} className="order-item">
                <p>{item?.name} x {quantity}</p>
                <p>₹{item?.price * quantity}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="order-status">
        <h3>Status: {orderStatus}</h3>
        {orderStatus === "Delivered" && <p>✅ Order Successful!</p>}
      </div>
    </div>
  );
}

export default OrderStatus;
