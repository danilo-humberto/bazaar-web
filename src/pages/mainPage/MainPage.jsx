import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./MainPage.css";
import OtherHeader from "../../components/otherHeader/otherHeader";
import Footer from "../../components/footer/footer";
import Banner from "../../assets/bannerHD.png";
import Banner2 from "../../assets/banner2.png"
import { Autoplay, Pagination } from "swiper/modules";


export default function MainPage() {

  return (
    <div>
      <OtherHeader />
      <div className="background-main">
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
            <img src={Banner} alt="" className="slide-item"/>
          </SwiperSlide>
        </Swiper>
      </div>
      <Footer />
    </div>
  );
}
