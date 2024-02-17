
import * as React from "react"
import { DropdownMenuCheckboxItemProps, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import {  BsPersonCircle } from "react-icons/bs";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom";


export function UserDropDown() {
    const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hover:bg-">
          <BsPersonCircle size={21} className="text-white cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="grid gap-1 3xl:gap-2 3xl:scale-[1.3] md:scale-[1.1] ">
        <DropdownMenuItem onClick={() => navigate("/register")} className="cursor-pointer text-[18px] tracking-wider">
          Register
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/login")}  className="cursor-pointer  text-[18px] tracking-wider">
          Login
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/edit-profile")}  className="cursor-pointer  text-[18px] tracking-wider ">
          Edit Profile
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
