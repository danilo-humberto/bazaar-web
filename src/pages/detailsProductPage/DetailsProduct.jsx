/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import OtherHeader from "../../components/otherHeader/otherHeader";
import OtherFooter from "../../components/otherFooter/otherFooter";
import Cart from "../mainPage/Cart/Cart";
import { FaWhatsapp, FaRegUser } from "react-icons/fa";
import { TbClockHour3 } from "react-icons/tb";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import "./DetailsProduct.css";
import { useCart } from "../mainPage/Cart/CartContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { notifyError } from "../../views/util/Util";

function DetailsProduct() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const { authState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [timeoutError, setTimeoutError] = useState(false);
  const { addToCart } = useCart();

  const buscarProduto = async () => {
    if (!authState.token) {
      console.log("Token não reinvidicado ainda");
      return;
    }

    try {
      const responseProduct = await axios.get(
        `http://localhost:8080/api/produto/${id}`,
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );

      if (responseProduct.status === 200) {
        setProductData(responseProduct.data);
        setIsLoading(false);
        buscarUsuario();
      } else {
        console.log("Erro ao trazer os dados");
      }
    } catch {
      console.error("Erro ao realizar a requisição");
    }
  };

  const buscarUsuario = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/produto/obterUsuario/${id}`,
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );

      if (response.status === 200) {
        setUsuario(response.data);
      } else {
        console.error("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao realizar a requisição do usuário", error);
    }
  };

  useEffect(() => {
    buscarProduto();
  }, [id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading && !timeoutError) {
        setTimeoutError(true);
        notifyError("O carregamento demorou muito. Tente novamente.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [isLoading, timeoutError]);

  if (timeoutError) {
    return null;
  }

  if (!productData) {
    return <div>Carregando...</div>;
  }

  const handleAddToCart = () => {
    addToCart(productData);
  };

  return (
    <div>
      <OtherHeader />
      <Cart />
      <div className="container-details-product">
        <div className="content-details-product">
          <div className="info-product">
            <h2>{productData.titulo || "Titulo do Produto"}</h2>
            <div className="swiper-imgs-products">
              <img src={`http://localhost:8080/static/uploaded-imgs/${productData.imagem}` || "no image"} alt="" />
            </div>
            <div className="description-price-product">
              <p style={{ color: "black" }}>
                {productData.descricao || "descrição do produto"}
              </p>
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(productData.valorUnitario)}
              </span>
            </div>
            <div className="btn-add-to-cart">
              <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
            </div>
          </div>
          <div className="info-contact-seller">
            <div className="contact-seller">
              <span>Entre em contato com o vendedor</span>
              <button>
                <FaWhatsapp style={{ fontSize: "22px", color: "white" }} />
              </button>
            </div>
            <div className="info-seller">
              <span>Informações do Vendedor</span>
              <div className="name-seller">
                <FaRegUser
                  style={{
                    color: "#ff7a00",
                    fontSize: "21px",
                    paddingLeft: "3px",
                  }}
                />
                <span>{usuario ? usuario.nomeCompleto : "null"}</span>
              </div>
              <div className="time-product">
                <TbClockHour3 style={{ color: "#ff7a00", fontSize: "25px" }} />
                <p>No Bazaar desde 10/06/2024</p>
              </div>
            </div>
            <div className="security-tip">
              <span>Dica de Segurança</span>
              <div className="icon-security-tip">
                <IoShieldCheckmarkOutline
                  style={{ fontSize: "50px", color: "#ff7a00" }}
                />
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
