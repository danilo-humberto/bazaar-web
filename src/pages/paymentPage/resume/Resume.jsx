import React from 'react';
import { useCart } from '../../mainPage/Cart/CartContext';
import { Button } from 'semantic-ui-react';
import './Resume.css';

const Resume = () => {
  const { cartItems, getTotalPrice, removeFromCart } = useCart();

  const handleRemove = (item) => {
    removeFromCart(item);
  };

  return (
    <div className="resume">
      <h3>Resumo do Pedido</h3>
      <div className="items-payment-container">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="item-payment">
              <img src={item.imagemUrl} alt={item.titulo} />
              <div className="info-item-payment">
                <p>{item.titulo}</p>
                <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valorUnitario)}</span>
              </div>
              <Button
                className="remove-btn"
                color="orange"
                onClick={() => handleRemove(item)}
              >
                Remover
              </Button>
            </div>
          ))
        ) : (
          <p>Seu carrinho está vazio.</p>
        )}
      </div>
      <div className="total-payment">
        <p>Total:</p>
        <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(getTotalPrice())}</span>
      </div>
      <div className="btn-finish">
        <Button
          color="orange"
          onClick={() => {}}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}

export default Resume;

