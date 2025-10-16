import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeCartItem } = useContext(StoreContext);

  // 🌀 Track image loading state
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        {/* 🌀 Loader (shows until image loads) */}
        {!isImageLoaded && (
          <div className="food-item-loader">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}

        {/* 🍔 Actual Food Image */}
        <img
          className={`food-item-image ${isImageLoaded ? "visible" : "hidden"}`}
          src={image}
          alt={name}
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* 🛒 Add / Remove Buttons */}
        {isImageLoaded && (
          <>
            {!cartItems[id] ? (
              <img
                className="add"
                onClick={() => addToCart(id)}
                src={assets.add_icon_white}
                alt="Add to cart"
              />
            ) : (
              <div className="food-item-counter">
                <img
                  onClick={() => removeCartItem(id)}
                  src={assets.remove_icon_red}
                  alt="Remove"
                />
                <p>{cartItems[id]}</p>
                <img
                  onClick={() => addToCart(id)}
                  src={assets.add_icon_green}
                  alt="Add"
                />
              </div>
            )}
          </>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
