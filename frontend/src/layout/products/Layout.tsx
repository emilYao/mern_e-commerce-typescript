import Header from "@/components/layout/header/Header";
import Register from "@/components/forms/user/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "@/components/forms/user/Login";
import { Heroswipper } from "@/components/layout/header/Heroswipper";
import { footerAPI } from "@/data/data";

import Footer from "@/components/layout/footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout() {
  const location = useLocation().pathname;
  
  const [navbg, setNavbg] = useState(false);
  const [getHeight, setHeight] = useState(window.scrollY);

  const checkScrollHight = () => {
    if (window.scrollY > 40) {
      setNavbg(true);
    } else {
      setNavbg(false);
    }
  };
 


  useEffect(() => {
    window.addEventListener("scroll", () => {
      return checkScrollHight();
    });

    return () => checkScrollHight();
  });

  return (
    <div className="relative  min-h-screen">
      <div
        className={`${
          location === "/"
            ? "opacity-[0.5] clip-path h-[15rem] relative  3xl:h-[25rem] md:h-[28rem]"
            : "h-[5rem]"
        }`}
      >
        <Header />
        {location === "/" && (
          <>
            <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-slate-900 -z-[5] opacity-[0.4]"></div>

            <Heroswipper />
          </>
        )}
      </div>

      <ToastContainer position="top-center" className="z-100" />

      <Outlet />
    
        <Register />
        <Login />
     

      <Footer value={footerAPI} />
    </div>
  );
}
