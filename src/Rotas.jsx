import React from 'react';
import { Route, Routes } from "react-router-dom";

import RegisterPage from './pages/registerPage/registerPage';
import AccActivation from './pages/accActivation/accActivation';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="register-page" element={ <RegisterPage/> } />
                <Route path="activation" element={ <AccActivation/> } />
            </Routes>
        </>
    )
}

export default Rotas
