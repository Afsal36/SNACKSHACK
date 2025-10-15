import React, { useContext } from "react";
import "./Placeholder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router"; // ✅ Import navigate

function Placeholder() {
  const { getTotalCartAmount, placeOrder } = useContext(StoreContext);
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handlePayment = (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll(".place-order input");
    let allFilled = true;
    inputs.forEach((input) => {
      if (input.value.trim() === "") allFilled = false;
    });

    if (getTotalCartAmount() === 0) {
      alert("🛒 Your cart is empty. Please add items before proceeding.");
      return;
    }

    if (!allFilled) {
      alert("⚠️ Please fill in all delivery details before proceeding.");
      return;
    }

    // ✅ Save order and clear cart
    placeOrder();

    // ✅ Show alert and navigate on OK
    if (window.confirm("✅ Order placed successfully! Click OK to view order status.")) {
      navigate("/order-status"); // ✅ Use navigate instead of page reload
    }
  };

  return (
    <div>
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multy-fields">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="Street" required />
          <div className="multy-fields">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
          </div>
          <div className="multy-fields">
            <input type="number" placeholder="Zip code" required />
            <input type="text" placeholder="Country" required />
          </div>
          <input type="number" placeholder="Phone" required />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ₹
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + 50}
                </b>
              </div>
            </div>
            <button onClick={handlePayment}>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Placeholder;




