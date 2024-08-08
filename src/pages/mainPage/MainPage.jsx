import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainPage.css";
import OtherHeader from "../../components/otherHeader/otherHeader";
import OtherFooter from "../../components/otherFooter/otherFooter";
import Banner1 from "../../assets/banner1.png";
import Banner2 from "../../assets/banner2.png";
import Banner3 from "../../assets/banner3.png";
import Banner4 from "../../assets/banner4.png";
import ContactImage from "../../assets/image-contact.png";
import { Autoplay, Pagination } from "swiper/modules";
import GridTemplate from "./Grids/gridTemplate";
import { AiTwotoneExclamationCircle } from "react-icons/ai";
import axios from "axios";
import Cart from "./Cart/Cart";
import { CartProvider } from "./Cart/CartContext";

export default function MainPage() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const loginUser = localStorage.getItem("login");
    axios
      .get("http://localhost:8080/api/usuario/userCondition?login=" + loginUser)
      .then((response) => {
        if (response.data === true) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      });
  }, []);

  return (
    <div>
      <CartProvider>
        <OtherHeader />
        <Cart />
      </CartProvider>
      <div className="background-main">
        <div>
          <Swiper
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            style={{zIndex: '0'}}
          >
            <SwiperSlide>
              <img src={Banner1} alt="" className="slide-item" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Banner2} alt="" className="slide-item" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Banner3} alt="" className="slide-item" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={Banner4} alt="" className="slide-item" />
            </SwiperSlide>
          </Swiper>
        </div>
        <main>
          <div className="content-above-grids">
            <h1>Produtos Mais Baratos da Moda Masculina</h1>
            <a href="#">
              <span>Ver mais...</span>
            </a>
          </div>
          <GridTemplate descricao="ModaMasculina" />

          <div className="content-above-grids" style={{ paddingTop: "20px" }}>
            <h1>Produtos Mais Baratos da Moda Feminina</h1>
            <a href="#">
              <span>Ver mais...</span>
            </a>
          </div>
          <GridTemplate descricao="ModaFeminina" />

          <div className="content-above-grids" style={{ paddingTop: "20px" }}>
            <h1>Produtos Mais Baratos da Moda Infantil</h1>
            <a href="#">
              <span>Ver mais...</span>
            </a>
          </div>
          <GridTemplate descricao="ModaInfantil" />
        </main>
        <div className="contact">
          <div className="image-contact">
            <img src={ContactImage} alt="homem com duvida" />
          </div>
          <div className="form-contact">
            <h2>Entre em Contato</h2>
            <div className="form-content-contact">
              <div className="form-inputs">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nome Completo"
                />
                <input type="text" name="email" placeholder="E-mail" />
                <input type="text" name="message" placeholder="Mensagem" />
                <button>Contato Agora</button>
              </div>
              <div className="form-social">
                <div className="form-social-contact">
                  <h3>Contato</h3>
                  <span>bazaarroupas@gmail.com</span>
                </div>
                <div className="form-social-locate">
                  <h3>Localizado em</h3>
                  <span>Pernambuco, Recife</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isActive ? (
          <div style={{ display: "none" }}></div>
        ) : (
          <div className="info">
            <AiTwotoneExclamationCircle className="exclamation-icon" />
            <span>
              Verifique a sua conta no e-mail para uma melhor experiência !
            </span>
          </div>
        )}
        <OtherFooter />
      </div>
    </div>
  );
}
