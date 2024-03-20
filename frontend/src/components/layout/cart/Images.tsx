import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import TruncateMarkup from "react-truncate-markup";
import { useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


interface props{
    images:string[], 
}
const Images = ({images}:props) => {
    return (
        <div>
    
        {
          !images && 
          <Skeleton count={1} className="h-[80%]"/>
        }
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
            className="mySwiper w-[4rem] h-[3rem] md:w-[5rem] h-[4rem]"
          >
            {images?.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <div >
                    <img
                      src={image}
                      alt=""
                      className="w-[100%] h-[100%]  object-contain "
                    />
                  </div>
    

                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      );
}

export default Images
