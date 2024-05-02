import React from "react";
import { Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/registerPage/registerPage";
import AccActivation from "./pages/accActivation/accActivation";
import LoginPage from "./pages/loginPage/LoginPage";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="register-page" element={<RegisterPage />} />
        <Route path="activation" element={<AccActivation />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default Rotas;
