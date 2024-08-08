import React from "react";
import ImageTeste from "../../../../assets/imageteste.jpeg"

import "./CartItem.css";
import { Icon } from "semantic-ui-react";

export default function CartItem() {
  return (
    <section className="cart-item">
      <img src={ImageTeste} alt="imagem do produto" className="cart-item-image" />
      <div className="cart-item-content">
        <p className="cart-item-title">Titulo do Produto</p>
        <div className="cart-item-price-btn">
          <h3 className="cart-item-price">R$ 123,00</h3>
          <div className="cart-item-btn"><Icon name="trash" color="red"/></div>
        </div>
      </div>
    </section>
  );
}
