import LoginDetails from "./LoginDetails";
import VerifyPersonality from "./VerifyPersonality";
import { useAppSelector } from "@/app/hooks";


export default function Register() {
  const goToVerify = useAppSelector(state=>state.user.goToverify);
  const closeLoginUser = useAppSelector(state=>state.user.closeLoginUser)

  return (
    <div>
      <div className={ !closeLoginUser? `bg-slate-300 opacity-[0.7] w-screen min-h-screen absolute z-10 top-0 `: "w-0 h-0 -z-10"}></div>
     
      <div className={!closeLoginUser ? ` absolute tracking-wider font-semibold text-gray-600 w-[18rem] md:w-[25rem] backdrop-blur-xl bg-white shadow-md drop-shadow-md rounded-md p-5  right-[50%] top-[50%]  translate-x-[50%] -translate-y-[50%]  z-50`: "w-0 h-0 -z-10"}>
      {
       (!closeLoginUser) &&
        (goToVerify ?<VerifyPersonality/> :  <LoginDetails/>)
        
      
      }
 
      </div>
    </div>
  );
}
