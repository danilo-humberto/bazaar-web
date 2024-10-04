import React from 'react'
import {QRCodeSVG} from 'qrcode.react';

import './Pix.css'

const Pix = () => {
  return (
    <div className='pix-container'>
      <h2>Escaneie o QR Code abaixo para realizar o pagamento</h2>
      <div className="pix-qrcode">
        <QRCodeSVG value='http://google.com' size={200}/>
      </div>
    </div>
  )
}

export default Pix
