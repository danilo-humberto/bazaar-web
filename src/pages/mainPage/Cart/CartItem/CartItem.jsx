import React from "react";

import "./CartItem.css";
import { Icon } from "semantic-ui-react";
import { useCart } from "../CartContext";

export default function CartItem({item}) {

  const { removeFromCart } = useCart();

  const handleRemoveItem = () => {
    removeFromCart(item);
  };

  return (
    <section className="cart-item">
      <img src={`http://localhost:8080/static/uploaded-imgs/${item.imagem}`} alt="imagem do produto" className="cart-item-image" />
      <div className="cart-item-content">
        <p className="cart-item-title">{item.titulo}</p>
        <div className="cart-item-price-btn">
          <h3 className="cart-item-price">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorUnitario)}</h3>
          <div className="cart-item-btn" onClick={handleRemoveItem}><Icon name="trash" color="red"/></div>
        </div>
      </div>
    </section>
  );
}
