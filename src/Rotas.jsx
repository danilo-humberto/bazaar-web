import React from "react";
import { Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/registerPage/registerPage";
import LoginPage from "./pages/loginPage/LoginPage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import MainPage from "./pages/mainPage/MainPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import AddressPage from "./pages/addressPage/AddressPage";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="address" element={<AddressPage />} />
        <Route path="/" element={ <MainPage />}/>
      </Routes>
    </>
  );
}

export default Rotas;
