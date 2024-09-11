/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Banner1 from "../../assets/banner1.png";
import Banner2 from "../../assets/banner2.png";
import Banner3 from "../../assets/banner3.png";
import Banner4 from "../../assets/banner4.png";
import ContactImage from "../../assets/image-contact.png";
import OtherFooter from "../../components/otherFooter/otherFooter";
import OtherHeader from "../../components/otherHeader/otherHeader";
import { AuthContext } from "../../context/AuthContext";
import { notifyError, notifySuccess } from "../../views/util/Util";
import Cart from "./Cart/Cart";
import { CartProvider } from "./Cart/CartContext";
import GridTemplate from "./Grids/gridTemplate";
import "./MainPage.css";

export default function MainPage() {
  const { authState } = useContext(AuthContext);
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [mensagem, setMensagem] = useState();

  const sendFeedback = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append("fullName", e.target.fullName.value);
    formData.append("email", e.target.email.value);
    formData.append("message", e.target.message.value);

    const response = await axios.post(
      "http://localhost:8080/api/email/feedback",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${authState.token}`,
        },
      }
    );

    setNome("");
    setEmail("");
    setMensagem("");
    if (response.status === 200) {
      notifySuccess("Feedback enviado com sucesso!");
    } else {
      notifyError("Algo inesperado aconteceu, tente novamente mais tarde!");
    }
  };

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
            style={{ zIndex: "0" }}
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
          </div>
          <GridTemplate descricao="ModaMasculina" />

          <div className="content-above-grids">
            <h1>Produtos Mais Baratos da Moda Feminina</h1>
          </div>
          <GridTemplate descricao="ModaFeminina" />

          <div className="content-above-grids">
            <h1>Produtos Mais Baratos da Moda Infantil</h1>
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
              <div style={{ flex: 1 }} onSubmit={sendFeedback}>
                <form className="form-inputs">
                  <input
                    type="text"
                    name="fullName"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <label className="label-nome">Nome Completo</label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="label-email">E-mail</label>
                  <input
                    type="text"
                    name="message"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                  />
                  <label className="label-message">Mensagem</label>
                  <button type="submit">Contato Agora</button>
                </form>
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
        <OtherFooter />
      </div>
    </div>
  );
}
