import './App.css';
import React from 'react';
import RegisterPage from './pages/registerPage/registerPage';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="container">
      <RegisterPage />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        closeOnClick
      />
    </div>
  );
}

export default App;
