import { UserInputType } from "@/components/forms/user/Details";

// const BaseUrl = import.meta.env.BaseUrl || '';

export const  registerUser = async (formData:UserInputType)=>{
    const response = await fetch(`http://localhost:9000/api/auth/register`, {
        credentials:"include",
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify(formData)
    })
    if (!response.ok){
        throw new Error("Sorry An Error Occured");
    }
    return await response.json()
}

interface verifyType{
    otp:string;
    userId: string;
}
export const verifyPersonality = async(code:verifyType)=>{

    const response = await fetch(`http://localhost:9000/api/auth/verifyPersonality`,{
        credentials:"include",
        method:"PATCH",
        headers:{
            "Content-Type": "Application/json"
        },
        body:JSON.stringify(code)
    })
    
    if (!response.ok){
        
        throw new Error("Sorry An Error Occured");
    }
    return await response.json();
}


