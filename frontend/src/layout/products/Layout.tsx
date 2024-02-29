import Header from "@/components/layout/header/Header";
import Register from "@/components/forms/user/Register";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "@/components/forms/user/Login";
import Swipper from "@/components/layout/header/Swipper";
import { Heroswipper } from "@/components/layout/header/Heroswipper";
import {clip} from "@/data/data";
import VideoClip from "@/components/layout/header/VideoClip";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  

  return (
    <div className="relative  min-h-screen">
      <div className="opacity-[0.5] clip-path h-[15rem] relative  3xl:h-[25rem] md:h-[28rem]">
        <Header />
        <div className='absolute top-0 left-0 w-[100%] h-[100%] bg-slate-900 -z-[5] opacity-[0.4]'></div>

        <Heroswipper/>




      </div>

      <ToastContainer position="top-center" className="z-100"/>

      <div className=" w-[2.5rem] md:w-[4rem] md:h-[25rem] h-[15rem] absolute top-[9.2rem]  left-2 md:left-[8rem] 3xl:left-[19.9rem] z-10">
          {
            clip.map((value, index)=>{
              return (
                <VideoClip image={value.image} video={value.video} key={index} />
              )
            })
          }
        </div>
      <Swipper/>

      <Register />
      <Login/>
      {children}
    </div>
  );
}
