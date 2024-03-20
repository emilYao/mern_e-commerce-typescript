import jwt, { JwtPayload } from "jsonwebtoken";
import { Request,Response, NextFunction } from "express";
import {UserDataType} from "../../shared/Type";



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


export const verifyToken =(req:Request, res:Response, next:NextFunction)=>{
   
    const token = req.header("auth_token") ;
    
    if (!token){
        return res.status(404).json({message:"unAuthorized"});
    }

    try{
        const payload = jwt.verify(token,process.env.USER_SECRET as string);
        
        req.userId = (payload as JwtPayload).userId;
        next()
    }catch(e:any){
       
        return res.status(404).json({message:"unAuthorized"})
    }
}