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
        autoClose={3000}
      />
    </div>
  );
}

export default App;
