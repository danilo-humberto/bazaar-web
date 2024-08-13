import React from "react";
import { Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/registerPage/registerPage";
import LoginPage from "./pages/loginPage/LoginPage";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import MainPage from "./pages/mainPage/MainPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import AddressPage from "./pages/addressPage/AddressPage";
import FormProductPage from "./pages/productPage/FormProductPage"
import ListProductPage from "./pages/productPage/ListProductPage"
import DetailsProduct from "./pages/detailsProductPage/DetailsProduct";
import Payment from "./pages/paymentPage/Payment";

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
        <Route path="/formProduct" element={ <FormProductPage />}/>
        <Route path="/listProduct" element={ <ListProductPage />}/>
        <Route path="/detailsProduct" element={ <DetailsProduct />}/>
        <Route path="/payment" element={ <Payment />}/>
      </Routes>
    </>
  );
}

export default Rotas;
