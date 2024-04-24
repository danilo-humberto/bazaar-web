import './App.css';
import React from 'react';
import AccActivation from './pages/accActivation/accActivation';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="container">
      <AccActivation />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
      />
    </div>
  );
}

export default App;
