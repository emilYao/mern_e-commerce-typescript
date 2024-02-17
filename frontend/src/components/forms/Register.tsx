import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "react-phone-number-input/style.css";
import PhoneInput, {isValidPhoneNumber,isPossiblePhoneNumber,formatPhoneNumber,formatPhoneNumberIntl } from "react-phone-number-input";
import {E164Number} from 'libphonenumber-js/core';


import { useEffect, useState } from "react";

const UserSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    phoneNumber: yup.string().required(),
  })
  .required();

interface UserInputType {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  phoneNumber: String;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserInputType>({
    resolver: yupResolver<UserInputType>(UserSchema),
  });

  const onSubmit = (data: UserInputType) => {
    console.log(data);
  };
  // onSubmit={(e)=>{()=>handleSubmit(onSubmit); e.preventDefault()}}
  const [contact, setContact] = useState<E164Number | undefined>(undefined);
  // console.log(contact && formatPhoneNumberIntl(contact))
  useEffect(()=>{
    setValue("phoneNumber", contact?.toString().replace(" ", "") || '');
    console.log( contact?.toString().replace(" ", ""))
  },[contact])
  return (
    <div>
      <div className="bg-slate-300 opacity-[0.7] w-screen min-h-screen absolute z-10 top-0 "></div>
      <div className=" absolute tracking-wider font-semibold text-gray-600 w-[18rem] md:w-[25rem] backdrop-blur-xl bg-white shadow-md drop-shadow-md rounded-md p-5  right-[50%] top-[50%]  translate-x-[50%] -translate-y-[50%]  z-50  ">
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
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
          
            <PhoneInput
            
            defaultCountry="GH"
             placeholder="Enter phone number"
              initialValueFormat="national"
              value={contact}
              onChange={setContact }
             
            />
            {
            !(contact && isPossiblePhoneNumber(contact)) &&<p className="text-red-500">Please provide a valid phone number</p>
          }
          {
            errors.phoneNumber && <span>Phone Number is required</span>
          }
          {/* {
            
            value && isValidPhoneNumber(value)  ? <div>is valid</div> : <div>is not valid</div>
          } */}
          
          <Button type="submit" disabled={!(contact && isPossiblePhoneNumber(contact))}>Submit</Button>
        </form>
      </div>
    </div>
  );
}
