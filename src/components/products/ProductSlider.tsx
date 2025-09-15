"use client";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import type { Swiper as SwiperClass } from "swiper";


// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const swiperStyles = {
    "--swiper-navigation-color": "#fff",
    "--swiper-pagination-color": "#fff",
  } as React.CSSProperties;
  // style={{
  //           "--swiper-navigation-color": "#fff",
  //           "--swiper-pagination-color": "#fff",
  //         }}


  return (
    <>
      <section className="flex flex-row-reverse gap-2">
        <Swiper
          style={swiperStyles}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 w-4/5"
        >
          {images &&
            images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Image src={img} alt="image product" className="mx-auto h-[37.5rem] bg-gray-100" width={500} height={500} />
              </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper w-1/5 max-h-[37.5rem] object-contain"
        >
          {images &&
            images.map((img, idx) => (
              <SwiperSlide key={idx} className="h-[100px]">
                <div className="h-full w-full">
                  <Image
                    src={img}
                    alt="product image"
                    className="object-contain rounded-md h-full w-full"
                    width={100}
                    height={100}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    </>
  );
}
