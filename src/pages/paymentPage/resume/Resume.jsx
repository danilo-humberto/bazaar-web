import React from 'react'
import imageteste from '../../../assets/imageteste.jpeg'

import './Resume.css'

const Resume = () => {
  return (
    <div>
      <div className="itens-payment">
                <img src={imageteste} alt="" />
                <div className="info-itens-payment">
                  <p>camisa de time teste</p>
                  <span>R$ 50,00</span>
                </div>
              </div>
              <div className="itens-payment">
                <img src={imageteste} alt="" />
                <div className="info-itens-payment">
                  <p>camisa de time teste</p>
                  <span>R$ 50,00</span>
                </div>
              </div>
              <div className="total-itens-payment">
                  <p>Total:</p>
                  <span>R$ 50,00</span>
              </div>
              <div className='btn-finish'>
                <button>Finalizar Compra</button>
              </div>
    </div>
  )
}

export default Resume
