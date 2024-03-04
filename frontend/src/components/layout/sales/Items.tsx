import { productReturnType } from "@/types/type";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

import TruncateMarkup from "react-truncate-markup";

import { Grid, Pagination } from "swiper/modules";


interface props{
    title:string,
    items:productReturnType[],
    rows:number;
    isRelated:boolean;

}

export default function Items({title, items,rows, isRelated}:props) {
  const navigate = useNavigate()

  return (
    <div className={!isRelated ? `bg-white  drop-shadow-[5px_5px_5px_rgba(0,0,0,0.2)] h-[17rem] md:h-[22rem] xl:h-[25rem] 3xl:h-[38rem] 3xl:w-[70%] xl:w-[80%] mx-[auto]` : `xl:h-[100%]  h-[10rem] md:h-[13rem]`}>
    <p className={`font-bold text-slate-600 py-1 px-[1rem] 3xl:text-[2rem] xl:py-[1rem] xl:ml-[8rem] 3xl:ml-[14rem] ${isRelated && "xl:ml-[0rem] 3xl:ml-[0rem]"}`}>{title}</p>

    <Swiper
      slidesPerView={isRelated ?5 : 3}
      grid={{
        rows: rows,
      }}
      spaceBetween={10}
      speed={1900}
      autoplay={true}
      pagination={{
        clickable: true,
        enabled:!isRelated
      }}
      modules={[Grid, Pagination]}
      className={` mySwiper  h-[15rem] md:h-[80%] xl:h-[80%] xl:w-[62rem] 3xl:w-[91rem] w-screen  px-[1rem] mx-[auto] ${isRelated && 'xl:w-[100%] 3xl:w-[100%]'}` }
    >
             {items.map((item, index) => {
        return (
          <SwiperSlide key={index} onClick={()=>navigate(`/product/${item.category}/${item.id}`,{
            state:{
              item,
              items
            },
            replace:isRelated
            })} className={!isRelated ?"grid gap-0  px-[3px] md:px-[16px] xl:px-[4rem] grid-rows-12 bg-white hover:scale-105 cursor-pointer h-[100%]  text-center   ": "md:h-[9rem] cursor-pointer" } >
            <div className={!isRelated ?  "row-span-8 w-[100%] h-[100%] relative": "md:scale" }>
              <img
                src={item.images[0]}
                alt=""
                className={!isRelated ?  " h-[100%] w-[100%]  object-fill" : "md:h-[6rem] xl:h-[8rem] md:w-[100%]"}
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
  )
}
