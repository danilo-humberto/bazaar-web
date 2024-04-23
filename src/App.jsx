import './App.css';
import React from 'react';
import AccAuthentication from './pages/accAuthentication/accAuthentication';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="container">
      <AccAuthentication />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
      />
    </div>
  );
}

export default App;
