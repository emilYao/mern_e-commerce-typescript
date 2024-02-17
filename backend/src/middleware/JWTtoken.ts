import jwt, { JwtPayload } from "jsonwebtoken";
import { Request,Response, NextFunction } from "express";
import {UserDataType} from "../shared/userType";



declare global{
    namespace Express{
        interface Request{
            userId:String;
        }
    }
}

export const asignToken = (newUser:UserDataType, secret:string)=>{
    
    const token = jwt.sign({userId: newUser._id},secret, {
        expiresIn: '1d'
    })
    return token;
}


export const compareToken = (secret:string)=>(req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies["auth_token"];
    if (!token){
        return res.status(404).json({message:"unAuthorized"});
    }

    try{
        const payload = jwt.verify(token,secret);
        req.userId = (payload as JwtPayload).userId;
    }catch(e:any){
        console.log(e);
        return res.status(404).json({message:"unAuthorized"})
    }
}