"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import slider1 from "@/assets/images/slider-image-1.jpeg";
import slider2 from "@/assets/images/slider-image-2.jpeg";
import slider3 from "@/assets/images/slider-image-3.jpeg";
import Image from "next/image";

const images = [
  {
    path: slider1.src,
    label: "Slide 1",
  },
  {
    path: slider2.src,
    label: "Slide 2",
  },
  {
    path: slider3.src,
    label: "Slide 3",
  },
];

const swiperOptions = {
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-4 border-2",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-red-500 border-white",
  },
  // className: "mySwiper",

  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  modules: [Autoplay, Pagination],

  // spaceBetween: 50,
  // slidesPerView: 1,
  // onSlideChange: () => console.log("slide change"),
  // onSwiper: (swiper) => console.log(swiper),
};

export default function MainSlider() {
  return (
    <div>
      <section>
        <div className="container mx-auto">
          <Swiper {...swiperOptions}>
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Image
                  src={img.path}
                  alt={img.label}
                  width={1920}
                  height={344}
                  className="w-full object-cover h-[21.5rem]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
