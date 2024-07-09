import React from "react";
import { Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/registerPage/registerPage";
import AccActivation from "./pages/accActivation/accActivation";
import LoginPage from "./pages/loginPage/LoginPage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import MainPage from "./pages/mainPage/MainPage";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="register-page" element={<RegisterPage />} />
        <Route path="activation" element={<AccActivation />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="main" element={ <MainPage />}/>
      </Routes>
    </>
  );
}

export default Rotas;
