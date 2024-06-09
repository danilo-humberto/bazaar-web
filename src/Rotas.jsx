import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from 'semantic-ui-react';

import Header from './components/header/header';

import RegisterPage from "./pages/registerPage/registerPage";
import AccActivation from "./pages/accActivation/accActivation";
import LoginPage from "./pages/loginPage/LoginPage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";

function Rotas() {
  return (
    <>
      <Header />
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path="register-page" element={<RegisterPage />} />
          <Route path="activation" element={<AccActivation />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </Container>
    </>
  );
}

export default Rotas;
