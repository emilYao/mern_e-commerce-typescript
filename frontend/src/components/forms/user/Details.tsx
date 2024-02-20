import { Input } from "@/components/ui/input";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "react-phone-number-input/style.css";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";

import { AiOutlineClose } from "react-icons/ai";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  addUserProfile,
  goToVerify,
  closeCreateUser,
} from "../../../features/user/userSlice";

import * as apiClientUser from "../../../hooks/api-clients-user";
import Spinner from "../../Spinner";
const UserSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    phoneNumber: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Password must match")
      .required(),
  })
  .required();

export interface UserInputType {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  phoneNumber: String;
  confirmPassword?: String;
}

export default function Details() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserInputType>({
    resolver: yupResolver<UserInputType>(UserSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiClientUser.registerUser,
    onSuccess: (data) => {
      dispatch(addUserProfile(data.message));
      dispatch(goToVerify());
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data: UserInputType) => {
    mutate(data);
  };

  const [contact, setContact] = useState<E164Number | undefined>(undefined);

  useEffect(() => {
    setValue("phoneNumber", contact?.toString().replace(" ", "") || "");
  }, [contact]);
  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-end">
        <button onClick={() => dispatch(closeCreateUser())}>
          <AiOutlineClose className="cursor-pointer " />
        </button>
      </div>
      <div className="grid gap-5 ">
        <label htmlFor="firstName">
          First Name:
          <Input
            type="text"
            id="firstName"
            className="focus-visible:ring-slate-600 focus:outline-none focus-visible:ring-1 focus:border-0"
            {...register("firstName")}
          />
          <p className="text-red-400">{errors.firstName?.message}</p>
        </label>

        <label htmlFor="lastName">
          Last Name
          <Input
            type="text"
            id="lastName"
            className="focus-visible:ring-slate-600 focus-visible:ring-1 focus:outline-none focus:border-0"
            {...register("lastName")}
          />
          <p className="text-red-400">{errors.lastName?.message}</p>
        </label>
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

      <label htmlFor="confirmPassword">
        Comfirm Password:
        <Input
          type="password"
          id="confirmPassword"
          className="focus-visible:ring-slate-600 focus-visible:ring-1 focus:outline-none focus:border-0"
          {...register("confirmPassword")}
        />
        <p className="text-red-400">{errors.confirmPassword?.message}</p>
      </label>

      <PhoneInput
        defaultCountry="GH"
        placeholder="Enter phone number"
        initialValueFormat="national"
        value={contact}
        onChange={setContact}
      />
      {!(contact && isPossiblePhoneNumber(contact)) && (
        <p className="text-red-500">Please provide a valid phone number</p>
      )}
      {errors.phoneNumber && <span>Phone Number is required</span>}
      {/* {
      
      value && isValidPhoneNumber(value)  ? <div>is valid</div> : <div>is not valid</div>
    } */}

      <Button
        type="submit"
        disabled={!(contact && isPossiblePhoneNumber(contact))}
        className="relative"
      >
        {isPending ? <Spinner /> : "Create Account"}
      </Button>
      <div>
        <span>
          Aleardy had an account?{" "}
          <button className="underline decoration-dotted hover:text-blue-500">
            Login in
          </button>
        </span>
      </div>
    </form>
  );
}
