import React from "react";
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

export default function MainPage() {
  return (
    <div>
      <OtherHeader />
      <div className="background-main">
        <div className="slider-contents">
          <Swiper
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
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
            <h1>Principais Produtos Masculinos</h1>
            <a href="#">
              <span>Ver mais...</span>
            </a>
          </div>
          <GridTemplate />

          <div className="content-above-grids" style={{ paddingTop: "20px" }}>
            <h1>Principais Produtos Femininos</h1>
            <a href="#">
              <span>Ver mais...</span>
            </a>
          </div>
          <GridTemplate />

          <div className="content-above-grids" style={{ paddingTop: "20px" }}>
            <h1>Principais Produtos Infantis</h1>
            <a href="#">
              <span>Ver mais...</span>
            </a>
          </div>
          <GridTemplate />
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
        <div className="info">
          <AiTwotoneExclamationCircle className="exclamation-icon"/>
          <span>Verifique a sua conta no e-mail informado no cadastro !</span>
        </div>
        <OtherFooter />
      </div>
    </div>
  );
}
