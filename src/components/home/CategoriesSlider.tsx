"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import { ICategory } from "@/interfaces/category.interface";
import Link from "next/link";

const swiperOptions = {
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-4 border-2",
    bulletActiveClass:
      "swiper-pagination-bullet-active !bg-red-500 border-white",
  },

  modules: [Pagination],

  spaceBetween: 10,
  slidesPerView: 1,
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
  // onSlideChange: () => console.log("slide change"),
  // onSwiper: (swiper) => console.log(swiper),
};

export default function CategoriesSlider({
  categories,
}: {
  categories: ICategory[];
}) {
  console.log("categoriessssssss", categories);

  return (
    <Swiper className={"categories-slider mb-20"} {...swiperOptions}>
      {categories &&
        categories.map((cat) => (
          <SwiperSlide key={cat._id}>
            <Link
             href={`/categories/${cat._id}`}>
              <Image
                src={cat.image}
                alt={cat.name}
                width={270}
                height={250}
                className="w-full mb-4 object-contain bg-gray-100 h-[15.625rem]"
              />
              <h3 className="font-medium">{cat.name}</h3>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
