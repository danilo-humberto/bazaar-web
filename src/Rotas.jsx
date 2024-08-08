import React from "react";
import { Route, Routes } from "react-router-dom";


import RegisterPage from "./pages/registerPage/registerPage";
import LoginPage from "./pages/loginPage/LoginPage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ProfilePage from "./pages/profilePage/ProfilePage";
import MainPage from "./pages/mainPage/MainPage";
import ProductPage from "./pages/productPage/FormProductPage";
import ListProduct from "./pages/productPage/ProductPage";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="profilePage" element={<ProfilePage />} />
        <Route path="/" element={ <MainPage />}/>
        <Route path="productPage" element={< ProductPage/>} />
        <Route path="listProduct" element={< ListProduct/>} />

      </Routes>
    </>
  );
}

export default Rotas;
