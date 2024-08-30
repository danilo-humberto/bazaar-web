import "./App.css";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Rotas from "./Rotas";
import { CartProvider } from "./pages/mainPage/Cart/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="container">
        <Rotas />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </CartProvider>
  );
}

export default App;
