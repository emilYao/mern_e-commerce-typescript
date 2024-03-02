import { ModeToggle } from "@/components/mode-toggle";
import logo from "@/public/image/logo.png";
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { UserDropDown } from "../../UserDropDown";
import Productnav from "./Productnav";
import SearchInput from "./SearchInput";
import { useEffect, useState } from "react";

type Props = {};

export default function Header({}: Props) {
  const location = useLocation().pathname;

  return (
    <div className="container  z-[110] md:px-[2rem]  grid gap-1 3xl:px-[20rem]   3xl:py-5 ">
      <div className="container  md:px-[2rem]  3xl:px-[20rem] py-[0.5rem] 3xl:py-5  flex justify-between items-center ">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-[3rem] md:w-[5rem] 3xl:w-[7rem]"
            />
          </Link>
        </div>
        <div>
          {location === "/" && (
            <div className="md:block grow md:mx-[4rem] hidden w-full">
              <SearchInput />
            </div>
          )}
        </div>

        <div className="flex gap-10 3xl:gap-[10rem]">
          <div className="flex gap-3 3xl:gap-[5rem] items-center ">
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
              <UserDropDown />
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>

      {location === "/" && (
        <>
          <div className="md:hidden block">
            <SearchInput />
          </div>
          <div className="">
            <Productnav />
          </div>
        </>
      )}
    </div>
  );
}
