/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import OtherHeader from "../../components/otherHeader/otherHeader";
import OtherFooter from "../../components/otherFooter/otherFooter";
import Cart from "../mainPage/Cart/Cart"
import { FaWhatsapp, FaRegUser } from "react-icons/fa";
import { TbClockHour3 } from "react-icons/tb";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import "./DetailsProduct.css";
import { CartProvider } from "../mainPage/Cart/CartContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { notifyError, notifyWarn } from "../../views/util/Util";

function DetailsProduct() {

    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [usuario, setUsuario] = useState();
    const { authState } = useContext(AuthContext);

    const buscarProduto = async () => {

        if(!authState.token) {
            notifyWarn("Token não reinvidicado ainda")
            console.log("Token não reinvidicado ainda")
            return
        }

        try {
            const responseProduct = await axios.get(`http://localhost:8080/api/produto/${id}`, { headers: {Authorization: `Bearer ${authState.token}`}});

            if(responseProduct.status === 200) {
                setProductData(responseProduct.data)

                const response = await axios.get(`http://localhost:8080/api/produto/obterUsuario/${id}`, { headers: {Authorization: `Bearer ${authState.token}`}})

                if(response.status === 200) {
                    setUsuario(response.data)
                    console.log(response.data)
                } else {
                    notifyError("Usuário não encontrado")
                    console.error("Usuário não encontrado")
                }
            } else {
                notifyError("Erro ao trazer os dados")
                console.log("Erro ao trazer os dados")
            }
        
        } catch {
            notifyError("Erro ao realizar a requisição")
            console.error("Erro ao realizar a requisição")
        }
    }

    useEffect(() => {
        buscarProduto()
    }, [id])

    if(!productData) {
        return <div>Carregando...</div>
    }

  return (
    <div>
      <CartProvider>
        <OtherHeader />
        <Cart />
      </CartProvider>
      <div className="container-details-product">
        <div className="content-details-product">
            <div className="info-product">
                <h2>{productData.titulo || 'Titulo do Produto'}</h2>
                <div className="swiper-imgs-products">
                    <img src={productData.imagemUrl || 'no image'} alt="" />
                </div>
                <div className="description-price-product">
                    <p style={{color: 'black'}}>{productData.descricao || 'descrição do produto'}</p>
                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(productData.valorUnitario)}</span>
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
                        <span>{usuario.nomeCompleto}</span>
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
