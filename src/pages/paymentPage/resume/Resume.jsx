import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { AuthContext } from '../../../context/AuthContext';
import { notifySuccess } from '../../../views/util/Util';
import { useCart } from '../../mainPage/Cart/CartContext';
import './Resume.css';

const Resume = () => {
  const { cartItems, getTotalPrice, removeFromCart} = useCart();
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const finishPayment = async () => {
    const response = await axios.post(`http://localhost:8080/api/pagamento/${authState.userId}`, true, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if(response.status === 200 || response.status === 201) {
      notifySuccess("Compra Efetuada !")
      navigate('/listCompras')
    }
  }

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
          onClick={finishPayment}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}

export default Resume;

