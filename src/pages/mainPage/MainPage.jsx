import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainPage.css";
import OtherHeader from "../../components/otherHeader/otherHeader";
import OtherFooter from "../../components/otherFooter/otherFooter";
import Banner1 from "../../assets/banner1.png";
import Banner2 from "../../assets/banner2.png"
import Banner3 from "../../assets/banner3.png"
import Banner4 from "../../assets/banner4.png"
import { Autoplay, Pagination } from "swiper/modules";
import GridTemplate from "./Grids/gridTemplate";


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
                  disableOnInteraction: false
              }}
              modules={[Autoplay, Pagination]}
          >
            <SwiperSlide>
              <img src={Banner1} alt="" className="slide-item"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src={Banner2} alt="" className="slide-item"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src={Banner3} alt="" className="slide-item"/>
            </SwiperSlide>
            <SwiperSlide>
              <img src={Banner4} alt="" className="slide-item"/>
            </SwiperSlide>
          </Swiper>
        </div>
        <main>
          <div className="content-above-grids">
            <h1>Produtos Mais Próximos de Você</h1>
            <a href="#"><span>Ver mais...</span></a>
          </div>
          <GridTemplate />

          <div className="content-above-grids" style={{paddingTop: "20px"}}>
            <h1>Mais Vendidos</h1>
            <a href="#"><span>Ver mais...</span></a>
          </div>
          <GridTemplate />
        </main>
        <div className="contact">

        </div>
        <OtherFooter />
      </div>
    </div>
  );
}
