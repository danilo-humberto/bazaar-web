import React from "react";

import './asideContent.css'

export default function AsideContent() {
    return (
        <div className="container-aside">
            <div className="center-content">
                <h2>bem vindo ao bazaar</h2>
                <p>o bazaar com os melhores preços e peças.</p>
            </div>
            <div className="bottom-content">
                <p>Já tem uma conta ?</p>
                <button>Entrar</button>
            </div>
        </div>
    )
}