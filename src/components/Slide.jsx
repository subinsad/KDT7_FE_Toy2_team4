import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import pic1 from "../assets/slide1.jpg";
import pic2 from "../assets/slide2.jpg";
import pic3 from "../assets/slide3.jpg";
import styled from "styled-components";
import "swiper/css/pagination";
import "swiper/css/navigation";
const Img = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 1rem;
`;

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slide = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        speed={500}
        className="mySwiper"
      >
        <SwiperSlide>
          <Img src={pic1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={pic2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <Img src={pic3} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slide;
