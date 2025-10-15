import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  // 🛒 Cart stored as { itemId: quantity }
  const [cartItems, setCartItems] = useState({});
  const [latestOrder, setLatestOrder] = useState({}); // 🧾 Stores last placed order

  // ➕ Add item to cart
  function addToCart(itemId) {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  }

  // ➖ Remove item from cart
  function removeCartItem(itemId) {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;
      if (prev[itemId] === 1) {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      } else {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      }
    });
  }

  // 💰 Calculate total cart amount
  function getTotalCartAmount() {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  }

  // ✅ Place order: store current cart and clear it
  function placeOrder() {
    setLatestOrder({ ...cartItems }); // store current cart items
    setCartItems({}); // empty the cart after placing order
  }

  const contextValue = {
    food_list,
    cartItems,
    latestOrder,
    addToCart,
    removeCartItem,
    getTotalCartAmount,
    placeOrder,
    setCartItems,
    setLatestOrder,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

