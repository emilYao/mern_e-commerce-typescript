 import { Request,Response,  } from "express";
 import User from "../models/user";
 import { query, Result, validationResult } from 'express-validator';
import jwt from "jsonwebtoken"
import { asignToken } from "../middleware/JWTtoken";
import { sendMail } from "../utils/nodeMailer";
import { generateRandomNumber } from "../utils/generateRandomNumber";
import { UserDataType } from "../../shared/userType";

export const register= async (req:Request, res:Response)=>{
    const {firstName, lastName, email, password,phoneNumber} = req.body;
    const errorField = validationResult(req);
    try{
        if (!errorField.isEmpty()){
            return res.status(404).json({message:errorField})
        }
        // check if the user already exit 
        let userExit = await User.findOne({email}) || await User.findOne({phoneNumber});

        if (userExit){
            return res.status(404).json({message:"User already exit"})
        }

        const randomNumber = generateRandomNumber()
       
        
        const newUser = new User({...req.body, verifyCode:randomNumber})
        sendMail({receiverMail:email, text:randomNumber})

        await newUser.save();

        
        let user = {
            userId: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phoneNumber: newUser.phoneNumber,
            email: newUser.email
        }
        
        return res.status(200).json({message: user})
        
    }catch(error:any){
        console.log(error)
        return res.status(500).json({Error:"Sorry something went wrong"});
    };
}

// registration verification of user, remember I specify in the user model to delete
// user document after 10 minutes if user is still not verified
export const verifyPersonality = async (req:Request, res:Response)=>{
  
    try{
    const userExit = await User.findOne({_id: req.body.userId});

    if (!userExit){
        return res.status(404).json({message:"sorry time out you need to start over again!!! ", noUser: true,aboveTryLimit:false,wrongCode: false});
    }
   
    // user can't try more than three
    if (userExit.numberOfVerifyCode > 3){

        await User.findOneAndUpdate({_id: req.body.userId},{numberOfVerifyCode:0, verifyCode:""})
    
        return res.status(404).json({message:"Sorry number of try exceed click on resend ", aboveTryLimit:true, noUser:false,wrongCode: false})
        
    }
    if ((userExit.verifyCode.length != 5)){
        return res.status(404).json({message:"code incorrect", wrongCode: true,aboveTryLimit:false,noUser:false});

    }
    if (userExit.verifyCode !== req.body.otp ){
        await User.findOneAndUpdate({_id: req.body.userId},{numberOfVerifyCode:userExit.numberOfVerifyCode+1})
        return res.status(404).json({message:"code incorrect", wrongCode: true,aboveTryLimit:false,noUser:false});
        }

        const updatedUser = await User.findOneAndUpdate({_id: req.body.userId},{isVerifyCode:true, verifyCode:""})


        const token = asignToken(userExit, process.env.USER_SECRET as string);

        res.cookie("auth_token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV == "production",
            maxAge:86400000
        })
        let user = {
            userId: userExit._id,
            firstName: userExit.firstName,
            lastName: userExit.lastName,
            phoneNumber: userExit.phoneNumber
        }
    //change isVerifyCode to true
    return res.send({message:user})

    }catch(error:any){
        console.log(error);
        return res.status(500).json({message:"Sorry an error occured"});
    }
   
}

export const resendVerifyCode = async (req:Request, res:Response)=>{
    
    try{
        const userExit = await User.findOne({_id: req.body.userId});
    
        if (!userExit){
            return res.status(404).json({message:"sorry time out you need to start over again!!! ", noUser: true,aboveTryLimit:false,wrongCode: false});
        }
            const randomNumber = generateRandomNumber()
            await User.findOneAndUpdate({_id: req.body.userId},{verifyCode:randomNumber, numberOfVerifyCode:0})
            sendMail({receiverMail:userExit.email as string, text:randomNumber})
        //change isVerifyCode to true
        return res.send("done")
    
        }catch(error){
        console.log(error);
        return res.status(500).json({message:"Sorry an error occured"});
    }
}

export const logOut = async (req:Request, res:Response)=>{
    const {password, email} = req.body;
    try{
        let userExit = await User.findOne({email});

        if (!userExit || !userExit?.comparePassword(password)){
            res.status(404).json({message:"Invalid Credentials"})
        }

        const randomNumber = generateRandomNumber()
       
        await User.findOneAndUpdate({email},{verifyCode:randomNumber, numberOfVerifyCode:0})

        sendMail({receiverMail:email, text:randomNumber})
        let user
        if (userExit){
             user = {
                userId: userExit._id,
                firstName: userExit.firstName,
                lastName: userExit.lastName,
                phoneNumber: userExit.phoneNumber,
                email: userExit.email
            }
        }
             
        return res.status(200).json({message: user})


    }catch(error){
        console.log(error);
        return res.status(500).json("Sorry something went wrong");
    }
}