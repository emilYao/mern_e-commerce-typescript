 import { Request,Response,  } from "express";
 import User from "../models/user";
 import { query, Result, validationResult } from 'express-validator';
import jwt from "jsonwebtoken"
import { asignToken } from "../middleware/JWTtoken";

export const register= async (req:Request, res:Response)=>{
    const {firstName, lastName, email, password} = req.body;
    const errorField = validationResult(req);
    try{
        if (!errorField.isEmpty()){
            return res.status(404).json({message:errorField})
        }
        // check if the user already exit 
        let userExit = await User.findOne({email});

        if (userExit){
            return res.status(404).json({message:"User already exit"})
        }


        // create otp sms message


        // create the user
        const newUser = new User({...req.body})

        newUser.verifyCode = "123456";
        // save the user
        await newUser.save();

        const token = asignToken(newUser, process.env.USER_SECRET as string);

        res.cookie("auth_token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV == "production",
            maxAge:86400000
        })
        
        return res.status(200).json({message:{veriyCode:"123456", user_id: newUser._id}})
        
    }catch(error:any){
        console.log(error)
        return res.status(500).json({message:"Sorry something went wrong"});
    };
}