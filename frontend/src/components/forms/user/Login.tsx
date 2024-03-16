import LoginDetails from "./LoginDetails";
import VerifyPersonality from "./VerifyPersonality";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import {  closeLoginUser, goToVerify} from "../../../features/user/userSlice";


export default function Login() {
  const isGoToVerify:boolean = useAppSelector(state=>state.user.goToverify) as boolean;
  const isCloseLoginUser:boolean = useAppSelector(state=>state.user.closeLoginUser) as boolean
  const dispatch = useAppDispatch();

  const handleClose =(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
      e.stopPropagation()
      e.target.addEventListener("click",()=>{
        dispatch( closeLoginUser());
        dispatch(goToVerify(false));
      })
  }
  return (
    <div>
      <div className={ !isCloseLoginUser? `bg-slate-300 opacity-[0.7] w-screen h-screen fixed z-[1000] top-0 `: "w-0 h-0 -z-10"} 
      onClick={(e)=>handleClose(e)}
      ></div>
     
      <div className={!isCloseLoginUser ? ` fixed tracking-wider font-semibold text-gray-600 w-[18rem] z-[1010] md:w-[25rem] backdrop-blur-xl bg-white shadow-md drop-shadow-md rounded-md p-5  right-[50%] top-[50%]  translate-x-[50%] -translate-y-[50%]  `: "w-0 h-0 -z-10"}>
      {
       (!isCloseLoginUser) &&
        (isGoToVerify ?<VerifyPersonality/> :  <LoginDetails/>)
        
      
      }
 
      </div>
    </div>
  );
}
