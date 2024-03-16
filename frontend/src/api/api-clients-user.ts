import { UserInputType } from "@/components/forms/user/Details";
import axios from 'axios';

// const BaseUrl = import.meta.env.BaseUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const  registerUser = async (formData:UserInputType)=>{
      return await axios.post(`http://localhost:9000/api/auth/register`,formData, {
        withCredentials:true,
        headers:{
            "Content-Type":"Application/json"
        },
    }).then((data)=>{
        console.log(data)
        return data
    }).catch(error=>{
        console.log(error)

        throw error.response.data.message
    })
}

export const  login = async (formData:{email:string; password:string})=>{
    return await axios.patch(`http://localhost:9000/api/user/auth/login`,formData, {
      withCredentials:true,
      headers:{
          "Content-Type":"Application/json"
      },
  }).then((data)=>{
     
      return data
  }).catch(error=>{
      throw error.response.data.message
  })

}

export const  logout = async ()=>{
    return await axios.post(`http://localhost:9000/api/user/auth/logout`, {
      withCredentials:true,
      headers:{
          "Content-Type":"Application/json"
      },
  }).then(()=>{
    return "logout successful"
  }).catch(error=>{
    
      throw error.response.data.message
  })

}

interface verifyType{
    otp:string;
    userId: string;
}
export interface verifyCodeErrorType{
    message:String;
    wrongCode?:Boolean;
    aboveTryLimit?:Boolean;
    noUser?:Boolean;
   
}
export const verifyPersonality = async(code:verifyType)=>{
    await axios.patch(`http://localhost:9000/api/user/auth/verifyPersonality`,code,{
        headers:{
            "Content-Type": "Application/json"
        },
        withCredentials:true
    }).then((data)=>{
        return data
    }).catch(error=>{
        throw error.response.data
    })
}

export const resendVerifyCode = async(userId:string)=>{
    await axios.patch(`http://localhost:9000/api/user/auth/reSendCode`, {userId}, {
        headers:{
            "Content-Type": "Application/json"
        },
        withCredentials:true
    })
}


