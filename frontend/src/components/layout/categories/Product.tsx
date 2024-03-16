import { productReturnType } from "@/types/type";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import TruncateMarkup from "react-truncate-markup";
import { useNavigate } from "react-router-dom";
interface props {
  items: productReturnType[];
}

export default function Product({ items }: props) {
    const navigate = useNavigate();
  return (
    <div>
      <Swiper
        loop={true}
        // effect="creative"
        speed={900}
        autoplay={true}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: false,
            translate: [0, 0, 0],
            opacity: 0,
            scale: 0,
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper  top-0 left-0 w-[100%] h-[7rem] md:h-[16rem] xl:h-[19rem] 3xl:h-[30rem] xl:w-[15rem]"
      >
        {items?.map((item, index) => {
          return (
            <SwiperSlide key={index} className="grid gap-0  grid-rows-12 bg-white hover:scale-105 cursor-pointer h-[100%] " onClick={()=>navigate(`product/${item.category}`)}>
              <div className="row-span-8 w-[100%] h-[80%] relative">
                <img
                  src={item.images[0]}
                  alt=""
                  className="w-[100%] h-[100%]  object-fill "
                />
                <span className="top-[0.4rem] 3xl:text-[16px] left-[0.5rem]  drop-shadow-md shadow-md py-1 px-2 rounded-full text-[8px] bg-yellow-300 text-white absolute">
                  +{item.rating}
                </span>
              </div>

              <div className="text-[5px] md:text-[8px] xl:text-[10px] 3xl:text-[16px] text-slate-700  row-span-4">
                <TruncateMarkup lines={2}>
                  <p >{item.name}</p>
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
