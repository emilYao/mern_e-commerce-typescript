import { ModeToggle } from "@/components/mode-toggle";
import logo from "../../../public/image/logo.png"
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { BsCart4, BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserDropDown } from "../UserDropDown";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="container md:px-[2rem]  3xl:px-[20rem] py-[0.5rem] 3xl:py-5  flex justify-between items-center ">
      <div>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-[3rem] md:w-[5rem] 3xl:w-[7rem]"
          />
        </Link>
      </div>
      <div className="flex gap-10 3xl:gap-[10rem]">
        <div className="flex gap-3 3xl:gap-[5rem] items-center ">
          <CiSearch
            size={21}
            className="text-white  cursor-pointer 3xl:scale-[2]"
          />
          <FaRegHeart
            size={21}
            className="text-white cursor-pointer 3xl:scale-[2]"
          />
          <BsCart4
            size={21}
            className="text-white cursor-pointer rotate-[360deg] 3xl:scale-[2]"
          />
        </div>
        <div className="flex gap-2 items-center  3xl:scale-[2]">
          <div>
          <UserDropDown/>
          </div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
