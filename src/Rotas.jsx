import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from 'semantic-ui-react';

import Header from './components/header/header';

import RegisterPage from "./pages/registerPage/registerPage";
import LoginPage from "./pages/loginPage/LoginPage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import MainPage from "./pages/mainPage/MainPage";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="/" element={ <MainPage />}/>
      </Routes>
    </>
  );
}

export default Rotas;
