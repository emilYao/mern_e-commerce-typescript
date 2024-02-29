import { useRef, useEffect } from 'react';
// import { register } from 'swiper/element/bundle';
import { hero } from '@/data/data';
import { Swiper, SwiperSlide } from "swiper/react";
// register();

export const Heroswipper = () => {
 

  return (
    <Swiper 
    loop={true}
    speed={900}
    autoplay={true}
    className="mySwiper absolute top-0 left-0 w-[100%] h-[100%] -z-10 ">
        {
            hero.map((value, index)=>{
                return (
                    <SwiperSlide key={index}>
                        <img src={value.background} alt="" className='w-[100%] h-[100%] object-cover'/>
                    </SwiperSlide>

                )
            })
        }

      </Swiper>
  );
};