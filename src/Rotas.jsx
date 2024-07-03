import React from "react";
import { Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/registerPage/registerPage";
import LoginPage from "./pages/loginPage/LoginPage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="register-page" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default Rotas;
