import "./App.css";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Rotas from "./Rotas";
import GridTemplate from "./pages/mainPage/Grids/gridTemplate";

function App() {
  return (
    <div className="container">
      <Rotas />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
