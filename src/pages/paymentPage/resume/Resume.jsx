import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { AuthContext } from '../../../context/AuthContext';
import { notifyError, notifySuccess } from '../../../views/util/Util';
import { useCart } from '../../mainPage/Cart/CartContext';
import './Resume.css';

const Resume = () => {
  const { cartItems, getTotalPrice, removeFromCart, clearCart} = useCart();
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  const finishPayment = async () => {
    const response = await axios.post(`http://localhost:8080/api/pagamento/${authState.userId}`, true, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response)

    if(response.status === 200 || response.status === 201) {
      generateOrder(response.data.id)
      navigate('/listCompras')
      clearCart();
    }
  }

  const generateOrder = async (id) => {
    let response = await axios.get(`http://localhost:8080/api/carrinho/cartId/${authState.userId}`)

    if(!response.status === 200){
      notifyError("Erro ao identificar o carrinho, tente novamente mais tarde!")
      return
    }

    let generator = await axios.post(`http://localhost:8080/api/pedidos/${authState.userId}/${response.data}/${id}`)

    if(generator.status === 200 || generator.status === 201) {
      notifySuccess("Pedido Realizado com sucesso!");
    } else {
      notifyError("Erro ao realizar o pedido, tente novamente mais tarde!")
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
              <img src={`http://localhost:8080/static/uploaded-imgs/${item.imagem}`} alt={item.titulo} style={{borderRadius: '10px'}}/>
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

