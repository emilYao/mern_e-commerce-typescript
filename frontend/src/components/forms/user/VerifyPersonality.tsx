import OtpInput from "react-otp-input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import * as apiClientUser from "../../../hooks/api-clients-user";
import Spinner from "@/components/Spinner";
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { AiOutlineClose } from "react-icons/ai";

import {

  closeCreateUser,
} from "../../../features/user/userSlice";
import { useDispatch } from "react-redux";

export default function VerifyPersonality() {
  const [otp, setOtp] = useState("");
  const user = useAppSelector(state => state.user.user);
  const dispatch = useDispatch();
  
  const { mutate, isPending } = useMutation({
    mutationFn: apiClientUser.verifyPersonality,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = () => {
    mutate({
      userId:user.userId as string,
      otp,
    });
  };
  const userNumber = user.phoneNumber.slice(9).padStart(10,"*");
  return (
    <div className="relative">
            <div className="flex justify-end">
        <button onClick={() => dispatch(closeCreateUser())}>
          <AiOutlineClose className="cursor-pointer " />
        </button>
      </div>
      <div className="mb-5">
        <p className="">Verify Account</p>
        <p className="text-[14px] font-normal ">
          Hello {user.firstName}<span className="mx-1"/>
          an OTP code has been sent to your phone Number {userNumber}
        </p>
      </div>
      <p>Enter your code here</p>

      <OtpInput
        value={otp}
        onChange={setOtp}
        inputType="text"
        shouldAutoFocus={true}
        numInputs={5}
        //   renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        containerStyle=" flex items-center justify-center"
        inputStyle="text-slate-900 border w-[1.9rem] md:w-[2.5rem] h-[3rem] text-center  m-2 rounded-sm drop-shadow-md focus:drop-shadow-lg focus:outline-none focus:border-none"
        skipDefaultStyles={true}
      />
      <p className="font-normal">
        Didn't receive the code?{" "}
        <button className="underline decoration-dotted hover:text-blue-500">
          Resend
        </button>
      </p>
      <div className="flex justify-end">
        <Button className="mt-5 tracking-wider" onClick={onSubmit}>
          {isPending ? <Spinner /> : "Verify"}
        </Button>
      </div>
    </div>
  );
}
