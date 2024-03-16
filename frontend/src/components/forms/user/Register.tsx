import Details from "./Details";
import VerifyPersonality from "./VerifyPersonality";
import { useAppSelector, useAppDispatch} from "@/app/hooks";
import { closeCreateUser ,goToVerify } from "../../../features/user/userSlice";


export default function Register() {
  const dispatch = useAppDispatch();
  const isGoToVerify = useAppSelector(state=>state.user.goToverify);
  const isCloseCreateUser = useAppSelector(state=>state.user.closeCreateUser)
  const handleClose =(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
    e.stopPropagation()
    e.target.addEventListener("click",()=>{
      dispatch( closeCreateUser());
      dispatch(goToVerify(false));
    })
}

  return (
    <div>
      <div className={ !isCloseCreateUser? `bg-slate-300 opacity-[0.7] w-screen h-screen fixed z-[1000] top-0 `: "w-0 h-0 -z-10"} 
      onClick={(e)=>handleClose(e)}
      ></div>
     
      <div className={!isCloseCreateUser ? ` fixed tracking-wider font-semibold text-gray-600 w-[18rem] md:w-[25rem] backdrop-blur-xl bg-white shadow-md drop-shadow-md rounded-md p-5  right-[50%] top-[50%]  translate-x-[50%] -translate-y-[50%] z-[1010]`: "w-0 h-0 -z-10"}>
      {
       (!isCloseCreateUser) &&
        (isGoToVerify ?<VerifyPersonality/> :  <Details/>)
        
      
      }
 
      </div>
    </div>
  );
}
