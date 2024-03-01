import { Link, NavLink } from "react-router-dom";
import logo from "@/public/images/nike.png";
import { AiOutlineMail } from "react-icons/ai";
import { TfiInstagram } from "react-icons/tfi";

interface props {
  value: {
    title: string;
    links: string[];
  }[];
}
const Footer = ({ value }: props) => {
  return (
    <div className="max-w-screen mt-[5rem] bg-slate-100 text-slate-100 ">
      <div className="  container textFont w-screen  md:w-[70%] xl:w-[50%] 3xl:w-[40%] md:mx-auto ">
        <div className="flex justify-between  pb-[1rem]">
          {value.map((item, index) => {
            return (
              <div key={index} className="grid">
                <p className="font-semibold text-slate-950 pt-3 3xl:text-[2rem]  ">
                  {item.title}
                </p>
                <ul className="grid   ">
                  {item.links.map((link, idx) => (
                    <li
                      key={idx}
                      className="hover:text-slate-950 text-slate-800 transition-all text-[8px] ease-in-out duration-500 
                                    3xl:text-[1rem] xl:text-[0.8rem] cursor-pointer hover:translate-x-[0.5rem] p-1"
                    >
                        
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="col-span-4 hidden">
            <p className="text-yellow-400  font-bold text-4xl textFont tracking-wide ">
              FALCON
            </p>

            <img src={logo} alt="logo-footer" className="h-[9rem]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
