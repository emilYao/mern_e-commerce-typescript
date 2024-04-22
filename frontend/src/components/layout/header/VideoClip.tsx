import { FaPlayCircle } from "react-icons/fa";


interface props {
    image:string,
    video:string
}
export default function VideoClip({video, image}:props) {
  return (
    <div className="relative w-[2.5rem ] md:w-[4rem] md:h-[4rem] h-[2.5rem]  overflow-hidden group rounded-md
    max-[1024px]:border-2 border-4 border-white  scale-90">
        <img src={image} alt="img/clip"className="absolute top-0 left-0 right-0 z-5
        opacity-100 z-10 transition-opacity delay-100 ease-in-out duration-500 h-full w-full object-cover " />
        <div className="bg-gray-100 z-50 w-5 h-5 left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] absolute  play-icon rounded-full overflow-hidden
        group-hover:opacity-0">
            <FaPlayCircle className="w-5 h-5   text-black z-50"/>
        </div>
        <video src={video}
        autoPlay={true}
        playsInline={true}
        loop={true}
        muted={true}
        className="opacity-0 z-0 w-full h-full absolute top-0 right-0 left-0 
        group-hover:opacity-100 group-hover:z-20 object-cover"/>
    </div>
  )
}
