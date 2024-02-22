import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { BsPersonCircle } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../hooks/api-clients-user"
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { openCreateUser, openLoginUser, setUserLogIn } from "@/features/user/userSlice";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function UserDropDown() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const {mutate} = useMutation({
    mutationFn: apiClient.logout,
    onSuccess: ()=>{
      dispatch(setUserLogIn(false))
      toast("Good Bye see you next time 👋👋👋");

    },
    onError: (error)=>{
      toast.error("sorry something went wrong try again");
      console.log(error)
    }
  })

  const onLogout = ()=>{
    mutate()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hover:bg-">
          <BsPersonCircle size={21} className="text-white cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="grid gap-1 3xl:gap-2 3xl:scale-[1.3] md:scale-[1.1] "
      >
        {user.userLogIn ? (
          <>
            <DropdownMenuItem
              onClick={onLogout}
              className="cursor-pointer  text-[18px] tracking-wider "
            >
              LogOut
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/edit-profile")}
              className="cursor-pointer  text-[18px] tracking-wider "
            >
              Edit Profile
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              onClick={() => dispatch(openCreateUser())}
              className="cursor-pointer text-[18px] tracking-wider"
            >
              Register
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => dispatch(openLoginUser())}
              className="cursor-pointer  text-[18px] tracking-wider"
            >
              Login
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
