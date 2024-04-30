import './App.css';
import React from 'react';
import AccActivation from './pages/accActivation/accActivation';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import Rotas from './Rotas';

function App() {
  return (
    <div className="container">

      <Rotas />

      <AccActivation />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
      />
    </div>
  );
}

export default App;
