import React, { useState, useEffect } from "react";
import "./Header.css";

function Header() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = "/header_img.png"; // Same image used in CSS
    img.onload = () => setLoading(false);
  }, []);

  return (
    <div className="header">
      {/* 🔄 Loader overlay while image loads */}
      {loading && (
        <div className="header-loader">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* 🌟 Show content once loaded */}
      {!loading && (
        <div className="header-contents">
          <h2>Order Your Favourite Food Here</h2>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <button>View Menu</button>
        </div>
      )}
    </div>
  );
}

export default Header;
