import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { hero } from '@/data/data';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import { EffectCube, Pagination } from 'swiper/modules';
register();




export default function Swipper() {

  return (

    <Swiper
    effect={'cube'}
    grabCursor={true}
    cubeEffect={{
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    
    }}
    loop={true}
    speed={900}
    autoplay={true}
    // pagination={true}
    modules={[EffectCube, Pagination]}
    className="mySwiper absolute w-[3rem] h-[3rem] md:w-[10rem] md:h-[10rem]  top-[10rem] md:top-[18rem] 3xl:top-[15rem] z-40 left-[50%] -translate-x-[50%]"
  >
    {
      hero.map((value, index)=>{
        return (
          <SwiperSlide key={index}>
          <img src={value.boxImage} className='w-[3rem] md:w-[10rem] md:h-[10rem] object-fill'/>
        </SwiperSlide>
        )
      })
    }

  </Swiper>
  )
}
