
import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import { AiOutlineClose } from "react-icons/ai";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  addUserProfile,
  goToVerify,
  closeLoginUser,
  openCreateUser
} from "../../../features/user/userSlice";

import * as apiClientUser from "../../../api/api-clients-user";
import Spinner from "../../Spinner";
const UserSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    
  })
  .required();

interface UserLoginType {
  email: string;
  password: string;
}

export default function LoginDetails() {
  const dispatch = useAppDispatch();
  const [formError, setFormError] = useState<String>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginType>({
    resolver: yupResolver<UserLoginType>(UserSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiClientUser.login,
    onSuccess: (data) => {
   
      dispatch(addUserProfile(data.data.message));
      dispatch(goToVerify(true));
    },
    onError: (error:string ) => {
      
      setFormError(error)
      setTimeout(()=>{
        setFormError("")

      }, 5000)
    },
  });

  const onSubmit = (data:UserLoginType) => {

    mutate(data);
  };

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
     
      <div className="flex justify-end">
        <button onClick={() => dispatch(closeLoginUser())}>
          <AiOutlineClose className="cursor-pointer " />
        </button>
      </div>
      <div className="text-center ">
        {
          formError && <p className="bg-red-400 py-2 rounded-sm text-white  ">😌{formError}</p>
        }
      </div>

      <label htmlFor="email">
        Email:
        <Input
          type="email"
          id="email"
          className="focus-visible:ring-slate-600 focus-visible:ring-1 focus:outline-none focus:border-0"
          {...register("email")}
        />
        <p className="text-red-400">{errors.email?.message}</p>
      </label>

      <label htmlFor="password">
        Password:
        <Input
          type="password"
          id="password"
          className="focus-visible:ring-slate-600 focus-visible:ring-1 focus:outline-none focus:border-0"
          {...register("password")}
        />
        <p className="text-red-400">{errors.password?.message}</p>
      </label>

 

      <Button
        type="submit"
        disabled={isPending}
        className="relative"
      >
        {isPending ? <Spinner /> : "Login"}
      </Button>
      <div>
        <span>
          Don't have an account?{" "}
          <button onClick={()=>{dispatch(openCreateUser()), dispatch(closeLoginUser())}} className="underline decoration-dotted hover:text-blue-500">
            Create account
          </button>
        </span>
      </div>
    </form>
  );
}
