import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import TruncateMarkup from "react-truncate-markup";

import { Grid, Pagination } from "swiper/modules";
import { productReturnType } from "@/types/type";

interface props{
    title:string,
    items:productReturnType[]
}
export default function Product({title, items}:props) {
  return (
    <div className="bg-white  drop-shadow-[5px_5px_5px_rgba(0,0,0,0.2)] h-[17rem] md:h-[22rem] xl:h-[25rem] 3xl:h-[38rem] 3xl:w-[70%] xl:w-[80%] mx-[auto]">
      <p className="font-bold text-slate-600 py-1 px-[1rem] 3xl:text-[2rem] xl:py-[1rem] xl:ml-[8rem] 3xl:ml-[14rem]">{title}</p>

      <Swiper
        slidesPerView={3}
        grid={{
          rows: 2,
        }}
        spaceBetween={10}
        speed={1900}
        autoplay={true}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination]}
        className="mySwiper  h-[15rem] md:h-[80%] xl:h-[80%] xl:w-[62rem] 3xl:w-[91rem] w-screen  px-[1rem] mx-[auto] "
      >
               {items.map((item, index) => {
          return (
            <SwiperSlide key={index} className="grid gap-0 px-[3px] md:px-[16px] xl:px-[4rem] grid-rows-12 bg-white hover:scale-105 cursor-pointer h-[100%]  text-center   ">
              <div className="row-span-8 w-[100%] h-[100%] relative">
                <img
                  src={item.images[0]}
                  alt=""
                  className=" h-[100%] w-[100%]  object-fill  "
                />
                <span className="top-[0.2rem] 3xl:text-[16px] xl:text-[10px] left-[0.5rem] drop-shadow-md shadow-md py-[1px] px-1 rounded-full text-[5px] bg-yellow-300 text-white absolute">
                  +{item.rating}
                </span>
              </div>

              <div className="text-[5px] text-start md:text-[8px] xl:text-[10px] 3xl:text-[16px] text-slate-700  row-span-4">
                <TruncateMarkup lines={2}>
                  <p className="text-10px]">{item.name}</p>
                </TruncateMarkup>
                <p className="mt-[0.5rem]">
                  <span className="drop-shadow-md shadow-md p-1 rouned-md bg-yellow-300 text-white">
                    GH {item.price}
                  </span>{" "}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      
      </Swiper>
    </div>
  );
}
