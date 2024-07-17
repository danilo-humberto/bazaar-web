import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainPage.css";
import OtherHeader from "../../components/otherHeader/otherHeader";
import OtherFooter from "../../components/otherFooter/otherFooter";
import Banner from "../../assets/banner.png";
import Banner2 from "../../assets/banner2.png"
import Banner3 from "../../assets/banner3.png"
import Banner4 from "../../assets/banner4.png"
import { Autoplay, Pagination } from "swiper/modules";


export default function MainPage() {

  return (
    <div>
      <OtherHeader />
      <div className="background-main">
        <div className="content-main">
          <Swiper
              pagination={{ clickable: true }}
              autoplay={{
                  delay: 2500,
                  disableOnInteraction: false
              }}
              modules={[Autoplay, Pagination]}
          >
            <SwiperSlide>
              <img src={Banner} alt="" className="slide-item"/>
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
        <h1>Teste</h1>
      </div>
      <OtherFooter />
    </div>
  );
}
