import React from "react";
import { useCart } from './CartContext';

import "./Cart.css";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

function Cart() {

    const { isCartVisible, toggleCartVisibility } = useCart();

  return (
    <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className="cart-header">
        <p>
          Seu carrinho tem <span>2</span> itens
        </p>
        <button onClick={toggleCartVisibility}>X</button>
      </div>
      <div className="cart-items">
        <CartItem /> <CartItem />
      </div>
      <div className="cart-resume">
        <div className="cart-resume-prices">
            <span>Total:</span>
            <span>R$ 246,00</span>
        </div>
        <div className="cart-btn-finish">
          <Link to={'/payment'}><button>Finalizar Compra</button></Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
