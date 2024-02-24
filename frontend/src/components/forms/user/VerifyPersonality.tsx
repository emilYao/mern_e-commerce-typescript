import OtpInput from "react-otp-input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import * as apiClientUser from "../../../api/api-clients-user";
import Spinner from "@/components/Spinner";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

import { closeCreateUser, closeLoginUser, goToVerify ,setUserLogIn} from "../../../features/user/userSlice";

export default function VerifyPersonality() {
  const [otp, setOtp] = useState("");
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [wrongCode, setWrongCode] = useState<String>("");
  const [codeResend, setCodeResend] = useState<Boolean>(false);

  const { mutate: resendMutate, isPending: resendPending } = useMutation({
    mutationFn: apiClientUser.resendVerifyCode,
    onSuccess: () => {
      setCodeResend(true);
      setTimeout(() => {
        setCodeResend(false);
      }, 5000);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiClientUser.verifyPersonality,
    onSuccess: () => {
      dispatch(setUserLogIn(true))
      dispatch(closeCreateUser());
      dispatch(closeLoginUser());
      toast("😃 You are welcome ");
      dispatch(goToVerify(false));
    },
    onError: (error: apiClientUser.verifyCodeErrorType) => {
      if (error.noUser) {
        dispatch(closeCreateUser());
        dispatch(goToVerify(false));
        toast.error(`😌 ${error.message}`);
      } else if (error.wrongCode || error.aboveTryLimit) {
        setWrongCode(error.message);

        setTimeout(() => {
          setWrongCode("");
        }, 5000);
      }
      // toast.error(`😌 ${error.message}`);
    },
  });

  const onSubmit = () => {
    mutate({
      userId: user.userId as string,
      otp,
    });
  };

  const onResend = () => {
    resendMutate(user.userId as string);
  };
  // const userNumber = user.phoneNumber.slice(9).padStart(10,"*");
  return (
    <div className="relative">
      <div className="flex justify-end">
        <button onClick={() => {dispatch(closeCreateUser()), dispatch(closeLoginUser())}}>
          <AiOutlineClose className="cursor-pointer " />
        </button>
      </div>
      <div className="mb-5">
        <p className="">Verify Account</p>
        <p className="text-[14px] font-normal ">
          Hello {user.firstName}
          <span className="mx-1" />
          an OTP code has been sent to your email account {user.email}
        </p>
      </div>
      <p>Enter your code here</p>

      <OtpInput
        value={otp}
        onChange={setOtp}
        inputType="text"
        shouldAutoFocus={true}
        numInputs={5}
        renderInput={(props) => <input {...props} />}
        containerStyle=" flex items-center justify-center"
        inputStyle="text-slate-900 border w-[1.9rem] md:w-[2.5rem] h-[3rem] text-center  m-2 rounded-sm drop-shadow-md focus:drop-shadow-lg focus:outline-none focus:border-none"
        skipDefaultStyles={true}
      />
      <p className="font-normal">
        Didn't receive the code?{" "}
        <button
          className="underline decoration-dotted hover:text-blue-500"
          onClick={onResend}
        >
          Resend
        </button>
      </p>
      <div>
        {wrongCode && (
          <p className="text-red-400 font-normal">😯 {wrongCode}</p>
        )}
        {codeResend && (
          <p className="text-green-400 font-normal">
            Check your mail and retry again
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          className="mt-5 tracking-wider"
          onClick={onSubmit}
          disabled={isPending || resendPending}
        >
          {isPending || resendPending ? <Spinner /> : "Verify"}
        </Button>
      </div>
    </div>
  );
}
