import { UserInputType } from "@/components/forms/user/Details";
import axios from 'axios';

// const BaseUrl = import.meta.env.BaseUrl || '';

export const  registerUser = async (formData:UserInputType)=>{
      return await axios.post(`http://localhost:9000/api/auth/register`,formData, {
        withCredentials:true,
        headers:{
            "Content-Type":"Application/json"
        },
    }).then((data)=>{
        // console.log(data.data.message.json())
        return data
    }).catch(error=>{
        throw error.response.data.message
    })

}

export const  login = async (formData:{email:string; password:string})=>{
    return await axios.patch(`http://localhost:9000/api/auth/login`,formData, {
      withCredentials:true,
      headers:{
          "Content-Type":"Application/json"
      },
  }).then((data)=>{
      // console.log(data.data.message.json())
      return data
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
    await axios.patch(`http://localhost:9000/api/auth/verifyPersonality`,code,{
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
    await axios.patch(`http://localhost:9000/api/auth/reSendCode`, {userId}, {
        headers:{
            "Content-Type": "Application/json"
        },
        withCredentials:true
    })
}


