import React from "react";
import OtherHeader from "../../components/otherHeader/otherHeader";
import OtherFooter from "../../components/otherFooter/otherFooter";
import Cart from "../mainPage/Cart/Cart"
import ImageTeste from "../../assets/imageteste.jpeg"
import { FaWhatsapp, FaRegUser } from "react-icons/fa";
import { TbClockHour3 } from "react-icons/tb";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import "./DetailsProduct.css";
import { CartProvider } from "../mainPage/Cart/CartContext";

function DetailsProduct() {
  return (
    <div>
      <CartProvider>
        <OtherHeader />
        <Cart />
      </CartProvider>
      <div className="container-details-product">
        <div className="content-details-product">
            <div className="info-product">
                <h2>Titulo do Produto</h2>
                <div className="swiper-imgs-products">
                    <img src={ImageTeste} alt="" />
                </div>
                <div className="description-price-product">
                    <p style={{color: 'black'}}>descrição do produto</p>
                    <span>R$ 20,00</span>
                </div>
                <div className="btn-add-to-cart">
                    <button>Adicionar ao Carrinho</button>
                </div>
            </div>
            <div className="info-contact-seller">
                <div className="contact-seller">
                    <span>Entre em contato com o vendedor</span>
                    <button><FaWhatsapp style={{fontSize: '22px', color: 'white'}}/></button>
                </div>
                <div className="info-seller">
                    <span>Informações do Vendedor</span>
                    <div className="name-seller">
                        <FaRegUser style={{color: '#ff7a00', fontSize: '21px', paddingLeft: '3px'}}/>
                        <span>Nome do Vendedor</span>
                    </div>
                    <div className="time-product">
                        <TbClockHour3 style={{color: '#ff7a00', fontSize: '25px'}}/>
                        <p>No Bazaar desde 10/06/2024</p>
                    </div>
                </div>
                <div className="security-tip">
                    <span>Dica de Segurança</span>
                    <div className="icon-security-tip">
                        <IoShieldCheckmarkOutline style={{fontSize: '50px', color: '#ff7a00'}}/>
                        <p>Nunca faça pagamentos fora do site.</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <OtherFooter />
    </div>
  );
}

export default DetailsProduct;
