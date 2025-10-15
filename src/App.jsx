import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home/Home";
import Placeholder from "./Pages/Placeholder/Placeholder";
import Cart from "./Pages/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import OrderStatus from "./Pages/OrderStatus/OrderStatus";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Placeholder />} />
          <Route path="/order-status" element={<OrderStatus/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
